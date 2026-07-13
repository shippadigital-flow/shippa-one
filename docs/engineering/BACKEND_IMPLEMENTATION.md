# Shippa One - Backend Implementation

Version: 1.0

Status: Approved

---

# Objetivo

Este documento define toda a implementação do backend do Shippa One.

Toda implementação deverá seguir esta documentação.

Nenhuma funcionalidade poderá ser criada sem estar documentada neste arquivo.

---

# Objetivos da Arquitetura

O backend deve ser:

- Multi-tenant
- Escalável
- API First
- Seguro
- Modular
- Fácil manutenção
- Baixo custo operacional
- Compatível com LGPD

---

# Stack Oficial

Frontend

- Next.js

Backend

- Supabase

Database

- PostgreSQL

Authentication

- Supabase Auth

Storage

- Supabase Storage

Cache

- Redis

Emails

- Resend

Billing

- Stripe

Analytics

- PostHog

Infrastructure

- Coolify

Repository

- GitHub

CI/CD

- GitHub Actions

---

# Arquitetura

Client

↓

Next.js

↓

Middleware

↓

API

↓

Supabase

↓

PostgreSQL

↓

Storage

↓

Redis

↓

Google APIs

↓

PostHog

↓

Stripe

↓

Resend

---

# Multi Tenant

Toda informação pertence a uma empresa.

Nunca diretamente ao usuário.

Estrutura:

Company

↓

Users

↓

Websites

↓

Articles

↓

Analytics

↓

Leads

↓

Settings

---

# Sprint 1

## Autenticação

Implementar:

✔ Login

✔ Logout

✔ Recuperar senha

✔ Convite

✔ Sessões

✔ Refresh Token

✔ Middleware

✔ Roles

---

## Usuários

Criar:

users

profiles

roles

permissions

sessions

audit_logs

---

## Empresas

Criar:

companies

members

plans

subscriptions

---

# Sprint 2

## Websites

Tabela

websites

Campos

- domínio

- ssl

- status

- deploy

- backup

- performance

---

## Blog

Criar

articles

categories

tags

media

drafts

seo_metadata

---

# Sprint 3

Analytics

SEO

Leads

Integrações

---

Analytics

Dados:

Visitantes

Sessões

Origem

Dispositivos

Países

Páginas

---

SEO

Pontuação

Meta

Robots

Sitemap

Performance

---

Leads

Nome

Telefone

Email

Origem

Página

Status

---

Integrações

Google Analytics

Search Console

Google Ads

Meta Pixel

Tag Manager

PostHog

Resend

Webhook

---

# Sprint 4

Painel Admin

Clientes

Sites

Usuários

Planos

Receita

Deploys

Logs

Sistema

Monitoramento

---

# Segurança

Obrigatório

Rate Limit

RLS

JWT

Cookies HttpOnly

Refresh Tokens

CSRF

CORS

Helmet

Audit Logs

Upload Validation

Secrets

Environment Variables

---

# Observabilidade

Health Check

Structured Logs

Metrics

Tracing

Request ID

Slow Queries

Redis Metrics

Storage Metrics

Error Monitoring

---

# Performance

Lazy Loading

Connection Pool

Indexes

Compression

Caching

Image Optimization

CDN

---

# Banco de Dados

Todas as tabelas deverão possuir

id

created_at

updated_at

deleted_at

company_id

created_by

updated_by

---

# API

REST

Versionada

/api/v1

Padrão

GET

POST

PUT

PATCH

DELETE

---

# Deploy

Ambiente

Development

Staging

Production

Deploy automático

Rollback

Health Check

---

# Critérios de Aceitação

Nenhuma funcionalidade pode ser implementada sem:

✔ Testes

✔ Typecheck

✔ Lint

✔ Build

✔ Documentação

✔ Segurança

✔ Responsividade

✔ Performance

---

# Roadmap

Sprint 1

Infraestrutura

Sprint 2

Website

Sprint 3

Blog

Sprint 4

Analytics

Sprint 5

Leads

Sprint 6

Admin

Sprint 7

Integrações

Sprint 8

Billing
