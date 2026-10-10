# 3D Scroll Tunnel

## Goal
Build a full-viewport, pitch-black "spotlight" stage containing an **infinite 3D image tunnel** flown by the **mouse wheel**. A ring of four images sits on an ellipse; several of these rings are stacked in depth along the Z axis inside a CSS `perspective` container. A `gsap.ticker` loop **lerps a virtual scroll value** and pushes every ring toward the camera, **wrapping depth modulo the tunnel length** so the flight never ends. Each image carries a plum-black overlay whose opacity is driven by a `--overlay` CSS variable: images **emerge from black in the far depths, resolve to full clarity at the camera plane, then darken back to black and vanish as they pass the lens**. There is no native page scroll and no ScrollTrigger — everything is a wheel accumulator plus a per-frame ticker.

The plates keep their **own colour** — the night is built by the stage around them (plum-black ground, violet mesh, the depth veil), never by bleaching the photographs. And on top of the depth, a **speed smear**: a second damped read of the **velocity** of the lerped scroll stretches every plate along the axis it appears to be flying down and pinches it across, so the frames streak while the tunnel is moving and settle back to clean rectangles the instant it stops.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`gsap` (npm) only** — no plugins, no Lenis, no ScrollTrigger. Import as:
```js
import gsap from "gsap";
```
The whole animation runs inside a single `gsap.ticker.add(() => { ... })` callback. The wheel drives a target value; the ticker lerps a current value toward it and applies 3D transforms with `gsap.set`.

## Layout / HTML
The static HTML is essentially empty — the tunnel is built entirely in JS:
```html
<body>
  <section class="spotlight"></section>
  <script type="module" src="./script.js"></script>
</body>
```
JS creates and appends:
```
section.spotlight            (the fixed black stage, perspective container)
  div.tunnel                 (centered 3D group, transform-style: preserve-3d)
    div.layer  × N           (one per depth ring; its translateZ is animated)
      div.item × up to 4     (positioned around an ellipse; 180×220 px each)
        img                  (the tunnel image)
        div.item-overlay     (black veil, opacity = var(--overlay))
```

## Styling
Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`. Images: `img { width:100%; height:100%; object-fit:cover; }`.

- `.spotlight`: `position:fixed; width:100%; height:100svh; background-color: var(--bg); perspective:1000px; overflow:hidden;` — this **`perspective:1000px` is the camera** and is essential to the 3D depth. Over the flat ground it stacks three faint radial gradients (violet at 22%/18%, peach at 80%/26%, teal at 62%/84%) so the void has weather.
- Palette (P8 Nocturne Glass):
  ```css
  :root {
    --bg: #17141f;      /* plum-black */
    --ink: #f5f3f7;
    --dim: #a7a0b8;
    --accent: #8b5cf6;  /* violet */
    --accent-text: #a78bfa;
    --peach: #f0a884;
    --teal: #5eead4;
    --hairline: rgba(245, 243, 247, 0.14);
    --glass: rgba(255, 255, 255, 0.06);
    --glass-border: rgba(255, 255, 255, 0.15);
    --display: "Space Grotesk", sans-serif;
    --body: "Inter", sans-serif;
    --mono: "Space Mono", monospace;
  }
  ```
- `.tunnel`: `position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); transform-style:preserve-3d;` — centered in the stage; `preserve-3d` lets children live in real 3D space so their `translateZ` reads as depth.
- `.layer`: `position:absolute;` (no width/height — a pure transform group). Sits at the tunnel center; JS animates its `z` (translateZ).
- `.item`: `position:absolute; width:180px; height:220px; overflow:hidden;` — placed via inline `left`/`top`. Two more things live here:
  - **The plate keeps its colour.** No greyscale, no duotone, no blend-mode repaint. Just `.item img { filter: contrast(1.06) saturate(1.06); }` — a whisper, so the night stage doesn't flatten the photographs — plus a hue-neutral inner vignette that seats the plate in the dark:
    ```css
    .item::before {
      content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
      background: radial-gradient(120% 100% at 50% 45%, transparent 40%, rgba(23,20,31,.55) 100%);
    }
    ```
    A duotone is tempting here and it is the wrong instinct: it makes twelve different photographs interchangeable, which reads as a filter rather than as an archive. Let the frames be colour and build the night out of the ground, the mesh and the depth veil instead.
  - **The speed-smear transform**, driven entirely by CSS variables the ticker writes:
    ```css
    .item {
      transform: rotate(var(--tilt, 0deg))
                 scale(var(--stretch, 1), var(--squash, 1))
                 rotate(calc(-1 * var(--tilt, 0deg)));
      will-change: transform;
    }
    ```
    At rest the variables are `0deg / 1 / 1`, i.e. the identity transform, so the neutral pose is declared in CSS and the JS only ever supplies magnitude. `--tilt` is **static per plate** (written once at build time); `--stretch` / `--squash` are written per frame. The rotate–scale–unrotate sandwich is what makes the elongation follow the plate's own radial axis instead of the screen's X axis.
- `.item-overlay`: `position:absolute; inset:0; z-index:2; background: var(--bg); opacity:var(--overlay, 1); pointer-events:none;` — a plum-black rectangle over each image whose opacity is fed by the inherited `--overlay` variable (this is the depth fade).

Around the tunnel sits static chrome that never animates: a fixed `.vignette` (two linear gradients plus a radial, `pointer-events:none`, `z-index:5`) that closes the frame, and a `.chrome` layer with the wordmark, nav links and issue titles set in Space Grotesk / Space Mono. Both are `pointer-events:none` so they never eat the wheel.

## Building the tunnel (JS construction — do this before the ticker)

### Config constants
```js
const CONFIG = { totalImages: 12, scrollSpeed: 2, layerGap: 2500, lerp: 0.07, speedStretch: 0.3 };

