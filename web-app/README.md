# React Google Maps API - Documentation & Licensing Website

A modern full-stack web application for documentation, user authentication, and commercial licensing for the `@react-google-maps/api` package.

Built with **React Router v7** + **Hono** on **Cloudflare Workers** with **D1** database.

## Features

- **SSR Frontend**: React Router v7 with server-side rendering
- **API Backend**: Hono routes for authentication, licenses, and payments
- **Database**: Cloudflare D1 (SQLite)
- **Validation**: Valibot for request/response validation
- **Payments**: Stripe for $12/year commercial license subscription
- **License Management**: Unique serial numbers for each license

## Tech Stack

- **Frontend**: React 19, React Router v7, TailwindCSS, Lucide React
- **Backend**: Hono (via hono-react-router-adapter)
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1
- **Validation**: Valibot
- **Payments**: Stripe
- **Build**: Vite

## Project Structure

```text
web-app/
├── app/                    # React Router v7 frontend
│   ├── routes/             # Page components
│   ├── components/         # Reusable UI components
│   ├── contexts/           # React contexts (auth)
│   ├── root.tsx            # Root layout
│   ├── routes.ts           # Route definitions
│   └── tailwind.css        # Styles
├── server/                 # Hono API backend
│   ├── routes/             # API route handlers
│   ├── middleware/         # Auth middleware
│   ├── utils/              # Utilities (auth, license)
│   └── types.ts            # Type definitions
├── shared/                 # Shared code
│   └── schemas.ts          # Valibot validation schemas
├── worker.ts               # Cloudflare Worker entry
├── load-context.ts         # React Router context
├── vite.config.ts          # Vite configuration
├── react-router.config.ts  # React Router configuration
├── wrangler.toml           # Cloudflare configuration
├── schema.sql              # D1 database schema
└── package.json
```

## Getting Started

### Prerequisites

- Bun 1.1+
- Cloudflare account
- Stripe account

### Installation

```bash
bun install
cp .env.example .env
```

### Environment Variables

Create a `.env` file:

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
VITE_STRIPE_PRICE_ID=price_your_stripe_price_id
```

## Cloudflare Setup

### 1. Create D1 Database

```bash
wrangler d1 create react-google-maps-db
```

Copy the database ID and update `wrangler.toml`.

### 2. Run Database Migrations

```bash
bun run db:migrate:local   # Local development
bun run db:migrate         # Production
```

### 3. Configure Secrets

```bash
wrangler secret put JWT_SECRET
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET
```

### 4. Update wrangler.toml

```toml
[vars]
APP_URL = "https://your-app.workers.dev"

[[d1_databases]]
database_id = "your-database-id-here"
```

## Development

```bash
# Start development server
bun dev

# Build for production
bun run build

# Deploy to Cloudflare Workers
bun run deploy

# Generate types from wrangler.toml
bun run typegen
```

## Stripe Setup

1. Create a Stripe account at <https://stripe.com>
2. Create a product for the commercial license
3. Create a price of $12/year (recurring)
4. Copy the price ID to your `.env` file
5. Set up webhook endpoint: `https://your-app.workers.dev/api/webhook/stripe`

### Required Webhook Events

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/api/auth/signup` | Create new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/licenses` | Get user licenses |
| GET | `/api/licenses/by-session/:id` | Get license by session |
| POST | `/api/checkout` | Create Stripe checkout |
| POST | `/api/webhook/stripe` | Stripe webhook |

## Validation with Valibot

All requests and responses are validated using Valibot schemas in `shared/schemas.ts`:

```typescript
import * as v from 'valibot';
import { SignupSchema } from '../shared/schemas';

// Validate request
const result = v.safeParse(SignupSchema, body);
if (!result.success) {
  return c.json({ error: result.issues[0].message }, 400);
}
```

## License

Commercial License - See LICENSE file for details.
