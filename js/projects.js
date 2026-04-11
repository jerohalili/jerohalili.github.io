/* ============================================================
   PROJECTS.JS — Renders project cards from data
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !window.PORTFOLIO_DATA) return;

  const { projects } = window.PORTFOLIO_DATA;

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal-up' + (project.featured ? ' featured' : '');
    card.style.setProperty('--delay', (index * 0.08) + 's');
    card.setAttribute('role', 'article');
    card.setAttribute('aria-label', project.title);

    const tagsHtml = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-visual" style="background:${project.bgColor || 'var(--color-bg-alt)'}">
        <div class="project-visual-placeholder" aria-hidden="true">${project.placeholder}</div>
      </div>
      <div class="project-body">
        <div class="project-num">${project.num}</div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-footer">
          <a href="pages/case-study-${project.id}.html" class="project-link" aria-label="View case study for ${project.title}">
            View case study
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <span class="project-impact">${project.impact}</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Re-observe new elements for reveal
  if (window.revealObserverReattach) window.revealObserverReattach();
});
