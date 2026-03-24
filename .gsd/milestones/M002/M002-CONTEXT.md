# M002 — Visual & UX Premium Upgrade

## Context

M001 delivered a working app with all 5 gates, puzzles, cards, badges, and content. But the visual quality is basic — flat map, plain text layout, no animations, no immersive feel. This milestone transforms the app from "functional prototype" to "contest-winning experience."

### Current Problems (from screenshots)

1. **Map feels flat** — CSS gradients with circles don't evoke a war map
2. **No intro/splash** — app loads directly into map, no context-setting
3. **Gate view has no dedicated header** — main app header stays, no back-button prominence
4. **Story layout is plain** — just text paragraphs with images between them
5. **No scroll-based effects** — text appears instantly, no narrative pacing
6. **No audio/ambient** — silent experience feels lifeless
7. **Gate V hidden** — map cuts off at bottom, 5th gate not visible without scroll
8. **No page transitions** — abrupt view switches between map/gate
9. **No visual storytelling** — story section reads like a textbook, not an adventure

## Goals

- Transform map into an immersive, hand-drawn-style topographic war map
- Add cinematic intro sequence
- Make story sections feel like turning pages in a illustrated book
- Add smooth transitions, scroll effects, ambient sound
- Polish every interaction to feel premium

## Success Criteria

- A first-time user says "wow" within 3 seconds of loading the app
- The map looks like a military campaign map, not a web page
- Each gate feels like entering a different chapter of a book
- Judging panel sees production-quality polish

## Risks

| Risk | Level | Mitigation |
|------|-------|-----------|
| Over-engineering animations → jank on mobile | Medium | Test on real mobile after each slice |
| Large images slow load time | Medium | Compress, lazy-load, use WebP |
| Scope creep on polish | High | Time-box each slice to 3h max |

## Slices

### S01: Immersive Map Redesign
- **Risk:** High (defines the visual identity)
- **Demo:** Map looks like a hand-drawn military campaign map with terrain, contour lines, location labels in Vietnamese, animated trail, and all 5 gates visible without scrolling
- Dependencies: None

### S02: Cinematic Intro + Page Transitions
- **Risk:** Medium
- **Demo:** App opens with a 5-second cinematic intro (title, date "1954", fade into map). Gate transitions use page-turn or slide animations.
- Dependencies: S01

### S03: Story Section Redesign
- **Risk:** Medium
- **Demo:** Story text reveals with scroll-based IntersectionObserver animations. Images use parallax. Chapters have decorative dividers. Pull-quote styling for historical quotes.
- Dependencies: S02

### S04: Interaction Polish + Sound
- **Risk:** Low
- **Demo:** Puzzle interactions have haptic feedback (screen shake on wrong). Card flip has sparkle particles. Sound effects on key moments (optional mute). Loading states.
- Dependencies: S03
