import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { HydratedRouter } from 'react-router/dom';
import { getInitialNamespaces } from 'remix-i18next/client';

import { AuthProvider } from './contexts/auth.tsx';
import { ThemeProvider } from './contexts/theme.tsx';
import i18n from './i18n.ts';

async function hydrate(): Promise<void> {
  try {
    await i18next
      .use(initReactI18next)
      .use(HttpBackend)
      .use(LanguageDetector)
      .init({
        ...i18n,
        ns: getInitialNamespaces(),
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
          order: ['localStorage', 'htmlTag', 'navigator'],
          caches: ['localStorage'],
        },
      });

    document.addEventListener(
      'pointerdown',
      (event) => {
        console.debug('pointerdown captured', {
          target: (event.target as HTMLElement | null)?.tagName,
          className: (event.target as HTMLElement | null)?.className,
        });
      },
      true,
    );

    document.addEventListener(
      'click',
      (event) => {
        console.debug('click captured', {
          target: (event.target as HTMLElement | null)?.tagName,
          className: (event.target as HTMLElement | null)?.className,
        });
      },
      true,
    );

    startTransition(async (): Promise<void> => {
      console.info('Starting React hydration...');

      try {
        hydrateRoot(
          document,
          <StrictMode>
            <I18nextProvider i18n={i18next}>
              <ThemeProvider>
                <AuthProvider>
                  <HydratedRouter />
                </AuthProvider>
              </ThemeProvider>
            </I18nextProvider>
          </StrictMode>,
        );
        console.info('React hydration completed successfully');
      } catch (hydrationError: unknown) {
        console.error('React hydration failed:', hydrationError);
        throw hydrationError;
      }
    });
  } catch (error: unknown) {
    console.error('hydrate() failed', error);
  }
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
