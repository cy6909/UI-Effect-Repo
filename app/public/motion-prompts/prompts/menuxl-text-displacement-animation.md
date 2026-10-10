# Text Displacement Cursor Repel (letters & words flee the cursor)
## Goal
Build a full-viewport dark typographic page where **two giant headings and a justified paragraph are split into individual letters (headings) and words (paragraph), and every fragment is elastically pushed away from the mouse cursor: any fragment whose original center lies within a 150px radius of the cursor gets a displacement force pointing radially away from the mouse, scaling linearly up to 300px at zero distance, and every fragment eases toward its target each frame with per-element lerp smoothing (factor 0.1), so text bulges away from the cursor and springs softly back to place when the mouse leaves**. The star effect is this smooth repel-and-settle displacement field over live text.
## Tech
Vanilla HTML/CSS/JS with an ES module script (`<script type="module" src="./script.js">`). **No GSAP, no plugins, no Lenis, no libraries at all** — the entire effect is manual DOM text splitting, one `mousemove` listener, per-element linear interpolation (lerp), and an infinite `requestAnimationFrame` loop writing inline CSS `transform: translate(x, y)`. There is no scroll interaction.
## Layout / HTML
```
div.container                      (full-viewport flex stage)
  h1.anime-header                  "one subscription"
  p.anime-text                     (long justified paragraph, see text below)
  h1.anime-header                  "endless web design"
```
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
