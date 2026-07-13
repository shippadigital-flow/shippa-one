# Shippa One — Database Schema

Version: 1.0

Status: Approved

---

# Objetivo

Este documento define a estrutura oficial do banco de dados do Shippa One.

Todas as tabelas, relacionamentos, índices e políticas de segurança deverão seguir esta especificação.

O banco será PostgreSQL utilizando Supabase.

---

# Princípios

- Multi-tenant
- API First
- Escalável
- Seguro
- Compatível com LGPD
- Compatível com RLS

---

# Convenções

Todas as tabelas deverão possuir:

- id (UUID)
- company_id (quando aplicável)
- created_at
- updated_at
- deleted_at (nullable)
- created_by
- updated_by

Todas as chaves primárias utilizarão UUID.

Todas as datas utilizarão timestamptz.

---

# companies

Representa uma empresa cliente.

Campos

- id
- name
- slug
- document
- email
- phone
- logo_url
- plan_id
- status
- timezone
- language
- created_at
- updated_at

Relacionamentos

companies

├── users

├── websites

├── integrations

├── subscriptions

├── notifications

├── audit_logs

---

# users

Campos

- id
- company_id
- name
- email
- password (Auth)
- avatar
- role
- status
- last_login
- created_at
- updated_at

Índices

- company_id
- email

Relacionamentos

users

├── sessions

├── audit_logs

---

# websites

Campos

- id
- company_id
- name
- domain
- subdomain
- status
- ssl_enabled
- hosting_provider
- backup_enabled
- language
- created_at
- updated_at

Relacionamentos

websites

├── articles

├── categories

├── media

├── seo_reports

├── analytics

├── leads

---

# articles

Campos

- id
- website_id
- author_id
- category_id
- title
- slug
- excerpt
- content
- featured_image
- status
- published_at
- created_at
- updated_at

Índices

- website_id
- slug
- status
- published_at

---

# categories

Campos

- id
- website_id
- name
- slug
- description
- created_at
- updated_at

---

# article_tags

Tabela Pivot

- article_id
- tag_id

---

# tags

- id
- website_id
- name
- slug

---

# media

- id
- website_id
- type
- file_name
- storage_path
- mime_type
- size
- alt_text
- created_at

---

# analytics

- id
- website_id
- date
- visitors
- sessions
- pageviews
- bounce_rate
- avg_session_duration
- countries
- devices
- traffic_sources
- created_at

---

# seo_reports

- id
- website_id
- score
- meta_title
- meta_description
- robots
- sitemap
- page_speed
- core_web_vitals
- issues
- recommendations
- created_at

---

# leads

- id
- website_id
- name
- email
- phone
- source
- landing_page
- status
- notes
- created_at
- updated_at

---

# integrations

- id
- company_id
- provider
- status
- access_token
- refresh_token
- expires_at
- created_at
- updated_at

> Observação: Tokens sensíveis devem ser armazenados criptografados.

---

# subscriptions

- id
- company_id
- plan
- status
- billing_cycle
- renewal_date
- stripe_customer_id
- stripe_subscription_id
- created_at
- updated_at

---

# notifications

- id
- company_id
- title
- message
- type
- read
- created_at

---

# audit_logs

- id
- company_id
- user_id
- action
- resource
- resource_id
- ip
- user_agent
- request_id
- created_at

---

# sessions

- id
- user_id
- ip
- device
- browser
- expires_at
- last_activity
- created_at

---

# Índices Obrigatórios

- company_id
- website_id
- status
- slug
- created_at
- published_at
- email
- domain

---

# Relacionamentos

Company

↓

Users

↓

Website

↓

Articles

↓

Media

↓

Analytics

↓

SEO

↓

Leads

↓

Integrations

↓

Notifications

---

# Row Level Security

Todas as tabelas multi-tenant deverão utilizar RLS.

Toda consulta deverá filtrar automaticamente pelo company_id.

Nenhum usuário poderá acessar registros pertencentes a outra empresa.

---

# Soft Delete

As tabelas utilizarão:

- deleted_at

Nenhum registro deverá ser removido fisicamente sem autorização administrativa.

---

# Auditoria

Todas as alterações críticas deverão gerar registro em audit_logs.

Eventos obrigatórios:

- Login
- Logout
- Criação
- Atualização
- Exclusão
- Alteração de permissões
- Alteração de plano
- Integrações

---

# Performance

- Criar índices nas colunas mais consultadas.
- Utilizar paginação em todas as consultas.
- Evitar SELECT *.
- Preparar tabelas para milhões de registros.

---

# Backup

- Backup automático diário.
- Point In Time Recovery.
- Validação periódica da restauração.

---

# Critérios de Aceitação

- ✓ PostgreSQL
- ✓ Supabase
- ✓ UUID
- ✓ Multi-tenant
- ✓ RLS
- ✓ LGPD
- ✓ API First
- ✓ Escalável
- ✓ Compatível com futuras integrações
- ✓ Preparado para alta disponibilidade
