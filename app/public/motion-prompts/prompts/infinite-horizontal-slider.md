# Infinite Horizontal Parallax Slider — Wheel / Drag / Touch Driven, Seamless Loop

## Goal
Build a **full-viewport, infinitely looping horizontal image slider** on a near-black page. The track never ends in either direction: the slide sequence is duplicated and silently recycled so you can wheel-scroll or drag forever. Two details make it feel premium: (1) all motion is **eased with a lerp inside a requestAnimationFrame loop** (nothing snaps — the track glides and settles with inertia-like smoothness), and (2) every image sits **zoomed 2.25× inside its frame and shifts horizontally against the scroll direction** based on its distance from the viewport center, producing a strong per-slide parallax as slides travel across the screen. Hovering a slide while the track is **idle** fades in a small title + arrow overlay under it; while the track is moving the overlay stays hidden.

## Tech
Vanilla HTML/CSS/JS with ES module imports. **No GSAP and no animation libraries are needed** — the entire engine is a hand-rolled `requestAnimationFrame` loop with linear interpolation (lerp). No smooth-scroll library either (the page itself never scrolls; the wheel is hijacked to drive the track).

Put the slide data in its own ES module, `sliderData.js`:

```js
export const sliderData = [
  { title: "Echoes of Silence",  img: "./images/img-1.jpg", url: "#" },
  { title: "Floral Circuit",     img: "./images/img-2.jpg", url: "#" },
  { title: "Synthetic Horizon",  img: "./images/img-3.jpg", url: "#" },
  { title: "Portal Sequence",    img: "./images/img-4.jpg", url: "#" },
  { title: "Projected Memory",   img: "./images/img-5.jpg", url: "#" },
  { title: "Fractured Self",     img: "./images/img-6.jpg", url: "#" },
  { title: "Moonlit Constructs", img: "./images/img-7.jpg", url: "#" },
  { title: "Fading Room",        img: "./images/img-8.jpg", url: "#" },
];
```

`script.js` imports it: `import { sliderData } from "./sliderData.js";`

## Layout / HTML
```
nav                       (fixed strip at the top, above the slider)
  .logo > a  "Glasswake"
  .nav-links > a ×3  "Work" / "Studio" / "Contact"

.slider                   (the full-viewport stage)
  .slide-track            (empty in the HTML — the JS builds every slide)

footer                    (strip pinned to the bottom)
  p  "Experiment 0471"
  p  "Built by Glasswake"
```

Each slide the JS creates has this structure:
```
.slide                    (350×500 card, click target)
  .slide-image            (clipping frame, overflow hidden)
    img                   (the zoomed, parallaxed image)
  .slide-overlay          (title + arrow row, hidden by default)
    p.project-title       (the slide title)
    .project-arrow > svg  (diagonal ↗ arrow icon)
```

The arrow SVG is inline: `<svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>`.

## Styling
Font (Google Fonts): **DM Mono**, weights 300/400/500 + italics. `body { font-family: "DM Mono", monospace; background-color: #0f0f0f; color: #fff; }`. Global reset `* { margin:0; padding:0; box-sizing:border-box; }`.

- `a, p`: `display: block; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 0.8rem; font-weight: 500;` — every piece of text on the page is tiny uppercase mono.
- `nav, footer`: `position: absolute; width: 100vw; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; z-index: 2;` — `nav { top: 0 }`, `footer { bottom: 0 }`. `.nav-links { display: flex; gap: 2rem; }`.
- `.slider`: `position: relative; width: 100vw; height: 100svh; overflow: hidden; user-select: none;` — the clipping stage.
- `.slide-track`: `position: absolute; width: 100%; height: 100%; display: flex;` — its `transform` is the only thing the engine moves.
- `.slide`: `flex-shrink: 0; width: 350px; height: 500px; margin: 0 20px; position: relative; top: 50%; transform: translateY(-50%); overflow: visible; display: flex; flex-direction: column; cursor: pointer;` — so each slide occupies **390px of track width** (350 + 20 + 20), vertically centered in the viewport.
- `.slide-image`: `width: 100%; height: 100%; overflow: hidden; flex: 1;` — the mask that crops the oversized image.
- `.slide-image img`: `width: 100%; height: 100%; object-fit: cover; will-change: transform; transform: scale(2.25); user-select: none;` — the **2.25× zoom is the parallax headroom**; the JS overwrites this transform every frame.
- `.slide-overlay`: `position: absolute; bottom: -1.75rem; left: 0; right: 0; display: flex; justify-content: space-between; align-items: center; pointer-events: none; z-index: 10; transition: opacity 0.3s ease; opacity: 0;` — sits just *below* the card.
- **Idle-only hover reveal** (load-bearing trick): the JS maintains a CSS custom property `--slider-moving` (`"1"` while the track moves, `"0"` when settled) on `document.documentElement`, and the overlay reads it:
  ```css
  .slide:hover .slide-overlay {
    opacity: calc(1 - var(--slider-moving, 1));
  }
  ```
  So hovering shows the overlay only when the slider is at rest; the moment it moves the overlay computes to opacity 0 (softened by the 0.3s transition).
