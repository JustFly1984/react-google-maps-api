import clsx from 'clsx';
import type { JSX } from 'react';
import type { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { Layout } from './components/layout.tsx';
import { AuthProvider } from './contexts/auth.tsx';
import { styles } from './styles.ts';
import './tailwind.css';

const fallbackContainerClasses = clsx(
  styles.minHScreen,
  styles.flex,
  styles.itemsCenter,
  styles.justifyCenter,
);
const bodyClasses = clsx(
  styles.minHScreen,
  styles.bgGray50,
  styles.textGray900,
  styles.antialiased,
);

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  },
];

export function HydrateFallback(): JSX.Element {
  return (
    <div className={fallbackContainerClasses}>
      <div className={styles.loadingSpinner} />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className={bodyClasses}>
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
