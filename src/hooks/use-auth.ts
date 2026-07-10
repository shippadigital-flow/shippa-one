import { useEffect, useState } from "react";
import {
  AUTH_CHANGE_EVENT,
  clearStoredUser,
  createAuthUser,
  readStoredUser,
  writeStoredUser,
  type AuthUser,
} from "@/services/auth-storage";

// Re-export for backwards compatibility with existing imports.
export type { AuthUser };
export { readStoredUser as getStoredUser, buildInitials } from "@/services/auth-storage";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setHydrated(true);
    const onChange = () => setUser(readStoredUser());
    window.addEventListener(AUTH_CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const signIn = (email: string, name?: string) => {
    const next = createAuthUser(email, name);
    writeStoredUser(next);
    setUser(next);
  };

  const signOut = () => {
    clearStoredUser();
    setUser(null);
  };

  return { user, hydrated, isAuthenticated: !!user, signIn, signOut };
}
