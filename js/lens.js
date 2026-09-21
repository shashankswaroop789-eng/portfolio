/**
 * LENS.JS
 * Interactive Magnifying Glass with Optical Refraction & Chromatic Aberration
 * Optimized magnification (1.36x) with zoom toggle and fluid physics
 */

class InteractiveLens {
  constructor() {
    this.stage = document.getElementById('heroHeadlineStage');
    this.lens = document.getElementById('heroLens');
    this.sourceContent = document.getElementById('heroHeadlineSource');
    this.lensContent = document.getElementById('lensContent');
    this.chromaRed = document.getElementById('lensChromaRed');
    this.chromaCyan = document.getElementById('lensChromaCyan');
    this.chromaMain = document.getElementById('lensChromaMain');

    if (!this.stage || !this.lens || !this.sourceContent) return;

    // Optical magnification settings - lower, comfortable zoom level
    this.zoomLevels = [1.32, 1.42, 1.25];
    this.zoomIndex = 0;
    this.magnification = this.zoomLevels[this.zoomIndex]; // Default ~1.32x (lowered from 1.95)

    this.lensWidth = this.lens.offsetWidth || 270;
    this.lensHeight = this.lens.offsetHeight || 270;

    // Physics & positions
    this.pos = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.isDragging = false;
    this.isHoveringHero = false;
    this.idleTime = 0;
    this.animId = null;

    // Drag tracking
    this.dragOffset = { x: 0, y: 0 };
    this.hasMovedSignificantly = false;
    this.mouseDownPos = { x: 0, y: 0 };

    this.init();
  }

  init() {
    this.syncContent();
    this.setupInitialPosition();
    this.bindEvents();
    this.startRenderLoop();
  }

  syncContent() {
    const html = this.sourceContent.innerHTML;
    if (this.chromaMain) this.chromaMain.innerHTML = html;
    if (this.chromaRed) this.chromaRed.innerHTML = html;
    if (this.chromaCyan) this.chromaCyan.innerHTML = html;
  }

  setupInitialPosition() {
    const rect = this.stage.getBoundingClientRect();
    // Default initial resting position over "product" / "manager"
    this.pos.x = rect.width * 0.42;
    this.pos.y = rect.height * 0.42;
    this.target.x = this.pos.x;
    this.target.y = this.pos.y;
    this.updateDimensions();
  }

  updateDimensions() {
    this.lensWidth = this.lens.offsetWidth || 270;
    this.lensHeight = this.lens.offsetHeight || 270;
  }

  cycleZoom() {
    this.zoomIndex = (this.zoomIndex + 1) % this.zoomLevels.length;
    this.magnification = this.zoomLevels[this.zoomIndex];
    
    // Update indicator label
    const indicator = this.lens.querySelector('.lens-indicator');
    if (indicator) {
      indicator.textContent = `ZOOM: ${Math.round(this.magnification * 100)}% (CLICK TO TOGGLE)`;
      indicator.style.opacity = '1';
      setTimeout(() => {
        if (!this.isHoveringHero && !this.isDragging) {
          indicator.style.opacity = '';
        }
      }, 1500);
    }

    if (window.portfolioSound) {
      window.portfolioSound.playTabClick();
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.updateDimensions();
      this.syncContent();
    });

