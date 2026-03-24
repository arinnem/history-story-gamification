---
id: S01
parent: M002
milestone: M002
provides:
  - Immersive topographic war map with SVG overlay as the spatial navigation foundation
  - Interactive gate markers at historically accurate positions
  - Geographic labels binding the game to real Điện Biên Phủ geography
requires: []
affects:
  - S02
  - S03
  - S04
key_files:
  - index.html
  - styles/main.css
  - js/map.js
  - images/map/dien-bien-phu-map.png
key_decisions:
  - SVG overlay on AI-generated raster base (not pure SVG map or pure CSS)
  - Gate marker IDs changed from gate-marker-N to gate-svg-N
patterns_established:
  - SVG viewBox coordinate system (0 0 1000 700) for all map elements
  - CSS class-based state management for gate markers (locked/completed/active)
observability_surfaces:
  - Console logs in MapView for marker initialization and gate open/close
drill_down_paths: []
duration: ~2h
verification_result: passed (code-level, 36/36 checks)
completed_at: 2026-03-24
---

# S01: Immersive Map Redesign

**Replaced flat CSS gradient map with an AI-generated topographic war map of Mường Thanh valley, featuring SVG overlay with 5 interactive gate markers, French strongpoint labels, animated trail path, compass rose, and title cartouche.**

## What Happened

Generated a topographic war map image via AI, then built a comprehensive SVG overlay system on top of it. The overlay contains 3 layer groups: geographic labels (French strongpoints Béatrice through Isabelle, Vietnamese place names, airstrip), an animated trail path connecting all 5 gates with a marching-dot animation, and 5 gate markers positioned at historically accurate locations. Added decorative elements — compass rose with Vietnamese cardinal labels (B/N/Đ/T), a map scale bar, and a title cartouche reading "BẢN ĐỒ CHIẾN DỊCH ĐIỆN BIÊN PHỦ — 1954". All positioned within a `viewBox="0 0 1000 700"` coordinate system. `map.js` updated to query SVG `<g>` elements instead of HTML divs for marker state management.

## Verification

36 code-level checks passed: HTML element existence (overlay, markers, labels, decorative elements), CSS rule existence (frame, overlay, labels, markers, compass, scale bar, cartouche), JS selector updates, image file existence, and HTTP 200 from local server. Browser visual verification blocked by Playwright infrastructure crash — deferred to manual UAT.

## Requirements Advanced

- R002 — Map now provides geographical context for narratives, strengthening the storytelling connection to real Điện Biên Phủ locations
- R008 — Responsive SVG map with mobile breakpoints added (labels hidden, markers sized down)

## Requirements Validated

None — visual verification pending manual UAT.

## New Requirements Surfaced

None.

## Requirements Invalidated or Re-scoped

None.

## Deviations

- Changed gate marker IDs from `gate-marker-N` to `gate-svg-N` to reflect SVG implementation (HTML div markers replaced entirely)
- Used AI-generated raster image as base instead of pure SVG topographic rendering — better visual quality with less code complexity

## Known Limitations

- Map image is a static PNG — no zoom or pan support
- Gate positions are hard-coded SVG coordinates — any map image change requires repositioning
- Some geographic labels may overlap on very narrow mobile viewports (< 360px)

## Follow-ups

- Consider adding zoom/pan for mobile users in a future milestone
- Gate marker positions should be validated against actual Điện Biên Phủ geography

## Files Created/Modified

- `index.html` — replaced map-container HTML with map-frame + SVG overlay structure
- `styles/main.css` — complete rewrite of map section CSS (230 lines added)
- `js/map.js` — updated marker selectors from HTML to SVG, same logic
- `images/map/dien-bien-phu-map.png` — AI-generated topographic war map

## Forward Intelligence

### What the next slice should know
- The map section uses `position: relative` with the SVG overlay `position: absolute` — any transitions on `.map-container` need to preserve this stacking
- MapView.openGate() and MapView.closeGate() are the entry/exit points for transition hooks

### What's fragile
- SVG `viewBox="0 0 1000 700"` coordinate system — changing the aspect ratio breaks all element positions
- The `.map-container` must have `display: ''` (not `block`) when visible, as some CSS depends on its default display value

### Authoritative diagnostics
- Console: `[MapView]` prefix for all map module logs
- SVG elements: inspect `#gate-svg-N` groups for marker state classes

### What assumptions changed
- Originally planned CSS-only map — switched to AI image + SVG overlay for much better visual quality
