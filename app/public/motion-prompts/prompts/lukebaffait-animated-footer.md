# Scroll-Revealed ASCII Footer

## Goal
Build a long-scroll page whose **fixed, full-viewport footer is revealed from behind the page** as you reach the bottom. The star effect is the reveal choreography that fires when the footer scrolls into view: the giant two-word heading (`Blank` / `Canvas`) **slides its letters up from a masked baseline, staggered from the center outward**; the footer nav links and paragraph **un-mask line by line**; and two big **hand images slide in from the left and right edges**. Those hands are not shown as photos — each is **rasterized live into orange ASCII art on a `<canvas>`**, and hovering the hands **lights up random clusters of characters** in bright orange while a lerped **mouse-parallax** drifts and scales both hands. Smooth scroll via Lenis.

## Tech
Vanilla HTML/CSS/JS with ES module imports (`<script type="module">`). Use `gsap` (npm) plus the GSAP plugins **`ScrollTrigger`** and **`SplitText`**, and **`lenis`** for smooth scroll. Register once: `gsap.registerPlugin(ScrollTrigger, SplitText)`. No framework. Runs in a fresh Vite project. The ASCII rendering, hover highlight, and parallax are all **hand-written Canvas 2D + `requestAnimationFrame`** — GSAP only drives the reveal/hide of the heading, lines, and the hands' slide-in offset.

## Layout / HTML
Three full-height opaque spacer sections, then a **spacer `div.footer-revealer`** (this is the ScrollTrigger target — it does not render anything itself), then the fixed `<footer>`:

```html
<section class="one"><h1>One</h1></section>
<section class="two"><h1>Two</h1></section>
<section class="three"><h1>Three</h1></section>

<div class="footer-revealer"></div>

<footer>
  <div class="footer-images">
    <div class="footer-hand-img">
      <img class="ascii-hand" src="/images/hand-left.jpg" alt="" />
    </div>
    <div class="footer-hand-img">
      <img class="ascii-hand" src="/images/hand-right.jpg" alt="" />
    </div>
  </div>

  <div class="footer-content">
    <nav class="footer-links">
      <a href="#">Work</a>
      <a href="#">About</a>
      <a href="#">Journal</a>
      <a href="#">Contact</a>
    </nav>
    <div class="footer-text">
      <p>A multidisciplinary studio working across direction, design and
         motion. We build considered digital experiences for brands that
         care about the details.</p>
    </div>
  </div>

  <div class="footer-header">
    <h1>Blank</h1>
    <h1>Canvas</h1>
  </div>
</footer>

<script type="module" src="./script.js"></script>
```

Classes the JS/CSS depend on: `.footer-revealer` (scroll trigger), `.footer-images`, `.footer-hand-img` (the two wrappers that get the parallax/slide transform), `img.ascii-hand` (each hidden source image + injected `<canvas>` sibling), `.footer-content`, `.footer-links a`, `.footer-text p` (line-split), `.footer-header h1` (char-split). The two `<canvas>` elements are **created in JS** and appended into each `.footer-hand-img`.

## Styling

**Font** — Google Fonts `Instrument Sans` (italic + weight 400..700). `body { font-family: "Instrument Sans" }`. Global reset `* { margin:0; padding:0; box-sizing:border-box }`.

**Color tokens**
- Section bg `#1b1b1b`, section text `#ff6a00` (orange).
- Footer bg `#0f0f0f` (near-black), footer text `#fff`.
- ASCII base char color `#803500` (dark burnt orange), hover highlight fill `#ff6a00` (bright orange), highlighted char color `#0f0f0f`.

**Sections** — `position: relative; z-index: 1; width: 100%; height: 100svh; background: #1b1b1b; color: #ff6a00; padding: 2rem; display: flex; justify-content: center; align-items: center; overflow: hidden`. `section h1 { font-size: clamp(2rem,5vw,8rem); font-weight: 500; letter-spacing: -2% }`. The `z-index:1` + opaque bg is what makes the sections **cover the fixed footer** while scrolling.