// speed-smear tuning (module constants, not knobs)
const VELOCITY_LERP     = 0.12; // damped read of the velocity
const VELOCITY_REF      = 35;   // px/frame of lerped scroll that counts as "full speed"
const VELOCITY_DEADZONE = 0.4;  // px/frame below which the flight counts as stopped
const SQUASH_RATIO      = 0.45; // perpendicular pinch, as a fraction of the elongation
const MAX_DEFORM        = 0.6;  // hard ceiling on the elongation, whatever the config says
```

### Derived counts (compute exactly like this)
```js
const contentLayerCount = Math.ceil(CONFIG.totalImages / 4); // 3 unique rings of 4 images
const totalLayerCount   = Math.max(contentLayerCount, 6);    // 6 rings actually rendered (min 6)
const tunnelDepth       = totalLayerCount * CONFIG.layerGap;  // 15000  (the modulo wrap length)
const visibleDepth      = 3 * CONFIG.layerGap;               // 7500   (fade-in distance)
const exitPoint         = 1500;                              // where a ring "exits" past the lens
const initialScroll     = 750;                               // starting virtual-scroll offset
```
With 12 images and 4 per ring there are only **3 unique rings** of imagery, but **6 layers** are rendered; the image sets repeat (rings 0,1,2,then 0,1,2 again) so the tunnel is always populated.

### Layer + item generation loop
`tunnelEl` is appended to `.spotlight`. Then for `i` from `0` to `totalLayerCount-1`:
- Create a `.layer` div.
- `imageStartIndex = (i % contentLayerCount) * 4` → i:0→0, 1→4, 2→8, 3→0, 4→4, 5→8.
- For `j` from `0` to `3`:
  - `imageNumber = imageStartIndex + j + 1`; if `imageNumber > CONFIG.totalImages` **break**.
  - Place the item around an ellipse: `angle = (j/4) * Math.PI*2 - Math.PI/2` (starts at top, goes clockwise: top → right → bottom → left).
  - `radiusX = 400`, `radiusY = 280`.
  - `itemX = Math.cos(angle) * radiusX - 90` (the `-90` = half the 180px width, so the item is **centered** on the ellipse point).
  - `itemY = Math.sin(angle) * radiusY - 110` (the `-110` = half the 220px height).
  - The four resulting positions are: **top** `(-90, -390)`, **right** `(310, -110)`, **bottom** `(-90, 170)`, **left** `(-490, -110)`.
  - Build `.item` with inline `left:${itemX}px; top:${itemY}px;`, append an `<img>` (src = tunnel image `imageNumber`) and a `.item-overlay` div. Append item → layer.
  - Also write the **static** smear axis on the item, once, right here:
    ```js
    itemEl.style.setProperty("--tilt", `${(angle * 180) / Math.PI}deg`);
    ```
    `angle` is the same value that placed the item on the ellipse, and because CSS rotations are clockwise-positive in a Y-down coordinate system — exactly the convention `Math.sin(angle) → top` already uses — it converts straight to degrees with no sign flip. The four plates therefore get `-90deg / 0deg / 90deg / 180deg`: the top and bottom plates stretch vertically, the left and right plates horizontally, which is the direction each one really travels as the ring blows past the lens.
- Append layer → tunnel. Push `{ el: layerEl, baseZ: -i * CONFIG.layerGap }` into a `layerData` array. Ring 0 sits at z=0, ring 1 at −2500, … ring 5 at −12500 (marching away from the camera).

## GSAP effect (the important part — be exhaustive)

### 1. Virtual scroll accumulator (wheel-driven)
```js
let targetScroll  = initialScroll; // 750
let currentScroll = initialScroll; // 750
window.addEventListener("wheel", (e) => {
  targetScroll += e.deltaY * CONFIG.scrollSpeed; // scrollSpeed = 2
});
```
The page itself never scrolls (the stage is `position:fixed`, full viewport). Wheel deltas simply accumulate into `targetScroll`. Scrolling down (positive `deltaY`) increases the value and flies **forward** through the tunnel; scrolling up flies backward. There is no clamping — the value can grow unbounded, and the modulo wrap keeps depth in range.

### 2. Depth-driven overlay function
```js
function calculateOverlay(z) {
  if (z > exitPoint)     return 1;                 // z > 1500: past the lens → fully black
  if (z > 0)             return z / exitPoint;      // 0 < z < 1500: darkening as it exits (0 → 1)
  if (z > -visibleDepth) {                          // -7500 < z < 0: fading IN from the depths
    const progress = Math.abs(z) / visibleDepth;    // 1 (far) → 0 (at camera plane)
    return progress * progress;                     // QUADRATIC ease-in of the black veil
  }
  return 1;                                          // z <= -7500: too far → fully black
}
```
Interpretation of the veil opacity across depth:
- **Far field** (`z ≤ −7500`): overlay = 1, image is solid black.
- **Approach** (`−7500 → 0`): overlay eases from 1 down to 0 following `(|z|/7500)²`, so the image swells out of darkness and only becomes fully clear right at the camera plane (`z = 0`).
- **Fly-through** (`0 → 1500`): overlay ramps linearly 0 → 1, so the image darkens again as it blows past the lens.
- **Behind camera** (`z > 1500`): overlay = 1, black.

The visible "clear" band is therefore a thin slice around `z = 0`; only a couple of rings are legible at once, everything else fades to black — this is what sells the tunnel depth.

### 3. Velocity, not position — the speed smear

Read the deformation off **how fast the tunnel is moving**, never off where it is. This is the whole decision, and it is easy to get wrong in a way that looks fine on a still and terrible in motion:

- **Position-driven** (deform by `z`, or by `currentScroll`) makes each plate deform *because it arrived somewhere*. Stop scrolling mid-tunnel and the plates stay bent, frozen in a smear with nothing moving to justify it. Worse, on a modulo-wrapped tunnel the deformation would jump at the wrap point.
- **Velocity-driven** ties the smear to the only thing a smear can mean: motion. It builds while you scroll, saturates, and drains to nothing on its own the moment the flight settles — no cleanup tween, no state to reset.

```js
const stretchBudget = prefersReducedMotion
  ? 0
  : Math.max(0, Math.min(MAX_DEFORM, CONFIG.speedStretch));

