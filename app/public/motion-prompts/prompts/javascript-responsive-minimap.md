# Responsive Minimap Image Scrubber (vertical strip on desktop, horizontal on mobile)

## Goal
Build a full-viewport gallery navigator where **a minimap of 15 small thumbnails (a vertical strip on the right on desktop, a horizontal strip near the bottom on mobile) is scrubbed with the mouse wheel / touch drag: a fixed 1px-bordered indicator frame stays put while the thumbnail strip glides underneath it with lerped inertia; whichever thumbnail overlaps the indicator the most is dimmed to 30% opacity and instantly swapped into a large centered preview image. Clicking any thumbnail eases the strip so that thumbnail lands centered inside the indicator, using a slower (softer) lerp**. The star effect is the buttery lerp-driven scrubbing of the strip plus the live preview swap.

## Tech
Vanilla HTML/CSS/JS with an ES module script (`<script type="module" src="./script.js">`). **No GSAP, no plugins, no Lenis, no libraries at all** — the entire effect is a `requestAnimationFrame` loop with manual linear interpolation (lerp) writing `transform: translateX/Y` on the strip, plus `wheel`, `touchstart`/`touchmove`, `click` and `resize` listeners. There is no page scroll — the wheel is hijacked (`preventDefault`) to drive the minimap.

## Layout / HTML
```
.container                          (full-viewport stage)
  nav                               (fixed top bar)
    p  "Motionprompts"
    p  "Menu"
  .site-info
    p  "E427"
    p > span  "Responsive Minimap"
  .img-preview
    img                             (large preview, src = image 1 initially)
  .minimap
    .indicator                      (empty framed box, the fixed "lens")
    .items
      .item > img   × 15            (thumbnails, images 1…15 in order)
```

## Styling
Font: **"Neue Haas Grotesk Display Pro"** on `body` (a neutral grotesque sans; no import needed — system fallback is fine).

