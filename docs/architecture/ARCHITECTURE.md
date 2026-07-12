# Architecture — Shippa One

Purpose

This document summarizes Shippa One's system architecture and high‑level design decisions. It is intended for engineers, reviewers and maintainers who need a concise reference of the system components, data flow, tenancy model and operational considerations.

Table of Contents

- Purpose
- System overview
- Components
  - Frontend
  - Backend / API
  - Data platform
  - Integrations
- Data flow
- Multi‑tenant model
- Deployment & environments
- Observability & monitoring
- Security considerations
- Where to find more detail

Status

Draft

System overview

Shippa One is a multi‑tenant SaaS platform that provides website management, blogging, educational content and growth tools for small and medium businesses. The web application is built with a modern React stack (Vite/TanStack) for the frontend and a PostgreSQL backend (Supabase intended). The system is organized as an application frontend communicating with backend APIs and managed services (email, payments, storage, analytics).

Components

Frontend
- Single codebase using React, Vite and TanStack libraries.
- UI primitives (Button, Card, Input, Skeleton, Toast, etc.) and design tokens are centralized to ensure consistent visuals.
- Progressive enhancement: server‑assisted rendering patterns used where appropriate.

Backend / API
- RESTful API surface (versioned /api/v1) with endpoints for authentication, users, websites, blog, media, analytics, leads, SEO, notifications and billing.
- Authentication is handled by a server session approach backed by Supabase Auth (planned), using HttpOnly cookies for session security.
- Server is responsible for authorization, tenant enforcement and sensitive operations.

Data platform
- PostgreSQL is the canonical datastore (Supabase recommended).
- Core entities: Tenants, Users, Websites, Blog (Posts, Categories), Media, Analytics, Leads, Subscription, Audit logs, Feature flags, Settings, Notifications.
- RLS (Row Level Security) is required to enforce tenant isolation.
- Migrations must be reversible and preserved in the repository.

Integrations
- External services include: Resend (email), Stripe (billing), PostHog/analytics (optional), Google integrations (Search Console, Analytics) and storage (Supabase Storage or S3).
- Integrations are optional and controlled by tenant feature flags.

Data flow

- Client actions follow a standard flow: UI → API → DB or Storage → background processors (for batching, aggregation or scheduled tasks) → aggregated data surfaced in APIs.
- Analytics events are ingested through a dedicated event endpoint (or external provider) and pre‑aggregated for dashboard reporting.
- Webhooks (Stripe, external integrations) are verified and processed idempotently.

Multi‑tenant model

- Each tenant (customer) is represented by a Tenant record and all tenant data is associated with tenant_id.
- Tenant isolation is enforced at the database level via RLS policies and at the application level via middleware that validates session tenant claims.
- Feature flags are tenant-scoped, enabling or disabling Pro features per tenant.

Deployment & environments

- Typical environment separation: local dev, staging and production.
- Build pipeline produces optimized artifacts; CI runs lint/type/test/build and produces a bundle visualizer for review.
- Infrastructure and secrets are stored and managed outside the codebase (CI secrets, cloud providers). Source maps are disabled for production builds.

Observability & monitoring

- Structured logs include request ID, tenant ID and authenticated user (when available) — avoid logging sensitive PII.
- Error tracking (Sentry or equivalent) should be integrated with request IDs for troubleshooting.
- Metrics: uptime, request latency, error rates, queue lengths and background job health. Web performance measured with web‑vitals (FCP/LCP).

Security considerations

- Authentication: server sessions via HttpOnly cookies; Supabase Auth is the recommended provider.
- Authorization: server validates user role and tenant ownership; RBAC and RLS enforced.
- Input validation and sanitization required on all endpoints; file uploads validated for MIME, size and scanned where possible.
- Rate limiting and brute‑force protection for auth endpoints (Redis recommended for counters).

Where to find more detail

- Database schema and migration rules: docs/architecture/DATABASE.md
- API conventions and endpoints: docs/architecture/API.md
- Security controls and policies: docs/architecture/SECURITY.md
- Product requirements & UX: docs/product/PRODUCT.md


