# Design Tokens (spacing & radii)

This document describes the canonical design tokens for spacing and border radii used by Shippa One.

Purpose
- Establish a single source of truth for spacing and border radii so UI changes are consistent and predictable.
- Provide a safe starting point for migrating ad-hoc Tailwind classes into token-driven styles.

Files
- `src/styles/tokens.css` — CSS variables for spacing and radii (added in this commit).

Usage guidelines
- Prefer CSS variables where possible: `style={{ padding: 'var(--space-16)' }}` or `className="p-[var(--space-16)]"` when needed.
- For Tailwind-based classes, map these token values into `tailwind.config.js` under `theme.extend.spacing` and `theme.extend.borderRadius`.

Do not change values without approval
- These tokens are the canonical values for the platform. Any change must be reviewed with design and product stakeholders.

Migration notes
- When converting a component to use tokens, preserve the visual output initially (copy exact spacing values) and open a small PR that updates only that component.
- Prefer small, incremental migrations rather than a big-bang replacement.

Design references
- Spacing scale derived from the Design System v1.0.
- Border radius values follow the Design System recommendations (cards use `--radius-card`).
