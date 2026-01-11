import type { EventContext } from '@cloudflare/workers-types';
import * as v from 'valibot';

import { SignupSchema } from '../../../shared/schemas.ts';
import type { Env } from '../types.ts';

import {
  checkRateLimit,
  corsHeaders,
  createAuthCookie,
  createToken,
  generateId,
  getClientIP,
  hashPassword,
  RATE_LIMITS,
  rateLimitResponse,
} from '../utils.ts';

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
    'signup',
    RATE_LIMITS.signup,
  );

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetAt, context.env.APP_URL);
  }

  try {
    const body = await context.request.json();
    const result = v.safeParse(SignupSchema, body);

    if (!result.success) {
      return Response.json({ error: result.issues[0].message }, { status: 400, headers });
    }

    const { email, password, fullName } = result.output;

    const existing = await context.env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email.toLowerCase())
      .first();

    if (existing) {
      return Response.json({ error: 'Email already registered' }, { status: 400, headers });
    }

    const id = generateId();

    const passwordHash = await hashPassword(password);

    const now = new Date().toISOString();

    await context.env.DB.prepare(
      'INSERT INTO users (id, email, password_hash, full_name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    )
      .bind(id, email.toLowerCase(), passwordHash, fullName || null, now, now)
      .run();

    const token = await createToken(
      { userId: id, email: email.toLowerCase() },
      context.env.JWT_SECRET,
    );

    return Response.json(
      {
        user: {
          id,
          email: email.toLowerCase(),
          fullName: fullName || null,
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
    console.error('Signup error:', error);

    return Response.json({ error: 'Signup failed' }, { status: 500, headers });
  }
}
