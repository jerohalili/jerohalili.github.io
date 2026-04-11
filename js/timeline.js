/* ============================================================
   TIMELINE.JS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const el = document.getElementById('timeline');
  if (!el || !window.PORTFOLIO_DATA) return;

  window.PORTFOLIO_DATA.timeline.forEach(item => {
    const li = document.createElement('div');
    li.className = 'timeline-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <div class="timeline-dot" aria-hidden="true"></div>
      <div class="timeline-date">${item.date}</div>
      <h3 class="timeline-title">${item.title}</h3>
      <p class="timeline-sub">${item.sub}</p>
    `;
    el.appendChild(li);
  });

  // Observe after render
  setTimeout(() => {
    const items = document.querySelectorAll('.timeline-item');
    const io = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = (i * 0.07) + 's';
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach(item => io.observe(item));
  }, 50);
});
