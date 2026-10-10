# 3D Gallery Showcase — Pinned Scroll Spotlight

## Goal

Build a full-page scroll experience whose centerpiece is a pinned "spotlight" section: 20 images fly out of deep 3D space toward the viewer and scatter past the camera with a staggered perspective effect while an intro headline dissolves word-by-word, an outro headline reveals word-by-word, and a final full-screen cover image zooms into frame — all scrubbed by scroll across 15 viewport heights.

## Tech

Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm), plus the GSAP plugins `ScrollTrigger` and `SplitText`, and `lenis` for smooth scroll. Register plugins with `gsap.registerPlugin(ScrollTrigger, SplitText)`.

Wire Lenis to GSAP the standard way:

- `const lenis = new Lenis()`
- `lenis.on("scroll", ScrollTrigger.update)`
- `gsap.ticker.add((time) => lenis.raf(time * 1000))`
- `gsap.ticker.lagSmoothing(0)`

## Layout / HTML

Three stacked full-viewport sections:

1. `<section class="intro">` — a single `<h1>Visions That Move Beyond the Surface</h1>`.
2. `<section class="spotlight">` containing, in this order:
   - `<div class="spotlight-images">` with exactly **20** children, each `<div class="img"><img src="..." alt=""></div>`.
   - `<div class="spotlight-cover-img"><img src="..." alt=""></div>` — the final cover image.
   - `<div class="spotlight-intro-header"><h1>When Motion and Stillness Collide in Layers</h1></div>`
   - `<div class="spotlight-outro-header"><h1>What Follows Is Not Stillness but Reverberation</h1></div>`
3. `<section class="outro">` — a single `<h1>The Future Begins Where This Moment Ends</h1>`.

## Styling

- CSS variables: `--light: #d7dbd2` (pale sage off-white), `--dark: #0f0f0f` (near black).
- Font: "Instrument Serif" from Google Fonts (regular + italic styles imported; only regular is used). `body { font-family: "Instrument Serif", sans-serif; }`
- Global reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`
- All `img`: `width: 100%; height: 100%; object-fit: cover;`
- All `h1`: `font-size: 5rem; font-weight: 500; letter-spacing: -0.1rem; line-height: 0.9;`
- Every `section`: `position: relative; width: 100vw; height: 100svh; padding: 2rem; overflow: hidden;`
- `.intro`, `.outro`: flex, centered both axes, background `var(--light)`, color `var(--dark)`. Their `h1` is `width: 50%; text-align: center;`
- `.spotlight`: background `var(--dark)`, color `var(--light)`.
- `.spotlight-images` and `.spotlight-cover-img`: `position: absolute; top: 0; left: 0; width: 100%; height: 100%; transform-style: preserve-3d; perspective: 2000px;` — the perspective on these containers is what makes the z-translation of children read as 3D depth.
- `.img`: `position: absolute; top: 50%; left: 50%; transform: translate3d(-50%, -50%, -1000px); width: 500px; height: 350px; will-change: transform;` — every tile starts stacked dead-center, pushed 1000px away from the camera.
- `.spotlight-cover-img`: also `will-change: transform`.
- `.spotlight-intro-header`, `.spotlight-outro-header`: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; width: 50%;`. Intro header `z-index: 1`, outro header `z-index: 2`.
- `@media (max-width: 1000px)`: the intro/outro `h1` and both spotlight headers go to `width: 100%`, and the two spotlight headers get `padding: 2rem`.

## GSAP effect (exhaustive)

Everything runs inside an `initSpotlightAnimations()` function called once on `DOMContentLoaded` and re-called on every `window` `resize` (recomputes screen-size-dependent positions; re-splits the headers; kills all existing ScrollTriggers via `ScrollTrigger.getAll().forEach(t => t.kill())` before creating a new one).

### Hard-coded scatter directions

Each of the 20 image tiles has its own scatter direction vector (multipliers of screen width/height), in DOM order:

