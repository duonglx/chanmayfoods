# Chan Mây Foods - Code Standards

## Overview

Code standards for maintaining consistency across the vanilla HTML/CSS/JavaScript landing page. This is a static site—no frameworks, no build tools, no runtime dependencies.

## HTML Standards

### Structure

**File:** `index.html` (937 lines)

```html
<!-- Line 1-32: DOCTYPE, html tag, language attr -->
<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
  <head>
    <!-- Meta tags, SEO, Tailwind config -->
  </head>
  <body>
    <!-- Content sections -->
  </body>
</html>
```

### Naming Conventions

| Element Type | Convention | Example |
|--------------|-----------|---------|
| IDs (unique) | kebab-case, semantic | `id="hero"`, `id="products"`, `id="order-modal"` |
| Classes | kebab-case, component-scoped | `class="order-btn"`, `class="size-selector"` |
| Data attributes | kebab-case, scoped prefix | `data-prices='{"100g": 45000}'`, `data-product-id` |
| Section IDs | Single word, page navigation | `id="hero"`, `id="story"`, `id="reviews"` |

### Meta Tags & SEO

**Required in `<head>`:**

```html
<!-- Charset & viewport (mobile-first) -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- SEO -->
<meta name="robots" content="index, follow">
<meta name="author" content="Chan Mây Foods">
<meta name="description" content="...">
<meta name="keywords" content="...">
<meta name="theme-color" content="#D4713D">

<!-- Canonical (for production domain) -->
<link rel="canonical" href="https://chanmayfoods.vn/">

<!-- Open Graph (social sharing) -->
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">

<!-- Schema.org (structured data) -->
<script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "LocalBusiness", ... }
</script>
```

### Semantic HTML

```html
<!-- Use semantic elements, not divs -->
<header>...</header>
<nav>...</nav>
<main>
  <section id="hero">...</section>
  <section id="products">...</section>
</main>
<footer>...</footer>

<!-- NOT -->
<div class="header">...</div>
<div class="nav">...</div>
```

### Accessibility

```html
<!-- ARIA labels for interactive elements -->
<button
  id="theme-toggle"
  aria-label="Toggle dark mode"
  aria-pressed="false"
>🌙</button>

<!-- Mobile menu -->
<button
  class="menu-toggle"
  aria-expanded="false"
  aria-controls="nav-menu"
>☰</button>
<nav class="nav-menu" id="nav-menu">...</nav>

<!-- Alt text on images -->
<img src="..." alt="Product name description">

<!-- Form labels linked to inputs -->
<label for="size-selector">Select size:</label>
<select id="size-selector">...</select>
```

## CSS Standards

### File Structure

**File:** `styles.css` (114 lines)

```css
/* ===========================================
   Section Header
   =========================================== */

/* Specific utility or component */
.class-name {
  property: value;
}

/* Responsive/pseudo-class variant */
@media (condition) {
  .class-name { }
}
```

### Tailwind Integration

**Priority: Tailwind classes > custom utilities > inline styles**

```html
<!-- GOOD: Use Tailwind classes -->
<button class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
  Order
</button>

<!-- OKAY: Custom utility for cross-browser compatibility -->
<div class="scrollbar-hide overflow-x-auto">
  <div class="flex gap-4">...</div>
</div>

<!-- AVOID: Inline styles -->
<button style="background: #D4713D;">Order</button>
```

### Custom Utilities (styles.css)

When creating custom CSS:

```css
/* Utility classes for layout/behavior not in Tailwind */
.scrollbar-hide {
  -ms-overflow-style: none;    /* IE 10+ */
  scrollbar-width: none;       /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;               /* Chrome, Safari */
}

/* Animations with vendor prefixes -->
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

/* Respect accessibility preferences */
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in-up { animation: none; }
}
```

### Color Usage

```html
<!-- Use Tailwind color names, not hex -->
<button class="bg-primary hover:bg-primary-hover">GOOD</button>

<!-- NOT -->
<button style="background: #D4713D;">BAD</button>
```

**Color Palette** (from Tailwind config in index.html:47-58):

| Var | Hex | Usage |
|-----|-----|-------|
| primary | #D4713D | Main CTA, links |
| primary-hover | #C2632F | Hover states |
| secondary | #8B2D35 | Accents, secondary text |
| accent | #C9A227 | Gold highlights |
| cream | #FDF8F3 | Light bg (light mode) |
| success | #4A7C59 | Status indicators |

