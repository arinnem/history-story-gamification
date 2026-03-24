# M002 Roadmap — Visual & UX Premium Upgrade

## Vision
Transform "Con Đường Điện Biên" from a functional prototype into a contest-winning, visually stunning experience that makes judges and users say "wow" within 3 seconds.

## Slices (ordered by risk)

---

### S01: Immersive Map Redesign `HIGH RISK`

**Goal:** Replace the flat CSS map with an immersive, hand-drawn-style topographic campaign map that fills the viewport, shows all 5 gates without scrolling, and evokes a military command center.

**Demo:** Opening the app shows a beautiful parchment map with mountains, river, valley contour lines, Vietnamese place names, a glowing animated trail, and 5 gate markers at proper positions — all visible without scrolling.

**Tasks:**
- [x] T01: Create SVG/canvas-based topographic map with terrain features (mountains, river Nậm Rốm, valley contour lines, forest indicators)
- [x] T02: Add hand-written-style Vietnamese labels (Mường Thanh, Sông Nậm Rốm, Đồi A1, Him Lam, etc.)
- [x] T03: Redesign gate markers as map pins with hover tooltips showing gate preview
- [x] T04: Animate the trail path with a glowing "marching" dot animation
- [x] T05: Ensure all 5 gates fit within viewport (no scroll needed for map)
- [x] T06: Add decorative map border (compass rose, scale bar, "Bản đồ chiến dịch" title cartouche)

**Files:** `index.html`, `styles/main.css`, `js/map.js`, `images/map/` (new SVG assets)

---

### S02: Cinematic Intro + Page Transitions `MEDIUM RISK`

**Goal:** Add a powerful first-impression intro sequence and smooth transitions between map and gate views.

**Demo:** App opens with a 5s cinematic: dark screen → vintage paper unfurling → "1954" typewriter animation → "Con Đường Điện Biên" title reveal → fade into map. Gate transitions use a page-turn/book-open effect.

**Tasks:**
- [x] T01: Build intro overlay with cinematic sequence (CSS animations, no dependencies)
- [x] T02: Add typewriter text animation for the year "1954" and subtitle
- [x] T03: Implement page-turn transition for map → gate view
- [x] T04: Add fade-in transition for gate view → map return
- [x] T05: Add "Skip Intro" button for returning users
- [x] T06: Store intro-seen flag in localStorage to auto-skip on repeat visits

**Files:** `index.html`, `styles/intro.css` (new), `js/intro.js` (new)

---

### S03: Story Section Redesign `MEDIUM RISK`

**Goal:** Transform plain text stories into an immersive, illustrated-book experience with scroll-based reveals, parallax images, decorative dividers, and pull-quote styling.

**Demo:** Entering a gate shows a chapter title with decorative headers. Text paragraphs fade-in-up on scroll. Images have subtle parallax. Historical quotes appear in ornate pull-quote boxes. Section dividers use Vietnamese decorative patterns.

**Tasks:**
- [x] T01: Add IntersectionObserver for scroll-based text reveal (fade-in-up on enter viewport)
- [x] T02: Style images with parallax scroll effect (background-attachment: fixed or transform-based)
- [x] T03: Create decorative chapter headers with gate number, Vietnamese ornamental border
- [x] T04: Build pull-quote component for historical quotes (large text, decorative marks, accent color)
- [x] T05: Add ornamental section dividers between story, puzzle, and reward sections
- [x] T06: Add a reading progress indicator in the gate header

**Files:** `styles/gate.css`, `js/gate-renderer.js`, `styles/components.css` (new)

---

### S04: Interaction Polish + Sound `LOW RISK`

**Goal:** Add micro-interactions, particle effects, sound effects, and final polish to make every interaction feel premium.

**Demo:** Puzzle pieces have subtle bounce on hover. Wrong answers trigger screen shake. Card flip has sparkle trail. Badge reveal has expanding golden ring. Optional ambient background music. All animations run at 60fps.

**Tasks:**
- [x] T01: Add particle effects to card flip (sparkles using CSS/canvas)
- [x] T02: Add expanding golden ring effect to badge reveal
- [x] T03: Add screen-shake effect on wrong puzzle answers
- [x] T04: Add hover micro-animations to all interactive elements (buttons scale, tiles lift)
- [x] T05: Add optional sound effects (puzzle correct/wrong, card flip, badge earn, gate unlock) with mute toggle
- [ ] T06: Performance audit — ensure 60fps on all animations, lazy-load images, compress assets

**Files:** `js/effects.js` (new), `js/audio.js` (new), `sounds/` (new), all CSS files

---

## Boundary Map

```
S01 (Map)  →  S02 (Intro/Transitions)  →  S03 (Story)  →  S04 (Polish)
   ↓                    ↓                       ↓               ↓
  Map visual         First impression       Content feel     Final quality
  identity           & navigation           & pacing         & delight
```

## Definition of Done

- [ ] Map is visually stunning and all 5 gates visible without scrolling
- [ ] Intro cinematic plays on first visit
- [ ] All transitions are smooth (no abrupt view switches)
- [ ] Story sections have scroll-based reveals
- [ ] At least 3 interaction polish effects working
- [ ] 60fps on desktop and mobile
- [ ] Pushed to GitHub Pages and live
