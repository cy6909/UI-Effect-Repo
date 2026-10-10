# Gooey Blur Text Reveal — SplitText Lines Sharpening Under an Alpha-Threshold SVG Filter
## Goal
Build a long editorial page (hero → banner photo → two paragraphs → banner → five-line index → banner → paragraph → banner → outro) where every heading and paragraph **materialises line by line out of a soft blob**. Each line is wrapped in an inner span that starts at a **large blur (0.35em)** and animates to sharp; the outer line carries an **SVG `feColorMatrix` alpha-threshold filter**, which hardens the blurred alpha into a solid, gooey mass — so instead of a fade the letters *pool* into shape, like ink. Three trigger modes per block: **on load** (with delay), **once on scroll** (enter the viewport), and **scrubbed** (tied to scroll between two points). Banner photos settle from a slight zoom as they pass. GSAP SplitText + ScrollTrigger, Lenis smooth scroll.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm) with **`SplitText`** and **`ScrollTrigger`**, plus **`lenis`**. Fonts: **Anton** (headings), **DM Sans** (base).
## Layout / HTML
```html
<div class="gb">
  <svg class="gb-filter" aria-hidden="true"><defs>
    <filter id="gb-goo" x="-50%" y="-50%" width="200%" height="200%">
      <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" />
    </filter>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
