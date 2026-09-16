/**
 * news-engine.js — Dynamic News & Announcements Engine
 * Official platform operated under Luminary Federals
 * Canonical Organizational Structure V2
 */
document.addEventListener('DOMContentLoaded', () => {
  const newsGrid = document.getElementById('news-articles-grid');
  if (!newsGrid) return;

  const filterBtns = document.querySelectorAll('.news-filter-btn');
  const searchInput = document.getElementById('news-search-input');
  
  let newsItems = [];
  let currentCategory = 'all';
  let searchQuery = '';

  // Show a loading state
  newsGrid.innerHTML = `
    <div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 48px 24px;">
      <div class="loader" style="margin: 0 auto 20px;"></div>
      <p style="color: var(--slate);">Fetching real-time updates...</p>
    </div>
  `;

  // Fetch Real-Time News (TechCrunch RSS via rss2json for demonstration)
  // In production, replace with your dedicated API endpoint
  const RSS_URL = 'https://techcrunch.com/feed/';
  const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        newsItems = data.items.map(item => ({
          title: item.title,
          summary: item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...', // Strip HTML and truncate
          publishedDate: item.pubDate,
          link: item.link,
          category: item.categories.length > 0 ? item.categories[0] : 'Technology',
          relatedOrgan: 'External Wire'
        }));
        renderNews();
      } else {
        throw new Error('Failed to fetch news feed.');
      }
    })
    .catch(error => {
      console.error(error);
      // Fallback to internal config news if real-time fetch fails
      newsItems = window.NEWS || (window.CONFIG && window.CONFIG.news) || [];
      renderNews();
    });

  function renderNews() {
    let filtered = newsItems.filter(item => {
      const matchCat = (currentCategory === 'all') || (item.category && item.category.toLowerCase().includes(currentCategory.toLowerCase()));
      const matchQuery = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery) ||
        (item.summary && item.summary.toLowerCase().includes(searchQuery));
      return matchCat && matchQuery;
    });

    if (filtered.length === 0) {
      newsGrid.innerHTML = `
        <div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 48px 24px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">📰</div>
          <h3>No articles found</h3>
          <p style="color: var(--slate); margin-top: 8px;">Try selecting another category or clearing your search term.</p>
        </div>
      `;
      return;
    }

    newsGrid.innerHTML = filtered.map(item => {
      const published = new Date(item.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
      });
      return `
        <article class="glass-card news-card">
          <div class="news-card-meta">
            <span class="badge" style="font-size: 0.7rem; padding: 3px 10px; text-transform: capitalize;">${item.category || 'Update'}</span>
            <span class="news-date" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--slate);">${published}</span>
          </div>
          <h3 class="news-title" style="margin: 14px 0 8px; font-size: 1.2rem; line-height: 1.35;">${item.title}</h3>
          <p class="news-summary" style="font-size: 0.9rem; color: var(--slate); line-height: 1.6; margin-bottom: 16px;">${item.summary}</p>
          <div class="news-card-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 14px; margin-top: auto;">
            <span class="organ-tag" style="font-size: 0.75rem; color: var(--accent); font-family: var(--font-mono);">🌍 ${item.relatedOrgan || 'Luminary News'}</span>
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="padding: 6px 14px; font-size: 0.8rem;">Read External Article ↗</a>
          </div>
        </article>
      `;
    }).join('');
  }

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
