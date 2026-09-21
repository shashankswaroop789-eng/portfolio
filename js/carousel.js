/**
 * CAROUSEL.JS
 * 3D Stacked Card Deck Carousel
 * Recreating Dribbble video frames 00:07-00:12
 */

class CardStackCarousel {
  constructor() {
    this.deck = document.getElementById('cardsDeck');
    this.cards = Array.from(document.querySelectorAll('.stacked-card'));
    this.dots = Array.from(document.querySelectorAll('.carousel-dot'));
    this.prevBtn = document.getElementById('carouselPrev');
    this.nextBtn = document.getElementById('carouselNext');

    if (!this.deck || this.cards.length === 0) return;

    this.currentIndex = 0;
    this.totalCards = this.cards.length;
    this.isAnimating = false;

    // Drag / Swipe tracking
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.updateCardPositions();
    this.bindEvents();
  }

  updateCardPositions() {
    this.cards.forEach((card, index) => {
      // Calculate relative circular depth from current index
      const diff = (index - this.currentIndex + this.totalCards) % this.totalCards;

      if (diff === 0) {
        card.setAttribute('data-depth', '0'); // Front card
      } else if (diff === 1) {
        card.setAttribute('data-depth', '1'); // Second behind
      } else if (diff === 2) {
        card.setAttribute('data-depth', '2'); // Third behind
      } else if (diff === 3) {
        card.setAttribute('data-depth', '3'); // Fourth behind
      } else {
        card.setAttribute('data-depth', 'hidden');
      }
    });

    // Update pagination dots
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }

  next() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.totalCards;
    this.updateCardPositions();
    
    if (window.portfolioSound) {
      window.portfolioSound.playCardFlip();
    }

    setTimeout(() => {
      this.isAnimating = false;
    }, 450);
  }

  prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = (this.currentIndex - 1 + this.totalCards) % this.totalCards;
    this.updateCardPositions();

    if (window.portfolioSound) {
      window.portfolioSound.playCardFlip();
    }

    setTimeout(() => {
      this.isAnimating = false;
    }, 450);
  }

  goTo(index) {
    if (index === this.currentIndex || this.isAnimating) return;
    this.isAnimating = true;
    this.currentIndex = index;
    this.updateCardPositions();

    if (window.portfolioSound) {
      window.portfolioSound.playCardFlip();
    }

    setTimeout(() => {
      this.isAnimating = false;
    }, 450);
  }

  bindEvents() {
    // Buttons
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());

    // Dots
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    // Click on individual cards
    this.cards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        const depth = card.getAttribute('data-depth');
        if (depth !== '0') {
          // If clicked a card behind, cycle directly to it
          this.goTo(index);
        } else {
          // If front card clicked, cycle to next
          this.next();
        }
      });
    });

    // Touch & Swipe Support
    this.deck.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.isDragging = true;
    }, { passive: true });

    this.deck.addEventListener('touchend', (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - this.touchStartX;
      const deltaY = endY - this.touchStartY;

      // Only trigger if primarily horizontal swipe
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    });

    // Keyboard navigation when in viewport
    window.addEventListener('keydown', (e) => {
      const rect = this.deck.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        this.next();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        this.prev();
      }
    });

    // 3D Card Mouse Parallax Tilt on Front Card
    this.deck.addEventListener('mousemove', (e) => {
      const frontCard = this.cards.find(c => c.getAttribute('data-depth') === '0');
      if (!frontCard) return;

      const rect = this.deck.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const tiltX = (y / (rect.height / 2)) * -6;
      const tiltY = (x / (rect.width / 2)) * 6;

      frontCard.style.transform = `translateY(0) scale(1) translateZ(0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    this.deck.addEventListener('mouseleave', () => {
      const frontCard = this.cards.find(c => c.getAttribute('data-depth') === '0');
      if (frontCard) {
        frontCard.style.transform = 'translateY(0) scale(1) translateZ(0) rotateX(0deg) rotateY(0deg)';
      }
    });

    // Interactive Strategy Milestone Nodes Clicker
    const milestoneNodes = document.querySelectorAll('.strategy-node');
    const milestoneTargets = {
      'Q1': { target: '$8M ARR (Beta Launch)', nrr: '112% NRR' },
      'Q2': { target: '$16M ARR (PLG Funnel)', nrr: '124% NRR' },
      'Q3': { target: '$24M ARR (Scale GTM)', nrr: '132% NRR' },
      'Q4': { target: '$32M ARR (Enterprise)', nrr: '138% NRR' }
    };

    milestoneNodes.forEach(node => {
      node.addEventListener('click', (e) => {
        e.stopPropagation(); // Don't advance card
        milestoneNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const phase = node.querySelector('.strategy-node-phase')?.textContent.trim();
        const data = milestoneTargets[phase];
        if (data) {
          const badgeTitle = document.querySelector('.strategy-metric-badge h4');
          const badgePill = document.querySelector('.strategy-metric-badge span');
          if (badgeTitle) badgeTitle.textContent = data.target;
          if (badgePill) badgePill.textContent = data.nrr;
        }

        if (window.portfolioSound) {
          window.portfolioSound.playTabClick();
        }
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.cardStackCarousel = new CardStackCarousel();
});
