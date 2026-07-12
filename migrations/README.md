# Database migrations (placeholder)

This folder is reserved for SQL migration files and migration tooling.

Rules (short):
- Every schema change must include a reversible migration.
- Migrations must preserve data integrity and include a rollback path.
- Name migration files with increasing timestamps and a short slug (e.g. `20260712_add_posts_table.sql`).
- Keep migrations in this folder and do not commit generated artifacts from migration tools (only SQL or migration scripts).

Supabase / PostgreSQL notes
- The official database platform for Shippa One is Supabase (PostgreSQL).
- Use the Database Specification (docs/DB-SPEC.md) as the authoritative model for tables and indexes.

Do not implement schema changes without opening a ticket and a migration PR.
