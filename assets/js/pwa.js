/* pwa.js — Service Worker Registration (silent auto-update, no reload banner) */
if ('serviceWorker' in navigator && window.CONFIG?.pwa?.enabled !== false) {
  let refreshing = false;

  // When the new service worker takes control, reload once automatically.
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        // Proactively check for a new version on every load.
        reg.update().catch(() => {});
      })
      .catch(err => console.log('SW registration failed:', err));
  });
}
