import { type PagesFunction, Response } from '@cloudflare/workers-types';
import Stripe from 'stripe';

import type { Env } from '../types.ts';
import { calculateExpiryDate, generateId, generateSerialNumber } from '../utils.ts';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const stripe = new Stripe(context.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
    });

    const signature = context.request.headers.get('stripe-signature');

    if (!signature) {
      return Response.json({ error: 'Missing signature' }, { status: 400 });
    }

    const body = await context.request.text();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        context.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.['userId'];

        if (userId && session.subscription) {
          const id = generateId();
          const serialNumber = generateSerialNumber();
          const expiryDate = calculateExpiryDate();
          const now = new Date().toISOString();

          await context.env.DB.prepare(
            `INSERT INTO licenses 
            (id, user_id, serial_number, expiry_date, is_active, stripe_subscription_id, stripe_customer_id, stripe_session_id, created_at, updated_at) 
            VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?)`
          )
            .bind(
              id,
              userId,
              serialNumber,
              expiryDate,
              session.subscription as string,
              session.customer as string,
              session.id,
              now,
              now
            )
            .run();

          console.log(`License created for user ${userId}: ${serialNumber}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const isActive = subscription.status === 'active' ? 1 : 0;
        const now = new Date().toISOString();

        await context.env.DB.prepare(
          'UPDATE licenses SET is_active = ?, updated_at = ? WHERE stripe_subscription_id = ?'
        )
          .bind(isActive, now, subscription.id)
          .run();
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        const now = new Date().toISOString();

        await context.env.DB.prepare(
          'UPDATE licenses SET is_active = 0, updated_at = ? WHERE stripe_subscription_id = ?'
        )
          .bind(now, subscription.id)
          .run();
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = (invoice as { subscription?: string | { id: string } | null }).subscription;
        const subId = typeof subscriptionId === 'string' ? subscriptionId : subscriptionId?.id;
        
        if (subId && invoice.billing_reason === 'subscription_cycle') {
          const newExpiryDate = calculateExpiryDate();
          const now = new Date().toISOString();

          await context.env.DB.prepare(
            'UPDATE licenses SET expiry_date = ?, updated_at = ? WHERE stripe_subscription_id = ?'
          )
            .bind(newExpiryDate, now, subId)
            .run();
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
};
