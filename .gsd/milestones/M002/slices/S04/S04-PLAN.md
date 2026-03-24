# S04 — Interaction Polish + Sound

## Goal
Add micro-interactions, particle effects, sound effects, and performance optimizations to make every interaction feel premium and contest-ready.

## Demo (Slice is DONE when...)
- Card flip has sparkle particle trail
- Badge reveal has expanding golden ring
- Wrong puzzle answers trigger screen shake
- All buttons/tiles have hover micro-animations
- Sound effects play on key moments (with mute toggle)
- All animations run at 60fps on desktop and mobile

## Must-haves
- [ ] Sparkle particles on card flip
- [ ] Golden ring expansion on badge reveal
- [ ] Screen shake on wrong answers
- [ ] Hover micro-animations on all interactive elements
- [ ] Sound effects with mute toggle
- [ ] 60fps performance on all animations

## Proof Level
- Visual: screen recording showing all effects
- Performance: Chrome DevTools Performance panel screenshot showing 60fps

## Tasks

### T01: Card flip sparkle particles
- Canvas or CSS-based sparkle particles around the card during flip
- Gold/white colors, radiate outward from card center
- Duration: 1.5s, then fade

### T02: Badge golden ring
- Expanding golden ring animation behind badge icon
- Ring scales from 0→150% and fades out
- Trigger simultaneously with badge reveal

### T03: Screen shake on wrong
- Apply CSS `transform: translate()` shake keyframe to puzzle container
- Short duration (0.3s), strong amplitude (±5px)
- Works on all 4 puzzle types

### T04: Hover micro-animations
- Buttons: scale(1.02) + slight shadow increase on hover
- Word tiles: lift-up translateY(-2px) on hover
- Gate markers: glow intensity increase on hover
- Match items: subtle border color change on hover

### T05: Sound effects
- Prepare 5 short WAV/MP3 files: correct, wrong, flip, badge, unlock
- Use Web Audio API or simple `<audio>` elements
- Mute toggle button in header (🔊/🔇)
- Default: muted (contest-safe)
- Store mute preference in localStorage

### T06: Performance audit
- Lazy-load all gate images (loading="lazy" or IntersectionObserver)
- Compress PNG images to WebP where possible
- Ensure CSS animations use `transform`/`opacity` only (GPU-composited)
- Test on Chrome DevTools → Performance panel for consistent 60fps
- Test on a real mobile device if accessible

## Files Modified
- `js/effects.js` — new module for particle/ring/shake effects
- `js/audio.js` — new module for sound management
- `sounds/` — new directory for audio assets
- `js/card-reveal.js` — hook sparkle effect
- `js/badge-reveal.js` — hook ring effect
- `js/gate-renderer.js` — hook shake on wrong answer
- All CSS files — hover states audit
- `index.html` — mute toggle button in header
