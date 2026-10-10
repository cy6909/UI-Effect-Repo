# Work-List Hover — Pastel Panel Flip + Tilted Preview Reveal
## Goal
Build a full-viewport, dark **"just went live" work list**: an intro line, three big project rows separated by hairlines, and a pill CTA. The star effect is a **whole-panel hover flip**: hovering any row (a) flips the entire `#141414` panel to that row's **pastel background** and inverts all the text/CTA from white to dark navy, (b) slides a **tilted diagonal strip of three half-transparent GIF preview cards** (sitting behind the text) to a new top/left position so the card matching the hovered project glides center-stage and rotates a touch further, and (c) reveals a round arrow-pill on the hovered row where the arrow does a **conveyor swap** — the resting arrow exits right while a fresh arrow slides in from the left. Everything is CSS `transition` driven; JS only toggles a class and writes two inline overlay offsets.
## Tech
Vanilla HTML/CSS/JS, shipped as `index.html` + `styles.css` + an ES-module `script.js` (`<script type="module" src="./script.js">`). **No GSAP, no npm dependencies, no smooth scroll.** All motion is pure **CSS `transition`**; JS only adds/removes classes and sets `overlay.style.top` / `overlay.style.left`. Arrow glyphs use the **Phosphor Icons web font**, served from your own origin: link the bold weight in `<head>` (`<link rel="stylesheet" href="/vendor/phosphor/bold/style.css" />`), then write `<i class="ph-bold ph-arrow-right">`. Get the file with `npm i @phosphor-icons/web@2.1.2` and copy `node_modules/@phosphor-icons/web/src/bold/` (a `style.css` plus its `.woff2`) into your public directory; do **not** use the package's own `index.js`, which injects the stylesheets from `cdn.jsdelivr.net`. Any right-arrow icon font or inline SVG is an acceptable substitute.
## Layout / HTML
Class/ID names are load-bearing — the CSS and JS query them.
```html
<div class="container">
  <div class="work">
    <div class="overlay">
      <div class="prev" id="prev-1"><img src="prev-1.gif" alt="" /></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
