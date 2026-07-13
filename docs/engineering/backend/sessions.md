# Sessões — desenho e políticas

Objetivo

Documentar como as sessões devem ser criadas, armazenadas e invalidadas.

Recomendações

- Session store: tabela `sessions` no Postgres com redis cache opcional para lookup rápido.
- Cookie: HttpOnly, Secure, SameSite=Lax (ou Strict para ações sensíveis), set `Path=/`.
- Expiração: sessão curta (ex.: 24h) + refresh token com 30 days rotativo.
- Invalidação: logout remove session entry e limpa cookie; servidores de sessão invalidam token no DB.

Campos na tabela sessions

- id (uuid PK)
- user_id
- company_id
- created_at, updated_at, expires_at
- last_seen_at
- ip_address
- user_agent

Segurança

- Registrar `last_seen_at` e IP para detecção de anomalias.
- Limitar múltiplas sessões por usuário quando aplicável (policy configurable).

Referências

- docs/engineering/backend/auth.md
