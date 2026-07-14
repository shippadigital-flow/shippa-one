# Shippa One - Sprint 01

Version: 1.0

Status: Approved

---

# Objetivo da Sprint

Implementar o primeiro MVP funcional do Shippa One.

Ao final desta Sprint será possível:

- Criar uma empresa
- Criar usuários
- Fazer login
- Criar projetos
- Adicionar domínios
- Acessar o Dashboard
- Utilizar o Painel Admin
- Entrar como Cliente (Impersonation)

Esta Sprint NÃO contempla integrações externas.

Todo o foco é construir a base da plataforma.

---

# Meta

Ao final da Sprint a plataforma deverá estar funcionando de ponta a ponta.

Mesmo que algumas informações ainda sejam simuladas.

---

# Escopo

## Incluído

✔ Login

✔ Cadastro

✔ Recuperação de senha

✔ Empresas

✔ Projetos

✔ Domínios

✔ Dashboard

✔ Painel Admin

✔ Permissões

✔ Multiempresa

✔ Multiprojetos

✔ Múltiplos Domínios

✔ Auditoria

✔ Entrar como Cliente

---

## Não incluído

Analytics

Google Ads

SEO

Blog

Biblioteca

Email Center

Integrações

Stripe

IA

Search Console

PostHog

Pinecone

Monitoramento avançado

---

# Ordem de Implementação

## 1

Autenticação

Implementar:

Supabase Auth

Login

Logout

Recuperação de senha

Sessão

Refresh Token

Critérios

✓ Login funcionando

✓ Logout funcionando

✓ Reset de senha

✓ Sessão persistente

---

## 2

Empresas

CRUD completo

Campos

Nome

Plano

Status

Logo

Cidade

Estado

Responsável

Critérios

Criar

Editar

Excluir

Listar

Pesquisar

---

## 3

Usuários

Cada empresa poderá possuir vários usuários.

Perfis

Administrador

Gestor

Editor

Visualizador

Critérios

Criar usuário

Editar

Desativar

Excluir

Controle de permissões

---

## 4

Projetos

Cada empresa poderá possuir diversos projetos.

Tipos

Website

Landing Page

Blog

Portal

Custom

Campos

Nome

Tipo

Status

Descrição

Critérios

CRUD completo

Troca de projeto

Filtro

Pesquisa

---

## 5

Domínios

Cada projeto poderá possuir diversos domínios.

Campos

Domínio

Subdomínio

Principal

Status

Expiração

Renovação automática

Critérios

Adicionar

Editar

Excluir

Marcar principal

---

## 6

Dashboard

Implementar

Visão Geral

Cards

Projetos

Domínios

Usuários

Plano

Centro de Atenção

Nesta Sprint os dados poderão ser simulados.

---

## 7

Painel Admin

Implementar

Dashboard

Empresas

Projetos

Usuários

Domínios

Pesquisa

Filtros

---

## 8

Entrar como Cliente

Implementar

Botão

"Acessar como Cliente"

Fluxo

Administrador

↓

Seleciona empresa

↓

Informa motivo

↓

Entrar

Mostrar banner superior

"Você está acessando a conta do cliente"

Botão

Sair

Registrar auditoria

---

# Banco de Dados

Criar apenas as tabelas principais.

companies

users

projects

domains

subscriptions

audit_logs

Não implementar Analytics nesta Sprint.

---

# API

Criar apenas endpoints essenciais.

Authentication

Companies

Projects

Domains

Users

Admin

---

# Segurança

Implementar

Row Level Security

JWT

HTTP Only Cookies

Rate Limit

Audit Logs

LGPD

---

# Critérios de Aceitação

Login funcionando

Empresa criada

Usuário criado

Projeto criado

Domínio criado

Dashboard carregando

Admin funcionando

Entrar como Cliente funcionando

---

# Testes

Fluxo completo

Criar Empresa

↓

Criar Usuário

↓

Login

↓

Criar Projeto

↓

Adicionar Domínio

↓

Visualizar Dashboard

↓

Entrar como Cliente

↓

Editar Projeto

↓

Logout

Todos os passos devem funcionar.

---

# Não Implementar

Google APIs

Analytics

Email

SEO

Stripe

IA

Integrações externas

Uploads

Deploys

Monitoramento

Tudo ficará para as próximas Sprints.

---

# Objetivo Final

Ao concluir esta Sprint o Shippa One deverá possuir um núcleo sólido.

A plataforma deverá estar preparada para receber novos módulos sem necessidade de remodelar a arquitetura.

Toda implementação deve respeitar:

- Multiempresa
- Multiprojetos
- Múltiplos domínios
- Segurança
- LGPD
- Escalabilidade
- Clean Architecture
