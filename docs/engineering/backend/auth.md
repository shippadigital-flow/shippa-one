# Autenticação & Autorização

Objetivo

Descrever o fluxo de autenticação recomendado (baseado em Supabase Auth) e as considerações para migrar a sessão para HttpOnly cookies com refresh tokens.

Seções

- Fluxo de login/registro
- Email verification / convite
- Reset de senha
- Refresh tokens e rotação
- Middleware de verificação de sessão
- Boas práticas e segurança

Resumo técnico

1. Fluxo recomendado
   - Autenticação primária com Supabase Auth (email/password, magic link opcional).
   - Após autenticação, o servidor emite uma sessão baseada em HttpOnly cookie (secure, SameSite=Lax/Strict conforme política).
   - O cookie contém apenas um identificador de sessão (session_id) — o token de acesso não é exposto ao cliente.

2. Refresh tokens
   - Use refresh tokens protegidos server-side para prolongar sessões quando necessário.
   - Refresh token rotativo para mitigar replay attacks.

3. Middleware
   - Middleware server-side válida cookie, carrega sessão e injeta `currentUser` e `currentCompany` no contexto da requisição.
   - Rejeitar com 401 quando não autenticado; 403 quando sem permissão.

4. Emails e convites
   - Convites: gerar token curto com expiração e enviar por Resend. Ao aceitar, o usuário cria conta e é associado à company.
   - Verificações de e-mail obrigatórias para contas com acesso administrativo.

5. Sessões e logout
   - Logout: invalidar session_id no backend e limpar cookie (Set-Cookie com max-age=0).

6. Segurança
   - Aplicar rate limiting em endpoints de login/forgot-password.
   - Monitorar e auditar tentativas de login falhas.

Referências

- docs/architecture/SECURITY.md
- docs/engineering/sessions.md
