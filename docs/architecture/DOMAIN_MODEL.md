# Shippa One - Domain Model

Version: 1.0

Status: Approved

---

# Objetivo

Este documento define o modelo de domínio oficial do Shippa One.

Todas as entidades, relacionamentos e regras de negócio deverão seguir esta especificação.

Nenhuma tabela, endpoint ou funcionalidade poderá ser criada sem estar relacionada a uma entidade definida neste documento.

---

# Filosofia

Shippa One é uma plataforma SaaS multi-tenant para gestão de presença digital.

Toda informação pertence a uma empresa.

Nunca diretamente a um usuário.

Hierarquia:

Platform
    ↓
Company
    ↓
Users
    ↓
Website
    ↓
Content
    ↓
Growth
    ↓
Settings

---

# Entidades

## Platform

Representa toda a plataforma Shippa One.

Responsável por:

- Administração
- Planos
- Monitoramento
- Cobranças
- Infraestrutura

Relacionamentos

Platform

├── Companies

├── Plans

├── Admin Users

├── Audit Logs

└── System Settings

---

## Company

Representa um cliente da plataforma.

Cada empresa possui seu ambiente isolado.

Campos principais

- id
- name
- slug
- document
- email
- phone
- logo
- status
- plan_id
- created_at
- updated_at

Relacionamentos

Company

├── Users

├── Website

├── Subscription

├── Integrations

├── Notifications

└── Activity Logs

---

## User

Usuários pertencem sempre a uma empresa.

Nunca existem usuários sem empresa.

Tipos

- Owner
- Admin
- Editor
- Viewer

Campos

- id
- company_id
- name
- email
- avatar
- role
- status
- last_login

Relacionamentos

User

├── Company

├── Sessions

├── Audit Logs

└── Notifications

---

## Website

Representa o site institucional.

Cada empresa possui inicialmente um website.

Campos

- id
- company_id
- domain
- status
- ssl
- hosting
- backup
- performance
- language

Relacionamentos

Website

├── Articles

├── Categories

├── Media

├── SEO Reports

├── Analytics

├── Leads

└── Integrations

---

## Article

Conteúdo publicado no blog.

Campos

- id
- website_id
- title
- slug
- excerpt
- content
- featured_image
- status
- published_at

Status

- Draft

- Scheduled

- Published

- Archived

Relacionamentos

Article

├── Category

├── Tags

├── SEO Metadata

└── Author

---

## Category

Categorias do blog.

Relacionamento

Category

└── Articles

---

## Tag

Palavras-chave.

Relacionamento

Tag

└── Articles

---

## Media

Biblioteca de arquivos.

Tipos

- Image

- Video

- PDF

- Document

Relacionamento

Media

└── Website

---

## Analytics

Dados de desempenho.

Origem

Google Analytics

PostHog

Campos

- visitors

- sessions

- pageviews

- bounce_rate

- devices

- countries

Relacionamento

Analytics

└── Website

---

## SEO Report

Análise técnica.

Campos

- score

- sitemap

- robots

- pagespeed

- titles

- descriptions

- alt_text

Relacionamento

SEO Report

└── Website

---

## Lead

Contato gerado pelo site.

Campos

- id

- website_id

- name

- email

- phone

- source

- landing_page

- status

Relacionamentos

Lead

└── Website

---

## Integration

Serviços externos.

Tipos

Google Analytics

Google Search Console

Google Ads

Google Tag Manager

Meta Pixel

Resend

PostHog

Webhook

Relacionamento

Integration

└── Company

---

## Subscription

Plano ativo.

Campos

- plan

- status

- renewal_date

- billing_cycle

Relacionamento

Subscription

└── Company

---

## Notification

Mensagens da plataforma.

Tipos

- Information

- Warning

- Success

- Error

Relacionamento

Notification

└── Company

---

## Audit Log

Histórico completo.

Registrar:

- Login

- Logout

- Publicação

- Exclusão

- Alterações

- Permissões

Relacionamento

Audit Log

├── Company

└── User

---

# Fluxo principal

Platform

↓

Company

↓

Website

↓

Blog

↓

SEO

↓

Analytics

↓

Leads

↓

Growth

---

# Regras de negócio

Todo usuário pertence a uma empresa.

Toda empresa possui um plano.

Todo website pertence a uma empresa.

Todo artigo pertence a um website.

Toda mídia pertence a um website.

Todo lead pertence a um website.

Toda integração pertence a uma empresa.

Nenhuma informação poderá ser compartilhada entre empresas.

Todo acesso deverá respeitar Row Level Security.

---

# Multi-Tenant

Isolamento obrigatório.

company_id em todas as entidades.

Todas as consultas devem respeitar o tenant.

---

# Escalabilidade

Cada entidade deve ser independente.

Toda comunicação deverá ocorrer por APIs.

Nenhuma dependência circular será permitida.

---

# Critérios de Aceitação

✓ Modelo preparado para múltiplos clientes

✓ Compatível com Supabase

✓ Compatível com PostgreSQL

✓ Compatível com RLS

✓ Compatível com LGPD

✓ Preparado para crescimento futuro

✓ API First

✓ Modular

✓ Escalável

✓ Fácil manutenção
