# Circular Image Gallery — Radial Ring with Click-to-Focus

## Goal
Build a full-viewport, minimal editorial page where, **on load**, 15 small portrait image tiles **fly out from the exact center of the screen and arrange themselves into a perfect circle** — each tile scaling up from nothing, sliding to its spot on the ring, and rotating so it sits like a petal/clock-numeral along its radial spoke, all with a staggered decelerating entrance. **Clicking any tile** makes every other tile shrink away to nothing and the chosen tile glides back to the center and **scales up 5×** to become a hero image; **clicking it again** sends it back to its ring position and pops all the others back in. The star effect is this GSAP-timeline **radial fan-out** plus the **click-to-focus zoom / restore**.

## Tech
Vanilla HTML/CSS/JS with ES-module imports. Use **`gsap`** (npm) only — **no plugins, no ScrollTrigger, no smooth-scroll, no other libraries**. Ship one `index.html`, one `styles.css`, one ES-module `script.js` (`<script type="module" src="./script.js">`). It must run in a fresh Vite + npm project. `import gsap from "gsap";` is the single import.

## Layout / HTML
Dead-simple, static skeleton — the JS injects the `<img>` into each tile at runtime, so the markup ships **15 empty `.item` divs**:

```html
<body>
  <nav>
    <span class="wordmark">Fieldbook</span>
    <span class="label">Issue 08 <em>·</em> Spring</span>
  </nav>
  <footer>
    <span class="label">Photographed March–May</span>
    <span class="label hint">Click a picture to bring it forward</span>
  </footer>
  <div class="container">
    <div class="plaque" aria-hidden="true">        <!-- engraved plate at the centre of the ring -->
      <span class="plaque-no">No. 08</span>
      <h1>The green<br />hour</h1>
      <p>Pictures of the season: meadows, glasshouses, first light.</p>
    </div>
    <div class="gallery">
      <div class="item"></div>
      <!-- exactly 15 identical .item divs -->
    </div>
  </div>
  <script type="module" src="./script.js"></script>
</body>
```

- `nav` / `footer` — fixed UI chrome pinned to the top and bottom edges.
- `.container` — the full-screen stage the tiles live in; **`overflow: hidden`** so tiles that scale up 5× are clipped to the viewport.
- `.gallery > .item ×15` — the tiles. Each starts stacked at the dead center of the container; JS gives each one an `<img>` and animates it out onto the ring.

## Styling

**Reset:** `* { margin:0; padding:0; box-sizing:border-box; }`

**Page / typography**
```css
:root {
  --paper: #f2efe6;      /* the wall */
  --edge: #e5e2d3;       /* its shaded corners */
  --ink: #20241c;        /* dark olive-black type */
  --olive: #3a4034;
  --chartreuse: #d5e14e; /* the one accent: the daylight pool and the small chips */
}
html, body { width:100%; height:100vh; font-family:"Inter", system-ui, sans-serif; background: var(--paper); color: var(--ink); }
```
**Inter** for body, **Space Grotesk** for the wordmark and the plaque headline, **Space Mono** for the 11px uppercase labels. Two extra layers make the stage read as a room rather than a screen:
- `body` stacks a chartreuse `radial-gradient(closest-side at 50% 46%, …)` daylight pool over a `radial-gradient(120% 120% at 50% 50%, var(--paper) 55%, var(--edge) 100%)` vignette.
- `body::after` is a fixed, `pointer-events:none`, `opacity:.09` `mix-blend-mode: multiply` film-grain tile drawn with an inline `feTurbulence` SVG data URI.

**Fixed chrome (nav + footer)**
```css
nav, footer {
  position:fixed; left:0; width:100%;
  display:flex; justify-content:space-between; align-items:baseline;
  padding:1.75rem 2.25rem; z-index:3;
}
nav    { top:0; }
footer { bottom:0; }
```
Two items each, pushed to the far left and far right (space-between): a Space Grotesk wordmark plus small Space Mono labels. The `.hint` label carries a chartreuse dot drawn with `::before`. Neutral placeholder copy for a fictional photo annual ("Fieldbook") — no real brand marks.

