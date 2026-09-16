/* automation.js — Intelligent Ecosystem Automation Engine */
document.addEventListener('DOMContentLoaded', () => {
  const config = window.CONFIG;
  if (!config) return;

  /**
   * 1. Dynamic Stats Counter
   * Automatically updates index page counters based on CONFIG data.
   */
  function automateStats() {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) return;

    // Count Exactly 5 Core Organs
    const organCount = 5;
    
    // Helper to find element by text content
    const findLabelByText = (text) => {
      return Array.from(statsGrid.querySelectorAll('.stat-label')).find(el => 
        el.textContent.trim().toLowerCase().includes(text.toLowerCase())
      );
    };

    const organLabel = findLabelByText('Organ') || findLabelByText('Division');
    if (organLabel && organLabel.parentElement) {
      const numEl = organLabel.parentElement.querySelector('.stat-number');
      if (numEl) numEl.dataset.count = organCount;
    }

    // Count Projects
    const projectCount = (window.PROJECTS && window.PROJECTS.length) || (config.projects ? config.projects.length : 6);
    const projectLabel = findLabelByText('Project');
    if (projectLabel && projectLabel.parentElement) {
      const numEl = projectLabel.parentElement.querySelector('.stat-number');
      if (numEl) numEl.dataset.count = projectCount;
    }
  }

  /**
   * 2. Auto-Branding & SEO Sync
   * Injects current site name and tagline from config into relevant UI areas.
   */
  function automateBranding() {
    // Sync Hero tagline if it matches a placeholder
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline && config.site?.tagline) {
      heroTagline.textContent = config.site.tagline;
    }

    // Sync Page Titles if they are generic
    if (document.title === "Luminary Technicals" && config.site?.name && config.site?.tagline) {
      document.title = `${config.site.name} — ${config.site.tagline}`;
    }
  }

  /**
   * 3. Intelligent Link Sanitization
   * Fixes broken or relative links based on current directory.
   */
  function automateLinks() {
    const isFrontend = window.location.pathname.includes('/frontend/');
    document.querySelectorAll('a[href^="frontend/"]').forEach(a => {
      if (isFrontend) {
        a.href = a.getAttribute('href').replace('frontend/', '');
      }
    });
  }

  // Run Automations safely
  try {
    automateStats();
    automateBranding();
    automateLinks();
  } catch (err) {
    console.warn("Automation Engine Warning:", err);
  }
  
  console.log("🚀 Luminary Automation Engine: Active");
});

