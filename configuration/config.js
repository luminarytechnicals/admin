const CONFIG = {
  site: {
    name: "Luminary Technicals",
    tagline: "Build. Manage. Scale.",
    url: "https://luminarytechnicals.dpdns.org",
    logo: "assets/images/logo-luminarytechnicals.png",
    favicon: "icons/icon-96.png",
    language: "en",
    themeColor: "#0A0F1E",
    accentColor: "#F5C518",
  },
  owner: {
    name: "AR. Abhinav Ranjan",
    nameFormatted: "AR. Abhinav Ranjan",
    photo: "assets/images/abhinavranjan-owner.png",
    title: "Founder & Lead Developer",
    portfolio: "https://abhinavranjan.netlify.app",
    bio: "AR. Abhinav Ranjan is a self-driven developer, digital architect, and founder of Luminary Technicals — a personal tech ecosystem built to design, manage, and scale meaningful digital e[...]
    message: "\"I didn't build Luminary Technicals to compete — I built it to create. Every division, every project, every line of code is a reflection of what I believe the digital world can be[...]
    skills: ["HTML","CSS","JavaScript","Node.js","Python","UI/UX Design","Cloud Hosting","AI Integration","SEO & AEO","PWA Development","Git & GitHub","Tech Education","Digital Strategy"],
    social: {
      github: "https://github.com/ProAbhinavRanjan",
      instagram: "https://www.instagram.com/ar.abhinavranjan",
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/",
      email: "luminarytechnicals@gmail.com",
      portfolio: "https://abhinavranjan.netlify.app"
    }
  },
  ads: {
    enabled: false,
    provider: "google",
    clientId: "ca-pub-XXXXXXXXXX",
    slots: { banner: "XXXXXXXXXX", sidebar: "XXXXXXXXXX", inArticle: "XXXXXXXXXX" }
  },
  analytics: {
    enabled: false,
    googleAnalyticsId: "G-XXXXXXXXXX",
    clarityId: ""
  },
  seo: {
    defaultTitle: "Luminary Technicals — Build. Manage. Scale.",
    defaultDescription: "Luminary Technicals is a personal tech ecosystem by Abhinav Ranjan focused on digital solutions, development, and innovation.",
    defaultKeywords: "Luminary Technicals, Abhinav Ranjan, tech ecosystem, web development, hosting, AI projects",
    ogImage: "assets/images/og-default.png",
    twitterHandle: "@luminarytechnicals",
    instagram: "https://www.instagram.com/luminary_technicals",
    github: "https://github.com/luminarytechnicals",
    canonicalBase: "https://luminarytechnicals.dpdns.org"
  },
  pwa: {
    enabled: true,
    offlinePage: "/offline.html",
    cacheName: "luminary-v1"
  },
  nav: {
    links: [
      { label: "Home", href: "../index.html" },
      { label: "About", href: "about.html" },
      { label: "Owner", href: "owner.html" },
      { label: "Organs", href: "organs.html" },
      { label: "Collab", href: "collab.html" },
      { label: "FAQ", href: "faq.html" }
    ]
  },
  organs: [
    { id:"servers", name:"Luminary Servers", icon:"🖥️", tagline:"Hosting & Infrastructure", description:"Enterprise-grade hosting, domain management, and cloud infrastructure solutions built [...]
    { id:"developers", name:"Luminary Developers", icon:"⚙️", tagline:"Web Dev & UI/UX", description:"Full-stack web development, responsive design, and modern UI/UX engineering for digital pr[...]
    { id:"cares", name:"Luminary Cares", icon:"💛", tagline:"Support & Community", description:"Dedicated support, tech mentorship, and community-driven initiatives for those navigating the digi[...]
    { id:"kits", name:"Luminary Kits", icon:"📦", tagline:"Project Kits & Collaborations", description:"Ready-made project kits, templates, and collaborative frameworks that accelerate developme[...]
  ],
  projects: [
    { name:"Luminary Webs", category:"Web Platform", description:"The flagship web solutions hub — a curated collection of live digital projects, tools, and web experiments.", url:"#", badge:"Li[...]
    { name:"Luminary Books", category:"Publishing", description:"A growing library of tech-focused books, tutorials, and guides authored and curated by the Luminary ecosystem.", url:"#", badge:"Li[...]
    { name:"Luminary Wishes", category:"Social Tool", description:"A beautifully designed digital wishes platform for events and celebrations — a sub-project of Luminary Webs.", url:"#", badge:"[...]
  ],
  workAreas: [
    { icon:"🌐", label:"Web Dev & UI/UX", description:"Crafting responsive, accessible, and high-performance web experiences." },
    { icon:"☁️", label:"Hosting & Cloud", description:"Reliable infrastructure, cloud deployments, and domain management." },
    { icon:"🤖", label:"AI & Automation", description:"Intelligent automation, AI integration, and smart workflow solutions." },
    { icon:"📖", label:"Tech Education", description:"Publishing guides, tutorials, and educational content for developers." }
  ],
  faqs: {
    general: [
      { q:"What is Luminary Technicals?", a:"Luminary Technicals is a personal tech ecosystem founded by Abhinav Ranjan that builds, manages, and scales digital projects and services across web de[...]
      { q:"Who founded Luminary Technicals?", a:"Luminary Technicals was founded by Abhinav Ranjan, a self-driven developer and digital architect based in India." },
      { q:"Is Luminary Technicals a registered company?", a:"Luminary Technicals is a personal tech ecosystem and brand. It operates as an independent digital entity managed by its founder, Abhina[...]
      { q:"Where is Luminary Technicals based?", a:"Luminary Technicals is based in India and operates primarily in the digital space, serving clients and collaborators globally." },
      { q:"What does 'Build. Manage. Scale.' mean?", a:"It is the core philosophy of Luminary Technicals — build quality digital products, manage them with precision, and scale them for real-wor[...]
    ],
    projects: [
      { q:"What projects does Luminary Technicals manage?", a:"Current live projects include Luminary Webs, Luminary Books, and Luminary Wishes. The ecosystem is continuously expanding." },
      { q:"What is Luminary Webs?", a:"Luminary Webs is the flagship web solutions hub — a curated collection of live digital projects and web tools under the Luminary umbrella." },
      { q:"What is Luminary Wishes?", a:"Luminary Wishes is a beautifully designed digital wishes platform for events and celebrations, developed as a sub-project under Luminary Webs." },
      { q:"What does Luminary Books publish?", a:"Luminary Books publishes tech-focused educational content including developer guides, tutorials, eBooks, and case studies for all skill levels." }[...]
      { q:"Is the website open source?", a:"The Luminary Technicals website is self-built and proprietary. Some individual projects may be open-sourced — check the GitHub profile for available r[...]
    ],
    collab: [
      { q:"How can I collaborate with Luminary Technicals?", a:"You can reach out via the Collab page or email luminarytechnicals@gmail.com. Collaborations are open for web projects, hosting partn[...]
      { q:"What types of collaborations does Luminary accept?", a:"Luminary Technicals accepts collaborations across web development, hosting partnerships, book publishing, AI/automation projects[...]
      { q:"Is there a cost to collaborate?", a:"Collaboration terms vary by project scope and type. Reach out via the Collab form to discuss details specific to your project." },
      { q:"How long does a typical project take?", a:"Project timelines depend on scope and complexity. After an initial discussion, a clear timeline will be provided before any work begins." },
      { q:"Can I submit a book to Luminary Books?", a:"Yes! Luminary Books accepts submissions for tech guides, tutorials, and educational content. Contact via email with your proposal and outlin[...]
    ],
    tech: [
      { q:"What tech stack does Luminary use?", a:"The ecosystem leverages HTML, CSS, JavaScript, Node.js, Python, PWA technologies, cloud hosting, and AI frameworks depending on the project." },
      { q:"What does Luminary Servers offer?", a:"Luminary Servers provides web hosting, domain management, cloud infrastructure, SSL security, and CDN services for digital projects." },
      { q:"Does Luminary work with AI?", a:"Yes. AI integration and automation are core work areas — including AI-powered tools, smart automation workflows, and LLM-based projects." },
      { q:"What kind of websites does Luminary Developers build?", a:"Luminary Developers specialises in full-stack web applications, responsive UI/UX, PWAs, API integrations, and performance-opt[...]
      { q:"Are Luminary websites mobile-friendly?", a:"Absolutely. All Luminary projects are built mobile-first with full responsiveness across all device sizes, from 320px to 4K displays." }
    ],
    legal: [
      { q:"How do I contact the owner?", a:"You can reach Abhinav Ranjan directly at luminarytechnicals@gmail.com or via the social links on the Owner page." },
      { q:"What data does Luminary Technicals collect?", a:"Luminary Technicals collects minimal data — only what is necessary for functionality and communication. Refer to the Privacy Policy f[...]
      { q:"Does Luminary use cookies?", a:"The site uses essential cookies for functionality and optional analytics cookies. You can manage your preferences via the cookie consent banner." },
      { q:"What are the terms of using the website?", a:"By using the Luminary Technicals website, you agree to the Terms of Service, covering acceptable use, intellectual property, and limitatio[...]
      { q:"How is my privacy protected?", a:"Your privacy is a priority. All data handling follows the Privacy Policy, and no personal data is sold to third parties." }
    ]
  },
  contact: {
    email: "luminarytechnicals@gmail.com",
    whatsapp: "+918294721929",
    telegram: "luminarytechnicalsinternational",
    address: "India",
    channels: [
      { id: "whatsapp", label: "Send via WhatsApp", icon: "💬", url: "https://wa.me/918294721929" },
      { id: "email", label: "Send via Email", icon: "📧", url: "mailto:luminarytechnicals@gmail.com" },
      { id: "telegram", label: "Send via Telegram", icon: "✈️", url: "https://t.me/luminarytechnicalsinternational" }
    ]
  },
  legal: {
    privacyUpdated: "2025-01-01",
    termsUpdated: "2025-01-01",
    company: "Luminary Technicals",
    cookieConsent: true
  }
};

window.CONFIG = CONFIG;