**Stage**
```css
.container { position:relative; width:100%; height:100%; overflow:hidden; }
```

**Tile**
```css
.item {
  position:absolute;
  top:50%; left:50%;
  transform:translate(-50%,-50%);   /* every tile starts centered */
  width:70px; height:100px;         /* portrait 7:10 */
  padding:5px 5px 13px;             /* the print border: wider at the foot, like a photo print */
  background:linear-gradient(175deg, #fdfcf7 60%, #e9e9dc 100%);
  border-radius:1px;
  margin:10px; z-index:2; cursor:pointer;
}
img { width:100%; height:100%; object-fit:cover; }  /* fills the tile, center-cropped */
```
Key facts the effect depends on: tiles are **absolutely positioned, all initially anchored at `top:50% / left:50%` with a `translate(-50%,-50%)`** (so they overlap in a stack at the center before animating), and they are **70×100px portrait** rectangles. The pale gradient is the print border, not a placeholder — the injected `<img>` sits inside the padding, so each tile reads as a small photographic print rather than a bare rectangle.

Behind the ring sits the `.plaque` (centred, `pointer-events:none`, `z-index:1`) — the issue number in a chartreuse chip, a Space Grotesk headline and one line of copy. It never animates; the ring opens around it.

## The GSAP effect (be exhaustive — this is the whole component)

Everything runs from a single `window.onload` handler. There is **one entrance timeline** on load and **imperative `gsap.to()` tweens** on click. Reproduce the constants, geometry and tween params exactly.

### Setup constants
```js
const items          = document.querySelectorAll('.item');   // 15 tiles
const container      = document.querySelector('.container');
const numberOfItems  = items.length;                         // 15
const angleIncrement = (2 * Math.PI) / numberOfItems;        // even angular spacing around the full circle
const radius         = 300;                                  // ring radius in px
let   isGalleryOpen  = false;                                // guards click state

const centerX = container.offsetWidth  / 2;                  // pixel center of the stage
const centerY = container.offsetHeight / 2;

const tl = gsap.timeline();                                  // the entrance timeline
```

### Per-tile geometry (computed in a `forEach(item, index)` loop)
For each tile, **inject its image** (`const img = document.createElement('img'); img.src = <indexed path, e.g. img{index+1}.jpg>; item.appendChild(img);`), then compute its resting place on the ring:
```js
const angle           = index * angleIncrement;               // 0 → 2π across the 15 tiles
const initialRotation = (angle * 180 / Math.PI) - 90;         // tile's tilt IN DEGREES: radian angle → deg, minus 90
const x = centerX + radius * Math.cos(angle);                 // target left (px) on the circle
const y = centerY + radius * Math.sin(angle);                 // target top  (px) on the circle
```
The `−90°` rotation makes each tile's long (vertical) axis line up with its **radial spoke**, so the ring reads like petals / the numerals on a clock face fanning around the center.

