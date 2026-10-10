# Infinite Draggable Image Gallery
## Goal
Build a full-viewport, **infinitely draggable image gallery**: an endless grid of small portrait thumbnails on a pale canvas that you grab and pan in any direction forever (DOM items are virtualized — created/destroyed as they enter/leave a buffered viewport), with a **lerp-smoothed drag and velocity-based momentum** on release. Clicking a thumbnail is the star moment: the tile hides, every other tile fades out, a pale overlay closes in, and a **fixed clone of the image expands from the thumbnail's exact spot to a large centered frame via a single GSAP `fromTo` tween on a custom "hop" ease**, while the project's title **staggers up word-by-word from behind a clip mask** (SplitType). Clicking the expanded image or the overlay reverses everything back into the grid.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`CustomEase`**, and **`split-type`** (npm, default export `SplitType`) for the word splitting. No ScrollTrigger, no Lenis — the page never scrolls (`body { overflow: hidden }`); all motion is a custom `requestAnimationFrame` lerp loop plus GSAP tweens. Ship `index.html`, `styles.css`, an ES-module `script.js`, and a tiny `items.js` data module.
Register and create the custom ease once at startup:
```js
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");
```
`"hop"` = cubic-bezier(0.9, 0, 0.1, 1): a heavy slow-in / slow-out snap used for both the expand and the collapse.
## Layout / HTML
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
