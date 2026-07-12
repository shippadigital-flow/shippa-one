# API — Shippa One

Purpose

This document defines the API conventions and the public API surface for Shippa One. It describes standard response formats, authentication, error handling and endpoint organization.

Table of Contents

- Purpose
- Base URL & versioning
- Authentication
- Standard response format
- HTTP status codes
- Modules & main endpoints
- Pagination, filtering & sorting
- Validation & error structure
- Rate limiting
- Webhooks & integrations

Status

Draft

Base URL & Versioning

- Development: `/api/v1`
- Production: `https://api.shippaone.com/v1`
- Use URI versioning and increment the major version for breaking changes.

Authentication

- Authentication uses server sessions (HttpOnly cookies) backed by Supabase Auth (recommended) or equivalent.
- Protected endpoints must validate: authenticated user, tenant ownership, user role and subscription where applicable.

Standard response format

Success:
```json
{ "success": true, "data": { ... }, "message": "Operation completed successfully." }
```
Error:
```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "The provided data is invalid." } }
```

HTTP status codes

- 200 OK — successful GET/PUT
- 201 Created — resource created
- 204 No Content — successful delete/no payload
- 400 Bad Request — validation or malformed request
- 401 Unauthorized — auth missing/invalid
- 403 Forbidden — authenticated but not allowed
- 404 Not Found
- 409 Conflict — resource conflict
- 422 Validation Error — semantic errors
- 429 Too Many Requests — rate limited
- 500 Internal Server Error

Modules & Main endpoints (summary)

- Authentication: `/auth/*` (login, logout, register, forgot/reset, me)
- Users: `/users` (list/create/patch/delete)
- Companies/Tenants: `/tenants` (admin)
- Websites: `/website` (get/patch/status/performance)
- Blog: `/posts` (CRUD), `/categories` (CRUD)
- Media: `/media` (upload/list/delete)
- Analytics (Pro): `/analytics` (overview, traffic, pages, conversions)
- Leads (Pro): `/leads` (CRUD)
- SEO (Pro): `/seo` (issues, recommendations)
- Notifications: `/notifications` (list/mark-read/delete)
- Billing: `/subscription` (get/upgrade/cancel/history)
- Admin: `/admin/*` endpoints for internal tooling

Pagination, filtering & sorting

- Standard pagination query: `?page=1&limit=20`
- Response pagination object:
```json
{ "pagination": { "page": 1, "limit": 20, "total": 120, "pages": 6 } }
```
- Support `search`, `status`, `created_at`, `updated_at`, `sort`, `order` filters where applicable.

Validation & error structure

- Validate required fields, types, lengths and permission checks.
- Return standardized error codes and messages.

Rate limiting

- Global limit: 100 requests/minute per IP
- Login: 5 failed attempts per IP with progressive lockout
- Password reset: 3 requests per 30 minutes
- Return `X-RateLimit-*` headers and `Retry-After` where appropriate.

Webhooks & integrations

- Webhooks (Stripe, Resend, PostHog) must be processed idempotently and verified.
- Document webhook contract and signature verification method in integration docs.

Future work

- Provide OpenAPI/Swagger specification and sample SDK generation.

