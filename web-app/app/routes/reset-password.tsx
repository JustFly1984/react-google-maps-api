import clsx from 'clsx';
import type { ChangeEvent, FormEvent, JSX } from 'react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

import * as v from 'valibot';
import { LocaleLink } from '../utils/locale-link.tsx';

import { ResetPasswordSchema } from '../../shared/schemas.ts';
import { authTexts, commonTexts } from '../constants/texts.ts';
import { styles } from '../styles.ts';

const successContainerClasses = clsx(styles.card, styles.p8, styles.textCenter);
const successIconClasses = clsx(styles.iconXl, styles.textGreen600);
const successTitleClasses = clsx(
  styles.text2xl,
  styles.fontBold,
  styles.textThemePrimary,
  styles.mb2,
);
const successTextClasses = clsx(styles.textThemeSecondary, styles.mb6);
const successLinkClasses = clsx(styles.textBlue600, styles.hoverTextBlue700, styles.fontMedium);
const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary);
const subtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);
const cardClasses = clsx(styles.card, styles.p8);
const buttonClasses = clsx(styles.wFull, styles.btnPrimary, styles.py3);

export default function ResetPasswordPage(): JSX.Element {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  }, []);

  const handleConfirmPasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent): Promise<void> => {
      e.preventDefault();
      setError(null);

      if (password !== confirmPassword) {
        setError(authTexts.resetPassword.passwordsDoNotMatch);

        return;
      }

      const result = v.safeParse(ResetPasswordSchema, { password });
      if (!result.success) {
        setError(result.issues[0].message);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password }),
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || authTexts.resetPassword.genericError);
          setLoading(false);
          return;
        }

        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } catch {
        setError(authTexts.resetPassword.error);
      } finally {
        setLoading(false);
      }
    },
    [password, confirmPassword],
  );

  if (success) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.pageMaxW}>
          <div className={successContainerClasses}>
            <div className={styles.successIcon}>
              <svg
                className={successIconClasses}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className={successTitleClasses}>{authTexts.resetPassword.successTitle}</h1>
            <p className={successTextClasses}>{authTexts.resetPassword.successText}</p>
            <LocaleLink to="/login" className={successLinkClasses}>
              {authTexts.resetPassword.backToLogin}
            </LocaleLink>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMaxW}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>{authTexts.resetPassword.title}</h1>
          <p className={subtitleClasses}>{authTexts.resetPassword.subtitle}</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error ? <div className={styles.formError}>{error}</div> : null}

            <div>
              <label htmlFor="password" className={styles.label}>
                {authTexts.resetPassword.newPassword}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder={commonTexts.placeholders.password}
                minLength={6}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={styles.label}>
                {authTexts.resetPassword.confirmPassword}
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={styles.input}
                placeholder={commonTexts.placeholders.password}
                minLength={6}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? authTexts.resetPassword.resetting : authTexts.resetPassword.submit}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
