export function initMagneticElements() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    // Avoid stacking duplicate listeners across View Transitions re-inits.
    // Full behavior unchanged — single bind has identical effect.
    if (el.dataset.magInit === '1') return;
    el.dataset.magInit = '1';
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.3');
    // Lite-only: profile photo behaves like main card (no inner float).
    // Other [data-magnetic] buttons untouched. Full falls through identical.
    const isProfilePhoto = () => !!el.closest('a[href*="/about"]');
    const skipForLite = () =>
      document.documentElement.dataset.perf === 'lite' && isProfilePhoto();

    const onMove = (e: MouseEvent) => {
      if (skipForLite()) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      el.style.transition = 'transform 150ms ease-out';
    };

    const onLeave = () => {
      if (skipForLite()) return;
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 400ms ease-out';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  });

  // Lite-only reset: clear any Full leftover transform on the profile photo
  // when toggling Full -> Lite. Full path untouched.
  if (!document.documentElement.dataset.magLiteWired) {
    document.documentElement.dataset.magLiteWired = '1';
    window.addEventListener('perf-change', (e) => {
      if ((e as CustomEvent).detail !== 'lite') return;
      document
        .querySelectorAll<HTMLElement>('a[href*="/about"] [data-magnetic]')
        .forEach((photo) => {
          photo.style.transform = '';
        });
    });
  }
}
