/* ============================================================
   TESTIMONIALS.JS — Carousel
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const track   = document.getElementById('testimonialsTrack');
  const dotsEl  = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  if (!track || !window.PORTFOLIO_DATA) return;

  const { testimonials } = window.PORTFOLIO_DATA;
  let current = 0;
  let autoTimer;

  // Render cards
  testimonials.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.setAttribute('role', 'tabpanel');
    card.setAttribute('aria-label', `Testimonial from ${t.name}`);
    card.innerHTML = `
      <div class="testimonial-inner">
        <div class="testimonial-quote-mark" aria-hidden="true">"</div>
        <p class="testimonial-text">${t.text}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar" aria-hidden="true">${t.initials}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-role">${t.role}</div>
          </div>
        </div>
      </div>
    `;
    track.appendChild(card);

    // Dot
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = (index + testimonials.length) % testimonials.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsEl.querySelectorAll('.testimonial-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current);
    });
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 6000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

  // Keyboard support
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  resetAuto();
});
