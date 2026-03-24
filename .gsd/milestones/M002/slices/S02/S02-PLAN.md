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
- [ ] Full-screen intro overlay with CSS-only animation sequence
- [ ] Typewriter text effect for year and subtitle
- [ ] Page-turn or slide-in transition for map → gate
- [ ] Fade transition for gate → map
- [ ] Skip button + auto-skip for returning visitors

## Proof Level
- Visual: screen recording of intro sequence
- Functional: localStorage flag correctly set/read

## Tasks

### T01: Intro overlay structure
- Full-screen overlay div covering entire viewport
- Layer order: dark bg → paper texture → text elements
- CSS keyframes for fade-in, unfurl, and reveal

### T02: Typewriter animation
- "1954" appears letter by letter (CSS steps animation or JS interval)
- "Hành trình lịch sử qua trận Điện Biên Phủ" subtitle fades in after
- Vietnamese text with proper diacritics rendering

### T03: Map → gate page-turn transition
- When clicking a gate marker: map slides/turns left, gate view slides in from right
- Duration: 0.6s ease-out
- Use CSS transform + transition, no JS animation library needed

### T04: Gate → map fade transition
- On back button click: gate fades out, map fades in
- Duration: 0.4s ease

### T05: Skip + auto-skip
- "Bỏ qua ▶" button in bottom-right during intro
- On skip or intro completion: set `localStorage.setItem('introSeen', 'true')`
- On page load: if flag exists, skip directly to map

## Files Modified
- `index.html` — intro overlay HTML
- `styles/intro.css` — new CSS file for intro animations
- `js/intro.js` — new JS module for intro logic
- `js/map.js` — transition hooks for gate open/close
