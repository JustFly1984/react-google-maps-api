import { useEffect, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router';

const SUPPORTED_LOCALES = ['en', 'es', 'de', 'fr', 'ru'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(lang: string | undefined): lang is SupportedLocale {
  return SUPPORTED_LOCALES.includes(lang as SupportedLocale);
}

export default function LocaleLayout(): JSX.Element {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (typeof lang !== 'undefined' && isSupportedLocale(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
}
