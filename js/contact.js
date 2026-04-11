/* ============================================================
   CONTACT.JS — Form submission via Formspree (free, no backend)
   Replace YOUR_FORM_ID with your Formspree endpoint
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span>';
    submitBtn.disabled = true;
    status.textContent = '';
    status.className = 'form-status';

    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    // ── Option A: Formspree (recommended for GitHub Pages) ──
    // 1. Go to formspree.io and create a free form
    // 2. Replace YOUR_FORM_ID below
    const FORMSPREE_ID = 'YOUR_FORM_ID';

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        status.textContent = '✓ Message sent! I\'ll get back to you within 24 hours.';
        status.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    } catch {
      // ── Fallback: open mailto ──
      const subject = encodeURIComponent(`Portfolio inquiry from ${body.name}`);
      const bodyText = encodeURIComponent(
        `Name: ${body.name}\nEmail: ${body.email}\nType: ${body.type}\n\n${body.message}`
      );
      window.location.href = `mailto:jerobusiness20@gmail.com?subject=${subject}&body=${bodyText}`;
      status.textContent = 'Opening your email client...';
      status.className = 'form-status success';
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});
