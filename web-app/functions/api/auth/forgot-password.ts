import type { EventContext } from '@cloudflare/workers-types';
import * as v from 'valibot';

import { ForgotPasswordSchema } from '../../../shared/schemas.ts';
import { sendPasswordResetEmail } from '../email.ts';
import type { Env, User } from '../types.ts';
import {
  checkRateLimit,
  corsHeaders,
  getClientIP,
  RATE_LIMITS,
  rateLimitResponse,
} from '../utils.ts';

const RESET_TOKEN_COOKIE = 'password_reset_token';
const RESET_TOKEN_TTL = 60 * 60;

export async function onRequestOptions(
  context: EventContext<Env, any, Record<string, unknown>>,
): Promise<Response> {
  return new Response(null, {
    headers: corsHeaders(context.env.APP_URL),
  });
}

export async function onRequestPost(
  context: EventContext<Env, any, Record<string, unknown>>,
): Promise<Response> {
  const headers = corsHeaders(context.env.APP_URL);
  const clientIP = getClientIP(context.request);

  const rateLimit = await checkRateLimit(
    context.env.RATE_LIMIT,
    clientIP,
    'forgot-password',
    RATE_LIMITS.signup,
  );

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetAt, context.env.APP_URL);
  }

  try {
    const body = await context.request.json();
    const result = v.safeParse(ForgotPasswordSchema, body);

    if (!result.success) {
      return Response.json({ error: result.issues[0].message }, { status: 400, headers });
    }

    const { email, locale } = result.output;

    const user = await context.env.DB.prepare('SELECT id, email, locale FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first<User>();

    if (!user) {
      return Response.json(
        { message: 'If an account exists, a reset link has been sent.' },
        { headers },
      );
    }

    const userLocale = locale || user.locale || 'en';
    const token = crypto.randomUUID();

    await context.env.PASSWORD_RESET.put(
      `reset:${token}`,
      JSON.stringify({ userId: user.id, email: user.email, locale: userLocale }),
      { expirationTtl: RESET_TOKEN_TTL },
    );

    const resetLink = `${context.env.APP_URL}/reset-password`;

    await sendPasswordResetEmail(context.env.RESEND_API_KEY, user.email, resetLink, userLocale);

    const cookie = `${RESET_TOKEN_COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${RESET_TOKEN_TTL}`;

    return Response.json(
      { message: 'If an account exists, a reset link has been sent.' },
      {
        headers: {
          ...headers,
          'Set-Cookie': cookie,
        },
      },
    );
  } catch (error: unknown) {
    console.error('Forgot password error:', error);
    return Response.json({ error: 'Failed to process request' }, { status: 500, headers });
  }
}