- `.project-title`: `text-transform: uppercase; font-weight: 500; font-size: 0.8rem;`. `.project-arrow`: `width: 16px; height: 16px;` with `svg { stroke: #fff; stroke-width: 2; }` (path has no fill — set `fill="none"` or it renders as a black blob).

## The animation engine (exhaustive — this is the effect)

No GSAP: everything below is a single rAF loop plus event handlers mutating a shared state object.

### Config and state
```js
const config = { SCROLL_SPEED: 1.75, LERP_FACTOR: 0.05, MAX_VELOCITY: 150 };
const totalSlideCount = sliderData.length; // 8

const state = {
  currentX: 0, targetX: 0,      // the lerp pair driving the track
  slideWidth: 390,              // full footprint of one slide (350 + margins) — 215 on mobile
  slides: [],
  isDragging: false, startX: 0, lastX: 0, lastMouseX: 0,
  lastScrollTime: Date.now(),
  isMoving: false, velocity: 0, lastCurrentX: 0,
  dragDistance: 0, hasActuallyDragged: false,
  isMobile: false,
};
```

### Building the track (init + on every resize)
- `checkMobile()`: `state.isMobile = window.innerWidth < 1000`.
- `state.slideWidth = isMobile ? 215 : 390`. On mobile each created slide also gets inline `width: 175px; height: 250px` (overriding the CSS 350×500).
- Create **6 copies** of the 8-item sequence → **48 `.slide` elements** appended to `.slide-track` (wipe `track.innerHTML` first). Slide `i` uses `sliderData[i % 8]` for its image src, title text and click URL.
- Start the track **two full sequences deep**: `startOffset = -(totalSlideCount * slideWidth * 2)` (= `-6240` on desktop). Set **both** `state.currentX` and `state.targetX` to it so there is no settle-in animation on load.
- Each slide gets a `click` handler: `e.preventDefault()`, and only if `state.dragDistance < 10 && !state.hasActuallyDragged` navigate to the item's `url` — i.e. a real click navigates, the click that ends a drag does not.
- `window` `resize` → rebuild everything (re-run this whole init).

### The rAF loop — lerp, recycle, parallax, idle detection
Runs forever, started once on `DOMContentLoaded`:

```js
function animate() {
  state.currentX += (state.targetX - state.currentX) * config.LERP_FACTOR; // lerp, factor 0.05
  updateMovingState();
  updateSlidePositions();
  updateParallax();
  requestAnimationFrame(animate);
}
```

**1. Lerp** — `currentX` chases `targetX` at **factor 0.05** per frame. Input events only ever push `targetX`; the track therefore always eases in and glides to a stop exponentially (this is the entire "smoothness" of the component).

**2. Seamless recycle** (`updateSlidePositions`) — with `sequenceWidth = slideWidth * totalSlideCount` (3120px desktop), keep `currentX` inside the safe middle window of the 6-copy strip by teleporting **both** `currentX` and `targetX` by exactly one sequence width (identical pixels → invisible jump):
```js
if (state.currentX > -sequenceWidth)          { state.currentX -= sequenceWidth; state.targetX -= sequenceWidth; }
else if (state.currentX < -sequenceWidth * 4) { state.currentX += sequenceWidth; state.targetX += sequenceWidth; }
```
Then apply `track.style.transform = translate3d(${state.currentX}px, 0, 0)`.

**3. Per-slide parallax** (`updateParallax`) — for every slide (skip those farther than 500px outside the viewport for perf):
```js
const slideRect = slide.getBoundingClientRect();
const slideCenter = slideRect.left + slideRect.width / 2;
const distanceFromCenter = slideCenter - window.innerWidth / 2;
const parallaxOffset = distanceFromCenter * -0.25;
img.style.transform = `translateX(${parallaxOffset}px) scale(2.25)`;
```
The image inside each frame shifts **opposite** to the slide's offset from the viewport center at a **-0.25 ratio**, always keeping the `scale(2.25)` zoom. A slide entering from the right shows the right side of its image and pans across it while traveling left — classic window-parallax.

