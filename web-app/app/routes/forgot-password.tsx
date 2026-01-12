import clsx from 'clsx';
import type { ChangeEvent, JSX } from 'react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import * as v from 'valibot';

import { ForgotPasswordSchema } from '../../shared/schemas.ts';
import { authTexts, commonTexts } from '../constants/texts.ts';
import { styles } from '../styles.ts';

const pageContainerClasses = styles.pageContainer;
const pageMaxWClasses = styles.pageMaxW;
const successContainerClasses = clsx(styles.card, styles.p8, styles.textCenter);
const successIconClasses = clsx(styles.iconXl, styles.textSuccess);
const successTitleClasses = clsx(
  styles.text2xl,
  styles.fontBold,
  styles.textThemePrimary,
  styles.mb2,
);
const successTextClasses = clsx(styles.textThemeSecondary, styles.mb6);
const successLinkClasses = clsx(
  styles.textThemeAccent,
  styles.hoverTextAccentHover,
  styles.fontMedium,
);
const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textThemePrimary);
const subtitleClasses = clsx(styles.mt2, styles.textThemeSecondary);
const cardClasses = clsx(styles.card, styles.p8);
const footerClasses = clsx(styles.mt6, styles.textCenter, styles.textSm, styles.textThemeSecondary);
const footerLinkClasses = clsx(
  styles.textThemeAccent,
  styles.hoverTextAccentHover,
  styles.fontMedium,
);
const buttonClasses = clsx(styles.wFull, styles.btnPrimary, styles.py3);

export default function ForgotPasswordPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      setError(null);

      const result = v.safeParse(ForgotPasswordSchema, { email });

      if (!result.success) {
        setError(authTexts.forgotPassword.validationError);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || authTexts.forgotPassword.genericError);
          setLoading(false);
          return;
        }

        setSuccess(true);
      } catch {
        setError(authTexts.forgotPassword.sendError);
      } finally {
        setLoading(false);
      }
    },
    [email],
  );

  if (success) {
    return (
      <div className={pageContainerClasses}>
        <div className={pageMaxWClasses}>
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

            <h1 className={successTitleClasses}>{authTexts.forgotPassword.successTitle}</h1>

            <p className={successTextClasses}>{authTexts.forgotPassword.successText}</p>

            <Link to="/login" className={successLinkClasses}>
              {authTexts.forgotPassword.backToLogin}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={pageContainerClasses}>
      <div className={pageMaxWClasses}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>{authTexts.forgotPassword.title}</h1>
          <p className={subtitleClasses}>{authTexts.forgotPassword.subtitle}</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error && <div className={styles.formError}>{error}</div>}

            <div>
              <label htmlFor="email" className={styles.label}>
                {authTexts.forgotPassword.email}
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                placeholder={commonTexts.placeholders.email}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? authTexts.forgotPassword.sending : authTexts.forgotPassword.submit}
            </button>
          </form>

          <p className={footerClasses}>
            {commonTexts.footer.rememberPassword}{' '}
            <Link to="/login" className={footerLinkClasses}>
              {commonTexts.buttons.signIn}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
