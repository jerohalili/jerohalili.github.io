/* ============================================================
   SKILLS.JS — Canvas constellation visualization + skill bars
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.PORTFOLIO_DATA) return;
  const { skills, skillNodes } = window.PORTFOLIO_DATA;

  /* ── Skill categories ── */
  const categoriesEl = document.getElementById('skillsCategories');
  if (categoriesEl && skills) {
    skills.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'skill-category reveal-up';

      const itemsHtml = cat.items.map(item => `
        <div class="skill-item">
          <div class="skill-item-top">
            <span class="skill-name">${item.name}</span>
            <span class="skill-level-text">${item.label}</span>
          </div>
          <div class="skill-bar">
            <div class="skill-bar-fill" data-width="${item.level}" style="width:0%"></div>
          </div>
        </div>
      `).join('');

      div.innerHTML = `
        <div class="skill-category-label">${cat.category}</div>
        <div class="skill-list">${itemsHtml}</div>
      `;

      categoriesEl.appendChild(div);
    });

    // Re-trigger reveal observer for dynamically added elements
    setTimeout(() => {
      document.querySelectorAll('.reveal-up:not(.visible)').forEach(el => {
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
        }, { threshold: 0.1 });
        io.observe(el);
      });

      // Observe skill bars
      document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const io = new IntersectionObserver(entries => {
          entries.forEach(e => {
            if (e.isIntersecting) {
              e.target.style.width = e.target.dataset.width + '%';
              io.unobserve(e.target);
            }
          });
        }, { threshold: 0.3 });
        io.observe(bar);
      });
    }, 100);
  }

  /* ── Canvas constellation ── */
  const canvas = document.getElementById('skillsCanvas');
  const centerLabel = document.getElementById('skillCenterName');
  if (!canvas || !skillNodes) return;

  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  let animFrame;
  let hoveredNode = null;

  const groupColors = {
    engineering: '#0f0f0d',
    ai:          '#2563eb',
    design:      '#6b6b62',
    tools:       '#a0a096',
  };

  function getColor(group) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      const darkMap = { engineering: '#f5f5f0', ai: '#60a5fa', design: '#a8a89e', tools: '#68685f' };
      return darkMap[group] || '#f5f5f0';
    }
    return groupColors[group] || '#0f0f0d';
  }

  function getCenterColor() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'rgba(245,245,240,0.06)' : 'rgba(15,15,13,0.05)';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Center node
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, 30, 0, Math.PI * 2);
    ctx.fillStyle = getCenterColor();
    ctx.fill();

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    ctx.font = '500 12px DM Sans, system-ui, sans-serif';
    ctx.fillStyle = isDark ? 'rgba(245,245,240,0.4)' : 'rgba(15,15,13,0.3)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // ctx.fillText('Jero', W / 2, H / 2 - 7);
    // ctx.fillText('Halili', W / 2, H / 2 + 7);

    // Lines from center to nodes
    skillNodes.forEach(node => {
      const nx = node.x * W;
      const ny = node.y * H;
      const isHovered = hoveredNode === node;

      ctx.beginPath();
      ctx.moveTo(W / 2, H / 2);
      ctx.lineTo(nx, ny);
      ctx.strokeStyle = isHovered
        ? (isDark ? 'rgba(245,245,240,0.3)' : 'rgba(15,15,13,0.25)')
        : (isDark ? 'rgba(245,245,240,0.07)' : 'rgba(15,15,13,0.07)');
      ctx.lineWidth = isHovered ? 1.5 : 1;
      ctx.stroke();
    });

    // Nodes
    skillNodes.forEach(node => {
      const nx = node.x * W;
      const ny = node.y * H;
      const isHovered = hoveredNode === node;
      const r = isHovered ? node.size + 3 : node.size;
      const color = getColor(node.group);

      ctx.beginPath();
      ctx.arc(nx, ny, r, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? color : (isDark ? 'rgba(245,245,240,0.08)' : 'rgba(15,15,13,0.06)');
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = isHovered ? 2 : 1.5;
      ctx.stroke();

      // Label
      ctx.font = (isHovered ? '500 ' : '') + '11px DM Sans, system-ui, sans-serif';
      ctx.fillStyle = isDark
        ? (isHovered ? '#f5f5f0' : 'rgba(245,245,240,0.5)')
        : (isHovered ? '#0f0f0d' : 'rgba(15,15,13,0.45)');
      ctx.textAlign = nx < W / 2 ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      const labelOffset = r + 7;
      ctx.fillText(node.label, nx < W / 2 ? nx - labelOffset : nx + labelOffset, ny);
    });
  }

  // Hover detection
  canvas.addEventListener('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    let found = null;
    skillNodes.forEach(node => {
      const dx = node.x * W - mx;
      const dy = node.y * H - my;
      if (Math.sqrt(dx * dx + dy * dy) < node.size + 8) found = node;
    });

    if (found !== hoveredNode) {
      hoveredNode = found;
      if (centerLabel) {
        centerLabel.textContent = found ? found.label : 'hover a skill';
        centerLabel.style.color = found ? 'var(--color-text-primary)' : 'var(--color-text-muted)';
      }
      canvas.style.cursor = found ? 'pointer' : 'default';
      draw();
    }
  });

  canvas.addEventListener('mouseleave', function () {
    hoveredNode = null;
    if (centerLabel) { centerLabel.textContent = 'hover a skill'; centerLabel.style.color = ''; }
    canvas.style.cursor = 'default';
    draw();
  });

  // Redraw on theme change
  const themeObserver = new MutationObserver(draw);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // Initial draw after fonts
  if (document.fonts) {
    document.fonts.ready.then(draw);
  } else {
    setTimeout(draw, 200);
  }
});
