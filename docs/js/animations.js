// ============================================
// CRISTAL DEFENCE - ANIMATIONS.JS
// Hero entrance, cards, parallax, ripple effects
// ============================================

/**
 * Hero entrance animation (задержка 500ms)
 */
function animateHeroEntrance() {
  const heroContent = document.querySelector('.hero__content');
  
  if (heroContent) {
    setTimeout(() => {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
      
      // Плавный fade-in для заголовка
      const title = document.querySelector('.hero h1');
      if (title) {
        title.style.transitionDelay = '200ms';
      }
    }, 500);
  }
}

/**
 * Card hover animation enhancement
 */
function initCardAnimations() {
  const cards = document.querySelectorAll('.product-card, .feature-card');
  
  cards.forEach(card => {
    // При наведении убираем задержку
    card.addEventListener('mouseenter', () => {
      card.style.transitionDelay = '0s';
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 20px 40px rgba(233, 69, 96, 0.25)';
    });
    
    // При выходе добавляем плавность
    card.addEventListener('mouseleave', () => {
      setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
      }, 150);
    });
  });
}

/**
 * Parallax effect для hero background (если есть видео)
 */
function initParallax() {
  const heroBg = document.querySelector('.hero__background');
  
  if (heroBg && typeof window !== 'undefined') {
    let lastScrollY = window.scrollY;
    
    // Debounce scroll events for performance (~16ms)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY - lastScrollY;
      const parallaxSpeed = 0.15;
      
      heroBg.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      lastScrollY = window.scrollY;
      
      // Clear any pending scroll timeouts
      clearTimeout(scrollTimeout);
    }, { passive: true });
  }
}

/**
 * Video background fade on scroll (если есть видео)
 */
function handleVideoBackground() {
  const videoContainer = document.querySelector('.video-container');
  
  if (!videoContainer) return;
  
  const video = videoContainer.querySelector('video');
  if (!video) return;
  
  // Fade transition при воспроизведении
  video.addEventListener('play', () => {
    const heroBg = document.querySelector('.hero__background');
    if (heroBg) {
      heroBg.style.backgroundImage = 'none';
      heroBg.style.background = '';
    }
  });
  
  // Pause видео при скролле за пределы
  video.addEventListener('scroll', () => {
    if (!video.paused) {
      video.pause();
    }
  });
}

/**
 * Button ripple effect (эффект волны при клике)
 */
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = 'translate(-50%, -50%) scale(0)';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'rippleEffect 0.6s ease-out';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

/**
 * Инициализация всех анимаций при загрузке
 */
document.addEventListener('DOMContentLoaded', () => {
  animateHeroEntrance();
  initCardAnimations();
  initParallax();
  handleVideoBackground();
  
  // Ripple effect если поддерживается touch
  if ('ontouchstart' in window) {
    initRippleEffect();
  }
});

/**
 * Адаптация для мобильных устройств
 */
function initMobileAnimations() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Плавный transition на тач-устройствах
    document.body.style.transitionTimingFunction = 'cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Отключаем parallax на мобильных для производительности
    if (document.querySelector('.hero__background')) {
      const heroBg = document.querySelector('.hero__background');
      heroBg.style.transform = 'none';
    }
  }
}

initMobileAnimations();
