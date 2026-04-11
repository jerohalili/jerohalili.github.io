/* ============================================================
   CERTIFICATIONS.JS
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('certsGrid');
  if (!grid || !window.PORTFOLIO_DATA) return;

  window.PORTFOLIO_DATA.certifications.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'cert-card reveal-up';
    card.innerHTML = `
      <div class="cert-icon" aria-hidden="true">${cert.icon}</div>
      <div>
        <div class="cert-name">${cert.name}</div>
        <div class="cert-issuer">${cert.issuer}</div>
      </div>
      <span class="cert-status ${cert.status}" aria-label="Status: ${cert.statusLabel}">${cert.statusLabel}</span>
    `;
    grid.appendChild(card);
  });

  // Re-observe
  setTimeout(() => {
    document.querySelectorAll('.cert-card.reveal-up:not(.visible)').forEach(el => {
      const io = new IntersectionObserver(e => {
        e.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); } });
      }, { threshold: 0.1 });
      io.observe(el);
    });
  }, 50);
});
