import { type PagesFunction, Response } from '@cloudflare/workers-types';
import type { Env, User } from '../types.ts';
import { corsHeaders, verifyToken } from '../utils.ts';

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

    const user = await context.env.DB.prepare(
      'SELECT id, email, full_name FROM users WHERE id = ?'
    )
      .bind(payload.userId)
      .first<User>();

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404, headers });
    }

    return Response.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name,
      },
    }, { headers });
  } catch (error) {
    console.error('Get user error:', error);
    return Response.json({ error: 'Failed to get user' }, { status: 500, headers });
  }
};
