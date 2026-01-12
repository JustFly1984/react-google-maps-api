import clsx from 'clsx';
import { LogOut, Menu, User, X } from 'lucide-react';
import { type JSX, ReactNode, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { commonTexts, navigation } from '../constants/texts.ts';
import { useAuth } from '../contexts/auth.tsx';
import { styles } from '../styles.ts';
import { Logo } from './logo.tsx';
import { ThemeToggle } from './theme-toggle.tsx';

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
              <Link to="/" className={logoLinkClasses}>
                <span className={logoBoxClasses}>
                  <Logo />
                </span>
                <span className={logoTextClasses}>React Google Maps</span>
              </Link>
              <div className={navDesktopClasses}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={
                      location.pathname === item.href
                        ? navLinkActiveClasses
                        : navLinkInactiveClasses
                    }
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className={userMenuClasses}>
              <ThemeToggle />

              {user !== null ? (
                <>
                  <Link to="/dashboard" className={userLinkClasses}>
                    <User className={styles.iconSm} />
                    {commonTexts.buttons.dashboard}
                  </Link>
                  <button onClick={handleSignOut} className={signOutButtonClasses}>
                    <LogOut className={styles.iconSm} />
                    {commonTexts.buttons.signOut}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.btnSecondary}>
                    {commonTexts.buttons.signIn}
                  </Link>
                  <Link to="/signup" className={styles.btnPrimary}>
                    {commonTexts.buttons.signUp}
                  </Link>
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

          {mobileMenuOpen ? (
            <div className={mobileMenuClasses}>
              <div className={mobileNavClasses}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={mobileNavLinkClasses}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ))}

                {user !== null ? (
                  <>
                    <Link
                      to="/dashboard"
                      className={mobileUserLinkClasses}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                    <button onClick={handleMobileSignOut} className={mobileSignOutButtonClasses}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={mobileSignInLinkClasses} onClick={closeMobileMenu}>
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className={mobileSignUpLinkClasses}
                      onClick={closeMobileMenu}
                    >
                      Get Started
                    </Link>
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
              {commonTexts.footer.copyright(new Date().getFullYear())}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
