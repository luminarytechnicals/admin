/* main.js — Luminary Technicals Core Engine */
document.addEventListener('DOMContentLoaded', () => {
  // Preloader (minimum 0.5 second display)
  const startTime = Date.now();
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 500 - elapsed);
      setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => preloader.style.display = 'none', 600);
      }, delay);
    }
  });

  initThemeToggle();
  initJsonNavigation();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();

  initCookieConsent();
  initModals();
  initFAQAccordion();
  initCountUp();
  injectFooterYear();
  injectAds();
  injectAnalytics();
  initAfterverseCanvas();
});

/* ── NAVBAR ── */
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  
  markActiveNavigation();
}

/* ── JSON-DRIVEN GLOBAL NAVIGATION ── */
async function initJsonNavigation() {
  const isFrontend = window.location.pathname.startsWith('/frontend/');
  const source = isFrontend ? '../configuration/navigation.json' : 'configuration/navigation.json';
  try {
    const response = await fetch(source, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Navigation JSON returned HTTP ' + response.status);
    const config = await response.json();

    const makeLink = (item) => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      a.dataset.nav = '';
      if (item.external || /^https?:\/\//i.test(item.href)) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      if (item.description) a.title = item.description;
      return a;
    };

    const desktopNav = document.querySelector('.nav-links');
    if (desktopNav && Array.isArray(config.header)) {
      desktopNav.replaceChildren(...config.header.map(item => {
        const li = document.createElement('li');
        li.appendChild(makeLink(item));
        return li;
      }));
    }

    const sidePanel = document.querySelector('.mobile-menu');
    if (sidePanel && Array.isArray(config.sections)) {
      const closeButton = sidePanel.querySelector('.close-btn');
      sidePanel.replaceChildren();
      if (closeButton) sidePanel.appendChild(closeButton);

      config.sections.forEach((section, index) => {
        const details = document.createElement('details');
        details.className = 'nav-accordion';
        details.dataset.section = section.title || String(index);
        // Intentionally do not group <details> by name; sections are independent.

        const summary = document.createElement('summary');
        summary.className = 'nav-accordion-title';
        const icon = document.createElement('span');
        icon.className = 'nav-accordion-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = section.icon || '›';
        const title = document.createElement('span');
        title.className = 'nav-accordion-label';
        title.textContent = section.title || 'Explore';
        summary.append(icon, title);
        details.appendChild(summary);

        const links = document.createElement('div');
        links.className = 'nav-subitems';
        (Array.isArray(section.items) ? section.items : []).forEach(item => {
          const link = makeLink(item);
          if (!item.external && !/^https?:\/\//i.test(item.href)) link.dataset.nav = '';
          links.appendChild(link);
        });
        details.appendChild(links);
        sidePanel.appendChild(details);
      });

      // Store every open section so opening another section never collapses this one, even after navigation.
      const storageKey = 'lt_navigation_open_sections';
      let savedSections = [];
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
        if (Array.isArray(saved)) savedSections = saved;
      } catch (_) {}
      sidePanel.querySelectorAll('.nav-accordion').forEach(section => {
        if (savedSections.includes(section.dataset.section)) section.open = true;
        section.addEventListener('toggle', () => {
          const opened = Array.from(sidePanel.querySelectorAll('.nav-accordion[open]')).map(item => item.dataset.section);
          try { localStorage.setItem(storageKey, JSON.stringify(opened)); } catch (_) {}
        });
      });
    }

    // Keep remaining static footer/body links consistent with the JSON-driven Updates route.
    document.querySelectorAll('a[href]').forEach(anchor => {
      const href = anchor.getAttribute('href') || '';
      try {
        const parsed = new URL(href, window.location.href);
        const pathname = parsed.pathname.toLowerCase();
        if (parsed.origin === window.location.origin && pathname.endsWith('/news.html')) {
          const updatedPath = parsed.pathname.slice(0, -'news.html'.length) + 'updates.html';
          anchor.setAttribute('href', updatedPath + parsed.search + parsed.hash);
          if (anchor.textContent.trim().toLowerCase() === 'news') anchor.textContent = 'Updates';
        }
      } catch (_) {}
    });

    markActiveNavigation();
  } catch (error) {
    console.warn('JSON navigation could not be loaded; using the built-in navigation.', error);
  }
}

function markActiveNavigation() {
  const normalize = (pathname) => {
    const clean = decodeURI(pathname || '/').replace(/\/+$/, '');
    return clean === '' || clean === '/' ? '/index.html' : clean.toLowerCase();
  };
  const currentPath = normalize(window.location.pathname);
  document.querySelectorAll('.nav-links a, .mobile-menu a[data-nav]').forEach(anchor => {
    let isActive = false;
    try {
      const target = new URL(anchor.getAttribute('href') || '', window.location.origin);
      isActive = target.origin === window.location.origin && normalize(target.pathname) === currentPath;
    } catch (_) {}
    anchor.classList.toggle('active', isActive);
    if (isActive) {
      anchor.setAttribute('aria-current', 'page');
      const group = anchor.closest('.nav-accordion');
      if (group) group.open = true;
    } else {
      anchor.removeAttribute('aria-current');
    }
  });
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const btn = document.querySelector('.nav-hamburger');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');
  if (!btn || !menu) return;
  const toggle = (open) => {
    menu.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', () => toggle(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
  if (overlay) overlay.addEventListener('click', () => toggle(false));
  // Delegation also covers links injected later from navigation.json.
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) toggle(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      toggle(false);
    }
  });

  // Swipe to close on touch devices
  let touchStartX = 0;
  let touchEndX = 0;
  menu.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  menu.addEventListener('touchmove', e => {
    touchEndX = e.changedTouches[0].screenX;
  }, { passive: true });
  menu.addEventListener('touchend', () => {
    if (touchEndX - touchStartX > 50) {
      toggle(false);
    }
  });
}

