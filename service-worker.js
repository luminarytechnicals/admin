const CACHE_NAME = 'luminary-v4';
const OFFLINE_URL = '/offline.html';

const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/404.html',
  '/403.html',
  '/frontend/about.html',
  '/frontend/owner.html',
  '/frontend/organs.html',
  '/frontend/projects.html',
  '/frontend/collab.html',
  '/frontend/faq.html',
  '/frontend/privacy-policy.html',
  '/frontend/terms.html',
  '/assets/css/main.css',
  '/assets/css/animations.css',
  '/assets/css/responsive.css',
  '/assets/js/main.js',
  '/assets/js/search.js',
  '/assets/js/contact.js',
  '/assets/js/lazy-load.js',
  '/assets/js/pwa.js',
  '/configuration/config.js',
  '/configuration/search-index.json',
  '/assets/images/logo-luminarytechnicals.png',
  '/icons/icon-96.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
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

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
