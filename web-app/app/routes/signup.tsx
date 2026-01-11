import clsx from 'clsx';
import { useCallback, useState, type ChangeEvent, type JSX } from 'react';
import { Link, useNavigate } from 'react-router';
import * as v from 'valibot';

import { SignupSchema } from '../../shared/schemas.ts';
import { useAuth } from '../contexts/auth.tsx';
import { styles } from '../styles.ts';

const headerClasses = clsx(styles.textCenter, styles.mb8);
const titleClasses = clsx(styles.text3xl, styles.fontBold, styles.textGray900);
const subtitleClasses = clsx(styles.mt2, styles.textGray600);
const cardClasses = clsx(styles.card, styles.p8);
const buttonClasses = clsx(styles.wFull, styles.btnPrimary, styles.py3);
const footerClasses = clsx(styles.mt6, styles.textCenter, styles.textSm, styles.textGray600);
const linkClasses = clsx(styles.textBlue600, styles.hoverTextBlue700, styles.fontMedium);

export default function SignUpPage(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

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
        setError('Passwords do not match');
        return;
      }

      const result = v.safeParse(SignupSchema, { email, password, fullName });
      if (!result.success) {
        setError(result.issues[0].message);
        return;
      }

      setLoading(true);

      const { error: signUpError } = await signUp(email, password, fullName);

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      navigate('/dashboard');
    },
    [email, password, confirmPassword, fullName, navigate, signUp],
  );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageMaxW}>
        <div className={headerClasses}>
          <h1 className={titleClasses}>Create Account</h1>
          <p className={subtitleClasses}>Get started with React Google Maps API today.</p>
        </div>

        <div className={cardClasses}>
          <form onSubmit={handleSubmit} className={styles.spaceY6}>
            {error && <div className={styles.formError}>{error}</div>}

            <div>
              <label htmlFor="fullName" className={styles.label}>
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                className={styles.input}
                placeholder="John Doe"
              />
            </div>

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
                minLength={6}
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
                required
              />
            </div>

            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className={footerClasses}>
            Already have an account?{' '}
            <Link to="/login" className={linkClasses}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
