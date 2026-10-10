# Larevoltosa Scroll Animation — Pinned "Zoom Into The Glasses" Spotlight
## Goal
Build a three-section scroll page whose middle **`.spotlight` section pins and, over three viewport-heights of scrubbed scroll, a giant inline SVG doodle character zooms up toward its glasses**. As it zooms, three things happen inside the two lens shapes: **white glare bands sweep across each lens**, a **full-bleed photo fades in clipped to the lens silhouettes**, and a **word-by-word headline reveals** in the centre. Everything is driven by a single pinned `ScrollTrigger` (`scrub: true`) reading `self.progress`, with Lenis smooth scroll. The lenses and their glare/photo layers are **generated at runtime** by cloning shapes out of the doodle SVG into `clipPath`s.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`ScrollTrigger`** and **`SplitText`**, and **`lenis`** for smooth scroll. Register with `gsap.registerPlugin(ScrollTrigger, SplitText)`. The big character is an inline SVG string imported from a local module `./doodle.js` that exports `doodleSVG`. **`./doodle.js` is a REQUIRED, provided fixture — its full verbatim contents are in the Appendix at the very bottom of this prompt. Create the file exactly from that block; do NOT invent, redraw, or simplify a substitute doodle.** The whole visual payoff — and 100% of the peak-zoom frame — IS this artwork, so a hand-authored blob cannot be faithful; treat `doodle.js` exactly like an image fixture. No framework; runs in a fresh Vite project with `gsap` and `lenis` installed. Wrap all JS in a `DOMContentLoaded` listener.
## Layout / HTML
Three stacked full-viewport `<section>`s:
```html
<section class="intro">
  <h1>Scrolling May Cause Joy</h1>
</section>
<section class="spotlight">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
