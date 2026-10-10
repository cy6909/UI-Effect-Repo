# Infinite Column Wall — endless vertical belts that ratchet open into a corridor
## Goal
Build a scroll page whose middle section is sticky and filled with six columns of photographs. Each column is an endless belt scrolling vertically on its own clock — column 1 up, column 2 down, column 3 up — that never stops and is not attached to the scroll at all; the top and bottom edges dissolve into the background instead of being cut off. As the user scrolls through the section, three things happen: the background darkens to near-black, a headline that was living *behind* the grid turns lime, and the columns slide apart as two rigid blocks of three until only one column is left peeking in from each edge. Scrolling back up rewinds the colour but **not** the opening: the corridor stays open.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. Register with `gsap.registerPlugin(ScrollTrigger)`.
Lenis wiring (exact pattern — the belts run on GSAP's ticker and the scroll-driven parts run off ScrollTrigger; give Lenis its own rAF loop and the two clocks drift a frame apart and the whole wall judders):
- `const lenis = new Lenis()` (default options).
- `lenis.on("scroll", ScrollTrigger.update)`.
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`.
- `gsap.ticker.lagSmoothing(0)`.
## Layout / HTML
Three sections in order:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
