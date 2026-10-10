# Pixelated Block Reveal Scroll
## Goal
Build a scroll-driven, full-bleed page where two editorial photo sections are each masked by a chunky grid of solid-color squares ("pixels"). As each photo section scrolls up through the viewport, the grid at its **top edge dissolves block-by-block in a randomized wave to reveal the photo**, and as the section scrolls away, a second grid at its **bottom edge builds up block-by-block to cover the photo** with the next section's color. The block colors are chosen so the transitions are seamless between the solid-color divider sections and the photos — a pixelated dissolve/build page transition, entirely scrubbed by scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm)** with the **`ScrollTrigger`** plugin only — no Lenis, no other plugins, no framework.
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```
Everything runs inside a `DOMContentLoaded` listener; call `gsap.registerPlugin(ScrollTrigger)` first. There are **no tweens and no timeline** — the whole effect is a set of `ScrollTrigger.create()` instances whose `onUpdate` writes each block's opacity imperatively from `self.progress`. Native scroll (no smooth-scroll library).
## Layout / HTML
A single `.container` wrapping **five stacked sections** in this exact order:
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
