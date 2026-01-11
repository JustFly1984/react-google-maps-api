import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import * as v from 'valibot';
import { UserResponseSchema } from '../../shared/schemas';

export type User = {
  id: string;
  email: string;
  fullName: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const UserLoginResponseSchema = v.object({ user: UserResponseSchema });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const validateSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        const result = v.safeParse(UserLoginResponseSchema, data);

        if (result.success) {
          setUser(result.output.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      console.error('Session validation failed');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
    } else {
      validateSession();
    }
  }, [validateSession]);

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        const data = await response.json();
        return { error: new Error(data.error || 'Sign up failed') };
      }

      const data = await response.json();
      const result = v.safeParse(UserLoginResponseSchema, data);

      if (!result.success) {
        return { error: new Error('Invalid response from server') };
      }

      setUser(result.output.user);

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
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
        return { error: new Error(data.error || 'Sign in failed') };
      }

      const data = await response.json();
      const result = v.safeParse(UserLoginResponseSchema, data);

      if (!result.success) {
        return { error: new Error('Invalid response from server') };
      }

      setUser(result.output.user);

      return { error: null };
    } catch (err: unknown) {
      return { error: err as Error };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      console.error('Logout failed');
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