**.footer-revealer** — `position: relative; width: 100%; height: 100svh`. A transparent full-height spacer; scrolling it into view exposes the fixed footer sitting behind it.

**footer** — `position: fixed; top: 0; left: 0; width: 100%; height: 100svh; background: #0f0f0f; overflow: hidden; z-index: 0`. Fixed and behind everything; revealed as the sections/revealer scroll past.

**.footer-images** — `position: absolute; inset: 0; display: flex; justify-content: space-between; align-items: center` (pins one hand to each edge).

**.footer-hand-img** — `position: relative; width: 40%; min-width: 200px; will-change: transform`. This is the element JS transforms every frame.
- `.footer-hand-img img { display: block; width: 100%; opacity: 0 }` — the source photo is **never visible**; it only feeds pixels to the canvas and defines the wrapper's height.
- `.footer-hand-img canvas { position: absolute; inset: 0; width: 100%; height: 100% }` — the ASCII output, overlaid on the (invisible) img.

**.footer-content** — `position: absolute; top: 0; left: 0; width: 100%; padding: 2rem; display: flex; justify-content: space-between; gap: 2rem; color: #fff`.
- `.footer-links { display: flex; flex-direction: column; gap: 0.25rem }`, `.footer-links a { color: #fff; text-decoration: none; font-size: 1.1rem }`.
- `.footer-text { max-width: 28rem }`, `.footer-text p { font-size: 1.1rem; line-height: 1.4 }`.

**.footer-header** — `position: absolute; bottom: 0; left: 0; width: 100%; padding: 2rem; display: flex; justify-content: space-between; align-items: flex-end; color: #fff`.
- `.footer-header h1 { font-size: clamp(5rem,15vw,15rem); font-weight: 500; line-height: 1; letter-spacing: -2%; overflow: hidden }`. The `overflow: hidden` is the **mask** the char slide-up plays inside.

**Responsive** `@media (max-width:1000px)`: `.footer-content { flex-direction: column }`; `.footer-text { max-width: 100% }`; `.footer-header h1 { font-size: 3rem }`.

## The effect (be exhaustive)

