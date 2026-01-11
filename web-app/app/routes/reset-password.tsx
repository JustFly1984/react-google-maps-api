import clsx from 'clsx';
import type { ChangeEvent, FormEvent, JSX } from 'react';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import * as v from 'valibot';

import { ResetPasswordSchema } from '../../shared/schemas.ts';
import { styles } from '../styles.ts';

const successContainerClasses = clsx(styles.card, styles.p8, styles.textCenter);
const successIconClasses = clsx(styles.iconXl, styles.textGreen600);
const successTitleClasses = clsx(styles.text2xl, styles.fontBold, styles.textGray900, styles.mb2);
const successTextClasses = clsx(styles.textGray600, styles.mb6);
const successLinkClasses = clsx(styles.textBlue600, styles.hoverTextBlue700, styles.fontMedium);
const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textGray900);
const subtitleClasses = clsx(styles.mt2, styles.textGray600);
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
        setError('Passwords do not match');

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
          setError(data.error || 'Something went wrong');
          setLoading(false);
          return;
        }

        setSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      } catch {
        setError('Failed to reset password. Please try again.');
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
            <h1 className={successTitleClasses}>Password Reset!</h1>
            <p className={successTextClasses}>
              Your password has been successfully reset. Redirecting to sign in...
            </p>
            <Link to="/login" className={successLinkClasses}>
              Sign In Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMaxW}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>Reset Password</h1>
          <p className={subtitleClasses}>Enter your new password below.</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error ? <div className={styles.formError}>{error}</div> : null}

            <div>
              <label htmlFor="password" className={styles.label}>
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={styles.label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={styles.input}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
