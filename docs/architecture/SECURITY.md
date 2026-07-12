# Security — Shippa One

Purpose

This document summarizes mandatory security controls and best practices for Shippa One. It consolidates the security requirements that must be enforced in code and infrastructure.

Table of Contents

- Purpose
- Security principles
- Authentication & sessions
- Authorization & tenant isolation
- Rate limiting & abuse protection
- Input validation & sanitization
- File uploads
- Environment variables & secrets
- Frontend security
- Logging & monitoring
- Backups & disaster recovery
- Incident response

Status

Draft

Security principles

- Confidentiality, Integrity, Availability
- Least privilege and defense in depth
- Privacy by Design (LGPD compliance: consent, data deletion/export, minimization)

Authentication & sessions

- Use Supabase Auth or equivalent. Sessions must use HttpOnly, Secure cookies with SameSite controls.
- Never store auth tokens in `localStorage` or `sessionStorage`.
- Session expiry and refresh logic to be enforced server-side.

Authorization & tenant isolation

- Enforce RBAC roles: Super Admin, Company Admin, Editor, Marketing, Viewer.
- Use Row Level Security (RLS) in Postgres to enforce tenant isolation; always validate tenant_id in server middleware.

Rate limiting & abuse protection

- Global API limit: 100 requests/minute per IP
- Login: 5 failed attempts per IP + temporary lockout/progressive delays
- Password Reset & Email Verification: limited as documented
- Redis recommended for counters and short‑term locks.

Input validation & sanitization

- Validate types, lengths and formats on all inputs.
- Sanitize any HTML/content to prevent XSS; escape dynamic HTML.
- Use parameterized queries to prevent SQL injection.

File uploads

- Validate MIME type, extension and maximum size.
- Rename uploaded files and store outside public directories when possible.
- Integrate virus scanning where feasible.

Environment variables & secrets

- Keep secrets only on the server and in CI secrets store.
- Never expose secrets via client visible VITE_* environment variables.

Frontend security

- CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy to be set by server.
- Disable source maps in production builds.
- Ensure accessible and secure cookie usage.

Logging & monitoring

- Logs must be structured, include request ID, timestamp, severity and tenant/user context (no PII).
- Integrate error tracking and alerts for suspicious events (multiple failed logins, high error rates).

Backups & disaster recovery

- Daily encrypted backups, point‑in‑time recovery and monthly restore tests.
- Document restore runbook in ops playbooks.

Incident response

- Maintain timeline, root cause, affected systems, resolution and prevention actions for each incident.

