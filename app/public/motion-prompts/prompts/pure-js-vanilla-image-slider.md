# Pure JS Vanilla Image Slider — scroll-driven horizontal lens gallery

## Goal
Build a full-viewport gallery where a **long vertical page scroll drives a horizontal row of image
cards sideways**, and each card (with its inner image) is **scaled per-frame by a position-based
"lens" function**: a card is invisible at the screen edges, grows as it approaches the center, peaks
at **1.5×** exactly at the horizontal center of the viewport, then shrinks back down as it exits the
other side. The whole row glides with an eased (lerped) `translateX`, so scrolling feels weighty and
smooth rather than 1:1. The star of the piece is the **hand-rolled `requestAnimationFrame` engine**
— vertical `scrollY` is mapped to a target X, lerped toward each frame, and a piecewise lens curve
re-scales every card by where its center currently sits on screen. **No animation library at all.**

## Tech
Vanilla HTML / CSS / JS with an ES-module entry (`<script type="module" src="./script.js">`),
bundled by Vite. **No GSAP, no ScrollTrigger, no Lenis, no Three.js — zero dependencies.** The
entire motion system is one custom `requestAnimationFrame` loop plus a manual `lerp()` helper, a
native `scroll` listener, and direct `element.style.transform` writes. Must run in a fresh Vite
project with nothing installed.

## Layout / HTML
Flat, static markup — every card exists in the HTML up front (they are **not** generated in JS).

```html
<body>
  <nav>
    <p>Motionprompts</p>
    <p>Elite Web Designs</p>
  </nav>
  <footer>
    <p>Scroll to Explore</p>
    <p>Selected Work</p>
  </footer>

  <div class="slider">
    <div class="card"><img src="/path/img1.webp" alt="" /></div>
    <div class="card"><img src="/path/img2.webp" alt="" /></div>
    <!-- …exactly 20 .card elements total… -->
    <div class="card"><img src="/path/img10.webp" alt="" /></div>
  </div>

  <script type="module" src="./script.js"></script>
</body>
```

- There are **exactly 20 `.card` elements**. There are only **10 distinct images** (`img1`–`img10`),
  so the row is `img1…img10` followed by `img1…img10` **again** (the ten images repeated twice, in
  the same order). Each `.card` wraps exactly one `<img>`.
- `nav` (top) and `footer` (bottom) are fixed overlays, each with two short uppercase labels
  (left / right). Use the neutral demo labels above — **no real brand or client names.**

