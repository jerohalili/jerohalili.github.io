---
title: "Tailwind CSS Tips from a Year of Daily Use"
description: "Advanced patterns, dark mode strategies, and custom utilities that made my Tailwind workflow significantly faster."
pubDate: 2025-12-18
category: "Engineering"
readTime: "3 min read"
tags: ["Tailwind", "CSS", "Styling"]
draft: false
---

I've written over 50,000 lines of Tailwind in the past year. Here are the patterns that actually matter.

### Extract Components, Not Utility Classes

The biggest Tailwind mistake is over-extracting. Don't create a `.card` class that just wraps padding and rounded corners. Extract when:

- A pattern repeats 3+ times
- The component has complex state (hover, focus, dark mode)
- You need to enforce consistency (spacing, typography)

### Dark Mode Without the Flash

The `dark:` prefix works, but the flash of wrong theme on load is jarring. Use this inline script in your `<head>`:

```html
<script is:inline>
  const theme = localStorage.getItem('theme') || 
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList[theme === 'dark' ? 'add' : 'remove']('dark');
</script>
```

This runs before paint — no flash.

### The Typography Plugin is Underrated

`@tailwindcss/typography` gives you `prose` classes that style markdown content beautifully. Instead of manually styling every heading, paragraph, and list:

```html
<article class="prose prose-zinc dark:prose-invert">
  <Content />
</article>
```

Then customize with `prose-*` variants for your design system.

### Custom Utilities Over @apply

`@apply` creates hidden CSS that's hard to debug. Custom utilities are explicit:

```css
@layer utilities {
  .text-balance { text-wrap: balance; }
  .scrollbar-hide { scrollbar-width: none; }
}
```

### The Pattern

Tailwind's strength is composability. Fight the urge to abstract too early. When you find yourself copying the same 10+ utility string, extract. Until then, keep it inline.
