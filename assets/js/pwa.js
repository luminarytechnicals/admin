/* pwa.js — Service Worker Registration (silent auto-update, no reload banner) */
if ('serviceWorker' in navigator && window.CONFIG?.pwa?.enabled !== false) {
  // Only auto-reload when an OLD worker was already controlling this page (a real update).
  // On a first visit the new worker just claims the page, and reloading then would be a needless flash.
  const hadController = !!navigator.serviceWorker.controller;
  let refreshing = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!hadController || refreshing) return;
    // Never reload while the visitor is typing; the update applies on their next page load.
    const a = document.activeElement;
    if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) return;
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
