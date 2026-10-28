/**
 * Canvas can't read CSS variables directly, so this returns the current
 * accent color as an "r, g, b" string, e.g. "249, 115, 22".
 * `level` picks the shade: 400 (light), 500 (default) or 600 (deeper).
 * Cached, and refreshed whenever the appearance changes.
 */
type Level = 400 | 500 | 600;

const FALLBACK: Record<Level, string> = {
  400: '251, 146, 60',
  500: '249, 115, 22',
  600: '234, 88, 12',
};

let cache: Partial<Record<Level, string>> = {};

export function accentRGB(level: Level = 500): string {
  const hit = cache[level];
  if (hit) return hit;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(`--accent-${level}`).trim();
  const value = raw ? raw.split(/\s+/).join(', ') : FALLBACK[level];
  cache[level] = value;
  return value;
}

if (typeof window !== 'undefined') {
  const reset = () => { cache = {}; };
  window.addEventListener('appearance-change', reset);
  document.addEventListener('astro:after-swap', reset);
}