let smoothedVelocity = 0;

// inside the ticker, before the layer loop:
const previousScroll = currentScroll;
currentScroll += (targetScroll - currentScroll) * CONFIG.lerp;

smoothedVelocity += (currentScroll - previousScroll - smoothedVelocity) * VELOCITY_LERP;
if (Math.abs(smoothedVelocity) < VELOCITY_DEADZONE) smoothedVelocity = 0;
const speed = Math.min(1, Math.abs(smoothedVelocity) / VELOCITY_REF);
```

Three details that are not optional:

1. **Take the velocity of the already-lerped value, then damp it again.** `currentScroll - previousScroll` is the true on-screen speed (the raw wheel deltas are not — the lerp swallows most of a notch). But a wheel arrives in spikes, so a second lerp at `0.12` is what turns a staircase of notches into a lean. One lerp is not enough; that is the difference between plates that *twitch* and plates that *stretch*.
2. **`Math.abs`.** Flying backwards smears exactly as much as flying forwards; the axis is the same, only the direction of travel flips, and a signed value would un-deform the plates halfway through a reversal.
3. **The deadzone.** Both lerps decay asymptotically and never actually reach zero, so without `VELOCITY_DEADZONE` the plates would sit forever a fraction of a percent off square and the browser would keep re-rasterising them. Snap the velocity to `0` and the neutral pose is genuinely neutral.

With `VELOCITY_REF = 35`, a slow drift lands around 7% elongation, an ordinary wheel scroll around 19%, and anything faster saturates at the ceiling — the curve tops out instead of running away on a trackpad fling.

### 4. The ticker loop (runs every frame)
```js
gsap.ticker.add(() => {
  // (a) lerp the virtual scroll toward the wheel target, then read its velocity (§3)
  const previousScroll = currentScroll;
  currentScroll += (targetScroll - currentScroll) * CONFIG.lerp; // lerp = 0.07 → heavy inertia/glide
  smoothedVelocity += (currentScroll - previousScroll - smoothedVelocity) * VELOCITY_LERP;
  if (Math.abs(smoothedVelocity) < VELOCITY_DEADZONE) smoothedVelocity = 0;
  const speed = Math.min(1, Math.abs(smoothedVelocity) / VELOCITY_REF);

  // (b) reposition every ring in depth and hand it its share of the smear
  layerData.forEach((layer) => {
    let z = layer.baseZ + currentScroll;                  // ring's raw depth
    z = ((z % tunnelDepth) + tunnelDepth) % tunnelDepth;  // wrap into [0, 15000) (handles negatives)
    z = z - tunnelDepth + exitPoint;                      // remap to [-13500, 1500): far behind → just past lens

    const overlay = calculateOverlay(z);

    // plates near the lens sweep across more screen per frame than plates still
    // in the fog, so they earn more of the smear (0 at the far plane → 1 at exit)
    const proximity = Math.min(1, Math.max(0, (z + visibleDepth) / (visibleDepth + exitPoint)));
    const deform = speed * stretchBudget * proximity;

    gsap.set(layer.el, {
      z: z,                                               // translateZ in px (the 3D depth)
      "--overlay": Math.min(1, Math.max(0, overlay)),     // clamp 0..1, fed to .item-overlay
      "--stretch": 1 + deform,                            // along the plate's --tilt axis
      "--squash": 1 - deform * SQUASH_RATIO,              // across it
      visibility: overlay >= 1 ? "hidden" : "visible",    // fully-black rings are hidden (perf + no z-fighting)
    });
  });
});
```
**Write `--stretch` / `--squash` on the LAYER, not on each plate.** The four plates of a ring share a depth, so they share a magnitude; only their static `--tilt` differs. Custom properties inherit, so one write per ring reaches four plates — six style writes a frame instead of twenty-four, and the per-plate axis still comes out right.

Key mechanics to reproduce exactly:
- **Lerp factor `0.07`** gives a long, floaty glide: after you stop scrolling, the tunnel keeps drifting and eases to rest. Do not replace with a direct assignment.
- **The three-step z math is the heart of the infinite loop.** `((z % tunnelDepth) + tunnelDepth) % tunnelDepth` is a positive modulo (JS `%` can go negative), wrapping any depth into `[0, 15000)`. Subtracting `tunnelDepth` and adding `exitPoint` re-centers that range to `[−13500, 1500)`, so as a ring's `z` crosses `1500` it seamlessly re-enters at `−13500` (deep in the fog) — a perfectly recycled, endless tunnel with no visible seam because those wrap points are always at overlay = 1 (black).
- `gsap.set` (not `.to`) — the tween is the ticker itself; each frame writes an absolute state. `z` maps to `translateZ`. The `--overlay` custom property is set on the `.layer`, and each child `.item-overlay` inherits it via `opacity:var(--overlay)`.
- `visibility:hidden` when overlay ≥ 1 removes fully-black rings from paint.
- **`proximity` is the one place position is allowed in.** It does not decide *whether* to smear (velocity does that); it only decides how the one global smear is distributed across depth, so a plate still in the fog does not streak as hard as one about to hit the lens. Multiply it in, never substitute it for the velocity.

No SplitText, no CustomEase, no ScrollTrigger, no timeline — the only easing is the manual `lerp = 0.07` interpolation of `currentScroll`, the `0.12` velocity lerp, and the quadratic overlay curve.

## Assets / images
**12 tunnel images**, each displayed in a fixed **180×220 px portrait frame with `object-fit:cover`** (the tunnel frame is ~**9:11 / ~4:5** portrait; the source files themselves vary from square-ish to tall portrait and are center-cropped to fill the frame). All twelve share one role — interchangeable **tunnel gallery frames**.

**Their colour is the point — pick it deliberately.** Nothing in the CSS repaints them, so the twelve frames are what the viewer actually sees, and the set has to hang together on its own. Choose photographs that are already lit the way the stage is: saturated colour out of deep shadow — neon and coloured gels, a light source inside the frame, black or near-black surroundings. The demo set is a night-shot editorial archive: a figure lit entirely in deep blue, a face against a red wall under an amber strip, a rain-slicked neon street, long-exposure light trails, a botanical macro on violet, an iridescent mineral.

Two failure modes to avoid. **Bright frames on white seamless** punch a hole in a dark tunnel — a product shot that works on a light page reads as a flashbulb here. **Greyscale or a duotone across the whole set** is the other one: it makes twelve photographs interchangeable and the tunnel stops being an archive and starts being a filter. Beyond palette, the tonal rules still hold: single clear subjects, real separation between light and dark, nothing so busy that it turns to noise at speed — and remember the plates are elongated up to ~25% at speed, so a frame that depends on precise geometry will visibly bend.

They are grouped 4 per ring across 3 unique rings, which repeat to fill 6 rendered layers. Provide 12 files named sequentially (`img1…img12`). If fewer are available, repeat them in order.

## Behavior notes
- **Wheel / trackpad only** — no ScrollTrigger, no click, no keyboard. On a device without wheel events the tunnel sits at the `initialScroll = 750` resting pose (still 3D, just static).
- **Infinite in both directions**: the modulo wrap means you can fly forward or backward forever.
- **Desktop-oriented**; sizing is in fixed px (radii 400/280, items 180×220) so the composition is tuned for a large viewport. No responsive breakpoints in the original.
- Stage height uses `100svh` so mobile browser chrome doesn't clip it.
- Motion is entirely user-driven (nothing autoplays), though the lerp glide continues briefly after input stops.
- **`prefers-reduced-motion: reduce` kills the smear, not the tunnel.** The flight itself is a direct response to the user's own wheel, so it stays; the deformation is the part that is decoration, and it is the part that goes. Read the query once at module scope and fold it into the budget (`stretchBudget = 0`), so the ticker simply never writes anything but the neutral `1 / 1`. Back it up in CSS with `@media (prefers-reduced-motion: reduce) { .item { transform: none; will-change: auto; } }` — belt and braces, and it also covers the case where the media query flips after mount.

## Images

This component ships with 12 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/3d-scroll-tunnel/img1.jpg
https://motionprompts.dev/c/3d-scroll-tunnel/img10.jpg
https://motionprompts.dev/c/3d-scroll-tunnel/img11.jpg
https://motionprompts.dev/c/3d-scroll-tunnel/img12.jpg
https://motionprompts.dev/c/3d-scroll-tunnel/img2.jpg
https://motionprompts.dev/c/3d-scroll-tunnel/img3.jpg
… 6 more under https://motionprompts.dev/c/3d-scroll-tunnel/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--dim`, `--accent`, `--hairline`, `--serif`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above is written as a `mount(CONFIG)` function that builds the tunnel and returns a `destroy()` that undoes it — the catalogue's own knob-editing runtime (`window.MP.register`) calls `mount` again with a new `CONFIG` whenever a knob moves, and relies on `destroy()` to fully retire the previous tunnel first. That shape already looks like an effect and its cleanup, which is unusual for this catalogue; the risk here isn't a missing lifecycle, it's that `destroy()`'s correctness is easy to trust more than it deserves. It gets three different kinds of thing right — a `gsap.ticker` subscription, three `window`-level listeners, and one appended DOM subtree — and none of those three are undone by the same mechanism, so a partial port that only reaches for `gsap.context` and stops there silently drops two of them.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Two live `mount` calls without both `destroy()`s running means two `.tunnel` elements stacked inside `.spotlight`, two `tick` callbacks both pulling the same `currentScroll` toward the same `targetScroll` — so the glide moves at roughly double speed — and two `wheel` listeners on `window` each adding their own `e.deltaY * CONFIG.scrollSpeed` to that target on every scroll tick. None of this reproduces in a production build, because only development does the double mount. Treat `destroy()` as the effect's cleanup, not as editor-only plumbing that a React consumer can skip.

