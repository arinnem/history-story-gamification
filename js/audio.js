/* ===================================================
   Audio Manager — Sound effects with mute toggle
   =================================================== */

const AudioManager = (() => {
  const STORAGE_KEY = 'conDuongDienBien_muted';
  let muted = true; // Default: muted (contest-safe)

  // Sound catalog — paths to audio files (CC0 from Mixkit)
  const sounds = {
    correct:  'audio/correct.wav',
    wrong:    'audio/wrong.wav',
    flip:     'audio/flip.wav',
    badge:    'audio/badge.wav',
    unlock:   'audio/unlock.wav',
    click:    'audio/click.wav',
  };

  function init() {
    // Load mute preference
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      muted = stored === 'true';
    }

    // Bind mute toggle button
    const muteBtn = document.getElementById('mute-toggle');
    if (muteBtn) {
      updateMuteButton(muteBtn);
      muteBtn.addEventListener('click', () => {
        muted = !muted;
        sessionStorage.setItem(STORAGE_KEY, String(muted));
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
