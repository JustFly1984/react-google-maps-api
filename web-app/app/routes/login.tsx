import clsx from 'clsx';
import { type ChangeEvent, type JSX, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import * as v from 'valibot';
import { LocaleLink } from '../utils/locale-link.tsx';

import { LoginSchema, UserResponseSchema } from '../../shared/schemas.ts';
import { useAuth } from '../contexts/auth.tsx';
import { styles } from '../styles.ts';

const UserLoginResponseSchema = v.object({ user: UserResponseSchema });

const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary);
const subtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);
const cardClasses = clsx(styles.card, styles.p8);
const buttonClasses = clsx(styles.wFull, styles.btnPrimary, styles.py3);
const forgotPasswordClasses = clsx(
  styles.textSm,
  styles.textBlue600,
  styles.hoverTextBlue700,
  styles.fontMedium,
);
const signUpContainerClasses = clsx(styles.mt4, styles.textCenter);
const signUpLinkClasses = clsx(styles.textBlue600, styles.hoverTextBlue700, styles.fontMedium);
const footerClasses = clsx(styles.mt4, styles.textCenter, styles.textSm, styles.textThemeSecondary);

export default function LoginPage(): JSX.Element {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const signIn = useCallback(
    async (email: string, password: string): Promise<string | undefined> => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const data = await response.json();

          return data.error || 'Sign in failed';
        }

        const data = await response.json();
        const result = v.safeParse(UserLoginResponseSchema, data);

        if (!result.success) {
          return 'Invalid response from server';
        }

        setUser(result.output.user);

        return;
      } catch (err: unknown) {
        return err instanceof Error ? err.message : 'Sign in failed';
      }
    },
    [],
  );

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();

      setError(null);

      const result = v.safeParse(LoginSchema, { email, password });
      if (!result.success) {
        setError(t('auth.login.validationError'));

        return;
      }

      setLoading(true);

      const signInError = await signIn(email, password);

      if (typeof signInError !== 'undefined') {
        setError(signInError);

        setLoading(false);

        return;
      }

      navigate(i18n.language === 'en' ? '/dashboard' : `/${i18n.language}/dashboard`);
    },
    [email, password, signIn, navigate, i18n.language],
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMaxW}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>{t('auth.login.title')}</h1>
          <p className={subtitleClasses}>{t('auth.login.subtitle')}</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error ? <div className={styles.formError}>{error}</div> : null}

            <div>
              <label htmlFor="email" className={styles.label}>
                {t('auth.login.email')}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                placeholder={t('common.placeholders.email')}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className={styles.label}>
                {t('auth.login.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder={t('common.placeholders.password')}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? t('auth.login.signingIn') : t('auth.login.title')}
            </button>
          </form>

          <div className={signUpContainerClasses}>
            <LocaleLink to="/forgot-password" className={forgotPasswordClasses}>
              {t('auth.login.forgotPassword')}
            </LocaleLink>
          </div>

          <p className={footerClasses}>
            {t('auth.login.noAccount')}{' '}
            <LocaleLink to="/signup" className={signUpLinkClasses}>
              {t('auth.login.signUpLink')}
            </LocaleLink>
          </p>
        </div>
      </div>
    </div>
  );
}