### Entrance animation (on load) — the star moment
Before animating, hard-set every tile to invisible size: `gsap.set(item, { scale: 0 });`. Then add each tile's tween to the shared timeline **at an explicit position** so they cascade:
```js
tl.to(item, {
  left: x + 'px',              // 50% (center) → its ring X
  top:  y + 'px',              // 50% (center) → its ring Y
  rotation: initialRotation,   // 0 → its radial tilt
  scale: 1,                    // 0 → 1 (grows in)
  duration: 1,
  ease: "power2.out",
  delay: 1,                    // each tween also waits 1s
}, index * 0.1);               // ← timeline position param = 0.1s stagger between tiles
```
Critical details:
- The **stagger is produced by the position parameter `index * 0.1`** (not GSAP's `stagger` option): tile 0 is placed at t=0, tile 1 at t=0.1, … tile 14 at t=1.4 on the timeline.
- Each tween **additionally** carries `delay: 1`, so the first tile actually starts moving at ~1s and the last finishes at ~`1.4 + 1(delay) + 1(dur)` ≈ **3.4s**. Budget ~3s before the ring is settled.
- All four properties animate together per tile: it **scales 0→1, slides from screen-center to its (x,y) on the ring, and rotates 0→`initialRotation`**, on a `power2.out` (fast start, soft settle). Net look: tiles burst out of the middle and spin into a clean circle one after another.

### Click a tile → focus / zoom to center
Attach a `click` listener to each tile (inside the same loop, so it closes over that tile's `x`, `y`, `initialRotation`). On click, **only if `!isGalleryOpen`**:
1. Set `isGalleryOpen = true`.
2. **Clone the clicked tile**: `const duplicate = item.cloneNode(true); duplicate.style.position = 'absolute'; container.appendChild(duplicate);` — the original and this duplicate are animated together as a pair for the rest of the focus sequence.
3. **Shrink all the other tiles away**:
   ```js
   gsap.to(Array.from(items).filter(i => i !== item), {
     scale: 0, duration: 0.5, ease: "power2.in", stagger: 0.05
   });
   ```
4. **Normalize the rotation** so the focus move takes the short way round, then snap it instantly:
   ```js
   const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;
   gsap.to([item, duplicate], {
     rotation: endRotation,
     duration: 0.0001,             // effectively instant
     onComplete: () => {
       gsap.to([item, duplicate], {
         left: "50%",
         top:  "50%",
         transform: "translate(-50%, -50%) scale(5)",  // ← animated as a raw CSS transform string, scale ×5
         duration: 1,
         ease: "power2.out",
         delay: 1.25               // waits 1.25s (lets the others finish collapsing) before flying in
       });
     }
   });
   ```
   So after a ~1.25s beat the chosen tile (and its clone, stacked on top) **glides back to dead-center and scales up 5×**, filling the stage as a hero image (clipped by the container's `overflow:hidden`).

### Click again → restore the ring
Define a `closeGallery` handler and attach it to **both** the original tile and the duplicate (`item.addEventListener('click', closeGallery); duplicate.addEventListener('click', closeGallery);`). On this second click, if `isGalleryOpen`:
```js
gsap.to([item, duplicate], {
  left: x + 'px',                 // back to its ring X
  top:  y + 'px',                 // back to its ring Y
  scale: 1,                       // 5 → 1
  rotation: initialRotation,      // back to its radial tilt
  duration: 1,
  ease: "power2.out",
  onComplete: () => {
    duplicate.remove();           // discard the clone
    gsap.to(items, {              // pop every tile back in
      scale: 1, duration: 1, stagger: 0.05, ease: "power2.out"
    });
    isGalleryOpen = false;        // re-arm for the next click
  }
});
```
Net: the hero tile shrinks and travels back to its slot on the ring, the clone is removed, and all the collapsed tiles scale `0→1` back into place with a 0.05s stagger.

### Motion summary
- **Entrance:** `power2.out`, per-tile `duration:1`, `delay:1`, positioned at `index*0.1` → radial burst that settles in ~3.4s.
- **Collapse others:** `power2.in`, `duration:0.5`, `stagger:0.05`.
- **Focus in:** `power2.out`, `duration:1`, `delay:1.25`, scale ×5 to center.
- **Restore:** `power2.out`, `duration:1`; then others back with `stagger:0.05`, `duration:1`, `power2.out`.

## Assets / images
**15 images**, each filling the same role — one photo per tile in the ring, injected via an indexed path pattern (`…/img1.jpg` … `…/img15.jpg`). Displayed in a **70×100px portrait tile (~7:10, close to 2:3)** with `object-fit:cover`, so they are **center-cropped** and, in focus mode, scaled up 5× to roughly fill the screen — so the central subject and tonal contrast matter more than resolution.

Curate an **eclectic but tonally cohesive, moody art-directed editorial set**: a mix of cinematic figures (a lone silhouette walking toward light between towering slabs; an astronaut before a giant pale sphere in golden haze; a hand pressed to backlit frosted glass), fashion/beauty portraits (low-key studio headshots, a face behind a pale tulle veil, oversized futuristic wraparound sunglasses on a warm ground), surreal 3D renders (a chrome robotic figure in mirrored shades, a smooth faceless figure lit green), still lifes (red roses on black; a golden lucky-cat figurine in a red niche), and atmospheric landscapes (a hazy sunset skyline; a figure on calm water at dusk). Dominant palette: deep teals, warm oranges/golds, moody blues, greys and blacks with occasional saturated accents. Portrait, center-croppable framing. **No real brand imagery or client logos.**

## Behavior notes
- **Trigger model:** entrance is on `window.onload`; focus/restore is **click** (toggle). No scroll, hover, mousemove, or keyboard interaction; no ScrollTrigger.
- **Single-focus lock:** `isGalleryOpen` guards the state — while one tile is focused, clicking other tiles does nothing until you click the focused tile (or its clone) to restore.
- **Geometry is measured at load** from `container.offsetWidth/offsetHeight`; the ring is not recomputed on resize (no resize handler).
- **The clone quirk is intentional:** the focused tile is duplicated and the pair is animated together; the clone is removed only on restore. Reproduce it as-is.
- No reduced-motion branch, no infinite loops or timers — motion only occurs on load and on click. Lightweight and mobile-safe (15 tiles, no WebGL/canvas).

## Images

This component ships with 15 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/circular-img-gallery/img1.jpg
https://motionprompts.dev/c/circular-img-gallery/img10.jpg
https://motionprompts.dev/c/circular-img-gallery/img11.jpg
https://motionprompts.dev/c/circular-img-gallery/img12.jpg
https://motionprompts.dev/c/circular-img-gallery/img13.jpg
https://motionprompts.dev/c/circular-img-gallery/img14.jpg
… 9 more under https://motionprompts.dev/c/circular-img-gallery/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--paper`, `--edge`, `--ink`, `--olive`, `--chartreuse`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. This component is more exposed to that than most, because the entrance timeline and the click handlers both do more than tween existing markup: each of the 15 `.item` tiles gets its `<img>` appended by the script itself, and every click that opens the gallery appends a `cloneNode(true)` duplicate of the clicked tile into `.container`. Setup that runs twice with teardown that runs never leaves you two `<img>` tags per tile, two `click` listeners racing on the same tile (so one tap fires two focus sequences, each building its own duplicate and its own `isGalleryOpen` flag), and duplicates from an aborted focus that nothing ever removes. None of this reproduces in a production build, because React only double-invokes effects in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The bootstrap waits for the window `load` event, short-circuited by a `readyState === "complete"` check for the case where the page has already finished loading by the time the script runs — it wants every image and font settled before the ring bursts open. `useEffect` fires far earlier than that, at commit, right after the 15 empty `.item` divs land in the DOM. Nothing this component actually measures depends on that wait: `radius` comes from `window.innerWidth`/`innerHeight`, and `centerX`/`centerY` come from `container.offsetWidth`/`offsetHeight` — both settled by CSS the moment `.container` paints, since it is sized off the viewport and each `.item` is a hard-coded 70×100px box regardless of what its injected `<img>` ends up showing. The wait exists to keep the burst from firing over a half-painted page, not to get correct numbers, so preserve that intent but make it cancellable — a StrictMode unmount that lands before `load` fires must not leave a listener that appends a 16th `<img>` into a tile no live component owns anymore:

```jsx
useEffect(() => {
  let cancelled = false;
  const onReady = () => {
    if (cancelled) return;
    // build the ring here: inject each <img>, run the entrance timeline, wire the clicks
  };
  if (document.readyState === "complete") onReady();
  else window.addEventListener("load", onReady);
  return () => {
    cancelled = true;
    window.removeEventListener("load", onReady);
  };
}, []);
```

*(2) Element lookups* — `document.querySelectorAll(".item")` for the 15 tiles and `document.querySelector(".container")` for the stage both assume this component owns the page. Give the component a root `ref`, render it on the element that plays the `.container` role, and resolve both off `rootRef.current`. Unscoped selectors are not a style nit for this component specifically: `centerX`/`centerY` are measured once, off `container.offsetWidth`/`offsetHeight`, and an unscoped query resolved during the instant a StrictMode remount leaves two copies of the tile grid in play can land on the copy that is on its way out, before it is removed from the flow — every ring position computed from that measurement is then wrong for the copy that actually stays.

*(3) Cleanup — GSAP* — Wrap the `gsap.timeline()`, the per-tile `gsap.set(item, { scale: 0 })`, and every click-triggered `gsap.to()` in a `gsap.context` scoped to the root ref, and revert it in the cleanup:

```jsx
useEffect(() => {
  let cancelled = false;
  let ctx;
  const onReady = () => {
    if (cancelled) return;
    ctx = gsap.context((self) => {
      /* inject the <img>s, gsap.set the tiles to scale 0, build the
         entrance timeline, and wire the click handlers — see below */
    }, rootRef);
  };
  if (document.readyState === "complete") onReady();
  else window.addEventListener("load", onReady);
  return () => {
    cancelled = true;
    window.removeEventListener("load", onReady);
    ctx?.revert();
  };
}, []);
```

`ctx.revert()` undoes the entrance timeline, every tween it tracked, and the inline `left`/`top`/`transform`/`rotation` styles GSAP wrote onto the tiles. It does not undo what this component does with plain DOM APIs: the 15 `<img>` elements built with `document.createElement("img")` and appended to each `.item`, or the `cloneNode(true)` duplicate appended to `.container` while a tile is focused. Track those the way the reference implementation already does — the `added` array it pushes every injected node onto — and remove every one of them yourself, after `ctx.revert()`, in the same cleanup. Skip the duplicate specifically and a user who unmounts mid-focus (the route changes while a tile is sitting at 5x scale in the center) leaves an orphaned clone parked inside a `.container` no component manages anymore.

The click handlers need the named-registration overload of `self.add`, not a bare `gsap.to()` written straight inside the listener. The tweens a click produces — shrinking the other 14 tiles, snapping the rotation, flying the chosen tile to center at 5x, and later the reverse sequence on the second click — do not run during the synchronous pass through the `gsap.context` factory; they run whenever a tile happens to get clicked, arbitrarily long after that pass returned. A tween created that late is invisible to the context, so `ctx.revert()` on an unmount that happens mid-focus would leave the fly-to-center tween running and its inline `transform` behind. Register the focus and restore sequences once, by name, and have each tile's own listener call them by name:

```jsx
ctx = gsap.context((self) => {
  let isGalleryOpen = false;
  // ...entrance timeline built here, exactly as above...

  self.add("focusTile", (item, duplicate, x, y, endRotation) => {
    // shrink the other 14 tiles, snap the rotation, then fly [item, duplicate] to center at 5x
  });
  self.add("restoreTile", (item, duplicate, x, y, initialRotation) => {
    // fly [item, duplicate] back to (x, y), remove(duplicate), then pop the rest back in
  });

  items.forEach((item, index) => {
    // ...compute x, y, initialRotation exactly as above...
    item.addEventListener("click", () => {
      if (isGalleryOpen) return;
      isGalleryOpen = true;
      const duplicate = item.cloneNode(true);
      container.appendChild(duplicate);
      addedNodes.push(duplicate);
      const endRotation = initialRotation > 180 ? initialRotation - 360 : initialRotation;
      ctx.focusTile(item, duplicate, x, y, endRotation);
    });
  });
}, rootRef);
```

Two mistakes make this fragile if rushed. First, inside the factory `self` is safe to touch immediately but the outer `ctx` is not: `const ctx = gsap.context(...)` has not finished assigning while its own factory argument is still executing, so a reference to `ctx` written directly in that synchronous pass throws before initialization. The `ctx.focusTile(...)` call above is fine only because it sits inside a `click` callback that fires later, well after `ctx` has been assigned — never call `ctx` from code that runs while the factory itself is still on the stack. Second, `self.add` has two overloads that do different things: called with a single function, it runs that function immediately, inside the context, and hands it the context object as its only argument — not a tile. That form is for attributing something you build right now; the name-plus-function form used above is the one that defers to a later call.
