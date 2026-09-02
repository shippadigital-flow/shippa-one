import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { buildInitials, guessNameFromEmail, type AuthUser } from "@/services/auth-storage";

export type { AuthUser };
export { buildInitials } from "@/services/auth-storage";

function toAuthUser(user: User | null | undefined): AuthUser | null {
  if (!user) return null;
  const email = user.email ?? "";
  const metaName = (user.user_metadata?.["name"] as string | undefined)?.trim();
  const name = metaName || guessNameFromEmail(email);
  return { email, name, initials: buildInitials(name) };
}

/** Verificação de sessão para guards de rota (client-side). */
export async function hasActiveSession(): Promise<boolean> {
  const { data } = await supabase.auth.getUser();
  return !!data.user;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    const apply = (session: Session | null) => {
      if (!active) return;
      setUser(toAuthUser(session?.user));
      setHydrated(true);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      apply(session);
    });

    void supabase.auth.getSession().then(({ data }) => apply(data.session));

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) throw error;
    return { needsConfirmation: !data.session };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, hydrated, isAuthenticated: !!user, signIn, signUp, resetPassword, signOut };
}