/* ── SCROLL ANIMATIONS ── */
function initScrollAnimations() {
  const els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}


/* ── COOKIE CONSENT ── */
function initCookieConsent() {
  const banner = document.querySelector('.cookie-banner');
  if (!banner) return;
  if (localStorage.getItem('lt_cookie_consent') === 'accepted') return;
  setTimeout(() => banner.classList.add('show'), 1500);
  banner.querySelector('.cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem('lt_cookie_consent', 'accepted');
    banner.classList.remove('show');
  });
  banner.querySelector('.cookie-learn')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('privacy');
  });
  // Re-trigger from footer
  document.querySelector('.cookie-retrigger')?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('lt_cookie_consent');
    banner.classList.add('show');
  });
}

/* ── MODALS (Privacy / Terms) ── */
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(trigger.dataset.modal);
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

function openModal(id) {
  const modal = document.getElementById('modal-' + id);
  if (modal) { modal.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

/* ── FAQ ACCORDION ── */
function initFAQAccordion() {
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('active');
      // Close siblings
      item.parentElement.querySelectorAll('.faq-item.active').forEach(sib => {
        if (sib !== item) {
          sib.classList.remove('active');
          sib.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });
      item.classList.toggle('active', !isOpen);
      answer.style.maxHeight = isOpen ? '0' : answer.scrollHeight + 'px';
    });
  });
}

/* ── COUNT UP ── */
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

function animateCount(el) {
  const target = el.dataset.count;
  const suffix = el.dataset.suffix || '';
  const isNum = !isNaN(parseInt(target));
  if (!isNum) { el.textContent = target; return; }
  const num = parseInt(target);
  const duration = 1500;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * num) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ── FOOTER YEAR ── */
function injectFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── ADS ── */
function injectAds() {
  if (!window.CONFIG?.ads?.enabled) return;
  if (document.querySelector('.error-page') || document.querySelector('.offline-page')) return;
  if (CONFIG.ads.provider === 'google') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CONFIG.ads.clientId}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
}

/* ── ANALYTICS ── */
function injectAnalytics() {
  if (!window.CONFIG?.analytics?.enabled) return;
  if (CONFIG.analytics.googleAnalyticsId) {
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.analytics.googleAnalyticsId}`;
    document.head.appendChild(s);
    s.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', CONFIG.analytics.googleAnalyticsId);
    };
  }
  if (CONFIG.analytics.clarityId) {
    const c = document.createElement('script');
    c.textContent = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CONFIG.analytics.clarityId}");`;
    document.head.appendChild(c);
  }
}

/* ── TABS ── */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.tab-btn');
  if (!btn) return;
  // If tab button is custom filtered by specific scripts (like news-filter-btn), let specific script handle it
  if (btn.classList.contains('news-filter-btn')) return;
  
  const container = btn.closest('.tab-section') || btn.closest('.container') || btn.closest('section') || document;
  const target = btn.dataset.tab;
  if (!target) return;

  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const tabContents = container.querySelectorAll('.tab-content');
  if (target === 'all') {
    tabContents.forEach(c => c.classList.add('active'));
  } else {
    tabContents.forEach(c => {
      c.classList.toggle('active', c.id === 'tab-' + target);
    });
  }
});

/* ── THEME TOGGLE ── */
function initThemeToggle() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  
  const currentTheme = localStorage.getItem('lt_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  toggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lt_theme', theme);
    updateThemeIcon(theme);
  });
}

function updateThemeIcon(theme) {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;
  if (theme === 'light') {
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  } else {
    toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
  }
}

/* ── AFTERVERSE INTERACTIVE CANVAS ── */
function initAfterverseCanvas() {
  const canvas = document.getElementById('afterverse-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 600;
  let height = 280;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    width = rect.width || 600;
    height = rect.height || 280;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.scale(dpr, dpr);
  }

  resize();

  const particles = [];
  const count = window.innerWidth < 768 ? 35 : 55;
  const colors = ['#f5c518', '#7c3aed', '#00d4ff', '#a855f7', '#38bdf8'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  let mouse = { x: -1000, y: -1000, radius: 90 };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  let animFrame;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw particle connections
    const maxDist = window.innerWidth < 768 ? 65 : 85;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${1 - dist / maxDist * 0.8})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      // Mouse interaction
      const mdx = mouse.x - p.x;
      const mdy = mouse.y - p.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < mouse.radius && mdist > 0) {
        const force = (mouse.radius - mdist) / mouse.radius;
        p.x -= (mdx / mdist) * force * 2;
        p.y -= (mdy / mdist) * force * 2;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    animFrame = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', resize, { passive: true });
}


