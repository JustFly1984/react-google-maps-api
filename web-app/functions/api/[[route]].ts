import { type EventContext, type ExecutionContext } from '@cloudflare/workers-types';
import type { Env } from './types.ts';

import {
  onRequestOptions as forgotOptions,
  onRequestPost as forgotPost,
} from './auth/forgot-password.ts';
import { onRequestOptions as loginOptions, onRequestPost as loginPost } from './auth/login.ts';
import {
  onRequestOptions as resetOptions,
  onRequestPost as resetPost,
} from './auth/reset-password.ts';
import { onRequestOptions as signupOptions, onRequestPost as signupPost } from './auth/signup.ts';
import { onRequestGet as licensesGet } from './licenses/index.ts';
import { onRequestPost as webhookPost } from './webhook/stripe.ts';

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<any> {
    const url = new URL(request.url);
    const path = url.pathname;

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (path.startsWith('/api/')) {
      const eventContext: EventContext<Env, any, Record<string, unknown>> = {
        request: request as any,
        env,
        waitUntil: ctx.waitUntil.bind(ctx),
        passThroughOnException: ctx.passThroughOnException.bind(ctx),
        functionPath: 'worker',
        params: {},
        data: {},
        next: (_input, _init) => {
          return Promise.resolve(new Response(null, { status: 200 }) as any);
        },
      };

      // Auth routes
      if (path === '/api/auth/signup') {
        if (request.method === 'OPTIONS') return signupOptions(eventContext);
        if (request.method === 'POST') return signupPost(eventContext);
      }
      if (path === '/api/auth/login') {
        if (request.method === 'OPTIONS') return loginOptions(eventContext);
        if (request.method === 'POST') return loginPost(eventContext);
      }
      if (path === '/api/auth/forgot-password') {
        if (request.method === 'OPTIONS') return forgotOptions(eventContext);
        if (request.method === 'POST') return forgotPost(eventContext);
      }
      if (path === '/api/auth/reset-password') {
        if (request.method === 'OPTIONS') return resetOptions(eventContext);
        if (request.method === 'POST') return resetPost(eventContext);
      }

      if (path === '/api/licenses' && request.method === 'GET') {
        return licensesGet(eventContext);
      }

      if (path === '/api/webhook' && request.method === 'POST') {
        return webhookPost(eventContext);
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    }

    try {
      const assetKey = path === '/' ? '/index.html' : path;
      const asset = await env.ASSETS.fetch(assetKey, {
        method: request.method,
        headers: request.headers,
      });

      if (asset.status === 404) {
        return await env.ASSETS.fetch('/index.html', {
          method: request.method,
          headers: request.headers,
        });
      }

      return asset;
    } catch (error: unknown) {
      console.error('Asset serving error:', error);

      return new Response('Not Found', { status: 404 });
    }
  },
};
