# Voltlites Scroll Animation — Pinned Hero Zoom-Out Reveal
## Goal
Build a full-screen dark hero that is **pinned for four viewport heights** while a giant **3×3 spotlight image grid** (300% of the viewport, 300svh tall) **zooms out** from the center. As you scroll: the whole grid scales `1 → 0.5` while every image **counter-zooms** `1.25 → 1` (so the images stay full-bleed inside their cells as the grid shrinks); a **fixed brand logo** shrinks from a huge `6×` (`2×` on mobile) down to `1×` and **travels from the bottom-left corner up toward the top**; a small **footer tagline blurs and fades away** early; and a centered **SplitText headline reveals word-by-word** followed by a CTA button, each fading in as you scroll. When the next section reaches the viewport, a second scrubbed trigger **slides the whole hero up 25% under a darkening black overlay** as an exit parallax. All of it is driven by **manual `lerp` + `mapRange` math inside `onUpdate`** (not scrub tweens), with Lenis smooth scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`ScrollTrigger`** and **`SplitText`**, and `lenis` (npm) for smooth scroll. No framework — plain Vite-style module imports:
```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
```
Register once: `gsap.registerPlugin(ScrollTrigger, SplitText);`. (SplitText is a now-free GSAP plugin.)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