```
{x: 1.3, y: 0.7},  {x: -1.5, y: 1.0},  {x: 1.1, y: -1.3}, {x: -1.7, y: -0.8},
{x: 0.8, y: 1.5},  {x: -1.0, y: -1.4}, {x: 1.6, y: 0.3},  {x: -0.7, y: 1.7},
{x: 1.2, y: -1.6}, {x: -1.4, y: 0.9},  {x: 1.8, y: -0.5}, {x: -1.1, y: -1.8},
{x: 0.9, y: 1.8},  {x: -1.9, y: 0.4},  {x: 1.0, y: -1.9}, {x: -0.8, y: 1.9},
{x: 1.7, y: -1.0}, {x: -1.3, y: -1.2}, {x: 0.7, y: 2.0},  {x: 1.25, y: -0.2}
```

### Setup (per init)

- `isMobile = window.innerWidth < 1000`; `scatterMultiplier = isMobile ? 2.5 : 0.5`.
- Start position for every tile: `{ x: 0, y: 0, z: -1000, scale: 0 }` — applied with `gsap.set` on each `.img`.
- End position per tile: `{ x: dir.x * innerWidth * scatterMultiplier, y: dir.y * innerHeight * scatterMultiplier, z: 2000, scale: 1 }`.
- Cover image initial state via `gsap.set`: `{ x: 0, y: 0, z: -1000, scale: 0 }`.
- Intro header `h1`: `SplitText.create(el, { type: "words" })`, then `gsap.set(split.words, { opacity: 1 })`.
- Outro header `h1`: `SplitText.create(el, { type: "words" })`, then `gsap.set(split.words, { opacity: 0 })` and `gsap.set(h1, { opacity: 1 })`.

### The ScrollTrigger

One single `ScrollTrigger.create`:

- `trigger: ".spotlight"`, `start: "top top"`, `end: "+=" + window.innerHeight * 15 + "px"` (15 viewport heights of scroll), `pin: true`, `pinSpacing: true`, `scrub: 1`.
- **No tweens/timeline** — the whole effect is computed manually in `onUpdate(self)` from `self.progress` (0→1) using `gsap.set` + `gsap.utils.interpolate`.

### onUpdate — image scatter (progress 0 → ~0.82)

For each image `index` 0–19:

- `staggerDelay = index * 0.03` (tiles start one after another).
- `imageProgress = Math.max(0, (progress - staggerDelay) * 4)` — each tile's local progress ramps 4× faster than scroll progress and is **not clamped at 1**, so tiles deliberately overshoot their end values and fly far past the camera.
- `scaleMultiplier = isMobile ? 4 : 2`.
- Then set via `gsap.set(img, ...)`:
  - `z = interpolate(-1000, 2000, imageProgress)` — from deep behind the focal plane to well in front of it (and beyond, since unclamped).
  - `scale = interpolate(0, 1, imageProgress * scaleMultiplier)` — i.e. scale grows at 2× (desktop) / 4× (mobile) the tile progress, quickly popping to full size and continuing to grow as the tile passes the camera.
  - `x = interpolate(0, endX, imageProgress)`, `y = interpolate(0, endY, imageProgress)` — the tile drifts outward along its scatter vector while approaching.

Net visual: images bloom from a single vanishing point at screen center, swell, then scatter off in 20 different directions past the viewer's shoulders.

### onUpdate — cover image (progress 0.7 → ~0.95)

- `coverProgress = Math.max(0, (progress - 0.7) * 4)`.
- `z = -1000 + 1000 * coverProgress` (reaches `z: 0` at progress 0.95).
- `scale = Math.min(1, coverProgress * 2)` (clamped — reaches full size at progress ~0.825 and stays).
- `x` and `y` stay 0: the cover zooms straight in and settles filling the frame.

### onUpdate — intro header word-by-word fade OUT (progress 0.6 → 0.75)

