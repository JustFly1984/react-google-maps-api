import type { KVNamespace } from '@cloudflare/workers-types';

import type { JWTPayload } from './types.ts';

const encoder = new TextEncoder();

async function createHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function base64UrlEncode(data: Uint8Array): string {
  return btoa(String.fromCharCode(...data))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const decoded = atob(base64 + padding);
  return new Uint8Array([...decoded].map((c) => c.charCodeAt(0)));
}

export async function createToken(
  payload: Omit<JWTPayload, 'exp'>,
  secret: string,
  expiresInHours = 24 * 7,
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const fullPayload = { ...payload, exp };

  const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(fullPayload)));

  const key = await createHmacKey(secret);
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${headerB64}.${payloadB64}`),
  );

  const signatureB64 = base64UrlEncode(new Uint8Array(signature));
  return `${headerB64}.${payloadB64}.${signatureB64}`;
}

export async function verifyToken(token: string, secret: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.') as [string, string, string];

    if (parts.length !== 3) {
      return null;
    }

    const [headerB64, payloadB64, signatureB64] = parts;

    const key = await createHmacKey(secret);
    const signature = base64UrlDecode(signatureB64);
    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      encoder.encode(`${headerB64}.${payloadB64}`),
    );

    if (!valid) {
      return null;
    }

    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64))) as JWTPayload;

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(hash));
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

export function generateSerialNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments: string[] = [];

  for (let i = 0; i < 4; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }

  return `RGMA-${segments.join('-')}`;
}

export function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 32; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export function calculateExpiryDate(): string {
  const expiry = new Date();
  expiry.setFullYear(expiry.getFullYear() + 1);
  return expiry.toISOString();
}

export function corsHeaders(origin: string) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export const AUTH_COOKIE_NAME = 'auth_token';

export function createAuthCookie(token: string, maxAgeHours = 24 * 7): string {
  const maxAge = maxAgeHours * 60 * 60;
  return `${AUTH_COOKIE_NAME}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

export function clearAuthCookie(): string {
  return `${AUTH_COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export function getTokenFromCookie<T>(
  request: T & { headers: { get(name: string): string | null } },
): string | null {
  const cookieHeader = request.headers.get('Cookie');

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((c) => c.trim());

  const authCookie = cookies.find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!authCookie) {
    return null;
  }

  return authCookie.substring(AUTH_COOKIE_NAME.length + 1);
}

export type RateLimitConfig = {
  maxRequests: number;
  windowSeconds: number;
};

export const RATE_LIMITS = {
  login: { maxRequests: 5, windowSeconds: 15 * 60 },
  signup: { maxRequests: 3, windowSeconds: 60 * 60 },
  checkout: { maxRequests: 10, windowSeconds: 60 * 60 },
  api: { maxRequests: 60, windowSeconds: 60 },
} satisfies Record<string, RateLimitConfig>;

type RateLimitData = {
  count: number;
  resetAt: number;
};

export function getClientIP<T extends { headers: { get(name: string): string | null } }>(
  request: T,
): string {
  return (
    request.headers.get('CF-Connecting-IP') ??
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() ??
    'unknown'
  );
}

export async function checkRateLimit(
  kv: KVNamespace,
  identifier: string,
  endpoint: string,
  config: RateLimitConfig,
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = `rate:${endpoint}:${identifier}`;
  const now = Math.floor(Date.now() / 1000);

  const existing = await kv.get<RateLimitData>(key, 'json');

  if (existing === null || existing.resetAt <= now) {
    const resetAt = now + config.windowSeconds;
    await kv.put(key, JSON.stringify({ count: 1, resetAt }), {
      expirationTtl: config.windowSeconds,
    });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt };
  }

  if (existing.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  const newCount = existing.count + 1;
  const ttl = Math.max(60, existing.resetAt - now);
  await kv.put(key, JSON.stringify({ count: newCount, resetAt: existing.resetAt }), {
    expirationTtl: ttl,
  });

  return {
    allowed: true,
    remaining: config.maxRequests - newCount,
    resetAt: existing.resetAt,
  };
}

export function rateLimitResponse(resetAt: number, origin: string): Response {
  const retryAfter = Math.max(0, resetAt - Math.floor(Date.now() / 1000));
  return Response.json(
    { error: 'Too many requests. Please try again later.' },
    {
      status: 429,
      headers: {
        ...corsHeaders(origin),
        'Retry-After': String(retryAfter),
      },
    },
  );
}
