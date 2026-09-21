/**
 * SCROLL-ANIMATIONS.JS
 * Cinematic scroll-driven effects across Philosophy, Case Studies, and Experience sections
 */

class ScrollAnimationEngine {
  constructor() {
    this.timeline = document.querySelector('.experience-timeline');
    this.scrubLine = document.getElementById('timelineScrubLine');
    this.expItems = document.querySelectorAll('.experience-item');
    this.heroSection = document.getElementById('heroSection');
    this.heroHeadlineStage = document.getElementById('heroHeadlineStage');
    this.auroraCanvas = document.querySelector('.aurora-canvas-container');

    this.isTicking = false;
    this.init();
  }

  init() {
    this.setupIntersectionObservers();
    this.bindScroll();
    this.updateTimelineScrubber(); // Initial check
  }

  setupIntersectionObservers() {
    // 1. Philosophy & About Section Observer
    const bioColumn = document.querySelector('.aurora-bio-column');
    const cardsDeck = document.querySelector('.carousel-stage-wrapper');

    if (bioColumn) {
      bioColumn.classList.add('scroll-reveal-left');
      const bioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            bioColumn.classList.add('revealed');
            this.animateFloatingBadges();
            bioObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      bioObserver.observe(bioColumn);
    }

    if (cardsDeck) {
      cardsDeck.classList.add('scroll-reveal-right');
      const deckObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            cardsDeck.classList.add('revealed');
            deckObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      deckObserver.observe(cardsDeck);
    }

    // 2. Playbook Case Studies Cards Observer
    const observeProjectCards = () => {
      const cards = document.querySelectorAll('.projects-grid .project-card');
      if (cards.length === 0) return;

      cards.forEach((card, i) => {
        card.classList.add('scroll-reveal-card');
        card.style.transitionDelay = `${(i % 2) * 0.15}s`;

        const cardObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              card.classList.add('revealed');
              this.animateCardMetrics(card);
              cardObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        cardObserver.observe(card);
      });
    };

    // Run now and also observe grid mutations (for category filtering)
    observeProjectCards();
    const grid = document.getElementById('projectsGrid');
    if (grid) {
      const gridObserver = new MutationObserver(() => {
        observeProjectCards();
      });
      gridObserver.observe(grid, { childList: true });
    }
  }

  animateFloatingBadges() {
    const badges = document.querySelectorAll('.floating-badge');
    badges.forEach((badge, index) => {
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(24px) scale(0.85)';
      setTimeout(() => {
        badge.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0) scale(1)';
      }, 150 + index * 100);
    });
  }

  animateCardMetrics(card) {
    const metricBoxes = card.querySelectorAll('.project-media-wrapper div[style*="background: rgba(0,0,0,0.5)"]');
    metricBoxes.forEach((box, i) => {
      box.style.transform = 'scale(0.85)';
      box.style.opacity = '0';
      setTimeout(() => {
        box.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        box.style.transform = 'scale(1)';
        box.style.opacity = '1';
      }, 200 + i * 120);
    });
  }

  bindScroll() {
    window.addEventListener('scroll', () => {
      if (!this.isTicking) {
        window.requestAnimationFrame(() => {
          this.onScroll();
          this.isTicking = false;
        });
        this.isTicking = true;
      }
    }, { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY;

    // 1. Hero Cinematic Parallax & Fade
    if (this.heroSection && this.heroHeadlineStage && scrollY < window.innerHeight) {
      const opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.75));
      const translateY = scrollY * 0.22;
      this.heroHeadlineStage.style.transform = `translate3d(0, ${translateY}px, 0)`;
      this.heroHeadlineStage.style.opacity = opacity;
    }

    // 2. Aurora Canvas Parallax Drift
    if (this.auroraCanvas) {
      const auroraTop = this.auroraCanvas.parentElement.getBoundingClientRect().top;
      if (auroraTop < window.innerHeight && auroraTop > -window.innerHeight) {
        this.auroraCanvas.style.transform = `translate3d(0, ${auroraTop * 0.12}px, 0)`;
      }
    }

    // 3. Dynamic Experience Timeline Scrubber Line
    this.updateTimelineScrubber();
  }

  updateTimelineScrubber() {
    if (!this.timeline || !this.scrubLine) return;

    const timelineRect = this.timeline.getBoundingClientRect();
    const windowH = window.innerHeight;

    // Calculate how far through the timeline container the viewport center is
    const triggerPoint = windowH * 0.65;
    const scrollProgress = (triggerPoint - timelineRect.top) / timelineRect.height;
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Update scrubber height
    this.scrubLine.style.height = `${clampedProgress * 100}%`;

    // Activate experience items as the scrubber line touches them
    this.expItems.forEach(item => {
      const itemRect = item.getBoundingClientRect();
      if (itemRect.top < triggerPoint + 40) {
        if (!item.classList.contains('in-view')) {
          item.classList.add('in-view');
          if (window.portfolioSound) {
            window.portfolioSound.playTone(380, 'sine', 0.08, 0.02);
          }
        }
      } else {
        item.classList.remove('in-view');
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.scrollAnimationEngine = new ScrollAnimationEngine();
});
