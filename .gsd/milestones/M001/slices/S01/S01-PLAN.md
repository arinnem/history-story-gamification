# S01: Foundation + Visual Proof

**Goal:** Establish the visual foundation, map-based navigation, CSS design system, and game engine so that all subsequent slices can render gates without rethinking architecture.
**Demo:** Opening `index.html` in a browser shows the Điện Biên Phủ map with 5 gate markers positioned at historical locations. Gate 1 is highlighted as active, gates 2–5 show as locked. A card gallery button exists (empty). The blended vintage-map/modern-editorial visual style is established.

## Must-Haves

- Map-based main navigation with 5 gate markers at real Điện Biên Phủ locations
- CSS design system: color palette (olive/khaki/red/gold + earth tones), typography (Google Fonts), card/badge component styles, animations (flip, reveal, unlock)
- Game engine in JS: gate state management, localStorage read/write, unlock logic (gate N+1 unlocks when gate N completed)
- Responsive layout foundation (works on both desktop and mobile viewports)
- Data schema defined in `data.js` (empty content, but full structure for all 5 gates)

## Proof Level

- This slice proves: contract (visual and structural foundation established)
- Real runtime required: yes (browser)
- Human/UAT required: yes (visual style approval)

## Verification

- Open `index.html` in browser — map renders with 5 gate markers visible
- Gate 1 marker is visually active/highlighted, gates 2–5 show locked state
- Click Gate 1 — gate view opens (empty content placeholder is fine)
- Resize browser to mobile width — layout adjusts responsively
- Open DevTools Console — `localStorage` contains game state after interaction
- Card gallery button exists and opens an empty gallery modal/panel

## Tasks

- [ ] **T01: Create HTML structure and CSS design system** `est:1h`
  - Why: Every subsequent task depends on the visual foundation — colors, typography, layout grid, component styles
  - Files: `index.html`, `styles/main.css`
  - Do:
    1. Create `index.html` with semantic structure: header (title "Con Đường Điện Biên"), main (map container), nav (card gallery button, badge collection), footer (contest attribution)
    2. Create `styles/main.css` with:
       - CSS custom properties for the full color palette: `--parchment` (warm beige bg), `--earth-dark` (dark olive text), `--accent-red` (Vietnamese flag red), `--gold` (badge/card highlight), `--ink-brown` (body text), `--locked-gray`
       - Google Fonts import: Playfair Display (headings) + Inter (body) — both support Vietnamese
       - Base typography scale, body defaults, heading styles
       - Card component styles (front/back faces, flip animation via CSS transform)
       - Badge component styles (circular, glow animation on earn)
       - Gate marker styles (active/locked/completed states)
       - Modal/overlay styles (for gate view, card gallery)
       - Responsive breakpoints (mobile < 768px)
       - Parchment background texture (CSS gradient or subtle pattern)
       - Glassmorphism overlay for modals (frosted glass effect)
    3. Add meta viewport tag, favicon placeholder, SEO meta tags
  - Verify: Open `index.html` — styled page renders with correct fonts, colors, and layout structure
  - Done when: Page displays with the blended vintage/modern visual style, all CSS custom properties defined, responsive at mobile width

- [ ] **T02: Build map navigation with gate markers** `est:1h`
  - Why: The map is the primary navigation — users see the Điện Biên Phủ terrain and click gates to enter them
  - Files: `index.html`, `styles/main.css`, `js/map.js`
  - Do:
    1. Create a stylized map container in `index.html` — use CSS to create a topographic map aesthetic (contour lines, terrain colors, mountain indicators)
    2. Position 5 gate markers at approximate historical locations on the map:
       - Gate 1 (Lời Kêu Gọi): top-left area (representing Việt Bắc/northern resistance)
       - Gate 2 (Cuộc Hành Quân): center-left (the march through mountains)
       - Gate 3 (Đào Chiến Hào): center (the trenches surrounding the valley)
       - Gate 4 (56 Ngày Đêm): center-right (the battle positions)
       - Gate 5 (Chiến Thắng): bottom-right (the command bunker / victory point)
    3. Connect gates with a dotted trail path (CSS/SVG) showing the journey direction
    4. Style gate markers with 3 states: locked (gray, padlock icon), active (glowing, pulsing), completed (gold checkmark)
    5. Add gate labels with Vietnamese names
    6. Implement click handlers that will later open gate views
  - Verify: Map renders with 5 distinctly positioned and labeled gate markers connected by a trail path. Gate 1 pulses as active, others show as locked.
  - Done when: All 5 gates visible on map with correct visual states, trail path connects them, clicking a gate fires an event (console.log is sufficient)

