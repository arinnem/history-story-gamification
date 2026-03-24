# S02: Gate 1 Complete

**Goal:** Build the complete gate experience for Gate 1 ("Lời Kêu Gọi") — proving the full story→puzzle→card→badge flow works end-to-end. This is the template all other gates will follow.
**Demo:** Click Gate 1 on the map → read the illustrated narrative about French colonization and the call to resistance → solve the decode-the-quote puzzle → earn the Hồ Chí Minh character card (flip animation) → earn the "Ngọn Lửa Cách Mạng" badge with hidden fact → Gate 2 unlocks on the map.

## Must-Haves

- Gate renderer that builds the full gate view from `data.js`
- Story section with narrative text and AI-generated illustrations
- Working decode-the-quote puzzle (interactive, solvable)
- Character card reveal with flip animation
- Badge earned celebration with hidden fact display
- Gate completion triggers next gate unlock on the map
- Smooth transitions between story → puzzle → reward sections

## Proof Level

- This slice proves: integration (full gate loop working end-to-end with real content)
- Real runtime required: yes (browser)
- Human/UAT required: yes (historical accuracy, visual quality, puzzle difficulty)

## Verification

- Click Gate 1 on the map → gate view opens with narrative content
- Scroll through story section — text and at least 2 illustrations render correctly
- Reach puzzle section — decode-the-quote puzzle loads with interactive letter/word elements
- Solve the puzzle correctly → success feedback displayed
- Character card appears with flip animation (back → front reveal)
- Badge earned animation plays, hidden fact card appears
- Return to map → Gate 1 shows completed, Gate 2 shows active/unlocked
- Refresh page → Gate 1 still shows completed (persistence check)
- Card gallery now shows Hồ Chí Minh card as collected, badge row shows 1/5

## Tasks

- [ ] **T01: Write Gate 1 narrative content and generate AI illustrations** `est:1h`
  - Why: Real content is needed to test the renderer — placeholder text won't validate the experience
  - Files: `js/data.js`, `images/gate1/`
  - Do:
    1. Write 4–5 paragraphs of narrative for Gate 1 covering:
       - French colonization context (late 1800s–1940s)
       - Japanese occupation during WWII
       - Hồ Chí Minh's independence declaration (Sept 2, 1945)
       - The return of the French and the beginning of resistance
       - The determination that led to Điện Biên Phủ
    2. Source from "Kể chuyện Điện Biên Phủ" — adapt into age-appropriate, engaging prose in Vietnamese
    3. Generate 2–3 AI illustrations:
       - Scene of Vietnamese people under colonial rule
       - Hồ Chí Minh reading the independence declaration at Ba Đình Square
       - Resistance fighters gathering in the mountains
    4. Create the Hồ Chí Minh character card data:
       - Name: Hồ Chí Minh
       - Title: Người Cha Già Của Dân Tộc
       - Achievement: Đọc Tuyên Ngôn Độc Lập, khai sinh nước Việt Nam Dân Chủ Cộng Hòa
       - Quote: "Không có gì quý hơn Độc lập, Tự do"
    5. Write the hidden fact for Gate 1's badge
    6. Define the decode puzzle config: scrambled or coded version of Hồ Chí Minh's famous quote
  - Verify: `GATES_DATA[1].narrative.paragraphs.length >= 4`, `GATES_DATA[1].character.name === "Hồ Chí Minh"`, image files exist in `images/gate1/`
  - Done when: Gate 1 data fully populated with narrative, images, card data, badge data, hidden fact, and puzzle config

- [ ] **T02: Build the gate renderer (story → puzzle → reward flow)** `est:1.5h`
  - Why: This is the core UI component — it reads gate data and renders the 3-section experience. All 5 gates will share this renderer.
  - Files: `js/gate-renderer.js`, `styles/gate.css`
  - Do:
    1. Create `renderGate(gateId)` function that:
       - Reads gate data from `GATES_DATA`
       - Creates a full-screen overlay/view replacing the map
       - Renders 3 sequential sections: Story, Puzzle, Reward
    2. **Story section**: 
       - Gate title with decorative border
       - Narrative paragraphs with subtle fade-in on scroll
       - AI illustrations positioned between paragraphs (alternating left/right float or full-width)
       - "Continue to Challenge" button at bottom
    3. **Puzzle section**:
       - Puzzle title and instructions
       - Puzzle container (delegates to puzzle-specific renderer in T03)
       - "Check Answer" button
       - Feedback display (correct/incorrect)
    4. **Reward section** (hidden until puzzle solved):
       - Character card with flip animation
       - Badge reveal with celebration effect
       - Hidden fact card slide-in
       - "Return to Map" button
    5. Add a "Back to Map" button in header for early exit
    6. Style with `gate.css`: vintage page feel with modern typography, smooth section transitions
  - Verify: Call `renderGate(1)` → full gate view renders with story content, puzzle placeholder, and reward section hidden. "Continue to Challenge" button scrolls to puzzle section.
  - Done when: Gate renderer displays all 3 sections correctly, transitions between sections work, reward section appears only after puzzle completion