**4. Idle detection** (`updateMovingState`) — per frame:
```js
state.velocity = Math.abs(state.currentX - state.lastCurrentX);
state.lastCurrentX = state.currentX;
const isSlowEnough = state.velocity < 0.1;
const stillLongEnough = Date.now() - state.lastScrollTime > 200;
state.isMoving = state.hasActuallyDragged || !isSlowEnough || !stillLongEnough;
document.documentElement.style.setProperty("--slider-moving", state.isMoving ? "1" : "0");
```
The slider counts as *moving* if it was actually dragged, if per-frame velocity ≥ 0.1px, or if any input happened within the last 200ms. That flag is what gates the hover overlays via CSS.

### Input handlers (all attached to `.slider` unless noted)
- **Wheel** (`{ passive: false }`): if `|e.deltaX| > |e.deltaY|` return without preventing default (let horizontal trackpad swipes do their thing). Otherwise `e.preventDefault()`, stamp `lastScrollTime = Date.now()`, and:
  ```js
  const scrollDelta = e.deltaY * config.SCROLL_SPEED;                        // ×1.75
  state.targetX -= Math.max(Math.min(scrollDelta, config.MAX_VELOCITY), -config.MAX_VELOCITY); // clamp ±150 per event
  ```
  Vertical wheel = horizontal travel (scroll down → track moves left).
- **Mouse drag**: `mousedown` → `preventDefault()`, `isDragging = true`, record `startX`/`lastMouseX = e.clientX`, `lastX = targetX`, reset `dragDistance = 0`, `hasActuallyDragged = false`, stamp `lastScrollTime`. `mousemove` (on `document`) while dragging → `preventDefault()`; **incremental** delta `(e.clientX - lastMouseX) * 2` added to `targetX` (drag multiplier **2×**), update `lastMouseX`, accumulate `dragDistance += |deltaX|`, and once `dragDistance > 5` set `hasActuallyDragged = true`; stamp `lastScrollTime`. `mouseup` (on `document`) and `mouseleave` (on the slider) → `isDragging = false` and after a **100ms** `setTimeout` reset `hasActuallyDragged = false` (that window is what suppresses the post-drag click).
- **Touch drag**: `touchstart` → same bookkeeping with `e.touches[0].clientX`. `touchmove` → **absolute** delta from the start point: `deltaX = (clientX - startX) * 1.5` (multiplier **1.5×**), `targetX = lastX + deltaX`, `dragDistance = |deltaX|`, `>5` → `hasActuallyDragged = true`. `touchend` → same as mouseup.
- `dragstart` on the slider → `preventDefault()` (kills native image ghost-dragging).

## Assets / images
**8 images**, one per slide, displayed in **350×500 portrait frames** (175×250 on mobile) but zoomed 2.25× with `object-fit: cover`, so almost any source aspect works (roughly square-to-landscape ~4:3 sources pan nicely). They should read as one cohesive **moody, cinematic art-direction series** — dark, atmospheric, editorial. For example, by role:
1. Sculptural still life — stacked dark ribbed forms on volcanic rock in misty mountains ("Echoes of Silence")
2. Pale profile portrait with glowing white flowers on black ("Floral Circuit")
3. Surreal film-set scene — circular water pool on a soundstage ("Synthetic Horizon")
4. Dark interior, figures facing a glowing rectangular doorway ("Portal Sequence")
5. Silhouette before a large projected face in a dark studio ("Projected Memory")
6. Glitch-distorted male portrait in green light ("Fractured Self")
7. Miniature mossy-hills diorama under a crescent moon ("Moonlit Constructs")
8. Blurred figure by a lamp in a dim vintage room ("Fading Room")

## Behavior notes
- The loop is **truly infinite in both directions** — the recycle window (between −1 and −4 sequence widths of a 6-copy strip) means the ends of the strip are never seen.
- The page never scrolls; only the track moves. `nav` and `footer` float above the stage.
- **Mobile** (`< 1000px`): slides shrink to 175×250 (footprint 215px), rebuilt on resize; touch drag fully supported.
- Overlays (`title + ↗ arrow`) only appear on hover **while the slider is settled** — moving the track hides them instantly via the `--slider-moving` custom property.
- A drag that traveled more than ~5–10px must **not** trigger the slide's click navigation; a clean click does (all demo URLs are `#`).
- All text content is fictional/neutral: brand "Glasswake", nav links Work / Studio / Contact, footer "Experiment 0471" / "Built by Glasswake".