### 1. Lenis smooth scroll wiring
```
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 2. Split the text (initial hidden states)
- **Heading chars.** `SplitText.create` each `.footer-header h1` with `{ type: "chars", charsClass: "char" }`; collect all `.chars`. Then `gsap.set(chars, { position: "relative", yPercent: 125 })` — every letter starts pushed **125% below** its line, clipped by the `h1`'s `overflow:hidden`.
- **Content lines.** `SplitText.create` each `.footer-links a` and `.footer-text p` with `{ type: "lines", mask: "lines", linesClass: "line" }` (the `mask:"lines"` wraps each line in its own overflow-hidden clip). Collect all `.lines`, then `gsap.set(lines, { yPercent: 100 })` — each line starts one full line-height **below** its mask.

### 3. ASCII canvas rendering (per hand)
Exact constants:
```
ASCII_CHARS   = "........:::=+xX#0369"   // 20-glyph ramp: 8 dots, then :::=+xX#0369
FONT_SIZE     = 18       // px, monospace
CELL_SIZE     = 20       // px per grid cell (canvas-logical)
ASCII_COLUMNS = 80       // fixed grid width in cells
DPR           = 2        // fixed device-pixel-ratio multiplier
CHAR_COLOR      = "#803500"
HOVER_COLOR     = "#ff6a00"
HOVER_CHAR_COLOR= "#0f0f0f"
backgroundCharIndex = ASCII_CHARS.lastIndexOf(".")   // = 7
```

**Sampling → cells.** For each hand image:
- `rows = Math.round(ASCII_COLUMNS / (naturalWidth / naturalHeight))` (square 1:1 sources → 80 rows).
- Draw the image into an offscreen canvas sized `ASCII_COLUMNS × rows` (**one pixel per cell**, extreme downscale), read `getImageData(0,0,ASCII_COLUMNS,rows).data`.
- For every `col,row`, perceptual brightness of that pixel: `(R*0.299 + G*0.587 + B*0.114) / 255`. Char index = `Math.min(ASCII_CHARS.length-1, Math.floor((1 - brightness) * ASCII_CHARS.length))` — note **inverted** brightness, so dark pixels map to the dense end of the ramp and bright pixels to dots.
- **Skip** any cell whose `charIndex <= backgroundCharIndex` (7): the near-white background of the source is discarded, only the darker hand renders. Store surviving cells in a `Map` keyed `"col,row"` → `{ col, row, char: ASCII_CHARS[charIndex], highlightEndTime: 0 }`.

**Canvas setup.** Append a `<canvas>` into the hand wrapper. `canvas.width = ASCII_COLUMNS*CELL_SIZE*DPR` (3200), `canvas.height = rows*CELL_SIZE*DPR`. `ctx.setTransform(DPR,0,0,DPR,0,0)`. `ctx.font = "18px monospace"`, `textAlign:"center"`, `textBaseline:"alphabetic"`. Compute a vertical baseline offset from `measureText("X")` so glyphs sit centered in their cell: `baselineOffset = CELL_SIZE/2 + glyphHeight/2 - actualBoundingBoxDescent` where `glyphHeight = actualBoundingBoxAscent + actualBoundingBoxDescent`.

**Render loop (`requestAnimationFrame`, per hand, forever).** Clear the canvas. For each cell: `x = col*CELL_SIZE`, `y = row*CELL_SIZE`. If `highlightEndTime > Date.now()` → fill a `CELL_SIZE×CELL_SIZE` `HOVER_COLOR` rect at `(x,y)` and draw the char in `HOVER_CHAR_COLOR`; otherwise draw the char in `CHAR_COLOR`. Draw at `(x + CELL_SIZE/2, y + baselineOffset)`.

Start each hand once its image is decoded (`img.complete && img.naturalWidth ? start() : img.addEventListener("load", start)`).

### 4. Hover cluster highlight (mousemove → random walk)
Constants: `HOVER_RADIUS = 8` (cells), `CLUSTER_SIZE = 10`, `HIGHLIGHT_LIFETIME = 300` (ms).
On `window` `mousemove`, for each hand: map the cursor into grid space via the canvas `getBoundingClientRect()` (`mouseCol = (clientX-rect.left)/rect.width * ASCII_COLUMNS`, `mouseRow = (clientY-rect.top)/rect.height * rows`), find the nearest surviving cell by Euclidean distance. If that distance `<= HOVER_RADIUS`, ignite a cluster:
- Seed cell: `highlightEndTime = now + HIGHLIGHT_LIFETIME`.
- Take a **random-length walk** of `steps = floor(random()*CLUSTER_SIZE)+1` (1..10). At each step, gather the up-to-8 neighbours (dx,dy ∈ {-1,0,1}, excluding self and already-lit), pick one at random, set its `highlightEndTime = now + HIGHLIGHT_LIFETIME + step*10` (each hop lingers slightly longer), advance to it. Stop early if no unlit neighbour exists.

Net feel: sweeping the cursor over a hand paints short branching streaks of bright-orange lit glyphs that fade out ~300 ms later.

### 5. Mouse parallax (lerped, per-hand, `requestAnimationFrame`)
Constants: `PARALLAX_STRENGTH = 20`, `PARALLAX_EASE = 0.05`, `parallaxScale = 1 + (PARALLAX_STRENGTH*2)/200` (= **1.2**).
- `reveal = { left: -125, right: 125 }` — the two hands' slide-in offset **in %** (GSAP animates these; see §6).
- On `window` `mousemove`, set a `pointer` target from the footer's rect: `pointer.x = ((clientX-rect.left)/rect.width - 0.5) * PARALLAX_STRENGTH*2` (range ≈ ±20px), same for `pointer.y`.
- A rAF loop eases a `drift` toward `pointer`: `drift.x += (pointer.x - drift.x) * PARALLAX_EASE` (0.05), same for y.
- Each frame, for wrapper `i` (0 = left hand, 1 = right hand): `direction = i===0 ? 1 : -1`, `revealX = i===0 ? reveal.left : reveal.right`, `x = drift.x * direction`, `y = -drift.y`. Write `wrapper.style.transform = translate(calc(${x}px + ${revealX}%), ${y}px) scale(1.2)`. So the two hands drift in **opposite** horizontal directions with the mouse, share an inverted vertical drift, sit at 1.2× scale, and their `revealX` (`±125% → 0`) is what slides them on/off screen.

### 6. The reveal — ScrollTrigger callbacks (the star)
No scrub, no pin — two plain ScrollTriggers on `.footer-revealer` fire the in/out timelines via callbacks:
```
ScrollTrigger.create({ trigger: ".footer-revealer", start: "top 50%", onEnter: animateIn });
ScrollTrigger.create({ trigger: ".footer-revealer", start: "top 85%", onLeaveBack: animateOut });
```

**`animateIn`** (all fired together, all `overwrite: true`):
- `gsap.to(reveal, { left: 0, right: 0, duration: 1, ease: "power3.out" })` — hands slide in from `±125%` to flush at the edges (the parallax loop reads `reveal` live).
- `gsap.to(headingChars, { yPercent: 0, duration: 1, ease: "power3.out", stagger: { each: 0.04, from: "center" } })` — letters rise from the masked baseline, rippling out from the **center** of each word.
- `gsap.to(contentLines, { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.08 })` — nav links + paragraph lines un-mask upward in sequence.

**`animateOut`** (mirror, faster, `power2.in`, all `overwrite: true`):
- `gsap.to(reveal, { left: -125, right: 125, duration: 0.4, ease: "power2.in" })`.
- `gsap.to(headingChars, { yPercent: 125, duration: 0.4, ease: "power2.in", stagger: { each: 0.01, from: "center" } })`.
- `gsap.to(contentLines, { yPercent: 100, duration: 0.4, ease: "power2.in", stagger: 0.02 })`.

So scrolling down past the revealer's `top 50%` plays the full reveal; scrolling back up through `top 85%` snaps it all back out (hands off-screen, letters/lines re-masked).

## Assets / images
- **2 distinct hand photographs, square 1:1** (source ~1440×1440), one per edge — not a single mirrored image. Both are the same bare human hand shot in **grayscale on a near-white, softly-graded pale-grey studio background**, the hand rendered in **light-to-mid greys** (skin, no jewelry) with the darkest values in the finger creases, knuckles and cast shadow. The two poses differ:
  - **`hand-left.jpg` (left edge)** — back of an open hand seen from above, filling the upper-right of the frame, the four fingers extended roughly **horizontally toward the right** with the thumb angling down; wrist exits the left side.
  - **`hand-right.jpg` (right edge)** — the same hand viewed nearly **edge-on / in profile**, a slim horizontal sliver of fingers pointing **left** with the thumb dropping below, wrist exiting the right side; more empty background than the left image.
- Both are loaded but rendered fully transparent (`opacity:0`) — each exists only as a **brightness source** the script rasterizes into the orange ASCII canvas, so the load-bearing property is the contrast between the light/mid-grey hand and the brighter background (the background samples out to dots and is discarded, leaving only the hand as characters). No brand imagery; any neutral grayscale hand-on-light-background pair works — one hand reaching in from the left, a second from the right.

## Behavior notes
- The reveal is **callback-triggered, not scrubbed** — it plays as a fixed-duration timeline once the threshold is crossed, and reverses on leave-back; re-entering replays it.
- The ASCII render loops, hover highlight, and parallax run **continuously** from load (no reduced-motion guard in the original). The hover/parallax read from `window` mousemove, so they are pointer-only; on touch the hands still render and slide in but sit static.
- `DPR` is hard-coded to 2 (not `devicePixelRatio`) and the grid is a fixed 80 columns, so the ASCII resolution is constant regardless of screen; the CSS scales the canvas to fit the wrapper.
- The three opaque full-height sections + the transparent revealer are what sell the "footer emerges from behind the page" illusion, combined with the hands sliding in and the heading/lines un-masking.

## Images

This component ships with 2 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/lukebaffait-animated-footer/hand-left.jpg
https://motionprompts.dev/c/lukebaffait-animated-footer/hand-right.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--ink-deep`, `--orange`, `--paper`, `--muted`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a page-level module, not a component in the React sense: `mount(config)` reaches across the whole document for `footer`, the two `.footer-hand-img` wrappers, every `.footer-header h1`, `.footer-links a` and `.footer-text p`, wires a single shared `Lenis` instance and two plain `ScrollTrigger.create` callbacks, and hangs two independent `requestAnimationFrame` loops — the per-hand ASCII renderer and the parallax drift — plus two `window` `mousemove` listeners off nothing but closures. Unusually for this catalogue, the author already isolated all of that behind a `mount()`/`destroy()` pair, built for their own knob-tweaking editor runtime (`window.MP`) rather than for React, so the shape of the port is narrower than most — but every one of those page-wide reaches still needs to become instance-scoped before it's safe to mount twice.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Call `mount()` a second time without running the `destroy()` the first call returned, and you get two `Lenis` instances both ticking off the same `gsap.ticker`, two `ScrollTrigger`s watching the same `.footer-revealer`, an ASCII render loop per hand per mount racing to clear and redraw the same `<canvas>` — or, worse, four canvases stacked into the same two wrappers if the lookups aren't yet scoped — and two `mousemove` listeners each igniting their own hover clusters and driving their own drift target. The visible symptom is doubled ASCII flicker and a reveal that stutters or seems to re-trigger, and none of it shows up in a production build, because only development double-invokes effects. Treat `destroy()` as part of the effect, not an afterthought bolted on once it already works.

