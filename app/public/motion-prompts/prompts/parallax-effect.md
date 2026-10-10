# Build: Smooth-Scroll Parallax Image Landing Page

## Goal

A full-screen, multi-section musician landing page where **every image drifts vertically with a soft parallax lag as you scroll**. Each image lives inside an `overflow: hidden` frame and is overscaled, so it slides slowly inside its window while the page moves. The star effect: a **Lenis** smooth-scroll instance feeds a per-image target `translateY` (0.2× the image's scroll offset), and an independent `requestAnimationFrame` loop **lerps** each image toward that target (smoothing factor 0.1), applying `translateY(...) scale(1.5)`. The result is a weighty, buttery parallax where images trail slightly behind the scroll.

## Tech

Vanilla HTML/CSS/JS with ES module imports (Vite/npm project). **No GSAP, no ScrollTrigger** — the only dependency is `lenis` (npm) for smooth scroll. The parallax itself is a hand-rolled `requestAnimationFrame` loop with a manual `lerp()` helper, driven by Lenis's `scroll` event and written via imperative `element.style.transform`.

```js
import Lenis from "lenis";
```

## Layout / HTML

A single `.app` wrapper containing five full-viewport `<section>`s stacked vertically. Every parallaxing image is an `<img class="parallax-image">` placed inside a `<div class="img">` (the overflow-hidden frame).

```html
<div class="app">
  <section class="hero">
    <div class="img"><img class="parallax-image" src="{portrait-1}" alt="" /></div>
    <div class="nav">
      <p>Tour</p><p>Updates</p><p>Contact</p><p>Merch</p>
    </div>
  </section>

  <section class="projects">
    <div class="img"><img class="parallax-image" src="{portrait-2}" alt="" /></div>
    <div class="projects-brief">
      <p>Liam Cartwright's 2023 breakout track "Sundown" climbed the global charts,
         achieved multi-platinum status, and amassed over 1 billion streams in its first year.</p>
    </div>
    <div class="col projects-cover">
      <div class="img"><img class="parallax-image" src="{portrait-3}" alt="" /></div>
    </div>
    <div class="col projects-list">
      <div class="project"><h1>Sunrise</h1><p>Apple Music / Spotify / YouTube</p></div>
      <div class="project"><h1>Echoes Within</h1><p>Apple Music / Spotify / YouTube</p></div>
      <div class="project"><h1>Fading Memories</h1><p>Apple Music / Spotify / YouTube</p></div>
      <div class="project"><h1>Shadow's Edge</h1><p>Apple Music / Spotify / YouTube</p></div>
    </div>
  </section>

  <section class="about">
    <div class="col intro">
      <p>Introduction</p>
      <p>Liam Cartwright's 2023 sensation "Sundown" made waves on global charts,
         achieved multi-platinum accolades, and surpassed 1 billion streams within its debut year.</p>
    </div>
    <div class="col portrait">
      <div class="portrait-container">
        <div class="img"><img class="parallax-image" src="{portrait-4}" alt="" /></div>
      </div>
    </div>
  </section>

  <section class="banner">
    <div class="img"><img class="parallax-image" src="{portrait-5}" alt="" /></div>
    <div class="banner-copy">
      <p>Be the</p>
      <h1>First to know</h1>
      <p>Want to hear the latest news on my upcoming music releases, touring, and merch?</p>
      <button>Join the newsletter</button>
    </div>
  </section>

  <section class="footer">
    <div class="col">
      <p>Instagram / Tiktok / Discord</p>
      <div class="footer-links">
        <p>Menu</p><h1>Tour</h1><h1>Updates</h1><h1>Merch</h1><h1>Contact</h1>
      </div>
      <p>&copy; Designed by Motionprompts</p>
    </div>
    <div class="col">
      <p>Join the newsletter <br /><button>Subscribe</button></p>
      <div class="shop"><div class="img"><img class="parallax-image" src="{portrait-6}" alt="" /></div></div>
      <p>Spotify / Apple Music / Youtube</p>
    </div>
  </section>
</div>

<script type="module" src="./script.js"></script>
```

Key classes the JS depends on: **`.parallax-image`** (every image the loop drives) and **`.img`** (the clipping frame). The JS selects all `.parallax-image` and initializes one closure per image.

## Styling

**Fonts** — **Inter** for body, **Space Grotesk** for every `h1`, **Space Mono** for the small uppercase `p` labels and the buttons.

**Color palette**
```css
:root {
  --bg: #f2f2f2;        /* the page is LIGHT */
  --ink: #16161a;       /* near-black: type on light, and the .about panel */
  --paper: #f2f2f2;     /* type on the dark panels and over photos */
  --paper-dim: rgba(242, 242, 242, 0.62);
  --accent: #ff4e45;    /* one warm red — buttons only */
  --graphite: #2b2b31;  /* the footer, and the well behind every image */
}
```
- The page background is `var(--bg)`; the dark blocks are `.about` (`var(--ink)`) and `.footer` (`var(--graphite)`).
- **Every photograph is greyscaled in CSS** — `filter: grayscale(1) contrast(1.06)` on `img, .parallax-image` — so the only colour in the whole layout is the red of the buttons. This is what lets six unrelated photos hold together while they parallax past each other.

**Reset / global**
- `* { margin:0; padding:0; box-sizing:border-box }`
- `html, body { width:100%; height:100%; background-color: var(--bg); }`
- **`img`** (global): `position:absolute; width:100%; height:100%; object-fit:cover; will-change:transform;`
- **`.img`**: `position:absolute; top:0; left:0; width:100%; height:100%; overflow:hidden; will-change:transform;` — this clip is what hides the overscaled image's drift.
- **`section`**: `position:relative; width:100vw; height:100vh; overflow:hidden;`

**Type**
- `h1`: `color: var(--paper); font-family:"Space Grotesk"; font-size:80px; font-weight:600; letter-spacing:-0.02em; line-height:1;`
- `p`: `text-transform:uppercase; color: var(--paper); font-family:"Space Mono"; font-size:11px; letter-spacing:0.08em; line-height:1.5;`
- `button`: `border:none; outline:none; cursor:pointer; text-transform:uppercase; font-family:"Space Mono"; font-size:11px; font-weight:700; letter-spacing:0.08em; padding:0.95em 1.7em 0.9em; color: var(--ink); background-color: var(--accent); border-radius:2em;`

**Section-specific layout**
- **`.nav`**: `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:100vw; padding:1em; display:flex; justify-content:space-between; align-items:center; z-index:2;`
- **`section.projects`**: overrides height to `125vh`; `display:flex; gap:10em;`
- **`.projects-brief`**: `position:absolute; width:25%; top:35%; left:35%; transform:translate(-50%,-50%); z-index:2;`
- **`.projects .col`**: `position:relative;`
- **`.col.projects-cover`**: `flex:1; height:50%;` (a half-height framed image on the left)
- **`.col.projects-list`**: `flex:2; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:2em;`
- **`.project`**: `text-align:center; display:flex; flex-direction:column; gap:1em;`
- **`.about`**: `display:flex; background-color: var(--ink);`
- **`.intro, .portrait`**: `position:relative; flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:1em;`
- **`.intro p`**: `width:50%; text-align:center;` — `.intro p:nth-child(1)` gets `text-decoration:underline; margin-bottom:0.5em;`
- **`.portrait .portrait-container`**: `position:relative; width:100%; height:100%;`
- **`.banner`**: `display:flex; justify-content:center; align-items:center;`
- **`.banner-copy`**: `position:relative; text-align:center;` — `.banner-copy h1 { text-transform:uppercase; }`, `.banner-copy p:nth-child(3) { width:75%; margin:1em auto; }`
- **`.footer`**: `display:flex; gap:3em; padding:2.2em 2em; background-color: var(--graphite);` — `.footer h1 { text-transform:uppercase; }`
- **`.footer .col:nth-child(1)`**: `flex:4; height:100%; display:flex; flex-direction:column; justify-content:space-between;`
- **`.footer .col:nth-child(2)`**: `flex:2; display:flex; flex-direction:column; justify-content:space-between; height:100%;`
- **`.shop`**: `position:relative; width:100%; height:50%;`

## The Effect (be exhaustive — this is the whole point)

There is **no animation library beyond Lenis for the scroll**. The parallax is a custom rAF + lerp engine. Reproduce it exactly.

### 1. lerp helper

```js
const lerp = (start, end, factor) => start + (end - start) * factor;
```

### 2. Per-image init (`initParallaxImage(image, lenis)`)

Called once per `.parallax-image`. Each image gets a private closure with three locals: `bounds = null`, `currentTranslateY = 0`, `targetTranslateY = 0`.

- **Initial styles set imperatively:** `image.style.willChange = "transform";` and `image.style.transform = "translateY(0) scale(1.25)";`
  Note the **initial scale is `1.25`** — the image sits still at 1.25× until the first scroll write happens.
- **`updateBounds()`** measures the image's absolute document position:
  ```js
  const rect = image.getBoundingClientRect();
  bounds = { top: rect.top + window.scrollY, bottom: rect.bottom + window.scrollY };
  ```
  Called once immediately, and again on every `window` `resize`.

### 3. Per-image rAF loop (`animate()`)

A recursive `requestAnimationFrame` loop, one per image, started immediately after init:

```js
const animate = () => {
  currentTranslateY = lerp(currentTranslateY, targetTranslateY, 0.1);   // 0.1 smoothing
  if (Math.abs(currentTranslateY - targetTranslateY) > 0.01) {          // skip redundant writes when settled
    image.style.transform = `translateY(${currentTranslateY}px) scale(1.5)`;  // note scale jumps to 1.5 here
  }
  requestAnimationFrame(animate);
};
animate();
```

Two important details:
- **Smoothing factor is `0.1`** — `current` eases 10% of the way to `target` each frame, giving the laggy trail.
- **The write applies `scale(1.5)`**, not 1.25. So the image renders at 1.25× while `target` is still 0 (before any scroll), then snaps to 1.5× the moment the first non-trivial transform is written. The extra overscale is the headroom the image drifts inside its `overflow:hidden` frame.
- The `> 0.01` guard means when `current` and `target` have converged, no transform is written that frame (the image holds its last value at 1.5×).

### 4. Scroll → target (Lenis `scroll` event)

```js
lenis.on("scroll", ({ scroll }) => {
  if (!bounds) return;
  const relativeScroll = scroll - bounds.top;   // how far past the image's top the page has scrolled
  targetTranslateY = relativeScroll * 0.2;      // 0.2× depth factor
});
```

`scroll` is the Lenis virtual scroll position (px). `relativeScroll` is the scroll measured from the image's own document top, so each image's parallax is zeroed at its own position and grows as you scroll past it. The **`0.2` factor** is the parallax depth — the target moves at 20% of the scroll offset. The rAF loop then lerps `current` toward this at 0.1, so the visible image lags behind even the 0.2× target.

### 5. Bootstrapping

```js
document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({ autoRaf: true });   // autoRaf lets Lenis run its own rAF ticker
  document.querySelectorAll(".parallax-image")
    .forEach((image) => initParallaxImage(image, lenis));
});
```

`new Lenis({ autoRaf: true })` — a single Lenis instance shared by every image; `autoRaf: true` means you do **not** manually call `lenis.raf()` (Lenis drives its own loop). Each image runs its own separate `requestAnimationFrame` parallax loop independently.

### Summary of the three tuning constants (keep exact)

- **Parallax depth factor `0.2`** — target = relativeScroll × 0.2.
- **Lerp smoothing `0.1`** — current eases 10%/frame toward target.
- **Overscale `1.5`** (with an initial `1.25` before first scroll) — the headroom inside the clip frame.

## Assets / images

**Six image slots, each a distinct photo**, all displayed full-bleed with `object-fit: cover` at 1.5× overscale, and **all greyscaled by CSS**. The source files are **landscape, roughly 3:2**, but because they are cropped inside full-viewport frames, the exact aspect is flexible — any horizontal or portrait crop works. Shoot for tonal contrast and a single clear subject; hue is irrelevant, since none of it survives the filter. Each image is a `.parallax-image` inside an `.img` clip frame (whose own background is `var(--graphite)`, so a slow-loading frame reads as a grey plate rather than a hole). By role, in DOM order:

1. **Hero background** — full-screen behind the top nav.
2. **Projects backdrop** — full-bleed behind the projects section.
3. **Projects cover** — inside the half-height framed column on the left.
4. **About portrait** — in the right column of the dark "about" section.
5. **Banner background** — behind the centered newsletter CTA.
6. **Footer image** — smaller half-height frame in the footer's right column; the demo uses an open highway at golden hour, tying to the record's road narrative.

The demo musician name ("Liam Cartwright", track "Sundown") is fictional placeholder copy; keep it or swap for any neutral names. No brand logos or real artist imagery.

## Behavior notes

- **Effect is scroll-driven only** — on initial load, before any scroll, images sit static at `scale(1.25)` and no parallax is visible. Scroll down (~25–30% of the page) to see images drift inside their frames. To preview, smooth-scroll a fraction of the page and watch each image trail the scroll.
- **Per-image independence** — every image measures its own `bounds` and runs its own lerp loop, so images at different scroll depths parallax by different amounts at any moment.
- **Resize** re-measures each image's bounds on `window` resize; no other resize handling.
- **No reduced-motion branch** in the original; the loops run continuously. Lenis smooth scroll is always on.
- Desktop-oriented landing page; layout uses `vw`/`vh` full-viewport sections with no mobile-specific media queries in the original.

## Images

This component ships with 10 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/parallax-effect/portrait1.jpg
https://motionprompts.dev/c/parallax-effect/portrait10.jpg
https://motionprompts.dev/c/parallax-effect/portrait2.jpg
https://motionprompts.dev/c/parallax-effect/portrait3.jpg
https://motionprompts.dev/c/parallax-effect/portrait4.jpg
https://motionprompts.dev/c/parallax-effect/portrait5.jpg
… 4 more under https://motionprompts.dev/c/parallax-effect/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--paper`, `--paper-dim`, `--accent`, `--graphite`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.

## Adapting this to React

Everything above describes a standalone document: a script that waits for `DOMContentLoaded`, reaches into the page with `document.querySelectorAll(".parallax-image")`, and never has to undo itself. This component in particular starts **seven independent, self-perpetuating loops from that one entry point** — one `Lenis` instance plus one private `requestAnimationFrame` loop per image, six of them, each closed over its own `bounds`, `currentTranslateY` and `targetTranslateY` — so every guarantee React withdraws below is withdrawn seven times over, not once.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Run this setup twice without reverting the first pass and you get two `Lenis` instances both listening for the wheel, twelve `animate()` loops instead of six writing `transform` onto the same six `<img>` elements from two different `bounds`, and two `resize` listeners per image left on `window`. The visible symptom is images jittering between two competing offsets or drifting at roughly double the intended lag, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script waits for `DOMContentLoaded` with no `readyState` guard first. By the time a React component mounts, that event has already fired, so the listener passed to `document.addEventListener("DOMContentLoaded", ...)` never runs, and with it neither `new Lenis({ autoRaf: true })` nor a single one of the six `initParallaxImage` calls — no error, no parallax, nothing to debug. Delete the listener and move its body — the `Lenis` construction followed by the `.forEach` over `.parallax-image` — directly inside a `useEffect` with an empty dependency array.

*(2) Element lookups* — `document.querySelectorAll(".parallax-image")` assumes this component owns the document. Scope it to a root ref instead: `rootRef.current.querySelectorAll(".parallax-image")`. This matters concretely here because during the StrictMode remount two copies of the six-section markup exist for an instant; an unscoped query can hand the six `initParallaxImage` closures the outgoing copy's `<img>` elements, and the ones actually on screen never get a transform written to them.

*(3) Cleanup* — `initParallaxImage` currently returns nothing: the `animate()` loop it starts re-schedules itself forever, the `resize` listener it attaches to `window` is never removed, and the `lenis.on("scroll", ...)` subscription it registers has no matching `off`. Give it a return value instead, and collect the six into an array so all of them get torn down, not just whichever one a shared variable happened to hold last:

```jsx
useEffect(() => {
  const lenis = new Lenis({ autoRaf: true });
  const images = rootRef.current.querySelectorAll(".parallax-image");
  const teardowns = Array.from(images, (image) => initParallaxImage(image, lenis));

  return () => {
    teardowns.forEach((teardown) => teardown());
    lenis.destroy();
  };
}, []);
```

- **Lenis.** `{ autoRaf: true }` means Lenis drives its own internal `requestAnimationFrame` loop — there is no `lenis.raf()` call for you to wire into a ticker, and no loop of your own to cancel for scrolling. The only obligation is `lenis.destroy()`, called once in the outer cleanup after every `initParallaxImage` teardown has run; internally it also clears the emitter that `lenis.on` writes to, so all six `scroll` subscriptions the closures registered go with it — you do not need a matching `lenis.off` inside `initParallaxImage` itself.
- **The six per-image `animate()` loops.** Each is a separate, self-scheduling `requestAnimationFrame` chain with its own `currentTranslateY`/`targetTranslateY` pair; cancelling one does nothing for the other five. Have `initParallaxImage` keep the id its own `requestAnimationFrame` call returns in a local variable, and return a closure that cancels that id — never a shared or module-level one, or five of the six loops keep running after the sixth is cancelled:

  ```js
  function initParallaxImage(image, lenis) {
    // bounds, currentTranslateY, targetTranslateY, updateBounds() unchanged from above
    let frame = null;

    const animate = () => {
      currentTranslateY = lerp(currentTranslateY, targetTranslateY, /* the smoothing factor named above */);
      if (Math.abs(currentTranslateY - targetTranslateY) > 0.01) {
        image.style.transform = `translateY(${currentTranslateY}px) scale(/* the overscale named above */)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateBounds);
    };
  }
  ```
- **The per-image `resize` listener.** `window.addEventListener("resize", updateBounds)` is attached once per image and, in the code above, never removed — harmless on a document that loads once, but six more pile up on `window` every time this remounts without the teardown. `removeEventListener` needs the exact function reference `addEventListener` was given, which is why `updateBounds` has to stay a named function the closure can hand back, not an inline arrow rewritten at cleanup time.
