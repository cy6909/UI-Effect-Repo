# Explode Text On Scroll (Matter.js physics)
## Goal
Build a scroll-driven text effect: a full-screen pinned paragraph starts invisible (text is the same color as the background), its words progressively light up in red as you scroll, then the highlighted keywords turn white — and at 60% of the pinned scroll they **shatter into individual characters that fall and bounce on the floor with real Matter.js physics**. Scrolling back up reverses everything and re-assembles the text.
## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite-style npm imports). Use:
- `gsap` (npm) plus the GSAP plugin `ScrollTrigger` (register it with `gsap.registerPlugin(ScrollTrigger)`).
- `lenis` (npm) for smooth scroll.
- `split-type` (npm, the `SplitType` class) to split the paragraph into words.
- `matter-js` (npm) for the physics simulation (use `Engine`, `Runner`, `World`, `Bodies`, `Body`, `Events`).
No images and no canvas rendering — Matter.js runs headless and drives DOM spans via CSS transforms.
Wire Lenis into GSAP the standard way:
- `lenis.on("scroll", ScrollTrigger.update)`
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
