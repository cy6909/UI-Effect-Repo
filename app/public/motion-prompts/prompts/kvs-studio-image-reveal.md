# Studio Scroll-Powered Image Reveal — clip-path wipe with ASCII dissolve band
## Goal
Build a pinned, full-viewport **stack of five images** that is scrubbed through by scrolling. As you scroll, the top image's `clip-path` **wipes upward** (its top edge slides down) to uncover the next image below it, one image at a time — four transitions total. The star effect: riding exactly on the moving wipe edge is a **band of orange ASCII glyphs** (a fixed 16px grid of random characters) that **dithers/dissolves** the boundary — a dense scatter of flickering monospace characters that fades out above and below the edge with a probabilistic density falloff, so the hard clip line reads as a granular, disintegrating transition. Everything is driven by a single pinned `ScrollTrigger` with `scrub`, synced to Lenis smooth scrolling.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and **`lenis`** for smooth scroll. Register the plugin with `gsap.registerPlugin(ScrollTrigger)`. There is **no** SplitText / CustomEase / Three.js here — the dissolve is a hand-built DOM grid of `<div>` cells whose visibility is toggled every frame from the ScrollTrigger `onUpdate` callback. No GSAP tweens/timelines are used at all; all motion comes from `scrub` progress driving direct `style` writes.
Lenis wiring (exact):
```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