### Responsive Design

Mobile-first approach with Tailwind:

```html
<!-- Mobile (base) → tablet → desktop -->
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 100% width on mobile, 50% on tablet, 33% on desktop -->
</div>

<!-- Hide on mobile, show on tablet+ -->
<nav class="hidden md:block">...</nav>

<!-- Show on mobile, hide on tablet+ -->
<button class="md:hidden">≡</button>
```

**Breakpoints** (Tailwind defaults):

| Prefix | Width | Device |
|--------|-------|--------|
| (none) | 0+ | Mobile |
| sm | 640px | Small tablet |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

## JavaScript Standards

### File Structure

**File:** `script.js` (457 lines)

```javascript
/**
 * Chan Mây Foods - Landing Page JavaScript
 * Features: Dark mode, Mobile menu, Size selector, Reviews slider, etc.
 */

// 1. Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileMenu();
  // ... other init functions
});

// 2. Feature functions (one per feature, prefixed initFunction)
function initDarkMode() { }
function initMobileMenu() { }

// 3. Configuration objects
const deeplinks = { };
const config = { };
```

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Init functions | `init{Feature}` | `initDarkMode()`, `initOrderModal()` |
| Event handlers | Inline or `handle{Action}` | `.addEventListener('click', handleClose)` |
| DOM selectors | Const, descriptive | `const menuBtn = document.querySelector('.menu-toggle')` |
| Data attributes | kebab-case, prefixed | `data-prices`, `data-product-id` |
| Local storage keys | camelCase, namespaced | `localStorage.theme` |
| Variables | camelCase | `isDark`, `targetElement`, `prices` |
| Constants | UPPER_SNAKE_CASE | `const HEADER_OFFSET = 35` |

### Coding Patterns

**Query DOM safely:**

```javascript
// GOOD: Check existence before using
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');

  if (!menuBtn || !nav) return; // Exit if elements don't exist

  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// AVOID: Assume element exists
function initMobileMenu() {
  document.querySelector('.menu-toggle').addEventListener('click', ...);
  // Crashes if .menu-toggle doesn't exist
}
```

**Use const/let, not var:**

```javascript
// GOOD
const isDark = document.documentElement.classList.contains('dark');
let activeIndex = 0;

// AVOID
var isDark;
var activeIndex;
```

**Arrow functions for consistent this binding:**

```javascript
// GOOD: Arrow function keeps outer this
items.forEach((item) => {
  item.addEventListener('click', () => {
    this.handleClick(item);
  });
});

// Okay: Regular function if not using this
items.forEach(function(item) {
  console.log(item.textContent);
});
```

**Template literals for strings:**

```javascript
// GOOD
const url = `https://zalo.me/${zaloId}`;

// AVOID
const url = 'https://zalo.me/' + zaloId;
```

### Event Handling

```javascript
// One listener per action
button.addEventListener('click', (e) => {
  e.preventDefault(); // If needed
  handleButtonClick();
});

// Named handlers for complex logic
function handleButtonClick() {
  // Implementation
}

// Cleanup when removing listeners (for modal/dynamic content)
element.removeEventListener('click', handler);
```

### IntersectionObserver Pattern

Used for scroll animations and active navigation:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible'); // Trigger CSS animation
    }
  });
}, { threshold: 0.1 }); // Trigger when 10% visible

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

### Data Attributes

Store data in HTML, read in JavaScript:

```html
<!-- HTML -->
<button class="order-btn" data-prices='{"100g": 45000, "250g": 79000}'>
  Add to Cart
</button>
```

```javascript
// JavaScript
const button = document.querySelector('.order-btn');
const prices = JSON.parse(button.dataset.prices);
console.log(prices['100g']); // 45000
```

### Comments

```javascript
/* ===========================================
   Feature Name
   Description of what this section does
   =========================================== */

// Single-line comment for implementation detail
const offset = 35; // Header offset for smooth scroll

