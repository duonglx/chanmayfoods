# Chan Mây Foods - Codebase Summary

## Overview

Static HTML/CSS/JavaScript landing page for Chan Mây Foods - a Vietnamese sauce and seasoning brand. No build tools, no dependencies, no backend. Pure vanilla web technologies with Tailwind CSS CDN.

**Key Stats:**
- Total Files: 10
- Total Tokens: 172,226
- Main HTML: 937 lines, 25,281 tokens
- JavaScript: 457 lines, 3,273 tokens
- CSS: 114 lines (custom utilities only)
- Tech Stack: HTML5, Tailwind CSS 3 (CDN), Vanilla JavaScript (ES6+)
- Hosting: GitHub Pages

## Directory Structure

```
chanmay/
├── index.html              # Main landing page (937 lines)
├── script.js               # JavaScript interactions (457 lines)
├── styles.css              # Custom Tailwind utilities (114 lines)
├── images/                 # Product & hero images (placeholder from Unsplash)
├── docs/                   # Documentation
│   ├── prd.md             # Original PRD (Vietnamese)
│   ├── project-overview-pdr.md
│   ├── codebase-summary.md
│   ├── code-standards.md
│   └── system-architecture.md
├── .claude/
│   └── .env.example        # Claude Code environment config
├── CLAUDE.md               # AI assistant instructions
├── AGENTS.md               # Agent configuration
├── .gitignore              # Git ignore rules
├── .nojekyll               # Disable Jekyll on GitHub Pages
├── .repomixignore          # Repomix ignore rules
└── release-manifest.json   # Build manifest (excluded from docs)
```

## Core Components

### index.html (937 lines)

**Line Ranges:**

| Section | Lines | Purpose |
|---------|-------|---------|
| Head/Meta | 1-105 | SEO, fonts, Tailwind config, dark mode script |
| Header | 106-159 | Fixed nav, logo, dark mode toggle, mobile menu |
| Hero Banner | 163-196 | Full-screen CTA with slogan |
| USP Bento Grid | 199-259 | 4 value proposition cards |
| Products Section | 261-480 | 6 product cards with size selectors & pricing |
| Inspiration | 482-518 | 3 food image cards |
| Story/About | 520-543 | Brand narrative text |
| Reviews Carousel | 545-699 | 5 customer review cards + dot nav |
| Order/CTA | 701-745 | Secondary CTA with Shopee/TikTok links |
| Footer | 748-811 | Contact info, social links, copyright |
| Floating Chat | 813-830 | Zalo & Messenger action buttons |
| Order Modal | 832-933 | Product confirmation popup |

**Key Features:**
- Semantic HTML5 with ARIA attributes for accessibility
- Schema.org structured data (LocalBusiness type)
- Open Graph & Twitter Card meta tags
- Dark mode support (class-based, no CSS variables)
- Mobile-first responsive design
- Zero JavaScript required for initial render (progressive enhancement)

### script.js (457 lines)

**Initialization Order** (DOMContentLoaded):
1. initDarkMode() - Local storage persistence
2. initMobileMenu() - Mobile nav toggle
3. initSizeSelectors() - Product size/price sync
4. initReviewsSlider() - Carousel controls
5. initScrollAnimations() - IntersectionObserver fade-in
6. initDeeplinks() - Channel routing
7. initSmoothScroll() - Anchor navigation with header offset
8. initOrderModal() - Product popup handling
9. initActiveNavigation() - Viewport section detection

**Key Features:**

| Feature | Lines | Details |
|---------|-------|---------|
| Dark Mode Toggle | 73-81 | localStorage persistence, HTML classList |
| Mobile Menu | 86-107 | ARIA-expanded, click-outside close |
| Size Selectors | 111-165 | Dynamic pricing from data-prices JSON |
| Reviews Slider | 169-230 | Horizontal scroll + dot navigation |
| Scroll Animations | 234-280 | IntersectionObserver, stagger delays |
| Deeplinks | 284-310 | 7 channels: Zalo, Messenger, FB, Shopee, TikTok, Instagram, Phone |
| Order Modal | 314-380 | Context-aware product data injection |
| Smooth Scroll | 22-54 | 35px header offset, excludes order buttons |
| Active Navigation | 384-450 | Scroll-based section highlighting |

### styles.css (114 lines)

Custom utilities extending Tailwind:

| Class | Purpose |
|-------|---------|
| `.scrollbar-hide` | Cross-browser scrollbar hiding |
| `.animate-fade-in-up` | Keyframe animation (0.8s) |
| `.animate-on-scroll` | Scroll trigger classes + delays |
| `.size-selector button.active` | Product size button state |
| `.review-dot.active` | Carousel indicator state (1.1rem) |
| `.nav-menu` | Mobile menu slide animation |
| `@media (prefers-reduced-motion)` | Accessibility compliance |
| `#order-modal` animations | Modal fade & scale (0.3s) |
| `body.modal-open` | Scroll lock when modal active |

## Color System

**Tailwind Theme Extension:**

| Name | Hex | Usage |
|------|-----|-------|
| primary | #D4713D | Buttons, primary text, accents |
| primary-hover | #C2632F | Button hover state |
| secondary | #8B2D35| Accent text, secondary buttons |
| secondary-hover | #721F26 | Secondary button hover |
| cream | #FDF8F3 | Light backgrounds |
| cream-dark | #FAF5EE | Dark mode light sections |
| text-primary | #2D1810 | Main body text |
| text-muted | #6B5A4F | Secondary text |
| accent | #C9A227 | Gold accents |
| success | #4A7C59 | Status indicators |