*(1) The entry point* — The boot at the bottom of the file checks `document.readyState` before subscribing to `DOMContentLoaded`; that guard is dead weight once `useEffect` is doing the waiting, so delete the whole `if (window.MP...) {...} else {...}` block along with it. What's left is unusually portable: `mount(config)` is already a synchronous function that sets everything up and hands back a synchronous `destroy`, so the effect body is closer to `const destroy = mount({ ...DEFAULTS }); return destroy;` than a rewrite from flat top-level statements into a callback.

*(2) Element lookups* — `mount` looks up `footer`, `.footer-revealer`, every `img.ascii-hand`, `.footer-hand-img`, `.footer-header h1`, and `.footer-links a, .footer-text p` with bare `document.querySelector`/`querySelectorAll`. Scope every one of those to a root ref on the outermost element this component renders — during the StrictMode remount two copies of the footer subtree exist for an instant, and an unscoped `document.querySelector("footer")` will happily bind the one that's on its way out.

*(3) Cleanup* — Wrap the body of `mount` — both `SplitText.create` calls and their `gsap.set` starting state, the two `ScrollTrigger.create` calls, and `animateIn`/`animateOut` — inside a `gsap.context` scoped to the root ref, and revert it in the cleanup instead of hand-rolling the teardown `destroy()` currently does with `gsap.killTweensOf`, `trigger.kill(true)`, and `split.revert()`. One `ctx.revert()` now covers all three. Three things in this file are not tweens or triggers and are not covered by that revert; they still need the manual handling `destroy()` already gives them — the ticker subscription, the two rAF loop families, and the two `mousemove` listeners — covered below.

