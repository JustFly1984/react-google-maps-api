import clsx from 'clsx';
import { type ChangeEvent, type JSX, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import * as v from 'valibot';

import { LoginSchema } from '../../shared/schemas.ts';
import { useAuth } from '../contexts/auth.tsx';
import { styles } from '../styles.ts';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

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
        setError('Please enter a valid email and password');
        return;
      }

      setLoading(true);

      const { error: signInError } = await signIn(email, password);

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      navigate('/dashboard');
    },
    [email, password, signIn, navigate],
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMaxW}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>Welcome Back</h1>
          <p className={subtitleClasses}>Sign in to access your dashboard and licenses.</p>
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

            <div>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className={signUpContainerClasses}>
            <Link to="/forgot-password" className={forgotPasswordClasses}>
              Forgot your password?
            </Link>
          </div>

          <p className={footerClasses}>
            Don't have an account?{' '}
            <Link to="/signup" className={signUpLinkClasses}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
