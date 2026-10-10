# Giant Stretching Text Scroll Animation
## Goal
Build a scroll-driven typographic page: a sequence of full-screen pinned sections where a single giant uppercase word vertically stretches open (scaleY from 0 to the exact scale that fills the viewport) as the section scrolls into view, then collapses back to 0 while pinned. The final section instead blows the whole word block up 10x, cross-fades its dark backdrop away to reveal a full-bleed background photo, and finishes with a headline that reveals word-by-word via SplitText.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) with the GSAP plugins `ScrollTrigger` and `SplitText`, plus `lenis` for smooth scrolling. No build framework needed beyond a Vite-style dev server that resolves npm imports.
## Layout / HTML
Five stacked `<section>` elements, each `100vw` x `100svh`:
1. `<section class="hero">` — `<h1>This space intentionally loud</h1>`
2. `<section class="sticky-text-1">` — `<div class="text-container"><h1>Overdrive</h1></div>`
3. `<section class="sticky-text-2">` — `<div class="text-container"><h1>Static</h1></div>`
4. `<section class="sticky-text-3">` — three children, in this order:
   - `<div class="bg-img"><img src="..." alt=""></div>` (the background photo)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
