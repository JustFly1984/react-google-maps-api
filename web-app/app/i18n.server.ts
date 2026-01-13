import Backend from 'i18next-fs-backend/cjs';
import { resolve } from 'node:path';
import { URL } from 'node:url';
import { RemixI18Next } from 'remix-i18next/server';

import i18n from './i18n.ts';

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: i18n.supportedLngs,
    fallbackLanguage: i18n.fallbackLng,
    async findLocale(request: Request): Promise<string> {
      const url = new URL(request.url);
      const locale = url.pathname.split('/').at(1);
      if (locale && i18n.supportedLngs.includes(locale)) {
        return locale;
      }
      return i18n.fallbackLng;
    },
  },
  i18next: {
    ...i18n,
    backend: {
      loadPath: resolve('./public/locales/{{lng}}/{{ns}}.json'),
    },
  },
  plugins: [Backend],
});

export default i18next;
