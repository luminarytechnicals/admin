/**
 * news-engine.js — Official Luminary News Engine
 * Official platform operated under Luminary Federals
 * Canonical Organizational Structure V2
 */
document.addEventListener('DOMContentLoaded', () => {
  const newsGrid = document.getElementById('news-articles-grid');
  if (!newsGrid) return;

  const filterBtns = document.querySelectorAll('.news-filter-btn');
  const searchInput = document.getElementById('news-search-input');
  
  // Use official news items dataset directly as the single source of truth
  let newsItems = window.NEWS || (window.CONFIG && window.CONFIG.news) || [];
  let currentCategory = 'all';
  let searchQuery = '';

  function renderNews() {
    let filtered = newsItems.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category && item.category.toLowerCase().includes(currentCategory.toLowerCase()));
      const matchQuery = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery) ||
        (item.summary && item.summary.toLowerCase().includes(searchQuery)) ||
        (item.relatedOrgan && item.relatedOrgan.toLowerCase().includes(searchQuery));
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      newsGrid.innerHTML = `
        <div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 48px 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📰</div>
          <h3>No updates found</h3>
          <p style="color: var(--slate); margin-top: 8px;">Try selecting another category or clearing your search query.</p>
        </div>
      `;
      return;
    }

    newsGrid.innerHTML = filtered.map(item => {
      const dateDisplay = item.dateDisplay || new Date(item.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short'
      });
      const linkUrl = item.canonicalUrl || 'javascript:void(0)';
      return `
        <article class="glass-card news-card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div>
            <div class="news-card-meta" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <span class="badge" style="font-size: 0.72rem; padding: 3px 10px; text-transform: capitalize;">${item.category || 'Official Update'}</span>
              <span class="news-date" style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--accent); font-weight: 600;">${dateDisplay}</span>
            </div>
            <h3 class="news-title" style="margin: 10px 0 10px; font-size: 1.18rem; line-height: 1.4;">${item.title}</h3>
            <p class="news-summary" style="font-size: 0.92rem; color: var(--slate); line-height: 1.6; margin-bottom: 16px;">${item.summary}</p>
          </div>
          <div class="news-card-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 14px; margin-top: auto;">
            <span class="organ-tag" style="font-size: 0.75rem; color: var(--accent); font-family: var(--font-mono);">🏛️ ${item.relatedOrgan || 'Luminary Technicals'}</span>
            <a href="${linkUrl}" class="btn btn-outline btn-sm" style="padding: 6px 14px; font-size: 0.8rem;">Explore Details &rarr;</a>
          </div>
        </article>
      `;
    }).join('');
  }

  // Initial render with real news data
  renderNews();

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'all';
      renderNews();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      renderNews();
    });
  }
});
