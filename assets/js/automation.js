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

    // Count Organs
    const organCount = config.organs ? config.organs.length : 4;
    const organEl = statsGrid.querySelector('.stat-label:contains("Divisions")')?.parentElement.querySelector('.stat-number') || 
                    statsGrid.children[0]?.querySelector('.stat-number');
    
    if (organEl) {
      organEl.dataset.count = organCount;
    }

    // Count Projects
    const projectCount = config.projects ? config.projects.length : 3;
    const projectEl = statsGrid.querySelector('.stat-label:contains("Live Projects")')?.parentElement.querySelector('.stat-number') ||
                      statsGrid.children[1]?.querySelector('.stat-number');
    
    if (projectEl) {
      projectEl.dataset.count = projectCount;
    }

    // Custom "Contains" selector helper for vanilla JS
    function findByText(text, selector) {
      return Array.from(document.querySelectorAll(selector)).find(el => el.textContent.includes(text));
    }
    
    const divisionsLabel = findByText("Divisions", ".stat-label");
    if (divisionsLabel) divisionsLabel.parentElement.querySelector('.stat-number').dataset.count = organCount;
    
    const projectsLabel = findByText("Live Projects", ".stat-label");
    if (projectsLabel) projectsLabel.parentElement.querySelector('.stat-number').dataset.count = projectCount;
  }

  /**
   * 2. Auto-Branding & SEO Sync
   * Injects current site name and tagline from config into relevant UI areas.
   */
  function automateBranding() {
    // Sync Hero tagline if it matches a placeholder
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline && config.site.tagline) {
      heroTagline.textContent = config.site.tagline;
    }

    // Sync Page Titles if they are generic
    if (document.title === "Luminary Technicals") {
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

  // Helper for text matching in step 1
  Element.prototype.containsText = function(text) {
    return this.textContent.trim().toLowerCase().includes(text.toLowerCase());
  };

  // Run Automations
  automateStats();
  automateBranding();
  automateLinks();
  
  console.log("🚀 Luminary Automation Engine: Active");
});
