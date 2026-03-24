# M001: Contest-Ready Web App

**Vision:** A visually stunning, gamified storytelling web experience about the Battle of Điện Biên Phủ that a contest judge can play through in a browser and be impressed by.

## Success Criteria

- User can open the web app and see a map-based navigation with 5 gates
- User can play through all 5 gates in sequence (story → puzzle → card → badge)
- All 6 character cards are collectible and viewable in a gallery
- All 5 badges are earnable with hidden facts revealed
- Progress persists across browser refreshes
- Visual design blends vintage war-map and modern editorial aesthetics
- App works on desktop and mobile
- Video walkthrough recorded and ready for submission

## Key Risks / Unknowns

- AI-generated historical illustrations may look inconsistent — must generate early and iterate
- Puzzle interaction design (drag/drop, matching) could be tricky in vanilla JS — prove in S02
- Content volume: 5 gates × (narrative + puzzle + card + fact) is significant writing — may need to streamline

## Proof Strategy

- Illustration consistency → retire in S01 by proving the visual style works with real generated images
- Puzzle mechanics → retire in S02 by building a complete working puzzle in Gate 1
- Content scalability → retire in S03 by replicating the proven pattern to Gates 2–5

## Verification Classes

- Contract verification: browser testing each gate's full flow (story → puzzle → card → badge → unlock)
- Integration verification: localStorage persistence across refresh
- Operational verification: GitHub Pages deployment
- UAT / human verification: visual quality assessment, historical accuracy review by user

## Milestone Definition of Done

- All 5 gates are playable end-to-end in a browser
- Card gallery shows all 6 cards when fully completed
- All 5 badges display in the collection
- Progress survives browser refresh
- Responsive on mobile and desktop
- Video walkthrough recorded
- Deployed to GitHub Pages

## Requirement Coverage

- Covers: R001, R002, R003, R004, R005, R006, R007, R008, R009
- Partially covers: none
- Leaves for later: none
- Orphan risks: none

## Slices

- [ ] **S01: Foundation + Visual Proof** `risk:high` `depends:[]`
  > After this: The app opens in a browser showing the Điện Biên Phủ map with 5 gate markers. Gate 1 is active, others are locked. CSS design system is established with the blended vintage/modern style. Game engine manages state in localStorage. No story/puzzle content yet — just the shell.
- [ ] **S02: Gate 1 Complete** `risk:high` `depends:[S01]`
  > After this: Gate 1 ("Lời Kêu Gọi") is fully playable — narrative text with AI illustrations, decode-the-quote puzzle, Hồ Chí Minh character card with flip animation, badge earned with hidden fact revealed. Gate 2 unlocks on completion.
- [ ] **S03: Gates 2–5 Content** `risk:low` `depends:[S02]`
  > After this: All 5 gates are playable with unique content, puzzles, cards, and badges. The full story arc from French colonization to victory is complete.
- [ ] **S04: Polish + Submission** `risk:low` `depends:[S03]`
  > After this: Responsive design verified on mobile, animations polished, deployed to GitHub Pages, video walkthrough recorded, AI usage documented.

## Boundary Map

### S01 → S02

Produces:
- `index.html` with map navigation and gate markers
- CSS design system (colors, typography, card/badge styles, animations)
- `game-engine.js` with gate state management, localStorage persistence, unlock logic
- `data.js` structure (empty content, but schema defined)

Consumes:
- nothing (first slice)

### S02 → S03

Produces:
- `gate-renderer.js` — working renderer that builds story + puzzle + card + badge from data
- Gate 1 complete data entry in `data.js` as the reference pattern
- All puzzle component types implemented (at least the decode-quote type)

Consumes:
- Design system, game engine, map navigation from S01

### S03 → S04

Produces:
- Complete `data.js` with all 5 gates' content, puzzles, cards, badges, facts
- All puzzle types implemented (matching, chronological sort, hero-matching, jigsaw reveal)
- AI-generated images for all gates

Consumes:
- Gate renderer, all puzzle components from S02
