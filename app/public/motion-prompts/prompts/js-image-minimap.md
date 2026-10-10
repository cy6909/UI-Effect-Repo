# Sticky Image Minimap — Thumbnail Strip That Glides Through a Fixed Indicator as You Scroll a Tall Gallery
## Goal
Build a **tall, black, editorial vertical image gallery** with a **sticky sidebar minimap** on the left. The gallery column (75% wide) holds ten large stacked photos; the minimap (25% wide) is pinned to the viewport and contains a vertical strip of the same ten photos as small thumbnails. The star effect: as the page scrolls through the gallery, the whole thumbnail strip **slides vertically (translateY)** behind a **fixed bordered indicator box**, so the minimap "plays through" its thumbnails in lockstep with the scroll — the thumbnail currently framed by the indicator matches the large photo you're looking at. The indicator uses `mix-blend-mode: difference` so its outline stays legible over any thumbnail. A second scroll trigger: once you've scrolled past **four viewport heights**, the entire page **inverts from a black theme to a white theme** with a smooth 0.5s color transition.
## Tech
Vanilla HTML/CSS/JS. **No GSAP, no animation library, no smooth-scroll library.** The entire effect is two plain `window` scroll listeners that write `element.style.transform` and toggle a CSS class; all easing/transitions are pure CSS `transition`. Ships as an ES module (`<script type="module" src="./script.js">`) but imports nothing. Everything runs inside a single `DOMContentLoaded` handler.
## Layout / HTML
```
.wrapper                                  (full-page shell; carries the theme class)
  nav                                     (fixed top strip)
    a  "Motionprompts"                    (fictional brand / logo — left)
    a  "Subscribe"                        (right)
  .gallery                                (flex row: minimap | images)
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
