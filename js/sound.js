/**
 * SOUND.JS
 * Zero-dependency Web Audio API sound synthesizer
 * Subtle, tasteful haptic audio feedback for interactions
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = true; // Default muted for respectful UX, user can click to unmute
    this.toggleBtn = document.getElementById('soundToggle');

    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleMute());
    }
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (!this.muted) {
      this.ensureContext();
      this.playTone(520, 'sine', 0.12, 0.08);
      if (this.toggleBtn) {
        this.toggleBtn.classList.add('playing');
        this.toggleBtn.setAttribute('title', 'Sound Enabled (Click to Mute)');
      }
    } else {
      if (this.toggleBtn) {
        this.toggleBtn.classList.remove('playing');
        this.toggleBtn.setAttribute('title', 'Sound Muted (Click to Enable)');
      }
    }
  }

  playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.05) {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay restrictions safety
    }
  }

  playCardFlip() {
    if (this.muted) return;
    this.playTone(280, 'sine', 0.14, 0.06);
    setTimeout(() => this.playTone(420, 'sine', 0.18, 0.04), 50);
  }

  playLensPickup() {
    if (this.muted) return;
    this.playTone(340, 'triangle', 0.18, 0.05);
  }

  playLensDrop() {
    if (this.muted) return;
    this.playTone(220, 'triangle', 0.2, 0.05);
  }

  playTabClick() {
    if (this.muted) return;
    this.playTone(600, 'sine', 0.08, 0.04);
  }

  playModalOpen() {
    if (this.muted) return;
    this.playTone(440, 'sine', 0.25, 0.06);
    setTimeout(() => this.playTone(660, 'sine', 0.3, 0.05), 80);
  }

  playSuccess() {
    if (this.muted) return;
    this.playTone(523.25, 'sine', 0.15, 0.06); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.06), 70); // E5
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.07), 140); // G5
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.portfolioSound = new SoundSynthesizer();
});
