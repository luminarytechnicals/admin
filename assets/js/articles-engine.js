/* articles-engine.js — JSON-driven discovery for the Articles hub.
   Article permalinks are separately rendered as static HTML with their own metadata. */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;

  const search = document.getElementById('articles-search');
  const status = document.getElementById('articles-status');
  const filters = Array.from(document.querySelectorAll('#articles-category-filters [data-category]'));
  let articles = [];
  let lastUpdated = '';
  let category = 'all';
  let query = '';

  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  const articleURL = slug => '/frontend/articles/' + encodeURIComponent(String(slug || '').trim());
  const formatDate = value => {
    if (!value) return 'Date not supplied';
    const date = new Date(value + 'T00:00:00Z');
    return Number.isNaN(date.getTime()) ? escapeHTML(value) :
      date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  };

  function render() {
    const found = articles.filter(item => {
      const categoryMatch = category === 'all' ||
        String(item.category || '').toLowerCase() === category.toLowerCase();
      const searchable = [
        item.title, item.description, item.excerpt, item.category, item.author,
        ...(Array.isArray(item.tags) ? item.tags : [])
      ].join(' ').toLowerCase();
      return categoryMatch && (!query || searchable.includes(query));
    });

    if (!found.length) {
      grid.innerHTML = '<div class="glass-card article-empty-state"><h2>No matching articles</h2><p>Try a different keyword or category.</p></div>';
      if (status) status.textContent = 'No articles match the current filters.';
      return;
    }

    grid.innerHTML = found.map(item => {
      const tags = Array.isArray(item.tags) ? item.tags.slice(0, 4).map(tag =>
        '<span>' + escapeHTML(tag) + '</span>'
      ).join('') : '';

      return '<article class="glass-card article-card">' +
        '<div class="article-card-top">' +
          '<span class="article-card-category">' + escapeHTML(item.category || 'Article') + '</span>' +
          '<time class="article-card-date" datetime="' + escapeHTML(item.datePublished || '') + '">' +
            formatDate(item.datePublished) +
          '</time>' +
        '</div>' +
        '<h2>' + escapeHTML(item.title || 'Untitled article') + '</h2>' +
        '<p class="article-card-excerpt">' + escapeHTML(item.excerpt || item.description || '') + '</p>' +
        (tags ? '<div class="article-card-tags" aria-label="Article topics">' + tags + '</div>' : '') +
        '<div class="article-card-actions"><a class="btn btn-primary btn-sm" href="' + articleURL(item.slug) +
          '">Read article <span aria-hidden="true">→</span></a></div>' +
        '</article>';
    }).join('');

    if (status) {
      status.textContent = found.length + ' article' + (found.length === 1 ? '' : 's') +
        (lastUpdated ? ' · Updated ' + formatDate(lastUpdated) : '');
    }
  }

  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(other => {
      other.classList.remove('active');
      other.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    category = button.dataset.category || 'all';
    render();
  }));

  if (search) search.addEventListener('input', () => {
    query = search.value.trim().toLowerCase();
    render();
  });

  fetch('/configuration/articles.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('Article registry HTTP ' + response.status);
      return response.json();
    })
    .then(data => {
      const source = Array.isArray(data) ? data : data.articles || [];
      lastUpdated = Array.isArray(data) ? '' : data.lastUpdated || '';
      articles = source
        .filter(item => item && item.slug && item.title)
        .sort((a, b) => String(b.datePublished || '').localeCompare(String(a.datePublished || '')));
      render();
    })
    .catch(error => {
      console.error('Unable to load Articles registry:', error);
      if (status) status.textContent = 'The article registry could not be loaded.';
      grid.innerHTML = '<div class="glass-card article-empty-state"><h2>Articles are temporarily unavailable</h2><p>Please refresh the page shortly.</p></div>';
    });
});