*(1) The entry point* — Ignore the `window.MP.register` branch; it exists so this catalogue's own editor can remount the tunnel with different knobs and has no equivalent in a consuming app. The branch that matters is the other one, and it's the guarded form: it checks `document.readyState` before subscribing to `DOMContentLoaded`, a guard against being loaded late into a plain document. `useEffect` already runs after the DOM is committed, so both the guard and the listener are dead weight. Drop them, and put the body of `mount` — the layer/item construction loop, the three `window` listeners, and the `gsap.ticker.add(tick)` call — directly inside a `useEffect` with an empty dependency array, called with the default `CONFIG` object (or props) in place of whatever `window.MP` would have supplied.

*(2) Element lookups* — `mount` finds its attachment point with `document.querySelector(".spotlight")` and then never queries the document again — `tunnelEl`, the six `.layer` divs and their `.item` children are all built and appended by direct reference. So there is exactly one unscoped lookup in the whole file, and it's the one that decides which `<section>` gets a tunnel appended into it. Give the component a root `ref` on the element playing `.spotlight`'s role, read it as `rootRef.current` instead of querying by class, and append `tunnelEl` there. During the StrictMode remount two `.spotlight` sections exist for an instant; a class-name lookup can bind to the outgoing copy and build a tunnel whose `destroy()` will run against a node that already left the DOM.

