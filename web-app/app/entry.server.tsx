import { createReadableStreamFromReadable } from '@react-router/node';
import { createInstance } from 'i18next';
import Backend from 'i18next-fs-backend/cjs';
import { isbot } from 'isbot';
import { resolve as resolvePath } from 'node:path';
import { PassThrough } from 'node:stream';
import type { RenderToPipeableStreamOptions } from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import type { AppLoadContext, EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';

import { AuthProvider } from './contexts/auth.tsx';
import { ThemeProvider } from './contexts/theme.tsx';
import i18next from './i18n.server.ts';
import i18n from './i18n.ts';

export const streamTimeout = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  console.info('SSR: Starting handleRequest for', request.url);

  const i18nextInstance = createInstance();
  const lng = await i18next.getLocale(request);
  const namespaces = i18next.getRouteNamespaces(routerContext);

  console.info('SSR: Locale detected:', lng);

  await i18nextInstance
    .use(initReactI18next)
    .use(Backend)
    .init({
      ...i18n,
      lng,
      ns: namespaces,
      backend: {
        addPath: resolvePath('./public/locales'),
        loadPath: resolvePath('./public/locales/{{lng}}/{{ns}}.json'),
      },
    });

  return new Promise((resolve, reject): void => {
    let shellRendered = false;
    const userAgent = request.headers.get('user-agent');

    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode ? 'onAllReady' : 'onShellReady';

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18nextInstance}>
        <ThemeProvider>
          <AuthProvider>
            <ServerRouter context={routerContext} url={request.url} />
          </AuthProvider>
        </ThemeProvider>
      </I18nextProvider>,
      {
        [readyOption](): void {
          console.info('SSR: Shell ready, piping response');
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError(error: unknown): void {
          console.error('SSR: Shell error:', error);
          reject(error);
        },
        onError(error: unknown): void {
          console.error('SSR: Render error:', error);
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    globalThis.setTimeout(abort, streamTimeout + 1000);
  });
}
