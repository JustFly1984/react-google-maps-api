import type { EventContext } from '@cloudflare/workers-types';
import Stripe from 'stripe';
import * as v from 'valibot';

import { CheckoutSchema } from '../../shared/schemas.ts';
import type { Env } from './types.ts';
import {
  checkRateLimit,
  corsHeaders,
  getClientIP,
  getTokenFromCookie,
  RATE_LIMITS,
  rateLimitResponse,
  verifyToken,
} from './utils.ts';

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
    'checkout',
    RATE_LIMITS.checkout,
  );

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

    const body = await context.request.json();

    const result = v.safeParse(CheckoutSchema, body);

    if (!result.success) {
      return Response.json({ error: result.issues[0].message }, { status: 400, headers });
    }

    const { priceId } = result.output;

    if (!priceId) {
      return Response.json({ error: 'Price ID is required' }, { status: 400, headers });
    }

    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: payload.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${context.env.APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${context.env.APP_URL}/pricing`,
      metadata: {
        userId: payload.userId,
      },
      subscription_data: {
        metadata: {
          userId: payload.userId,
        },
      },
    });

    return Response.json({ sessionId: session.id }, { headers });
  } catch (error: unknown) {
    console.error('Checkout error:', error);

    return Response.json({ error: 'Failed to create checkout session' }, { status: 500, headers });
  }
}