### `reveal` is a plain-object tween, and it still belongs inside the context

`animateIn`/`animateOut` tween `reveal.left`/`reveal.right`, a plain `{ left, right }` object with no DOM node behind it — the two `.footer-hand-img` wrappers only find out about it because `renderParallax` reads those two numbers every frame and writes them into `wrapper.style.transform`. Because it isn't a DOM tween it's tempting to hoist it out as "just data," but leave the `gsap.to(reveal, ...)` calls exactly where they are, running synchronously inside the context factory alongside the `SplitText`-driven tweens. An un-reverted tween on `reveal` surviving a StrictMode unmount will keep writing values that the *next* mount's `renderParallax` loop reads as if they were its own, and the hands will drift toward the previous mount's slide position instead of the new one's.

### Keep the already-scrolled guard — it already solves half of the StrictMode problem

Before creating the two `ScrollTrigger`s, `mount` checks whether `.footer-revealer`'s bounding rect already sits above the same threshold `start: "top 50%"` uses, and if so sets `reveal`, `headingChars`, and `contentLines` straight to their open state instead of waiting on `onEnter`. That branch was written for the config-editor's re-mount, but it happens to solve the StrictMode case too: `ScrollTrigger.create` only calls `onEnter` on a live crossing, so a second mount that starts already scrolled past the trigger would otherwise leave the hands off-screen and the heading/lines masked with no future scroll event left to reveal them. Keep this check ahead of both `ScrollTrigger.create` calls once it moves inside the `gsap.context` factory, unchanged.

