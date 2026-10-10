# Sticky Title Bar over Scrolling Logo List — Gap-Spread + Scale Scroll Animation
## Goal
Build a single-page editorial scroll experience. A **fixed wordmark** reading "Barrett & Hale", **centered on both axes of the viewport**, is painted with `mix-blend-mode: difference` so it inverts against everything scrolling behind it: near-black over the light client index, near-white over the dark full-bleed stills. As each row of a long client-logo list crosses the wordmark's band, the row's two logos **spread apart and then snap back together** (animated flex `gap`, driven by scrub ScrollTriggers). At the end of the page a very tall black footer section scrolls in; while it does, the wordmark **drifts downward** toward the bottom and **grows into a full-width title card**. Two effects carry the piece: the inversion, and the scrubbed flex-`gap` spread as rows pass through the wordmark.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin **`ScrollTrigger`**. No smooth-scroll library (native browser scroll). No SplitText, no CustomEase, no Three.js, no canvas. Entry: `<script type="module" src="./script.js">`, `import gsap from "gsap"` and `import { ScrollTrigger } from "gsap/ScrollTrigger"`, then `gsap.registerPlugin(ScrollTrigger)` inside a `DOMContentLoaded` handler.
## Layout / HTML
Single `.container` wrapping, in order:
1. `.sticky-bar` — a boxless wrapper (`display: contents`) holding **two identical `.wordmark-layer` divs**. Each layer contains one `p.wordmark` with three spans: `span.wordmark-word` "Barrett", `span.wordmark-amp` "&", `span.wordmark-word` "Hale".
   - `.wordmark-layer--invert` is the blended layer; it hides its ampersand.
   - `.wordmark-layer--accent` is `aria-hidden`, hides its two words, and shows only the ampersand.
   - Duplicating the whole wordmark (rather than positioning a lone ampersand) is what keeps the accent glyph pixel-aligned with the gap left for it: same markup, same font metrics, same box.
2. `section.hero` — one full-bleed `<img>` (hero image).
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
