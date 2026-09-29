# Luminary Technicals — Internal Developer Documentation

Welcome to the internal engineering and logic documentation for the Luminary Technicals ecosystem. These documents define architectural decisions, algorithmic standards, and maintenance protocols.

---

## 📚 Documentation Index

1. **[Search Engine Logic (LSE)](search.md)**
   - Tokenized multi-word search scoring algorithm, indexing protocol, keyboard accessibility (`Ctrl+K`, `Cmd+K`, `/`), dynamic category filter chips, and URL query auto-search.
2. **[Configuration SSOT (Single Source of Truth)](config.md)**
   - Centralized data management via `configuration/config.js` for ads, analytics, social handles, and metadata.
3. **[Optimization: SEO, GEO & AEO](seo_geo_aeo.md)**
   - Strategies for Traditional Search Engines (Google/Bing), Geographic Entity Signals (India / Global), and AI Answer Engines (ChatGPT, Claude, Perplexity, Gemini) via structured JSON-LD schemas, `llms.txt`, and semantic metadata.

---

## 🛠️ Quick Verification Commands

```powershell
# Validate search index integrity & URL paths
node -e "const fs = require('fs'); const index = JSON.parse(fs.readFileSync('configuration/search-index.json', 'utf8')); console.log('Indexed entries:', index.length);"

# Syntax check core JavaScript files
node --check assets/js/search.js; node --check service-worker.js; node --check assets/js/main.js
```

---
*Maintained by Luminary Technicals — Building systems. Advancing ideas. Connecting impact.*
