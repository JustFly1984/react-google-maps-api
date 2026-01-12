import type { JSX, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, type LinkProps } from 'react-router';

const SUPPORTED_LOCALES = ['en', 'ru', 'es', 'de', 'fr', 'it', 'ja', 'zh-CN', 'zh-TW'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

function isSupportedLocale(lang: string): lang is SupportedLocale {
  return SUPPORTED_LOCALES.includes(lang as SupportedLocale);
}

export function LocaleLink({
  to,
  children,
  ...props
}: LinkProps & { children: ReactNode }): JSX.Element {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const localizedTo =
    typeof to === 'string' && isSupportedLocale(currentLocale)
      ? `${currentLocale === 'en' ? '' : `/${currentLocale}`}${to.startsWith('/') ? to : `/${to}`}`
      : to;

  return (
    <RouterLink to={localizedTo} {...props}>
      {children}
    </RouterLink>
  );
}
