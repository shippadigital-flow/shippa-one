# Deploy — Ambientes e Runbook

Objetivo

Descrever ambientes e um runbook resumido para deploy e rollback.

Ambientes

- development (local)
- staging (teste integrado)
- production (ao vivo)

Runbook (deploy em produção)

1. Verificar CI verde em main e PR de release aprovado.
2. Criar backup do banco e snapshot de storage.
3. Executar deploy canary para subset de instâncias (se suportado).
4. Rodar smoke tests e validar métricas e logs.
5. Gradual rollout completo.
6. Monitorar por 30–60 minutos; reverter se regressões críticas.

Rollback

- Reverter deployment para o artefato anterior e, se necessário, aplicar migration rollback (conforme runbook de migrations).
- Restaurar backups como último recurso (documentar impacto e comunicar stakeholders).

Referências

- docs/engineering/backend/migrations.md
