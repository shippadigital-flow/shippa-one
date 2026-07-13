# Migrações — Processo e Runbook

Objetivo

Definir passos e padrões para criar, revisar e aplicar migrações no banco de dados mantendo segurança e reversibilidade.

Regras

1. Cada alteração de schema deve ter um migration único com `up` e `down` (ou equivalente reversível).
2. Migrations pequenas e focadas; alterações grandes subdivididas.
3. Evitar *destructive changes* (DROP column/table) sem plan de rollout e comunicação.

Pipeline de migração

- Desenvolvedor cria migration no `migrations/` com timestamp.
- Abrir PR com migration + testes de integração que rodem contra banco de dev.
- CI executa migrations em ambiente de teste; reviewer aprova.
- Em staging, rodar migrations e executar smoke tests antes de produção.
- Em produção, rodar migration em janela de baixa atividade; sempre com backups e plano de rollback.

Rollback

- Cada migration precisa de um script de rollback. Testar rollback em staging.
- Em casos onde rollback não é possível (ex.: coluna droppada), criar migration compensatória.

Backups & validação

- Fazer snapshot/backup antes de rodar migrations em produção.
- Ter um runbook para restaurar backups e tempo estimado de recovery.

Referências

- docs/architecture/DATABASE.md
