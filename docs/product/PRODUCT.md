# Product — Shippa One

Purpose

This document is the canonical product specification for Shippa One. It summarizes the product vision, target audience, core features, UX principles and acceptance criteria for the platform. Use this as the single source of truth for product decisions.

Table of Contents

- Purpose
- Vision & Mission
- Target Audience
- Product Principles
- Customer Journey
- Plans & Pricing
- Core Features
- UX Principles
- Empty / Loading / Error States
- Notifications & Success Metrics
- Cross-references

Status

Draft

Vision & Mission

Vision: Shippa One is a growth platform that gives businesses complete visibility and control over their digital presence — turning website data into clear, actionable insights.

Mission: Help businesses grow by transforming website data into clear, actionable insights and practical guidance.

Target Audience

Small and medium businesses with an existing online presence who need an easy-to-use platform to manage, publish and improve their websites and content (examples: law firms, clinics, local retailers, restaurants, real estate agents).

Product Principles

- Simple
- Intuitive
- Fast
- Educational
- Useful
- Modern
- Accessible

Customer Journey (high level)

1. Purchase a website → receive access → create password → log in.
2. Dashboard shows health, activity, growth opportunities and recent publications.
3. Use Website, Blog and Library modules to manage content and learn improvements.
4. Discover Growth Center and Pro features with educational previews.
5. Upgrade to Pro to unlock Analytics, SEO, Leads and integrations.

Plans & Pricing

- Start (included): Dashboard, Website, Blog, Library, Settings.
- Pro (R$ 29,90/month): Analytics, SEO, Leads, Google Integrations, Smart Reports, Growth Insights.

Core Features

- Dashboard: high-level health, visitor trends, next actions.
- Website: site information, domain, publish status.
- Blog: authoring, drafts, publishing, SEO fields.
- Library: educational content and guides.
- Growth Center: non-blocking previews and upgrade CTAs that explain value.
- Analytics (Pro): actionable insights: what happened, why, suggested next steps.
- SEO (Pro): practical recommendations to improve visibility.

UX Principles

- Friendly, modern, premium, clean and lightweight.
- Avoid complex dashboards and technical language.
- Provide short, action-oriented notifications and CTAs.

Empty / Loading / Error States

- Empty states must educate (explain why empty and provide a clear CTA).
- Loading states must use skeletons/placeholders to avoid blank screens.
- Error states must explain: what happened, why, and how to fix it (no technical messages).

Notifications & Success Metrics

Notifications: short, action-oriented (e.g., "Your SSL certificate is active.").

Success metrics:
- Weekly / Monthly active users
- Blog articles published
- Customer retention
- Upgrade rate to Pro
- Feature adoption
- Customer satisfaction

Cross-references

- Architecture & API: docs/architecture/API.md
- Database guidance: docs/architecture/DATABASE.md
- Design tokens: docs/architecture/DESIGN_SYSTEM.md (and `src/styles/tokens.css`)

Future Sections

- Detailed feature acceptance tests
- Example user stories and flows
- Growth Center content matrix
