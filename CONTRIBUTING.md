# Contributing

Thanks for your interest in contributing! This document explains the workflow, tools, and expectations for code contributions.

Repository conventions

- Language: TypeScript (strict mode enabled in tsconfig)
- Styling: Tailwind CSS + project-specific styles. Run `npm run format` before committing.
- Linting: ESLint is configured — run `npm run lint`.

Setup

```bash
npm install
npx tsc --noEmit  # run the type-check locally
npm run dev       # run the dev server
```

Branching & PRs

- Use feature branches with descriptive names: `feat/<short-desc>`, `fix/<short-desc>`, `chore/<short-desc>`.
- Open pull requests against `main` (or the current default branch).
- Each PR should contain:
  - A short summary of the change
  - The motivation / problem being solved
  - A link to any related issue

Code review checklist

- Does the code compile (TypeScript) and pass `npm run lint`?
- Are changes covered by tests where appropriate? Add tests for behavior-critical changes.
- Does the change include documentation updates if behavior or public API changed?
- Are accessibility implications considered for UI changes (keyboard focus, aria attributes, labels)?

Testing

- Add unit tests for new features and bug fixes. Start small and focused.
- Suggested test tools: Jest / Vitest + React Testing Library.

Formatting & commits

- Format code with Prettier: `npm run format`.
- Keep commits small and focused. Use clear commit messages (imperative tense): `feat: add X`.

Generating code

- `src/routeTree.gen.ts` is a generated file. If you need to update routes, run the route generator used by the project (document the command here). Do not hand-edit the generated file.

Developer tips

- For faster iteration, run `npx tsc --noEmit` in watch mode if needed.
- Consider enabling `noUnused*` flags locally to find dead code, but note these flags are currently disabled in the project tsconfig — CI will enable them in time.

Getting help

If you're unsure about architecture or approach, open a draft PR or an issue describing your plan and tag the maintainers for early feedback.

