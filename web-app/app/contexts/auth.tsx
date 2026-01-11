import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import * as v from 'valibot';
import { AuthResponseSchema, UserResponseSchema } from '../../shared/schemas';

export interface User {
  id: string;
  email: string;
  fullName: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      validateToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (authToken: string) => {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const result = v.safeParse(v.object({ user: UserResponseSchema }), data);
        if (result.success) {
          setUser(result.output.user);
          localStorage.setItem(USER_KEY, JSON.stringify(result.output.user));
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
      }
    } catch {
      console.error('Token validation failed');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
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
      const result = v.safeParse(AuthResponseSchema, data);
      
      if (!result.success) {
        return { error: new Error('Invalid response from server') };
      }

      setToken(result.output.token);
      setUser(result.output.user);
      localStorage.setItem(TOKEN_KEY, result.output.token);
      localStorage.setItem(USER_KEY, JSON.stringify(result.output.user));

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
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
      const result = v.safeParse(AuthResponseSchema, data);
      
      if (!result.success) {
        return { error: new Error('Invalid response from server') };
      }

      setToken(result.output.token);
      setUser(result.output.user);
      localStorage.setItem(TOKEN_KEY, result.output.token);
      localStorage.setItem(USER_KEY, JSON.stringify(result.output.user));

      return { error: null };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signUp, signIn, signOut }}>
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
