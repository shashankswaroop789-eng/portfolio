/**
 * EXPERIENCE.JS
 * Interactive Timeline & Leadership Track Record Logic
 */

class ExperienceTimeline {
  constructor() {
    this.items = document.querySelectorAll('.experience-item');
    if (this.items.length === 0) return;

    this.init();
  }

  init() {
    this.items.forEach(item => {
      const card = item.querySelector('.experience-card');
      if (!card) return;

      // Mousemove spotlight effect on card
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        let spotlight = card.querySelector('.card-spotlight-layer');
        if (!spotlight) {
          spotlight = document.createElement('div');
          spotlight.className = 'card-spotlight-layer';
          card.appendChild(spotlight);
        }

        spotlight.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(0, 255, 224, 0.12), transparent 70%)`;
      });

      // Sound and active beacon trigger
      card.addEventListener('mouseenter', () => {
        if (window.portfolioSound) {
          window.portfolioSound.playTabClick();
        }
      });
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.experienceTimeline = new ExperienceTimeline();
});
