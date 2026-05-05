/* lazy-load.js — IntersectionObserver Lazy Loading */
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (lazyImages.length) {
    const imgObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imgObs.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    lazyImages.forEach(img => imgObs.observe(img));
  }

  // Fade in sections on scroll
  const sections = document.querySelectorAll('.lazy-section');
  if (sections.length) {
    const secObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('loaded');
          secObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.05 });
    sections.forEach(s => secObs.observe(s));
  }
});