    // Hero stage mouse interaction
    this.stage.addEventListener('mousemove', (e) => {
      if (this.isDragging) return;
      const rect = this.stage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        this.isHoveringHero = true;
        this.target.x = x;
        this.target.y = y;
        this.idleTime = 0;
      }
    });

    this.stage.addEventListener('mouseenter', () => {
      this.isHoveringHero = true;
      this.idleTime = 0;
    });

    this.stage.addEventListener('mouseleave', () => {
      this.isHoveringHero = false;
    });

    // Drag & Click Zoom Toggle
    const onDragStart = (e) => {
      this.isDragging = true;
      this.idleTime = 0;
      this.hasMovedSignificantly = false;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      this.mouseDownPos = { x: clientX, y: clientY };

      const lensRect = this.lens.getBoundingClientRect();
      this.dragOffset.x = clientX - (lensRect.left + lensRect.width / 2);
      this.dragOffset.y = clientY - (lensRect.top + lensRect.height / 2);

      if (window.portfolioSound) {
        window.portfolioSound.playLensPickup();
      }
    };

    const onDragMove = (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      if (Math.hypot(clientX - this.mouseDownPos.x, clientY - this.mouseDownPos.y) > 6) {
        this.hasMovedSignificantly = true;
      }

      const rect = this.stage.getBoundingClientRect();
      const newX = clientX - rect.left - this.dragOffset.x;
      const newY = clientY - rect.top - this.dragOffset.y;

      const pad = 20;
      this.target.x = Math.max(pad, Math.min(rect.width - pad, newX));
      this.target.y = Math.max(pad, Math.min(rect.height - pad, newY));
      this.pos.x = this.target.x;
      this.pos.y = this.target.y;
    };

    const onDragEnd = () => {
      if (this.isDragging) {
        if (!this.hasMovedSignificantly) {
          // If clicked without dragging, cycle zoom level!
          this.cycleZoom();
        }
        if (window.portfolioSound) {
          window.portfolioSound.playLensDrop();
        }
      }
      this.isDragging = false;
    };

    this.lens.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);

    this.lens.addEventListener('touchstart', onDragStart, { passive: false });
    window.addEventListener('touchmove', onDragMove, { passive: false });
    window.addEventListener('touchend', onDragEnd);
  }

  startRenderLoop() {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      this.render(dt, currentTime);
      this.animId = requestAnimationFrame(loop);
    };

    this.animId = requestAnimationFrame(loop);
  }

  render(dt, time) {
    const stageRect = this.stage.getBoundingClientRect();

    // Idle wandering animation when user hasn't moved
    if (!this.isHoveringHero && !this.isDragging) {
      this.idleTime += dt;
      if (this.idleTime > 2.0) {
        const t = time * 0.00075;
        const centerX = stageRect.width * 0.48;
        const centerY = stageRect.height * 0.44;
        const amplitudeX = stageRect.width * 0.28;
        const amplitudeY = stageRect.height * 0.18;

        this.target.x = centerX + Math.cos(t) * amplitudeX;
        this.target.y = centerY + Math.sin(t * 2) * 0.5 * amplitudeY;
      }
    }

    // Spring interpolation (lerp)
    const lerpFactor = this.isDragging ? 1 : 0.1;
    this.pos.x += (this.target.x - this.pos.x) * lerpFactor;
    this.pos.y += (this.target.y - this.pos.y) * lerpFactor;

    // Apply lens position with subtle velocity tilt
    const vx = (this.target.x - this.pos.x) * 0.08;
    const tiltZ = Math.max(-10, Math.min(10, vx));
    this.lens.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%) rotate(${tiltZ}deg)`;

    // Optical magnification mapping
    const lensRadiusX = this.lensWidth / 2;
    const lensRadiusY = this.lensHeight / 2;

    const offsetX = -this.pos.x * this.magnification + lensRadiusX;
    const offsetY = -this.pos.y * this.magnification + lensRadiusY;

    if (this.lensContent) {
      this.lensContent.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${this.magnification})`;
    }

    // Dynamic chromatic aberration
    const dx = (this.target.x - this.pos.x) * 0.12;
    const dy = (this.target.y - this.pos.y) * 0.12;
    const distFromCenter = (this.pos.x - stageRect.width / 2) / (stageRect.width / 2);

    const chromaSpreadX = Math.max(1.2, Math.abs(dx) * 1.5 + Math.abs(distFromCenter) * 2.0);
    const chromaSpreadY = Math.max(0.8, Math.abs(dy) * 1.2);

    if (this.chromaRed) {
      this.chromaRed.style.transform = `translate(${-chromaSpreadX}px, ${-chromaSpreadY * 0.5}px)`;
    }
    if (this.chromaCyan) {
      this.chromaCyan.style.transform = `translate(${chromaSpreadX}px, ${chromaSpreadY * 0.5}px)`;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.interactiveLens = new InteractiveLens();
});