// Block comment for complex logic
/*
  Carousel logic:
  1. Get all slides
  2. Hide current slide
  3. Show next slide
  4. Update dot navigation
*/
```

## Deeplinks Configuration

**Location:** script.js, lines 60-68

**Format:** URL strings in `deeplinks` object

```javascript
const deeplinks = {
  zalo: 'https://zalo.me/YOUR_ZALO_ID',           // ⚠️ Update ID
  messenger: 'https://m.me/chanmayfoods',         // ✓ Configured
  facebook: 'https://facebook.com/chanmayfoods',  // ✓ Configured
  shopee: 'https://shopee.vn/chanmayfoods',       // ✓ Configured
  tiktok: 'https://www.tiktok.com/@chanmayfoods', // ✓ Configured
  instagram: 'https://instagram.com/chanmayfoods', // ✓ Configured
  phone: 'tel:0123456789'                         // ⚠️ Update number
};
```

**Usage:** Called by order buttons via `handleOrderClick()` (script.js:355).

## Product Data Format

Stored as JSON in `data-prices` attributes (index.html, product cards):

```html
<div
  class="product-card"
  data-product-name="Xốt Phô Mai"
  data-prices='{"100g": 45000, "250g": 79000, "500g": 139000}'
>
  <!-- Size selector buttons -->
  <button class="size-btn" data-size="100g">100g</button>
  <button class="size-btn" data-size="250g">250g</button>
  <button class="size-btn" data-size="500g">500g</button>
</div>
```

**Price format:** Integers in VND cents (not divided by 100).

**JavaScript parsing:**

```javascript
const prices = JSON.parse(element.dataset.prices);
const selectedPrice = prices[selectedSize]; // e.g., prices['100g'] = 45000
```

## Common Patterns

### Dark Mode Toggle

```javascript
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
  });
}

// In HTML/CSS:
// <html class="dark"> enables dark mode
// Tailwind auto-applies dark: prefixed classes
```

### Mobile Menu Toggle

```javascript
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');

  menuBtn.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    nav.classList.toggle('hidden', !isActive); // Optional visibility fallback
    menuBtn.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking links
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active', 'hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}
```

### Size Selector with Dynamic Pricing

```javascript
function initSizeSelectors() {
  document.querySelectorAll('.size-selector').forEach(selector => {
    const buttons = selector.querySelectorAll('button');
    const priceDisplay = selector.querySelector('.price');
    const prices = JSON.parse(selector.closest('.product-card').dataset.prices);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        priceDisplay.textContent = prices[btn.dataset.size];
      });
    });
  });
}
```

## Performance Guidelines

### Script Execution

- Initialize only on DOMContentLoaded (all DOM elements present)
- Use `addEventListener` for event delegation when possible
- Avoid synchronous layout thrashing (read then write DOM properties)
- Cache DOM queries in variables, don't query repeatedly

```javascript
// GOOD: Query once, use variable
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.style.display = 'block'; // Batched
});

// AVOID: Query in loop
for (let i = 0; i < 10; i++) {
  document.querySelectorAll('.item').forEach(...); // Unnecessary re-queries
}
```

### Animation Performance

Use CSS transforms & opacity for 60fps:

```css
/* GOOD: GPU-accelerated */
.animate {
  animation: slide 0.3s ease-out;
}
@keyframes slide {
  from { transform: translateX(-100px); }
  to { transform: translateX(0); }
}

/* AVOID: Repaints on every frame */
@keyframes slide {
  from { left: -100px; }
  to { left: 0; }
}
```

## Accessibility Checklist

- ✓ Semantic HTML (header, nav, main, section, footer)
- ✓ ARIA labels on buttons & interactive elements
- ✓ Mobile menu: `aria-expanded` attribute
- ✓ Alt text on images (product images present, update Unsplash hero)
- ✓ Keyboard navigation: Tab through all controls
- ✓ Dark mode: Respects system preference
- ✓ Reduced motion: `prefers-reduced-motion: reduce` support
- ⚠️ Missing: Focus trap on modal (add when editing)
- ⚠️ Missing: Skip to main content link (low priority)

## Testing Guidelines

No automated tests currently in place (static site). Manual testing checklist:

**Cross-browser:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

**Mobile responsiveness:**
- 320px (small phone)
- 768px (tablet)
- 1024px (desktop)

**Dark mode:**
- Toggle works
- All text readable in both modes
- Images visible with correct contrast

**Interactions:**
- Mobile menu opens/closes
- Size selector updates price
- Reviews carousel scrolls
- Order modal opens/closes
- Deeplinks navigate correctly

## File Size Targets

- index.html: < 100 KB
- script.js: < 20 KB
- styles.css: < 5 KB
- Total (no CDN): < 125 KB

Current: 72 KB + 14 KB + 2.5 KB = 88.5 KB ✓
