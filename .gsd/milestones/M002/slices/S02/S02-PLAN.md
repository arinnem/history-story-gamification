# S02 — Cinematic Intro + Page Transitions

## Goal
Add a powerful first-impression cinematic intro sequence and smooth animated transitions between map and gate views.

## Demo (Slice is DONE when...)
- App opens with a 5-second cinematic: dark screen → paper unfurling → "1954" typewriter → "Con Đường Điện Biên" title reveal → fade into map
- "Skip Intro" button visible for impatient users
- Returning users auto-skip (localStorage flag)
- Clicking a gate uses a page-turn or book-open transition
- Returning to map uses a fade-out transition

## Must-haves
- [x] Full-screen intro overlay with CSS-only animation sequence
- [x] Typewriter text effect for year and subtitle
- [x] Page-turn or slide-in transition for map → gate
- [x] Fade transition for gate → map
- [x] Skip button + auto-skip for returning visitors

## Tasks

### [x] T01: Intro overlay structure
### [x] T02: Typewriter animation
### [x] T03: Map → gate page-turn transition
### [x] T04: Gate → map fade transition
### [x] T05: Skip + auto-skip

## Files Modified
- `index.html` — intro overlay HTML, CSS/JS links, IntroController.init()
- `styles/intro.css` — cinematic animations + page transitions
- `js/intro.js` — intro controller with localStorage auto-skip
- `js/map.js` — animated gate open/close transitions