## Styling
Global reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`

- **The page is a tall scroll runway:** `html, body { width: 100vw; height: 1000vh; background: #000; }`
  — the body is **10 viewport-heights tall (`1000vh`)** with a **black** background. That long height
  is the scroll track; nothing else scrolls.
- **Font:** `font-family: "PP Neue Montreal", sans-serif` on `html, body` (any clean neutral grotesque
  sans is an acceptable fallback).
- **`p`** — `text-transform: uppercase; font-size: 13px; font-weight: 500; color: #fff;`
- **`img` (global)** — `width: 100%; height: 100%; object-fit: cover; transition: transform 0.1s ease-out;`
  Note the CSS transition — the JS writes `transform: scale(...)` on the image every frame, and this
  `0.1s ease-out` transition adds a tiny extra smoothing on top of the per-frame writes.
- **`nav`, `footer`** — `position: fixed; width: 100%; padding: 2em; display: flex;
  justify-content: space-between; align-items: center;` `nav { top: 0; }`, `footer { bottom: 0; }`.
- **`.slider`** — `position: fixed; top: 0; left: 0; width: 500%; height: 100vh; display: flex;
  justify-content: space-around; align-items: center;` It is **five viewports wide (`500%`)**, pinned
  fixed at the top-left, holding all 20 cards in a single flex row, vertically centered, spaced with
  `space-around`. The JS slides this whole element horizontally via `translateX`.
- **`.card`** — `width: 400px; height: 500px; display: flex; flex-direction: column-reverse;
  overflow: hidden; transition: transform 0.1s ease-out;` Fixed **400×500 px (4:5 portrait)** boxes
  that **clip their overscaled image** (`overflow: hidden`). Same `0.1s ease-out` transition as the
  image — the JS writes `transform: scale(...)` on the card every frame, CSS eases it slightly.

## The effect — exhaustive spec (custom rAF engine, lerp + piecewise lens)

There is **no library**. Reproduce this engine exactly.

### Module state & the lerp helper
```js
const slider = document.querySelector(".slider");
const cards  = document.querySelectorAll(".card");
const ease   = 0.1;   // per-frame smoothing factor for the horizontal glide

let currentX = 0;     // rendered X (percent), what the slider is actually translated to
let targetX  = 0;     // desired X (percent), set by the scroll handler

const lerp = (start, end, t) => start * (1 - t) + end * t;
```

### Scroll → horizontal target
A native `window` `scroll` listener maps vertical scroll progress to a horizontal target:
```js
window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight; // = 900vh worth of px
  const scrollProgress = window.scrollY / maxScroll;                 // 0 → 1 over the whole page
  targetX = -scrollProgress * 75;                                    // 0% → -75%
});
```
So `targetX` runs from **`0%` (top of page)** to **`-75%` (bottom of page)**. Because the `.slider`
is `500%` wide and `translateX` percentages are relative to the **element's own width**, `-75%` means
the slider shifts left by `0.75 × 500% = 3.75` viewport widths across the full scroll — enough travel
for the whole row of cards to sweep across the screen.

### The lens curve — `getScaleFactor(position, viewportWidth)`
Given a card center's **x-coordinate on screen** (`position`) and the viewport width, return the
card's scale. The viewport is split into **four quarters** (`quarterWidth = viewportWidth / 4`) and
the scale is a **piecewise-linear tent** that is 0 at both edges and peaks at the center. Reproduce
this **exactly**:
```js
const getScaleFactor = (position, viewportWidth) => {
  const quarterWidth = viewportWidth / 4;
  if (position < 0 || position > viewportWidth) {
    return 0;                                                             // fully off-screen → scale 0
  } else if (position < quarterWidth) {                                   // 1st quarter
    return lerp(0, 0.45, position / quarterWidth);                        //   0    → 0.45
  } else if (position < 2 * quarterWidth) {                              // 2nd quarter
    return lerp(0.45, 1.5, (position - quarterWidth) / quarterWidth);     //   0.45 → 1.5  (peak at center)
  } else if (position < 3 * quarterWidth) {                              // 3rd quarter
    return lerp(1.5, 0.45, (position - 2 * quarterWidth) / quarterWidth); //   1.5  → 0.45
  } else {                                                                // 4th quarter
    return lerp(0.45, 0, (position - 3 * quarterWidth) / quarterWidth);   //   0.45 → 0
  }
};
```
Shape to preserve: **scale `0` at `x = 0`**, rising to **`0.45` at the ¼ mark**, then steeply up to
**`1.5` at dead center (`x = viewportWidth/2`)**, symmetrically back down to **`0.45` at the ¾ mark**,
and back to **`0` at the right edge**. Any card whose center is off-screen (`< 0` or `> viewportWidth`)
collapses to scale `0` (effectively invisible). This is the "lens": cards balloon to **1.5×** as they
cross the middle of the screen and pinch to nothing at the edges.

### Applying scales every frame — `updateScales()`
```js
const updateScales = () => {
  const viewportWidth = window.innerWidth;
  cards.forEach((card) => {
    const cardRect   = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;         // card's on-screen center x
    const scaleFactor    = getScaleFactor(cardCenter, viewportWidth);
    const imgScaleFactor = scaleFactor * 1.1;                      // inner image is scaled 1.1× more
    const img = card.querySelector("img");
    card.style.transform = `scale(${scaleFactor})`;
    img.style.transform  = `scale(${imgScaleFactor})`;
  });
};
```
Key nuance: the **inner `<img>` is scaled to `scaleFactor × 1.1`** — always **10% larger** than its
card. Since `.card` has `overflow: hidden`, this keeps the image overflowing (a slight inner zoom /
edge-crop) so no gaps show as the card scales. The card center is read fresh from
`getBoundingClientRect()` each frame, so it reflects the slider's current horizontal position.

### The render loop (the whole engine)
```js
const update = () => {
  currentX = lerp(currentX, targetX, ease);          // glide currentX toward targetX at 0.1/frame
  slider.style.transform = `translateX(${currentX}%)`;
  updateScales();                                     // rescale all 20 cards for the new position
  requestAnimationFrame(update);
};
update();
```
That single lerp (factor `0.1`) is the only easing on the horizontal motion: the row does **not**
track scroll 1:1 — it eases toward the scroll-derived target, so fast scroll flicks decelerate softly
and the cards drift into place. The loop runs continuously; there is **no scroll throttling**, no
ScrollTrigger, no snapping, no bounds beyond the page's own scroll length.

**Order per frame:** (1) lerp `currentX` → set `slider` `translateX`, (2) `updateScales()` re-reads
every card's live screen center and rewrites its `scale` (and the image's `scale × 1.1`). Start the
loop once with a bare `update()` call; the scroll handler only mutates `targetX`.

