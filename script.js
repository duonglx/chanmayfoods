/**
 * Chan Mây Foods - Landing Page JavaScript
 * Features: Mobile menu, size selector, reviews slider, scroll animations, deeplinks
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSizeSelectors();
  initReviewsSlider();
  initScrollAnimations();
  initDeeplinks();
});

/* ===========================================
   DEEPLINK CONFIGURATION
   Update these URLs with your actual links
   =========================================== */
const deeplinks = {
  zalo: 'https://zalo.me/YOUR_ZALO_ID',
  messenger: 'https://m.me/chanmayfoods',
  facebook: 'https://facebook.com/chanmayfoods',
  shopee: 'https://shopee.vn/chanmayfoods',
  tiktok: 'https://www.tiktok.com/@chanmayfoods',
  instagram: 'https://instagram.com/chanmayfoods'
};

/* ===========================================
   Mobile Menu Toggle
   =========================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    menuBtn.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking nav links
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove('active');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ===========================================
   Product Size Selector
   Updates active state and price display
   =========================================== */
function initSizeSelectors() {
  const productsSection = document.querySelector('#products');
  if (!productsSection) return;

  productsSection.addEventListener('click', (e) => {
    const btn = e.target.closest('.size-selector button');
    if (!btn) return;

    // Remove active from siblings
    const selector = btn.closest('.size-selector');
    selector.querySelectorAll('button').forEach(b => b.classList.remove('active'));

    // Add active to clicked
    btn.classList.add('active');

    // Update price
    const card = btn.closest('.product-card');
    const priceEl = card.querySelector('.price');
    const size = btn.dataset.size;

    try {
      const prices = JSON.parse(card.dataset.prices || '{}');
      if (prices[size] && priceEl) {
        priceEl.textContent = prices[size];
      }
    } catch (err) {
      console.warn('Could not parse prices:', err);
    }
  });
}

/* ===========================================
   Reviews Slider
   Horizontal scroll with navigation buttons
   =========================================== */
function initReviewsSlider() {
  const container = document.querySelector('.reviews-container');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');

  if (!container) return;

  const scrollAmount = 300;

  prevBtn?.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  // Touch swipe is handled by CSS scroll-snap
}

/* ===========================================
   Scroll Animations
   Fade-in elements when scrolled into view
   =========================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!elements.length) return;

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add small delay for staggered effect
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el, index) => {
    // Add stagger delay for grid items
    if (el.closest('.usp-grid') || el.closest('.products-grid')) {
      el.dataset.delay = index * 100;
    }
    observer.observe(el);
  });
}

/* ===========================================
   Deeplink Handling
   Opens social/e-commerce links in new tab
   =========================================== */
function initDeeplinks() {
  document.querySelectorAll('[data-deeplink]').forEach(el => {
    el.addEventListener('click', (e) => {
      const key = el.dataset.deeplink;
      const url = deeplinks[key];

      if (url) {
        e.preventDefault();
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  });
}

/* ===========================================
   Optional: Sticky Header Enhancement
   Adds 'scrolled' class for styling changes
   =========================================== */
(function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();
