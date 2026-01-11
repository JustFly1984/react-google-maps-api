import type { EventContext } from '@cloudflare/workers-types';
import type { Env, License } from '../types.ts';
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

    if (!token) {
      return Response.json({ error: 'Unauthorized' }, { status: 401, headers });
    }

    const payload = await verifyToken(token, context.env.JWT_SECRET);

    if (!payload) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 401, headers });
    }

    const { results } = await context.env.DB.prepare(
      'SELECT * FROM licenses WHERE user_id = ? ORDER BY created_at DESC',
    )
      .bind(payload.userId)
      .all<License>();

    const licenses = results.map((license: License) => ({
      id: license.id,
      serialNumber: license.serial_number,
      purchaseDate: license.purchase_date,
      expiryDate: license.expiry_date,
      isActive: license.is_active === 1,
    }));

    return Response.json({ licenses }, { headers });
  } catch (error: unknown) {
    console.error('Get licenses error:', error);

    return Response.json({ error: 'Failed to get licenses' }, { status: 500, headers });
  }
}