## Images

This component ships with 8 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/infinite-horizontal-slider/slider_img_01.jpg
https://motionprompts.dev/c/infinite-horizontal-slider/slider_img_02.jpg
https://motionprompts.dev/c/infinite-horizontal-slider/slider_img_03.jpg
https://motionprompts.dev/c/infinite-horizontal-slider/slider_img_04.jpg
https://motionprompts.dev/c/infinite-horizontal-slider/slider_img_05.jpg
https://motionprompts.dev/c/infinite-horizontal-slider/slider_img_06.jpg
… 2 more under https://motionprompts.dev/c/infinite-horizontal-slider/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--paper`, `--muted`, `--line`, `--accent`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: a script that reaches into the page with `document.querySelector(".slider")` and `document.querySelector(".slide-track")`, then keeps a self-recursing `requestAnimationFrame` loop, ten event listeners and a handful of drag timers alive for as long as the page is open. React withdraws all of that at once, and it does it quietly — the track keeps easing toward `targetX`, but something underneath is now doubled.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that never runs would leave two `animate()` loops each lerping their own `currentX` toward their own `targetX`, two `wheel` listeners both calling `preventDefault()` on the same event and pushing the same delta into two different state objects, and two sets of `mousemove`/`mouseup` listeners on `document` racing over the same drag gesture. The visible symptom is a track that jitters, overshoots, or drifts faster than the input driving it, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not an afterthought.

*(1) The entry point* — This script is already shaped like a React effect: the original top-level init has been rewritten as `mount(config)`, returning a `destroy()` that undoes exactly what `mount()` built, so this catalogue's own editor runtime (`window.MP.register`) can tear the slider down and remount it live with a different config — a different scroll push, a different parallax amount, a different copy count. Drop the `window.MP` branch entirely; it is the editor's hook into this file, not something a consuming app ships. Drop the `document.readyState` check and its `DOMContentLoaded` listener too — that guard exists to survive being loaded late into a plain document, and `useEffect` already runs after the DOM is committed, so there is nothing left for it to guard against. What remains is exactly the effect body:

```jsx
useEffect(() => {
  const destroy = mount({ ...DEFAULTS });
  return destroy;
}, []);
```

*(2) Element lookups* — `mount()` opens with two unscoped lookups, `document.querySelector(".slider")` and `document.querySelector(".slide-track")`, and quietly returns a no-op `destroy` if either comes back null — a harmless guard, but the lookups themselves assume this component owns the whole document. Scope both to a root ref instead of `document`: query inside `rootRef.current`, or better, pass the two elements into `mount` directly instead of letting it search globally. This is not just a style objection for the eventual StrictMode remount: for an instant two `.slider` / `.slide-track` pairs exist in the tree, and an unscoped `querySelector` can wire the wheel and drag handlers to the copy that is on its way out while the one actually on screen never gets them.

*(3) Cleanup* — `mount()`'s own `destroy()` already does most of what an rAF-driven component in this catalogue usually needs adding by hand: it cancels the exact `frame` handle the last `requestAnimationFrame` call returned, removes the same seven listener references `.slider` was given (`wheel`, `touchstart`, `touchmove`, `touchend`, `mousedown`, `mouseleave`, `dragstart`), removes the two `document`-level listeners (`mousemove`, `mouseup`) and the one `window` listener (`resize`) that outlive the track being emptied and would otherwise be exactly the leak, and clears every pending `setTimeout` the drag handlers queued into the `dragTimers` set. Return that `destroy` unmodified from the effect — it is already the correct cleanup, not a legacy shape to translate into something more idiomatic.

One line is missing from it, and it matters more under React than it ever did on the plain page: `updateMovingState()` writes the idle/moving flag to `document.documentElement.style.setProperty("--slider-moving", …)` — a global custom property on `<html>`, not something scoped to `.slider` — and `destroy()` never calls `removeProperty` on it. On the original page that omission is harmless because the page never unmounts mid-gesture and walks away. Under React, an unmount that lands mid-scroll or mid-drag leaves `--slider-moving: 1` stuck on `<html>` after the component is gone, which permanently zeroes out the hover-reveal CSS (`calc(1 - var(--slider-moving, 1))`) for anything else on the page that reads that variable — including a later remount of this same slider elsewhere in the tree, whose overlays would silently refuse to appear on hover until a real page reload. Add `document.documentElement.style.removeProperty("--slider-moving")` to the returned cleanup, right alongside the `cancelAnimationFrame` call.
