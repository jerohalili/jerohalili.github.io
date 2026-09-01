export function initTiltElements() {
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`;
      el.style.transition = 'transform 150ms ease-out';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
      el.style.transition = 'transform 500ms ease-out';
    });
  });
}
