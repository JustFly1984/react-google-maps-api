import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as v from 'valibot';
import { UserResponseSchema } from '../../shared/schemas.ts';

export type User = {
  id: string;
  email: string;
  fullName: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const UserLoginResponseSchema = v.object({ user: UserResponseSchema });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const validateSession = useCallback(async (): Promise<void> => {
    try {
      console.info('Validating session');

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        const result = v.safeParse(UserLoginResponseSchema, data);

        if (result.success) {
          console.info('Session validated successfully');
          setUser(result.output.user);
        } else {
          console.info('Session validated failed');
          setUser(null);
        }
      } else {
        console.info('Session response not ok');
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
      return;
    }

    void validateSession();
  }, [validateSession]);

  const signOut = useCallback(async (): Promise<void> => {
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

  const value = useMemo(() => {
    return { user, loading, setUser, signOut };
  }, [user, loading, setUser, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
