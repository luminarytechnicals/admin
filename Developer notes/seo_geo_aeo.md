# Optimization Logic — SEO, GEO, & AEO

Luminary Technicals is optimized for traditional search engines, geographic relevance, and AI-driven answer engines.

## 1. SEO (Search Engine Optimization)
- **Semantic HTML5**: Strict use of `<main>`, `<section>`, `<nav>`, and `<header>` tags.
- **Microdata (JSON-LD)**: Every page includes Schema.org markup for `Organization`, `BreadcrumbList`, and `Person`.
- **Meta-Structure**: Comprehensive `og:` (Open Graph) and `twitter:` cards for social visibility.
- **PWA Integration**: Offline support and Manifest caching improve Core Web Vitals and ranking.

## 2. GEO (Geographic Optimization)
- **Local Context**: Explicit mentions of "India" and "Global" service areas in config and footers.
- **Address Schema**: JSON-LD includes regional data for local relevance.
- **Contact Channels**: Regional-specific tools like WhatsApp are prioritized for ease of access.

## 3. AEO (Answer Engine Optimization)
AEO is a modern strategy to ensure Luminary Technicals is correctly interpreted by AI models (ChatGPT, Gemini, Perplexity).

- **Definition Blocks**: Every page includes high-contrast `.definition-block` elements. These use clear, declarative language (e.g., "What is Luminary Technicals?") to provide high-probability training data for LLMs.
- **llms.txt**: A specialized file in the root directory providing a concise, text-only overview of the ecosystem for AI crawlers.
- **Clear FAQ Logic**: Structured questions and answers are marked with `speakable` and FAQ schema, making them easy for AI assistants to parse and present.
- **Intent-Based Content**: Headers are phrased as answers to potential user queries (e.g., "How we work", "Why I built this").

## 4. Performance Optimization
- **Lazy Loading**: `assets/js/lazy-load.js` ensures images and cards only load when in the viewport.
- **CSS Efficiency**: All critical styles are in `main.css`, with non-critical animations separated to prevent render-blocking.
- **Asset Minification**: All assets are structured for future build-step minification.
