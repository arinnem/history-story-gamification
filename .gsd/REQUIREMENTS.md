# Requirements

This file is the explicit capability and coverage contract for the project.

## Active

### R001 — Gate Progression System
- Class: core-capability
- Status: active
- Description: User can progress through 5 sequential gates, each gated by puzzle completion. Completing gate N unlocks gate N+1.
- Why it matters: This is the core game loop — without progression, there's no gamification.
- Source: user
- Primary owning slice: M001/S01
- Supporting slices: M001/S02
- Validation: unmapped

### R002 — Illustrated Narrative Storytelling
- Class: primary-user-loop
- Status: active
- Description: Each gate displays illustrated narrative text telling the Điện Biên Phủ story, sourced from "Kể chuyện Điện Biên Phủ" (NXB Kim Đồng).
- Why it matters: This is the storytelling component the contest judges evaluate.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S03
- Validation: unmapped

### R003 — Interactive Puzzle Challenges
- Class: primary-user-loop
- Status: active
- Description: Each gate contains an interactive puzzle (decode quotes, match artifacts, sort events, match heroes, piece together scenes). Puzzles serve as the "gate" mechanism.
- Why it matters: Differentiates from passive storytelling — the gamification element.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S03
- Validation: unmapped

### R004 — Collectible Character Cards
- Class: differentiator
- Status: active
- Description: Completing a gate unlocks an illustrated character card (historical figure) with name, title, achievement, and historical quote. Card has a flip animation to reveal.
- Why it matters: Collection motivation drives engagement and makes the contest entry memorable.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S03
- Validation: unmapped

### R005 — Badge System with Hidden Facts
- Class: differentiator
- Status: active
- Description: Completing a gate earns a themed badge and reveals a hidden historical fact not shown in the main narrative.
- Why it matters: Reward loop + educational bonus content.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: M001/S03
- Validation: unmapped

### R006 — Progress Persistence
- Class: launchability
- Status: active
- Description: User's progress (completed gates, collected cards, earned badges) persists across browser sessions via localStorage.
- Why it matters: Judges or users who close the browser shouldn't lose progress.
- Source: inferred
- Primary owning slice: M001/S01
- Supporting slices: none
- Validation: unmapped

### R007 — Card Gallery
- Class: primary-user-loop
- Status: active
- Description: A viewable gallery showing all collected character cards vs. locked cards, accessible from the main map.
- Why it matters: Collection display is a core gamification feedback loop.
- Source: user
- Primary owning slice: M001/S02
- Supporting slices: none
- Validation: unmapped

### R008 — Responsive Design
- Class: quality-attribute
- Status: active
- Description: App works on both desktop and mobile viewports.
- Why it matters: Judges may view on phones.
- Source: inferred
- Primary owning slice: M001/S04
- Supporting slices: none
- Validation: unmapped

### R009 — AI Usage Documentation
- Class: constraint
- Status: active
- Description: All AI tool usage is documented and can fill the contest registration form.
- Why it matters: Contest requirement — must declare AI involvement.
- Source: user
- Primary owning slice: M001/S04
- Supporting slices: none
- Validation: unmapped

## Traceability

| ID | Class | Status | Primary owner | Supporting | Proof |
|---|---|---|---|---|---|
| R001 | core-capability | active | M001/S01 | M001/S02 | unmapped |
| R002 | primary-user-loop | active | M001/S02 | M001/S03 | unmapped |
| R003 | primary-user-loop | active | M001/S02 | M001/S03 | unmapped |
| R004 | differentiator | active | M001/S02 | M001/S03 | unmapped |
| R005 | differentiator | active | M001/S02 | M001/S03 | unmapped |
| R006 | launchability | active | M001/S01 | none | unmapped |
| R007 | primary-user-loop | active | M001/S02 | none | unmapped |
| R008 | quality-attribute | active | M001/S04 | none | unmapped |
| R009 | constraint | active | M001/S04 | none | unmapped |

## Coverage Summary

- Active requirements: 9
- Mapped to slices: 9
- Validated: 0
- Unmapped active requirements: 0
