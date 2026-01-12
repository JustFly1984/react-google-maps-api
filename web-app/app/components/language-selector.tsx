import clsx from 'clsx';
import { ChevronDown, Globe } from 'lucide-react';
import { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { styles } from '../styles.ts';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
] as const;

const selectorButtonClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.px3,
  styles.py2,
  styles.roundedLg,
  styles.border,
  styles.transitionColors,
  styles.textSm,
  styles.fontMedium,
  styles.borderThemeSecondary,
  'hover:border-theme-accent',
  'hover:bg-theme-accent/10',
);

const dropdownClasses = clsx(
  styles.absolute,
  styles.topFull,
  styles.right0,
  styles.mt1,
  styles.w48,
  styles.roundedLg,
  styles.border,
  styles.borderThemeSecondary,
  styles.bgWhite,
  styles.shadowLg,
  styles.zIndex50,
  'dark:bg-gray-900',
);

const dropdownItemClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap3,
  styles.px3,
  styles.py2,
  styles.textSm,
  'hover:bg-theme-accent/10',
  'cursor-pointer',
  styles.transitionColors,
);

const dropdownItemActiveClasses = clsx('bg-theme-accent', 'text-white');

export function LanguageSelector(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.info('LanguageSelector i18n.language', i18n.language);

  const currentLanguage = useMemo(() => {
    return languages.find((lang) => lang.code === i18n.language) || languages[0];
  }, [i18n.language]);

  const setLanguage = useCallback(
    (lng: string): void => {
      console.info('setLanguage lng', lng);

      const currentPath = location.pathname;

      console.info('setLanguage currentPath', currentPath);

      const pathWithoutLocale = currentPath.replace(/^\/(en|es|de|fr|ru)/, '') || '/';

      console.info('setLanguage pathWithoutLocale', pathWithoutLocale);

      i18n
        .changeLanguage(lng)
        .then(() => {
          console.info('i18n.language changed to', i18n.language);

          // Navigate to the new path
          if (lng === 'en') {
            navigate(pathWithoutLocale);
          } else {
            navigate(`/${lng}${pathWithoutLocale}`);
          }

          setIsOpen(false);
        })
        .catch((error) => {
          console.error('Failed to change language:', error);
        });
    },
    [location.pathname, navigate, i18n],
  );

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      setLanguage(langCode);
    },
    [setLanguage],
  );

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const open = useCallback(() => {
    setIsOpen((isOpen: boolean): boolean => {
      return !isOpen;
    });
  }, []);

  return (
    <div className={styles.relative} ref={dropdownRef}>
      <button
        type="button"
        onClick={open}
        className={selectorButtonClasses}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className={clsx(styles.h4, styles.w4)} />

        <span className={clsx(styles.flex, styles.itemsCenter, styles.gap2)}>
          <span>{currentLanguage.flag}</span>
          <span>{currentLanguage.name}</span>
        </span>

        <ChevronDown
          className={clsx(styles.h4, styles.w4, styles.transitionTransform, {
            'rotate-180': isOpen,
          })}
        />
      </button>

      {isOpen ? (
        <div className={dropdownClasses} role="menu">
          {languages.map((language) => (
            <div
              key={language.code}
              role="menuitem"
              className={clsx(
                dropdownItemClasses,
                i18n.language === language.code && dropdownItemActiveClasses,
              )}
              onClick={() => {
                return handleLanguageChange(language.code);
              }}
            >
              <span className="text-lg">{language.flag}</span>
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <span className={clsx('ml-auto', styles.textXs)}>✓</span>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