## Assets / images
**10 distinct full-bleed portrait photographs (4:5, ~0.8 aspect), used to fill 20 card slots** — the
ten images repeat twice in order (`img1…img10`, then `img1…img10` again). Each `.card` is a
`400×500` box with `object-fit: cover`, so exact source ratio is flexible (tall portrait is ideal).
The set mixes **grainy black-and-white editorial portraits** with **warm color lifestyle/craft shots**
and **dreamy motion-blur dance frames** — an emotive, editorial photo-essay feel. Generic subjects by
role and form (**no brand marks, logos, or baked-in text**):

1. **B&W male profile portrait** — close-up of a young man in a turtleneck, three-quarter/profile,
   gazing off-frame, soft directional window light, high-contrast monochrome.
2. **B&W eye macro** — extreme close-up of a single open eye, brow and lashes, glossy skin,
   monochrome, shallow depth of field.
3. **B&W laughing woman** — candid outdoor portrait of a young woman mid-laugh, eyes crinkled shut,
   bright backlight, wind-tousled hair, grainy monochrome.
4. **Color studio sketching** — a man in an olive shirt drawing at a desk in a plant-filled, sun-lit
   studio; brushes in a cup, warm golden tones.
5. **Color photographer in studio** — a bearded man holding a camera beside a softbox on a light
   stand, dark seamless backdrop, muted cinematic color.
6. **Color pottery hands** — close-up of hands shaping a wet clay pot on a spinning wheel in a
   rustic, window-lit workshop, warm amber tones.
7. **Color architect at desk** — a man with glasses studying architectural drawings/blueprints at a
   desk, denim shirt, soft daylight, muted warm palette.
8. **Color leaping dancer at dusk** — a barefoot figure in flowing clothes captured mid-leap against
   a pink/orange sunset sky over a dark tree line and grass; motion-blurred limbs.
9. **Color spinning dancer** — long-exposure blur of a person twirling in a flowing dress, streaks of
   pale blue and dusty rose against a near-black background; jewel-toned, painterly.
10. **Color chromatic silhouette** — grainy abstract profile of a head/shoulder as a dark silhouette
    against a rainbow light-leak gradient (blue-green-pink-yellow), lens-flare / film-halation feel.

## Behavior notes
- **Scroll-driven, desktop-first.** All motion comes from native vertical page scroll; there is no
  autoplay, no wheel hijacking, no touch drag handler — the page simply scrolls and the row follows.
- **Idles still:** with no scrolling, `targetX` stays put and `currentX` settles onto it; the cards
  hold their scales. Motion only happens while (and just after) the user scrolls, thanks to the lerp.
- **Continuous rAF:** the loop runs every frame regardless of input (it always recomputes the 20 card
  scales), so a resize naturally takes effect on the next frame (`getScaleFactor` reads
  `window.innerWidth` live).
- **No reduced-motion branch** in the original; motion is entirely user-driven via scroll.
- Keep it lean: the only per-frame DOM writes are the slider's `translateX` and each card's + image's
  `scale`; there are no allocations of note beyond the `getBoundingClientRect()` reads.

## Images

