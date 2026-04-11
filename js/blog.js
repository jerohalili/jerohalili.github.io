/* ============================================================
   BLOG.JS — Renders blog cards from data
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('blogGrid');
  if (!grid || !window.PORTFOLIO_DATA) return;

  window.PORTFOLIO_DATA.blog.forEach(post => {
    const date = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    const card = document.createElement('article');
    card.className = 'blog-card reveal-up';
    card.innerHTML = `
      <div class="blog-meta">
        <span>${post.category}</span>
        <span class="blog-meta-dot" aria-hidden="true"></span>
        <span>${date}</span>
        <span class="blog-meta-dot" aria-hidden="true"></span>
        <span>${post.readTime}</span>
      </div>
      <h3 class="blog-title">${post.title}</h3>
      <p class="blog-excerpt">${post.excerpt}</p>
      <a href="${post.href}" class="blog-read-more" aria-label="Read: ${post.title}">
        Read post
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
    `;
    grid.appendChild(card);
  });

  // Re-observe
  setTimeout(() => {
    document.querySelectorAll('.blog-card.reveal-up:not(.visible)').forEach(el => {
      const io = new IntersectionObserver(e => {
        e.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); } });
      }, { threshold: 0.1 });
      io.observe(el);
    });
  }, 50);
});
