# Roadmap

This roadmap outlines near-term priorities and medium-term goals for Shippa One. Items are ordered roughly by priority and expected impact.

Near-term (0–3 months)

- CI & Type safety
  - Add a GitHub Actions workflow to run: install, lint, type-check (tsc --noEmit), and build.
  - Enable `noUnusedLocals` and `noUnusedParameters` in a build/CI tsconfig to reveal dead code without forcing local developers to change their environment immediately.

- Tests
  - Add unit tests for critical UI primitives (Button, Input, Dialog) and core services. Start with lightweight snapshot and behavioral tests.

- Accessibility
  - Add automated a11y checks to CI (axe/core or axe-cli) and fix obvious label/focus issues.

Mid-term (3–9 months)

- Performance & bundle size
  - Introduce route-level code-splitting verification and a bundle-size audit in CI (vite-plugin-bundle-visualizer or similar).
  - Dynamically import heavy third-party libraries (e.g., charts) where appropriate.

- Developer experience
  - Document route generation and provide scripts for regenerating `src/routeTree.gen.ts`.
  - Create CONTRIBUTING.md and a PR template that enforces type-check and lint on CI.

- Modularization
  - Consider extracting the UI primitives into a local package (monorepo or private npm package) if they are reused across multiple projects.

Longer-term (9–18 months)

- Observability & error reporting
  - Integrate server-side error reporting (Sentry/Datadog) and add sampling, environment tagging, and PII scrubbing.

- Multi-region / edge optimizations
  - Tune caching and SSR response caching headers for CDN edge caching. Add stale-while-revalidate strategies where appropriate.

- SDK & typed APIs
  - Introduce typed clients for backend APIs (OpenAPI / generated TypeScript clients) to reduce contract drift.


How to contribute to the roadmap

- File issues for proposed roadmap changes and tag them with `roadmap`.
- Prioritize items iteratively: small, reversible changes first (CI, linting, type checks), followed by larger refactors (code-splitting, modularization).

