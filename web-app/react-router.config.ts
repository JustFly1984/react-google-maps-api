import type { Config } from '@react-router/dev/config';

const routes = [
  '/',
  '/docs',
  '/docs/autocomplete',
  '/docs/bicycling-layer',
  '/docs/circle',
  '/docs/data',
  '/docs/directions-renderer',
  '/docs/directions-service',
  '/docs/distance-matrix-service',
  '/docs/drawing-manager',
  '/docs/google-map',
  '/docs/ground-overlay',
  '/docs/heat-map-layer',
  '/docs/info-box',
  '/docs/info-window',
  '/docs/kml-layer',
  '/docs/load-script',
  '/docs/load-script-next',
  '/docs/marker',
  '/docs/marker-clusterer',
  '/docs/overlay-view',
  '/docs/polygon',
  '/docs/polyline',
  '/docs/rectangle',
  '/docs/standalone-search-box',
  '/docs/street-view-panorama',
  '/docs/street-view-service',
  '/docs/traffic-layer',
  '/docs/transit-layer',
  '/pricing',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/dashboard',
  '/checkout/success',
];

const locales = ['en', 'ru'];

const localizedRoutes = locales.flatMap((locale) => routes.map((route) => `/${locale}${route}`));

export default {
  ssr: false,
  prerender: [...routes, ...localizedRoutes],
  future: {
    v8_viteEnvironmentApi: true,
  },
} satisfies Config;
