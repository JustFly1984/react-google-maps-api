import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('docs/:section?', 'routes/docs.tsx'),
  route('pricing', 'routes/pricing.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('checkout/success', 'routes/checkout-success.tsx'),
] satisfies RouteConfig;
