# Infinite Horizontal Scroll
## Goal
Build a full-page, seamlessly looping horizontal scroll experience: a row of 8 editorial panels that scrolls sideways forever in either direction. Vertical mouse-wheel deltas (and horizontal touch drags) are converted into smooth, lerp-eased horizontal movement of a giant flex strip. Cloned copies of the panel sequence on both sides make the loop invisible, and a fixed progress bar plus a percentage counter track the position within one loop (0–100).
## Tech
Vanilla HTML/CSS/JS with an ES module script (`<script type="module" src="./script.js">`). **No GSAP and no external libraries are needed** — the entire effect is a hand-rolled `lerp` + `requestAnimationFrame` loop with native `wheel` / `touch` event listeners. Do not import gsap or lenis.
## Layout / HTML
Everything lives inside a fixed, viewport-sized container that hides overflow:
```
.container                     (fixed wrapper)
├── .progress-bar              (empty div, fixed top bar)
├── .progress-counter          (fixed bottom-right) > h1 with initial text "0"
└── .scroller                  (the horizontal flex strip)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
