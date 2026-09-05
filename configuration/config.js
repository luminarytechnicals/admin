const CONFIG = {
  site: {
    name: "Luminary Technicals",
    tagline: "Building systems. Advancing ideas. Connecting impact.",
    masterFormula: "POWER. CREATE. EMPOWER. CONNECT. ENGAGE.",
    publicFormula: "BUILD. RESEARCH. SECURE. EMPOWER. CONNECT.",
    legacyTagline: "Build. Manage. Scale.",
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
    photo: "https://abhinavranjan.qzz.io/images/profile.png",
    title: "Founder & Chief Executive",
    portfolio: "https://abhinavranjan.netlify.app",
    bio: "AR. Abhinav Ranjan is the founder of Luminary Technicals and provides its central direction as the organization develops across technology, infrastructure, research, education and public-interest initiatives.",
    message: "\"I didn't build Luminary Technicals to compete — I built it to create. Every organ, every project, every line of code is a reflection of what I believe the digital world can be.\"",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Python", "UI/UX Design", "Cloud Hosting", "AI Integration", "SEO & AEO", "PWA Development", "Git & GitHub", "Tech Education", "Digital Strategy"],
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
    defaultTitle: "Luminary Technicals | Technology, Research, Infrastructure & Social Impact",
    defaultDescription: "Luminary Technicals is a multidisciplinary organization connecting digital infrastructure, technology development, research, cybersecurity, education, public-interest initiatives and an expanding ecosystem of projects and ventures.",
    defaultKeywords: "Luminary Technicals, multidisciplinary technology organization, digital infrastructure, software development, AI development, cybersecurity research, technology education, public interest technology, public affairs research, governance research, Power Create Empower Connect Engage",
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
      { label: "Organization", href: "organization.html" },
      { label: "Organs", href: "organs.html" },
      { label: "Ecosystem", href: "ecosystem.html" },
      { label: "Owner", href: "owner.html" },
      { label: "Projects", href: "projects.html" },
      { label: "Collab", href: "collab.html" },
      { label: "FAQ", href: "faq.html" },
      { label: "Glossary", href: "glossary.html" }
    ]
  },
  organs: [
    {
      id: "servers",
      name: "Luminary Servers",
      coreFunction: "Power.",
      coreAction: "Power",
      icon: "🖥️",
      tagline: "Infrastructure & Digital Systems",
      page: "servers.html",
      description: "Hosting, cloud infrastructure, domains, server systems, digital platforms and the technical foundation supporting connected initiatives across the ecosystem."
    },
    {
      id: "developers",
      name: "Luminary Developers",
      coreFunction: "Create.",
      coreAction: "Create",
      icon: "⚙️",
      tagline: "Technology, Development & Innovation",
      page: "developers.html",
      description: "Software, web platforms, artificial intelligence, automation, digital products, research, emerging technology development, and the Afterverse immersive lab."
    },
    {
      id: "cares",
      name: "Luminary Cares",
      coreFunction: "Empower.",
      coreAction: "Empower",
      icon: "💛",
      tagline: "Education, Community & Social Impact",
      page: "cares.html",
      description: "Technology education, mentorship, digital awareness, community initiatives, public-interest projects and programs designed to create broader social impact."
    },
    {
      id: "kits",
      name: "Luminary Kits",
      coreFunction: "Connect.",
      coreAction: "Connect",
      icon: "📦",
      tagline: "Coordination & Integration",
      page: "kits.html",
      description: "The connective organ of Luminary Technicals — supporting cross-organ collaboration, shared frameworks, developer utilities, project coordination and ecosystem integration."
    },
    {
      id: "federals",
      name: "Luminary Federals",
      coreFunction: "Engage.",
      coreAction: "Engage",
      icon: "🏛️",
      tagline: "Civic & Institutional Initiatives",
      page: "federals.html",
      description: "Public-affairs research, civic engagement, governance and policy studies, institutional programs and public-interest initiatives. Not a government, parliament, police, military, intelligence or UN body."
    }
  ],
  tierArchitecture: {
    tier1: {
      name: "Luminary Technicals",
      role: "Central Identity & Direction",
      description: "Strategic guidance, shared standards, ecosystem governance, and multidisciplinary synthesis."
    },
    tier2: {
      name: "The Five Core Organs",
      functions: [
        { organ: "SERVERS", function: "Power.", page: "servers.html" },
        { organ: "DEVELOPERS", function: "Create.", page: "developers.html" },
        { organ: "CARES", function: "Empower.", page: "cares.html" },
        { organ: "KITS", function: "Connect.", page: "kits.html" },
        { organ: "FEDERALS", function: "Engage.", page: "federals.html" }
      ]
    },
    tier3: {
      name: "Connected Entities",
      types: ["Brands", "Projects", "Programs", "Initiatives", "Ventures"],
      categories: ["Research Programs", "NGOs / Trusts", "Hackathons", "Conferences", "Immersive Labs"],
      description: "A Tier 3 entity can connect to one, several, or all five organs depending on its operational and community requirements.",
      examples: [
        {
          name: "International Technology Conference",
          connections: [
            { organ: "FEDERALS", role: "Institutional Engagement" },
            { organ: "DEVELOPERS", role: "Technology Program" },
            { organ: "KITS", role: "Coordination Integration" }
          ]
        },
        {
          name: "Public Safety Project",
          connections: [
            { organ: "CARES", role: "Community" },
            { organ: "DEVELOPERS", role: "Technology" },
            { organ: "FEDERALS", role: "Public Affairs" }
          ]
        }
      ]
    }
  },
  ecosystem: [
    { name: "Luminary Servers", category: "Core Organ", status: "Operating", description: "Infrastructure and hosting capability powering connected initiatives.", url: "servers.html", connections: ["SERVERS"] },
    { name: "Luminary Developers", category: "Core Organ", status: "Operating", description: "Software, AI engineering, automation, and emerging tech laboratory.", url: "developers.html", connections: ["DEVELOPERS"] },
    { name: "Luminary Afterverse", category: "Immersive Experience & Creative Hub", status: "Operating", description: "Futuristic digital universe, spatial interactive experiences, metaverse architecture and creative tech lab under Luminary Developers.", url: "afterverse.html", connections: ["DEVELOPERS", "SERVERS"] },
    { name: "Luminary Cares", category: "Core Organ", status: "Operating", description: "Digital education, community mentorship and social impact initiatives.", url: "cares.html", connections: ["CARES"] },
    { name: "Luminary Kits", category: "Core Organ", status: "Operating", description: "Shared ecosystem toolkits, coordination frameworks and integration APIs.", url: "kits.html", connections: ["KITS"] },
    { name: "Luminary Federals", category: "Core Organ", status: "Operating", description: "Civic technology, public-affairs research and institutional dialogues.", url: "federals.html", connections: ["FEDERALS"] },
    { name: "Luminary Webs", category: "Web Platform", status: "Operating", description: "The flagship web solutions hub — a curated collection of live digital projects, tools, and web experiments.", url: "#", connections: ["DEVELOPERS", "SERVERS"] },
    { name: "Luminary Books", category: "Publishing", status: "Operating", description: "A growing library of tech-focused books, tutorials, and guides authored and curated by the Luminary ecosystem.", url: "#", connections: ["CARES", "DEVELOPERS"] },
    { name: "Luminary Wishes", category: "Social Tool", status: "Operating", description: "A beautifully designed digital wishes platform for events and celebrations — a sub-project of Luminary Webs.", url: "#", connections: ["DEVELOPERS", "SERVERS"] },
    { name: "Security & AI Research", category: "Research Program", status: "Research & Development", description: "Cybersecurity research, AI experimentation and emerging technology prototypes developed under Luminary Developers.", url: "#", connections: ["DEVELOPERS", "SERVERS", "FEDERALS"] },
    { name: "Educational Institutions & Ventures", category: "Future Initiative", status: "Planned", description: "Long-term ambitions connected to Luminary Cares and Luminary Federals, to be presented as planned until legally established and authorized.", url: "#", connections: ["CARES", "FEDERALS", "KITS"] }
  ],
  principles: [
    { title: "Innovation with purpose", description: "Technology should solve problems, expand knowledge or create meaningful capability." },
    { title: "Responsible research", description: "Research should distinguish between concepts, experiments, prototypes and validated findings." },
    { title: "Security by design", description: "Systems should consider resilience, privacy and security throughout their development." },
    { title: "Knowledge sharing", description: "Education and awareness should make technology more understandable and accessible." },
    { title: "Public responsibility", description: "Technology organizations influence society and should consider their broader impact." },
    { title: "Collaboration", description: "Complex problems require multiple disciplines and connected capabilities." },
    { title: "Transparency", description: "Public descriptions should accurately distinguish operating entities from experimental and future initiatives." }
  ],
  projects: [
    { name: "Luminary Afterverse", category: "Immersive / XR", description: "Next-Gen spatial digital universe, immersive interactive experiments, and creative technology laboratory.", url: "afterverse.html", badge: "New" },
    { name: "Luminary Webs", category: "Web Platform", description: "The flagship web solutions hub — a curated collection of live digital projects, tools, and web experiments.", url: "#", badge: "Live" },
    { name: "Luminary Books", category: "Publishing", description: "A growing library of tech-focused books, tutorials, and guides authored and curated by the Luminary ecosystem.", url: "#", badge: "Live" },
    { name: "Luminary Wishes", category: "Social Tool", description: "A beautifully designed digital wishes platform for events and celebrations — a sub-project of Luminary Webs.", url: "#", badge: "Live" }
  ],
  workAreas: [
    { icon: "☁️", label: "Digital Infrastructure", description: "Hosting, cloud systems, servers, domains and digital platforms." },
    { icon: "⚙️", label: "Technology Development", description: "Software, web systems, AI, automation and digital products." },
    { icon: "🌌", label: "Immersive & Afterverse", description: "Virtual spaces, spatial audio-visual canvas, 3D interactive experiences and digital worlds." },
    { icon: "🔬", label: "Research & Innovation", description: "Technology research, experimentation, algorithms, emerging systems and innovation programs." },
    { icon: "🛡️", label: "Cybersecurity", description: "Defensive security research, secure development, digital resilience and authorized security assessment." },
    { icon: "📖", label: "Education", description: "Technology learning, cybersecurity awareness, publications, mentorship and knowledge-sharing initiatives." },
    { icon: "🤖", label: "Data & AI", description: "Data-driven systems, artificial intelligence, automation and responsible AI development." },
    { icon: "💛", label: "Social Impact", description: "Digital literacy, community programs, public-interest technology and awareness initiatives." },
    { icon: "🏛️", label: "Civic & Public Affairs", description: "Governance research, technology policy, civic engagement and institutional initiatives." }
  ],
  faqs: {
    general: [
      {
        q: "What is Luminary Technicals?",
        a: "Luminary Technicals is a multidisciplinary technology and innovation ecosystem focused on building digital infrastructure, developing software, advancing research, strengthening cybersecurity, enabling education, and creating public-impact initiatives. Its ecosystem is organized around five core organs: Luminary Servers, Luminary Developers, Luminary Cares, Luminary Kits, and Luminary Federals."
      },
      {
        q: "What is the mission of Luminary Technicals?",
        a: "Luminary Technicals aims to build useful technology, develop knowledge, strengthen digital resilience, empower people through education, and connect ideas with practical action. The organization combines technology, research, creativity, and public-interest initiatives under one ecosystem."
      },
      {
        q: "What is the Luminary Technicals Master Formula?",
        a: "The internal Master Formula is 'POWER. CREATE. EMPOWER. CONNECT. ENGAGE.' It represents the five core functions of the ecosystem: Servers provide Power, Developers Create, Cares Empower, Kits Connect, and Federals Engage."
      },
      {
        q: "What is the public-facing Luminary Formula?",
        a: "The public-facing formula is 'BUILD. RESEARCH. SECURE. EMPOWER. CONNECT.' It communicates Luminary's broader purpose: building technology, researching new ideas, improving digital security, empowering people, and connecting technology with communities."
      },
      {
        q: "Who founded Luminary Technicals?",
        a: "Luminary Technicals was founded by AR. Abhinav Ranjan, a developer and digital architect who established the ecosystem to bring technology, research, digital infrastructure, education, and creative projects together."
      },
      {
        q: "Why was Luminary Technicals created?",
        a: "Luminary Technicals was created to move beyond individual technology projects and build a connected ecosystem where infrastructure, software development, research, cybersecurity, education, and social initiatives can work together."
      },
      {
        q: "What does 'Luminary' represent?",
        a: "The name Luminary represents a source of knowledge, direction, and innovation. It reflects the ecosystem's goal of creating technology and ideas that illuminate new possibilities and help people move forward."
      },
      {
        q: "Where is Luminary Technicals based?",
        a: "Luminary Technicals is based in India and operates primarily through digital platforms, allowing its projects, services, research, and collaborations to reach people and organizations beyond geographical boundaries."
      },
      {
        q: "Is Luminary Technicals a company or an organization?",
        a: "Luminary Technicals is an evolving technology and innovation ecosystem operating under the Luminary brand. Individual projects, divisions, or entities may have their own organizational or legal status, which should be verified from their respective official documentation."
      }
    ],

    organs: [
      {
        q: "What are the five core organs of Luminary Technicals?",
        a: "The five core organs are Luminary Servers, Luminary Developers, Luminary Cares, Luminary Kits, and Luminary Federals. Together they cover infrastructure, software creation, empowerment, technology connectivity, and engagement."
      },
      {
        q: "What is Luminary Servers?",
        a: "Luminary Servers is the infrastructure-focused organ of the ecosystem. It deals with hosting, server infrastructure, domains, cloud services, SSL, CDN technologies, deployment, and other digital infrastructure requirements. Core Function: POWER."
      },
      {
        q: "What is Luminary Developers?",
        a: "Luminary Developers is the software and technology creation organ. It focuses on websites, web applications, APIs, PWAs, automation, AI-powered systems, interactive experiences, and experimental digital technologies. Core Function: CREATE."
      },
      {
        q: "What is Luminary Cares?",
        a: "Luminary Cares focuses on empowerment through technology. Its areas may include digital literacy, technology education, community initiatives, awareness programs, and projects designed to make technology more accessible and useful. Core Function: EMPOWER."
      },
      {
        q: "What is Luminary Kits?",
        a: "Luminary Kits focuses on reusable technology resources, development toolkits, integrations, frameworks, utilities, and components that can help developers and projects build and connect digital systems more efficiently. Core Function: CONNECT."
      },
      {
        q: "What is Luminary Federals?",
        a: "Luminary Federals is the engagement and institutional-connectivity organ of the ecosystem. It focuses on collaborations, programs, conferences, initiatives, partnerships, and broader engagement between Luminary and external communities or organizations. Core Function: ENGAGE."
      },
      {
        q: "How do the five organs work together?",
        a: "The organs are designed to complement one another. Servers provide infrastructure, Developers build technology, Cares empower people, Kits provide reusable connections and tools, and Federals create external engagement and partnerships."
      }
    ],

    projects: [
      {
        q: "What projects are part of Luminary Technicals?",
        a: "The ecosystem includes projects and initiatives such as Luminary Afterverse, Luminary Webs, Luminary Books, Luminary Wishes, and other technology, research, infrastructure, educational, and experimental projects. The project portfolio evolves as new initiatives are developed."
      },
      {
        q: "What is Luminary Afterverse?",
        a: "Luminary Afterverse is an experimental digital ecosystem under Luminary Developers exploring immersive computing, interactive 3D environments, digital universes, WebGL, creative interfaces, and next-generation multimedia experiences."
      },
      {
        q: "What is Luminary Webs?",
        a: "Luminary Webs is a web-development and digital-solutions initiative within the Luminary ecosystem. It brings together websites, web applications, digital tools, interactive experiences, and other web-based projects."
      },
      {
        q: "What is Luminary Wishes?",
        a: "Luminary Wishes is a digital platform focused on creating personalized wishes and celebration experiences for events, milestones, and special occasions."
      },
      {
        q: "What is Luminary Books?",
        a: "Luminary Books is the publishing and knowledge initiative of the ecosystem. It focuses on technology-focused books, guides, tutorials, educational resources, developer documentation, and other knowledge-based content."
      },
      {
        q: "Does Luminary Technicals develop its own technology?",
        a: "Yes. Luminary projects are designed and developed using a combination of internally developed software, open-source technologies, third-party services, APIs, frameworks, and infrastructure depending on the requirements of each project."
      },
      {
        q: "Are all Luminary projects publicly available?",
        a: "No. Some projects are publicly accessible, while others may be experimental, private, under development, archived, or intended for specific partners or internal use."
      }
    ],

    services: [
      {
        q: "What services does Luminary Technicals provide?",
        a: "Depending on the project and division, Luminary can work across web development, digital infrastructure, hosting, domain services, automation, AI-powered applications, research, educational technology, digital experiences, and technology partnerships."
      },
      {
        q: "Can Luminary build a website or web application?",
        a: "Yes. Through Luminary Developers, projects can include responsive websites, progressive web applications, dashboards, APIs, interactive platforms, automation systems, and custom web applications."
      },
      {
        q: "Can Luminary provide hosting or infrastructure?",
        a: "Infrastructure-related requirements can be handled through Luminary Servers, depending on availability, project requirements, technical specifications, and applicable service terms."
      },
      {
        q: "Does Luminary work with AI?",
        a: "Yes. AI may be incorporated into projects for automation, intelligent assistants, data processing, recommendation systems, content workflows, research, and other appropriate applications."
      },
      {
        q: "Does Luminary work on cybersecurity?",
        a: "Cybersecurity is an important part of the Luminary ecosystem. Projects may involve secure development practices, infrastructure protection, security research, awareness, and defensive technology. Activities are conducted only within authorized and lawful boundaries."
      },
      {
        q: "Can Luminary develop custom solutions?",
        a: "Yes. Custom solutions may be developed according to the technical requirements, objectives, resources, and scope of a project. Each engagement is evaluated individually before work begins."
      }
    ],

    technology: [
      {
        q: "What technologies does Luminary use?",
        a: "The technology stack varies by project and may include HTML, CSS, JavaScript, Node.js, Python, databases, REST APIs, cloud infrastructure, PWA technologies, WebGL, Canvas, AI frameworks, automation tools, and other modern technologies."
      },
      {
        q: "Does Luminary use open-source software?",
        a: "Yes. Open-source technologies may be used wherever they are technically appropriate. Luminary may also develop proprietary components, tools, systems, and project-specific software."
      },
      {
        q: "Are Luminary projects mobile-friendly?",
        a: "Luminary web projects are designed with responsive and mobile-first principles where applicable, with interfaces intended to work across smartphones, tablets, laptops, desktops, and larger displays."
      },
      {
        q: "Does Luminary support progressive web apps?",
        a: "Yes. Progressive Web App technologies can be used to create fast, installable, responsive web experiences with features such as offline capabilities, caching, and app-like interfaces where supported by the project."
      },
      {
        q: "Does Luminary use cloud infrastructure?",
        a: "Cloud and distributed infrastructure may be used for hosting, deployment, APIs, databases, storage, networking, automation, and other project requirements."
      }
    ],

    collaboration: [
      {
        q: "How can I collaborate with Luminary Technicals?",
        a: "You can contact Luminary Technicals through the official collaboration channel or email luminarytechnicals@gmail.com. Collaboration opportunities may include technology projects, infrastructure partnerships, research, education, hackathons, conferences, publishing, and public-interest initiatives."
      },
      {
        q: "Who can collaborate with Luminary?",
        a: "Developers, researchers, educators, students, creators, organizations, technology communities, institutions, and other individuals or groups with relevant ideas or capabilities may propose collaborations."
      },
      {
        q: "What types of collaborations does Luminary accept?",
        a: "Potential collaborations include software development, hosting and infrastructure, AI and automation, cybersecurity research, educational programs, publishing, technology events, research initiatives, community programs, and other technology-focused projects."
      },
      {
        q: "Is there a cost to collaborate?",
        a: "It depends on the nature of the collaboration. Some initiatives may be voluntary or community-oriented, while professional projects or services may involve fees. Terms are determined according to the scope and requirements of each engagement."
      },
      {
        q: "How long does a project take?",
        a: "There is no single standard timeline. Delivery depends on project complexity, features, technical requirements, resources, testing, revisions, and collaboration requirements. A project-specific timeline can be established after the scope is understood."
      },
      {
        q: "Can I propose an idea to Luminary?",
        a: "Yes. Ideas related to technology, research, education, digital infrastructure, creative computing, cybersecurity, AI, community empowerment, or other relevant areas can be submitted for consideration."
      }
    ],

    publishing: [
      {
        q: "Can I submit a book or article to Luminary Books?",
        a: "Yes. Luminary Books may consider technology-focused books, tutorials, developer guides, educational resources, research-oriented content, and other relevant technical publications."
      },
      {
        q: "What topics can be submitted to Luminary Books?",
        a: "Potential topics include programming, web development, AI, cybersecurity, networking, software engineering, digital technologies, science and technology education, research, and practical technical guides."
      },
      {
        q: "How do I submit content for publication?",
        a: "Send a proposal, outline, sample material, or relevant manuscript information through the official Luminary Books contact channel. Submissions are reviewed according to the project's editorial and publishing requirements."
      }
    ],

    ownership: [
      {
        q: "Who is behind Luminary Technicals?",
        a: "Luminary Technicals was founded and is led by AR. Abhinav Ranjan. The wider ecosystem may involve contributors, collaborators, developers, researchers, creators, and partner organizations depending on the project."
      },
      {
        q: "Is Luminary Technicals the same as Luminary Developers?",
        a: "No. Luminary Technicals is the broader ecosystem, while Luminary Developers is one of its core organs focused specifically on software and technology creation."
      },
      {
        q: "Is Luminary Technicals the same as Luminary Servers?",
        a: "No. Luminary Servers is the infrastructure-focused organ within the broader Luminary Technicals ecosystem."
      },
      {
        q: "Can projects have their own identity?",
        a: "Yes. Individual Luminary projects may have their own names, identities, websites, technologies, teams, and operational structures while remaining part of or associated with the wider ecosystem."
      }
    ],

    legal: [
      {
        q: "Is Luminary Technicals legally registered?",
        a: "Luminary Technicals operates as an evolving organizational ecosystem and brand. The legal status of any specific entity, service, or project should be determined from its own official documentation rather than assumed from its association with the Luminary brand."
      },
      {
        q: "How can I contact Luminary Technicals?",
        a: "For general inquiries, collaborations, project discussions, and official communication, contact Luminary Technicals through its official contact channels or at luminarytechnicals@gmail.com."
      },
      {
        q: "What information does Luminary Technicals collect?",
        a: "Luminary Technicals aims to collect only the information reasonably necessary to provide website functionality, respond to communications, operate services, improve experiences, or meet applicable requirements. The Privacy Policy provides the definitive details."
      },
      {
        q: "Does Luminary Technicals use cookies?",
        a: "The website may use essential cookies or similar technologies required for functionality and, where enabled, analytics or preference-related technologies. Available choices and purposes are described through the site's cookie controls and Privacy Policy."
      },
      {
        q: "How is my personal information protected?",
        a: "Luminary Technicals aims to handle personal information responsibly and apply reasonable security measures appropriate to the nature of the information and service. Details about collection, use, storage, sharing, and rights are provided in the Privacy Policy."
      },
      {
        q: "Does Luminary sell personal data?",
        a: "Luminary Technicals does not intend to sell personal information to third parties. Any data processing or sharing is governed by the applicable Privacy Policy and the requirements of the relevant service."
      },
      {
        q: "What are the Terms of Service?",
        a: "The Terms of Service establish the rules governing use of Luminary websites, services, content, intellectual property, user responsibilities, limitations, and other applicable conditions."
      }
    ],

    future: [
      {
        q: "Is Luminary Technicals still growing?",
        a: "Yes. Luminary Technicals is designed as an evolving ecosystem. New projects, technologies, research initiatives, services, collaborations, and organizational programs may be introduced as the ecosystem develops."
      },
      {
        q: "What is the future vision of Luminary Technicals?",
        a: "The long-term vision is to develop a connected technology ecosystem where infrastructure, software, research, cybersecurity, education, creativity, and public-interest initiatives can operate together while remaining open to new ideas and collaborations."
      },
      {
        q: "Can I follow Luminary's latest projects?",
        a: "Yes. New projects, announcements, publications, experiments, and initiatives can be followed through Luminary Technicals' official website and verified social or project channels."
      }
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
    privacyUpdated: "2026-01-01",
    termsUpdated: "2026-01-01",
    company: "Luminary Technicals",
    cookieConsent: true
  }
};

window.CONFIG = CONFIG;
