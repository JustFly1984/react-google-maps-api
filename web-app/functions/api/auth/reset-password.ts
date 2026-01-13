import type { EventContext } from '@cloudflare/workers-types';
import * as v from 'valibot';

import { sendPasswordChangedEmail } from '../email.ts';
import type { Env } from '../types.ts';
import {
  checkRateLimit,
  corsHeaders,
  getClientIP,
  hashPassword,
  RATE_LIMITS,
  rateLimitResponse,
} from '../utils.ts';

const RESET_TOKEN_COOKIE = 'password_reset_token';

const ResetPasswordBodySchema = v.object({
  password: v.pipe(v.string(), v.minLength(6)),
});

type ResetTokenData = {
  userId: string;
  email: string;
  locale?: string | undefined;
};

function getResetTokenFromCookie<T extends { headers: { get(name: string): string | null } }>(
  request: T,
): string | null {
  const cookieHeader = request.headers.get('Cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map((c) => c.trim());
  const tokenCookie = cookies.find((c) => c.startsWith(`${RESET_TOKEN_COOKIE}=`));
  if (!tokenCookie) return null;

  return tokenCookie.substring(RESET_TOKEN_COOKIE.length + 1);
}

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
    'reset-password',
    RATE_LIMITS.login,
  );

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetAt, context.env.APP_URL);
  }

  try {
    const token = getResetTokenFromCookie(context.request);

    if (!token) {
      return Response.json({ error: 'No reset token found' }, { status: 400, headers });
    }

    const body = await context.request.json();
    const result = v.safeParse(ResetPasswordBodySchema, body);

    if (!result.success) {
      return Response.json({ error: result.issues[0].message }, { status: 400, headers });
    }

    const { password } = result.output;

    const tokenData = await context.env.PASSWORD_RESET.get<ResetTokenData>(
      `reset:${token}`,
      'json',
    );

    if (!tokenData) {
      return Response.json({ error: 'Invalid or expired reset token' }, { status: 400, headers });
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();

    await context.env.DB.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?')
      .bind(passwordHash, now, tokenData.userId)
      .run();

    await context.env.PASSWORD_RESET.delete(`reset:${token}`);

    // Send password changed confirmation email
    sendPasswordChangedEmail(
      context.env.RESEND_API_KEY,
      tokenData.email,
      context.env.APP_URL,
      tokenData.locale || 'en',
    ).catch((err: unknown) => console.error('Failed to send password changed email:', err));

    const clearCookie = `${RESET_TOKEN_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;

    return Response.json(
      { message: 'Password has been reset successfully' },
      {
        headers: {
          ...headers,
          'Set-Cookie': clearCookie,
        },
      },
    );
  } catch (error: unknown) {
    console.error('Reset password error:', error);
    return Response.json({ error: 'Failed to reset password' }, { status: 500, headers });
  }
}
