# Full-screen Infinite Carousel with Clip-path Wipe Transitions
## Goal
Build a full-screen, infinitely looping image carousel driven by mouse wheel and touch swipes. Every scroll step spawns a brand-new slide and reveals it with a synchronized GSAP timeline: the full-bleed background image wipes in via an animated `clip-path` polygon (from the bottom when scrolling down, from the top when scrolling up) while the outgoing background zooms to 1.5x behind it; simultaneously a centered portrait thumbnail wipes in the opposite vertical direction with an inner-image parallax, and the title, description and slide counter slide out/in through clipped text masks. All tweens share one 1.25s duration and one custom cubic-bezier ease, so the whole transition feels like a single cinematic wipe.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `CustomEase` (`import { CustomEase } from "gsap/CustomEase"` and `gsap.registerPlugin(CustomEase)`). No other libraries — no Lenis, no ScrollTrigger. The page never actually scrolls; wheel/touch events are intercepted and hijacked.
## Layout / HTML
Body contains, in order:
1. `<nav>` — fixed overlay bar at the top:
   - `.logo` with a `<p>` wordmark (e.g. "Motionprompts").
   - `.nav-items` with four `<p>` links: "Work", "Studio", "News", "Contact".
2. `<footer>` — fixed overlay bar at the bottom:
   - a `<p>` reading "All Projects" on the left.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
