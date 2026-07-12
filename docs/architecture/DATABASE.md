# Database — Shippa One

Purpose

This document describes the database principles and the core data model for Shippa One. It is a concise reference for schema authors, backend engineers and DBAs.

Table of Contents

- Purpose
- Principles
- Core entities (summary)
- Tenancy & RLS
- Indexing guidance
- Migrations rules
- Backups & Disaster Recovery
- Security considerations

Status

Draft

Principles

- Engine: PostgreSQL (Supabase recommended)
- Multi‑tenant: tenant_id on all tenant data and RLS policies
- Normalized: avoid redundant storage; use join tables for relationships
- Extensible & auditable: support future features and immutable audit entries

Core entities (summary)

- tenants: id, uuid, company_name, plan, status, created_at, updated_at
- users: id, tenant_id, full_name, email, password_hash, role, avatar, last_login, created_at, updated_at
- websites: id, tenant_id, domain, ssl_status, deployment_status, hosting_provider, performance_score, created_at
- blogs: id, tenant_id, title, slug, description, status
- posts: id, tenant_id, category_id, author_id, title, slug, excerpt, content, seo_title, seo_description, featured_image, status, published_at, created_at, updated_at
- categories: id, tenant_id, name, slug
- media: id, tenant_id, file_name, mime_type, size, storage_path, uploaded_at
- analytics (aggregates): id, tenant_id, visitors, sessions, pageviews, bounce_rate, avg_session_duration, conversions, updated_at
- leads: id, tenant_id, full_name, email, phone, source, status, created_at
- subscription: id, tenant_id, plan, status, renewal_date, payment_provider
- feature_flags & settings: tenant-scoped flags and preferences
- notifications: id, tenant_id, title, message, type, read, created_at
- audit_logs: id, tenant_id, user_id, action, entity, entity_id, ip_address, user_agent, created_at

Tenancy & RLS

- All tenant tables must include tenant_id and DB policies must prevent cross‑tenant access.
- Prefer explicit server checks + RLS policies to ensure defense in depth.

Indexing guidance

- Add indexes on: email, tenant_id, slug, domain, created_at, status.
- Composite indexes where helpful: (tenant_id, email), (tenant_id, slug), (tenant_id, status).

Migrations rules

- Use a migration tool (SQL or framework migration) and keep files in `migrations/`.
- Every migration must be reversible and include a rollback plan.
- Schema changes must be reviewed and tested in staging before production rollout.

Backups & Disaster Recovery

- Daily backups with point‑in‑time recovery enabled.
- Monthly restore verification test documented in the runbook.
- Encrypted backups and least privilege for backup access.

Security considerations

- Use parameterized queries, never interpolate SQL with user input.
- Protect sensitive fields (password_hash only, never store raw passwords).
- Audit logs are append‑only and never deleted; retention policy documented separately.

Future work

- Provide example CREATE TABLE statements and migration templates.
- Document retention and archiving strategy for large analytics tables.

