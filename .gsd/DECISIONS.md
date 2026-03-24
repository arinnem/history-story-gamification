# Decisions

Append-only register of architectural and pattern decisions.

## D001 — Vanilla HTML/CSS/JS, no frameworks
- Date: 2026-03-23
- Context: Student project for a contest, needs to be understandable and easily hosted
- Decision: Use plain HTML, CSS, and JavaScript with no build tools or frameworks
- Rationale: Simplest deployment (GitHub Pages), no build step, student can understand and present it
- Alternatives considered: React/Vite (overkill for 5 pages), Next.js (way overkill)

## D002 — Single-page app with data-driven rendering
- Date: 2026-03-23
- Context: 5 gates follow the same pattern (story → puzzle → card → badge)
- Decision: One HTML page with a JS gate renderer that builds each gate from a data object
- Rationale: Avoids 5 duplicate HTML files, makes adding/editing gates trivial

## D003 — Visual style: blended vintage map + modern editorial
- Date: 2026-03-23
- Context: User wants a blend of vintage war-map aesthetics and modern editorial design, anchored on the actual Điện Biên Phủ topographic map
- Decision: Parchment/earth-tone backgrounds with bold modern typography and vibrant accent colors. Main navigation is the Điện Biên Phủ map with gates positioned at historical locations.
- Rationale: User direction. Creates a unique, memorable contest entry.

## D004 — Source book: "Kể chuyện Điện Biên Phủ" (NXB Kim Đồng)
- Date: 2026-03-23
- Context: Contest requires basing entry on a book/tác phẩm
- Decision: Use this illustrated, short retelling for young readers
- Rationale: Short enough to cover completely, age-appropriate, well-known publisher
