---
title: "Why I Chose Astro Over Next.js for My Portfolio"
description: "A practical breakdown of how Astro's island architecture solved problems that SSR frameworks overcomplicate."
pubDate: 2026-03-28
category: "Engineering"
readTime: "4 min read"
tags: ["Astro", "Performance", "SSG"]
draft: false
---

# Why I Chose Astro Over Next.js

Everyone defaults to Next.js. It's the safe choice. But for a portfolio site where **content is king** and interactivity is surgical, Astro does something Next.js can't: it ships zero JavaScript by default.

### The Island Architecture

Astro's mental model is simple. Your page is static HTML. You sprinkle interactive components on top — called "islands" — and only those islands ship JS to the browser.

```astro
---
import Hero from '../components/Hero.astro';
import Counter from '../components/Counter.tsx';
---

<Hero />           <!-- Zero JS -->
<Counter client:load />  <!-- Only this ships JS -->
```

On my portfolio, the hero section, about page, and blog listing are pure HTML. The typing effect, constellation canvas, and testimonial carousel are islands. The result: **near-perfect Lighthouse scores** with rich interactivity where it matters.

### Build Speed

My full site builds in under 5 seconds. Next.js with the same content? 15-20 seconds on a cold build. When you're iterating on design, that difference compounds fast.

### When Next.js Still Wins

Next.js is better for dynamic, data-heavy apps — dashboards, e-commerce, anything with user-specific content. Astro is for content-first sites that need occasional interactivity. Pick the right tool.

### The Takeaway

If your site is mostly content with a few interactive pieces, Astro's architecture is fundamentally more efficient. You get the DX of writing React/Svelte components with the performance of a static site. That's the sweet spot for portfolios.