### The ticker line is the exact case the ticker-and-context rule describes

`gsap.ticker.add(tickerRaf)` is how this component drives Lenis's own `raf` — there is no separate `requestAnimationFrame` call feeding it. `gsap.context` records tweens and triggers, not ticker subscriptions, so reverting the context leaves `tickerRaf` still firing on every global tick, calling `lenis.raf()` on the `Lenis` instance the same cleanup is about to destroy. Keep the `tickerRaf` reference exactly as `destroy()` already does, call `gsap.ticker.remove(tickerRaf)` before `lenis.destroy()`, and keep that pair together — reverting the context does nothing for either of them.

### Two independent rAF families, each with its own listener

`setupHand`'s `render` loop and the shared `renderParallax` loop have separate lifetimes: there are as many hand-render loops as there are `img.ascii-hand` elements that have finished decoding — normally two, each started independently whenever its own `load` fires — plus exactly one `renderParallax` loop reading `reveal.left`/`reveal.right` for both hands at once. They're driven by two different `mousemove` listeners, too: `onHoverMove` feeds the per-hand cluster highlight the render loops draw, `onParallaxMove` feeds the drift target the parallax loop eases toward. `destroy()` already tracks the per-hand handles in `stopLoops` and the parallax handle in `parallaxFrame`, and removes both listeners; keep that shape rather than collapsing it into a single cancel, since a hand that finishes decoding late starts its loop after the others and needs its own handle to be found and cancelled independently.

### SplitText: chars for the heading, masked lines for the nav and paragraph

`.footer-header h1` splits into `chars` (the pieces that rise from the masked baseline, rippling outward from the middle of each word), while `.footer-links a` and `.footer-text p` split into `lines` with `mask: "lines"` — each line gets its own clipping wrapper, which is what lets a line slide up from below without the rest of the paragraph shifting underneath it. Revert both splits inside the same `gsap.context` cleanup, and after the tweens that reference their output, not before — reverting first would delete the very chars and lines `animateIn`/`animateOut` still target. Neither split currently waits on `document.fonts.ready`, so a cold load can split against the fallback face before Instrument Sans swaps in and the line breaks land in the wrong places; that risk predates the port, but it's worth closing at the same time, guarding the deferred split against a StrictMode unmount landing before the font promise resolves.
