# Shippa One

A modern, TypeScript-first React application built with TanStack Start (SSR-capable), TanStack Router, and React Query. The project includes an in-repo UI primitives library (Radix wrappers + Tailwind) and is configured for Vite using a Lovable preset.

This repository powers the Shippa One web UI and is structured for server-side rendering and edge deployment.

Quick links
- Source: src/
- Server entry (SSR wrapper): src/server.ts
- Start instance and middleware: src/start.ts
- Router glue (generated route tree): src/router.tsx + src/routeTree.gen.ts
- UI primitives: src/components/ui/

Features
- SSR via @tanstack/react-start
- Routing with @tanstack/react-router (generated route tree)
- Data fetching and caching with @tanstack/react-query
- Local design system (Radix + Tailwind wrappers)
- TypeScript strict mode


## Getting started

Prerequisites
- Node.js 18+ (or Bun depending on your environment)
- npm, yarn, or pnpm

Install

```bash
# using npm
npm install

# or using pnpm
pnpm install
```

Run (development)

```bash
npm run dev
```

Build

```bash
npm run build
```

Preview a production build

```bash
npm run preview
```

Lint & Format

```bash
npm run lint
npm run format
```

Type-check

```bash
npx tsc --noEmit
```


## Project layout (top-level)

```
src/                # application source
  components/ui/    # local UI primitives and Radix wrappers
  features/         # feature folders (UI + pages + hooks + services)
  services/         # API clients and business logic
  shared/           # shared types, constants, helpers
  hooks/            # shared React hooks
  start.ts          # TanStack Start instance + middleware
  server.ts         # SSR server entry wrapper
  router.tsx        # router creation (uses routeTree.gen.ts)
  routeTree.gen.ts  # generated route tree (do not hand-edit)
  styles.css        # global styles / Tailwind entry

package.json
vite.config.ts
tsconfig.json

```


## Notes
- routeTree.gen.ts is a generated file. Do not hand-edit it — see ARCHITECTURE.md for details on generation and where to run generators.
- This repository is configured with a Lovable Vite preset (`@lovable.dev/vite-tanstack-config`). That preset injects multiple plugins (see vite.config.ts comment) and controls build targets for SSR/edge.


## Support
For security issues or sensitive problems, see SECURITY.md.


---

_Last updated: 2026-07-10_
