import clsx from 'clsx';
import type { ChangeEvent, JSX } from 'react';
import { useCallback, useState } from 'react';
import { Link } from 'react-router';
import * as v from 'valibot';

import { ForgotPasswordSchema } from '../../shared/schemas.ts';
import { styles } from '../styles.ts';

const pageContainerClasses = styles.pageContainer;
const pageMaxWClasses = styles.pageMaxW;
const successContainerClasses = clsx(styles.card, styles.p8, styles.textCenter);
const successIconClasses = clsx(styles.iconXl, styles.textGreen600);
const successTitleClasses = clsx(styles.text2xl, styles.fontBold, styles.textGray900, styles.mb2);
const successTextClasses = clsx(styles.textGray600, styles.mb6);
const successLinkClasses = clsx(styles.textBlue600, styles.hoverTextBlue700, styles.fontMedium);
const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textGray900);
const subtitleClasses = clsx(styles.mt2, styles.textGray600);
const cardClasses = clsx(styles.card, styles.p8);
const footerClasses = clsx(styles.mt6, styles.textCenter, styles.textSm, styles.textGray600);
const footerLinkClasses = clsx(styles.textBlue600, styles.hoverTextBlue700, styles.fontMedium);
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
        setError('Please enter a valid email address');
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
          setError(data.error || 'Something went wrong');
          setLoading(false);
          return;
        }

        setSuccess(true);
      } catch {
        setError('Failed to send reset email. Please try again.');
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

            <h1 className={successTitleClasses}>Check Your Email</h1>

            <p className={successTextClasses}>
              If an account exists for {email}, you will receive a password reset link shortly.
            </p>

            <Link to="/login" className={successLinkClasses}>
              Back to Sign In
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
          <h1 className={titleClasses}>Forgot Password?</h1>
          <p className={subtitleClasses}>Enter your email and we'll send you a reset link.</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error && <div className={styles.formError}>{error}</div>}

            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={styles.input}
                placeholder="you@example.com"
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          <p className={footerClasses}>
            Remember your password?{' '}
            <Link to="/login" className={footerLinkClasses}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
