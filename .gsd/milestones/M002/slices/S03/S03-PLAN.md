# S03 — Story Section Redesign

## Goal
Transform plain-text gate stories into an immersive, illustrated-book experience with scroll-based reveals, parallax images, pull-quotes, and decorative elements.

## Must-haves
- [x] IntersectionObserver scroll-triggered text animations
- [x] Parallax effect on story images
- [x] Decorative chapter header component
- [x] Pull-quote component for historical quotes
- [x] Ornamental section dividers
- [x] Reading progress indicator

## Tasks

### [x] T01: Scroll-based text reveal (IntersectionObserver)
### [x] T02: Parallax images (±15px, prefers-reduced-motion)
### [x] T03: Chapter headers (Roman numeral, title, subtitle, ornamental border)
### [x] T04: Pull-quote component (quotes with attribution)
### [x] T05: Section dividers (star, floral, rule variants)
### [x] T06: Reading progress bar (tracks story section scroll)

## Files Modified
- `styles/components.css` — new component stylesheet
- `js/gate-renderer.js` — enhanced story HTML, scroll observer, parallax, progress bar
- `index.html` — components.css link
