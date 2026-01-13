import type { EventContext } from '@cloudflare/workers-types';
import type { Env, User } from '../types.ts';
import {
  checkRateLimit,
  corsHeaders,
  getClientIP,
  getTokenFromCookie,
  RATE_LIMITS,
  rateLimitResponse,
  verifyToken,
} from '../utils.ts';

export async function onRequestOptions(
  context: EventContext<Env, any, Record<string, unknown>>,
): Promise<Response> {
  return new Response(null, {
    headers: corsHeaders(context.env.APP_URL),
  });
}

export async function onRequestGet(
  context: EventContext<Env, any, Record<string, unknown>>,
): Promise<Response> {
  const headers = corsHeaders(context.env.APP_URL);
  const clientIP = getClientIP(context.request);

  const rateLimit = await checkRateLimit(context.env.RATE_LIMIT, clientIP, 'api', RATE_LIMITS.api);

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit.resetAt, context.env.APP_URL);
  }

  try {
    const token = getTokenFromCookie(context.request);

    if (token === null) {
      return Response.json({ error: 'Unauthorized' }, { status: 200, headers });
    }

    const payload = await verifyToken(token, context.env.JWT_SECRET);

    if (payload === null) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 200, headers });
    }

    const user = await context.env.DB.prepare('SELECT id, email, full_name FROM users WHERE id = ?')
      .bind(payload.userId)
      .first<User>();

    if (user === null) {
      return Response.json({ error: 'User not found' }, { status: 404, headers });
    }

    return Response.json(
      {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.full_name,
        },
      },
      { headers },
    );
  } catch (error: unknown) {
    console.error('Get user error:', error);

    return Response.json({ error: 'Failed to get user' }, { status: 500, headers });
  }
}
