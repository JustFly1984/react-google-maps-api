import clsx from 'clsx';
import { useCallback, useRef, useState, type ChangeEvent, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import * as v from 'valibot';
import { LocaleLink } from '../utils/locale-link.tsx';

import { SignupSchema } from '../../shared/schemas.ts';

import { styles } from '../styles.ts';

import { UserResponseSchema } from '../../shared/schemas.ts';
import { SEO } from '../components/seo.tsx';
import { useAuth } from '../contexts/auth.tsx';

const UserLoginResponseSchema = v.object({ user: UserResponseSchema });

const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary);
const subtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);
const cardClasses = clsx(styles.card, styles.p8);
const buttonClasses = clsx(styles.wFull, styles.btnPrimary, styles.py3);
const footerClasses = clsx(styles.mt6, styles.textCenter, styles.textSm, styles.textThemeSecondary);
const linkClasses = clsx('text-theme-link', styles.fontMedium);

export default function SignUpPage(): JSX.Element {
  const { t, i18n } = useTranslation();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isSigningUpRef = useRef(false);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      fullName: string,
      locale: string,
    ): Promise<string | undefined> => {
      if (loading) {
        return;
      }

      try {
        isSigningUpRef.current = true;

        setLoading(true);

        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password, fullName, locale }),
        });

        if (!response.ok) {
          const data = await response.json();

          return data.error ?? t('auth.signup.failed');
        }

        const data = await response.json();

        const result = v.safeParse(UserLoginResponseSchema, data);

        if (!result.success) {
          return t('auth.signup.invalidResponse');
        }

        setUser(result.output.user);

        return;
      } catch (err: unknown) {
        return err instanceof Error ? err.message : JSON.stringify(err);
      } finally {
        isSigningUpRef.current = false;
        setLoading(false);
      }
    },
    [setUser, t],
  );

  const handleFullNameChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.target.value);
  }, []);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setError(null);

      if (password !== confirmPassword) {
        setError(t('auth.signup.passwordsDoNotMatch'));

        return;
      }

      const result = v.safeParse(SignupSchema, {
        email,
        password,
        fullName,
        locale: i18n.language,
      });

      if (!result.success) {
        setError(result.issues[0].message);

        return;
      }

      setLoading(true);

      const signUpError = await signUp(email, password, fullName, i18n.language);

      if (typeof signUpError !== 'undefined') {
        setError(signUpError);

        setLoading(false);

        return;
      }

      navigate(i18n.language === 'en' ? '/dashboard' : `/${i18n.language}/dashboard`);
    },
    [email, password, confirmPassword, fullName, navigate, signUp, i18n.language],
  );

  return (
    <div className={styles.pageContainer}>
      <SEO title={t('seo.signup.title')} description={t('seo.signup.description')} />
      <div className={styles.pageMaxW}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>{t('auth.signup.title')}</h1>
          <p className={subtitleClasses}>{t('auth.signup.subtitle')}</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error ? <div className={styles.formError}>{error}</div> : null}

            <div>
              <label htmlFor="fullName" className={styles.label}>
                {t('auth.signup.fullName')}
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                className={styles.input}
                placeholder={t('common.placeholders.fullName')}
              />
            </div>

            <div>
              <label htmlFor="email" className={styles.label}>
                {t('auth.signup.email')}
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
                {t('auth.signup.password')}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder={t('common.placeholders.password')}
                required
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={styles.label}>
                {t('auth.signup.confirmPassword')}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={styles.input}
                placeholder={t('common.placeholders.password')}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? t('auth.signup.creatingAccount') : t('auth.signup.title')}
            </button>
          </form>

          <p className={footerClasses}>
            {t('auth.signup.hasAccount')}{' '}
            <LocaleLink to="/login" className={linkClasses}>
              {t('auth.signup.signInLink')}
            </LocaleLink>
          </p>
        </div>
      </div>
    </div>
  );
}
