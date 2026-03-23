/* ===================================================
   Card Reveal — Character card flip animation
   =================================================== */

const CardReveal = (() => {

  function render(container, character, append = false) {
    const portrait = character.image
      ? `<img src="${character.image}" alt="${character.name}" style="width:100%;height:100%;object-fit:cover;">`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg, var(--olive) 0%, var(--earth-dark) 100%);display:flex;align-items:center;justify-content:center;font-size:3rem;color:var(--gold);">⭐</div>`;

    const cardHtml = `
      <div class="character-card" id="card-reveal-${Date.now()}">
        <div class="character-card-inner">
          <div class="character-card-back">
            <span class="card-back-mystery">🃏</span>
            <span class="card-back-label">Thẻ Nhân Vật</span>
          </div>
          <div class="character-card-front">
            <div class="card-portrait-area">
              ${portrait}
            </div>
            <div class="card-info">
              <div class="card-char-name">${character.name}</div>
              <div class="card-char-title">${character.title}</div>
              <div class="card-char-achievement">${character.achievement}</div>
              <div class="card-char-quote">${character.quote}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    if (append) {
      container.insertAdjacentHTML('beforeend', cardHtml);
    } else {
      container.innerHTML = cardHtml;
    }

    // Auto-flip after a short delay
    const card = container.querySelector('.character-card:last-child');
    setTimeout(() => {
      if (card) card.classList.add('flipped');
    }, 800);
  }

  return { render };
})();
