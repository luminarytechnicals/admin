/**
 * google-maps-details.js — Luminary Technicals Official Google Maps & Location Profile
 * Sourced directly from official Google Business & Maps profile:
 * https://share.google/V1pNWZPIrYMU6uPvo
 */

const GOOGLE_MAPS_DETAILS = {
  entity: {
    name: "Luminary Technicals",
    legalName: "Luminary Technicals",
    category: "Non-Governmental organization",
    tagline: "Building systems. Advancing ideas. Connecting impact."
  },

  // Google Maps Platform API Key (for Places Autocomplete, Geocoding & Address Descriptors)
  apiKey: "INSERT_YOUR_API_KEY",

  location: {
    addressLine1: "Nagavarapalya",
    addressLine2: "C V Raman Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560093",
    country: "India",
    countryCode: "IN",
    landmark: "Near Versova Layout / Overhead Water Tank",
    fullAddress: "Nagavarapalya, C V Raman Nagar, Bengaluru, Karnataka 560093, India"
  },

  coordinates: {
    latitude: 12.9934,
    longitude: 77.6616,
    region: "IN-KA"
  },

  operatingHours: {
    status: "Open 24 hours",
    schedule: "Monday - Sunday: Open 24 hours",
    isAlwaysOpen: true
  },

  links: {
    shareUrl: "https://share.google/V1pNWZPIrYMU6uPvo",
    directSearchUrl: "https://www.google.com/search?q=Luminary+Technicals+Bengaluru",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Luminary+Technicals+Nagavarapalya+C+V+Raman+Nagar+Bengaluru+Karnataka+560093",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Luminary+Technicals+Nagavarapalya+C+V+Raman+Nagar+Bengaluru+Karnataka+560093",
    embedMapUrl: "https://www.google.com/maps?q=Luminary+Technicals+Nagavarapalya+C+V+Raman+Nagar+Bengaluru+Karnataka+560093&output=embed"
  },

  schema: {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Luminary Technicals",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Nagavarapalya, C V Raman Nagar",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560093",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9934",
      "longitude": "77.6616"
    },
    "hasMap": "https://share.google/V1pNWZPIrYMU6uPvo",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  },

  // Ready-to-use HTML snippet for footer
  footerSnippet: `
    <div class="footer-location" style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08);">
      <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.85rem;color:var(--slate, #94a3b8);line-height:1.45;">
        <span style="font-size:1.15rem;line-height:1;" aria-hidden="true">📍</span>
        <div>
          <strong style="color:var(--text, #f8fafc);display:block;font-size:0.875rem;">Luminary Technicals</strong>
          <span>Nagavarapalya, C V Raman Nagar</span><br>
          <span>Bengaluru, Karnataka 560093</span>
        </div>
      </div>
      <a href="https://share.google/V1pNWZPIrYMU6uPvo" target="_blank" rel="noopener noreferrer" 
         class="map-link-btn"
         style="display:inline-flex;align-items:center;gap:6px;margin-top:8px;font-size:0.8rem;color:var(--accent, #F5C518);text-decoration:none;font-weight:500;">
        <span>🗺️ View on Google Maps</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  `
};

if (typeof window !== "undefined") {
  window.GOOGLE_MAPS_DETAILS = GOOGLE_MAPS_DETAILS;
}
if (typeof module !== "undefined") {
  module.exports = GOOGLE_MAPS_DETAILS;
}
