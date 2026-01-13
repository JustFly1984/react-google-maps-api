import type { EventContext } from '@cloudflare/workers-types';
import * as v from 'valibot';
import { LoginSchema } from '../../../shared/schemas.ts';
import type { Env, User } from '../types.ts';
import {
  checkRateLimit,
  corsHeaders,
  createAuthCookie,
  createToken,
  getClientIP,
  RATE_LIMITS,
  rateLimitResponse,
  verifyPassword,
} from '../utils.ts';

export async function onRequestOptions(context: EventContext<Env, any, Record<string, unknown>>) {
  return new Response(null, {
    headers: corsHeaders(context.env.APP_URL),
  });
}

export async function onRequestPost(context: EventContext<Env, any, Record<string, unknown>>) {
  const headers = corsHeaders(context.env.APP_URL);
  const clientIP = getClientIP(context.request);

  const rateLimit = await checkRateLimit(
    context.env.RATE_LIMIT,
    clientIP,
    'login',
    RATE_LIMITS.login,
  );

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetAt, context.env.APP_URL);
  }

  try {
    const body = await context.request.json();
    const result = v.safeParse(LoginSchema, body);

    if (!result.success) {
      return Response.json({ error: result.issues[0].message }, { status: 400, headers });
    }

    const { email, password } = result.output;

    const user = await context.env.DB.prepare('SELECT * FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first<User>();

    if (!user) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401, headers });
    }

    const validPassword = await verifyPassword(password, user.password_hash);

    if (!validPassword) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401, headers });
    }

    const token = await createToken({ userId: user.id, email: user.email }, context.env.JWT_SECRET);

    return Response.json(
      {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      },
      {
        headers: {
          ...headers,
          'Set-Cookie': createAuthCookie(token),
        },
      },
    );
  } catch (error: unknown) {
    console.error('Login error:', error);
    return Response.json({ error: 'Login failed' }, { status: 500, headers });
  }
}
