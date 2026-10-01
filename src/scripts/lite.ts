export type PerfMode = 'full' | 'lite';

const KEY = 'perf-mode';

export function getStored(): PerfMode | null {
  try {
    const v = localStorage.getItem(KEY);
    if (v === 'full' || v === 'lite') return v;
  } catch { /* ignore */ }
  return null;
}

export function autoShouldLite(): boolean {
  try {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    if (nav.connection?.saveData) return true;
    const eff = nav.connection?.effectiveType;
    if (eff === 'slow-2g' || eff === '2g' || eff === '3g') return true;
    if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) return true;
    if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) return true;
  } catch { /* ignore */ }
  return false;
}

export function resolveInitial(): PerfMode {
  return getStored() ?? (autoShouldLite() ? 'lite' : 'full');
}

export function isLite(): boolean {
  return document.documentElement.dataset.perf === 'lite';
}

export function apply(mode: PerfMode) {
  document.documentElement.dataset.perf = mode;
  try {
    localStorage.setItem(KEY, mode);
  } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent('perf-change', { detail: mode }));
}
