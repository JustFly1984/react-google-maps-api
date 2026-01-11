import type { EventContext } from '@cloudflare/workers-types';
import * as v from 'valibot';

import { ForgotPasswordSchema } from '../../../shared/schemas.ts';
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

    const { email } = result.output;

    const user = await context.env.DB.prepare('SELECT id, email FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first<User>();

    if (!user) {
      return Response.json(
        { message: 'If an account exists, a reset link has been sent.' },
        { headers },
      );
    }

    const token = crypto.randomUUID();

    await context.env.PASSWORD_RESET.put(
      `reset:${token}`,
      JSON.stringify({ userId: user.id, email: user.email }),
      { expirationTtl: RESET_TOKEN_TTL },
    );

    const resetLink = `${context.env.APP_URL}/reset-password`;

    await sendPasswordResetEmail(context.env.RESEND_API_KEY, user.email, resetLink);

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

async function sendPasswordResetEmail(
  apiKey: string,
  to: string,
  resetLink: string,
): Promise<void> {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'React Google Maps API <noreply@react-google-maps-api.ospm.app>',
      to: [to],
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1f2937;">Reset Your Password</h1>
          <p style="color: #4b5563; font-size: 16px;">
            You requested to reset your password for your React Google Maps API account.
          </p>
          <p style="color: #4b5563; font-size: 16px;">
            Click the button below to reset your password. This link will expire in 1 hour.
          </p>
          <a href="${resetLink}" style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 16px 0;">
            Reset Password
          </a>
          <p style="color: #6b7280; font-size: 14px;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            Or copy and paste this link into your browser:<br />
            <a href="${resetLink}" style="color: #2563eb;">${resetLink}</a>
          </p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
}
