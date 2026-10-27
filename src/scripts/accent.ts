/**
 * Canvas can't read CSS variables directly, so this returns the current
 * accent color as an "r, g, b" string, e.g. "249, 115, 22".
 * Cached, and refreshed whenever the appearance changes.
 */
let cache: string | null = null;

export function accentRGB(): string {
  if (cache) return cache;
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--accent-500').trim();
  cache = raw ? raw.split(/\s+/).join(', ') : '249, 115, 22';
  return cache;
}

if (typeof window !== 'undefined') {
  const reset = () => { cache = null; };
  window.addEventListener('appearance-change', reset);
  document.addEventListener('astro:after-swap', reset);
}
