# Full-Screen Work Carousel — Fly-Off Exit + Clip-Path Entry + SplitText Reveals
## Goal
Build a full-screen, scroll-hijacked work/portfolio carousel (one slide visible at a time). On wheel or touch swipe, the current slide shrinks, rotates and flies off screen while the next slide enters from the opposite edge inside an animated `clip-path` polygon that expands to full screen; then the slide's title words and every text line (description, tags, index, link) reveal upward through SplitText masks with staggered power4 eases.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `SplitText` (`import { SplitText } from "gsap/SplitText"`). No other libraries. Do NOT register ScrollTrigger — scrolling is fully hijacked with native `wheel`/`touch` listeners.
## Data
Create a `slides.js` module that default-exports an array of 4 slide objects, each with:
- `slideTitle` (string, e.g. "Second Skin", "Half Light", "Sharp Shoulder", "Under Veil")
- `slideDescription` (one sentence, ~20 words, editorial tone about the project)
- `slideUrl` (e.g. `/work/second-skin`)
- `slideTags` (array of 4 short tags, e.g. `["Leather", "Studio", "Still life", "AW25"]`)
- `slideImg` (path to the slide's full-bleed image)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
