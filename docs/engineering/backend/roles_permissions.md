# Roles & Permissions

Objetivo

Descrever o modelo de papéis e permissões e como eles são aplicados no backend.

Modelo sugerido

- Super Admin — acesso global (platform operators)
- Company Admin — gerenciamento completo do tenant
- Editor — criar/editar conteúdo (blog, posts)
- Marketing — acessar analytics/seo/leads
- Viewer — acesso somente leitura

Implementação

- Roles tabela: roles(id, name, description)
- Permissions tabela: permissions(id, resource, action)
- Role_Permissions: ligação muitos-para-muitos
- Member -> role_id (in company membership)

Enforcement

- Middleware verifica `currentUser.role` e `company_id` antes de operações mutantes.
- Para operações mais finas, usar permission checks por recurso (ex.: can_edit_post(user, post)).

Referências

- docs/architecture/SECURITY.md
