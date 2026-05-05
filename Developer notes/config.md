# Centralized Configuration Logic — config.js

Luminary Technicals uses a single source of truth (SSOT) architecture for site-wide variables and dynamic content.

## 1. Location
- **Primary Config**: `configuration/config.js`
- **Exposure**: Bound to `window.CONFIG` for global access.

## 2. Structural Breakdown
The `CONFIG` object is divided into logical nodes:

- **`site`**: Branding assets (Logo, Favicon, Theme Colors).
- **`owner`**: Founder's bio, skills, and personal social handles.
- **`seo`**: Default meta tags, OG images, and Twitter handles.
- **`organs`**: Data-driven descriptions for the 4 core divisions.
- **`projects`**: Dynamic list of ecosystem products.
- **`faqs`**: Tab-categorized help data.
- **`contact`**: Verified communication routes (WhatsApp, Telegram, Email).

## 3. Usage in Ecosystem
### Social Links & Forms
Scripts like `assets/js/contact.js` consume `CONFIG.contact` to generate dynamic WhatsApp/Telegram URLs. This allows updating a phone number in ONE place instead of 10+ HTML files.

### Global Branding
Components can pull `CONFIG.site.name` or `CONFIG.site.tagline` to ensure consistency across the ecosystem.

### SEO Injection
While static meta tags exist in HTML for performance, dynamic scripts can use `CONFIG.seo` to update document properties or handle complex social sharing.

## 4. Maintenance Rule
**CRITICAL**: Do NOT modify structural values (keys) unless you update all consuming scripts (`main.js`, `contact.js`, `search.js`). Only modify values (strings, arrays) to update site content.
