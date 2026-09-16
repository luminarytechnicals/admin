/**
 * organs.js — Luminary Technicals 5 Core Organs & Associated Entities (SSOT)
 * Canonical Organizational Structure V2
 */
const ORGANS = [
  {
    id: "luminary-servers",
    name: "Luminary Servers",
    type: "core-organ",
    formula: "POWER",
    icon: "🖥️",
    badge: "Core Organ · Power",
    tagline: "Infrastructure, Cloud Systems & High-Availability Operations",
    page: "servers.html",
    url: "frontend/servers.html",
    description: "The computing and cloud backbone of the Luminary ecosystem. Manages bare-metal server infrastructure, high-availability VPS clusters, authoritative DNS routing, automated SSL provisioning, content delivery networks (CDN), and dedicated AI compute nodes.",
    focusAreas: [
      "Cloud & Bare-Metal Infrastructure",
      "Authoritative DNS & Domain Management",
      "High-Availability VPS Hosting",
      "SSL, DDoS Mitigation & Network Hardening",
      "AI Inference & Model Training Clusters",
      "Digital Operations & Systems Monitoring"
    ],
    initiatives: [
      { name: "Luminary Cloud Mesh", type: "infrastructure", description: "Multi-region distributed compute architecture." },
      { name: "Apex DNS Engine", type: "infrastructure", description: "Ultra-low latency domain resolution layer." }
    ]
  },
  {
    id: "luminary-developers",
    name: "Luminary Developers",
    type: "core-organ",
    formula: "CREATE",
    icon: "⚙️",
    badge: "Core Organ · Create",
    tagline: "Software Engineering, AI Systems & Spatial Technology Lab",
    page: "developers.html",
    url: "frontend/developers.html",
    description: "The primary software and emerging technology creation organ. Engineers responsive web platforms, Progressive Web Apps (PWAs), artificial intelligence agents, automation pipelines, and spatial computing environments.",
    focusAreas: [
      "Full-Stack Web & PWA Engineering",
      "Artificial Intelligence & Agent Automation",
      "Spatial Computing & WebGL Graphics",
      "Open-Source Software & API Development",
      "Experimental Prototyping & Emerging Tech",
      "System Architecture & Performance Optimization"
    ],
    initiatives: [
      {
        name: "Luminary Afterverse",
        id: "luminary-afterverse",
        type: "project",
        badge: "Spatial Lab",
        page: "afterverse.html",
        url: "frontend/afterverse.html",
        description: "Creative technology and spatial computing laboratory exploring 3D interactive environments, metaverse architectures, and next-generation sensory interfaces."
      },
      {
        name: "Luminary AI",
        id: "luminary-ai",
        type: "project",
        badge: "Active R&D",
        page: "projects.html#luminary-ai",
        url: "frontend/projects.html#luminary-ai",
        description: "Autonomous agentic reasoning frameworks, localized LLM pipelines, and computer vision workflows."
      }
    ]
  },
  {
    id: "luminary-cares",
    name: "Luminary Cares",
    type: "core-organ",
    formula: "EMPOWER",
    icon: "💛",
    badge: "Core Organ · Empower",
    tagline: "Technology Education, Digital Literacy & Community Empowerment",
    page: "cares.html",
    url: "frontend/cares.html",
    description: "The empowerment and human-impact organ of Luminary Technicals. Committed to demystifying modern technology, delivering digital education workshops, offering open developer mentorship, and driving public-interest digital literacy programs.",
    focusAreas: [
      "Technology Education & Curriculum Guides",
      "Open-Access Developer Mentorship",
      "Digital Literacy for Underserved Communities",
      "Humanitarian Tech Projects & Accessibility Audits",
      "Public-Interest Software Tools",
      "Community Outreach & Developer Empowerment"
    ],
    initiatives: [
      {
        name: "Luminary Books",
        id: "luminary-books",
        type: "initiative",
        badge: "Publishing",
        description: "Authoring and publishing free developer whitepapers, technical handbooks, and educational literature."
      },
      {
        name: "Tech Inclusion Initiative",
        type: "initiative",
        badge: "Community",
        description: "Accessible computing tools and mentorship for upcoming software engineers."
      }
    ]
  },
  {
    id: "luminary-kits",
    name: "Luminary Kits",
    type: "core-organ",
    formula: "CONNECT",
    icon: "📦",
    badge: "Core Organ · Connect",
    tagline: "Shared Developer Toolkits, APIs & Ecosystem Integrations",
    page: "kits.html",
    url: "frontend/kits.html",
    description: "The connective tissue of the Luminary Technicals ecosystem. Builds reusable UI token systems, CLI developer utilities, cross-platform software development kits (SDKs), interoperability protocols, and coordinates partner web collaborations.",
    focusAreas: [
      "Modular UI Component Libraries & Tokens",
      "Developer CLI Automation Tools",
      "REST & GraphQL Integration APIs",
      "Cross-Organ System Connectors",
      "Partner Web Collaborations & Shared Toolchains",
      "System Interoperability Frameworks"
    ],
    initiatives: [
      {
        name: "Luminary Webs",
        id: "luminary-webs",
        type: "collaboration",
        parent: "luminary-kits",
        badge: "Kits Collaboration",
        description: "Curated web solutions directory, client web platforms, and experimental digital showcases powered through Luminary Kits tooling.",
        subInitiatives: [
          {
            name: "Luminary Wishes",
            id: "luminary-wishes",
            type: "initiative",
            parent: "luminary-webs",
            badge: "Social Tool",
            description: "Personalized digital celebration experiences and experiential milestone cards."
          }
        ]
      }
    ]
  },
  {
    id: "luminary-federals",
    name: "Luminary Federals",
    type: "core-organ",
    formula: "ENGAGE",
    icon: "🏛️",
    badge: "Core Organ · Engage",
    tagline: "Civic Technology, Public Affairs & Institutional Communication",
    page: "federals.html",
    url: "frontend/federals.html",
    description: "The public engagement, information, and institutional-dialogue organ of Luminary Technicals. Focuses on open technology governance, civic-tech research, sovereign digital infrastructure studies, public-interest communication, and publishing the official Luminary News wire. (Strictly a non-governmental, non-statutory civic research entity).",
    focusAreas: [
      "Public Engagement & Media Communication",
      "Open Information & Editorial Initiatives",
      "Civic Technology & Governance Research",
      "Sovereign Digital Systems & Tech Policy Studies",
      "Institutional Dialogues & Hackathons",
      "Official News Wire & Public Announcements"
    ],
    initiatives: [
      {
        name: "Luminary News",
        id: "luminary-news",
        type: "initiative",
        parent: "luminary-federals",
        badge: "Luminary Federals · Platform",
        page: "news.html",
        url: "frontend/news.html",
        description: "The official news wire, press hub, release notes, and announcement platform operated under Luminary Federals."
      }
    ]
  },
  // DIRECT ASSOCIATED ENTITY (Top-level, separate from the 5 Core Organs)
  {
    id: "luminary-trust",
    name: "Luminary Trust",
    type: "associated-entity",
    parent: "luminary-technicals",
    icon: "🤝",
    badge: "Associated Entity · Public Interest",
    tagline: "Independent Public-Interest, Philanthropic & Foundation Ecosystem",
    page: "trust.html",
    url: "frontend/trust.html",
    description: "A top-level entity directly associated with Luminary Technicals, dedicated to public-interest initiatives, long-term philanthropic endeavors, and institutional scientific foundations. Separate from the five technical/operational organs.",
    focusAreas: [
      "Public-Interest Technology Advocacy",
      "Long-Term Philanthropic Endowments",
      "Institutional Scientific Research Foundations",
      "Social Impact Grant Coordination",
      "Collaborative Civil Society Initiatives"
    ],
    initiatives: [
      {
        name: "Radhika Research Foundation",
        id: "radhika-research-foundation",
        type: "foundation",
        parent: "luminary-trust",
        badge: "Foundation",
        description: "A specialized scientific and social research foundation operating under the auspices of Luminary Trust to advance public-good discoveries."
      }
    ]
  }
];

if (typeof window !== "undefined") {
  window.ORGANS = ORGANS;
}
if (typeof module !== "undefined") {
  module.exports = ORGANS;
}
