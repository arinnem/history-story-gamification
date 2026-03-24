# S03 — Story Section Redesign

## Goal
Transform plain-text gate stories into an immersive, illustrated-book experience with scroll-based reveals, parallax images, pull-quotes, and decorative elements.

## Demo (Slice is DONE when...)
- Entering a gate shows a decorative chapter header with gate number
- Story paragraphs fade-in-up as user scrolls (IntersectionObserver)
- Images have subtle parallax scroll effect
- Historical quotes appear in ornate pull-quote boxes
- Section dividers separate story, puzzle, and reward sections
- Reading progress bar in the gate header

## Must-haves
- [ ] IntersectionObserver scroll-triggered text animations
- [ ] Parallax effect on story images
- [ ] Decorative chapter header component
- [ ] Pull-quote component for historical quotes
- [ ] Ornamental section dividers
- [ ] Reading progress indicator

## Proof Level
- Visual: before/after comparison of gate story view
- Functional: scroll effects work on both desktop and mobile

## Tasks

### T01: Scroll-based text reveal
- Use IntersectionObserver to detect when paragraphs enter viewport
- Add `.revealed` class for fade-in-up animation
- Stagger delay for consecutive paragraphs (0.1s each)

### T02: Parallax images
- Story images use `transform: translateY()` based on scroll position
- Subtle effect (±30px max) to avoid motion sickness
- Disable on `prefers-reduced-motion`

### T03: Chapter headers
- Decorative header with gate Roman numeral, Vietnamese ornamental border
- Subtitle in accent font
- CSS-only design (no image dependencies)

### T04: Pull-quote component
- Large italic text with decorative quotation marks ("...")
- Left border accent in red/gold
- Used for Hồ Chí Minh quotes, Giáp quotes, etc.

### T05: Section dividers
- Vietnamese-inspired ornamental pattern between story/puzzle/reward
- CSS-only using border, pseudo-elements, and Unicode decorations
- Three variants: ★ star, ❋ floral, ═══ rule

### T06: Reading progress
- Thin progress bar at top of gate view
- Updates as user scrolls through the story section
- Disappears when puzzle section is reached

## Files Modified
- `styles/gate.css` — chapter headers, pull-quotes, dividers
- `styles/components.css` — new reusable component styles
- `js/gate-renderer.js` — scroll observer and progress bar logic
