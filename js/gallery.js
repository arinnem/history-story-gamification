/* ===================================================
   Gallery — Card collection and badge display
   =================================================== */

const Gallery = (() => {

  function init() {
    bindEvents();
    console.log('[Gallery] Initialized.');
  }

  function bindEvents() {
    // Gallery button
    const btnGallery = document.getElementById('btn-gallery');
    if (btnGallery) {
      btnGallery.addEventListener('click', () => openGallery());
    }

    // Badges button (also opens gallery, scrolled to badges)
    const btnBadges = document.getElementById('btn-badges');
    if (btnBadges) {
      btnBadges.addEventListener('click', () => openGallery('badges'));
    }

    // Close button
    const closeBtn = document.getElementById('gallery-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeGallery);
    }

    // Click outside to close
    const modal = document.getElementById('gallery-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGallery();
      });
    }

    // Listen for state changes
    document.addEventListener('gateCompleted', () => refreshGallery());
    document.addEventListener('progressReset', () => refreshGallery());
  }

  function openGallery(scrollTo) {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;

    renderCards();
    renderBadges();
    modal.style.display = 'flex';

    if (scrollTo === 'badges') {
      const badgesTitle = modal.querySelector('.badges-title');
      if (badgesTitle) {
        setTimeout(() => badgesTitle.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    }
  }

  function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    if (modal) modal.style.display = 'none';
  }

  function refreshGallery() {
    const modal = document.getElementById('gallery-modal');
    if (modal && modal.style.display !== 'none') {
      renderCards();
      renderBadges();
    }
  }

  // Render character cards
  function renderCards() {
    const container = document.getElementById('card-gallery');
    if (!container) return;

    const state = GameEngine.getState();
    let html = '';

    for (let i = 1; i <= GameEngine.TOTAL_GATES; i++) {
      const gate = GATES_DATA[i];
      const gateState = state.gates[i];

      // Primary card
      if (gateState.cardCollected) {
        html += renderCollectedCard(gate.character, i);
      } else {
        html += renderLockedCard(i);
      }

      // Gate 4 has a second card
      if (i === 4 && gate.character2) {
        if (gateState.card2Collected) {
          html += renderCollectedCard(gate.character2, '4b');
        } else {
          html += renderLockedCard('4b');
        }
      }
    }

    container.innerHTML = html;
  }

  function renderCollectedCard(character, id) {
    const portrait = character.image
      ? `<img class="card-portrait" src="${character.image}" alt="${character.name}">`
      : `<div class="card-portrait" style="background: linear-gradient(135deg, var(--olive) 0%, var(--earth-dark) 100%); display:flex; align-items:center; justify-content:center; font-size:2rem; color:var(--gold); width:80%; aspect-ratio:1; border-radius:50%; border:2px solid var(--gold);">⭐</div>`;

    return `
      <div class="card-slot collected" data-card="${id}">
        ${portrait}
        <span class="card-name">${character.name}</span>
      </div>
    `;
  }

  function renderLockedCard(id) {
    return `
      <div class="card-slot locked" data-card="${id}">
        <span class="card-mystery">❓</span>
        <span class="card-name">???</span>
      </div>
    `;
  }

  // Render badges
  function renderBadges() {
    const container = document.getElementById('badge-gallery');
    if (!container) return;

    const state = GameEngine.getState();
    let html = '';

    for (let i = 1; i <= GameEngine.TOTAL_GATES; i++) {
      const gate = GATES_DATA[i];
      const gateState = state.gates[i];

      if (gateState.badgeEarned) {
        html += `
          <div class="badge-slot earned" data-badge="${i}">
            <div class="badge-icon-display">${gate.badge.icon}</div>
            <span class="badge-name">${gate.badge.name}</span>
          </div>
        `;
      } else {
        html += `
          <div class="badge-slot locked" data-badge="${i}">
            <div class="badge-icon-display">🔒</div>
            <span class="badge-name">???</span>
          </div>
        `;
      }
    }

    container.innerHTML = html;
  }

  return {
    init,
    openGallery,
    closeGallery,
    refreshGallery
  };
})();