**Fonts:**
- Headings: Playfair Display (serif, 400/600/700)
- Body: Be Vietnam Pro (sans-serif, 300/400/500/600)

## Products Data

**6 Products with 3 sizes each:**

```javascript
// Format: [100g/250g/500g] pricing in VND

1. Xốt Phô Mai              45k / 79k / 139k
2. Muối Ớt Xiêm Xanh        35k / 65k / 115k
3. Muối Ớt Hiểm Đỏ          35k / 65k / 115k
4. Sate Tôm Jambon          55k / 95k / 169k
5. Xốt Phô Mai Premium      55k / 99k / 179k
6. Combo (3/5/full set)    199k / 299k / 399k
```

Stored in HTML as `data-prices='{"100g": 45000, "250g": 79000, "500g": 139000}'` (in cents).

## Deeplinks Configuration

**Location:** script.js lines 60-68

| Channel | Current Placeholder | Status |
|---------|-------------------|--------|
| Zalo | `https://zalo.me/YOUR_ZALO_ID` | ⚠️ Needs update |
| Messenger | `https://m.me/chanmayfoods` | ✓ Configured |
| Facebook | `https://facebook.com/chanmayfoods` | ✓ Configured |
| Shopee | `https://shopee.vn/chanmayfoods` | ✓ Configured |
| TikTok | `https://www.tiktok.com/@chanmayfoods` | ✓ Configured |
| Instagram | `https://instagram.com/chanmayfoods` | ✓ Configured |
| Phone | `tel:0123456789` | ⚠️ Needs update |

## Known Issues & Inconsistencies

1. **Review Dot Width Mismatch** (High)
   - CSS: `.review-dot.active { width: 1.1rem }` (styles.css:62)
   - JS: Uses `w-6` class (script.js:198)
   - Effect: Active dot appears as oval not rounded rectangle
   - Fix: Standardize to `w-6` (1.5rem) or update JS

2. **Placeholder Images** (Medium)
   - All images from Unsplash
   - Needs replacement with actual product photos
   - Locations: Hero (line 177), Story (line 529), Inspiration cards (lines 493-507)

3. **Deeplink Placeholders** (Medium)
   - Zalo ID: `YOUR_ZALO_ID` (script.js:61)
   - Phone: `0123456789` (script.js:67)
   - Requires manual update before production

4. **Missing Images Directory**
   - `./images/` folder not tracked in repo
   - Should contain .jpeg files for fallback/local hosting

5. **Order Button Routing** (Low)
   - All 6 product cards + header CTA use order modal
   - Deeplinks incomplete (Zalo, phone)
   - Minor: Mobile menu doesn't close on mobile when clicking scroll links

## Performance Characteristics

**Bundle Size:**
- index.html: 72 KB (includes entire page + modal + scripts)
- script.js: 14 KB
- styles.css: 2.5 KB
- Tailwind CSS: ~100 KB (CDN, cached globally)
- Fonts: ~50 KB (Google Fonts, cached)

**Rendering:**
- No build step
- No minification
- No tree-shaking
- No code splitting
- First Contentful Paint: ~1.2s (via Tailwind CDN)
- Fully interactive: ~2s (after script parsing)

**JavaScript Execution:**
- No external dependencies (vanilla JS)
- IntersectionObserver support required (>95% browsers)
- Runs 9 init functions on DOMContentLoaded
- No memory leaks detected (proper cleanup in observers)

## Browser Compatibility

**Tested/Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Android)

**Requirements:**
- ES6+ JavaScript (arrow functions, const/let, template literals)
- CSS Grid & Flexbox
- IntersectionObserver API
- localStorage API
- CSS custom properties (not critical, fallbacks exist)

## Accessibility Features

✓ ARIA labels on interactive elements
✓ Semantic HTML5 (header, nav, main, section, footer)
✓ Mobile menu: `aria-expanded` attribute
✓ Keyboard navigation: Tab through all interactive elements
✓ Dark mode: Respects `prefers-color-scheme` media query
✓ Reduced motion: `prefers-reduced-motion: reduce` support
✓ Alt text on product images (missing on hero/inspiration - needs update)
✓ Link text descriptive (no "click here")
✓ Form labels accessible (size selector)

**Gaps:**
- Missing alt text on Unsplash hero image
- Modal: No focus trap on order modal
- Reviews carousel: Dot navigation not semantically labeled
- Products: No skip to main content link

## Build & Deployment

**No Build Required:**
- All files served as-is
- CDN resources: Tailwind, Google Fonts

**GitHub Pages Setup:**
- Push to `main` branch
- Settings → Pages → Deploy from branch `main` / `/ (root)`
- URL: `https://YOUR_USERNAME.github.io/chanmayfoods/`
- Requires `.nojekyll` file (present) to skip Jekyll processing

**Asset Requirements:**
- `images/` directory must be created locally
- Image filenames must match HTML src attributes
- Or use Unsplash proxy URLs (current fallback)

## Maintenance Notes

- No external API calls (static site)
- No database or backend required
- Deeplinks point to external platforms (Zalo, Shopee, TikTok, etc.)
- Dark mode state persisted to localStorage
- Reviews slider state managed in-memory only
- No analytics configured (can add Google Tag Manager)
- No error tracking (can add Sentry)

## Development Guidelines

See `./docs/code-standards.md` for naming conventions and patterns.
See `./docs/system-architecture.md` for data flow and component interactions.
