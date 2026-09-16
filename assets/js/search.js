/* search.js — Advanced Global Search Engine */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.search-overlay');
  const input = document.querySelector('.search-input');
  const resultsContainer = document.querySelector('.search-results');
  const openBtns = document.querySelectorAll('.nav-search-btn');
  const closeBtn = document.querySelector('.search-close');
  if (!overlay || !input) return;

  let searchData = [];
  let focusedIndex = -1;

  // Load search index
  const isFrontend = window.location.pathname.includes('/frontend/');
  const indexPath = isFrontend ? '../configuration/search-index.json' : 'configuration/search-index.json';
  
  fetch(indexPath)
    .then(r => r.json())
    .then(d => {
      searchData = d;
      // Pre-process categories if possible
    })
    .catch(err => console.error('Search Index failed to load:', err));

  // Open / Close
  const openSearch = () => { 
    overlay.classList.add('open'); 
    setTimeout(() => input.focus(), 100);
    document.body.style.overflow = 'hidden'; 
  };
  const closeSearch = () => { 
    overlay.classList.remove('open'); 
    input.value = ''; 
    resultsContainer.innerHTML = ''; 
    focusedIndex = -1; 
    document.body.style.overflow = ''; 
  };

  openBtns.forEach(b => b.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeSearch();
    if (e.key === '/' && !overlay.classList.contains('open') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) { 
      e.preventDefault(); 
      openSearch(); 
    }
  });

  // Live search with improved matching
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    focusedIndex = -1;
    if (!q || q.length < 1) { resultsContainer.innerHTML = ''; return; }
    
    const results = searchData.map(item => {
      let score = 0;
      if (item.title.toLowerCase() === q) score += 100;
      else if (item.title.toLowerCase().startsWith(q)) score += 50;
      else if (item.title.toLowerCase().includes(q)) score += 20;
      
      if (item.keywords && item.keywords.toLowerCase().includes(q)) score += 30;
      if (item.text && item.text.toLowerCase().includes(q)) score += 10;
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
    
    renderResults(results, q);
  });

  // Keyboard navigation
  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); focusedIndex = (focusedIndex + 1) % items.length; updateFocus(items); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusedIndex = (focusedIndex - 1 + items.length) % items.length; updateFocus(items); }
    else if (e.key === 'Enter') {
      if (focusedIndex >= 0) { e.preventDefault(); items[focusedIndex].click(); }
      else if (items.length > 0) { e.preventDefault(); items[0].click(); }
    }
  });

  // Helper to safely escape regular expressions
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderResults(results, query) {
    if (!results.length) {
      resultsContainer.innerHTML = `<div class="search-no-results">No matches for "${query}"</div>`;
      return;
    }

    const safeQ = escapeRegExp(query);
    const regex = new RegExp(`(${safeQ})`, 'gi');

    resultsContainer.innerHTML = results.map(r => {
      let url = r.url;
      if (isFrontend) {
        if (url === 'index.html') url = '../index.html';
        else if (url.startsWith('frontend/')) url = url.replace('frontend/', '');
      }

      // Highlight match in title
      const highlightedTitle = r.title.replace(regex, '<mark>$1</mark>');
      
      // Use explicit canonical badge or category from search-index.json
      let categoryBadge = r.badge || r.category || 'Page';
      if (r.title === 'Luminary Trust') categoryBadge = 'ASSOCIATED ENTITY';
      if (r.title === 'Luminary News') categoryBadge = 'LUMINARY FEDERALS · INITIATIVE';

      return `
        <a href="${url}" class="search-result-item" role="option">
          <div class="sr-header">
            <span class="sr-category">${categoryBadge}</span>
            <div class="sr-title">${highlightedTitle}</div>
          </div>
          <div class="sr-excerpt">${r.text ? truncateWithMatch(r.text, query) : r.url}</div>
        </a>
      `;
    }).join('');
  }

  function truncateWithMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text.substring(0, 80) + '...';
    
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + 80);
    let excerpt = text.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt = excerpt + '...';
    
    const safeQ = escapeRegExp(query);
    return excerpt.replace(new RegExp(`(${safeQ})`, 'gi'), '<mark>$1</mark>');
  }

  function updateFocus(items) {
    items.forEach((it, i) => it.classList.toggle('focused', i === focusedIndex));
    if (focusedIndex >= 0) items[focusedIndex].scrollIntoView({ block: 'nearest' });
  }
});

