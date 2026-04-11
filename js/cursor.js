/* ============================================================
   CURSOR.JS — Custom cursor follower (desktop only)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Only on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;
  let raf;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.left = mx + 'px';
    cursorDot.style.top  = my + 'px';
  });

  // Smooth lag for outer ring
  function animate() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Scale up on interactive elements
  const interactiveSelector = 'a, button, [role="button"], input, textarea, select, .project-card, .blog-card, .cert-card';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
      cursor.style.opacity = '0.6';
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.opacity = '1';
    }
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; cursorDot.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; cursorDot.style.opacity = '1'; });
});
