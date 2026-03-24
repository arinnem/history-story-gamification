/* ===================================================
   Map View — SVG-based navigation and gate marker management
   =================================================== */

const MapView = (() => {

  function init() {
    updateMarkers();
    bindEvents();
    console.log('[MapView] Initialized with SVG map overlay.');
  }

  // Update all SVG gate markers to reflect current game state
  function updateMarkers() {
    for (let i = 1; i <= GameEngine.TOTAL_GATES; i++) {
      const marker = document.getElementById(`gate-svg-${i}`);
      if (!marker) continue;

      // Reset classes
      marker.classList.remove('locked', 'completed');

      if (GameEngine.isGateCompleted(i)) {
        marker.classList.add('completed');
      } else if (GameEngine.isGateUnlocked(i)) {
        // Active/unlocked — default styling, no extra class needed
      } else {
        marker.classList.add('locked');
      }
    }
  }

  // Bind click and keyboard events to SVG gate markers
  function bindEvents() {
    for (let i = 1; i <= GameEngine.TOTAL_GATES; i++) {
      const marker = document.getElementById(`gate-svg-${i}`);
      if (!marker) continue;

      // Click handler
      marker.addEventListener('click', () => handleMarkerActivation(marker, i));

      // Keyboard handler (Enter/Space)
      marker.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleMarkerActivation(marker, i);
        }
      });
    }

    // Listen for game state changes
    document.addEventListener('gateCompleted', () => updateMarkers());
    document.addEventListener('progressReset', () => updateMarkers());
  }

  function handleMarkerActivation(marker, gateId) {
    if (marker.classList.contains('locked')) {
      // Shake animation on locked marker
      marker.style.animation = 'shake 0.4s ease';
      setTimeout(() => marker.style.animation = '', 400);
      return;
    }
    openGate(gateId);
  }

  // Open a gate view
  function openGate(gateId) {
    const mapContainer = document.getElementById('map-container');
    const gateView = document.getElementById('gate-view');
    const header = document.querySelector('.app-header');

    if (!mapContainer || !gateView) return;

    // Animated transition: map exits left, gate enters right
    mapContainer.classList.add('exit-left');

    setTimeout(() => {
      mapContainer.style.display = 'none';
      mapContainer.classList.remove('exit-left');

      gateView.style.display = 'block';
      gateView.classList.add('enter-right');
      setTimeout(() => gateView.classList.remove('enter-right'), 700);

      // Delegate to GateRenderer
      if (typeof GateRenderer !== 'undefined') {
        GateRenderer.render(gateId);
      } else {
        gateView.innerHTML = `
          <div class="gate-header">
            <button class="gate-back-btn" onclick="MapView.closeGate()">\u2190 V\u1ec1 b\u1ea3n \u0111\u1ed3</button>
            <div class="gate-title-bar">
              <h2>${GATES_DATA[gateId].title}</h2>
              <span class="gate-subtitle">${GATES_DATA[gateId].subtitle}</span>
            </div>
            <div class="gate-progress-indicator">C\u1ed5ng ${gateId}/5</div>
          </div>
          <div class="gate-section" style="text-align:center; padding-top: 100px;">
            <p style="color: var(--earth-medium);">N\u1ed9i dung c\u1ed5ng \u0111ang \u0111\u01b0\u1ee3c x\u00e2y d\u1ef1ng...</p>
            <button class="btn-secondary" onclick="MapView.closeGate()" style="margin-top: 20px;">\u2190 Quay l\u1ea1i</button>
          </div>
        `;
      }

      window.scrollTo(0, 0);
    }, 500);

    console.log(`[MapView] Opened gate ${gateId}`);
  }

  // Close gate view, return to map
  function closeGate() {
    const mapContainer = document.getElementById('map-container');
    const gateView = document.getElementById('gate-view');

    if (!gateView) return;

    // Animated transition: gate fades out, map enters
    gateView.classList.add('exit-fade');

    setTimeout(() => {
      gateView.style.display = 'none';
      gateView.classList.remove('exit-fade');
      gateView.innerHTML = '';

      if (mapContainer) {
        mapContainer.style.display = '';
        mapContainer.classList.add('enter');
        setTimeout(() => mapContainer.classList.remove('enter'), 600);
      }

      updateMarkers();
      window.scrollTo(0, 0);
    }, 400);

    console.log('[MapView] Returning to map...');
  }

  // Show the map (used when returning from other views)
  function show() {
    const mapContainer = document.getElementById('map-container');
    const gateView = document.getElementById('gate-view');
    if (mapContainer) mapContainer.style.display = '';
    if (gateView) gateView.style.display = 'none';
    updateMarkers();
  }

  return {
    init,
    updateMarkers,
    openGate,
    closeGate,
    show
  };
})();
