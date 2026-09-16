/**
 * projects.js — Luminary Technicals Central Project & Initiative Registry (SSOT)
 * Canonical Organizational Structure V2
 */
const PROJECTS = [
  {
    id: "agroscan",
    name: "AgroScan",
    category: "Research & Technology",
    division: "Luminary Developers",
    parent: "luminary-developers",
    type: "project",
    status: "Active (Revival Program 2027)",
    year: "2027",
    featured: true,
    badge: "Flagship Research",
    icon: "🌱",
    url: "frontend/agroscan.html",
    directPage: "agroscan.html",
    shortDesc: "AI-driven precision agricultural diagnostics, crop pathogen identification, and field IoT telemetry.",
    description: "AgroScan is a flagship research-driven precision agriculture system. Designed to assist smallholder and commercial farmers by combining high-speed Computer Vision (Vision Transformers & CNNs) with low-cost field IoT sensors for early disease identification, soil nutrient analysis, and hyper-localized treatment pathways.",
    technologies: ["Computer Vision (CNN / ViT)", "Python / PyTorch", "Edge IoT (ESP32 / LoRa)", "Offline-First PWA", "REST APIs"],
    environments: {
      public: "https://luminarytechnicals.dpdns.org/frontend/agroscan.html",
      devLab: "Experimental Sensor Telemetry Lab",
      api: "v2.agroscan.internal"
    }
  },
  {
    id: "luminary-afterverse",
    name: "Luminary Afterverse",
    category: "Immersive & Spatial Computing",
    division: "Luminary Developers",
    parent: "luminary-developers",
    type: "project",
    status: "Operating Lab",
    year: "2026",
    featured: true,
    badge: "Spatial XR Lab",
    icon: "🌌",
    url: "frontend/afterverse.html",
    directPage: "afterverse.html",
    shortDesc: "Next-generation spatial digital universe, interactive 3D WebGL environments, and sensory interfaces.",
    description: "An experimental creative technology laboratory incubated under Luminary Developers. Afterverse explores interactive node-graph worlds, real-time particle simulations, ambient spatial audio, and futuristic web navigation systems that move beyond flat document windows.",
    technologies: ["WebGL & GLSL Shaders", "HTML5 Canvas 2D", "Spatial WebXR", "Particle Physics Engine", "Web Audio API"],
    environments: {
      public: "https://luminarytechnicals.dpdns.org/frontend/afterverse.html",
      sandbox: "60 FPS Interactive Cosmic Canvas"
    }
  },
  {
    id: "luminary-webs",
    name: "Luminary Webs",
    category: "Web Ecosystem & Collaboration",
    division: "Luminary Kits",
    parent: "luminary-kits",
    type: "collaboration",
    status: "Operating",
    year: "2025",
    featured: true,
    badge: "Kits Collaboration",
    icon: "🌐",
    url: "frontend/projects.html#luminary-webs",
    directPage: "projects.html",
    shortDesc: "Curated web solutions directory, client web architectures, and progressive digital showcases.",
    description: "Established as an official collaboration of Luminary Kits, Luminary Webs delivers high-performance website architectures, custom digital tools, and scalable web applications backed by the broader Luminary infrastructure.",
    technologies: ["Semantic HTML5", "Modern Vanilla CSS", "ES6+ JavaScript", "PWA Shell", "Edge CDN"],
    environments: {
      public: "https://luminarytechnicals.dpdns.org/frontend/projects.html#luminary-webs"
    }
  },
  {
    id: "luminary-wishes",
    name: "Luminary Wishes",
    category: "Digital Experience & Social Tool",
    division: "Luminary Webs (under Luminary Kits)",
    parent: "luminary-webs",
    type: "initiative",
    status: "Operating",
    year: "2025",
    featured: true,
    badge: "Social Tool",
    icon: "✨",
    url: "frontend/projects.html#luminary-wishes",
    directPage: "projects.html",
    shortDesc: "Personalized digital celebration experiences, event portals, and milestone greetings.",
    description: "A specialized digital platform designed under Luminary Webs to craft memorable, interactive greetings and celebration spaces for milestones, anniversaries, and community festivals.",
    technologies: ["Micro-interactions", "Canvas Particle Confetti", "Audio Reactive FX", "Dynamic URL Routing"]
  },
  {
    id: "luminary-ai",
    name: "Luminary AI",
    category: "Artificial Intelligence & R&D",
    division: "Luminary Developers",
    parent: "luminary-developers",
    type: "project",
    status: "Active R&D",
    year: "2026",
    featured: true,
    badge: "Active R&D",
    icon: "🤖",
    url: "frontend/technology.html#luminary-ai",
    directPage: "technology.html",
    shortDesc: "Autonomous agentic reasoning pipelines, localized inference, and generative tooling.",
    description: "A core development initiative researching autonomous multi-agent systems, retrieval-augmented generation (RAG) for localized corpora, and edge inference optimization for Luminary products.",
    technologies: ["Autonomous Agent Workflows", "Vector Embeddings", "Local LLM Tool Calling", "PyTorch"]
  },
  {
    id: "luminary-news",
    name: "Luminary News",
    category: "Media & Information Platform",
    division: "Luminary Federals",
    parent: "luminary-federals",
    type: "initiative",
    status: "Operating",
    year: "2026",
    featured: true,
    badge: "Luminary Federals · Platform",
    icon: "📰",
    url: "frontend/news.html",
    directPage: "news.html",
    shortDesc: "Official news wire, announcements, press releases, and ecosystem updates.",
    description: "The primary communications and public information platform of Luminary Technicals, operated under Luminary Federals. Delivers editorial updates, technical release notes, research announcements, and ecosystem milestones.",
    technologies: ["Dynamic News Engine", "Category Filtering", "In-Browser Article Reader", "RSS / Feed Syndication"]
  },
  {
    id: "luminary-books",
    name: "Luminary Books",
    category: "Publishing & Knowledge",
    division: "Luminary Cares",
    parent: "luminary-cares",
    type: "initiative",
    status: "Operating",
    year: "2025",
    featured: false,
    badge: "Publishing",
    icon: "📚",
    url: "frontend/resources.html#books",
    directPage: "resources.html",
    shortDesc: "Technical handbooks, whitepapers, programming manuals, and educational publications.",
    description: "A free digital publishing initiative under Luminary Cares dedicated to authoring comprehensive developer guides, AI textbooks, and cybersecurity awareness manuals.",
    technologies: ["Technical Authoring", "PDF / EPUB Generation", "Markdown Pipelines"]
  }
];

if (typeof window !== "undefined") {
  window.PROJECTS = PROJECTS;
}
if (typeof module !== "undefined") {
  module.exports = PROJECTS;
}
