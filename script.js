/**
 * Chan Mây Foods - Landing Page JavaScript
 * Features: Dark mode, Mobile menu, Size selector, Reviews slider, Scroll animations, Deeplinks
 */

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileMenu();
  initSizeSelectors();
  initReviewsSlider();
  initScrollAnimations();
  initDeeplinks();
  initSmoothScroll();
  initOrderModal();
  initActiveNavigation();
});

/* ===========================================
   Smooth Scroll with Header Offset
   Scrolls to anchor with 10px gap below header
   =========================================== */
function initSmoothScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip if this is an order button (handled by modal) - but still prevent default scroll
      // Only block: order-btn class OR (bg-primary class AND href is #order)
      const isOrderBtn = link.classList.contains('order-btn');
      const isOrderLink = link.classList.contains('bg-primary') && link.getAttribute('href') === '#order';
      if (isOrderBtn || isOrderLink) {
        e.preventDefault();
        return;
      }

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Fixed offset: 35px
      const offset = 35;
      const targetPosition = target.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

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
  instagram: 'https://instagram.com/chanmayfoods',
  phone: 'tel:0123456789'
};

/* ===========================================
   Dark Mode Toggle
   =========================================== */
function initDarkMode() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
  });
}

/* ===========================================
   Mobile Menu Toggle
   =========================================== */
function initMobileMenu() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-menu');

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isActive = nav.classList.toggle('active');
    nav.classList.toggle('hidden', !isActive);
    menuBtn.setAttribute('aria-expanded', isActive);
  });

  // Close menu when clicking nav links
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      nav.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
      nav.classList.remove('active');
      nav.classList.add('hidden');
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
    selector.querySelectorAll('button').forEach(b => {
      b.classList.remove('active');
      // Reset Tailwind classes
      b.classList.remove('border-primary', 'bg-primary', 'text-white');
      b.classList.add('border-primary/30', 'dark:border-primary/50');
    });

    // Add active to clicked
    btn.classList.add('active', 'border-primary', 'bg-primary', 'text-white');
    btn.classList.remove('border-primary/30', 'dark:border-primary/50');

    // Update price
    const card = btn.closest('article');
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
   Horizontal scroll with navigation and dots
   =========================================== */
function initReviewsSlider() {
  const container = document.querySelector('.reviews-container');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');
  const dots = document.querySelectorAll('.review-dot');
  const cards = document.querySelectorAll('.review-card');

  if (!container || !cards.length) return;

  const cardWidth = cards[0].offsetWidth + 16; // card width + gap

  // Navigation buttons
  prevBtn?.addEventListener('click', () => {
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    });
  });

  // Update dots on scroll
  container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollLeft;
    const activeIndex = Math.round(scrollPosition / cardWidth);

    dots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active', 'w-6');
        dot.classList.remove('bg-primary/30', 'dark:bg-primary/50');
        dot.classList.add('bg-primary');
      } else {
        dot.classList.remove('active', 'w-6', 'bg-primary');
        dot.classList.add('bg-primary/30', 'dark:bg-primary/50');
      }
    });
  });
}

/* ===========================================
   Scroll Animations
   Fade-in elements when scrolled into view
   =========================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!elements.length) return;

  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  // Check if IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach((el, index) => {
    // Add stagger delay for grid items
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('grid') || parent.closest('.grid'))) {
      const siblingIndex = Array.from(parent.children).indexOf(el);
      el.dataset.delay = (siblingIndex * 100).toString();
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
   Order Modal
   Shows product confirmation and channel selection
   =========================================== */
function initOrderModal() {
  const modal = document.getElementById('order-modal');
  if (!modal) return;

  // Store current product info
  let currentProduct = {
    name: '',
    size: '',
    price: '',
    image: ''
  };

  // Open modal when clicking "Mua hàng" buttons on product cards
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevent smooth scroll from triggering
      const card = btn.closest('article');
      if (!card) return;

      // Get product info from card
      currentProduct.name = card.querySelector('h3')?.textContent || 'Sản phẩm';
      currentProduct.image = card.querySelector('img')?.src || '';
      currentProduct.price = card.querySelector('.price')?.textContent || '';

      // Get active size
      const activeSize = card.querySelector('.size-selector button.active');
      currentProduct.size = activeSize ? activeSize.textContent : '';

      // Populate modal
      document.getElementById('modal-product-name').textContent = currentProduct.name;
      document.getElementById('modal-product-size').textContent = currentProduct.size ? `Dung tích: ${currentProduct.size}` : '';
      document.getElementById('modal-product-price').textContent = currentProduct.price;
      document.getElementById('modal-product-image').src = currentProduct.image;
      document.getElementById('modal-product-image').alt = currentProduct.name;

      // Show modal
      openModal();
    });
  });

  // Open modal from header/nav "Mua hàng" buttons
  document.querySelectorAll('a[href="#order"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Only intercept if it's a CTA button (not just navigation)
      if (link.classList.contains('bg-primary')) {
        e.preventDefault();
        e.stopPropagation(); // Prevent smooth scroll from triggering
        // Set default product info
        currentProduct = {
          name: 'Sản phẩm Chan Mây',
          size: '',
          price: 'Liên hệ báo giá',
          image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&h=200&fit=crop'
        };

        document.getElementById('modal-product-name').textContent = currentProduct.name;
        document.getElementById('modal-product-size').textContent = 'Xem danh sách sản phẩm bên dưới';
        document.getElementById('modal-product-price').textContent = currentProduct.price;
        document.getElementById('modal-product-image').src = currentProduct.image;

        openModal();
      }
    });
  });

  // Close modal handlers
  modal.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Channel click handlers
  modal.querySelectorAll('[data-channel]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const channel = link.dataset.channel;
      const url = deeplinks[channel];

      if (url) {
        // For phone, use direct link
        if (channel === 'phone') {
          window.location.href = url;
        } else {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
        closeModal();
      }
    });
  });

  function openModal() {
    modal.classList.remove('hidden');
    // Trigger reflow for animation
    modal.offsetHeight;
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    // Wait for animation to complete before hiding
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
}

/* ===========================================
   Sticky Header Enhancement
   Adds 'scrolled' class for styling changes
   =========================================== */
(function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ===========================================
   Active Navigation
   Highlights nav link based on visible section
   =========================================== */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]:not([href="#order"])');
  const mobileNavLinks = document.querySelectorAll('.nav-menu a[href^="#"]:not([href="#order"])');

  if (!sections.length || !navLinks.length) return;

  // Active class styles
  const activeClasses = ['text-primary', 'font-semibold'];
  const inactiveClasses = ['text-text-primary', 'dark:text-slate-200'];

  function setActiveLink(sectionId) {
    // Update desktop nav
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.remove(...inactiveClasses);
        link.classList.add(...activeClasses);
      } else {
        link.classList.remove(...activeClasses);
        link.classList.add(...inactiveClasses);
      }
    });

    // Update mobile nav
    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${sectionId}`) {
        link.classList.remove(...inactiveClasses);
        link.classList.add(...activeClasses);
      } else {
        link.classList.remove(...activeClasses);
        link.classList.add(...inactiveClasses);
      }
    });
  }

  // Use Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px', // Trigger when section is ~20% from top
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}
