const CACHE_NAME = 'luminary-v7-canonical';
const OFFLINE_URL = '/offline.html';

// Core assets to pre-cache
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/404.html',
  '/403.html',
  '/frontend/about.html',
  '/frontend/ecosystem.html',
  '/frontend/organs.html',
  '/frontend/projects.html',
  '/frontend/agroscan.html',
  '/frontend/research.html',
  '/frontend/technology.html',
  '/frontend/news.html',
  '/frontend/trust.html',
  '/frontend/leadership.html',
  '/frontend/collab.html',
  '/frontend/contact.html',
  '/frontend/faq.html',
  '/frontend/privacy-policy.html',
  '/frontend/terms.html',
  '/frontend/glossary.html',
  '/assets/css/main.css',
  '/assets/css/animations.css',
  '/assets/css/responsive.css',
  '/assets/js/main.js',
  '/assets/js/news-engine.js',
  '/assets/js/pwa.js',
  '/configuration/config.js',
  '/assets/images/logo-luminarytechnicals.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS.map((asset) => cache.add(asset).catch((err) => console.warn(`Cache skip: ${asset}`, err)))
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

  // All other assets (CSS, JS, Images) -> Cache First, fallback to network
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then(netRes => {
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, netRes.clone()));
        return netRes;
      });
    })
  );
});

// Background Sync Event Listener
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-news') {
    event.waitUntil(
      // In a real app, you would process a queue of offline actions here (like form submissions)
      console.log('Background Sync: Syncing latest news data...')
    );
  }
});
