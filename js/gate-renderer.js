/* ===================================================
   Gate Renderer — Builds the full gate experience
   Story → Puzzle → Reward
   =================================================== */

const GateRenderer = (() => {

  let currentGateId = null;
  let scrollObserver = null;
  let parallaxHandler = null;
  let progressHandler = null;

  function render(gateId) {
    currentGateId = gateId;
    const gate = GATES_DATA[gateId];
    const gateView = document.getElementById('gate-view');
    if (!gate || !gateView) return;

    // Cleanup previous observers
    cleanup();

    const isCompleted = GameEngine.isGateCompleted(gateId);

    gateView.innerHTML = `
      <div class="reading-progress" id="reading-progress"></div>
      <div class="gate-header">
        <button class="gate-back-btn" id="gate-back-btn">← Về bản đồ</button>
        <div class="gate-title-bar">
          <h2>Cổng ${gateId}: ${gate.title}</h2>
          <span class="gate-subtitle">${gate.subtitle}</span>
        </div>
        <div class="gate-progress-indicator">Cổng ${gateId}/${GameEngine.TOTAL_GATES}</div>
      </div>

      ${isCompleted ? renderCompletedState(gate) : renderFullGate(gate)}
    `;

    // Bind back button
    document.getElementById('gate-back-btn').addEventListener('click', () => {
      cleanup();
      MapView.closeGate();
    });

    // Activate scroll-based features and bind buttons after DOM render
    setTimeout(() => {
      initScrollReveal();
      initParallax();
      initReadingProgress();

      // Bind continue → puzzle button
      const btnContinue = document.getElementById('btn-continue-puzzle');
      if (btnContinue) {
        btnContinue.addEventListener('click', () => showPuzzle(gate));
      }
    }, 100);
  }

  function renderFullGate(gate) {
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];
    const numeral = romanNumerals[gate.id - 1] || gate.id;

    // Build story content with interleaved images and quotes
    let storyHtml = '';
    gate.narrative.paragraphs.forEach((p, i) => {
      storyHtml += `<p class="story-paragraph scroll-reveal">${p}</p>`;

      // Insert pull-quote if available
      if (gate.narrative.quotes && gate.narrative.quotes[i]) {
        const q = gate.narrative.quotes[i];
        storyHtml += `
          <div class="pull-quote scroll-reveal">
            <div class="pull-quote-text">${q.text}</div>
            ${q.attribution ? `<div class="pull-quote-attribution">${q.attribution}</div>` : ''}
          </div>
        `;
      }

      // Insert image if available
      if (gate.narrative.images && gate.narrative.images[i]) {
        storyHtml += `
          <div class="story-image-wrapper scroll-reveal parallax-image">
            <img class="story-image" src="${gate.narrative.images[i]}" alt="Minh h\u1ecda" loading="lazy">
          </div>
        `;
      }
    });

    return `
      <!-- CHAPTER HEADER -->
      <div class="chapter-header scroll-reveal">
        <div class="chapter-numeral">${numeral}</div>
        <div class="chapter-title">${gate.title}</div>
        <div class="chapter-subtitle">${gate.subtitle}</div>
        <hr class="chapter-border">
      </div>

      <!-- STORY SECTION -->
      <div class="gate-section story-section" id="story-section">
        ${storyHtml}

        <div class="section-divider divider-star scroll-reveal">
          <span class="divider-icon"></span>
        </div>

        <div class="story-continue scroll-reveal">
          <button class="btn-primary" id="btn-continue-puzzle">
            \ud83e\udde9 Ti\u1ebfp t\u1ee5c \u2014 Th\u1eed th\u00e1ch
          </button>
        </div>
      </div>

      <!-- PUZZLE SECTION (hidden until Continue clicked) -->
      <div class="gate-section puzzle-section" id="puzzle-section" style="display: none;">
        <div class="section-divider divider-floral"><span class="divider-icon"></span></div>
        <h3 class="puzzle-title">\ud83e\udde9 Th\u1eed Th\u00e1ch</h3>
        <p class="puzzle-instructions">${gate.puzzle.config.instruction}</p>
        <div class="puzzle-container" id="puzzle-container"></div>
        <div class="puzzle-actions" id="puzzle-actions"></div>
      </div>

      <!-- REWARD SECTION (hidden until puzzle solved) -->
      <div class="gate-section reward-section" id="reward-section" style="display: none;">
        <div class="section-divider divider-rule"><span class="divider-icon"></span></div>
        <h3 class="reward-title">\ud83c\udf89 Ch\u00fac m\u1eebng!</h3>
        <div class="reward-card-area" id="reward-card-area"></div>
        <div class="reward-badge-area" id="reward-badge-area"></div>
        <div class="reward-fact-area" id="reward-fact-area"></div>
        <div class="reward-return">
          <button class="btn-primary" id="btn-return-map">
            \ud83d\uddfa\ufe0f Quay v\u1ec1 b\u1ea3n \u0111\u1ed3
          </button>
        </div>
      </div>
    `;
  }


  function showPuzzle(gate) {
    const puzzleSection = document.getElementById('puzzle-section');
    if (puzzleSection) {
      puzzleSection.style.display = '';
      puzzleSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Render the specific puzzle type
    const container = document.getElementById('puzzle-container');
    const actions = document.getElementById('puzzle-actions');
    if (!container) return;

    switch (gate.puzzle.type) {
      case 'decode':
        renderDecodePuzzle(container, actions, gate);
        break;
      case 'matching':
        renderMatchingPuzzle(container, actions, gate);
        break;
      case 'chronological':
        renderChronologicalPuzzle(container, actions, gate);
        break;
      case 'jigsaw':
        renderJigsawPuzzle(container, actions, gate);
        break;
    }
  }

  // ========================
  //  DECODE PUZZLE
  // ========================
  function renderDecodePuzzle(container, actions, gate) {
    const config = gate.puzzle.config;
    const shuffled = [...config.words].sort(() => Math.random() - 0.5);
    let placed = [];

    container.innerHTML = `
      <div class="decode-puzzle">
        <div class="answer-slots" id="answer-slots">
          ${config.answer.map((_, i) => `<div class="answer-slot" data-index="${i}"></div>`).join('')}
        </div>
        <div class="word-bank" id="word-bank">
          ${shuffled.map((w, i) => `<div class="word-tile" data-word="${w}" data-idx="${i}">${w}</div>`).join('')}
        </div>
        <div class="puzzle-hint">
          <button class="hint-btn" id="hint-btn">💡 Gợi ý</button>
          <div class="hint-text" id="hint-text" style="display:none">${config.hint}</div>
        </div>
      </div>
    `;

    actions.innerHTML = `<button class="btn-primary" id="btn-check-puzzle">✅ Kiểm tra</button>`;

    // Word click to place
    container.querySelectorAll('.word-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        if (tile.classList.contains('placed')) return;
        const nextSlot = container.querySelector('.answer-slot:empty');
        if (!nextSlot) return;

        nextSlot.textContent = tile.dataset.word;
        nextSlot.dataset.word = tile.dataset.word;
        tile.classList.add('placed');
        placed.push({ tile, slot: nextSlot });
      });
    });

    // Slot click to remove
    container.querySelectorAll('.answer-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        if (!slot.textContent) return;
        const entry = placed.find(p => p.slot === slot);
        if (entry) {
          entry.tile.classList.remove('placed');
          placed = placed.filter(p => p !== entry);
        }
        slot.textContent = '';
        delete slot.dataset.word;
      });
    });

    // Hint button
    document.getElementById('hint-btn')?.addEventListener('click', () => {
      const hintText = document.getElementById('hint-text');
      if (hintText) hintText.style.display = '';
    });

    // Check answer
    document.getElementById('btn-check-puzzle')?.addEventListener('click', () => {
      const slots = container.querySelectorAll('.answer-slot');
      const userAnswer = Array.from(slots).map(s => s.dataset.word || '');
      const correct = userAnswer.every((w, i) => w === config.answer[i]);

      if (correct) {
        showFeedback(container, true, 'Chính xác! 🎉');
        setTimeout(() => showReward(gate), 1500);
      } else {
        showFeedback(container, false, 'Chưa đúng, thử lại nhé! 💪');
      }
    });
  }

  // ========================
  //  MATCHING PUZZLE
  // ========================
  function renderMatchingPuzzle(container, actions, gate) {
    const config = gate.puzzle.config;
    let selectedLeft = null;
    let matchedCount = 0;

    // Shuffle both columns independently
    const leftItems = config.pairs.map((p, i) => ({ text: p.left, index: i })).sort(() => Math.random() - 0.5);
    const rightItems = config.pairs.map((p, i) => ({ text: p.right, index: i })).sort(() => Math.random() - 0.5);

    container.innerHTML = `
      <div class="matching-puzzle">
        <div class="match-columns">
          <div class="match-column" id="match-left">
            ${leftItems.map(item => `
              <div class="match-item" data-side="left" data-index="${item.index}">${item.text}</div>
            `).join('')}
          </div>
          <div class="match-column" id="match-right">
            ${rightItems.map(item => `
              <div class="match-item" data-side="right" data-index="${item.index}">${item.text}</div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    actions.innerHTML = '';

    container.querySelectorAll('.match-item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('matched')) return;

        if (item.dataset.side === 'left') {
          // Select left item
          container.querySelectorAll('.match-item[data-side="left"]').forEach(i => i.classList.remove('selected'));
          item.classList.add('selected');
          selectedLeft = item;
        } else if (selectedLeft) {
          // Try to match with selected left
          if (selectedLeft.dataset.index === item.dataset.index) {
            // Correct match
            selectedLeft.classList.remove('selected');
            selectedLeft.classList.add('matched');
            item.classList.add('matched');
            matchedCount++;

            if (matchedCount === config.pairs.length) {
              showFeedback(container, true, 'Hoàn hảo! Nối đúng tất cả! 🎉');
              setTimeout(() => showReward(gate), 1500);
            }
          } else {
            // Wrong match
            item.classList.add('wrong');
            selectedLeft.classList.add('wrong');
            setTimeout(() => {
              item.classList.remove('wrong');
              selectedLeft.classList.remove('wrong', 'selected');
              selectedLeft = null;
            }, 600);
          }
          selectedLeft = null;
        }
      });
    });
  }

  // ========================
  //  CHRONOLOGICAL PUZZLE
  // ========================
  function renderChronologicalPuzzle(container, actions, gate) {
    const config = gate.puzzle.config;
    const shuffled = [...config.events].sort(() => Math.random() - 0.5);
    let currentOrder = [...shuffled];

    function renderList() {
      const listEl = container.querySelector('.event-list') || container;
      const html = `
        <div class="chronological-puzzle">
          <div class="event-list">
            ${currentOrder.map((event, i) => `
              <div class="event-card" data-order="${event.order}" data-pos="${i}">
                <div class="event-number">${i + 1}</div>
                <div class="event-text">${event.text}</div>
                <div class="event-year">${event.year}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      container.innerHTML = html;

      // Bind swap on click — click two cards to swap
      let firstCard = null;
      container.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
          if (!firstCard) {
            firstCard = card;
            card.classList.add('dragging');
          } else {
            // Swap
            const pos1 = parseInt(firstCard.dataset.pos);
            const pos2 = parseInt(card.dataset.pos);
            [currentOrder[pos1], currentOrder[pos2]] = [currentOrder[pos2], currentOrder[pos1]];
            firstCard.classList.remove('dragging');
            firstCard = null;
            renderList();
          }
        });
      });
    }

    renderList();

    actions.innerHTML = `<button class="btn-primary" id="btn-check-puzzle">✅ Kiểm tra thứ tự</button>`;

    document.getElementById('btn-check-puzzle')?.addEventListener('click', () => {
      const isCorrect = currentOrder.every((event, i) => event.order === i + 1);

      if (isCorrect) {
        // Show years and mark correct
        container.querySelectorAll('.event-card').forEach(card => {
          card.classList.add('correct');
        });
        showFeedback(container, true, 'Đúng thứ tự! Tuyệt vời! 🎉');
        setTimeout(() => showReward(gate), 1500);
      } else {
        // Highlight incorrect positions
        container.querySelectorAll('.event-card').forEach((card, i) => {
          if (currentOrder[i].order !== i + 1) {
            card.classList.add('incorrect');
            setTimeout(() => card.classList.remove('incorrect'), 1000);
          }
        });
        showFeedback(container, false, 'Chưa đúng thứ tự, thử lại! 💪');
      }
    });
  }

  // ========================
  //  JIGSAW PUZZLE
  // ========================
  function renderJigsawPuzzle(container, actions, gate) {
    const config = gate.puzzle.config;
    const gridSize = config.gridSize || 3;
    const totalTiles = gridSize * gridSize;

    // Create shuffled tile positions
    let tiles = Array.from({ length: totalTiles }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    // Use colored tiles as placeholder if no image
    const colors = ['#c62828', '#2e7d32', '#1565c0', '#f9a825', '#4a5d23', '#5c3d2e', '#9c27b0', '#00838f', '#ff8f00'];

    let selectedTile = null;

    function renderGrid() {
      container.innerHTML = `
        <div class="jigsaw-puzzle">
          <div class="jigsaw-grid" style="grid-template-columns: repeat(${gridSize}, 1fr);">
            ${tiles.map((originalPos, currentPos) => `
              <div class="jigsaw-tile ${originalPos === currentPos ? 'correct' : ''}"
                   data-original="${originalPos}" data-current="${currentPos}"
                   style="background-color: ${colors[originalPos]}; opacity: ${originalPos === currentPos ? 1 : 0.7};">
                <span style="color:white; font-weight:bold; font-size:1.2rem; display:flex; align-items:center; justify-content:center; height:100%;">
                  ${originalPos + 1}
                </span>
              </div>
            `).join('')}
          </div>
          <p style="text-align:center; font-size:0.8rem; color:var(--earth-medium); margin-top:var(--space-sm);">
            Nhấp hai ô để hoán đổi vị trí. Sắp xếp từ 1→${totalTiles}.
          </p>
        </div>
      `;

      container.querySelectorAll('.jigsaw-tile').forEach(tile => {
        tile.addEventListener('click', () => {
          if (!selectedTile) {
            selectedTile = tile;
            tile.classList.add('selected');
          } else {
            const pos1 = parseInt(selectedTile.dataset.current);
            const pos2 = parseInt(tile.dataset.current);
            [tiles[pos1], tiles[pos2]] = [tiles[pos2], tiles[pos1]];
            selectedTile.classList.remove('selected');
            selectedTile = null;
            renderGrid();

            // Check if solved
            if (tiles.every((t, i) => t === i)) {
              showFeedback(container, true, 'Hoàn thành bức tranh! 🎉');
              setTimeout(() => showReward(gate), 1500);
            }
          }
        });
      });
    }

    renderGrid();
    actions.innerHTML = '';
  }

  // ========================
  //  SHARED: Feedback & Reward
  // ========================
  function showFeedback(container, success, message) {
    // Remove existing feedback
    const existing = container.querySelector('.puzzle-feedback');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = `puzzle-feedback ${success ? 'success' : 'error'}`;
    div.textContent = message;
    container.appendChild(div);

    if (!success) {
      setTimeout(() => div.remove(), 3000);
    }
  }

  function showReward(gate) {
    const rewardSection = document.getElementById('reward-section');
    if (!rewardSection) return;

    rewardSection.style.display = '';
    rewardSection.scrollIntoView({ behavior: 'smooth' });

    // Render card reveal
    const cardArea = document.getElementById('reward-card-area');
    if (cardArea && typeof CardReveal !== 'undefined') {
      CardReveal.render(cardArea, gate.character);

      // Gate 4 has a second card
      if (gate.id === 4 && gate.character2) {
        setTimeout(() => {
          CardReveal.render(cardArea, gate.character2, true);
        }, 2000);
      }
    }

    // Render badge reveal (after card animation)
    const badgeArea = document.getElementById('reward-badge-area');
    const delay = gate.id === 4 ? 4000 : 2000;
    setTimeout(() => {
      if (badgeArea && typeof BadgeReveal !== 'undefined') {
        BadgeReveal.render(badgeArea, gate.badge);
      }
    }, delay);

    // Show hidden fact (after badge)
    const factArea = document.getElementById('reward-fact-area');
    setTimeout(() => {
      if (factArea) {
        factArea.innerHTML = `
          <div class="hidden-fact">
            <div class="fact-label">💡 ${gate.hiddenFact.title}</div>
            <div class="fact-content">${gate.hiddenFact.content}</div>
          </div>
        `;
      }
    }, delay + 1500);

    // Complete the gate
    GameEngine.completeGate(gate.id);

    // Bind return button
    setTimeout(() => {
      document.getElementById('btn-return-map')?.addEventListener('click', () => MapView.closeGate());
    }, 100);
  }

  function renderCompletedState(gate) {
    return `
      <div class="gate-section gate-completed-overlay">
        <div class="completed-checkmark">✅</div>
        <h3 class="completed-message">Bạn đã hoàn thành cổng này!</h3>
        <p style="color: var(--earth-medium); margin-bottom: var(--space-xl);">
          Bạn đã thu thập thẻ <strong>${gate.character.name}</strong> và huy hiệu <strong>${gate.badge.name}</strong>.
        </p>

        <!-- Show the story again for re-reading -->
        <details style="text-align:left; max-width:700px; margin:0 auto;">
          <summary style="cursor:pointer; font-weight:700; color:var(--accent-red); margin-bottom:var(--space-md);">
            📖 Đọc lại câu chuyện
          </summary>
          ${gate.narrative.paragraphs.map(p => `<p class="story-paragraph">${p}</p>`).join('')}
        </details>

        <div style="margin-top: var(--space-2xl);">
          <button class="btn-primary" onclick="MapView.closeGate()">🗺️ Quay về bản đồ</button>
        </div>
      </div>
    `;
  }

  return {
    render
  };

  // ========================
  //  Scroll Reveal Observer
  // ========================
  function initScrollReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('revealed'));
      return;
    }

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => scrollObserver.observe(el));
  }

  // ========================
  //  Parallax Images
  // ========================
  function initParallax() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    parallaxHandler = () => {
      document.querySelectorAll('.parallax-image .story-image').forEach(img => {
        const rect = img.getBoundingClientRect();
        const windowH = window.innerHeight;
        if (rect.top < windowH && rect.bottom > 0) {
          const progress = (rect.top + rect.height / 2) / windowH;
          const offset = (progress - 0.5) * 30; // max ±15px
          img.style.transform = `translateY(${offset}px)`;
        }
      });
    };
    window.addEventListener('scroll', parallaxHandler, { passive: true });
  }

  // ========================
  //  Reading Progress Bar
  // ========================
  function initReadingProgress() {
    const bar = document.getElementById('reading-progress');
    const storySection = document.getElementById('story-section');
    if (!bar || !storySection) return;

    progressHandler = () => {
      const rect = storySection.getBoundingClientRect();
      const total = storySection.scrollHeight;
      const scrolled = Math.max(0, -rect.top);
      const pct = Math.min(100, (scrolled / total) * 100);
      bar.style.width = pct + '%';

      // Hide when past story section
      if (rect.bottom < 0) {
        bar.classList.add('hidden');
      } else {
        bar.classList.remove('hidden');
      }
    };
    window.addEventListener('scroll', progressHandler, { passive: true });
  }

  // ========================
  //  Cleanup
  // ========================
  function cleanup() {
    if (scrollObserver) { scrollObserver.disconnect(); scrollObserver = null; }
    if (parallaxHandler) { window.removeEventListener('scroll', parallaxHandler); parallaxHandler = null; }
    if (progressHandler) { window.removeEventListener('scroll', progressHandler); progressHandler = null; }
    const bar = document.getElementById('reading-progress');
    if (bar) bar.style.width = '0%';
  }
})();
