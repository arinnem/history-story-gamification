# Project

## What This Is

A gamified web storytelling experience about the Battle of Điện Biên Phủ (1954) for the "Cùng AI kể chuyện" contest. Users progress through 5 gates, solving puzzles to earn badges, collect character cards of historical figures, and unlock hidden historical facts. Based on "Kể chuyện Điện Biên Phủ" (NXB Kim Đồng).

## Core Value

A complete, working 5-gate interactive journey that a contest judge can open in a browser, play through, and be impressed by — combining historical accuracy with engaging gamification.

## Current State

Greenfield. Plan written, no code yet.

## Architecture / Key Patterns

- Single-page-app pattern using vanilla HTML/CSS/JS (no frameworks)
- localStorage for state persistence
- Data-driven gate rendering (all content in data.js, single renderer builds each gate)
- CSS animations for card flips, badge reveals, gate unlocks
- Visual style: blend of vintage war-map (parchment, earth tones) and modern editorial (bold typography, vibrant accents) anchored on the Điện Biên Phủ topographic map
- Hosted on GitHub Pages

## Capability Contract

See `.gsd/REQUIREMENTS.md`

## Milestone Sequence

- [ ] M001: Contest-Ready Web App — full 5-gate experience with puzzles, cards, badges, images, and video submission
