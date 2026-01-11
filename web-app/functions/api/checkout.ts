import { type PagesFunction, Response } from '@cloudflare/workers-types';
import Stripe from 'stripe';
import * as v from 'valibot';

import { CheckoutSchema } from '../../shared/schemas.ts';
import type { Env } from './types.ts';
import { corsHeaders, verifyToken } from './utils.ts';

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  return new Response(null, {
    headers: corsHeaders(context.env.APP_URL || '*'),
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
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
  } catch (error) {
    console.error('Checkout error:', error);
    return Response.json({ error: 'Failed to create checkout session' }, { status: 500, headers });
  }
};
