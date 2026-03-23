/* ===================================================
   Game Engine — State management & progression
   =================================================== */

const GameEngine = (() => {
  const STORAGE_KEY = 'con_duong_dien_bien_state';
  const TOTAL_GATES = 5;
  const TOTAL_CARDS = 6; // Gate 4 has 2 cards

  // Default initial state
  const DEFAULT_STATE = {
    currentGate: 1,
    gates: {
      1: { completed: false, cardCollected: false, badgeEarned: false },
      2: { completed: false, cardCollected: false, badgeEarned: false },
      3: { completed: false, cardCollected: false, badgeEarned: false },
      4: { completed: false, cardCollected: false, badgeEarned: false, card2Collected: false },
      5: { completed: false, cardCollected: false, badgeEarned: false }
    },
    totalBadges: 0,
    totalCards: 0,
    startedAt: null,
    completedAt: null
  };

  let state = null;

  // Initialize — load from localStorage or create fresh state
  function init() {
    state = loadState();
    if (!state.startedAt) {
      state.startedAt = new Date().toISOString();
      saveState();
    }
    updateUI();
    console.log('[GameEngine] Initialized. Current gate:', state.currentGate);
  }

  // Load state from localStorage
  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults in case schema changed
        return { ...DEFAULT_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('[GameEngine] Failed to load saved state:', e.message);
    }
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }

  // Save state to localStorage
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('[GameEngine] Failed to save state:', e.message);
    }
  }

  // Check if a gate is unlocked
  function isGateUnlocked(gateId) {
    if (gateId === 1) return true;
    // Gate N is unlocked if gate N-1 is completed
    return state.gates[gateId - 1]?.completed === true;
  }

  // Check if a gate is completed
  function isGateCompleted(gateId) {
    return state.gates[gateId]?.completed === true;
  }

  // Complete a gate — unlocks next, awards card + badge
  function completeGate(gateId) {
    if (!state.gates[gateId]) return;
    if (state.gates[gateId].completed) return; // Already completed

    state.gates[gateId].completed = true;
    state.gates[gateId].cardCollected = true;
    state.gates[gateId].badgeEarned = true;

    // Gate 4 has 2 cards
    if (gateId === 4) {
      state.gates[4].card2Collected = true;
    }

    // Recalculate totals
    state.totalBadges = Object.values(state.gates).filter(g => g.badgeEarned).length;
    state.totalCards = Object.values(state.gates).filter(g => g.cardCollected).length
      + (state.gates[4].card2Collected ? 1 : 0);

    // Update current gate to next uncompleted
    for (let i = 1; i <= TOTAL_GATES; i++) {
      if (!state.gates[i].completed) {
        state.currentGate = i;
        break;
      }
      if (i === TOTAL_GATES) {
        state.currentGate = TOTAL_GATES;
        state.completedAt = new Date().toISOString();
      }
    }

    saveState();
    updateUI();

    console.log(`[GameEngine] Gate ${gateId} completed. Cards: ${state.totalCards}/${TOTAL_CARDS}, Badges: ${state.totalBadges}/${TOTAL_GATES}`);

    // Dispatch custom event for other modules to react
    document.dispatchEvent(new CustomEvent('gateCompleted', { detail: { gateId } }));

    // Check if all gates are done
    if (isAllCompleted()) {
      document.dispatchEvent(new CustomEvent('allGatesCompleted'));
    }
  }

  // Get overall progress
  function getProgress() {
    const completedGates = Object.values(state.gates).filter(g => g.completed).length;
    return {
      completedGates,
      totalGates: TOTAL_GATES,
      totalCards: state.totalCards,
      maxCards: TOTAL_CARDS,
      totalBadges: state.totalBadges,
      maxBadges: TOTAL_GATES,
      percentage: Math.round((completedGates / TOTAL_GATES) * 100),
      isComplete: completedGates === TOTAL_GATES
    };
  }

  // Check if all gates completed
  function isAllCompleted() {
    return Object.values(state.gates).every(g => g.completed);
  }

  // Reset all progress
  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY);
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    state.startedAt = new Date().toISOString();
    saveState();
    updateUI();
    console.log('[GameEngine] Progress reset.');
    document.dispatchEvent(new CustomEvent('progressReset'));
  }

  // Update UI elements that reflect game state
  function updateUI() {
    // Progress bar
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) {
      const progress = getProgress();
      progressFill.style.width = progress.percentage + '%';
    }

    // Gallery count
    const galleryCount = document.getElementById('gallery-count');
    if (galleryCount) {
      galleryCount.textContent = `${state.totalCards}/${TOTAL_CARDS}`;
    }

    // Badges count
    const badgesCount = document.getElementById('badges-count');
    if (badgesCount) {
      badgesCount.textContent = `${state.totalBadges}/${TOTAL_GATES}`;
    }
  }

  // Get raw state (for gallery, map, etc.)
  function getState() {
    return { ...state };
  }

  return {
    init,
    isGateUnlocked,
    isGateCompleted,
    completeGate,
    getProgress,
    isAllCompleted,
    resetProgress,
    getState,
    loadState,
    TOTAL_GATES,
    TOTAL_CARDS
  };
})();
