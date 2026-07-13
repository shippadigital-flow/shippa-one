# CI / CD

Objetivo

Descrever os checks obrigatórios no CI e as etapas de CD para deploys em ambientes separados.

CI checks (obrigatórios)

- Install (npm ci)
- Lint (eslint)
- Typecheck (tsc -p tsconfig.build.json --noEmit)
- Unit / integration tests (vitest/jest)
- Build (npm run build)
- Bundle analyzer (report-only)

Branch protection

- Main protegida: PR obrigatório, CI verde, 1+ reviewer, changelog entry.

CD

- Staging: PR merge -> deploy staging (automático)
- Production: deploy automático com canary / manual approval (prefer manual approval for major releases)
- Rollback: use previous artifact + DB rollback plan

Referências

- docs/architecture/ARCHITECTURE.md
