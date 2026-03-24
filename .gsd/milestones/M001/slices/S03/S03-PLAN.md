# S03: Gates 2–5 Content

**Goal:** Replicate the proven Gate 1 pattern to produce 4 more complete gates, each with unique narrative content, a different puzzle type, a new character card, badge, and hidden fact. Complete the full Điện Biên Phủ story arc.
**Demo:** All 5 gates are playable sequentially. Starting from Gate 1 → completing all 5 gates → all 6 character cards collected, all 5 badges earned, full story from colonization to victory is told. Each gate has a distinctly different puzzle mechanic.

## Must-Haves

- Gate 2 narrative + matching puzzle (match supplies to transport methods)
- Gate 3 narrative + chronological sort puzzle (order Giáp's key decisions)
- Gate 4 narrative + hero-matching puzzle (match heroes to legendary acts) + 2 character cards
- Gate 5 narrative + jigsaw reveal puzzle (piece together the victory scene)
- AI-generated illustrations for all 4 remaining gates (8–12 images total)
- 4 new character cards with unique portraits and data
- 4 new badges with hidden facts
- All puzzle types implemented and working

## Proof Level

- This slice proves: integration (full 5-gate journey works end-to-end with real content)
- Real runtime required: yes (browser)
- Human/UAT required: yes (historical accuracy of all content, puzzle balance)

## Verification

- Play through all 5 gates sequentially: Gate 1 → 2 → 3 → 4 → 5
- Each gate has: readable narrative, solvable puzzle, character card with flip animation, badge with hidden fact
- Each puzzle is a different type (decode, matching, chronological, hero-matching, jigsaw)
- After Gate 5: card gallery shows 6/6 cards, badge collection shows 5/5 badges
- Narrative content tells a coherent story arc from colonization to victory

## Tasks

- [ ] **T01: Build the matching puzzle component** `est:45m`
  - Why: Gates 2 and 4 need matching puzzles — users drag or click items to connect matching pairs
  - Files: `js/puzzles/matching-puzzle.js`, `styles/puzzle.css`
  - Do:
    1. Create a matching puzzle renderer that takes config: `{ pairs: [{ left, right, image? }], instructions }`
    2. **Mechanic**: Two columns of items. User clicks a left item, then clicks the matching right item. Matched pairs highlight green and lock. Incorrect matches shake and reset.
    3. Support optional images on either side (for Gate 2: bicycle images, supply images)
    4. Track match count — puzzle complete when all pairs matched
    5. Add visual feedback: connecting lines between matched pairs, celebration when all matched
    6. Emit "puzzle-solved" event on completion
  - Verify: Render with test data → match all pairs correctly → success. Match incorrectly → error feedback. All pairs matched → completion event fires.
  - Done when: Matching puzzle works with arbitrary pair data, supports text and image items, emits completion

- [ ] **T02: Build the chronological sort puzzle component** `est:45m`
  - Why: Gate 3 requires sorting historical events in correct time order
  - Files: `js/puzzles/chronological-puzzle.js`, `styles/puzzle.css`
  - Do:
    1. Create a chronological sort renderer: `{ events: [{ text, year, order }], instructions }`
    2. **Mechanic**: Display event cards in random order. User drags cards up/down to reorder them into correct chronological sequence. Or: click two cards to swap positions.
    3. Show year indicators that appear after correct placement
    4. "Check Order" button validates the sequence
    5. Correct order → timeline animation draws connecting the events in order
    6. Incorrect → highlight the out-of-place cards in red, allow retry
  - Verify: Events display in random order → arrange correctly → success with timeline animation. Arrange incorrectly → incorrect items highlighted.
  - Done when: Chronological puzzle works with arbitrary event data, drag/click reordering works, visual timeline appears on success

- [ ] **T03: Build the jigsaw/reveal puzzle component** `est:45m`
  - Why: Gate 5 (the victory) needs a dramatic reveal — piecing together the victory scene image
  - Files: `js/puzzles/jigsaw-puzzle.js`, `styles/puzzle.css`
  - Do:
    1. Create a simplified jigsaw renderer: `{ image, gridSize (e.g., 3x3), instructions }`
    2. **Mechanic**: An image is split into a grid (3×3 = 9 tiles). Tiles are shuffled. User clicks two tiles to swap positions. Goal: reconstruct the full image.
    3. Gray overlay on each tile until correctly placed (incentivizes solving)
    4. When a tile is in correct position, it "locks" with a subtle glow
    5. All tiles correct → full image reveals with a dramatic fade/zoom animation
    6. The revealed image is the iconic red flag being planted at the command bunker
  - Verify: Image splits into 9 shuffled tiles → swap tiles to correct positions → tiles lock when correct → full image reveals with animation on completion.
  - Done when: Jigsaw puzzle works with any square image, tile swapping is intuitive, correct placement detection works, dramatic reveal animation plays

- [ ] **T04: Write narrative content and generate AI images for Gates 2–5** `est:2h`
  - Why: Each gate needs 4–5 paragraphs of narrative and 2–3 AI illustrations to create an immersive story experience
  - Files: `js/data.js`, `images/gate2/`, `images/gate3/`, `images/gate4/`, `images/gate5/`
  - Do:
    1. **Gate 2 — "Cuộc Hành Quân"**: The March
       - Narrative: The incredible logistics operation — how thousands of dân công (civilian workers) carried supplies on modified bicycles through mountain trails, the challenge of moving artillery pieces by hand, the Ho Chi Minh Trail
       - Images: bicycle supply convoy, mountain trails, artillery being hauled uphill
       - Character card: Dân Công (the collective civilian workers)
       - Matching puzzle config: match supplies (rice, ammunition, cannons, medicine) to transport methods (bicycle, shoulder carry, elephant, river raft)
       - Badge: 🚲 Xe Đạp Thồ — hidden fact about the total weight carried
    2. **Gate 3 — "Đào Chiến Hào"**: Digging the Trenches
       - Narrative: Võ Nguyên Giáp's famous strategy change from "đánh nhanh, thắng nhanh" to "đánh chắc, tiến chắc", the trench system surrounding the French positions, the psychological warfare
       - Images: trench system map, soldiers digging at night, Giáp studying maps
       - Character card: Võ Nguyên Giáp
       - Chronological puzzle config: sort key decisions (initial attack plan, postponement decision, strategy change, trench digging order, final assault plan)
       - Badge: ⚒️ Chiến Sĩ Công Binh — hidden fact about trench length
    3. **Gate 4 — "56 Ngày Đêm"**: 56 Days and Nights
       - Narrative: The key battles at strongpoints Him Lam, Độc Lập, Bản Kéo, A1, C1. The heroism of individuals. The turning point at Hill A1.
       - Images: battle scene at Him Lam, soldiers charging, Hill A1 at night
       - Character cards (2): Phan Đình Giót (blocked enemy bunker), Tô Vĩnh Diện (held cannon wheel)
       - Hero-matching puzzle: match 4 heroes to their acts (Phan Đình Giót → lấy thân mình lấp lỗ châu mai, Tô Vĩnh Diện → lấy thân chèn pháo, Bế Văn Đàn → lấy vai làm giá súng, Trần Can → cắm cờ trên đồi A1)
       - Badge: 🎖️ Anh Hùng Điện Biên — hidden fact about the total number of heroes
    4. **Gate 5 — "Chiến Thắng Lịch Sử"**: Historic Victory
       - Narrative: The final assault on May 7, 1954. De Castries' surrender. The red flag on the command bunker. The impact on the Geneva Accords and world history.
       - Images: the final assault, the red flag being raised, celebrations
       - Character card: Lá Cờ Chiến Thắng (the Victory Flag — symbolic)
       - Jigsaw puzzle: the iconic image of the flag being planted at the command bunker
       - Badge: 🏆 Chấn Động Địa Cầu — hidden fact about the Geneva Conference result
    5. Generate all AI images (8–12 total) with consistent art style matching the blended vintage/modern aesthetic
  - Verify: `GATES_DATA[2]` through `GATES_DATA[5]` all have complete narrative, puzzle configs, character card data, badge data, hidden facts. Image files exist in respective directories.
  - Done when: All gate data complete, all AI images generated, puzzle configs valid

- [ ] **T05: Wire Gates 2–5 into the renderer and verify full 5-gate journey** `est:1h`
  - Why: All puzzle types must integrate with the gate renderer, and the full 5-gate sequential journey must work flawlessly
  - Files: `js/gate-renderer.js`, `js/data.js`, `js/game-engine.js`, `js/gallery.js`
  - Do:
    1. Register the 3 new puzzle types (matching, chronological, jigsaw) in the gate renderer's puzzle dispatcher
    2. Gate renderer should auto-select puzzle component based on `puzzle.type` field in data
    3. Wire Gate 4's special case: 2 character cards revealed sequentially
    4. Test each gate individually: open → read story → solve puzzle → earn rewards → return to map
    5. Test the full sequential journey: reset progress → Gate 1 through 5 → all cards/badges collected
    6. Verify card gallery shows 6/6 cards after full completion
    7. Verify badge collection shows 5/5 badges with all hidden facts viewable
    8. Fix any content, styling, or interaction issues discovered during testing
  - Verify: Full 5-gate journey completes without errors. Gallery shows 6/6 cards and 5/5 badges. Each puzzle type works correctly. Story arc is coherent.
  - Done when: All 5 gates playable end-to-end, all puzzle types working, all cards/badges collectible, complete story told

## Integration Closure

- Upstream surfaces consumed: gate renderer, card/badge animation system, game engine, map navigation, gallery panel — all from S01/S02
- New wiring introduced: 3 new puzzle components registered in renderer, Gates 2–5 data, Gate 4 dual-card handling
- What remains: responsive polish, deployment, video (S04)

## Files Likely Touched

- `js/puzzles/matching-puzzle.js` (new)
- `js/puzzles/chronological-puzzle.js` (new)
- `js/puzzles/jigsaw-puzzle.js` (new)
- `js/data.js` (Gates 2–5 content fill)
- `js/gate-renderer.js` (puzzle type dispatcher)
- `js/game-engine.js` (minor — Gate 4 dual-card)
- `js/gallery.js` (verify 6-card display)
- `styles/puzzle.css` (new puzzle styles)
- `images/gate2/`, `images/gate3/`, `images/gate4/`, `images/gate5/` (new)
