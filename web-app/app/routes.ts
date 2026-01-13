import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  // English routes (unprefixed)
  index('routes/home.tsx'),
  route('docs/:section?', 'routes/docs.tsx'),
  route('pricing', 'routes/pricing.tsx'),
  route('login', 'routes/login.tsx'),
  route('signup', 'routes/signup.tsx'),
  route('forgot-password', 'routes/forgot-password.tsx'),
  route('reset-password', 'routes/reset-password.tsx'),
  route('dashboard', 'routes/dashboard.tsx'),
  route('checkout/success', 'routes/checkout-success.tsx'),

  // Localized routes (prefixed)
  layout('routes/locale-layout.tsx', [
    route('es', 'routes/home.tsx', { id: 'routes/home-es' }),
    route('es/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-es' }),
    route('es/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-es' }),
    route('es/login', 'routes/login.tsx', { id: 'routes/login-es' }),
    route('es/signup', 'routes/signup.tsx', { id: 'routes/signup-es' }),
    route('es/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-es',
    }),
    route('es/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-es',
    }),
    route('es/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-es' }),
    route('es/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-es',
    }),
    route('de', 'routes/home.tsx', { id: 'routes/home-de' }),
    route('de/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-de' }),
    route('de/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-de' }),
    route('de/login', 'routes/login.tsx', { id: 'routes/login-de' }),
    route('de/signup', 'routes/signup.tsx', { id: 'routes/signup-de' }),
    route('de/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-de',
    }),
    route('de/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-de',
    }),
    route('de/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-de' }),
    route('de/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-de',
    }),
    route('fr', 'routes/home.tsx', { id: 'routes/home-fr' }),
    route('fr/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-fr' }),
    route('fr/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-fr' }),
    route('fr/login', 'routes/login.tsx', { id: 'routes/login-fr' }),
    route('fr/signup', 'routes/signup.tsx', { id: 'routes/signup-fr' }),
    route('fr/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-fr',
    }),
    route('fr/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-fr',
    }),
    route('fr/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-fr' }),
    route('fr/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-fr',
    }),
    route('ru', 'routes/home.tsx', { id: 'routes/home-ru' }),
    route('ru/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-ru' }),
    route('ru/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-ru' }),
    route('ru/login', 'routes/login.tsx', { id: 'routes/login-ru' }),
    route('ru/signup', 'routes/signup.tsx', { id: 'routes/signup-ru' }),
    route('ru/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-ru',
    }),
    route('ru/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-ru',
    }),
    route('ru/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-ru' }),
    route('ru/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-ru',
    }),

    route('it', 'routes/home.tsx', { id: 'routes/home-it' }),
    route('it/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-it' }),
    route('it/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-it' }),
    route('it/login', 'routes/login.tsx', { id: 'routes/login-it' }),
    route('it/signup', 'routes/signup.tsx', { id: 'routes/signup-it' }),
    route('it/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-it',
    }),
    route('it/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-it',
    }),
    route('it/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-it' }),
    route('it/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-it',
    }),

    route('ja', 'routes/home.tsx', { id: 'routes/home-ja' }),
    route('ja/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-ja' }),
    route('ja/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-ja' }),
    route('ja/login', 'routes/login.tsx', { id: 'routes/login-ja' }),
    route('ja/signup', 'routes/signup.tsx', { id: 'routes/signup-ja' }),
    route('ja/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-ja',
    }),
    route('ja/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-ja',
    }),
    route('ja/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-ja' }),
    route('ja/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-ja',
    }),

    route('zh-CN', 'routes/home.tsx', { id: 'routes/home-zh-CN' }),
    route('zh-CN/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-zh-CN' }),
    route('zh-CN/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-zh-CN' }),
    route('zh-CN/login', 'routes/login.tsx', { id: 'routes/login-zh-CN' }),
    route('zh-CN/signup', 'routes/signup.tsx', { id: 'routes/signup-zh-CN' }),
    route('zh-CN/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-zh-CN',
    }),
    route('zh-CN/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-zh-CN',
    }),
    route('zh-CN/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-zh-CN' }),
    route('zh-CN/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-zh-CN',
    }),

    route('zh-TW', 'routes/home.tsx', { id: 'routes/home-zh-TW' }),
    route('zh-TW/docs/:section?', 'routes/docs.tsx', { id: 'routes/docs-zh-TW' }),
    route('zh-TW/pricing', 'routes/pricing.tsx', { id: 'routes/pricing-zh-TW' }),
    route('zh-TW/login', 'routes/login.tsx', { id: 'routes/login-zh-TW' }),
    route('zh-TW/signup', 'routes/signup.tsx', { id: 'routes/signup-zh-TW' }),
    route('zh-TW/forgot-password', 'routes/forgot-password.tsx', {
      id: 'routes/forgot-password-zh-TW',
    }),
    route('zh-TW/reset-password', 'routes/reset-password.tsx', {
      id: 'routes/reset-password-zh-TW',
    }),
    route('zh-TW/dashboard', 'routes/dashboard.tsx', { id: 'routes/dashboard-zh-TW' }),
    route('zh-TW/checkout/success', 'routes/checkout-success.tsx', {
      id: 'routes/checkout-success-zh-TW',
    }),
  ]),
] as const satisfies RouteConfig;
