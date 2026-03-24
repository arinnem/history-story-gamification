# S04: Polish + Submission

**Goal:** Make the app production-ready for contest submission — responsive polish, animation refinement, GitHub Pages deployment, video walkthrough recording, and AI usage documentation.
**Demo:** The app is live on GitHub Pages. A 2–5 minute video walkthrough shows the complete 5-gate journey. The registration form is filled with all required information including AI tool declarations.

## Must-Haves

- Fully responsive layout verified on mobile (375px) and desktop (1440px)
- All animations smooth at 60fps (no jank on card flips, badge reveals, puzzle interactions)
- Deployed and accessible via GitHub Pages URL
- Screen-recording video of the full walkthrough (2–5 min)
- Contest registration form answers prepared
- Completion screen after Gate 5 with summary of the journey

## Verification

- Open the GitHub Pages URL on desktop → full 5-gate journey works
- Open the GitHub Pages URL on mobile (or DevTools mobile view) → layout adapts, all interactions work with touch
- Video walkthrough exists, is 2–5 minutes, shows all 5 gates with puzzle solving
- All animations run at 60fps (no visible frame drops)
- A "Hoàn thành!" (Complete!) celebration screen appears after Gate 5 with total stats

## Tasks

- [ ] **T01: Responsive design audit and mobile optimization** `est:1h`
  - Why: Contest judges may view on phone — broken mobile layout would lose points
  - Files: `styles/main.css`, `styles/gate.css`, `styles/puzzle.css`
  - Do:
    1. Test every screen at 375px width (iPhone SE), 390px (iPhone 14), and 768px (iPad)
    2. Fix map layout for mobile: stack vertically or use a scrollable horizontal map
    3. Fix gate view for mobile: single-column story layout, full-width images
    4. Fix puzzle components for mobile: ensure touch interaction works (no hover-dependent UI)
    5. Fix card gallery for mobile: 2-column grid instead of multi-column
    6. Fix card flip animation for mobile: ensure 3D perspective works on mobile browsers
    7. Add touch event handlers alongside click for puzzle interactions
    8. Test all 5 gates on mobile viewport — every puzzle type must be solvable with touch
  - Verify: Open in DevTools mobile view (375px) → navigate map → complete a gate → gallery works. No horizontal scroll, no overflow, no tiny text.
  - Done when: All screens and interactions work at 375px width with touch, no layout breaks

- [ ] **T02: Animation polish and performance optimization** `est:45m`
  - Why: Smooth animations make the app feel premium — janky transitions make it feel amateur
  - Files: `styles/main.css`, `styles/gate.css`, `js/badge-reveal.js`, `js/card-reveal.js`
  - Do:
    1. Use `will-change` CSS property on animated elements to promote to GPU layers
    2. Ensure all transitions use `transform` and `opacity` only (not `width`, `height`, `top`, `left`)
    3. Add a completion celebration screen after Gate 5:
       - Full-screen overlay with "🎉 Hoàn thành! Chúc mừng bạn!" title
       - Stats summary: "5/5 cổng · 6/6 thẻ nhân vật · 5/5 huy hiệu"
       - Display all collected character cards in a horizontal row
       - Display all badges earned
       - "Khám phá lại" (Explore again) button to restart
       - "Về Trang Chính" (Back to Main) button
    4. Smooth page transitions between map → gate view → map (fade or slide)
    5. Add subtle parallax on story section backgrounds (optional, remove if causes jank)
    6. Test at 60fps using Chrome DevTools Performance tab
  - Verify: Record Performance profile in DevTools during a gate playthrough — no frames above 16.7ms. Completion screen appears after Gate 5 with correct stats.
  - Done when: All animations smooth, completion screen works, no jank visible during gameplay

- [ ] **T03: Deploy to GitHub Pages** `est:30m`
  - Why: The contest requires submitting a URL — GitHub Pages provides free, reliable hosting
  - Files: `.gitignore`, `README.md`
  - Do:
    1. Initialize git repository if not already done
    2. Create `.gitignore` (exclude `.gsd/`, `node_modules/`, `.agent/`, temp files)
    3. Write a `README.md` with:
       - Project title and description in Vietnamese
       - Source book credit
       - AI tools used
       - How to run locally (just open index.html)
       - Contest information
    4. Commit all files
    5. Push to GitHub
    6. Enable GitHub Pages from the main branch (Settings → Pages → Deploy from main)
    7. Verify the live URL works
  - Verify: GitHub Pages URL loads the app correctly, all images load, all interactions work on the live deployment.
  - Done when: App is live on `https://<username>.github.io/history-story-gamification/` and fully functional

- [ ] **T04: Record video walkthrough** `est:30m`
  - Why: The contest accepts video submissions — a walkthrough demonstrates the full experience to judges who may not interact with the web app directly
  - Files: (output: video file)
  - Do:
    1. Reset all progress in the app
    2. Use browser recording tool to capture the full screen
    3. Record the journey:
       - Open the app, show the map with 5 gates
       - Open the card gallery (show empty state)
       - Enter Gate 1, read through the story (scroll slowly)
       - Solve the puzzle, watch the card reveal and badge celebration
       - Return to map, show Gate 2 unlocked
       - Speed through Gates 2–5 (show each puzzle type briefly)
       - Show the completion screen with all stats
       - Open the gallery showing all 6 cards and 5 badges
    4. Keep the video between 2–5 minutes
    5. Add background music if appropriate (royalty-free Vietnamese instrumental)
    6. No voiceover needed (the app UI speaks for itself) — but add text captions explaining the book reference
  - Verify: Video file exists, is 2–5 minutes long, shows the complete journey with all 5 gates.
  - Done when: Video walkthrough recorded, showing complete journey, appropriate length

- [ ] **T05: Prepare contest registration form answers** `est:15m`
  - Why: The registration form requires specific information about the entry
  - Files: (output: document or notes)
  - Do:
    1. Prepare answers for each field:
       - Tên bài dự thi: "Con Đường Điện Biên — Hành Trình Gamification Điện Biên Phủ"
       - Tên sách: "Kể chuyện Điện Biên Phủ" — NXB Kim Đồng
       - Của tác giả: Hoa Ban (văn) & Huy Toàn (minh họa)
       - Hình thức thể hiện: ☑ Bài trình chiếu kể chuyện số
       - Nội dung tóm tắt (100–200 từ): Draft the summary in Vietnamese
       - Thông điệp muốn truyền tải: Draft the message
       - Công cụ AI: Gemini (image generation, content assistance), ChatGPT (narrative drafting)
       - Mức độ sử dụng AI: Check all appropriate boxes
    2. Draft the 100–200 word summary emphasizing:
       - Creative retelling through gamification
       - Educational value (historical facts + interactive puzzles)
       - Book-based storytelling (faithful to "Kể chuyện Điện Biên Phủ")
       - AI as support tool, not replacement for human creativity
  - Verify: All form fields have prepared answers. Summary is 100–200 words in Vietnamese.
  - Done when: Registration form answers documented and ready to transcribe

## Files Likely Touched

- `styles/main.css` (responsive fixes, animation polish)
- `styles/gate.css` (responsive fixes)
- `styles/puzzle.css` (mobile touch fixes)
- `js/badge-reveal.js` (completion screen)
- `js/card-reveal.js` (animation optimization)
- `js/game-engine.js` (completion detection)
- `.gitignore` (new)
- `README.md` (new)