- [ ] **T03: Build the decode-the-quote puzzle** `est:1h`
  - Why: Gate 1's puzzle type is "decode" — users must decode a scrambled/coded famous quote. This proves the puzzle interaction model works.
  - Files: `js/puzzles/decode-puzzle.js`, `styles/puzzle.css`
  - Do:
    1. Create the decode puzzle renderer that takes a config `{ encodedText, answer, hints }` from data.js
    2. **Puzzle mechanic**: The quote is encoded using a simple Caesar cipher or letter substitution. Users click letter tiles to cycle through possible letters, or drag-and-drop letter tiles into correct positions
    3. Simpler alternative: The quote is split into shuffled word blocks that users must arrange in correct order (drag to reorder, or click to select and place)
    4. Show a hint button that reveals 1-2 words when stuck
    5. Implement answer checking: compare user's arrangement to the correct quote
    6. On correct answer: flash green, play a subtle success sound effect (optional), emit "puzzle-solved" event
    7. On incorrect: shake animation, show "Thử lại nhé!" (Try again!) message
    8. Style with `puzzle.css`: interactive tiles with hover effects, drag feedback, vintage-colored tiles
  - Verify: Puzzle renders with scrambled quote. Arrange words correctly → success feedback shows. Arrange incorrectly → error feedback shows. Hint button reveals a word.
  - Done when: Puzzle is solvable, has clear success/failure feedback, and emits completion event that the gate renderer can listen to

- [ ] **T04: Build character card flip animation and badge reveal** `est:45m`
  - Why: The reward moment is what makes gamification feel satisfying — the card flip and badge celebration are the emotional payoff
  - Files: `js/card-reveal.js`, `js/badge-reveal.js`, `styles/main.css`
  - Do:
    1. **Card flip**: Create a 3D CSS flip animation (perspective + rotateY):
       - Card back: mystery silhouette with "?" and a decorative pattern
       - Card front: character portrait (AI image), name, title, achievement, quote
       - Auto-flip after 1s delay when reward section appears, or flip on click
       - Add a subtle sparkle/glow effect during the flip
    2. **Badge reveal**: Create a badge earned animation:
       - Badge icon scales up from 0 with a bounce effect
       - Golden glow radiates outward
       - Badge name and description fade in below
       - Simple confetti burst (CSS-only with multiple colored squares animating)
    3. **Hidden fact**: After badge, slide in a "Bạn có biết?" (Did you know?) card:
       - Styled like a historical document snippet
       - Contains the bonus historical fact not in the main narrative
    4. Wire into gate renderer: after puzzle solved → show card → show badge → show fact → show "Return to Map"
    5. Wire into GameEngine: `completeGate(1)` called when reward sequence finishes
  - Verify: After puzzle solved → card flip animation plays smoothly → badge reveal animation plays → hidden fact appears → return to map button visible. GameEngine state shows gate 1 completed.
  - Done when: Full reward sequence plays with all animations, GameEngine updated, card/badge visible in gallery

- [ ] **T05: Wire Gate 1 end-to-end and verify full flow** `est:30m`
  - Why: Integration test — all pieces (map click → gate render → story → puzzle → card → badge → map update) must work together seamlessly
  - Files: `js/map.js`, `js/gate-renderer.js`, `js/game-engine.js`, `js/gallery.js`
  - Do:
    1. Wire map gate click → `renderGate(1)` call
    2. Wire puzzle completion → reward section display → card/badge animations
    3. Wire "Return to Map" → close gate view, update map markers
    4. Wire gate completion → update card gallery to show Hồ Chí Minh card
    5. Wire gate completion → update badge collection
    6. Test: Reset progress → play through Gate 1 fully → verify Gate 2 unlocks → refresh → state persists
    7. Fix any timing issues in animation sequences
    8. Ensure Gate 1 can be re-opened after completion (shows completed state, no re-puzzle)
  - Verify: Full flow works: map → click Gate 1 → read story → solve puzzle → see card flip → earn badge → see hidden fact → return to map → Gate 2 unlocked → gallery shows 1 card + 1 badge → refresh → state persists
  - Done when: Complete end-to-end flow for Gate 1 with no broken transitions, persistence working, gallery updated

## Integration Closure

- Upstream surfaces consumed: `index.html` structure, `styles/main.css` design system, `js/game-engine.js` state management, `js/data.js` schema — all from S01
- New wiring introduced in this slice: gate renderer + puzzle component + card/badge animations + map event handlers
- What remains before the milestone is truly usable end-to-end: Gates 2–5 content (S03), responsive polish and deployment (S04)

## Files Likely Touched

- `js/gate-renderer.js` (new)
- `js/puzzles/decode-puzzle.js` (new)
- `js/card-reveal.js` (new)
- `js/badge-reveal.js` (new)
- `js/data.js` (Gate 1 content fill)
- `js/map.js` (wire click handlers)
- `js/game-engine.js` (minor integration)
- `js/gallery.js` (wire card/badge display updates)
- `styles/gate.css` (new)
- `styles/puzzle.css` (new)
- `images/gate1/` (new AI-generated images)
