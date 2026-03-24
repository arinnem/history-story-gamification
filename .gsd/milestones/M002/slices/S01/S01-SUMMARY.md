---
id: S01
parent: M002
milestone: M002
provides:
  - Immersive SVG topographic war map replacing flat CSS gradient map
  - 5 interactive gate markers at historically accurate positions
  - Geographic labels (French strongpoints + Vietnamese names)
  - Decorative elements (compass rose, scale bar, title cartouche)
  - Animated trail path with marching-dot effect
  - Responsive layout for desktop and mobile
key_files:
  - index.html
  - styles/main.css
  - js/map.js
  - images/map/dien-bien-phu-map.png
key_decisions:
  - SVG overlay approach over pure HTML/CSS positioning for precision
  - AI-generated base map image with CSS sepia filter for vintage feel
  - Vietnamese compass labels (B/N/Đ/T) instead of English
patterns_established:
  - SVG gate markers use class toggling (locked/completed) managed by map.js
  - Gate marker IDs follow gate-svg-N pattern
duration: ~2h
verification_result: passed (code-level, browser infra broken)
completed_at: 2026-03-24
blocker_discovered: false
---

# S01: Immersive Map Redesign

**Replaced flat CSS gradient map with AI-generated topographic war map of Mường Thanh valley, with SVG overlay containing 5 interactive gate markers at historical positions, French strongpoint labels, animated trail, compass rose, scale bar, and title cartouche.**

## What Happened

1. **T01:** Generated AI topographic map image of Điện Biên Phủ valley — parchment style, earth tones, mountains/river/contour lines. Saved as `images/map/dien-bien-phu-map.png` (167KB).

2. **T02:** Rebuilt `index.html` map section with SVG overlay. 5 gate markers as SVG `<g>` elements at historically grounded positions. Each marker has pulse animation, glow effect, number, label, and sublabel.

3. **T03:** Added geographic labels in SVG — 7 French strongpoint names (Béatrice, Gabrielle, Dominique, Éliane, Claudine, Huguette, Isabelle), Vietnamese place names (Mường Thanh, Sông Nậm Rốm, Đồi A1, Him Lam), and airstrip indicator.

4. **T04:** Added compass rose (Vietnamese labels B/N/Đ/T), scale bar, and "BẢN ĐỒ CHIẾN DỊCH ĐIỆN BIÊN PHỦ — 1954" title cartouche with decorative border.

5. **T05:** Animated trail path connecting gates I→V with CSS `stroke-dashoffset` marching-dot animation and `<animateMotion>` glowing dot traveling along the path.

6. **T06:** Responsive styles — map uses `aspect-ratio: 3/2` on desktop, full viewport height on mobile. Mobile hides detailed labels, compass, scale bar; shrinks markers.

## Verification

Code-level verification: 36/36 structural checks passed across HTML (15), CSS (14), and JS (7). Server serves correct content on port 3456. Browser-based visual verification blocked by Playwright infrastructure crash (EOF errors) — requires manual verification by user.

## Verification Evidence

| # | Command | Exit Code | Verdict | Duration |
|---|---------|-----------|---------|----------|
| 1 | HTML element checks (15 selectors) | 0 | pass | <1s |
| 2 | CSS selector checks (14 rules) | 0 | pass | <1s |
| 3 | JS function checks (7 identifiers) | 0 | pass | <1s |
| 4 | HTTP response check (localhost:3456) | 0 | pass | <1s |
| 5 | File existence check (4 files) | 0 | pass | <1s |

## Deviations

- Used SVG `<g>` elements instead of HTML divs for gate markers — cleaner positioning within SVG overlay
- Gate marker IDs changed from `gate-marker-N` to `gate-svg-N` to reflect SVG approach
- Vietnamese compass labels (Bắc/Nam/Đông/Tây → B/N/Đ/T) instead of English N/S/E/W

## Known Issues

- Browser visual verification not completed due to Playwright crash — user needs to verify visually at `http://localhost:3456`
- Gate marker positions are estimated on the SVG viewbox — may need fine-tuning after visual inspection

## Files Created/Modified

- `index.html` — map container rebuilt with SVG overlay, gate markers, labels, trail, decorative elements
- `styles/main.css` — complete rewrite of map CSS section (~300 lines) with responsive styles
- `js/map.js` — updated to use SVG gate markers (`gate-svg-N` IDs)
- `images/map/dien-bien-phu-map.png` — new AI-generated topographic base map (167KB)
