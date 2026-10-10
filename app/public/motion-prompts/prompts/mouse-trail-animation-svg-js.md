# Mouse Trail — layered rainbow SVG ribbon that snakes after the cursor

## Goal
Build a full-viewport, playful **mouse-trail** effect. Seven stacked SVG polyline
paths in a rainbow palette chase the cursor across a bright amber background. They
read as one thick, glossy ribbon that whips and snakes behind the pointer: each
colored layer has a slightly different length, so the tails fan out and reveal the
colors underneath as the ribbon curls. The star effect is the eased, interpolated
lag of the trail as it catches up to a fast-moving cursor.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) — core only. **No
GSAP plugins, no ScrollTrigger, no lenis, no canvas, no WebGL.** The trail geometry
is drawn by hand into SVG `<path>` elements from inside a `requestAnimationFrame`
loop; `gsap` is used only to ease a single shared pointer object toward the mouse.

## Layout / HTML
`<body>` contains **seven sibling `<svg>` elements**, each holding exactly one
`<path class="trail">`. There is no wrapper, no viewBox, no width/height attributes
on the SVGs (they are sized to 100% via CSS). Each path starts with an empty `d=""`
and carries its stroke color as an inline style. Order matters — later SVGs paint on
top. From first (bottom layer) to last (top layer), the inline `stroke` colors are:

1. `#fefa02` (yellow)
2. `#9aa8e1` (periwinkle)
3. `#f57faa` (pink)
4. `#fb2832` (red-orange)
5. `#559ce2` (blue)
6. `#e27b63` (terracotta)
7. `#e82c31` (crimson)

```html
<svg><path d="" class="trail" style="stroke: #fefa02"></path></svg>
<svg><path d="" class="trail" style="stroke: #9aa8e1"></path></svg>
<svg><path d="" class="trail" style="stroke: #f57faa"></path></svg>
<svg><path d="" class="trail" style="stroke: #fb2832"></path></svg>
<svg><path d="" class="trail" style="stroke: #559ce2"></path></svg>
<svg><path d="" class="trail" style="stroke: #e27b63"></path></svg>
<svg><path d="" class="trail" style="stroke: #e82c31"></path></svg>
<script type="module" src="./script.js"></script>
```

## Styling
- Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`.
- `body { background: #ffb503; }` — a saturated amber/marigold. No scrollbars needed;
  the SVGs are `position: absolute` so the page does not grow.
- Every `svg`: `position:absolute; top:0; left:0; width:100%; height:100%;
  pointer-events:none;`. All seven overlap perfectly, stacked in DOM order.
- Every `path`: `fill:none; stroke-width:50; stroke-linecap:round;
  stroke-linejoin:round;`. The fat 50px stroke plus round caps/joins is what turns a
  jagged polyline into a smooth, rounded ribbon. Stroke color comes from the inline
  `style` on each path (do **not** set stroke in CSS).

## GSAP effect (this is the important part — be exact)

### The one shared, eased pointer
There is a single plain object `smoothPointer = { x, y }` initialized to the viewport
center: `x = window.innerWidth / 2`, `y = window.innerHeight / 2`. **All seven paths
read from this same object** — there is only one eased pointer for the whole system.

On `window` `mousemove`, tween that object toward the raw cursor:

```js
window.addEventListener("mousemove", (event) => {
  gsap.to(smoothPointer, {
    x: event.clientX,
    y: event.clientY,
    duration: 0.5,
    ease: "power2.out",
  });
});
```

- Animated properties: `x`, `y` of `smoothPointer` → the mouse's `clientX`/`clientY`.
- `duration: 0.5`, `ease: "power2.out"`, no delay, no stagger.
- Each new mousemove fires a fresh `gsap.to`; GSAP overwrites the in-flight tween, so
  the pointer continuously eases toward the latest cursor position. This 0.5s eased
  lag is the source of the whip/snake feel — the trail never snaps instantly.

### Per-path point history (defines each tail's length)
Keep an array of maximum point counts, one per path, **descending**:

```js
const totalPointsArray = [40, 35, 30, 25, 20, 15, 10];
```

The bottom layer (`#fefa02`) keeps 40 points → longest tail; the top layer
(`#e82c31`) keeps 10 → shortest tail. Because shorter tails are painted last, they
sit on top, so as the ribbon curls you see the longer under-layers fan out beyond the
shorter over-layers, exposing the rainbow.

### The requestAnimationFrame draw loop
Run a continuous `requestAnimationFrame(updatePath)` loop (started once, self-
recursing). It never stops. **Every frame**, for each path (via `forEach` with
`index`):

1. Read the path's own history array (store it as a custom property on the element,
   e.g. `path.points`, defaulting to `[]`).
2. `points.unshift({ ...smoothPointer })` — prepend a **copy** of the current shared
   pointer to the FRONT of the array (index 0 = newest / cursor end).
3. Trim from the tail: `while (points.length > totalPointsArray[index]) points.pop();`
   so each array holds at most its configured number of the most-recent pointer
   positions.
4. Save it back (`path.points = points`).
5. If `points.length > 1`, rebuild the SVG path data as a straight polyline through
   the history and `path.setAttribute("d", d)`:
   ```js
   let d = `M ${points[0].x} ${points[0].y}`;
   for (let i = 1; i < points.length; i++) d += ` L ${points[i].x} ${points[i].y}`;
   ```
   Just `M` (moveTo) then `L` (lineTo) segments — no curves, no smoothing. The 50px
   round stroke does all the visual smoothing.

