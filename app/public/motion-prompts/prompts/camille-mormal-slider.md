# Framed-Plate Portrait Slider — Clip-Path Wipe + Image Parallax + CustomEase Odometers
## Goal
Build a one-screen portrait slider that presents each photograph as a **framed plate on a paper wall**, not as a full-bleed background. The page is split into a **naming rail on the left** (series blurb, slide title, sampled ground colour, counter, progress rail, thumbnails) and a **stage on the right** holding the plate itself, surrounded by printer's crop marks.
Navigation is by clicking either half of the plate, by the two rotating `+` marks flanking it, by a thumbnail, or by the arrow keys. On each navigation the incoming photograph is revealed by a **`clip-path` wipe** growing from the edge you came from, its inner `<img>` slides in with a **parallax offset** while the outgoing image pushes off the opposite side. In sync, three **vertically sliding odometers** (slide title, ground hex, counter), a **progress fill**, an **accent-colour change across the whole page**, and the **±90° rotation of the two `+` marks** all move on a shared CustomEase curve called `"hop"`. No scroll, no autoplay.
### The decision that makes this component
The obvious build for a photo slider is `width:100vw; height:100vh; object-fit:cover` with the type floated on top and a scrim to keep it legible. **Do not build that here.** It is the reason most photo sliders look cheap: a viewport is never the aspect ratio of the picture, so every frame gets cropped differently, a portrait and a landscape in the same deck stop reading as one series, and the type has to fight whatever happens to be under it that second.
Instead:
- The photograph lives in a **plate of fixed ratio** (10:7, the ratio of the source files) sized so it always fits one screen. Every frame crops identically, so a set of pictures reads as a set.
- **All type lives beside the plate, never on it.** No scrim, no text-shadow, no dark gradient over the artwork. Contrast is solved by layout instead of by veiling the picture.
- **Colour is the only thing that changes per slide.** A single `--accent`, sampled from the actual seamless-paper backdrop of the current photograph, drives the swatch, the ground hex line, the progress fill, the active thumbnail rule and the nav underline. Nothing else in the palette moves. The rest of the page is one warm bone paper and one near-black ink.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm) plus the single GSAP plugin **`CustomEase`** (`import { CustomEase } from "gsap/CustomEase"`). No other libraries — no ScrollTrigger, no Lenis, no carousel library. Everything runs inside a `DOMContentLoaded` listener; call `gsap.registerPlugin(CustomEase)` first.
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