- Below progress 0.6: all words `opacity: 1`. Above 0.75: all words `opacity: 0`.
- Inside the window: `introFadeProgress = (progress - 0.6) / 0.15`. For each word `index`: `wordFadeProgress = index / totalWords`, `fadeRange = 0.1`.
  - If `introFadeProgress >= wordFadeProgress + fadeRange` → opacity 0.
  - If `introFadeProgress <= wordFadeProgress` → opacity 1.
  - Otherwise → `opacity = 1 - (introFadeProgress - wordFadeProgress) / fadeRange` (linear per-word fade), all applied with `gsap.set`.
- Result: the headline dissolves left-to-right, one word at a time.

### onUpdate — outro header word-by-word fade IN (progress 0.8 → 0.95)

Mirror of the intro logic: below 0.8 all words `opacity: 0`, above 0.95 all `opacity: 1`. Inside the window, `outroRevealProgress = (progress - 0.8) / 0.15`, same `index / totalWords` threshold and `fadeRange = 0.1`, but opacity ramps `(outroRevealProgress - wordRevealProgress) / fadeRange` from 0 to 1 — the headline materializes word by word over the settled cover image.

## Assets / images

- **20 gallery images**, landscape ~10:7 (tiles render at 500×350px): moody, cinematic editorial portraits — silhouettes, motion blur, close-up faces in dramatic colored light (greens, oranges, blues, black-and-white). Variety in tone keeps the scatter visually rich.
- **1 cover image**, full-viewport (it fills the screen at the end): a bold sunlit editorial portrait with strong color that works as a hero backdrop for the final headline.

## Behavior notes

- The whole page scrolls with Lenis inertia; the spotlight section stays pinned for 15 viewport heights while everything scrubs (`scrub: 1` gives a ~1s catch-up lag).
- On resize the animation fully re-initializes: positions are recomputed from the new viewport, headers are re-split, and all ScrollTriggers are killed and recreated.
- Mobile (< 1000px): scatter distance multiplier jumps from 0.5 to 2.5 and scale ramp from 2× to 4×, so tiles clear the smaller screen just as decisively; headers span full width.
- No hover/click interactions — the entire effect is scroll-driven.

## Images

This component ships with 21 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/img_1.jpg
https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/img_10.jpg
https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/img_11.jpg
https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/img_12.jpg
https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/img_13.jpg
https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/img_14.jpg
… 15 more under https://motionprompts.dev/c/kaitonote-3d-gallery-showcase-scroll-animation/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--paper`, `--muted`, `--accent`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.

## Adapting this to React

Everything above describes a standalone document: one script that waits for `DOMContentLoaded`, reaches into the page with `document.querySelectorAll(".img")` and its siblings, and never has to undo itself — until the browser's own `resize` event asks it to run the whole thing again. React withdraws all three guarantees at once, and it does it quietly: the twenty tiles bloom out of the vanishing point once, look right, and then a route change or a StrictMode remount misbehaves in a way that doesn't point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. This component is unusually exposed to that, because it already has a "tear everything down and rebuild it" code path baked in: `initSpotlightAnimations` runs once on load and again on every `resize`. A StrictMode double-mount is not a new failure mode here — it's the same rebuild firing at the wrong moment. Two `Lenis` instances pulling on the same wheel event, two pins on `.spotlight` disagreeing about the same fifteen-viewport-height scrub, two `SplitText` passes nesting the intro/outro `h1` one level deeper than the last: all three are indistinguishable from what a broken resize handler would already produce, which makes the mount bug easy to file as a resize bug. Treat "run again from a live component" (resize) and "run again from a fresh mount" (StrictMode) as the same problem, solved once.

*(1) The entry point.* By the time a React component mounts, `DOMContentLoaded` has already fired, so the listener is dead weight. Delete it and move its body — the `Lenis`/`gsap.ticker` wiring, the first call to `initSpotlightAnimations`, and the `resize` listener that calls it again — directly inside a `useEffect` with an empty dependency array. Do not keep `initSpotlightAnimations` as a plain function hoisted above the effect: it has to run more than once per mount, so it belongs as a closure created fresh inside the effect, over that effect's `ref` and locals only.

