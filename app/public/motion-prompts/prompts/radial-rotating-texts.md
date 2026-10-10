# Radial Rotating Text Layout
## Goal
Build a full-screen black editorial page where **60 uppercase text labels are arranged around one enormous circle** (a ring far bigger than the viewport, so only a curved slice of it is ever visible). Each label is rotated to sit tangent to the circle. **Scrolling an extremely tall page slowly rotates the entire ring** with a springy elastic follow. A **custom trailing cursor box** (a 3:4 portrait frame) eases behind the real pointer, and **hovering any label reveals that label's preview image inside the cursor box via a bottom-to-top `clip-path` polygon wipe**; moving off wipes it back out through the top. The star effect is the scroll-driven radial rotation combined with the clip-path image reveal that lives inside the trailing cursor.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) — **core only, no plugins**. There is **no ScrollTrigger, no SplitText, no CustomEase, no Lenis, no Three.js**. The scroll rotation is driven by a **plain native `document` `scroll` listener** that feeds `window.scrollY` into a `gsap.to`. All logic runs inside a `DOMContentLoaded` handler. Import as `import gsap from "gsap";`.
## Layout / HTML
```html
<body>
  <div class="cursor"></div>
  <nav>
    <a href="#">Motionprompts <span>/</span> 16 06 2024</a>
    <p>Unlock Source Code with PRO</p>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
