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
  
  // Active link resolution
  const path = window.location.pathname.toLowerCase();
  let filename = path.split('/').pop() || 'index.html';
  if (filename === '' || filename === '/') filename = 'index.html';
  
  document.querySelectorAll('.nav-links a, .mobile-menu a[data-nav]').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const linkFile = href.split('/').pop();
    if (linkFile === filename) {
      a.classList.add('active');
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
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
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
  const group = btn.closest('.tab-section');
  if (!group) return;
  group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const target = btn.dataset.tab;
  group.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('active', c.id === 'tab-' + target);
  });
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

  let width = canvas.width = canvas.parentElement.clientWidth || 600;
  let height = canvas.height = canvas.parentElement.clientHeight || 280;

  const particles = [];
  const count = 45;
  const colors = ['#f5c518', '#7c3aed', '#00d4ff', '#a855f7', '#38bdf8'];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  let animFrame;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${1 - dist / 80 * 0.8})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
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

  window.addEventListener('resize', () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth || 600;
    height = canvas.height = canvas.parentElement.clientHeight || 280;
  });
}

