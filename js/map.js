/* ===================================================
   Map View — Navigation and gate marker management
   =================================================== */

const MapView = (() => {

  function init() {
    updateMarkers();
    bindEvents();
    console.log('[MapView] Initialized.');
  }

  // Update all gate markers to reflect current game state
  function updateMarkers() {
    for (let i = 1; i <= GameEngine.TOTAL_GATES; i++) {
      const marker = document.getElementById(`gate-marker-${i}`);
      if (!marker) continue;

      const statusText = marker.querySelector('.gate-status-text');

      // Reset classes
      marker.classList.remove('locked', 'completed');

      if (GameEngine.isGateCompleted(i)) {
        marker.classList.add('completed');
        if (statusText) statusText.textContent = '✅ Hoàn thành';
      } else if (GameEngine.isGateUnlocked(i)) {
        // Active/unlocked
        if (statusText) statusText.textContent = '⭐ Đang mở';
      } else {
        marker.classList.add('locked');
        if (statusText) statusText.textContent = '🔒';
      }
    }
  }

  // Bind click events to gate markers
  function bindEvents() {
    for (let i = 1; i <= GameEngine.TOTAL_GATES; i++) {
      const marker = document.getElementById(`gate-marker-${i}`);
      if (!marker) continue;

      marker.addEventListener('click', () => {
        if (marker.classList.contains('locked')) {
          // Shake the locked marker
          marker.style.animation = 'shake 0.4s ease';
          setTimeout(() => marker.style.animation = '', 400);
          return;
        }
        openGate(i);
      });
    }

    // Listen for game state changes
    document.addEventListener('gateCompleted', () => updateMarkers());
    document.addEventListener('progressReset', () => updateMarkers());
  }

  // Open a gate view
  function openGate(gateId) {
    const mapContainer = document.getElementById('map-container');
    const gateView = document.getElementById('gate-view');

    if (!mapContainer || !gateView) return;

    mapContainer.style.display = 'none';
    gateView.style.display = 'block';

    // Delegate to GateRenderer
    if (typeof GateRenderer !== 'undefined') {
      GateRenderer.render(gateId);
    } else {
      // Fallback placeholder if renderer not loaded yet
      gateView.innerHTML = `
        <div class="gate-header">
          <button class="gate-back-btn" onclick="MapView.closeGate()">← Về bản đồ</button>
          <div class="gate-title-bar">
            <h2>${GATES_DATA[gateId].title}</h2>
            <span class="gate-subtitle">${GATES_DATA[gateId].subtitle}</span>
          </div>
          <div class="gate-progress-indicator">Cổng ${gateId}/5</div>
        </div>
        <div class="gate-section" style="text-align:center; padding-top: 100px;">
          <p style="color: var(--earth-medium);">Nội dung cổng đang được xây dựng...</p>
          <button class="btn-secondary" onclick="MapView.closeGate()" style="margin-top: 20px;">← Quay lại</button>
        </div>
      `;
    }

    // Scroll to top
    window.scrollTo(0, 0);
    console.log(`[MapView] Opened gate ${gateId}`);
  }

  // Close gate view, return to map
  function closeGate() {
    const mapContainer = document.getElementById('map-container');
    const gateView = document.getElementById('gate-view');

    if (mapContainer) mapContainer.style.display = '';
    if (gateView) {
      gateView.style.display = 'none';
      gateView.innerHTML = '';
    }

    updateMarkers();
    window.scrollTo(0, 0);
    console.log('[MapView] Returned to map.');
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
