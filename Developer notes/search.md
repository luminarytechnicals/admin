# Luminary Search Engine (LSE) — Logic Documentation

The Luminary Technicals ecosystem uses a custom-built, lightweight client-side search engine designed for speed, granular navigation, and premium UX.

## 1. Core Architecture
- **Index Store**: `configuration/search-index.json`
- **Logic Engine**: `assets/js/search.js`
- **UI Components**: `.search-overlay` in every HTML file.

## 2. Indexing Logic
The index is a flat JSON array of objects. Each object contains:
- `title`: The primary name of the item.
- `url`: The relative path (supports anchors like `#section`).
- `text`: Granular description/content for body matching.
- `keywords`: Meta-tags for invisible matching.

## 3. Search Algorithm (Scoring)
The engine uses a tokenized multi-word weighted scoring system to ensure deep relevance:
- **Exact Title Match**: +150 points
- **Title Starts With**: +80 points
- **Title Includes Phrase**: +40 points
- **Title Token Match**: +25 points per word token
- **Keywords Token Match**: +15 points per word token
- **Body Text Token Match**: +8 points per word token
- **All-Tokens Bonus**: +30 points bonus when all query words match

## 4. UI/UX Features
### Smart Excerpts & Highlighting
The engine finds the position of the query in the `text` field and extracts context centered around the match, using the `<mark>` tag to highlight matched query tokens.

### Category Filter Chips
Users can filter live results by:
- **All** (Entire ecosystem)
- **Organs** (Core 5 Organs)
- **Projects** (AgroScan, Afterverse, Webs, Wishes)
- **Research** (Whitepapers & testbeds)
- **Docs** (Resources & Glossary)
- **Legal** (Privacy, Terms, Policies)

### Instant Suggestions & Auto-Search
- Opening search with empty input shows curated quick jumps.
- URL query parameter support: `?q=query` opens the search modal and executes immediately.

## 5. Keyboard Accessibility
- `Ctrl+K` / `Cmd+K` or `/`: Open search
- `Esc`: Close search
- `ArrowDown/Up`: Navigate results (circular)
- `Enter`: Navigate to selected result

## 6. Maintenance
To add new content, simply update `configuration/search-index.json`. No JS changes are required for new pages or sections.
