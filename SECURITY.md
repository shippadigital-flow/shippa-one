# Security

This document provides security guidance for contributors and maintainers.

Reporting vulnerabilities

If you discover a security vulnerability, please do not open a public issue. Instead, contact the maintainers directly via the repository owner email or private channel. If you need a direct contact and one is not available here, open a private support request with the organization.

Dependency updates

- Regularly run dependency audits:

```bash
# npm
npm audit

# or using npm-check-updates
npx npm-check-updates -u
```

- Consider adding automated dependency scanning (Dependabot, Renovate) to keep dependencies up to date.

Secrets and environment variables

- Never commit secrets (API keys, tokens, private keys) into the repository. Use environment variables. Add any local secrets to your runtime platform's secret manager (Cloudflare, Vercel, Netlify, etc.).
- If you accidentally commit a secret, rotate it immediately and remove the secret from history (avoid force-pushing to preserve Lovable history; instead, follow organization-safe secret rotation steps and create remediation PRs).

Access control & least privilege

- Grant repository and deployment access on a least-privilege basis. Use short-lived tokens where supported and leverage platform SSO when possible.

Static analysis & SCA

- Add static analysis and SCA (software composition analysis) tools to CI. Recommended tools:
  - Snyk or Dependabot for dependency alerts
  - ESLint for code issues
  - TypeScript `tsc --noEmit` in CI for type-safety

Responsible disclosure

Provide a contact method for reporting security issues privately. If none is available, use the organization's standard security contact channel.

