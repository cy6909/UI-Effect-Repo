# Image-Grid Assembly Intro → 6× Zoom Hero Reveal
## Goal
Build a **self-playing, full-viewport intro/preloader** for a creative portfolio. On load, **five vertical columns of images assemble themselves from off-screen** — odd columns slide up from below, even columns' tiles drop in from above, each column's tiles cascading in with a slow `power4.inOut` stagger. The moment the grid has locked together, the **entire image grid scales up 6×** (a big zoom-into-the-wall move) while, on the layer above it, the **nav links, a masked hero title, a slide counter and a strip of footer thumbnails all slide up into their clip-path frames**, and two small **"+" icons pop from scale 0 → 1**. It is one continuous GSAP timeline that plays exactly once on page load. The star effect is the **staggered multi-column grid assembly followed by the synchronized 6× grid zoom + masked content reveal**.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) **only** — no GSAP plugins, no ScrollTrigger, no smooth-scroll library, no scroll/hover/click interaction at all. The whole thing is a single load-triggered `gsap.timeline()`. Import:
```js
import gsap from "gsap";
```
The two "+" glyphs in the hero are rendered with the **Ionicons** web component (`<ion-icon name="add-sharp">`) — see **Icons** below for the exact version and where to get it. If you'd rather not add Ionicons, substitute any inline element containing a "+" mark — the animation only needs an element it can scale; just keep the same selectors/initial `scale(0)`.
## Layout / HTML
Two stacked full-viewport layers. The **image grid** is a `position: fixed` background layer; the **content** (nav / hero / footer) sits above it at `z-index: 2`.
```html
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
