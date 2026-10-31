const CACHE_NAME = 'luminary-v22-query-aware-assets';
const OFFLINE_URL = '/offline';

// Core assets to pre-cache for complete offline availability
const ASSETS = [
  '/',
  '/offline',
  '/404',
  '/403',
  '/frontend/about',
  '/frontend/organization',
  '/frontend/common',
  '/frontend/jset',
  '/frontend/articles',
  '/frontend/articles/five-core-organs',
  '/frontend/articles/sub-companies-projects-platforms',
  '/frontend/articles/meaning-of-ar',
  '/frontend/articles/ar-writing-standard',
  '/frontend/articles/jset-james-social-engineering-toolkit',
  '/frontend/articles/set-social-engineering-toolkit',
  '/frontend/articles/naira-bill-national-artificial-intelligence-regulation-authority',
  '/frontend/articles/legal-management-coordination-accountability',
  '/frontend/leadership',
  '/frontend/owner',
  '/frontend/ecosystem',
  '/frontend/organs',
  '/frontend/servers',
  '/frontend/developers',
  '/frontend/cares',
  '/frontend/kits',
  '/frontend/federals',
  '/frontend/trust',
  '/frontend/projects',
  '/frontend/agroscan',
  '/frontend/afterverse',
  '/frontend/updates',
  '/frontend/research',
  '/frontend/technology',
  '/frontend/resources',
  '/frontend/collab',
  '/frontend/contact',
  '/frontend/faq',
  '/frontend/glossary',
  '/frontend/privacy-policy',
  '/frontend/terms',
  '/frontend/security',
  '/frontend/accessibility',
  '/frontend/cookies',
  '/frontend/disclaimer',
  '/frontend/editorial-policy',
  '/frontend/offices',
  '/assets/css/main.css',
  '/assets/css/animations.css',
  '/assets/css/responsive.css',
  '/assets/css/articles.css',
  '/assets/js/main.js',
  '/assets/js/search.js',
  '/assets/js/news-engine.js',
  '/assets/js/updates-engine.js',
  '/assets/js/articles-engine.js',
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
  '/configuration/articles.json',
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
  const isCode = url.origin === self.location.origin && /\.(css|js|json)$/i.test(url.pathname);
  // HTML links may request versioned assets (for example main.css?v=20261025),
  // while the install list stores the same resource without a query string.
  // Use one canonical cache key for same-origin code so those requests work offline.
  const cacheKey = isCode ? new Request(url.origin + url.pathname) : event.request;

  event.respondWith(
    caches.match(cacheKey).then((cached) => {
      const netReq = isCode ? new Request(event.request, { cache: 'no-cache' }) : event.request;
      const network = fetch(netReq).then((netRes) => {
        if (netRes && netRes.ok && netRes.type !== 'opaque') {
          return caches.open(CACHE_NAME)
            .then(cache => cache.put(cacheKey, netRes.clone()))
            .catch(() => {})
            .then(() => netRes);
        }
        return netRes;
      });
      if (isCode) return cached ? (network.catch(() => {}), cached) : network;
      return cached || network;
    })
  );
});
