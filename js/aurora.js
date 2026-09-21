/**
 * AURORA.JS
 * Organic Flowing Mesh Gradient Waves matching Dribbble video frames 00:07-00:12
 * Smooth 60fps canvas animation with multi-octave harmonic color blending
 */

class AuroraFlow {
  constructor() {
    this.canvas = document.getElementById('auroraCanvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.width = 0;
    this.height = 0;
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    
    // Gradient Blobs matching original Dribbble video colors
    this.blobs = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, r: 0.55, color: 'rgba(157, 78, 221, 0.75)' }, // Royal Purple
      { x: 0.8, y: 0.4, vx: -0.0002, vy: 0.0003, r: 0.5, color: 'rgba(0, 255, 224, 0.65)' },  // Electric Cyan
      { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0003, r: 0.6, color: 'rgba(224, 30, 90, 0.7)' },   // Neon Magenta
      { x: 0.85, y: 0.8, vx: -0.0003, vy: -0.0002, r: 0.45, color: 'rgba(255, 168, 0, 0.55)' },// Golden Amber
      { x: 0.15, y: 0.85, vx: 0.0002, vy: 0.0002, r: 0.65, color: 'rgba(12, 40, 73, 0.85)' }  // Deep Midnight Navy
    ];

    this.mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    this.animId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX / window.innerWidth;
      this.mouse.targetY = e.clientY / window.innerHeight;
    });

    this.startLoop();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent.offsetWidth || window.innerWidth;
    this.height = parent.offsetHeight || 800;

    // Use downscaled resolution for buttery smooth blur performance
    this.canvas.width = Math.floor(this.width * 0.5);
    this.canvas.height = Math.floor(this.height * 0.5);
  }

  startLoop() {
    let time = 0;

    const render = () => {
      time += 0.008;

      // Mouse lerp
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

      const w = this.canvas.width;
      const h = this.canvas.height;

      // Clear with dark base
      this.ctx.fillStyle = '#06080D';
      this.ctx.fillRect(0, 0, w, h);

      // Render flowing radial gradient nodes
      this.ctx.globalCompositeOperation = 'screen';

      this.blobs.forEach((blob, i) => {
        // Natural Lissajous wave drift
        const waveX = Math.sin(time * 0.8 + i * 1.5) * 0.08 + (this.mouse.x - 0.5) * 0.12;
        const waveY = Math.cos(time * 0.6 + i * 1.2) * 0.08 + (this.mouse.y - 0.5) * 0.12;

        const cx = (blob.x + waveX) * w;
        const cy = (blob.y + waveY) * h;
        const radius = blob.r * Math.min(w, h);

        const grad = this.ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.5, blob.color.replace(/[\d\.]+\)$/, '0.3)'));
        grad.addColorStop(1, 'transparent');

        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        this.ctx.fill();
      });

      this.ctx.globalCompositeOperation = 'source-over';

      this.animId = requestAnimationFrame(render);
    };

    this.animId = requestAnimationFrame(render);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.auroraFlow = new AuroraFlow();
});
