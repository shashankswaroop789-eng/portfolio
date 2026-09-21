/**
 * APP.JS
 * Master Controller & Interactivity for Shashank Swaroop - Product Manager
 */

document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_EMAIL = 'shashankswaroop789@gmail.com';

  // 1. Header Scroll Shadow & Blur
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Ambient Spotlight following mouse in Hero
  const heroSection = document.getElementById('heroSection');
  const ambientGlow = document.getElementById('heroAmbientGlow');
  if (heroSection && ambientGlow) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ambientGlow.style.transform = `translate(calc(-50% + ${(x - rect.width / 2) * 0.15}px), calc(-50% + ${(y - rect.height / 2) * 0.15}px))`;
    });
  }

  // 3. Scroll Down Arrow Indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const target = document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 4. One-Click Copy & Toast
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailLink = document.getElementById('footerEmailLink');
  const toast = document.getElementById('toastNotice');

  function showToast(message) {
    if (toast) {
      const span = toast.querySelector('span');
      if (span) span.textContent = message;
      toast.classList.add('show');
      if (window.portfolioSound) {
        window.portfolioSound.playSuccess();
      }
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2800);
    }
  }

  function copyToClipboard(textStr, successMsg) {
    navigator.clipboard.writeText(textStr).then(() => {
      showToast(successMsg || `Copied ${textStr} to clipboard!`);
    }).catch(() => {
      prompt('Copy to clipboard:', textStr);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = copyBtn.getAttribute('data-email') || DEFAULT_EMAIL;
      copyToClipboard(email, 'Email copied to clipboard! Looking forward to connecting.');
    });
  }

  if (emailLink) {
    emailLink.addEventListener('click', (e) => {
      e.preventDefault();
      const email = emailLink.getAttribute('data-email') || DEFAULT_EMAIL;
      copyToClipboard(email, 'Email copied to clipboard! Looking forward to connecting.');
    });
  }

  // Color Swatches Copy
  document.querySelectorAll('.swatch-circle').forEach(swatch => {
    swatch.style.cursor = 'pointer';
    swatch.addEventListener('click', () => {
      const hex = swatch.classList.contains('amber') ? '#FFA800' : '#00FFE0';
      copyToClipboard(hex, `Design token ${hex} copied!`);
    });
  });

  // 5. Contact Inquire Button opens mailto
  const inquireBtn = document.getElementById('contactInquireBtn');
  if (inquireBtn) {
    inquireBtn.addEventListener('click', () => {
      window.location.href = `mailto:${DEFAULT_EMAIL}?subject=Product%20Leadership%20Inquiry%20for%20Shashank%20Swaroop&body=Hi%20Shashank,%0D%0A%0D%0AI%20explored%20your%20product%20portfolio%20and%20would%20love%20to%20connect%20regarding...`;
    });
  }

  // ==========================================================================
  // COOL ANIMATION 1: Magnetic Hover Effect on Buttons
  // ==========================================================================
  const magneticButtons = document.querySelectorAll('.cta-button-primary, .copy-email-btn, .carousel-btn, .sound-toggle, .filter-btn');

  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      // Gentle spring magnetic pull
      btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ==========================================================================
  // COOL ANIMATION 2: Interactive Eye Tracking on Character
  // ==========================================================================
  const pupilLeft = document.getElementById('characterPupilLeft');
  const pupilRight = document.getElementById('characterPupilRight');
  const characterGroup = document.getElementById('outroCharacterGroup');

  if (pupilLeft && pupilRight && characterGroup) {
    window.addEventListener('mousemove', (e) => {
      const rect = characterGroup.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - charCenterY, e.clientX - charCenterX);
      const maxDistance = 6.5; // Max pupil travel distance in SVG units

      const moveX = Math.cos(angle) * maxDistance;
      const moveY = Math.sin(angle) * maxDistance;

      pupilLeft.setAttribute('transform', `translate(${moveX}, ${moveY})`);
      pupilRight.setAttribute('transform', `translate(${moveX}, ${moveY})`);
    });
  }

  console.log('Shashank Swaroop — Product Manager Portfolio initialized with dynamic animations.');
});
