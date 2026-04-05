// ============================================
// CRISTAL DEFENCE - MAIN APP.JS
// Smooth scroll, lazy-load, basic init
// ============================================

/**
 * Smooth scroll для anchor links (связки в nav)
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Lazy-loading изображений через Intersection Observer
 */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback для старых браузеров
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Scroll reveal анимации для секций [data-animate="reveal"]
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate="reveal"]');
  
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Анимация появления
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => animationObserver.observe(el));
  }
}

/**
 * Инициализация при загрузке DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initLazyLoading();
  
  // Проверка поддержки hardware acceleration
  const testCanvas = document.createElement('canvas');
  const context = testCanvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  if (context && 'accelerometer' in context) {
    // Hardware acceleration поддерживается
    document.body.classList.add('gpu-accelerated');
  }
});

/**
 * Обработка клика по кнопкам навигации
 */
const navLinks = document.querySelectorAll('.header__nav a[data-section]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const sectionId = this.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
      e.preventDefault();
      initSmoothScroll(); // Re-init для smooth scroll
    }
  });
});
