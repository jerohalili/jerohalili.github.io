export function initBlogFilters() {
  const searchInput = document.getElementById('blog-search') as HTMLInputElement | null;
  const filterContainer = document.getElementById('blog-filters');
  const cards = Array.from(document.querySelectorAll<HTMLElement>('.blog-card'));
  const loadMoreBtn = document.getElementById('load-more-btn') as HTMLButtonElement | null;
  const emptyState = document.getElementById('blog-empty-state');
  const postCount = document.getElementById('post-count');

  if (!filterContainer || cards.length === 0) return;

  const POSTS_PER_PAGE = 6;
  let visibleCount = POSTS_PER_PAGE;
  let activeFilter = 'All';

  const filterButtons = filterContainer.querySelectorAll<HTMLElement>('[data-filter]');

  function getVisibleCards(): HTMLElement[] {
    const searchQuery = searchInput?.value.toLowerCase().trim() || '';

    return cards.filter(card => {
      const tags = card.dataset.tags?.split(',') || [];
      const category = card.dataset.category || '';
      const title = card.dataset.title || '';
      const description = card.dataset.description || '';

      const matchesFilter = activeFilter === 'All' || category === activeFilter;
      const matchesSearch = !searchQuery ||
        title.includes(searchQuery) ||
        description.includes(searchQuery) ||
        category.toLowerCase().includes(searchQuery) ||
        tags.some(t => t.toLowerCase().includes(searchQuery));

      return matchesFilter && matchesSearch;
    });
  }

  function updateDisplay() {
    const visible = getVisibleCards();
    const toShow = visible.slice(0, visibleCount);
    const toHide = visible.slice(visibleCount);

    cards.forEach(card => {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    });

    toShow.forEach((card, i) => {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });

    toHide.forEach(card => {
      card.style.display = 'none';
    });

    if (emptyState) {
      emptyState.style.display = visible.length === 0 ? 'block' : 'none';
    }

    if (loadMoreBtn) {
      loadMoreBtn.parentElement!.style.display = visible.length > visibleCount ? 'flex' : 'none';
    }

    if (postCount) {
      postCount.textContent = `${visible.length} post${visible.length !== 1 ? 's' : ''}`;
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter || 'All';

      filterButtons.forEach(b => {
        b.classList.remove('bg-orange-500', 'text-white', 'border-orange-500');
        b.classList.add('bg-transparent', 'text-zinc-500', 'border-zinc-200', 'dark:border-zinc-800', 'dark:text-zinc-400');
      });

      btn.classList.add('bg-orange-500', 'text-white', 'border-orange-500');
      btn.classList.remove('bg-transparent', 'text-zinc-500', 'border-zinc-200', 'dark:border-zinc-800', 'dark:text-zinc-400');

      visibleCount = POSTS_PER_PAGE;
      updateDisplay();
    });
  });

  let searchTimeout: ReturnType<typeof setTimeout>;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      visibleCount = POSTS_PER_PAGE;
      updateDisplay();
    }, 150);
  });

  loadMoreBtn?.addEventListener('click', () => {
    visibleCount += POSTS_PER_PAGE;
    updateDisplay();
  });

  updateDisplay();
}
