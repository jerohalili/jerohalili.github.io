/* ============================================================
   CURSOR.JS — Custom cursor follower (fully fixed & optimized)
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  // Disable on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mx = 0, my = 0;   // mouse position
  let cx = 0, cy = 0;   // cursor position
  let started = false;
  let raf;

  const speed = 0.12;   // smoothness
  let isHovering = false;

  // Mouse move
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;

    // Instant dot (centered)
    cursorDot.style.transform =
      `translate(${mx}px, ${my}px) translate(-50%, -50%)`;

    // Start animation only after first real position
    if (!started) {
      cx = mx;
      cy = my;
      animate();
      started = true;
    }
  });

  // Smooth animation loop (outer ring)
  function animate() {
    cx += (mx - cx) * speed;
    cy += (my - cy) * speed;

    const scale = isHovering ? 1.6 : 1;

    cursor.style.transform =
      `translate(${cx}px, ${cy}px) translate(-50%, -50%) scale(${scale})`;

    raf = requestAnimationFrame(animate);
  }

  // Interactive elements
  const interactiveSelector =
    'a, button, [role="button"], input, textarea, select, .project-card, .blog-card, .cert-card';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      isHovering = true;
      cursor.style.opacity = '0.6';
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) {
      isHovering = false;
      cursor.style.opacity = '1';
    }
  });

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
});