// src/lib/session.ts
// Session abstraction layer.
//
// Purpose:
// - Provide a centralized API for session access so we can migrate from client-side
//   localStorage to server-side HttpOnly cookies without changing the rest of the app.
// - TEMPORARY: currently delegates to the existing localStorage-based auth-storage
//   implementation to preserve current behavior. When server sessions are implemented
//   this module will be updated to read/write via the server (and not expose tokens).

import type { AuthUser } from "@/services/auth-storage";
import {
  readStoredUser,
  writeStoredUser,
  clearStoredUser,
  createAuthUser,
} from "@/services/auth-storage";

export type SessionUser = AuthUser;

/**
 * Read the current session user.
 * Currently backed by the client-side storage helper. In the future this should
 * call a server endpoint or read a secure cookie.
 */
export function readSession(): SessionUser | null {
  return readStoredUser();
}

/**
 * Write the current session user.
 * Currently backed by the client-side storage helper.
 */
export function writeSession(user: SessionUser): void {
  writeStoredUser(user);
}

/**
 * Clear session state.
 */
export function clearSession(): void {
  clearStoredUser();
}

/**
 * Build a SessionUser from email/name (helper wrapper).
 */
export function buildSessionUser(email: string, name?: string): SessionUser {
  return createAuthUser(email, name);
}
