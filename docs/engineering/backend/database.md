# Modelo de Dados e Banco

Objetivo

Definir padrões, tabelas base e regras de tenancy (RLS) para implementar a camada de dados do backend.

Princípios

- Multi-tenant: todas as tabelas tenant-scoped têm `company_id` e políticas RLS.
- Auditável: manter `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by` em todas as tabelas importantes.
- Reversibilidade: migrações sempre reversíveis.

Tabelas base (sumário)

- companies
- users
- members (company membership)
- roles
- permissions
- sessions
- audit_logs
- websites
- posts/articles
- categories
- media
- analytics (raw + aggregates)
- leads
- subscriptions / plans

Exemplo: users

- id (uuid PK)
- company_id (uuid FK)
- email (unique per tenant)
- full_name
- password_hash
- role_id
- last_login
- created_at, updated_at, deleted_at
- created_by, updated_by

Row-Level Security (RLS)

- Política padrão: permitir acesso quando `company_id = current_setting('app.current_company')::uuid` OU quando `is_super_admin = true`.
- Cada conexão/transaction deve setar `app.current_company` no contexto (SESSION variable) para facilitar políticas.

Índices

- Composite indexes: (company_id, email), (company_id, slug), (company_id, created_at)
- Indexes para queries frequentes (status, domain, published_at)

Migrações

- Use `migrations/` com arquivos versionados (timestamped SQL). Cada migration deve ter up/down ou ser suportada pela ferramenta de migrations.

Referências

- docs/architecture/DATABASE.md
- docs/engineering/migrations.md
