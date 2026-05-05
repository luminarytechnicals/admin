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
The engine uses a weighted scoring system to ensure relevance:
- **Exact Title Match**: +100 points
- **Title Starts With**: +50 points
- **Title Includes**: +20 points
- **Keywords Match**: +30 points
- **Body Text Match**: +10 points

## 4. UI/UX Features
### Smart Excerpts
The engine finds the position of the query in the `text` field and extracts 120 characters centered around the match, ensuring the user sees why the result was returned.

### Highlighting
The `<mark>` tag is used via Regex to highlight the query in both titles and excerpts.

### Category Badges
Categories are dynamically assigned based on the URL structure:
- `#` -> **Section**
- `projects.html` -> **Project**
- `organs.html` -> **Division**
- `collab.html` -> **Collab**
- Others -> **Page**

## 5. Keyboard Accessibility
- `/`: Open search
- `Esc`: Close search
- `ArrowDown/Up`: Navigate results (circular)
- `Enter`: Navigate to selected result

## 6. Maintenance
To add new content, simply update `configuration/search-index.json`. No JS changes are required for new pages or sections.
