import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

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
  layout('routes/locale-layout.tsx', [
    route(':lang', 'routes/home.tsx', { id: 'routes/home-localized' }),
    route(':lang/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-localized' }),
    route(':lang/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-localized' }),
    route(':lang/login', 'routes/login.tsx', { id: 'routes/login-localized' }),
    route(':lang/signup', 'routes/signup.tsx', { id: 'routes/signup-localized' }),
    route(':lang/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-localized',
    }),
    route(':lang/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-localized',
    }),
    route(':lang/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-localized' }),
    route(':lang/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-localized',
    }),
  ]),
] as const satisfies RouteConfig;
