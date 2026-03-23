# Con Đường Điện Biên — Project Plan

## Overview

An interactive, gamified web storytelling experience about the Battle of Điện Biên Phủ (1954) for the "Cùng AI kể chuyện" contest organized by the National Library of Vietnam. Target audience: ages 13–17.

**Source book:** "Kể chuyện Điện Biên Phủ" (NXB Kim Đồng, illustrated by Huy Toàn, text by Hoa Ban)  
**Supplementary:** "Ký họa trong chiến hào" (Drawing Under Fire) for visual references

## Core Concept

Users journey through 5 "gates" (cổng) telling the Điện Biên Phủ story. Each gate combines:

1. **Narrative storytelling** — illustrated historical text
2. **Collectible character cards** — unlock illustrated cards of historical figures with stats/achievements
3. **Puzzle-solving challenges** — interactive puzzles (match artifacts, decode quotes, sort events chronologically)
4. **Badge & progression system** — earn badges to unlock next gate + hidden historical facts

## 5 Gates

| # | Gate Name | Theme | Puzzle | Character Card | Badge |
|---|-----------|-------|--------|----------------|-------|
| 1 | Lời Kêu Gọi | French colonization & resistance | Decode Hồ Chí Minh's hidden quote | 🃏 Hồ Chí Minh | 🌟 Ngọn Lửa Cách Mạng |
| 2 | Cuộc Hành Quân | Logistics & bicycle supply lines | Match supplies to transport methods | 🃏 Dân Công | 🚲 Xe Đạp Thồ |
| 3 | Đào Chiến Hào | Trench warfare & strategy change | Sort Giáp's key decisions chronologically | 🃏 Võ Nguyên Giáp | ⚒️ Chiến Sĩ Công Binh |
| 4 | 56 Ngày Đêm | Key battles (Him Lam, A1, C1) | Match heroes to their legendary acts | 🃏 Phan Đình Giót + Tô Vĩnh Diện | 🎖️ Anh Hùng Điện Biên |
| 5 | Chiến Thắng | Fall of the command bunker | Piece together the victory scene | 🃏 Lá Cờ Chiến Thắng | 🏆 Chấn Động Địa Cầu |

## Gate Flow

```
┌──────────────────────────────────┐
│  📖 STORY — Illustrated narrative│
├──────────────────────────────────┤
│  🧩 PUZZLE — Interactive challenge│
├──────────────────────────────────┤
│  🃏 CARD REVEAL — Flip animation │
├──────────────────────────────────┤
│  🏅 BADGE + Hidden Fact unlocked │
│  → Next gate accessible          │
└──────────────────────────────────┘
```

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Structure | HTML5 |
| Styling | Vanilla CSS (animations, responsive) |
| Logic | Vanilla JavaScript (no frameworks) |
| State | localStorage (progress persistence) |
| Images | AI-generated (Gemini / DALL·E) |
| Hosting | GitHub Pages |

## Contest Submission

- **Format 1:** Web link (via GitHub Pages)
- **Format 2:** Screen-recording video walkthrough (2–5 min)

## AI Usage Declaration

- ☑ Idea brainstorming (gate structure design)
- ☑ Book content summarization
- ☑ Narrative script writing
- ☑ Image generation (illustrations, portraits)
- ☑ Presentation design assistance