*(2) Element lookups.* Every lookup here — the twenty `.img` tiles, `.spotlight-cover-img`, `.spotlight-intro-header h1`, `.spotlight-outro-header h1`, and `.spotlight` itself, which doubles as the `ScrollTrigger` trigger — assumes the component owns the document. Put a `ref` on the wrapper around the three sections and scope every one of those lookups to it, including the trigger: pass the resolved element (`root.current.querySelector(".spotlight")`), not the string `".spotlight"`. During the StrictMode remount two copies of this subtree exist for an instant, and a string selector or an unscoped query binds to whichever copy is on its way out.

*(3) Cleanup, and the resize-driven rebuild.* Wrap the effect in a `gsap.context` scoped to the root ref. The part specific to this component: `initSpotlightAnimations` is not a one-shot setup, it is a rebuild routine the script itself invokes a second time from `resize`, and every call creates a fresh `ScrollTrigger` and re-splits both headers. The vanilla version clears the board with `ScrollTrigger.getAll().forEach(t => t.kill())` — global and indiscriminate, harmless only because the demo page has nothing else running on it. Inside a React tree that line kills every `ScrollTrigger` any sibling component owns, not only this one's. Give the rebuild routine to the context under a name and call it back from `resize` the way a deferred handler is meant to be called:

```jsx
const ctx = gsap.context((self) => {
  const rebuild = () => {
    priorTrigger?.kill();
    priorIntroSplit?.revert();
    priorOutroSplit?.revert();
    // recompute the scatter start/end positions for the 20 `.img` tiles and the cover image,
    // gsap.set them, SplitText.create both headers again, then:
    // priorTrigger = ScrollTrigger.create({ trigger: root.current.querySelector(".spotlight"), ... });
  };
  rebuild();
  self.add("rebuild", rebuild);
}, root);

const onResize = () => ctx.rebuild();
window.addEventListener("resize", onResize);
```

Killing only `priorTrigger` and reverting only `priorIntroSplit`/`priorOutroSplit`, instead of the global sweep, is what makes this safe next to other GSAP-driven components on the same page. It also closes a defect the vanilla script already carries and a naive port would otherwise reproduce: `SplitText.create` runs again on every `resize` without ever reverting the previous split, so the intro and outro headers get split, then split again on top of their own word spans. `self.add("rebuild", rebuild)` is the named form, not the one-argument form: this callback is meant to be invoked later, from a listener registered outside the factory, and that is exactly the case the name-and-call-back-in overload exists for.

None of that reaches `gsap.ticker` or the `Lenis` instance, since the context only tracks tweens and triggers, not ticker subscriptions or arbitrary objects. Keep the exact ticker callback in a variable the outer effect closure can see, and tear both down alongside the context revert:

```jsx
return () => {
  window.removeEventListener("resize", onResize);
  gsap.ticker.remove(driveLenis);
  lenis.destroy();
  ctx.revert();
};
```

Skipping `gsap.ticker.remove` here is the one leak that survives everything else: `ctx.revert()` kills the trigger and the styles it wrote, but the ticker keeps calling `lenis.raf` against a `Lenis` instance that `destroy()` has already torn down.

**SplitText.** Both headers split by `type: "words"`, not `"lines"` — word boundaries come from whitespace in the text content, not from where the browser wraps a line, so the usual "split after fonts are ready or the boundaries land in the wrong place" caution does not bite here the way it would for a line-based split elsewhere in this catalogue. What does matter for this component specifically is the double-split described above: revert `introHeaderSplit` and `outroHeaderSplit` before the next `SplitText.create` on the same `h1`, on every rebuild — not only in the final unmount cleanup — since the `resize` handler can fire many times within one mount and nothing else undoes the previous split between calls.

**Lenis.** This component creates and owns the only `Lenis` instance on the page, which is correct for the standalone demo. If you are dropping this section into an app that already runs Lenis elsewhere, the note above this one already covers the fight two instances produce: skip the `new Lenis()` call here and drive this section's `ScrollTrigger` off the app's existing instance instead, keeping the single `lenis.on("scroll", ScrollTrigger.update)` subscription at the app shell.
