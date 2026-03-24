/* ===================================================
   Visual Effects — Sparkles, Golden Ring, Screen Shake
   =================================================== */

const Effects = (() => {

  // ========================
  //  Sparkle Particles
  // ========================
  function sparkle(targetEl, { count = 20, duration = 1500, colors = ['#f9a825', '#fff', '#ffecb3'] } = {}) {
    const rect = targetEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      dot.className = 'sparkle-particle';
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.5);
      const distance = 40 + Math.random() * 80;
      const size = 3 + Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(dot.style, {
        position: 'fixed',
        left: cx + 'px',
        top: cy + 'px',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 ${size}px ${color}`,
        zIndex: '10000',
        pointerEvents: 'none',
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        opacity: '1',
        transform: 'scale(1)',
      });

      document.body.appendChild(dot);

      // Trigger animation in next frame
      requestAnimationFrame(() => {
        dot.style.left = (cx + Math.cos(angle) * distance) + 'px';
        dot.style.top = (cy + Math.sin(angle) * distance) + 'px';
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
      });

      setTimeout(() => dot.remove(), duration + 100);
    }
  }

  // ========================
  //  Golden Ring Expansion
  // ========================
  function goldenRing(targetEl, { duration = 1200 } = {}) {
    const rect = targetEl.getBoundingClientRect();
    const ring = document.createElement('div');

    const size = Math.max(rect.width, rect.height);
    Object.assign(ring.style, {
      position: 'fixed',
      left: (rect.left + rect.width / 2 - size / 2) + 'px',
      top: (rect.top + rect.height / 2 - size / 2) + 'px',
      width: size + 'px',
      height: size + 'px',
      borderRadius: '50%',
      border: '3px solid #f9a825',
      boxShadow: '0 0 20px rgba(249, 168, 37, 0.5), inset 0 0 20px rgba(249, 168, 37, 0.2)',
      zIndex: '10000',
      pointerEvents: 'none',
      transition: `all ${duration}ms ease-out`,
      opacity: '1',
      transform: 'scale(1)',
    });

    document.body.appendChild(ring);

    requestAnimationFrame(() => {
      ring.style.transform = 'scale(2.5)';
      ring.style.opacity = '0';
      ring.style.borderWidth = '1px';
    });

    setTimeout(() => ring.remove(), duration + 100);
  }

  // ========================
  //  Screen Shake
  // ========================
  function shake(targetEl, { intensity = 5, duration = 300 } = {}) {
    targetEl.style.transition = `transform 50ms ease`;

    const steps = Math.floor(duration / 50);
    let step = 0;

    const interval = setInterval(() => {
      if (step >= steps) {
        clearInterval(interval);
        targetEl.style.transform = '';
        targetEl.style.transition = '';
        return;
      }

      const x = (Math.random() - 0.5) * 2 * intensity;
      const y = (Math.random() - 0.5) * 2 * intensity;
      targetEl.style.transform = `translate(${x}px, ${y}px)`;
      step++;
    }, 50);
  }

  // ========================
  //  Confetti Burst (for completion)
  // ========================
  function confetti({ count = 50, duration = 2000 } = {}) {
    const colors = ['#c62828', '#f9a825', '#2e7d32', '#1565c0', '#ff8f00', '#9c27b0'];

    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      const color = colors[Math.floor(Math.random() * colors.length)];
      const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
      const size = 6 + Math.random() * 6;
      const isRect = Math.random() > 0.5;

      Object.assign(piece.style, {
        position: 'fixed',
        left: startX + 'px',
        top: '-10px',
        width: (isRect ? size * 2 : size) + 'px',
        height: size + 'px',
        backgroundColor: color,
        borderRadius: isRect ? '2px' : '50%',
        zIndex: '10001',
        pointerEvents: 'none',
        opacity: '1',
        transform: `rotate(${Math.random() * 360}deg)`,
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
      });

      document.body.appendChild(piece);

      const endX = startX + (Math.random() - 0.5) * 400;
      const endY = window.innerHeight + 20;

      requestAnimationFrame(() => {
        piece.style.left = endX + 'px';
        piece.style.top = endY + 'px';
        piece.style.opacity = '0';
        piece.style.transform = `rotate(${360 + Math.random() * 720}deg)`;
      });

      setTimeout(() => piece.remove(), duration + 100);
    }
  }

  return { sparkle, goldenRing, shake, confetti };
})();
