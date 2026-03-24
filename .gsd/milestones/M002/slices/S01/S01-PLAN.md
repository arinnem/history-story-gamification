# S01 — Immersive Map Redesign

## Goal
Replace the flat CSS map with an SVG topographic war map of the Mường Thanh valley, with real landmarks, French strongpoint labels, River Nậm Rốm, and all 5 gates at their historical positions.

## Demo (Slice is DONE when...)
- Map shows a parchment-style topographic view of Mường Thanh valley
- Mountains, river, contour lines, and airstrip are visible
- French strongpoint labels (Béatrice, Gabrielle, Éliane, etc.) are present
- 5 gate markers sit at real landmark positions (see table below)
- All gates visible without scrolling
- Animated trail connects gates I→V with a glowing marching-dot

## Gate–Landmark Positions

| Gate | Landmark | Map Region |
|------|----------|-----------|
| I | Quảng trường Ba Đình (inset origin) | Top-left, with arrow pointing to NW Vietnam |
| II | Route Tuần Giáo → ĐBP (supply trail) | Upper-left, mountain pass area |
| III | Mường Thanh Valley (trench network) | Center, the valley basin |
| IV | Him Lam (Béatrice) + Đồi A1 (Éliane 2) | East side hills |
| V | Hầm De Castries (French HQ) | Center-south command area |

## Must-haves
- [x] AI-generated base map image (parchment topographic style)
- [x] SVG overlay layer with interactive gate markers
- [x] French strongpoint labels + Vietnamese place names
- [x] Compass rose + "Bản Đồ Chiến Dịch ĐBP — 1954" cartouche
- [x] Animated trail path with glowing effect
- [x] Responsive — all 5 gates visible without scroll on desktop and mobile

## Proof Level
- Visual: screenshot comparison before/after
- Interactive: gates clickable at correct positions

## Tasks

### [x] T01: Generate base topographic map
- AI-generate a parchment-style topographic map of Mường Thanh valley
- Include mountains surrounding the valley, river flowing N→S, contour lines
- Style: vintage military map, earth tones, hand-drawn quality
- Output: `images/map/dien-bien-phu-map.png`

### [x] T02: Create SVG overlay with gate markers
- Position 5 gate markers at real landmark coordinates on the map
- Each marker: number + title + status icon (locked/active/completed)
- Use SVG `<g>` elements with CSS class toggling

### [x] T03: Add labels and geographic features
- French strongpoint names: Béatrice, Gabrielle, Dominique, Éliane, Claudine, Huguette, Isabelle
- Vietnamese names: Mường Thanh, Sông Nậm Rốm, Đồi A1, Him Lam
- Airstrip indicator (NW–SE dashed line)

### [x] T04: Map decorative elements
- Compass rose (bottom-right)
- Scale bar (bottom-left)
- Title cartouche: "Bản Đồ Chiến Dịch Điện Biên Phủ — 1954"
- Aged-paper edge border with inset shadow

### [x] T05: Animated trail
- SVG `<path>` connecting gates I→V
- CSS `stroke-dashoffset` animation for marching-dot effect
- `<animateMotion>` dot traveling along trail path
- Glowing pulse on active gate markers

### [x] T06: Responsive fit
- All 5 gates visible without scrolling via aspect-ratio: 3/2 and viewport-relative sizing
- Mobile: hide detailed labels, shrink markers, remove compass/scale
- Desktop: full labels, decorative elements visible

## Files Modified
- `index.html` — map container restructured with SVG overlay
- `styles/main.css` — map styles completely rewritten
- `js/map.js` — updated to use SVG gate markers (gate-svg-N)
- `images/map/dien-bien-phu-map.png` — new AI-generated base map
