# Chan Mây Foods - System Architecture

## Architecture Overview

Single-page static HTML application with client-side vanilla JavaScript for interactivity. No backend, no API calls, no database. All data embedded in HTML.

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Pages (CDN)                       │
│                    Serves static files                       │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼──────┐  ┌──────▼─────┐  ┌───▼────────┐
    │ index.html│  │ script.js  │  │ styles.css │
    │  (937 LOC)│  │  (457 LOC) │  │ (114 LOC)  │
    └────┬──────┘  └──────┬─────┘  └───┬────────┘
         │                │            │
         └────────────────┼────────────┘
                          │
                    ┌─────▼─────┐
                    │   Client   │
                    │  Browser   │
                    └────────────┘
                          │
         ┌────────────────┼────────────────────────┐
         │                │                        │
    ┌────▼──────┐  ┌──────▼─────┐  ┌────────▼────┐
    │ localStorage
    │ (dark mode)│  │IntersectionObserver  │ External URLs │
    │            │  │ (scroll animations)  │ (Zalo, Shopee)│
    └────────────┘  └──────────────┘  └─────────────┘
```

## Component Hierarchy

### Page Structure (Vertical Flow)

```
HTML Document (index.html)
├── Head (SEO, fonts, Tailwind config)
├── Body
│   ├── Header (Fixed)
│   │   ├── Logo
│   │   ├── Navigation Menu (responsive)
│   │   └── Dark Mode Toggle
│   ├── Main Content
│   │   ├── Hero Section (#hero)
│   │   │   └── Slogan + CTA Button
│   │   ├── USP Bento Grid (#usp)
│   │   │   └── 4 Value Prop Cards
│   │   ├── Products Section (#products)
│   │   │   ├── 6 Product Cards
│   │   │   │   ├── Product Image
│   │   │   │   ├── Product Name
│   │   │   │   ├── Size Selector
│   │   │   │   ├── Price Display
│   │   │   │   └── Order Button
│   │   │   └── Size Selector (shared state)
│   │   ├── Inspiration Section (#inspiration)
│   │   │   └── 3 Food Image Cards
│   │   ├── Story Section (#story)
│   │   │   └── Brand Narrative Text
│   │   ├── Reviews Section (#reviews)
│   │   │   ├── Review Carousel
│   │   │   │   └── 5 Review Cards (horizontal scroll)
│   │   │   └── Dot Navigation
│   │   ├── Order Section (#order)
│   │   │   └── Secondary CTA with Platform Links
│   │   └── Footer
│   │       ├── Contact Info
│   │       ├── Social Links
│   │       └── Copyright
│   ├── Floating Action Buttons
│   │   ├── Zalo Chat
│   │   └── Messenger Chat
│   └── Order Modal (hidden, shown on demand)
│       ├── Product Info (injected)
│       ├── Size Selector
│       ├── Price
│       ├── Confirm Button
│       └── Close Button
```

## Data Flow

### Initialization Flow

```
DOMContentLoaded Event
│
├─ initDarkMode()
│  └─ Check localStorage.theme
│     └─ Apply 'dark' class to <html>
│
├─ initMobileMenu()
│  └─ Attach click handlers to menu toggle
│
├─ initSizeSelectors()
│  └─ Parse data-prices from product cards
│     └─ Attach click handlers to size buttons
│
├─ initReviewsSlider()
│  └─ Attach click handlers to review dots
│     └─ Scroll carousel to selected review
│
├─ initScrollAnimations()
│  └─ Create IntersectionObserver
│     └─ Monitor .animate-on-scroll elements
│        └─ Add 'visible' class on intersection
│
├─ initDeeplinks()
│  └─ Attach click handlers to deeplink buttons
│
├─ initSmoothScroll()
│  └─ Attach click handlers to anchor links
│     └─ Scroll to target with header offset
│
├─ initOrderModal()
│  └─ Attach click handlers to order buttons
│     └─ Inject product data into modal
│
└─ initActiveNavigation()
   └─ Create IntersectionObserver for sections
      └─ Highlight current section in nav
```

### Dark Mode State Management

```
User clicks theme toggle
│
├─ Toggle 'dark' class on <html>
│
├─ Save preference to localStorage
│  └─ localStorage.theme = 'dark' | 'light'
│
├─ Tailwind CSS applies dark: prefixed classes
│  └─ <html class="dark">
│     └─ .dark:bg-slate-900
│
└─ Preference persists on page reload
   └─ Script in <head> runs before render
      └─ Applies class immediately (no flash)
```

**Implementation:** script.js lines 73-81

### Product Size Selector

```
User clicks size button
│
├─ Get prices from element.dataset.prices
│  └─ JSON.parse('{"100g": 45000, "250g": 79000, "500g": 139000}')
│
├─ Update .active button state
│  └─ Add 'active' class to clicked button
│     └─ Remove 'active' from other buttons
│
├─ Update price display
│  └─ querySelector('.price').textContent = selectedPrice
│
├─ Store selection (optional, currently in-memory only)
│
└─ Modal uses selection when opened
   └─ handleOrderClick() reads selected size
      └─ Shows price in confirmation modal
```

**Implementation:** script.js lines 111-165

**Data Source:** Product cards in HTML (index.html lines 261-480)

```html
<div class="product-card" data-product-name="Xốt Phô Mai"
     data-prices='{"100g": 45000, "250g": 79000, "500g": 139000}'>
  <button class="size-btn active" data-size="100g">100g</button>
  <button class="size-btn" data-size="250g">250g</button>
  <button class="size-btn" data-size="500g">500g</button>
  <div class="price">45.000 VND</div>
</div>
```

### Order Modal Flow

```
User clicks "Mua Ngay" button on product card
│
├─ handleOrderClick() fires
│
├─ Extract product context
│  ├─ Get product name from element.dataset.productName
│  ├─ Get selected size from .active size button
│  ├─ Get selected price from .price display
│  └─ Get product image from product card
│
├─ Inject data into modal
│  ├─ Set modal title to product name
│  ├─ Set size display
│  ├─ Set final price
│  └─ Set product image (optional)
│
├─ Show modal
│  ├─ Add 'active' class to #order-modal
│  ├─ Add 'modal-open' to body (scroll lock)
│  └─ Trigger CSS animation (fade + scale)
│
├─ User confirms order
│  └─ handleConfirmOrder() fires
│     └─ Route to platform deeplink
│        └─ window.open(deeplinks[platform])
│
└─ User closes modal
   ├─ Remove 'active' class
   ├─ Remove 'modal-open' from body
   └─ Trigger CSS animation (fade-out + scale-down)
```

**Implementation:** script.js lines 314-380

### Scroll Animations

```
Page load
│
├─ Create IntersectionObserver
│  └─ threshold: 0.1 (10% visible)
│
├─ Observe all .animate-on-scroll elements
│  └─ Starting state: opacity: 0, translateY(30px)
│
└─ When element enters viewport
   ├─ Add 'visible' class
   ├─ CSS transition activates
   │  └─ opacity: 1, translateY(0)
   └─ Stagger delay applied per element
      └─ data-delay="200ms" adds transition-delay
```

**Implementation:** script.js lines 234-280

**CSS:** styles.css lines 31-46

**HTML:** Applied to sections and product cards with `data-delay` attributes

### Smooth Scroll with Header Offset

```
User clicks anchor link (#hero, #products, etc.)
│
├─ Smooth scroll handler intercepts click
│  └─ e.preventDefault()
│
├─ Calculate target scroll position
│  ├─ Get target element by ID
│  ├─ Calculate: target.offsetTop - 35px (header offset)
│  └─ 35px = approximate fixed header height
│
├─ Animate scroll
│  └─ window.scrollTo({ top: position, behavior: 'smooth' })
│
└─ Header sticky positioning adjusts as needed
   └─ Header fixes to top when scrolling
```

**Implementation:** script.js lines 22-54

**Exclusions:** Order buttons skip smooth scroll (handled by modal instead)

### Active Navigation Highlighting

```
User scrolls page
│
├─ IntersectionObserver monitors section visibility
│  └─ Each section (#hero, #products, #reviews, etc.)
│
├─ When section becomes 50% visible
│  └─ Identify current section ID
│
├─ Update navigation link style
│  ├─ Find nav link matching current section
│  ├─ Add 'active' or highlight class
│  └─ Remove highlight from other links
│
└─ As user scrolls to next section
   └─ Update highlight accordingly
```

**Implementation:** script.js lines 384-450

### Mobile Menu Toggle

```
User clicks menu toggle button (☰)
│
├─ Toggle 'active' class on .nav-menu
│  └─ Also toggle 'hidden' class (CSS fallback)
│
├─ Update aria-expanded attribute
│  └─ aria-expanded="true" | "false"
│
├─ Menu slides down/up with CSS transition
│  └─ .nav-menu.active { opacity: 1, translateY(0) }
│
├─ User clicks nav link
│  ├─ Navigation handler fires
│  ├─ Remove 'active' & 'hidden' classes
│  ├─ Menu slides up
│  └─ Anchor link navigates (smooth scroll)
│
└─ Clicking outside menu (optional)
   └─ Would require blur/click-outside listener
```

**Implementation:** script.js lines 86-107

**Accessibility:** ARIA attributes inform screen readers

### Deeplink Routing

```
User clicks order button
│
├─ Modal appears with product info
│
├─ User selects payment/messaging platform
│  └─ Clicks "Buy on Shopee", "Message on Zalo", etc.
│
├─ handleDeeplink(channel) fires
│  ├─ Look up URL from deeplinks config object
│  └─ deeplinks.shopee = 'https://shopee.vn/chanmayfoods'
│
├─ Open URL in new window
│  └─ window.open(deeplinks[channel])
│
└─ User directed to external platform
   └─ Continues order on Shopee/Zalo/Messenger
```

**Configuration:** script.js lines 60-68

**Channels:** Zalo, Messenger, Facebook, Shopee, TikTok, Instagram, Phone

**Status:**
- ⚠️ Zalo ID placeholder: `YOUR_ZALO_ID` (needs update)
- ⚠️ Phone number placeholder: `0123456789` (needs update)
- ✓ Shopee, TikTok configured
- ✓ Messenger, Facebook configured
- ✓ Instagram configured

## Event Handling

### Event Listener Lifecycle

```
Script Load (DOMContentLoaded)
│
├─ Attach all event listeners
│  ├─ theme-toggle: click → initDarkMode
│  ├─ menu-toggle: click → initMobileMenu
│  ├─ .size-btn: click → initSizeSelectors
│  ├─ .review-dot: click → initReviewsSlider
│  ├─ a[href^="#"]: click → initSmoothScroll
│  ├─ .order-btn: click → initOrderModal
│  ├─ #order-modal: click → initOrderModal (close)
│  └─ Window: scroll → initActiveNavigation (via Observer)
│
└─ Observers created
   ├─ IntersectionObserver for scroll animations
   └─ IntersectionObserver for active nav
      └─ Fires on every viewport change
         └─ Continuous throughout page life
```

### Interaction Patterns

| Action | Event | Handler | Effect |
|--------|-------|---------|--------|
| Toggle dark mode | click | initDarkMode | class toggle, localStorage |
| Open mobile menu | click | initMobileMenu | class toggle, aria-expanded |
| Select product size | click | initSizeSelectors | class toggle, update price |
| Navigate review carousel | click | initReviewsSlider | scroll carousel, dot active |
| Smooth scroll anchor | click | initSmoothScroll | window.scrollTo() |
| Open order modal | click | initOrderModal | class toggle, modal-open |
| Close order modal | click/outside | initOrderModal | class remove, modal-open |
| Confirm order | click | handleConfirmOrder | window.open() deeplink |
| Page scroll | scroll (observer) | initActiveNavigation | update nav highlight |
| Element visible | intersection | initScrollAnimations | class add, CSS animation |

## External Dependencies

### CDN Resources

| Resource | Purpose | Size | Cached |
|----------|---------|------|--------|
| Tailwind CSS | Utility CSS framework | ~100 KB | Global CDN cache |
| Google Fonts (2) | Playfair Display + Be Vietnam Pro | ~50 KB | Google CDN cache |
| Unsplash Images | Placeholder product images | Variable | Unsplash CDN cache |

**Note:** No npm, no build step. All resources loaded via CDN.

### Browser APIs

| API | Usage | Fallback |
|-----|-------|----------|
| localStorage | Persist dark mode preference | None (session-only) |
| IntersectionObserver | Scroll animations, active nav | Could use scroll event (performance cost) |
| classList API | DOM manipulation | Use setAttribute() |
| querySelector | DOM selection | Already available in all modern browsers |

## Performance Characteristics

### Load Time

```
1. Parse HTML        ~100ms
   └─ Discover Tailwind CDN link
   └─ Request fonts, CSS

2. Parallel loads
   ├─ Tailwind CSS CDN    ~200-400ms (cached on return visits)
   ├─ Google Fonts        ~100-200ms (cached)
   └─ Images (lazy)       ~500ms+ (depends on user scrolling)

3. Parse & execute script.js  ~50ms

4. DOMContentLoaded fires     ~400-600ms total
   └─ Initialize all features

5. First Interactive (paint)  ~600-800ms

6. Fully loaded              ~2-3s (depends on images)
```

### Runtime Performance

- **Dark mode toggle:** ~1ms (class toggle)
- **Mobile menu toggle:** ~5ms (class toggle + handler calls)
- **Size selector:** ~2ms (JSON parse cached)
- **Scroll animations:** ~16ms per frame (60fps, IntersectionObserver)
- **Reviews carousel:** ~10ms per scroll frame
- **Active navigation:** ~16ms per scroll frame (observer)
- **Modal open/close:** ~300ms (CSS animation)

**Memory Usage:**
- ~2-3 MB typical (including images)
- No memory leaks (proper event cleanup)
- Observers cleaned up on destruction (if implemented)

## Accessibility Architecture

### Semantic Structure

- **Landmarks:** header, nav, main, section, footer
- **Headings:** h1, h2, h3 proper hierarchy
- **Links:** Descriptive text, skip to main link (missing)
- **Buttons:** Labeled, aria-label where needed
- **Forms:** Label associations (size selector)
- **ARIA:** aria-expanded, aria-pressed, aria-label

### Focus Management

- Tab order follows DOM order
- Focus visible on interactive elements
- Mobile menu closes on blur (click inside)
- Modal: No focus trap currently (should be added)

### Motion & Preferences

- All animations respect prefers-reduced-motion
- Dark mode respects prefers-color-scheme
- No autoplaying media

## Error Handling

**Current approach:** Silent failures

```javascript
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');

  if (!menuBtn || !nav) return; // Exit gracefully
  // ... rest of function
}
```

**No error boundaries or try-catch blocks.** Static content means failures are unlikely.

**Future improvements:**
- Add console.error logging for debugging
- Implement error boundary for critical features
- Add heartbeat check for deeplinks (verify URLs work)

## Security Considerations

### XSS Prevention

- No user input accepted (static site)
- No eval() or innerHTML
- Template literals safe
- Data attributes (JSON) parsed safely with JSON.parse()

### CSRF Prevention

- No state-changing operations
- Deeplinks are read-only (external redirects)
- No sensitive data transmitted

### CSP (Content Security Policy)

Not currently configured. Could add:

```
Content-Security-Policy: default-src 'self';
script-src 'self' cdn.tailwindcss.com fonts.googleapis.com;
style-src 'self' cdn.tailwindcss.com fonts.googleapis.com;
img-src 'self' images.unsplash.com;
```

## Scalability Notes

**Current limitations:**
- Static site: No server-side scaling needed
- Hard-coded product data (6 products, 3 sizes each)
- No pagination or search

**To scale to 100+ products:**
1. Move data to JSON file (products.json)
2. Load and render dynamically
3. Add filtering/search
4. Consider SPA framework (React, Vue) for state management

**Current approach sufficient for:** Up to ~20 products and sections

## Maintenance Considerations

### Code Organization

- Single script.js file (457 lines) - could split if grows beyond 600 lines
- Single styles.css file (114 lines) - sufficient
- Single index.html file (937 lines) - HTML is presentational, acceptable

### Update Frequency

- Images: Quarterly (seasonal products)
- Prices: Monthly (inflation, promotions)
- Deeplinks: As needed (platform changes)
- Text: As needed (seasonal campaigns)
- Code: Minimal (static site, few features)

### Testing

- Manual cross-browser testing (no automated tests)
- Mobile responsiveness check
- Dark mode verification
- Deeplink verification
- Accessibility audit (manual)
