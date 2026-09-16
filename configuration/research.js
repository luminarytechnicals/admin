/**
 * research.js — Luminary Technicals Research Programs, Publications & Experiments (SSOT)
 * Canonical Organizational Structure V2
 */
const RESEARCH = {
  overview: "Luminary Technicals approaches research as an applied discipline that bridges rigorous inquiry with practical technology development. Research programs span agricultural artificial intelligence, resilient cloud infrastructure, spatial computing, defensive cybersecurity, and open civic technology protocols.",
  
  areas: [
    {
      id: "agri-ai",
      title: "Agricultural Artificial Intelligence & Edge Sensing",
      icon: "🌱",
      leadOrgan: "Luminary Developers",
      status: "Active Program",
      description: "Developing low-latency computer vision algorithms and micro-sensor telemetry for real-time crop disease detection and soil condition modeling under low-connectivity field environments.",
      keyProjects: ["AgroScan", "Revival Program 2027", "Edge ViT Quantization"]
    },
    {
      id: "cloud-resilience",
      title: "Distributed Cloud Infrastructure & High-Availability Mesh",
      icon: "🖥️",
      leadOrgan: "Luminary Servers",
      status: "Active Program",
      description: "Investigating fault-tolerant multi-region DNS routing, automated zero-downtime certificate rotation, and edge cache warming algorithms for decentralized content delivery.",
      keyProjects: ["Apex DNS Engine", "Luminary Mesh CDN"]
    },
    {
      id: "spatial-computing",
      title: "Spatial Computing & Sensory Web Interfaces",
      icon: "🌌",
      leadOrgan: "Luminary Developers",
      status: "Operating Lab",
      description: "Exploring post-browser spatial navigation, real-time GLSL particle physics, ambient audio-reactive interaction, and low-latency 3D rendering in consumer mobile browsers.",
      keyProjects: ["Luminary Afterverse", "Canvas 2D Matrix Engine"]
    },
    {
      id: "cybersecurity",
      title: "Defensive Cybersecurity & Zero-Trust Hardening",
      icon: "🛡️",
      leadOrgan: "Luminary Developers & Servers",
      status: "Ongoing Research",
      description: "Evaluating strict Content Security Policy (CSP) enforcement, static web application attack surface minimization, automated dependency vulnerability screening, and cryptographic token verification.",
      keyProjects: ["Zero-Trust Web Blueprint", "Hardened PWA Architecture"]
    },
    {
      id: "civic-protocols",
      title: "Sovereign Digital Systems & Civic Governance Studies",
      icon: "🏛️",
      leadOrgan: "Luminary Federals",
      status: "Think-Tank Research",
      description: "Academic and public-interest inquiries into technology sovereignty, open data transparency, non-governmental civic engagement tools, and digital rights in emerging economies.",
      keyProjects: ["Open Civic Standards", "Public-Interest Protocol Analysis"]
    }
  ],

  publications: [
    {
      id: "pub-2026-01",
      title: "Edge-Optimized Vision Transformers for Real-Time Plant Pathogen Identification",
      authors: ["AR. Abhinav Ranjan", "Luminary Research Group"],
      year: "2026",
      category: "Agricultural AI",
      summary: "An investigation into model quantization and memory pruning techniques for deploying Vision Transformer (ViT) backbones onto low-power edge microcontrollers without cloud latency.",
      doi: "10.luminary/agroscan-vit-2026",
      status: "Whitepaper Available",
      relatedProject: "AgroScan"
    },
    {
      id: "pub-2025-02",
      title: "Architectural Resilience in Static Decentralized Web Applications",
      authors: ["AR. Abhinav Ranjan"],
      year: "2025",
      category: "Cloud Infrastructure",
      summary: "A practical framework for building zero-dependency web platforms that achieve sub-50ms global First Contentful Paint while eliminating server-side injection vectors.",
      doi: "10.luminary/static-resilience-2025",
      status: "Published",
      relatedProject: "Luminary Servers"
    },
    {
      id: "pub-2025-01",
      title: "Spatial Interactive Computing: Moving Beyond Flat Document Windows",
      authors: ["Luminary Afterverse Lab", "AR. Abhinav Ranjan"],
      year: "2025",
      category: "Spatial Interfaces",
      summary: "Exploring human-computer interaction paradigms inside 60-FPS continuous particle universes and the psychological impact of ambient audio feedback in WebGL.",
      doi: "10.luminary/afterverse-spatial-2025",
      status: "Experimental Preprint",
      relatedProject: "Luminary Afterverse"
    }
  ],

  experiments: [
    {
      id: "exp-2027-agri",
      title: "AgroScan Field Prototype 2027 Sensor Array",
      stage: "Active Development",
      objective: "Field test multispectral sensor nodes connected via ESP32 LoRa gateways to quantify leaf chlorophyll degradation 72 hours before visual symptoms appear."
    },
    {
      id: "exp-2026-canvas",
      title: "WebGL 10,000-Particle Interactive Fluid Dynamics",
      stage: "Demonstrator Live",
      objective: "Achieve stable 60 FPS particle simulation with cursor gravitational physics on low-spec mobile devices inside Afterverse."
    },
    {
      id: "exp-2026-dns",
      title: "Sub-10ms DNS Failover Over Global Anycast",
      stage: "Benchmarking",
      objective: "Evaluate Anycast routing paths under simulated fiber severed link conditions to maintain seamless cluster failover."
    }
  ]
};

if (typeof window !== "undefined") {
  window.RESEARCH = RESEARCH;
}
if (typeof module !== "undefined") {
  module.exports = RESEARCH;
}
