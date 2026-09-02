export function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress') as HTMLElement | null;
  const readTimePill = document.getElementById('read-time-pill') as HTMLElement | null;
  const readTimeValue = document.getElementById('read-time-value') as HTMLElement | null;
  const article = document.querySelector('article.prose') as HTMLElement | null;
  const footer = document.querySelector('footer') as HTMLElement | null;

  if (!progressBar || !article) return;

  const readTimeText = readTimePill?.querySelector('[data-read-mins]')?.textContent || '';
  const totalMinutes = parseInt(readTimeText, 10) || 5;

  function update() {
    const articleRect = article.getBoundingClientRect();
    const articleTop = articleRect.top + window.scrollY;
    const articleHeight = articleRect.height;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    const start = articleTop - windowHeight * 0.3;
    const end = articleTop + articleHeight - windowHeight * 0.7;
    const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

    progressBar.style.transform = `scaleX(${progress})`;

    const isInArticle = scrollY > start && scrollY < end + windowHeight;
    if (readTimePill) {
      readTimePill.style.opacity = isInArticle ? '1' : '0';
      readTimePill.style.pointerEvents = isInArticle ? 'auto' : 'none';
    }

    if (readTimeValue && footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < windowHeight * 0.8) {
        readTimePill!.style.opacity = '0';
      }
    }

    const remaining = Math.max(0, Math.ceil(totalMinutes * (1 - progress)));
    if (readTimeValue) {
      readTimeValue.textContent = `${remaining} min left`;
    }
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  update();
}
