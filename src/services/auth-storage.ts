// Pure storage + naming helpers for the local auth session.
// Kept framework-agnostic so it can be reused outside React (loaders, tests).

export type AuthUser = {
  name: string;
  email: string;
  initials: string;
};

export const AUTH_STORAGE_KEY = "shippa-auth";
export const AUTH_CHANGE_EVENT = "shippa-auth-change";

export function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function writeStoredUser(user: AuthUser): void {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearStoredUser(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function buildInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function guessNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  return (
    local
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim() || "Você"
  );
}

export function createAuthUser(email: string, name?: string): AuthUser {
  const displayName = name?.trim() || guessNameFromEmail(email);
  return {
    email: email.trim(),
    name: displayName,
    initials: buildInitials(displayName),
  };
}