Because every path samples the **same** eased pointer each frame but retains a
different number of past samples, the seven layers trace the identical route and
differ only in how far back in time their tails reach — producing the nested,
staggered, multi-color ribbon. When the cursor is still, all points collapse onto one
spot and the ribbon shrinks to a stack of round dots; when it moves fast, the tails
stretch out into long colored streaks.

## Assets / images
None. Pure vector + color; no external images, icons, fonts, or textures.

## Behavior notes
- **Desktop / pointer-driven only.** The effect is entirely `mousemove`-based; on
  touch devices with no cursor there is nothing to drive it (it simply rests at
  center). No hover, click, or scroll triggers.
- Initial state: pointer at center, all `d` empty, so on load the screen is just the
  amber background until the first mouse movement seeds the histories.
- The rAF loop runs forever (no reduced-motion guard in the original). If you add one,
  gate the loop and the mousemove tween behind
  `matchMedia("(prefers-reduced-motion: reduce)")`.
- Everything is fixed to the viewport; the page does not scroll and the SVGs always
  fill 100% × 100% of the window.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--yellow`, `--yellow-deep`, `--ink`, `--ink-soft`, `--paper`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a standalone document: a module that runs once, at parse time, grabs the seven `.trail` paths with `document.querySelectorAll`, wires `mousemove`/`touchmove` straight onto `window`, and kicks off two self-recursing `requestAnimationFrame` loops that never stop. React withdraws all of that at once — a document this script can assume it owns, a query that runs exactly once, loops nobody else has to answer for — and it does so quietly: the ribbon still draws, but something underneath is now running twice.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything here: two `mousemove` listeners each firing their own `gsap.to` at the same `smoothPointer` object, two `autoPath` loops nudging that same object along the idle Lissajous path the instant the pointer goes still, two `updatePath` loops racing to unshift into the same seven `path.points` arrays and overwrite the same `d` attributes. The visible symptom is a trail that stutters, briefly forks, or free-runs a touch faster than it should, and it will not reproduce in a production build, because React only double-invokes effects in development. Treat the cleanup as part of the effect, not an afterthought.

*(1) The entry point* — The script runs at the top level: the `querySelectorAll(".trail")`, both `window.addEventListener` calls, and the two seed calls — `requestAnimationFrame(autoPath)` and `updatePath()` — all execute the instant the module is evaluated. Under React that is import time, before the seven `<svg>` siblings this component renders exist in the DOM. Move the entire body — the query, `steer`, both listeners, and both loop kicks — into a `useEffect` with an empty dependency array. Do not leave any of it in the component body: `smoothPointer`, `totalPointsArray`, and `lastInput` need to stay the same objects across renders, not get rebuilt every time the component re-renders.

*(2) Element lookups* — `document.querySelectorAll(".trail")` assumes this component owns the whole document. Give the component a root `ref` wrapping the seven `<svg>` elements and look the paths up as `rootRef.current.querySelectorAll(".trail")` inside the effect. This matters more than usual here because `updatePath` stores each path's history directly on the element (`path.points`, read with `path.points || []` and written back each frame) — an unscoped lookup during the StrictMode remount can attach that per-frame history to the outgoing copy of the subtree, the one about to be removed, instead of the one on screen.

*(3) Cleanup* — Three things accumulate here and all three have to unwind together: the GSAP tween behind `steer`, the two independent `requestAnimationFrame` loops, and the two `window` listeners feeding them.

- **GSAP** — wrap `steer`'s `gsap.to(smoothPointer, …)` call in a `gsap.context` scoped to the root ref, and revert it in the cleanup:
  ```jsx
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* steer(), the two window listeners, and the seed calls for
         autoPath and updatePath — exactly as described above */
    }, rootRef);
    return () => ctx.revert();
  }, []);
  ```
  `gsap.context` only tracks tweens created inside it, so reverting it stops the in-flight `smoothPointer` tween from continuing to ease toward a stale target — it does not touch the `window` listeners or the raw `requestAnimationFrame` calls below, which still need their own teardown.
- **Two rAF loops, two handles** — `autoPath` and `updatePath` are separate self-recursing loops; cancelling one does nothing for the other. Capture the ID each `requestAnimationFrame` call returns and cancel both:
  ```jsx
  const autoPathId = useRef();
  const updatePathId = useRef();
  // inside each loop: autoPathId.current = requestAnimationFrame(autoPath);
  //                    updatePathId.current = requestAnimationFrame(updatePath);
  return () => {
    cancelAnimationFrame(autoPathId.current);
    cancelAnimationFrame(updatePathId.current);
  };
  ```
  Leaving either alive survives the unmount: `updatePath` keeps writing `d` onto seven `<path>` elements that may no longer be mounted, and `autoPath` keeps steering `smoothPointer` along its idle loop for a component that no longer reads it — a fresh, uncancelled pair of loops on every remount.
- **The two window listeners** — remove the `mousemove` and `touchmove` listeners in the same cleanup, passing `removeEventListener` the same function reference `addEventListener` was given (name `steer` and the touch wrapper so they're referenceable, rather than passing new inline arrows to `addEventListener`). A `steer` closure that outlives its effect keeps firing `gsap.to` calls at a `smoothPointer` object nothing on screen reads from anymore.
