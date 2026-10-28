/* articles-engine.js — JSON-driven discovery for the Articles hub.
   Each article also has its own static HTML permalink with server-delivered metadata and content. */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('articles-grid');
  if (!grid) return;
  const search = document.getElementById('articles-search');
  const status = document.getElementById('articles-status');
  const filters = Array.from(document.querySelectorAll('#articles-category-filters [data-category]'));
  let articles = [];
  let category = 'all';
  let query = '';

  const escapeHTML = value => String(value == null ? '' : value).replace(/[&<>"']/g, c => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  })[c]);
  const articleURL = slug => '/frontend/articles/' + encodeURIComponent(String(slug || '').trim()) ;
  const formatDate = value => {
    if (!value) return 'Date not supplied';
    const date = new Date(value + 'T00:00:00Z');
    return Number.isNaN(date.getTime()) ? escapeHTML(value) :
      date.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric', timeZone:'UTC'});
  };

  function render() {
    const found = articles.filter(item => {
      const categoryMatch = category === 'all' || String(item.category || '').toLowerCase() === category.toLowerCase();
      const text = [item.title, item.description, item.excerpt, item.category, item.author, ...(item.tags || [])].join(' ').toLowerCase();
      return categoryMatch && (!query || text.includes(query));
    });
    if (!found.length) {
      grid.innerHTML = '<div class="glass-card" style="grid-column:1/-1;text-align:center;padding:38px 20px;"><h2>No matching articles</h2><p style="color:var(--slate);margin-top:8px;">Try a different keyword or category.</p></div>';
      if (status) status.textContent = 'No articles match the current filters.';
      return;
    }
    grid.innerHTML = found.map(item => {
      const tags = Array.isArray(item.tags) ? item.tags.slice(0,4).map(tag =>
        '<span style="font-size:.72rem;color:var(--slate);border:1px solid var(--border);border-radius:20px;padding:4px 9px;">' + escapeHTML(tag) + '</span>'
      ).join('') : '';
      return '<article class="glass-card" style="display:flex;flex-direction:column;height:100%;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:14px;">' +
        '<span class="badge">' + escapeHTML(item.category || 'Article') + '</span>' +
        '<time datetime="' + escapeHTML(item.datePublished || '') + '" style="font-size:.8rem;color:var(--accent);">' + formatDate(item.datePublished) + '</time></div>' +
        '<h2 style="font-size:1.24rem;line-height:1.45;margin:0 0 12px;">' + escapeHTML(item.title || 'Untitled article') + '</h2>' +
        '<p style="color:var(--slate);line-height:1.75;margin-bottom:18px;">' + escapeHTML(item.excerpt || item.description || '') + '</p>' +
        (tags ? '<div style="display:flex;gap:6px;flex-wrap:wrap;margin:0 0 18px;">' + tags + '</div>' : '') +
        '<div style="margin-top:auto;border-top:1px solid var(--border);padding-top:16px;"><a class="btn btn-primary btn-sm" href="' + articleURL(item.slug) + '">Read Article →</a></div></article>';
    }).join('');
    if (status) status.textContent = found.length + ' article' + (found.length === 1 ? '' : 's') + ' · Updated ' + formatDate('2026-10-28');
  }

  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(other => other.classList.remove('active'));
    button.classList.add('active');
    category = button.dataset.category || 'all';
    render();
  }));
  if (search) search.addEventListener('input', () => { query = search.value.trim().toLowerCase(); render(); });

  fetch('/configuration/articles.json', {cache:'no-cache'})
    .then(response => { if (!response.ok) throw new Error('Article registry HTTP ' + response.status); return response.json(); })
    .then(data => {
      articles = (Array.isArray(data) ? data : data.articles || [])
        .filter(item => item && item.slug && item.title)
        .sort((a,b) => String(b.datePublished || '').localeCompare(String(a.datePublished || '')));
      render();
    })
    .catch(error => {
      console.error('Unable to load Articles registry:', error);
      if (status) status.textContent = 'The article registry could not be loaded.';
      grid.innerHTML = '<div class="glass-card" style="grid-column:1/-1;text-align:center;padding:38px 20px;"><h2>Articles are temporarily unavailable</h2><p style="color:var(--slate);margin-top:8px;">Please refresh the page shortly.</p></div>';
    });
});
