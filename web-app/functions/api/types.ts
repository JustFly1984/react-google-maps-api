import type { D1Database, KVNamespace } from '@cloudflare/workers-types';

export type Env = {
  DB: D1Database;
  RATE_LIMIT: KVNamespace;
  PASSWORD_RESET: KVNamespace;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  APP_URL: string;
};

export type User = {
  id: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
};

export type License = {
  id: string;
  user_id: string;
  serial_number: string;
  purchase_date: string;
  expiry_date: string;
  is_active: number;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
};

export type JWTPayload = {
  userId: string;
  email: string;
  exp: number;
};
