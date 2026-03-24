/* ===================================================
   Audio Manager — Sound effects with mute toggle
   =================================================== */

const AudioManager = (() => {
  const STORAGE_KEY = 'conDuongDienBien_muted';
  let muted = true; // Default: muted (contest-safe)

  // Sound catalog — paths to audio files
  const sounds = {
    correct:  null,
    wrong:    null,
    flip:     null,
    badge:    null,
    unlock:   null,
    click:    null,
  };

  function init() {
    // Load mute preference
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      muted = stored === 'true';
    }

    // Bind mute toggle button
    const muteBtn = document.getElementById('mute-toggle');
    if (muteBtn) {
      updateMuteButton(muteBtn);
      muteBtn.addEventListener('click', () => {
        muted = !muted;
        localStorage.setItem(STORAGE_KEY, String(muted));
        updateMuteButton(muteBtn);
      });
    }

    console.log(`[Audio] Initialized. Muted: ${muted}`);
  }

  function updateMuteButton(btn) {
    btn.textContent = muted ? '🔇' : '🔊';
    btn.title = muted ? 'Bật âm thanh' : 'Tắt âm thanh';
  }

  function play(soundName) {
    if (muted) return;
    const src = sounds[soundName];
    if (!src) return;

    try {
      const audio = new Audio(src);
      audio.volume = 0.4;
      audio.play().catch(() => {}); // Silently fail if blocked
    } catch (e) {
      // Audio not supported
    }
  }

  function isMuted() { return muted; }

  return { init, play, isMuted };
})();
