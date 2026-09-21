/**
 * PROJECTS.JS
 * Product Management Playbook & High-Impact Case Studies for Shashank Swaroop
 */

const pmProjects = [
  {
    id: 'sponsorbridge',
    title: 'SponsorBridge — Creator Sponsorship & Escrow Platform',
    client: 'SponsorBridge (Founder & Product Lead)',
    category: 'marketplace',
    categoryLabel: 'Fintech & Marketplace / 0-to-1',
    year: '2025 – 2026',
    liveUrl: 'https://sponser-bridge.vercel.app/',
    summary: '0-to-1 two-sided platform bridging brands and creators: deal pitching, real-time negotiation, video scheduling, online contract signing, escrow fund protection, wallet ledger, and post-campaign analytics.',
    fullDescription: 'Brand-creator sponsorships are historically plagued by payment defaults, ambiguous deliverable scope, and chaotic communication across emails and DMs. I conceived, designed, and launched SponsorBridge as a unified, trustless marketplace bridging companies with verified digital creators. The platform handles the entire sponsorship lifecycle: brand pitch discovery, in-app chat with interactive counter-offer negotiations, video meeting scheduling, legally-binding digital contract e-signing, milestone escrow protection, an internal digital wallet with deposit & withdrawal rails, an automated financial audit ledger, and post-campaign ROI analytics.',
    role: 'Founder & Lead Product Manager (0-to-1 Conception, System Architecture, UI/UX & Delivery)',
    deliverables: [
      'Brand-to-Creator Deal Pitching & Discovery Marketplace',
      'Real-Time Chat with Interactive Counter-Offer Negotiation Cards',
      'Integrated Video Meeting Scheduling for Deal Alignment',
      'Legally-Binding Online Contract Generation & E-Signing Flow',
      'Milestone-Based Escrow Protection & Automated Release Engine',
      'In-Platform Digital Wallet, Bank Deposits & Creator Withdrawals',
      'Direct Business-to-Creator Money Transfer Infrastructure',
      'Double-Entry Financial Audit Ledger & Fee Attribution',
      'Post-Campaign Performance Analytics & Deliverables Verification'
    ],
    featureBreakdown: [
      { icon: '🤝', title: 'Pitch & Discovery', desc: 'Businesses discover vetted creators and pitch targeted campaign briefs with custom deliverables and budgets.' },
      { icon: '💬', title: 'Chat & Negotiation', desc: 'In-app real-time messaging with dynamic counter-offer presentation for frictionless scope and price alignment.' },
      { icon: '📹', title: 'Video Scheduling', desc: 'Direct calendar integration enabling 1-on-1 video calls between brands and creators prior to deal lock.' },
      { icon: '✍️', title: 'Contract E-Signing', desc: 'Automated legal agreement generation and enforceable digital signature flow directly inside the deal drawer.' },
      { icon: '🔒', title: 'Escrow Protection', desc: 'Brands fund milestones securely into escrow; funds are locked and only released upon verified delivery.' },
      { icon: '💳', title: 'Wallet & Transfers', desc: 'Dedicated digital balance supporting bank/UPI deposits, business-to-creator transfers, and instant withdrawals.' },
      { icon: '📜', title: 'Audit Ledger', desc: 'Transparent double-entry ledger recording every deposit, escrow lock, release, platform fee, and payout.' },
      { icon: '📊', title: 'Post-Campaign Data', desc: 'Live proof-of-work link validation, reach metrics, engagement rate verification, and ROI reporting.' }
    ],
    metrics: [
      { label: 'Escrow Protection', value: '100%', change: 'Zero payment defaults' },
      { label: 'Unified Deal Flow', value: '9 in 1', change: 'Pitch to payout' },
      { label: 'Payout Execution', value: '< 24h', change: 'Direct bank/UPI transfer' },
      { label: 'Live Platform', value: 'Live', change: 'sponser-bridge.vercel.app' }
    ],
    accentColor: '#00FFE0',
    tags: [
      'Creator Economy',
      'Fintech Escrow',
      'Digital Wallet',
      'Contract E-Signing',
      'Real-Time Chat',
      'Audit Ledger',
      'Video Scheduling',
      'Razorpay',
      'Post-Campaign Analytics'
    ],
    gradient: 'linear-gradient(135deg, #051923 0%, #00FFE0 45%, #FFA800 100%)'
  },
  {
    id: 'twinleaves-pos',
    title: 'Twinleaves Restaurant POS',
    client: 'Twinleaves',
    category: 'pos',
    categoryLabel: '0-to-1 Product / Restaurant Tech',
    year: '2025',
    summary: 'Spearheaded 0-to-1 product discovery, workflow mapping, and sprint execution for an all-in-one cloud Restaurant POS system.',
    fullDescription: 'High-volume dining establishments struggle with order mismatches, long cashier queues, and chaotic kitchen coordination during rush hours. At Twinleaves, I led product scoping for our next-generation Restaurant POS, unifying table management, instant KOT kitchen dispatch, and rapid split-billing into a touch-optimized terminal interface.',
    role: 'Product Management Intern (Discovery, PRDs, UX & Sprint Delivery)',
    deliverables: [
      'Interactive Floor Plan & Dynamic Table Status Map',
      'Instant Kitchen Order Ticketing (KOT) Routing Engine',
      'Rapid 3-Tap Billing & Multi-Tender Split Checkout',
      'Receipt Printer, Barcode & Payment Terminal Specs'
    ],
    featureBreakdown: [
      { icon: '🪑', title: 'Table & Floor Plan', desc: 'Visual floor map with real-time dining occupancy states (Vacant, Seated, Order Placed, Billed).' },
      { icon: '⚡', title: 'Rapid 3-Tap Billing', desc: 'Streamlined order punch-in with instant modifier tags, combo deals, and split-tender payment checkout.' },
      { icon: '👨‍🍳', title: 'Kitchen Order (KOT)', desc: 'Real-time wireless dispatch to kitchen display screens & thermal station printers with prep alerts.' },
      { icon: '💳', title: 'Multi-Tender Payments', desc: 'Integrated UPI dynamic QR, cards, and cash split options with automatic tax & discount rules.' }
    ],
    metrics: [
      { label: 'Order Punch-in Time', value: '< 3s', change: '3-tap fast checkout' },
      { label: 'Order-to-Kitchen Latency', value: 'Instant', change: 'Real-time KOT sync' },
      { label: 'Billing & Split Accuracy', value: '100%', change: 'Multi-tender UPI/Cash' }
    ],
    accentColor: '#FFA800',
    tags: ['0 to 1 POS', 'Restaurant Tech', 'PRDs & Specs', 'KOT Dispatch', 'Billing Flow'],
    gradient: 'linear-gradient(135deg, #1C1204 0%, #FFA800 100%)'
  }
];

