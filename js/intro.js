/* ===================================================
   Cinematic Intro — Sequence controller + skip logic
   =================================================== */

const IntroController = (() => {
  const INTRO_DURATION = 5500; // ms — total intro sequence length
  const STORAGE_KEY = 'conDuongDienBien_introSeen';

  let overlay = null;
  let skipBtn = null;
  let timeoutId = null;

  function init() {
    overlay = document.getElementById('intro-overlay');
    skipBtn = document.getElementById('intro-skip-btn');

    if (!overlay) {
      console.warn('[Intro] No overlay element found. Skipping.');
      return;
    }

    // Check if intro was already seen
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      skipImmediate();
      console.log('[Intro] Auto-skipped (returning user).');
      return;
    }

    // Hide main content during intro
    document.querySelector('.app-header')?.classList.add('hidden-up');
    document.getElementById('map-container')?.style.setProperty('opacity', '0');

    // Bind skip button
    if (skipBtn) {
      skipBtn.addEventListener('click', skipIntro);
    }

    // Auto-advance after intro completes
    timeoutId = setTimeout(completeIntro, INTRO_DURATION);

    console.log('[Intro] Playing cinematic intro...');
  }

  function skipImmediate() {
    if (overlay) {
      overlay.style.display = 'none';
      overlay.remove();
    }
    // Ensure main content is visible
    document.querySelector('.app-header')?.classList.remove('hidden-up');
    const mc = document.getElementById('map-container');
    if (mc) mc.style.opacity = '';
  }

  function skipIntro() {
    if (timeoutId) clearTimeout(timeoutId);
    completeIntro();
  }

  function completeIntro() {
    // Mark as seen
    sessionStorage.setItem(STORAGE_KEY, 'true');

    // Fade out overlay
    if (overlay) {
      overlay.classList.add('hidden');
    }

    // Reveal main content with animation
    setTimeout(() => {
      document.querySelector('.app-header')?.classList.remove('hidden-up');
      const mc = document.getElementById('map-container');
      if (mc) {
        mc.style.opacity = '';
        mc.classList.add('enter');
        setTimeout(() => mc.classList.remove('enter'), 600);
      }
    }, 300);

    // Remove overlay from DOM after fade
    setTimeout(() => {
      if (overlay) overlay.remove();
    }, 1200);

    console.log('[Intro] Intro complete.');
  }

  return { init };
})();
