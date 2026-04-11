/* ============================================================
   NAV.JS — Navigation scroll, mobile menu, active section
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const header    = document.getElementById('navHeader');
  const menuBtn   = document.getElementById('navMenuBtn');
  const drawer    = document.getElementById('navDrawer');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');
  const footerYear = document.getElementById('footerYear');

  // Footer year
  if (footerYear) footerYear.textContent = new Date().getFullYear();

  // Scroll: nav shadow + active link
  function onScroll() {
    const scrolled = window.scrollY > 40;
    header.classList.toggle('scrolled', scrolled);

    // Active section highlight
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.id;
    });
    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', href === current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', function () {
      const isOpen = menuBtn.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });

    // Close on drawer link click
    drawer.querySelectorAll('.nav-drawer-link').forEach(link => {
      link.addEventListener('click', function () {
        menuBtn.classList.remove('open');
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', false);
        drawer.setAttribute('aria-hidden', true);
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) {
        menuBtn.classList.remove('open');
        drawer.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', false);
        drawer.setAttribute('aria-hidden', true);
      }
    });
  }
});
