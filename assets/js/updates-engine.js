/* updates-engine.js — renders the Updates page from configuration/updates.json */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('updates-articles-grid');
  if (!grid) return;

  const filterButtons = Array.from(document.querySelectorAll('.news-filter-btn'));
  const searchInput = document.getElementById('updates-search-input');
  const status = document.getElementById('updates-last-updated');
  let updates = [];
  let activeCategory = 'all';
  let query = '';

  grid.setAttribute('aria-live', 'polite');

  const escapeHTML = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const safeURL = (value) => {
    try {
      const url = new URL(value || '/frontend/updates.html', window.location.origin);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '/frontend/updates.html';
    } catch (_) {
      return '/frontend/updates.html';
    }
  };

  const formatDate = (value) => {
    if (!value) return 'Date not supplied';
    const date = new Date(value + (String(value).length === 10 ? 'T00:00:00Z' : ''));
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  };

  function render() {
    const filtered = updates.filter(item => {
      const categoryMatches = activeCategory === 'all' ||
        String(item.category || '').toLowerCase() === activeCategory.toLowerCase();
      const searchable = [
        item.title, item.summary, item.category, item.relatedOrgan,
        item.author, ...(Array.isArray(item.tags) ? item.tags : [])
      ].join(' ').toLowerCase();
      return categoryMatches && (!query || searchable.includes(query));
    });

    if (!filtered.length) {
      grid.innerHTML = '<div class="glass-card" style="grid-column:1/-1;text-align:center;padding:42px 22px;"><div style="font-size:2.2rem;margin-bottom:12px;">◷</div><h3>No matching updates</h3><p style="color:var(--slate);margin-top:8px;">Try another category or clear the search.</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const title = escapeHTML(item.title || 'Untitled update');
      const category = escapeHTML(item.category || 'Update');
      const date = escapeHTML(formatDate(item.date || item.publishedDate));
      const summary = escapeHTML(item.summary || '');
      const related = escapeHTML(item.relatedOrgan || item.author || 'Luminary Technicals');
      const url = escapeHTML(safeURL(item.url || item.canonicalUrl));
      const tags = Array.isArray(item.tags) ? item.tags.slice(0, 4).map(tag =>
        '<span style="font-size:.7rem;color:var(--slate);border:1px solid var(--border);border-radius:20px;padding:3px 8px;">' + escapeHTML(tag) + '</span>'
      ).join(' ') : '';
      return '<article class="glass-card news-card" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">' +
        '<div><div class="news-card-meta" style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;">' +
        '<span class="badge" style="font-size:.72rem;padding:3px 10px;text-transform:capitalize;">' + category + '</span>' +
        '<time class="news-date" style="font-family:var(--font-mono);font-size:.8rem;color:var(--accent);font-weight:600;white-space:nowrap;">' + date + '</time></div>' +
        '<h3 class="news-title" style="margin:10px 0;font-size:1.18rem;line-height:1.4;">' + title + '</h3>' +
        '<p class="news-summary" style="font-size:.92rem;color:var(--slate);line-height:1.65;margin-bottom:16px;">' + summary + '</p>' +
        (tags ? '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;">' + tags + '</div>' : '') +
        '</div><div class="news-card-footer" style="display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid var(--border);padding-top:14px;margin-top:auto;">' +
        '<span class="organ-tag" style="font-size:.75rem;color:var(--accent);font-family:var(--font-mono);">◈ ' + related + '</span>' +
        '<a href="' + url + '" class="btn btn-outline btn-sm" style="padding:6px 14px;font-size:.8rem;">Details →</a></div></article>';
    }).join('');
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      activeCategory = button.dataset.category || 'all';
      render();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      query = searchInput.value.trim().toLowerCase();
      render();
    });
  }

  const isFrontend = window.location.pathname.startsWith('/frontend/');
  const dataPath = isFrontend ? '../configuration/updates.json' : 'configuration/updates.json';
  fetch(dataPath, { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('Updates JSON returned HTTP ' + response.status);
      return response.json();
    })
    .then(payload => {
      updates = (Array.isArray(payload) ? payload : payload.updates || [])
        .filter(item => item && typeof item === 'object')
        .sort((a, b) => String(b.date || b.publishedDate || '').localeCompare(String(a.date || a.publishedDate || '')));
      if (status) {
        const lastUpdated = payload.lastUpdated ? formatDate(payload.lastUpdated) : 'latest published version';
        status.textContent = 'Feed refreshed from the site updates registry · Last registry update: ' + lastUpdated;
      }
      render();
    })
    .catch(error => {
      console.error('Could not load configuration/updates.json:', error);
      if (status) status.textContent = 'The updates registry could not be loaded. Please refresh the page.';
      grid.innerHTML = '<div class="glass-card" style="grid-column:1/-1;text-align:center;padding:42px 22px;"><h3>Updates are temporarily unavailable</h3><p style="color:var(--slate);margin-top:8px;">The page could not read the published updates registry. Please try again shortly.</p></div>';
    });
});
