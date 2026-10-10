# Griflan Hover Effect — Elastic Service Rows with Falling Physics Tags
## Goal
Build a dark, full-viewport list of **three stacked "service" rows**, each a single huge uppercase word (`SILHOUETTE`, `CHROMA`, `PERSONA`). On **hover** a row does three things at once: it springs open to more than double its height with a bouncy elastic tween, a **fanned stack of three overlapping images** slides up into view from behind the title, and the title **recolors from red to cream**. Then, 0.2s later, the row's category **tags — pill-shaped labels — drop in from the top under real gravity** (a Matter.js physics simulation), bounce, and settle in a little heap on an invisible floor at the bottom of the row. On **mouseleave** the tags fade out, the images slide back down behind the title, the color returns to red, and the row springs shut. The star effect is the combination of the elastic expand + image-stack reveal + physics-driven tag drop.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) and `matter-js` (npm) — **no GSAP plugins, no smooth-scroll, no Three.js**. GSAP drives the row expand/collapse, the image slide, the color change and the tag opacity; Matter.js runs a per-row rigid-body world that makes the tags fall and pile up. Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">` and `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`. Must run in a fresh Vite + npm project.
## Layout / HTML
```html
<section class="services">
  <div class="service"
       data-tags="Editorial, Fashion Identity, Monochrome, Shadow Play, Minimalism, Studio Portraits">
    <div class="service-name"><h1>Silhouette</h1></div>
    <div class="service-images">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
