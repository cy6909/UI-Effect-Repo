# FameEstate Scroll Animation — Pinned Clip-Path Hero Reveal
## Goal
Build a full-screen luxury real-estate hero that is **pinned and scrubbed over seven viewport heights** while a single GSAP timeline plays a cinematic reveal, then hands off to a plain `about` section. In order, as you scroll: the full-bleed background image **zooms out** (scale 1.5 → 1); a mustard-gold panel (the "revealer") **opens from a hair-thin vertical seam at screen center** — first growing top-to-bottom, then wiping outward left-and-right to fill the screen; three full-bleed images **cascade in one after another** from a collapsed center point, each expanding via clip-path while scaling 0 → 1; a gold **outro panel with a heading scales in**, then **splits down the middle into two halves that slide apart** (left half off-screen left, right half off-screen right) to uncover the `about` section beneath. Smooth scroll via Lenis. The whole hero is one scrubbed ScrollTrigger timeline.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**, and `lenis` (npm) for smooth scroll. No other plugins, no framework — plain Vite-style module imports:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(ScrollTrigger);`. Run everything inside `document.addEventListener("DOMContentLoaded", …)`.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
