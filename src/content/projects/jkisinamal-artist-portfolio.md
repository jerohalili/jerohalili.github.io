---
title: "JKISINAMAL: Fine Art Gallery & Portfolio"
subtitle: "Artist CMS + Gallery"
description: "The professional portfolio for visual artist JKISINAMAL — an Astro 6 + Sanity CMS gallery with a custom masonry engine that ships full-resolution art without social compression."
tags: ["Astro 6", "Sanity CMS", "React 19", "Tailwind v4"]
image: "/images/projects/jkisinamal-portfolio.png"
impact: "Creative Autonomy"
order: 3
liveUrl: "https://jkisinamal.github.io"
repoUrl: "https://github.com/jkisinamal/jkisinamal.github.io"
---

**Live:** https://jkisinamal.github.io
**Repo:** https://github.com/jkisinamal/jkisinamal.github.io

## The Challenge

Instagram and marketplaces compress artwork, throttle reach with algorithms, and offer no brand control. Generic builders are slow and rigid with mixed-aspect-ratio collections. JKISINAMAL needed an artwork-first gallery: full fidelity, fast on mobile, minimal chrome — plus an editing workflow the artist can actually use.

## The Solution

I built an Astro 6 static gallery backed by **Sanity CMS** (artwork + post schemas, `/admin` studio in dev), styled with Tailwind v4 glassmorphism, with a custom masonry grid, lazy loading, and CLS-safe skeletons. The artist owns branding, presentation, and publishing — no algorithm in between.

---

## Technical Highlights

### Sanity-Backed Content
* **Schemas:** `artwork` (collections, featured works, statements) + `post` (news) under `src/sanity/schemaTypes/`.
* **Studio:** Embedded Sanity Studio at `/admin` in development; production builds pull via `@sanity/astro` + `@sanity/client`.
* **Config:** `sanity.config.ts` + `astro.config.mjs` (`PUBLIC_SANITY_PROJECT_ID`, `production` dataset).

### Masonry + Performance
* **Aspect-ratio masonry:** Multi-column CSS grid that packs unpredictable artwork dimensions without layout shift.
* **Asset pipeline:** Native lazy loading, explicit aspect-ratio skeletons (zero CLS), responsive breakpoints from phones to multi-K displays.
* **Zero-cost hosting:** GitHub Pages with free global edge delivery.

---

## System Architecture

| Module | Implementation |
| :--- | :--- |
| **Gallery Engine** | Masonry grid with variable aspect-ratio placement. |
| **CMS Layer** | Sanity artwork/post schemas + admin studio. |
| **Design System** | Tailwind v4 glassmorphic components with backdrop-blur. |
| **Contact Hub** | Collections, artist statement, and commission inquiry entry points. |

---

## Impact & Key Takeaways

Shifting from **Algorithm Dependency → Owned Infrastructure** gave the artist full presentation control and faster loads. Lesson: subtraction is a feature — the UI should frame the art, never compete with it.

---

## Roadmap

* **Short-Term:** Category filtering, search, and micro-interaction polish.
* **Medium-Term:** Commission inquiry forms and artist news/blog via the existing `post` schema.
* **Long-Term:** Secure commission payments and multilingual support.

---

## How to Run This Project

```bash
git clone https://github.com/jkisinamal/jkisinamal.github.io.git
cd jkisinamal.github.io
npm install
npm run dev
# Studio (dev only): http://localhost:4321/admin
# Requires PUBLIC_SANITY_PROJECT_ID in .env
```