- [ ] **T03: Build game engine with state management** `est:45m`
  - Why: The game engine tracks which gates are completed, what cards/badges are collected, and persists everything to localStorage
  - Files: `js/game-engine.js`
  - Do:
    1. Create game state object: `{ currentGate: 1, gates: { 1: { completed: false, cardCollected: false, badgeEarned: false }, ... }, totalBadges: 0, totalCards: 0 }`
    2. Implement `saveState()` — serialize to localStorage
    3. Implement `loadState()` — deserialize from localStorage, with fallback to initial state
    4. Implement `completeGate(gateId)` — marks gate complete, unlocks next gate, increments counters, saves state
    5. Implement `isGateUnlocked(gateId)` — returns true if previous gate is completed (gate 1 always unlocked)
    6. Implement `getProgress()` — returns completion percentage and collected items summary
    7. Implement `resetProgress()` — clears localStorage and resets to initial state (dev/testing use)
    8. Auto-load state on page load, update map markers accordingly
  - Verify: Open browser console → `GameEngine.completeGate(1)` → refresh page → `GameEngine.loadState()` shows gate 1 completed and gate 2 unlocked. `GameEngine.resetProgress()` clears everything.
  - Done when: Gate state persists across page refreshes, unlock logic works correctly, map markers update based on state

- [ ] **T04: Define data schema and create gate content structure** `est:30m`
  - Why: All gate content (stories, puzzles, cards, badges, facts) must follow a consistent schema so the renderer (S02) can consume it uniformly
  - Files: `js/data.js`
  - Do:
    1. Define the full data schema with TypeScript-style comments for clarity:
       ```js
       const GATES_DATA = {
         1: {
           id: 1,
           title: "Lời Kêu Gọi",
           subtitle: "The Call",
           narrative: { paragraphs: [], images: [] },
           puzzle: { type: "decode", config: {} },
           character: { name: "", title: "", achievement: "", quote: "", image: "" },
           badge: { name: "", icon: "", description: "" },
           hiddenFact: { title: "", content: "" }
         }
       }
       ```
    2. Fill in metadata for all 5 gates (titles, subtitles, badge/card names) but leave narrative content and puzzle configs empty — those come in S02/S03
    3. Define puzzle type enum: `decode`, `matching`, `chronological`, `hero-matching`, `jigsaw`
    4. Define character card data structure with fields for the flip animation (front image, back stats)
  - Verify: `console.log(GATES_DATA[1].title)` returns "Lời Kêu Gọi". All 5 gates have complete metadata. Schema comments are clear.
  - Done when: Data schema is defined, all 5 gates have metadata filled, puzzle types enumerated, character card structure documented

- [ ] **T05: Build card gallery panel and badge collection display** `est:30m`
  - Why: The gallery provides the collection feedback loop — users see what they've earned and what's still locked
  - Files: `index.html`, `styles/main.css`, `js/gallery.js`
  - Do:
    1. Add a gallery button in the header/nav area with a card-stack icon
    2. Create a modal/slide-out panel for the card gallery showing 6 card slots (gate 4 has 2 cards)
    3. Locked cards show as silhouette/mystery cards with "?" icon
    4. Collected cards show the character name and a mini version of the card
    5. Add a badge row at the top or bottom of the gallery showing 5 badge slots
    6. Read from GameEngine state to determine which cards/badges to show
    7. Add open/close animations (slide-in from right or modal fade)
  - Verify: Click gallery button → panel opens showing 6 locked card slots and 5 locked badge slots. Close button works. Animation is smooth.
  - Done when: Gallery panel opens/closes, shows correct locked/unlocked state based on GameEngine, responsive on mobile

## Files Likely Touched

- `index.html`
- `styles/main.css`
- `js/game-engine.js`
- `js/data.js`
- `js/map.js`
- `js/gallery.js`
