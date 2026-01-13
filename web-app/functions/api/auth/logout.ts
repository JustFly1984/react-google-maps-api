import type { EventContext } from '@cloudflare/workers-types';
import type { Env } from '../types.ts';
import { clearAuthCookie, corsHeaders } from '../utils.ts';

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

  return Response.json(
    { success: true },
    {
      headers: {
        ...headers,
        'Set-Cookie': clearAuthCookie(),
      },
    },
  );
}
