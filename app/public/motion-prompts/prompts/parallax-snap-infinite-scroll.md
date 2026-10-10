# Infinite Vertical Project List — Lerp-Smoothed Scroll, Recycled Slides, Per-Image Parallax, Cubic Snap
## Goal
Build a **full-viewport, endlessly looping vertical project gallery**. Each "slide" is a 100vw × 100vh split screen — one half is a project title (name + catalog number), the other half is a full-bleed image — and the halves **alternate sides** down the list. Wheel and touch scrolling drive a `translateY` on every slide through a **lerp inside a `requestAnimationFrame` loop**, so nothing jumps: the whole column glides and settles with inertia-like smoothness. Three details sell it: (1) the list is **infinite in both directions** — slides are procedurally created around the viewport and recycled out of a `Map`, so you can scroll forever; (2) each slide's image gets an **independent parallax offset** (it drifts against the scroll at a 0.2 ratio, with its own secondary lerp); and (3) when scrolling **stops**, the list eases with a **cubic ease-out** to snap the nearest slide perfectly into the frame.
## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP and no animation libraries are needed** — the entire engine is a hand-rolled `requestAnimationFrame` loop with linear interpolation (lerp) plus a manual cubic-ease snap. No smooth-scroll library either: the page itself never scrolls (`body { overflow: hidden }`); the wheel is hijacked to drive the slides. Everything runs on plain DOM `style.transform` writes.
## Layout / HTML
The static HTML is almost empty — the JS builds every slide by cloning a hidden template.
```
.container
  ul.project-list
    .project.template  (style="display:none" — the clone source)
      .side
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
