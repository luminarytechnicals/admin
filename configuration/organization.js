/**
 * organization.js — Luminary Technicals Central Organization Definition (SSOT)
 * Canonical Organizational Structure V2
 */
const ORGANIZATION = {
  name: "Luminary Technicals",
  legalName: "Luminary Technicals",
  alternateNames: ["LuminaryTechnicals", "Luminary Tech", "LT"],
  url: "https://luminarytechnicals.dpdns.org",
  canonicalDomain: "luminarytechnicals.dpdns.org",
  tagline: "Building technology, researching possibilities, securing digital infrastructure, empowering people, and connecting ideas.",
  brandLine: "Building systems. Advancing ideas. Connecting impact.",
  
  // Formulas
  publicFormula: "BUILD. RESEARCH. SECURE. EMPOWER. CONNECT.",
  masterFormula: "POWER. CREATE. EMPOWER. CONNECT. ENGAGE.",
  
  publicPrinciples: [
    { principle: "BUILD", meaning: "Create technologies, platforms and infrastructure" },
    { principle: "RESEARCH", meaning: "Explore science, technology and new ideas" },
    { principle: "SECURE", meaning: "Protect systems, information and digital infrastructure" },
    { principle: "EMPOWER", meaning: "Make technology useful and accessible" },
    { principle: "CONNECT", meaning: "Bring people, organizations and ideas together" }
  ],

  // Canonical Top-Level Structure
  // Exactly 5 Core Organs:
  organs: [
    "luminary-servers",
    "luminary-developers",
    "luminary-cares",
    "luminary-kits",
    "luminary-federals"
  ],

  // Direct Associated Entity (Top-level, separate from the 5 core organs)
  associatedEntities: [
    "luminary-trust"
  ],

  founder: {
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

  pillars: [
    { id: "infra", title: "DIGITAL INFRASTRUCTURE", icon: "🖥️", description: "High-performance hosting, cloud servers, edge computing, DNS routing and high-availability systems." },
    { id: "tech", title: "TECHNOLOGY", icon: "⚙️", description: "Full-stack software engineering, responsive web platforms, spatial UI, and developer toolkits." },
    { id: "research", title: "RESEARCH", icon: "🔬", description: "Agricultural AI, precision diagnostics, resilient protocols, and spatial computing experiments." },
    { id: "cyber", title: "CYBERSECURITY", icon: "🛡️", description: "Defensive systems, Content Security Policies, security auditing, and digital resilience." },
    { id: "edu", title: "EDUCATION", icon: "📖", description: "Technical education, open mentorship, technical guides, and digital literacy empowerment." },
    { id: "public", title: "PUBLIC-INTEREST INITIATIVES", icon: "💛", description: "Community welfare, digital accessibility, and public-facing technological support." }
  ],

  contact: {
    email: "luminarytechnicals@gmail.com",
    whatsapp: "+918294721929",
    telegram: "luminarytechnicalsinternational",
    location: "India (Global Operations)",
    channels: [
      { id: "email", label: "Email Luminary", icon: "📧", url: "mailto:luminarytechnicals@gmail.com" },
      { id: "whatsapp", label: "WhatsApp Official", icon: "💬", url: "https://wa.me/918294721929" },
      { id: "telegram", label: "Telegram Wire", icon: "✈️", url: "https://t.me/luminarytechnicalsinternational" },
      { id: "github", label: "GitHub Organization", icon: "🐙", url: "https://github.com/DeveloperAbhinav" },
      { id: "instagram", label: "Instagram Channel", icon: "📸", url: "https://www.instagram.com/luminary_technicals" }
    ]
  },

  systemStatus: {
    status: "OPERATIONAL",
    uptime: "99.98%",
    services: [
      { name: "Luminary Servers & DNS", status: "Operational", ping: "24ms" },
      { name: "Web Network & CDN", status: "Operational", ping: "18ms" },
      { name: "Luminary Developers API", status: "Operational", ping: "32ms" },
      { name: "Luminary News Wire", status: "Operational", ping: "21ms" },
      { name: "AgroScan Dev Lab", status: "Active (Revival 2027)", ping: "35ms" }
    ]
  }
};

if (typeof window !== "undefined") {
  window.ORGANIZATION = ORGANIZATION;
}
if (typeof module !== "undefined") {
  module.exports = ORGANIZATION;
}
