# Digital Scramble Hover Effect
## Goal
Build a full-viewport page with a single centered hero image. The star effect: an **invisible grid of tiny fixed cells** is overlaid exactly on top of the image, and each cell secretly holds a random monospace symbol (`O X * > $ W`). As the cursor moves across the image, the cell nearest the pointer — **plus a short random chain of up to 7 of its neighbors** — briefly flips to a solid black tile with a visible white glyph, and a subset of those tiles **scrambles its symbol every 150 ms**. Each activated tile stays lit for ~300 ms then fades back to invisible. The net result is a live **digital-noise / glitch trail** of black glyph-blocks that follows the mouse across the picture, like the image is being "read" pixel-by-pixel.
## Tech
Vanilla HTML/CSS/JS with an ES-module script (`<script type="module" src="./script.js">`). **No GSAP, no Lenis, no libraries, no npm dependencies at all.** The entire effect is hand-rolled with a `mousemove` listener, `Date.now()` timestamps, `setInterval` scramble tickers, and one `requestAnimationFrame` loop that expires lit cells. Do not reach for any tween/animation library — the original is intentionally timer- and class-toggle-driven (the only "animation" is a CSS `opacity` on/off).
## Layout / HTML
Minimal, three fixed elements plus the hero. The grid overlay is **built in JS**, not authored in HTML.
```html
<nav>
  <p>Scramble Hover Effect</p>
  <p>MP01701202025</p>
</nav>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
