# API — Contratos e Convenções

Objetivo

Padronizar a construção de endpoints REST versionados (`/api/v1`) para garantir consistência entre equipes e facilitar geração de SDKs.

Convenções principais

- Prefixo: `/api/v1`
- Autenticação: via cookie de sessão HttpOnly; endpoints protegidos retornam 401 quando não autenticado.
- Responses: padrão `{ success: boolean, data?: any, error?: { code, message } }`.
- Status codes: 200/201/204/400/401/403/404/409/422/429/500.
- Paginação: `?page=1&limit=20` + `pagination` object no response.

Boas práticas

- Verificar tenant ownership para todas as operações mutantes.
- Validar payloads com schema (zod / yup) e devolver erros padronizados.
- Documentar endpoints críticos com exemplos (OpenAPI ideal).

Endpoints de referência (sumário)

- Auth: POST /api/v1/auth/login, POST /api/v1/auth/logout, POST /api/v1/auth/refresh, GET /api/v1/auth/me
- Users: GET/POST/PUT/PATCH /api/v1/users
- Companies: GET /api/v1/companies/:id
- Websites: GET /api/v1/websites, POST /api/v1/websites
- Posts: GET /api/v1/posts, POST /api/v1/posts, PATCH /api/v1/posts/:id
- Media: POST /api/v1/media (signed upload flow)
- Analytics: GET /api/v1/analytics/overview
- Leads: GET/POST /api/v1/leads

Webhooks

- Implementar verificação de assinatura para webhooks (Stripe/Resend) e processar idempotentemente.

Referências

- docs/architecture/API.md
