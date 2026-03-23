/* ===================================================
   Badge Reveal — Badge earned celebration animation
   =================================================== */

const BadgeReveal = (() => {

  function render(container, badge) {
    container.innerHTML = `
      <div class="badge-earned">
        <div class="badge-icon-large">${badge.icon}</div>
        <div class="badge-name-large">${badge.name}</div>
        <p style="color: var(--earth-medium); font-size: 0.9rem;">${badge.description}</p>
      </div>
    `;

    // Trigger confetti
    spawnConfetti();
  }

  function spawnConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    document.body.appendChild(confettiContainer);

    const colors = ['#c62828', '#f9a825', '#2e7d32', '#1565c0', '#ff5252', '#ffd54f'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 6 + Math.random() * 8;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      piece.style.left = Math.random() * 100 + '%';
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.backgroundColor = color;
      piece.style.borderRadius = shape === 'circle' ? '50%' : '2px';
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';

      confettiContainer.appendChild(piece);
    }

    // Clean up after animation
    setTimeout(() => {
      confettiContainer.remove();
    }, 5000);
  }

  return { render };
})();
