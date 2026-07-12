# Design System — Shippa One

Purpose

Consolidated design system guidance for Shippa One. This document is a canonical reference for visual choices, tokens and component rules. Implementation files (tokens) live in the repository at `src/styles/tokens.css`.

Table of Contents

- Purpose
- Visual philosophy
- Color palette (summary)
- Typography
- Spacing & tokens
- Border radius & elevation
- Icons
- Buttons & inputs
- Cards & layout
- Empty / Loading / Error patterns
- Accessibility

Status

Draft

Visual philosophy

Modern, premium, minimal, clean and friendly. Reduce noise and prioritize clarity and actionable information.

Color palette (summary)

- Primary: Blue (primary actions, links)
- Secondary: Light backgrounds and surfaces
- Success: Green
- Warning: Orange
- Error: Red
- Neutral: Grays for typography and borders

Typography & scale

- H1 36px Bold; H2 30px; H3 24px; Body 16px; Small 14px; Caption 12px
- Use a modern sans-serif (Inter / Plus Jakarta Sans)

Spacing & tokens

- Canonical spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128
- Tokens implemented in `src/styles/tokens.css` (refer to the file for variable names)

Border radius & shadows

- Card radius larger than small UI elements (tokenized values)
- Elevation is soft and minimal

Components (rules)

- Buttons: primary/secondary/ghost/danger variations; use tokens for spacing and radii
- Inputs: rounded, clear focus, error and disabled states
- Cards: large padding, rounded corners, soft shadow, minimal borders
- Tables: simple, support sorting/filter/pagination

Empty / Loading / Error patterns

- Always provide educational empty states with a CTA
- Use skeletons instead of spinners where possible
- Errors should be user-friendly and provide remediation steps

Accessibility

- Minimum contrast ratios, visible focus states, keyboard navigation and ARIA labels

Future Sections

- Component usage examples and code snippets
- Design tokens mapping to Tailwind configuration
- Visual assets and Sketch/Figma documentation links
