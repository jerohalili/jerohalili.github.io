export function initMagneticElements() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.3');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      el.style.transition = 'transform 150ms ease-out';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 400ms ease-out';
    });
  });
}