- `* { margin:0; padding:0; box-sizing:border-box; }`
- `img { width:100%; height:100%; object-fit:cover; transition: opacity 0.2s; user-select:none; }` — **the `transition: opacity 0.2s` on all images is what makes the active-thumbnail dim fade smoothly.**
- `p { font-size:14px; font-weight:600; -webkit-font-smoothing:antialiased; user-select:none; }`
- `.container`: `position:relative; width:100vw; height:100vh; overflow:hidden; background-color:#f1efe7;` (warm off-white / bone).
- `nav`: `position:fixed; top:0; left:0; width:100vw; padding:1.5em; display:flex; justify-content:space-between; align-items:center;`
- `.site-info`: `position:absolute; top:50%; left:1.5em; display:flex; gap:4px;` — the `span` ("Responsive Minimap") is `color:#9a9994` (muted grey).
- `.img-preview`: `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:50%; height:75%; overflow:hidden;`
- `.img-preview img`: `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:100%; height:100%; object-fit:contain;` — **contain, not cover**, so the whole photo is always visible.
- `.minimap`: `position:absolute; top:50%; right:8em; width:80px;` (note: NO translateY — the strip's top edge starts at the vertical middle of the screen and the strip extends downward from there).
- `.indicator`: `position:absolute; top:0; left:0; width:100%; height:60px; border:1px solid #000; z-index:2;` — a fixed hairline rectangle sitting over the first visible thumbnail slot.
- `.items`: `position:relative; width:100%; height:100%; display:flex; flex-direction:column; gap:0; will-change:transform;`
- `.item`: `width:100%; height:60px; padding:5px; cursor:pointer;` — the 5px padding creates the visual gaps between thumbnails and insets them inside the indicator frame.

### Mobile (`@media (max-width: 900px)`)
- `body` and `.container`: `overflow:hidden; touch-action:none;`
- `.site-info`: `top:1.5em; left:50%; transform:translateX(-50%);` (moves to top-center).
- `.minimap`: `top:auto; right:auto; bottom:5em; left:50%; width:auto; height:80px; touch-action:none;` (note: NO translateX — the strip's left edge starts at the horizontal middle and extends rightward).
- `.indicator`: `width:60px; height:100%;`
- `.items`: `flex-direction:row; width:max-content; height:100%; touch-action:none;`
- `.item`: `width:60px; height:100%; padding:5px;`
- `.img-preview`: `top:45%; width:75%; height:50%;`

## The effect (exhaustive — vanilla JS, lerp + rAF)

### Orientation & dimensions
- `isHorizontal = window.innerWidth <= 900` (mobile = horizontal strip, desktop = vertical strip).
- `updateDimensions()` recomputes and returns:
  - **desktop (vertical):** `itemSize = firstItem.getBoundingClientRect().height` (60), `containerSize = items.getBoundingClientRect().height`, `indicatorSize = indicator.getBoundingClientRect().height` (60).
  - **mobile (horizontal):** `itemSize = firstItem.getBoundingClientRect().width` (60), `containerSize = items.scrollWidth` (**scrollWidth**, because the row overflows), `indicatorSize = indicator.getBoundingClientRect().width` (60).
- `maxTranslate = containerSize - indicatorSize` — the farthest the strip may slide (in the negative direction).

### State
- `currentTranslate = 0` (rendered offset), `targetTranslate = 0` (goal offset), both always clamped to `[-maxTranslate, 0]`.
- `isClickMove = false` — true while a click-initiated glide is in flight (selects the slower lerp factor).
- `currentImageIndex = 0`, `activeItemOpacity = 0.3`.
- `lerp(start, end, factor) = start + (end - start) * factor`.

### rAF loop `animate()` (runs forever)
1. `lerpFactor = isClickMove ? 0.05 : 0.075` — click glides are noticeably slower/softer than wheel scrubs.
2. `currentTranslate = lerp(currentTranslate, targetTranslate, lerpFactor)`.
3. If `Math.abs(currentTranslate - targetTranslate) > 0.01`:
   - write the transform on `.items`: `translateY(${currentTranslate}px)` on desktop, `translateX(${currentTranslate}px)` on mobile;
   - call `getItemInIndicator()` to find the active thumbnail, then `updatePreviewImage(activeIndex)`.
4. Else (settled): `isClickMove = false`. The loop itself never stops — `requestAnimationFrame(animate)` every frame.

### `getItemInIndicator()` — max-overlap picking + dim
1. Reset ALL thumbnail `<img>`s to `opacity = 1`.
2. The indicator's window in strip-space: `indicatorStart = -currentTranslate`, `indicatorEnd = indicatorStart + indicatorSize`.
3. For each item `index`: `itemStart = index * itemSize`, `itemEnd = itemStart + itemSize`; overlap = `max(0, min(indicatorEnd, itemEnd) - max(indicatorStart, itemStart))`. Track the index with the **greatest overlap**.
4. Set that item's `<img>` to `opacity = 0.3` (fades over the CSS 0.2s transition) and return the index.

### `updatePreviewImage(index)`
Only when `index !== currentImageIndex`: store it, read the winning thumbnail's `src` attribute and set it on the big `.img-preview img` — an **instant src swap** (no crossfade).

### Wheel input (desktop scrub)
`container.addEventListener("wheel", handler, { passive: false })`:
- `e.preventDefault()`; `isClickMove = false`.
- `scrollVelocity = clamp(e.deltaY * 0.5, -20, 20)` — half the wheel delta, capped at ±20px per event.
- `targetTranslate = clamp(targetTranslate - scrollVelocity, -maxTranslate, 0)` — scrolling down slides the strip up (negative translate).

### Touch input (mobile only)
- `touchstart`: if `isHorizontal`, record `touchStartY = e.touches[0].clientY`.
- `touchmove` (`{ passive: false }`): if `isHorizontal`, `deltaY = touchStartY - touchY`, then the exact same velocity math as the wheel (`clamp(deltaY * 0.5, -20, 20)` subtracted from `targetTranslate`, clamped to `[-maxTranslate, 0]`); update `touchStartY = touchY` each move and `e.preventDefault()`. Note: a **vertical** finger drag drives the **horizontal** strip.

### Click-to-center
On each `.item` click:
- `isClickMove = true` (slower 0.05 lerp for a gentle glide);
- `targetTranslate = -index * itemSize + (indicatorSize - itemSize) / 2`, then clamp to `[-maxTranslate, 0]` — this parks the clicked thumbnail exactly inside the indicator frame.

### Resize
On `window.resize`: re-run `updateDimensions()` (also refreshes `isHorizontal`), recompute `maxTranslate`, clamp `targetTranslate` to the new range, **snap** `currentTranslate = targetTranslate` (no glide), and immediately write the transform in the correct axis for the new orientation.

### Init (bottom of the module)
1. Dim thumbnail 0: `itemImages[0].style.opacity = 0.3`.
2. `updatePreviewImage(0)` (preview starts on image 1).
3. Start `animate()`.

## Assets / images
**15 portrait editorial photographs, aspect ratio ~3:4** (e.g. 900×1200) — a cohesive fashion/lifestyle series with varied subjects, colors and settings so consecutive thumbnails are clearly distinguishable at 70×50px. Each image plays two roles: minimap thumbnail (cropped by `object-fit: cover` inside its 60px cell) and, when active, the large centered preview (letterboxed by `object-fit: contain`). Name them `img1.jpeg` … `img15.jpeg` and reference each exactly twice: once in its `.item` and (for `img1.jpeg` only) as the initial `.img-preview` src. No real brand names anywhere — use the neutral demo strings from the Layout section.

## Behavior notes
- The page never scrolls: the container fills the viewport, `overflow: hidden`, and the wheel/touch events are captured with `preventDefault` to drive the minimap only.
- Fully responsive at the 900px breakpoint: desktop = vertical strip on the right driven by wheel; mobile = horizontal strip bottom-center driven by vertical touch drags. Resizing across the breakpoint keeps working (dimensions and axis are recomputed).
- The strip only moves between `0` (first item under the indicator) and `-maxTranslate` (last item under the indicator) — it can never scrub past either end.
- No `prefers-reduced-motion` branch. The only "loop" is the always-running rAF lerp; when settled (delta ≤ 0.01) it simply stops writing to the DOM.
- Because indicator and item are the same size (60px), the click-centering term `(indicatorSize - itemSize) / 2` evaluates to 0 — keep the formula anyway so it stays correct if sizes diverge.

## Images

This component ships with 15 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/javascript-responsive-minimap/img1.jpeg
https://motionprompts.dev/c/javascript-responsive-minimap/img10.jpeg
https://motionprompts.dev/c/javascript-responsive-minimap/img11.jpeg
https://motionprompts.dev/c/javascript-responsive-minimap/img12.jpeg
https://motionprompts.dev/c/javascript-responsive-minimap/img13.jpeg
https://motionprompts.dev/c/javascript-responsive-minimap/img14.jpeg
… 9 more under https://motionprompts.dev/c/javascript-responsive-minimap/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--bone`, `--ash`, `--lamp`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two `wheel`/`touchmove` listeners on the same container both fighting over `targetTranslate`, two `animate` loops lerping the same `.items` node toward two different targets. The visible symptom is the strip stuttering or jumping between offsets instead of gliding smoothly, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script checks `document.readyState` before subscribing to `DOMContentLoaded`; that guard exists to survive being loaded late in a plain document, and in React it is dead weight, because `useEffect` already runs after the DOM is committed. Drop the guard and the listener. What is unusual about this component is that the rest of it already ships in the shape an effect wants: `mount(config)` does the setup and hands back a `destroy` that undoes every listener, every inline style, and the rAF loop — that is exactly the `(setup, cleanup)` pair `useEffect` expects. Porting this file is mostly relocation, not reinvention: call `mount` with an object built from props (in place of spreading `DEFAULTS`) at the top of the effect, and `return` the function it gives you as the cleanup, unchanged. Delete only the `window.MP` branch and the `readyState` check that decide *when* to call `mount` in a standalone document — a component calls it every time the effect runs.

*(2) Element lookups* — `.container`, `.items`, `.indicator`, every `.item`, `.item img` and `.img-preview img` are all found with an unscoped `document.querySelector`/`querySelectorAll`. Give the component a root ref on the element that renders `.container` and scope every one of those lookups to it (`root.current.querySelectorAll(...)` in place of the bare `document.querySelectorAll(...)`). This is not cosmetic here: `updateDimensions` reads `itemElements[0].getBoundingClientRect()` to derive `itemSize` and, from it, `stride` and `maxTranslate` for the whole strip. During the StrictMode remount two `.container` subtrees briefly coexist, and an unscoped selector can bind to the copy that is on its way out — the surviving instance then computes its scrub range from a detached node's geometry (frequently zero), and the indicator stops tracking anything until the next resize happens to correct it.

*(3) Cleanup* — `animate()` reschedules itself with `requestAnimationFrame` forever; it already checks an `alive` flag before doing any work, which is the right guard, but `alive` alone does not stop the frame that was already queued when the effect unmounts — that frame still fires once more, so the returned cleanup must also call `cancelAnimationFrame(frame)`, exactly as `destroy` already does, or the browser holds a closure over `currentTranslate`/`targetTranslate` belonging to an instance you meant to discard. Miss either half on the StrictMode double-mount and you get two `animate` loops writing `transform` to the same `.items` element on alternating frames — one still easing toward wherever the first mount's last wheel event left `targetTranslate`, the other starting fresh from zero — which is what a jittering, two-speed strip on first load actually is. The same discipline applies to the five things `mount` wires up beyond the loop: the `wheel` and `touchmove` listeners on `.container` (registered `{ passive: false }` specifically so `preventDefault` can keep suppressing page scroll), `touchstart`, the `resize` listener on `window`, and the fifteen per-`.item` `click` listeners the module already collects into its own `offs` array of unbind thunks — invoke that array from the effect's cleanup rather than re-deriving `removeEventListener` calls by hand, since the closures it captured are the exact ones that were attached.

*(4) State that must not become `useState`* — `currentTranslate`, `targetTranslate`, `isClickMove`, `currentImageIndex` and `dimensions` are written up to once per animation frame or on every `wheel`/`touchmove` event, and the loop's whole job is to push the results straight onto the DOM (`items.style.transform`, each thumbnail `<img>`'s `style.opacity`, the preview `<img>`'s `src` attribute) without ever asking React to re-render. Lifting any of them into `useState` turns a per-frame `style.transform` write into a per-frame component re-render, which is both wasted work and, at the smoothing rates this component runs at, visibly slower than the direct DOM write it replaces. Keep them exactly as the module already does — plain variables closed over by the effect — and reach the elements they touch through the root ref instead of through render output. The `isHorizontal` flag deserves the same treatment for a second reason: it would be natural to track viewport width in state and derive orientation from it, but `updateDimensions` (which recomputes `isHorizontal`) is only ever meant to run from the `resize` listener already inside the effect — mirroring window width into state would re-run the effect on every resize tick and rebuild the loop, all five listeners and the `offs` array on every pixel dragged, instead of leaving the one `resize` handler mount does now to call `updateDimensions` directly.
