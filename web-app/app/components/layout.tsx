import clsx from 'clsx';
import { LogOut, Menu, User, X } from 'lucide-react';
import { type JSX, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import { useAuth } from '../contexts/auth.tsx';
import { styles } from '../styles.ts';
import { LocaleLink } from '../utils/locale-link.tsx';
import { LanguageSelector } from './language-selector.tsx';
import { Logo } from './logo.tsx';
import { ThemeToggle } from './theme-toggle.tsx';
export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Pricing', href: '/pricing' },
] as const;

const navigationKeyByHref: Record<(typeof navigation)[number]['href'], string> = {
  '/': 'navigation.home',
  '/docs': 'navigation.documentation',
  '/pricing': 'navigation.pricing',
};

const layoutClasses = clsx(styles.minHScreen, styles.flex, styles.flexCol);
const logoContainerClasses = clsx(styles.flex, styles.itemsCenter, styles.gap8);
const logoLinkClasses = clsx(styles.flex, styles.itemsCenter, styles.gap2);
const logoBoxClasses = clsx(styles.block, styles.h8, styles.w8);
const logoTextClasses = clsx(styles.fontBold, styles.textXl, styles.textThemePrimary);
const navDesktopClasses = clsx(styles.hidden, styles.mdFlex, styles.itemsCenter, styles.gap6);
const navLinkClasses = clsx(styles.textSm, styles.fontMedium, styles.transitionColors);
const navLinkActiveClasses = clsx(navLinkClasses, styles.textThemeAccent);
const navLinkInactiveClasses = clsx(navLinkClasses, styles.textThemeSecondary);
const userMenuClasses = clsx(styles.hidden, styles.lgFlex, styles.itemsCenter, styles.gap4);
const headerControlsClasses = clsx(styles.flex, styles.itemsCenter, styles.gap2);
const userLinkClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.textSm,
  styles.fontMedium,
  styles.textThemeSecondary,
);
const signOutButtonClasses = clsx(
  styles.flex,
  styles.itemsCenter,
  styles.gap2,
  styles.textSm,
  styles.fontMedium,
  styles.textThemeSecondary,
);
const mobileMenuButtonClasses = clsx(styles.lgHidden, styles.p2);
const mobileMenuClasses = clsx(styles.lgHidden, styles.py4, styles.borderT, styles.px4);
const mobileNavClasses = clsx(styles.flex, styles.flexCol, styles.gap4);
const mobileNavLinkClasses = clsx(styles.textSm, styles.fontMedium, styles.textThemeSecondary);
const mobileUserLinkClasses = clsx(styles.textSm, styles.fontMedium, styles.textThemeSecondary);
const mobileSignOutButtonClasses = clsx(
  styles.textSm,
  styles.fontMedium,
  styles.textThemeSecondary,
  styles.textLeft,
);
const mobileSignInLinkClasses = clsx(styles.textSm, styles.fontMedium, styles.textThemeSecondary);
const mobileSignUpLinkClasses = clsx(styles.textSm, styles.fontMedium, styles.textThemeAccent);
const footerContainerClasses = clsx(styles.containerMaxW7xl, styles.py12);
const footerContentClasses = clsx(
  styles.flex,
  styles.flexCol,
  styles.lgFlexRow,
  styles.justifyBetween,
  styles.itemsCenter,
  styles.gap4,
);
const footerLogoClasses = clsx(styles.flex, styles.itemsCenter, styles.gap2);
const footerLogoBoxClasses = clsx(styles.block, styles.h6, styles.w6);
const footerTextClasses = clsx(styles.fontBold, styles.textThemeInverse);

export function Layout({ children }: { children: ReactNode }): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();

  const handleSignOut = useCallback((): void => {
    signOut();
  }, [signOut]);

  const toggleMobileMenu = useCallback((): void => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback((): void => {
    setMobileMenuOpen(false);
  }, []);

  const handleMobileSignOut = useCallback((): void => {
    signOut();
    setMobileMenuOpen(false);
  }, [signOut]);

  return (
    <div className={layoutClasses}>
      <header className={'header'}>
        <nav className={styles.containerMaxW7xl}>
          <div className={styles.h16Flex}>
            <div className={logoContainerClasses}>
              <LocaleLink to="/" className={logoLinkClasses}>
                <span className={logoBoxClasses}>
                  <Logo />
                </span>
                <span className={logoTextClasses}>React Google Maps</span>
              </LocaleLink>
              <div className={navDesktopClasses}>
                {navigation.map((item) => (
                  <LocaleLink
                    key={item.href}
                    to={item.href}
                    className={
                      location.pathname === item.href
                        ? navLinkActiveClasses
                        : navLinkInactiveClasses
                    }
                  >
                    {t(navigationKeyByHref[item.href])}
                  </LocaleLink>
                ))}
              </div>
            </div>

            <div className={headerControlsClasses}>
                <ThemeToggle />
                <LanguageSelector />

              <div className={userMenuClasses}>
                {user !== null ? (
                  <>
                    <LocaleLink to="/dashboard" className={userLinkClasses}>
                      <User className={styles.iconSm} />
                      {t('common.buttons.dashboard')}
                    </LocaleLink>
                    <button onClick={handleSignOut} className={signOutButtonClasses}>
                      <LogOut className={styles.iconSm} />
                      {t('common.buttons.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <LocaleLink to="/login" className={styles.btnSecondary}>
                      {t('common.buttons.signIn')}
                    </LocaleLink>
                    <LocaleLink to="/signup" className={styles.btnPrimary}>
                      {t('common.buttons.signUp')}
                    </LocaleLink>
                  </>
                )}
              </div>

              <button className={mobileMenuButtonClasses} onClick={toggleMobileMenu}>
                {mobileMenuOpen ? (
                  <X className={styles.iconLg} />
                ) : (
                  <Menu className={styles.iconLg} />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen ? (
            <div className={mobileMenuClasses}>
              <div className={mobileNavClasses}>
                {navigation.map((item) => (
                  <LocaleLink
                    key={item.name}
                    to={item.href}
                    className={mobileNavLinkClasses}
                    onClick={closeMobileMenu}
                  >
                    {t(navigationKeyByHref[item.href])}
                  </LocaleLink>
                ))}

                {user !== null ? (
                  <>
                    <LocaleLink
                      to="/dashboard"
                      className={mobileUserLinkClasses}
                      onClick={closeMobileMenu}
                    >
                      {t('common.buttons.dashboard')}
                    </LocaleLink>
                    <button onClick={handleMobileSignOut} className={mobileSignOutButtonClasses}>
                      {t('common.buttons.signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <LocaleLink
                      to="/login"
                      className={mobileSignInLinkClasses}
                      onClick={closeMobileMenu}
                    >
                      {t('common.buttons.signIn')}
                    </LocaleLink>
                    <LocaleLink
                      to="/signup"
                      className={mobileSignUpLinkClasses}
                      onClick={closeMobileMenu}
                    >
                      {t('common.buttons.signUp')}
                    </LocaleLink>
                  </>
                )}
              </div>
            </div>
          ) : null}
        </nav>
      </header>

      <main className={styles.flex1}>{children}</main>

      <footer className={'footer'}>
        <div className={footerContainerClasses}>
          <div className={footerContentClasses}>
            <div className={footerLogoClasses}>
              <span className={footerLogoBoxClasses}>
                <Logo />
              </span>
              <span className={footerTextClasses}>React Google Maps API</span>
            </div>
            <p className={styles.textSm}>
              {t('common.footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
