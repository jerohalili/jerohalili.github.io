let offWired = false;

export function initMagneticElements() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    // Avoid stacking duplicate listeners across View Transitions re-inits.
    // Full behavior unchanged — single bind has identical effect.
    if (el.dataset.magInit === '1') return;
    el.dataset.magInit = '1';
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.3');
    // Lite mode turns magnetic buttons off entirely.
    const skipForLite = () => document.documentElement.dataset.perf === 'lite';

    const onMove = (e: MouseEvent) => {
      if (skipForLite() || document.documentElement.dataset.fxMagnetic === 'off') return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      el.style.transition = 'transform 150ms ease-out';
    };

    const onLeave = () => {
      if (skipForLite() || document.documentElement.dataset.fxMagnetic === 'off') return;
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 400ms ease-out';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });

  // Lite: settle every magnetic element back in place when switching Full -> Lite.
  if (!document.documentElement.dataset.magLiteWired) {
    document.documentElement.dataset.magLiteWired = '1';
    window.addEventListener('perf-change', (e) => {
      if ((e as CustomEvent).detail !== 'lite') return;
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        el.style.transform = '';
      });
    });
  }

  // Switching the effect off in the Control Panel settles every element back in place.
  if (!offWired) {
    offWired = true;
    window.addEventListener('appearance-change', () => {
      if (document.documentElement.dataset.fxMagnetic !== 'off') return;
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        el.style.transform = '';
      });
    });
  }
}
