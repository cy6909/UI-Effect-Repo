# Fullscreen Click-Driven Product Carousel — Center Clip-Path Reveal + Box-to-Viewport Grow + Zoom + Per-Character Title Roll
## Goal
Build a fullscreen (100vw × 100vh) editorial product carousel that advances **on every click anywhere on the page**. Each click reveals the next product image inside a small centered box whose `clip-path` opens from a single center point, and that box then **grows to fill the whole viewport** to become the new active slide — while the outgoing active image simultaneously **zooms to scale 2**. In sync, the current product name **rolls up and out one character at a time** (per-letter stagger) as the next name rises into place from below. Everything is driven by plain `gsap.to`/`gsap.set` with `power3.out` eases and animated `clipPath` polygons — no ScrollTrigger, no plugins.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use only **`gsap` (npm)** — `import gsap from "gsap"`. **No GSAP plugins** (no ScrollTrigger, no SplitText — the character split is done by hand), no Lenis, no Three.js. All code runs at module top level (the initial reveal fires immediately on load; the rest is inside a single `document` `click` listener).
## Layout / HTML
```
nav                              ← fixed top bar, 3 flex columns (each flex:1)
  .logo   > a         "Echo Node"           (fictional brand name)
  .links  > a×4       "Home," "Products," "Info," "Contact,"
  .shop   > a×3       "Search" "Account" "Cart"
.copy                            ← absolute, vertically centered band
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
