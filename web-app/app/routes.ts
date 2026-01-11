import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/:section?', 'routes/docs.tsx'),
  route('pricing', 'routes/pricing.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('forgot-password', 'routes/forgot-password.tsx'),
  route('reset-password', 'routes/reset-password.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('checkout/success', 'routes/checkout-success.tsx'),
] as const satisfies RouteConfig;
