# Converging Card Stack — six scattered photos gather into one pile on scroll
## Goal
Build a scroll page whose middle section is sticky. Inside it, six square photo cards start scattered across the viewport at authored offsets and rotations, and as the user scrolls through the section they all converge on the *same* point and land unrotated — so the section ends with what looks like a single photograph, a neat pile. A headline sits above the cards, legible the whole way through, and the pile closes underneath it. The scroll link is a **lagged scrub**: let go of the wheel and the cards keep travelling for about a second, and scrolling back up finds them still bunched together, behind where the scroll actually is.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. Register with `gsap.registerPlugin(ScrollTrigger)`.
Lenis wiring (exact pattern — Lenis must run on GSAP's ticker, not its own rAF, or the smooth scroll and the timeline advance a frame apart and the convergence shimmers):
- `const lenis = new Lenis()` (default options).
- `lenis.on("scroll", ScrollTrigger.update)`.
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- `gsap.ticker.lagSmoothing(0)`.
## Layout / HTML
Three sections in order:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
