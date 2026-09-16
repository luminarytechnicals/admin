/**
 * config.js — Master Configuration & Data Synchronizer
 * Luminary Technicals Canonical Architecture V2
 */

// Fallback initializations if individual data files loaded asynchronously
const org = (typeof window !== "undefined" && window.ORGANIZATION) ? window.ORGANIZATION : {};
const organsList = (typeof window !== "undefined" && window.ORGANS) ? window.ORGANS : [];
const projectsList = (typeof window !== "undefined" && window.PROJECTS) ? window.PROJECTS : [];
const researchData = (typeof window !== "undefined" && window.RESEARCH) ? window.RESEARCH : {};
const newsList = (typeof window !== "undefined" && window.NEWS) ? window.NEWS : [];
const timelineList = (typeof window !== "undefined" && window.TIMELINE) ? window.TIMELINE : [];
const faqData = (typeof window !== "undefined" && window.FAQ_DATA) ? window.FAQ_DATA : {};

const CONFIG = {
  site: {
    name: "Luminary Technicals",
    tagline: "Building technology, researching possibilities, securing digital infrastructure, empowering people, and connecting ideas.",
    brandLine: "Building systems. Advancing ideas. Connecting impact.",
    masterFormula: "POWER. CREATE. EMPOWER. CONNECT. ENGAGE.",
    publicFormula: "BUILD. RESEARCH. SECURE. EMPOWER. CONNECT.",
    url: "https://luminarytechnicals.dpdns.org",
    canonicalBase: "https://luminarytechnicals.dpdns.org",
    logo: "assets/images/logo-luminarytechnicals.png",
    favicon: "icons/icon-96.png",
    language: "en",
    themeColor: "#0A0F1E",
    accentColor: "#F5C518"
  },

  owner: {
    name: "AR. Abhinav Ranjan",
    title: "Founder & CEO, Luminary Technicals",
    photo: "https://abhinavranjan.qzz.io/images/profile.png",
    portfolio: "https://abhinavranjan.netlify.app",
    bio: "AR. Abhinav Ranjan is the Founder & CEO of Luminary Technicals. He provides central strategic direction, system architecture, and leadership across technology development, cloud infrastructure, artificial intelligence, research, and public-interest initiatives.",
    message: "\"I didn't build Luminary Technicals to compete — I built it to create. Every organ, every project, every line of code is a reflection of what I believe the digital world can be.\"",
    social: {
      github: "https://github.com/ProAbhinavRanjan",
      instagram: "https://www.instagram.com/ar.abhinavranjan",
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
      email: "luminarytechnicals@gmail.com",
      portfolio: "https://abhinavranjan.netlify.app"
    }
  },

  seo: {
    defaultTitle: "Luminary Technicals | Building, Researching, Securing, Empowering & Connecting",
    defaultDescription: "Luminary Technicals is a multidisciplinary organization connecting digital infrastructure, software development, AI research, cybersecurity, and public-interest initiatives across five core organs and direct associated entities.",
    defaultKeywords: "Luminary Technicals, AgroScan, Luminary Afterverse, Luminary Servers, Luminary Developers, Luminary Cares, Luminary Kits, Luminary Federals, Luminary Trust, Radhika Research Foundation, Luminary News, digital infrastructure, AI, cybersecurity, AR Abhinav Ranjan",
    ogImage: "assets/images/og-default.png",
    twitterHandle: "@luminarytechnicals",
    canonicalBase: "https://luminarytechnicals.dpdns.org"
  },

  pwa: {
    enabled: true,
    offlinePage: "/offline.html",
    cacheName: "luminary-v5"
  },

  // CANONICAL NAVIGATION STRUCTURE
  nav: {
    links: [
      { label: "Home", href: "../index.html", rootHref: "index.html" },
      { label: "About", href: "about.html", rootHref: "frontend/about.html" },
      { label: "Ecosystem", href: "ecosystem.html", rootHref: "frontend/ecosystem.html" },
      { label: "Organs", href: "organs.html", rootHref: "frontend/organs.html" },
      { label: "Projects", href: "projects.html", rootHref: "frontend/projects.html" },
      { label: "News", href: "news.html", rootHref: "frontend/news.html" },
      { label: "Collaborate", href: "collab.html", rootHref: "frontend/collab.html" }
    ]
  },

  // CANONICAL ARCHITECTURE MAPPINGS
  // Exactly 5 Core Organs:
  organs: organsList.length ? organsList : [
    { id: "luminary-servers", name: "Luminary Servers", type: "core-organ", formula: "POWER", page: "servers.html", icon: "🖥️", tagline: "Infrastructure & Cloud Systems" },
    { id: "luminary-developers", name: "Luminary Developers", type: "core-organ", formula: "CREATE", page: "developers.html", icon: "⚙️", tagline: "Software Engineering & AI Lab" },
    { id: "luminary-cares", name: "Luminary Cares", type: "core-organ", formula: "EMPOWER", page: "cares.html", icon: "💛", tagline: "Education & Digital Literacy" },
    { id: "luminary-kits", name: "Luminary Kits", type: "core-organ", formula: "CONNECT", page: "kits.html", icon: "📦", tagline: "Developer Toolkits & Integrations" },
    { id: "luminary-federals", name: "Luminary Federals", type: "core-organ", formula: "ENGAGE", page: "federals.html", icon: "🏛️", tagline: "Civic Technology & News Platform" }
  ],

  // Direct Associated Entity:
  associatedEntities: [
    {
      id: "luminary-trust",
      name: "Luminary Trust",
      type: "associated-entity",
      parent: "luminary-technicals",
      page: "trust.html",
      icon: "🤝",
      tagline: "Public-Interest & Philanthropic Ecosystem",
      initiatives: ["Radhika Research Foundation"]
    }
  ],

  projects: projectsList,
  research: researchData,
  news: newsList,
  timeline: timelineList,
  faqs: faqData,

  contact: {
    email: "luminarytechnicals@gmail.com",
    whatsapp: "+918294721929",
    telegram: "luminarytechnicalsinternational",
    address: "India",
    channels: [
      { id: "whatsapp", label: "WhatsApp Official", icon: "💬", url: "https://wa.me/918294721929" },
      { id: "email", label: "Email Luminary", icon: "📧", url: "mailto:luminarytechnicals@gmail.com" },
      { id: "telegram", label: "Telegram Wire", icon: "✈️", url: "https://t.me/luminarytechnicalsinternational" }
    ]
  },

  legal: {
    privacyUpdated: "2026-09-17",
    termsUpdated: "2026-09-17",
    company: "Luminary Technicals",
    cookieConsent: true
  }
};

if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
if (typeof module !== "undefined") {
  module.exports = CONFIG;
}