class ProjectsManager {
  constructor() {
    this.grid = document.getElementById('projectsGrid');
    this.filterBtns = Array.from(document.querySelectorAll('.filter-btn'));
    this.modalOverlay = document.getElementById('caseStudyModal');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.modalContent = document.getElementById('modalDetails');

    if (!this.grid) return;

    this.activeFilter = 'all';
    this.init();
  }

  init() {
    this.renderProjects();
    this.bindEvents();
  }

  renderProjects() {
    const filtered = this.activeFilter === 'all'
      ? pmProjects
      : pmProjects.filter(p => p.category === this.activeFilter);

    this.grid.innerHTML = filtered.map(project => `
      <article class="project-card" data-project-id="${project.id}">
        <div class="project-media-wrapper">
          <div style="width: 100%; height: 100%; background: ${project.gradient}; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative; padding: 2rem;">
            <div style="position: absolute; inset: 0; background: radial-gradient(circle at center, transparent 30%, rgba(6, 8, 13, 0.75) 100%);"></div>
            
            <div style="position: relative; z-index: 1; text-align: center;">
              <span style="font-size: 0.72rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: ${project.accentColor}; opacity: 0.95;">
                ${project.client}
              </span>
              <h3 style="font-size: clamp(1.6rem, 2.8vw, 2.3rem); font-weight: 800; color: #fff; text-shadow: 0 10px 30px rgba(0,0,0,0.8); line-height: 1.15; margin-top: 0.5rem;">
                ${project.title}
              </h3>
              
              <div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 1.25rem;">
                ${project.metrics.slice(0, 2).map(m => `
                  <div style="background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); padding: 8px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 1.25rem; font-weight: 800; color: #fff;">${m.value}</div>
                    <div style="font-size: 0.62rem; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.08em;">${m.label}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <span class="project-badge-tag">${project.categoryLabel}</span>
          ${project.liveUrl ? `
            <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-live-link" onclick="event.stopPropagation();" title="Visit live platform">
              <span>Live App</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          ` : ''}
          <button class="project-open-btn" aria-label="View Product Case Study">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        </div>
        <div class="project-content-area">
          <div class="project-client-row">
            <span class="project-client-name">${project.client}</span>
            <span class="project-year">${project.year}</span>
          </div>
          <h4 class="project-heading">${project.title}</h4>
          <p class="project-summary">${project.summary}</p>
          <div class="project-tech-pills">
            ${project.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    // Attach card click & 3D tilt/spotlight handlers
    this.grid.querySelectorAll('.project-card').forEach(card => {
      // Spotlight layer
      let spotlight = card.querySelector('.card-spotlight-layer');
      if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'card-spotlight-layer';
        card.appendChild(spotlight);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        spotlight.style.background = `radial-gradient(450px circle at ${x}px ${y}px, rgba(0, 255, 224, 0.14), transparent 70%)`;

        // 3D Tilt calculation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = ((y - centerY) / centerY) * -5;
        const tiltY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });

      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        this.openModal(id);
      });
    });
  }

  openModal(projectId) {
    const project = pmProjects.find(p => p.id === projectId);
    if (!project || !this.modalOverlay) return;

    if (window.portfolioSound) {
      window.portfolioSound.playModalOpen();
    }

    this.modalContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 0.75rem; flex-wrap: wrap;">
            <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: ${project.accentColor};">
              ${project.categoryLabel}
            </span>
            <span style="color: var(--text-muted);">•</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${project.year}</span>
            ${project.liveUrl ? `
              <span style="color: var(--text-muted);">•</span>
              <span style="font-size: 0.72rem; font-weight: 800; color: var(--accent-cyan); background: rgba(0,255,224,0.1); border: 1px solid rgba(0,255,224,0.3); padding: 2px 10px; border-radius: 12px;">LIVE APP</span>
            ` : ''}
          </div>
          <h2 style="font-size: clamp(2rem, 3.8vw, 3.4rem); font-weight: 800; letter-spacing: -0.03em; color: #fff; line-height: 1.15;">
            ${project.title}
          </h2>
          <p style="font-size: 1.12rem; color: var(--text-secondary); margin-top: 1rem; line-height: 1.6;">
            ${project.fullDescription}
          </p>
          <div style="font-size: 0.85rem; font-weight: 700; color: #fff; margin-top: 0.85rem; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--accent-amber);">⚡ Role:</span> ${project.role}
          </div>

          ${project.liveUrl ? `
            <div style="display: flex; align-items: center; gap: 14px; margin-top: 1.25rem; flex-wrap: wrap;">
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="cta-button-primary" style="text-decoration: none; display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; font-size: 0.88rem;">
                <span>Visit Live Platform</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
              <span style="font-size: 0.82rem; color: var(--accent-cyan); font-family: monospace;">${project.liveUrl}</span>
            </div>
          ` : ''}
        </div>

        <!-- Metrics Showcase Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.25rem;">
          ${project.metrics.map(m => `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 1.4rem; text-align: center;">
              <div style="font-size: clamp(1.8rem, 3.2vw, 2.6rem); font-weight: 800; color: #fff; letter-spacing: -0.03em;">
                ${m.value}
              </div>
              <div style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-secondary); margin-top: 4px;">
                ${m.label}
              </div>
              <div style="font-size: 0.72rem; color: var(--accent-cyan); margin-top: 6px; font-weight: 600;">
                ${m.change}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Dedicated Feature Breakdown / Architecture Grid -->
        ${project.featureBreakdown ? `
          <div style="background: rgba(0, 255, 224, 0.03); border: 1px solid rgba(0, 255, 224, 0.15); border-radius: 16px; padding: 1.5rem;">
            <h4 style="font-size: 0.82rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent-cyan); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 8px;">
              <span>⚡ Core System Architecture &amp; Product Capabilities</span>
            </h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px;">
              ${project.featureBreakdown.map(f => `
                <div style="background: rgba(0, 0, 0, 0.45); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 14px;">
                  <div style="font-size: 0.92rem; font-weight: 700; color: #fff; margin-bottom: 5px; display: flex; align-items: center; gap: 8px;">
                    <span>${f.icon}</span> ${f.title}
                  </div>
                  <div style="font-size: 0.8rem; color: #94A3B8; line-height: 1.45;">
                    ${f.desc}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; margin-top: 0.5rem;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 16px; padding: 1.5rem;">
            <h4 style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 1rem;">
              Product Strategy &amp; Deliverables
            </h4>
            <ul style="display: flex; flex-direction: column; gap: 10px;">
              ${project.deliverables.map(d => `<li style="font-size: 0.92rem; color: #fff; display: flex; align-items: center; gap: 10px;"><span style="color: ${project.accentColor}; font-weight: 800;">✓</span> ${d}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: 16px; padding: 1.5rem;">
            <h4 style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 1rem;">
              PM Competencies &amp; Stack
            </h4>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
              ${project.tags.map(t => `<span class="tech-pill">${t}</span>`).join('')}
            </div>
            <div style="margin-top: 1.5rem; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              Led end-to-end product lifecycle: discovery interviews, scoping PRDs, managing sprint backlogs, payment integration, and post-launch analytics.
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-glass); flex-wrap: wrap; gap: 1rem;">
          <div>
            ${project.liveUrl ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 0.88rem; color: var(--accent-cyan); font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px;">
                <span>Open ${project.title.split('—')[0].trim()} Live</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ` : `
              <span style="font-size: 0.85rem; color: var(--text-muted);">
                Need a PM who moves numbers and drives product clarity?
              </span>
            `}
          </div>
          <button class="cta-button-primary" onclick="window.location.href='#contact'; document.getElementById('caseStudyModal').classList.remove('active');">
            Connect with Shashank →
          </button>
        </div>
      </div>
    `;

    this.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    if (!this.modalOverlay) return;
    this.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  bindEvents() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.getAttribute('data-filter');
        this.renderProjects();
        if (window.portfolioSound) {
          window.portfolioSound.playTabClick();
        }
      });
    });

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modalOverlay) {
      this.modalOverlay.addEventListener('click', (e) => {
        if (e.target === this.modalOverlay) {
          this.closeModal();
        }
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalOverlay && this.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.projectsManager = new ProjectsManager();
});
