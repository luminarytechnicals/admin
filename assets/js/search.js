/* search.js — High-Performance Intelligent Global Search Engine */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.search-overlay');
  const input = document.querySelector('.search-input');
  const resultsContainer = document.querySelector('.search-results');
  const openBtns = document.querySelectorAll('.nav-search-btn');
  const closeBtn = document.querySelector('.search-close');
  if (!overlay || !input) return;

  let searchData = [];
  let focusedIndex = -1;
  let activeFilter = 'ALL';

  const isFrontend = window.location.pathname.includes('/frontend/');
  const indexPath = isFrontend ? '../configuration/search-index.json' : 'configuration/search-index.json';

  // Load search index
  fetch(indexPath)
    .then(r => r.json())
    .then(d => {
      searchData = d;
      // Check for ?q= in URL
      const urlParams = new URLSearchParams(window.location.search);
      const initialQ = urlParams.get('q');
      if (initialQ) {
        input.value = initialQ;
        openSearch();
        runSearch();
      }
    })
    .catch(err => console.error('Search Index failed to load:', err));

  // Category filter chips UI injection
  const filterChipsContainer = document.createElement('div');
  filterChipsContainer.className = 'search-filter-chips';
  filterChipsContainer.style.cssText = 'display:flex;gap:8px;margin-top:14px;margin-bottom:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;';
  
  const categories = [
    { label: 'All', value: 'ALL' },
    { label: 'Organs', value: 'ORGAN' },
    { label: 'Projects', value: 'PROJECT' },
    { label: 'Research', value: 'RESEARCH' },
    { label: 'Docs', value: 'DOCUMENTATION' },
    { label: 'Legal', value: 'LEGAL' }
  ];

  categories.forEach(cat => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `search-chip ${cat.value === 'ALL' ? 'active' : ''}`;
    chip.textContent = cat.label;
    chip.dataset.filter = cat.value;
    chip.style.cssText = `
      background: ${cat.value === 'ALL' ? 'var(--accent)' : 'rgba(255,255,255,0.06)'};
      color: ${cat.value === 'ALL' ? '#0A0F1E' : 'var(--slate)'};
      border: 1px solid ${cat.value === 'ALL' ? 'var(--accent)' : 'var(--border)'};
      padding: 5px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    `;
    chip.addEventListener('click', () => {
      activeFilter = cat.value;
      filterChipsContainer.querySelectorAll('.search-chip').forEach(c => {
        const isCurrent = c.dataset.filter === activeFilter;
        c.style.background = isCurrent ? 'var(--accent)' : 'rgba(255,255,255,0.06)';
        c.style.color = isCurrent ? '#0A0F1E' : 'var(--slate)';
        c.style.borderColor = isCurrent ? 'var(--accent)' : 'var(--border)';
      });
      runSearch();
    });
    filterChipsContainer.appendChild(chip);
  });

  const searchInputWrap = document.querySelector('.search-input-wrap');
  if (searchInputWrap && searchInputWrap.parentNode) {
    searchInputWrap.parentNode.insertBefore(filterChipsContainer, resultsContainer);
  }

  // Open / Close Handlers
  const openSearch = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      input.focus();
      if (!input.value.trim()) renderPopularSuggestions();
    }, 100);
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

  // Global Keyboard Shortcuts: Ctrl+K, Cmd+K, and '/'
  document.addEventListener('keydown', (e) => {
    const isSearchShortcut = (e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey);
    const isSlashShortcut = e.key === '/' && !overlay.classList.contains('open') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName);

    if (isSearchShortcut || isSlashShortcut) {
      e.preventDefault();
      if (overlay.classList.contains('open')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeSearch();
    }
  });

  // Tokenized Search Algorithm with Multi-Word Relevance Scoring
  function runSearch() {
    const rawQuery = input.value.trim();
    focusedIndex = -1;

    if (!rawQuery) {
      renderPopularSuggestions();
      return;
    }

    const q = rawQuery.toLowerCase();
    const tokens = q.split(/\s+/).filter(t => t.length > 0);

    let candidates = searchData;
    if (activeFilter !== 'ALL') {
      candidates = candidates.filter(item => item.category === activeFilter);
    }

    const scored = candidates.map(item => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const keywordsLower = (item.keywords || '').toLowerCase();
      const textLower = (item.text || '').toLowerCase();
      const categoryLower = (item.category || '').toLowerCase();

      // Exact phrase matches
      if (titleLower === q) score += 150;
      else if (titleLower.startsWith(q)) score += 80;
      else if (titleLower.includes(q)) score += 40;

      if (keywordsLower.includes(q)) score += 35;
      if (textLower.includes(q)) score += 15;

      // Token-level scoring for multi-word searches
      let matchedTokensCount = 0;
      tokens.forEach(tok => {
        let tokMatched = false;
        if (titleLower.includes(tok)) { score += 25; tokMatched = true; }
        if (keywordsLower.includes(tok)) { score += 15; tokMatched = true; }
        if (textLower.includes(tok)) { score += 8; tokMatched = true; }
        if (categoryLower.includes(tok)) { score += 10; tokMatched = true; }
        if (tokMatched) matchedTokensCount++;
      });

      // Bonus if all words are present
      if (matchedTokensCount === tokens.length && tokens.length > 1) {
        score += 30;
      }

      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

    renderResults(scored, tokens, rawQuery);
  }

  input.addEventListener('input', runSearch);

  // Keyboard navigation through results
  input.addEventListener('keydown', (e) => {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusedIndex = (focusedIndex + 1) % items.length;
      updateFocus(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusedIndex = (focusedIndex - 1 + items.length) % items.length;
      updateFocus(items);
    } else if (e.key === 'Enter') {
      if (focusedIndex >= 0 && items[focusedIndex]) {
        e.preventDefault();
        items[focusedIndex].click();
      } else if (items.length > 0) {
        e.preventDefault();
        items[0].click();
      }
    }
  });

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function resolveUrl(rawUrl) {
    let url = rawUrl;
    if (isFrontend) {
      if (url === 'index.html') url = '../index.html';
      else if (url.startsWith('frontend/')) url = url.replace('frontend/', '');
    }
    return url;
  }

  function renderPopularSuggestions() {
    const quickLinks = [
      { title: "Luminary Servers", badge: "Core Organ", url: "frontend/servers.html", text: "Cloud infrastructure, VPS, bare-metal servers & DNS." },
      { title: "Luminary Developers", badge: "Core Organ", url: "frontend/developers.html", text: "Software engineering, AI systems & Luminary Afterverse." },
      { title: "AgroScan Platform", badge: "Flagship AI", url: "frontend/agroscan.html", text: "AI precision crop diagnosis & smart IoT sensors." },
      { title: "Luminary Trust", badge: "Associated Entity", url: "frontend/trust.html", text: "Public welfare missions & Radhika Research Foundation." },
      { title: "Technology Hub", badge: "Architecture", url: "frontend/technology.html", text: "Deep architectural overview & engineering stack." }
    ];

    resultsContainer.innerHTML = `
      <div style="padding:8px 0 12px;font-size:0.75rem;font-weight:700;color:var(--slate);text-transform:uppercase;letter-spacing:1px;">Quick Jump / Suggested</div>
      ${quickLinks.map(r => `
        <a href="${resolveUrl(r.url)}" class="search-result-item" role="option">
          <div class="sr-header">
            <span class="sr-category">${r.badge}</span>
            <div class="sr-title">${r.title}</div>
          </div>
          <div class="sr-excerpt">${r.text}</div>
        </a>
      `).join('')}
    `;
  }

  function renderResults(results, tokens, rawQuery) {
    if (!results.length) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>No matches found for "<strong>${rawQuery}</strong>"</p>
          <span style="font-size:0.8rem;color:var(--slate);">Try searching by keyword like <em>servers, AI, agro, trust, organs, or founder</em></span>
        </div>
      `;
      return;
    }

    const regexPattern = tokens.map(t => escapeRegExp(t)).join('|');
    const regex = regexPattern ? new RegExp(`(${regexPattern})`, 'gi') : null;

    resultsContainer.innerHTML = results.map(r => {
      const url = resolveUrl(r.url);
      const highlightedTitle = regex ? r.title.replace(regex, '<mark>$1</mark>') : r.title;
      const categoryBadge = r.badge || r.category || 'Page';
      const excerpt = r.text ? highlightExcerpt(r.text, tokens, regex) : r.url;

      return `
        <a href="${url}" class="search-result-item" role="option">
          <div class="sr-header">
            <span class="sr-category">${categoryBadge}</span>
            <div class="sr-title">${highlightedTitle}</div>
          </div>
          <div class="sr-excerpt">${excerpt}</div>
        </a>
      `;
    }).join('');
  }

  function highlightExcerpt(text, tokens, regex) {
    if (!regex || !tokens.length) return text.substring(0, 100) + '...';

    let firstIndex = -1;
    for (const tok of tokens) {
      const idx = text.toLowerCase().indexOf(tok.toLowerCase());
      if (idx !== -1 && (firstIndex === -1 || idx < firstIndex)) {
        firstIndex = idx;
      }
    }

    if (firstIndex === -1) return text.substring(0, 90) + '...';

    const start = Math.max(0, firstIndex - 35);
    const end = Math.min(text.length, firstIndex + 85);
    let excerpt = text.substring(start, end);

    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt = excerpt + '...';

    return excerpt.replace(regex, '<mark>$1</mark>');
  }

  function updateFocus(items) {
    items.forEach((it, i) => {
      it.classList.toggle('focused', i === focusedIndex);
      it.setAttribute('aria-selected', i === focusedIndex ? 'true' : 'false');
    });
    if (focusedIndex >= 0 && items[focusedIndex]) {
      items[focusedIndex].scrollIntoView({ block: 'nearest' });
    }
  }
});
