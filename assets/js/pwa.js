/* pwa.js — Service Worker Registration */
if ('serviceWorker' in navigator && window.CONFIG?.pwa?.enabled !== false) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        // Check for updates
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
              showUpdateBanner();
            }
          });
        });
      })
      .catch(err => console.log('SW registration failed:', err));
  });
}

function showUpdateBanner() {
  const banner = document.createElement('div');
  banner.id = 'sw-update-banner';
  banner.style.cssText = 'position:fixed;top:0;left:0;width:100%;background:#F5C518;color:#0A0F1E;padding:12px 24px;text-align:center;z-index:9999;font-weight:600;font-size:0.9rem;display:flex;align-items:center;justify-content:center;gap:16px;';
  banner.innerHTML = 'New version available <button onclick="location.reload()" style="padding:6px 20px;border-radius:50px;border:2px solid #0A0F1E;background:transparent;color:#0A0F1E;font-weight:700;cursor:pointer;">Refresh</button>';
  document.body.prepend(banner);
}
