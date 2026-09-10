import {
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import {
  authService,
  type LoginPayload,
  type UserResponse,
} from '../services';
import { AuthContext } from './auth-context-definition';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() =>
    authService.isAuthenticated(),
  );

  const refreshUser = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch {
      authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!authService.isAuthenticated()) {
      return;
    }

    authService
      .getProfile()
      .then((profile) => {
        if (!ignore) {
          setUser(profile);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!ignore) {
          authService.logout();
          setUser(null);
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const login = async (credentials: LoginPayload) => {
    setIsLoading(true);
    try {
      await authService.login(credentials);
      const profile = await authService.getProfile();
      setUser(profile);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
