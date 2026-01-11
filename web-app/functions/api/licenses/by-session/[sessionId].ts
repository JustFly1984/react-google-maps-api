import { type PagesFunction, Response } from '@cloudflare/workers-types';
import type { Env, License } from '../../types.ts';
import { corsHeaders, verifyToken } from '../../utils.ts';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, {
    headers: corsHeaders(context.env.APP_URL || '*'),
  });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const headers = corsHeaders(context.env.APP_URL || '*');

  try {
    const authHeader = context.request.headers.get('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json({ error: 'Unauthorized' }, { status: 401, headers });
    }

    const token = authHeader.substring(7);
    const payload = await verifyToken(token, context.env.JWT_SECRET);

    if (!payload) {
      return Response.json({ error: 'Invalid or expired token' }, { status: 401, headers });
    }

    const sessionId = context.params['sessionId'];

    const license = await context.env.DB.prepare(
      'SELECT * FROM licenses WHERE user_id = ? AND stripe_session_id = ?'
    )
      .bind(payload.userId, sessionId)
      .first<License>();

    if (!license) {
      return Response.json({ error: 'License not found' }, { status: 404, headers });
    }

    return Response.json({
      license: {
        id: license.id,
        serialNumber: license.serial_number,
        purchaseDate: license.purchase_date,
        expiryDate: license.expiry_date,
        isActive: license.is_active === 1,
      },
    }, { headers });
  } catch (error: unknown) {
    console.error('Get license by session error:', error);
    return Response.json({ error: 'Failed to get license' }, { status: 500, headers });
  }
};
