export function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
    if (!el.hasAttribute('data-reveal-delay')) {
      el.setAttribute('data-reveal-delay', String((i % 6) * 80));
    }
    observer.observe(el);
  });
}
