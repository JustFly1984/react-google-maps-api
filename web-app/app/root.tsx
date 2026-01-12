import clsx from 'clsx';
import { useEffect, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import type { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { Layout } from './components/layout.tsx';
import { AuthProvider } from './contexts/auth.tsx';
import { useTheme } from './contexts/theme.tsx';
import { styles } from './styles.ts';
import './tailwind.css';

const fallbackContainerClasses = clsx(
  styles.minHScreen,
  styles.flex,
  styles.itemsCenter,
  styles.justifyCenter,
);
const bodyClasses = clsx(styles.minHScreen, styles.antialiased);

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className={bodyClasses}>
        <div className={fallbackContainerClasses}>
          <div className={styles.loadingSpinner} />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

function Document({ locale, dir }: { locale: string; dir: string }): JSX.Element {
  const { theme } = useTheme();

  const htmlClassName = theme === 'dark' ? 'dark' : undefined;

  return (
    <html lang={locale} dir={dir} className={htmlClassName}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className={bodyClasses}>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App(): JSX.Element {
  const { i18n } = useTranslation();

  const locale = i18n.resolvedLanguage ?? i18n.language ?? 'en';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = i18n.dir(locale);
  }, [locale, i18n]);

  return (
    <AuthProvider>
      <Document locale={locale} dir={i18n.dir(locale)} />
    </AuthProvider>
  );
}