*(3) Cleanup* — Wrap the construction loop in a `gsap.context` scoped to the root ref, but budget your attention correctly: this component makes exactly one synchronous GSAP call at setup (`gsap.ticker.add(tick)`), and per the rule above a ticker subscription is not something `ctx.revert()` reaches. Every other GSAP call — the per-frame `gsap.set(layer.el, { z, "--overlay": …, "--stretch": …, "--squash": …, visibility })` inside `tick` — happens later, once per frame, driven by the ticker rather than by the context's own synchronous execution window, so the context has nothing of substance to undo here beyond whatever inline styles a straggling `gsap.set` might leave behind. The load-bearing teardown is the explicit block the original `destroy()` already contains, and it has to survive the port unchanged:

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    /* build tunnelEl, the six layers, and their items — exactly
       as the construction loop above does */
  }, rootRef);

  window.addEventListener("wheel", onWheel);
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    gsap.killTweensOf(layerData.map((l) => l.el));
    ctx.revert();
    tunnelEl.remove();
  };
}, []);
```

Four calls, four different reasons, and dropping any one of them leaves something running: `gsap.ticker.remove(tick)` stops the ring-repositioning loop — miss it, and a destroyed mount's `tick` keeps writing `z` and `--overlay` onto `layerData` elements a remounted copy no longer controls, forever, since the ticker is global and outlives any single component instance. The three `removeEventListener` calls stop `onWheel`, `onTouchStart` and `onTouchMove` from continuing to fatten `targetScroll` on behalf of a tunnel nobody can see — none of these are GSAP calls, so no context reaches them. `gsap.killTweensOf(layerData.map((l) => l.el))` is the original script's guard against a `gsap.set` that's already in flight when `destroy()` runs; keep it ahead of the removal that follows. And `tunnelEl.remove()` has to stay explicit: `ctx.revert()` reverts inline styles and tweens GSAP wrote and unwinds anything registered through `ctx.add()`, but it does not remove DOM nodes you appended by hand with `appendChild` — `tunnelEl` and its six layers stay in `.spotlight` forever unless this call removes them itself. The test of a correct adaptation isn't that the tunnel looks right on first load — it's that you can navigate away from this route and back and find exactly one `tick` subscribed to the ticker, one set of listeners on `window`, and one `.tunnel` element, not an accumulating stack of each.
