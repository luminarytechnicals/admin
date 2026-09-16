/**
 * faq.js — Luminary Technicals 11-Category FAQ Center (SSOT)
 * Canonical Organizational Structure V2
 */
const FAQ_DATA = {
  general: [
    {
      q: "What is Luminary Technicals?",
      a: "Luminary Technicals is a multidisciplinary organization connecting digital infrastructure, technology development, research, cybersecurity, education, and public-interest initiatives. It operates as the central public knowledge hub for an ecosystem organized around five core organs and supported by direct associated entities."
    },
    {
      q: "Who founded Luminary Technicals?",
      a: "Luminary Technicals was founded and is led by AR. Abhinav Ranjan, who serves as Founder & CEO. He provides strategic direction, technological architecture, and executive leadership across the ecosystem."
    },
    {
      q: "What is the primary domain and location of Luminary Technicals?",
      a: "The primary domain is https://luminarytechnicals.dpdns.org. The organization is based in India and operates globally across digital platforms."
    },
    {
      q: "What are the two official formulas of Luminary Technicals?",
      a: "The public-facing formula is 'BUILD. RESEARCH. SECURE. EMPOWER. CONNECT.' communicating purpose to the world. The internal operating formula is 'POWER. CREATE. EMPOWER. CONNECT. ENGAGE.' corresponding to the five core organs (Servers, Developers, Cares, Kits, and Federals)."
    }
  ],

  organization: [
    {
      q: "How is Luminary Technicals structured?",
      a: "Luminary Technicals is organized around exactly five core organs: Luminary Servers, Luminary Developers, Luminary Cares, Luminary Kits, and Luminary Federals. It is supported by directly associated entities, most notably Luminary Trust."
    },
    {
      q: "Is Luminary Trust one of the core organs?",
      a: "No. Luminary Trust is NOT one of the five core organs. It is a direct top-level associated entity of Luminary Technicals dedicated to public-interest, philanthropic, and scientific foundations, including the Radhika Research Foundation."
    },
    {
      q: "Is Luminary Trust part of Luminary Cares or Luminary Kits?",
      a: "No. Luminary Trust is not subordinate to Luminary Cares, Luminary Kits, or any other organ. It maintains a direct top-level relationship with Luminary Technicals."
    },
    {
      q: "What is the difference between Core Organs and Associated Entities?",
      a: "Core Organs are the five operational pillars responsible for daily technological, infrastructure, educational, connective, and civic functions. Associated Entities (such as Luminary Trust) are independent, top-level bodies dedicated to public-interest and philanthropic missions."
    }
  ],

  organs: [
    {
      q: "What are the five core organs and their functions?",
      a: "1. Luminary Servers (POWER): Cloud, hosting, VPS, DNS, AI infrastructure.<br>2. Luminary Developers (CREATE): Software engineering, AI, web applications, and Luminary Afterverse.<br>3. Luminary Cares (EMPOWER): Tech education, digital literacy, and community mentorship.<br>4. Luminary Kits (CONNECT): Shared developer tools, APIs, and collaborations like Luminary Webs.<br>5. Luminary Federals (ENGAGE): Public engagement, civic tech research, and the Luminary News wire."
    },
    {
      q: "What is the role of Luminary Federals?",
      a: "Luminary Federals is the fifth core organ (ENGAGE). It focuses on public communication, institutional engagement, civic technology research, and operates the official Luminary News platform. It is strictly a non-governmental, civic entity."
    },
    {
      q: "Where does Luminary News belong?",
      a: "Luminary News is an official initiative and communication platform operated under Luminary Federals. It is not an organ, nor is it under Luminary Trust or Luminary Cares."
    }
  ],

  trust: [
    {
      q: "What is Luminary Trust?",
      a: "Luminary Trust is a direct associated entity of Luminary Technicals, operating independently from the operational organs to advance public-welfare missions, philanthropy, and scientific inquiry."
    },
    {
      q: "What is the Radhika Research Foundation?",
      a: "The Radhika Research Foundation is an institutional research initiative associated with and operating under Luminary Trust, focused on public-good scientific and social research."
    },
    {
      q: "How does Luminary Trust collaborate with Luminary Cares?",
      a: "Luminary Trust and Luminary Cares may collaborate on community-impact initiatives where educational programs intersect with public-interest missions, but they maintain distinct organizational identities without a parent-child hierarchy."
    }
  ],

  projects: [
    {
      q: "What is AgroScan?",
      a: "AgroScan is an AI-driven agricultural diagnostic platform developed under Luminary Developers. It uses Computer Vision and low-cost IoT field sensors to detect crop diseases early and provide tailored treatment guidelines. It is currently in active engineering under the AgroScan Revival Program 2027."
    },
    {
      q: "What is Luminary Afterverse?",
      a: "Luminary Afterverse is an experimental creative technology laboratory incubated under Luminary Developers, exploring 3D interactive digital worlds, WebGL spatial canvases, and sensory user interfaces."
    },
    {
      q: "What is Luminary Webs and where does it belong?",
      a: "Luminary Webs is a curated web solutions directory and platform established as an official collaboration under Luminary Kits, powered through the wider Luminary technical infrastructure."
    },
    {
      q: "What is Luminary Wishes?",
      a: "Luminary Wishes is a digital milestone and celebration greetings platform operated as a sub-project of Luminary Webs."
    },
    {
      q: "What is Luminary AI?",
      a: "Luminary AI is a development and research initiative under Luminary Developers focusing on autonomous multi-agent systems, localized LLM reasoning, and edge model inference."
    }
  ],

  technology: [
    {
      q: "What technology stack powers Luminary Technicals?",
      a: "The platform is built using semantic HTML5, modern vanilla CSS3 design tokens, and modular ES6+ JavaScript with zero heavy framework bloat. It incorporates WebGL, HTML5 Canvas, and offline-first Progressive Web App (PWA) standards."
    },
    {
      q: "Is the website a Progressive Web App (PWA)?",
      a: "Yes. The website features a full Web App Manifest and an intelligent Service Worker (`luminary-v5`), allowing offline browsing of previously visited pages and an offline shell."
    },
    {
      q: "Why does Luminary prioritize vanilla web standards over heavy frameworks?",
      a: "Vanilla standards maximize loading speeds (sub-100ms FCP), eliminate dependency security vulnerabilities, ensure long-term architectural stability, and provide unrestricted control over design aesthetics."
    }
  ],

  research: [
    {
      q: "What research areas does Luminary Technicals pursue?",
      a: "Primary research disciplines include: Agricultural Artificial Intelligence & Edge Sensing (AgroScan), Distributed Cloud Infrastructure & Anycast DNS Resilience, Spatial Computing & WebGL Sensory Interfaces (Afterverse), and Sovereign Digital Governance Systems (Federals)."
    },
    {
      q: "Can researchers access Luminary whitepapers?",
      a: "Yes. Whitepapers, experiment logs, and research methodologies are published openly on the Research portal and archived for academic review."
    }
  ],

  collaboration: [
    {
      q: "Who can collaborate with Luminary Technicals?",
      a: "We welcome developers, researchers, academic institutions, open-source contributors, creators, and partner organizations interested in digital infrastructure, AI, education, or public-interest technology."
    },
    {
      q: "How do I initiate a collaboration?",
      a: "Visit the Collaborate page (/frontend/collab.html) to choose your collaboration pathway (Developer, Organization, Researcher, Creator, Partner) or reach out directly at luminarytechnicals@gmail.com."
    }
  ],

  infrastructure: [
    {
      q: "What infrastructure capabilities does Luminary Servers provide?",
      a: "Luminary Servers operates high-availability bare-metal nodes, cloud VPS clusters, automated Anycast DNS resolution, SSL provisioning, and distributed edge caching mesh."
    },
    {
      q: "Does Luminary provide server management or web hosting?",
      a: "Yes. Infrastructure solutions and web hosting are provided through Luminary Servers and collaborative projects such as Luminary Webs."
    }
  ],

  security: [
    {
      q: "What security measures protect the Luminary platform?",
      a: "The platform enforces strict Content Security Policies (CSP), HTTP Strict Transport Security (HSTS), nosniff headers, input sanitization, and cryptographic data handling without public exposure of sensitive secrets."
    },
    {
      q: "How do I report a security vulnerability?",
      a: "Security disclosures should be sent directly to luminarytechnicals@gmail.com with relevant reproduction details. We review and remediate authorized vulnerability reports promptly."
    }
  ],

  contact: [
    {
      q: "What are the official contact channels?",
      a: "Email: luminarytechnicals@gmail.com<br>WhatsApp: +91 8294721929<br>Telegram: @luminarytechnicalsinternational<br>GitHub: github.com/DeveloperAbhinav<br>Founder: AR. Abhinav Ranjan (abhinavranjan.netlify.app)"
    }
  ]
};

if (typeof window !== "undefined") {
  window.FAQ_DATA = FAQ_DATA;
}
if (typeof module !== "undefined") {
  module.exports = FAQ_DATA;
}
