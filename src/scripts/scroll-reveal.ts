export function initScrollReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;

          const reveal = () => {
            el.classList.add('revealed');
            observer.unobserve(el);
          };

          // Respect reduced motion: reveal instantly with no animation.
          if (reduceMotion) {
            reveal();
            return;
          }

          // Reveal content that is already in the viewport immediately so it
          // never sits hidden and then pops in on first paint / scroll.
          const rect = entry.boundingClientRect;
          const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

          if (alreadyInView) {
            reveal();
          } else {
            const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
            setTimeout(reveal, delay);
          }
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
