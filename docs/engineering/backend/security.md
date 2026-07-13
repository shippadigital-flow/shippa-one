# Segurança — Requisitos e Checklist

Objetivo

Consolidar controles de segurança obrigatórios que o backend deve implementar.

Checklist obrigatório

- [ ] Rate limiting global e por endpoint crítico (login, forgot-password)
- [ ] Row-Level Security (RLS) aplicada a todas as tabelas tenant-scoped
- [ ] Sessões via cookies HttpOnly com SameSite/secure flags
- [ ] Refresh tokens rotativos (server-side)
- [ ] Proteção CSRF para endpoints que precisem (double submit cookie quando aplicável)
- [ ] Política CORS restrita a domínios autorizados
- [ ] Helmet / security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options)
- [ ] Upload validation (MIME, size, scanning where feasible)
- [ ] Secrets in vault / CI secret store — no secrets in repo
- [ ] Audit logs for sensitive actions (user/tenant changes, billing changes)
- [ ] Monitoring and alerts for suspicious activity (multiple failed logins)

Notas

- Evitar armazenar tokens em localStorage. Preferir HttpOnly cookies.
- Revisões de segurança periódicas e pentests antes do lançamento público.

Referências

- docs/architecture/SECURITY.md