This component ships with 10 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/pure-js-vanilla-image-slider/img1.webp
https://motionprompts.dev/c/pure-js-vanilla-image-slider/img10.webp
https://motionprompts.dev/c/pure-js-vanilla-image-slider/img2.webp
https://motionprompts.dev/c/pure-js-vanilla-image-slider/img3.webp
https://motionprompts.dev/c/pure-js-vanilla-image-slider/img4.webp
https://motionprompts.dev/c/pure-js-vanilla-image-slider/img5.webp
… 4 more under https://motionprompts.dev/c/pure-js-vanilla-image-slider/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--muted`, `--hair`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`, `body::before`, `body::after`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a standalone document: a script that runs once, reaches for `.slider` and its twenty `.card` children with `document.querySelector`/`querySelectorAll`, and starts a self-recursing `requestAnimationFrame` loop plus a `window` `scroll` listener meant to run for as long as the page stays open. React withdraws all of that at once, and it does it quietly — the row keeps drifting toward `targetX`, but something underneath is now running twice.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that never runs leaves two `update()` loops each lerping their own copy of `currentX` toward their own `targetX` and writing competing `translateX` values onto the same `.slider`, plus two `scroll` listeners racing to overwrite the same module-level `targetX` the other loop's closure reads. The visible symptom is a row that jitters between two speeds, or a scale that flickers between two values on the same card, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not an afterthought.

*(1) The entry point* — The script runs at the top level: the `querySelector(".slider")` / `querySelectorAll(".card")` calls, the `ease` / `currentX` / `targetX` declarations, the `scroll` listener registration, and the closing `update()` call that starts the render loop all execute the instant the module is evaluated — at import time, before your component has rendered `.slider` or any `.card` into the DOM. Move the entire body into a `useEffect` with an empty dependency array. Do **not** leave it in the component body: that would re-declare `currentX`/`targetX`, re-attach the `scroll` listener, and kick off a second `update()` loop on every re-render.

*(2) Element lookups* — `document.querySelector(".slider")` and `document.querySelectorAll(".card")` both assume this component owns the whole document. Give the component a root `ref` around the slider markup and scope both to it, rather than `document`. This matters more than the usual StrictMode caveat here because `updateScales()` re-reads every card's live `getBoundingClientRect()` on every single frame: during the remount, while two copies of the twenty cards briefly coexist in the tree, an unscoped lookup can bind the running loop to the outgoing `.card` set — the one on its way out — while the cards actually on screen never get a `scale` written and sit invisible at whatever the lens curve last left them.

*(3) Cleanup* — There is no library here to hand the teardown to: the whole engine is one `requestAnimationFrame` loop and one `scroll` listener, both currently written to run forever.

- **The loop** — the code above discards the return value of every `requestAnimationFrame(update)` call, so there is nothing to cancel with. Capture the handle instead:
  ```jsx
  useEffect(() => {
    let frame = requestAnimationFrame(function loop() {
      currentX = lerp(currentX, targetX, ease);
      slider.style.transform = `translateX(${currentX}%)`;
      updateScales();
      frame = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  ```
  Left uncancelled, the loop survives the unmount and keeps writing `transform` onto a `.slider` node React has already detached from the page, still calling `updateScales()` against twenty cards nobody can see — one more perpetual loop for every visit to this route.
- **The `scroll` listener** — the original hands `window.addEventListener("scroll", …)` an inline arrow, which cannot be removed later: `removeEventListener` matches by function identity, and a fresh arrow literal is never equal to the one that was attached. Name it, keep that same reference for both calls, and remove it alongside the loop:
  ```jsx
  const onScroll = () => {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    targetX = -(window.scrollY / maxScroll) * 75;
  };
  window.addEventListener("scroll", onScroll);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
  };
  ```
  Without this, the listener keeps mutating a `targetX` that the cancelled loop no longer reads — harmless in isolation, but it is exactly the kind of stray reference that turns into a real bug the moment two mounts of this slider end up sharing scope instead of each getting its own.

`ease`, `currentX` and `targetX` also need to move from module scope into the effect's closure, for the same reason this catalogue gives the same advice wherever a vanilla script keeps its working state in top-level `let`s: the original assumes it is the only copy of itself on the page, so one shared trio of variables was safe. A component does not get that guarantee — two instances of this slider on the same page, or the instant where StrictMode holds two copies of one instance at once, would otherwise have one instance's scroll position stomping the other's `targetX`, with neither loop ever settling on the value it should be lerping toward.
