# Arc Coverflow Image Slider — infinite cosine-arc carousel
## Goal
Build a full-viewport **infinite horizontal image slider** whose 9 slides are laid out along a
**cosine arc** (a coverflow / carousel curve). The slide nearest the horizontal center is the
largest and is **lifted up**; slides to either side **shrink** and **sink down along the arc** the
farther they sit from center. Mouse wheel and touch-drag feed a scroll target that is
**lerp-smoothed every animation frame**; the slides recycle with a modular wrap so the row loops
**forever in both directions**. A single caption pinned near the bottom always shows the title of
the slide currently closest to center. The star of the piece is the per-frame arc-layout engine —
there is no GSAP timeline, no ScrollTrigger, just `gsap.set` called on every `requestAnimationFrame`.
## Tech
Vanilla HTML / CSS / JS with an ES module entry (`<script type="module" src="./script.js">`),
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
