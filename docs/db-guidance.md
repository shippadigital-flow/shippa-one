# Database guidance (developer note)

The official backend for Shippa One is Supabase / PostgreSQL. All persistent server-side data must follow the Database Specification (DB v1.0).

Key rules for developers:
- Multi-tenant: All persisted data must be tenant-aware (tenant_id) and enforce row-level isolation.
- Row Level Security (RLS): Use RLS policies in Postgres/Supabase to ensure tenants cannot access others' data.
- Never store secrets or personally-identifiable information (PII) in the frontend or in localStorage.
- Follow migration rules: reversible SQL migrations, a documented rollback, and tests where applicable.

Local development
- When creating local dev projects, use a local Postgres or Supabase instance and an `.env` file that is never committed. See `.env.example` for variable names.

This is a guidance file only; actual DB implementation and migrations are part of later phases (Authentication and Core features).
