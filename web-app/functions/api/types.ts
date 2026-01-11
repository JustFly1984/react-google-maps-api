export interface Env {
  DB: D1Database;
  JWT_SECRET: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  APP_URL: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface License {
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
}

export interface JWTPayload {
  userId: string;
  email: string;
  exp: number;
}
