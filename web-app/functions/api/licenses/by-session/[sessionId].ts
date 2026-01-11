import type { EventContext } from '@cloudflare/workers-types';
import type { Env, License } from '../../types.ts';
import {
  checkRateLimit,
  corsHeaders,
  getClientIP,
  getTokenFromCookie,
  RATE_LIMITS,
  rateLimitResponse,
  verifyToken,
} from '../../utils.ts';

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
      return Response.json({ error: 'Unauthorized' }, { status: 401, headers });
    }

    const payload = await verifyToken(token, context.env.JWT_SECRET);

    if (payload === null) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 401, headers });
    }

    const sessionId = context.params['sessionId'];

    const license = await context.env.DB.prepare(
      'SELECT * FROM licenses WHERE user_id = ? AND stripe_session_id = ?',
    )
      .bind(payload.userId, sessionId)
      .first<License>();

    if (!license) {
      return Response.json({ error: 'License not found' }, { status: 404, headers });
    }

    return Response.json(
      {
        license: {
          id: license.id,
          serialNumber: license.serial_number,
          purchaseDate: license.purchase_date,
          expiryDate: license.expiry_date,
          isActive: license.is_active === 1,
        },
      },
      { headers },
    );
  } catch (error: unknown) {
    console.error('Get license by session error:', error);

    return Response.json({ error: 'Failed to get license' }, { status: 500, headers });
  }
}
