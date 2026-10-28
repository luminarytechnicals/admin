const CACHE_NAME = 'luminary-v14-menu-fixes';
const OFFLINE_URL = '/offline.html';

// Core assets to pre-cache for complete offline availability
const ASSETS = [
  '/',
  '/offline.html',
  '/404.html',
  '/403.html',
  '/frontend/about.html',
  '/frontend/organization.html',
  '/frontend/common.html',
  '/frontend/jset.html',
  '/frontend/leadership.html',
  '/frontend/owner.html',
  '/frontend/ecosystem.html',
  '/frontend/organs.html',
  '/frontend/servers.html',
  '/frontend/developers.html',
  '/frontend/cares.html',
  '/frontend/kits.html',
  '/frontend/federals.html',
  '/frontend/trust.html',
  '/frontend/projects.html',
  '/frontend/agroscan.html',
  '/frontend/afterverse.html',
  '/frontend/news.html',
  '/frontend/updates.html',
  '/frontend/research.html',
  '/frontend/technology.html',
  '/frontend/resources.html',
  '/frontend/collab.html',
  '/frontend/contact.html',
  '/frontend/faq.html',
  '/frontend/glossary.html',
  '/frontend/privacy-policy.html',
  '/frontend/terms.html',
  '/frontend/security.html',
  '/frontend/accessibility.html',
  '/frontend/cookies.html',
  '/frontend/disclaimer.html',
  '/frontend/editorial-policy.html',
  '/frontend/offices.html',
  '/assets/css/main.css',
  '/assets/css/animations.css',
  '/assets/css/responsive.css',
  '/assets/js/main.js',
  '/assets/js/search.js',
  '/assets/js/news-engine.js',
  '/assets/js/updates-engine.js',
  '/assets/js/automation.js',
  '/assets/js/lazy-load.js',
  '/assets/js/pwa.js',
  '/assets/js/contact.js',
  '/configuration/config.js',
  '/configuration/google-maps-details.js',
  '/assets/js/google-maps-navigator.js',
  '/configuration/search-index.json',
  '/configuration/navigation.json',
  '/configuration/updates.json',
  '/assets/images/logo-luminarytechnicals.png',
  '/assets/images/logo-luminarytechnicals.webp',
  '/assets/images/og-default.webp',
  '/assets/images/instagram.webp',
  '/assets/images/telegram.webp',
  '/assets/images/github.svg',
  '/icons/icon-96.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-192-maskable.png',
  '/icons/icon-512-maskable.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map((asset) =>
          fetch(new Request(asset, { cache: 'no-cache' }))
            .then((res) => (res.ok && !res.redirected ? cache.put(asset, res) : null))
            .catch((err) => console.warn(`Cache skip: ${asset}`, err))
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Stale-While-Revalidate Strategy with Offline Fallback
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // For API/News fetches, use Network First, falling back to cache
  if (event.request.url.includes('api.rss2json.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // HTML Navigation Requests -> Network First, fallback to cache, then offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request).then(res => res || caches.match(OFFLINE_URL));
      })
    );
    return;
  }

  // CSS / JS / JSON -> Stale-While-Revalidate (updates apply on next load, no manual version bump needed)
  // Images and everything else -> Cache First. Only successful responses are cached.
  const url = new URL(event.request.url);
  const isCode = url.origin === self.location.origin && /\.(css|js|json)$/.test(url.pathname);
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const netReq = isCode ? new Request(event.request, { cache: 'no-cache' }) : event.request;
      const network = fetch(netReq).then((netRes) => {
        if (netRes && netRes.ok && netRes.type !== 'opaque') {
          const copy = netRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return netRes;
      });
      if (isCode) return cached ? (network.catch(() => {}), cached) : network;
      return cached || network;
    })
  );
});
