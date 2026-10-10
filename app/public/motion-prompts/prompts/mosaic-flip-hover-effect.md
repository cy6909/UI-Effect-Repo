# Mosaic Flip Hover Effect — 3D Cube-Tile Image Reveal

## Goal
Build a dark, full-viewport "spotlight" screen showing a single image rendered as a **12×9 mosaic of 3D cubes** (108 tiles). At rest every tile **gently floats back and forth on the z-axis** in an endless, individually-randomized "breathe" loop, so the mosaic shimmers with depth. A small project menu sits in the bottom-right corner. **Hovering a project name flips the entire mosaic**: all 108 tiles rotate 180° on `rotateY` with a **center-out grid stagger**, and the hovered project's image is revealed on the cubes' previously-hidden back faces. Hovering another name flips again to that image; leaving the menu flips back to the default image. The star effect is the coordinated center-out cube-flip that swaps a full sliced image across the whole grid.

## Tech
Vanilla HTML/CSS/JS with ES-module imports. Use **`gsap`** (npm) only — **no GSAP plugins, no ScrollTrigger, no Lenis, no Three.js**. GSAP drives both the per-tile z-float loop and the grid-staggered `rotateY` flip. Ship one `index.html` (`<link rel="stylesheet" href="./styles.css">` and `<script type="module" src="./script.js">`), one `styles.css`, one ES-module `script.js`. Must run in a fresh Vite + npm project.

## Layout / HTML
The mosaic tiles and their faces are **built entirely in JS** — the HTML only ships the empty preview container and the menu.

```html
<section class="spotlight">
  <div class="project-preview"></div>

  <nav class="project-list">
    <a data-index="1">NX-09</a>
    <a data-index="2">1997 Hallway Tape</a>
    <a data-index="3">Deep Space</a>
    <a data-index="4">Sleep Phase Anomaly</a>
    <a data-index="5">Still-life.mov</a>
    <a data-index="6">Monoform™</a>
  </nav>
</section>
<script type="module" src="./script.js"></script>
```

- `.project-preview` is the empty grid host; JS injects 108 `.tile` elements into it.
- The menu has **6 anchors**, each with a **`data-index`** of 1–6 that maps to one project image. Labels are neutral fictional demo names (as above) — no real brands.

## Styling

**Font** (Google Fonts): **`"DM Mono"`** weights 400 & 500 (used for the menu).

**Palette**
- Section background: `#171717` (near-black).
- Cube top/bottom faces: solid `#222` (dark grey — the only non-image faces).
- Menu text: `#ffffff`, rest opacity `0.5`, hover/active opacity `1`.

**Reset**: `* { margin:0; padding:0; box-sizing:border-box; }`.

**Section (3D stage)** — the perspective root:
```css
.spotlight{
  position:relative; width:100%; height:100svh; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
  background:#171717;
  perspective:800px;             /* the camera */
  transform-style:preserve-3d;
}
```

**Preview grid** — a fixed 12×9 CSS grid of 60px cells (total **720×540 px**, a **4:3** frame), centered by the flex parent:
```css
.project-preview{
  display:grid;
  grid-template-columns:repeat(12, 60px);
  grid-template-rows:repeat(9, 60px);
  transform-style:preserve-3d;
}
```

**Tile (the cube)** — one per grid cell:
```css
.tile{ width:60px; height:60px; position:relative; transform-style:preserve-3d; will-change:transform; }
```

**Cube faces** — six per tile, each a 60×60 image slice; `backface-visibility:hidden` is essential so a face is invisible while it points away from the camera:
```css
.tile-face{ position:absolute; width:60px; height:60px; background-size:cover; background-position:center; backface-visibility:hidden; }
.face-front  { transform: translateZ(30px); }
.face-rear   { transform: rotateY(180deg) translateZ(30px); }
.face-right  { transform: rotateY(90deg)  translateZ(30px); }
.face-left   { transform: rotateY(-90deg) translateZ(30px); }
.face-top    { transform: rotateX(90deg)  translateZ(30px); }
.face-bottom { transform: rotateX(-90deg) translateZ(30px); }
```
(Half-depth of 30px on every face → a **60px cube**. `background-size`/`background-position` are overwritten inline by JS to place each tile's image slice.)

**Menu** — pinned bottom-right, vertical, right-aligned:
```css
.project-list{ position:absolute; bottom:3rem; right:3rem; display:flex; flex-direction:column; z-index:10; }
.project-list a{
  color:#fff; text-transform:uppercase; font-family:"DM Mono",sans-serif; font-size:1rem;
  text-decoration:none; padding:0.125rem 0; cursor:pointer; opacity:0.5;
  transition:opacity 0.3s; text-align:right;
}
.project-list a:hover, .project-list a.active{ opacity:1; }
```

## GSAP effect (be exhaustive)

### Constants & data
```js
import gsap from "gsap";

const TILES_X = 12, TILES_Y = 9, TILE_SIZE = 60;
const PREVIEW_WIDTH  = TILES_X * TILE_SIZE;   // 720
const PREVIEW_HEIGHT = TILES_Y * TILE_SIZE;   // 540

const TILE_FACES = ["face-front","face-rear","face-right","face-left","face-top","face-bottom"];

// index 0 = default/rest image; indices 1..6 = the six projects (data-index)
const PROJECT_IMAGES = [ "<default.jpg>", "<img1>", "<img2>", "<img3>", "<img4>", "<img5>", "<img6>" ];
```

### Build the mosaic (nested loop, row-major)
For `row` 0..8, `col` 0..11: create `div.tile`, then create the six `div.tile-face` children (`class = "tile-face " + side`), append, and store a tile record `{ element, faces{side→el}, row, col }`. Append each tile to `.project-preview` and push to a `tiles[]` array (108 records).

### Image slicing — `setTileImage(tile, side, imagePath)`
Each face shows only **its** 60×60 window of the full image, so the assembled grid reconstructs one picture:
```js
face.style.backgroundImage    = `url(${imagePath})`;
face.style.backgroundSize      = `${PREVIEW_WIDTH}px ${PREVIEW_HEIGHT}px`;   // 720×540 — the whole image
face.style.backgroundPosition  = `${-(tile.col*TILE_SIZE)}px ${-(tile.row*TILE_SIZE)}px`;  // shift to this tile's slice
```

**Initial faces:** for every tile call `setTileImage` with `PROJECT_IMAGES[0]` on `face-front`, `face-rear`, `face-right`, `face-left`; set `face-top` and `face-bottom` backgrounds to solid `#222`. (So at rest you see the default image on the front faces; the grey top/bottom flash only during a flip.)

### Endless z-float — `breathe(tileElement)`
A self-recursive tween per tile makes each cube drift toward/away from the camera forever, each with its own random target and speed:
```js
function breathe(el){
  gsap.to(el, {
    z: gsap.utils.random(-40, 40),          // translateZ, random each cycle
    duration: gsap.utils.random(0.6, 1.4),  // random each cycle
    ease: "sine.inOut",
    onComplete: () => breathe(el),           // loop forever
  });
}
tiles.forEach((tile, i) => gsap.delayedCall(i * 0.015, () => breathe(tile.element)));
```
- Kickoff is **staggered by `i * 0.015s`** (row-major index), so the tiles don't pulse in unison — the mosaic ripples.
- `z` (translateZ) and `rotateY` (the flip) are independent transform channels on the same `.tile`, so floating and flipping run simultaneously without conflict.

### Reveal state
```js
let activeProject = 0;   // currently-shown image index
let revealCount   = 0;   // how many flips have happened (parity picks the hidden face)
let isRevealing   = false;
let nextProject   = null; // queued request while a flip is mid-flight
let hoverDelay    = null; // setTimeout handle (hover debounce)

const getHiddenFace = () => (revealCount % 2 === 0 ? "face-rear" : "face-front");
```
The mosaic alternates which face points at the camera every flip: after an even number of flips the **front** is showing (so **rear** is hidden), after an odd number the **rear** is showing (so **front** is hidden). `getHiddenFace()` returns the one currently facing away — that's where we paint the incoming image.

### `revealProject(projectIndex)` — the flip
Guards (in order):
1. `if (projectIndex === activeProject && !isRevealing) return;`
2. `if (isRevealing){ nextProject = projectIndex; return; }`  ← queue, don't interrupt a flip in progress.
3. `if (projectIndex === activeProject) return;`

Then:
```js
isRevealing = true; nextProject = null;
const hiddenFace = getHiddenFace();

// paint the incoming image onto the hidden face of every tile...
tiles.forEach(t => setTileImage(t, hiddenFace, PROJECT_IMAGES[projectIndex]));
// ...and reset the side faces to the default image (they're briefly visible mid-rotation)
tiles.forEach(t => { setTileImage(t,"face-right",PROJECT_IMAGES[0]); setTileImage(t,"face-left",PROJECT_IMAGES[0]); });

revealCount++;
activeProject = projectIndex;

gsap.to(".tile", {
  rotateY: revealCount * 180,     // absolute target — accumulates 180° each flip (0→180→360→…)
  duration: 0.5,
  ease: "power3.inOut",
  stagger: { each: 0.05, from: "center", grid: [TILES_Y, TILES_X] },  // [9,12] — radiates from grid center
  onComplete: () => {
    isRevealing = false;
    if (nextProject !== null && nextProject !== activeProject) revealProject(nextProject);
  },
});
```
Key points:
- **Absolute accumulating target:** `rotateY: revealCount*180` (not `"+=180"`). Because the hidden (back) face was just repainted, rotating the cube a half-turn brings that fresh image to the camera while `backface-visibility:hidden` hides the outgoing one.
- **Center-out stagger:** `stagger.from:"center"` with `grid:[9,12]` and `each:0.05` — tiles nearest the grid center flip first, the wave expanding outward; total spread ≈ half the grid's diagonal × 0.05s.
- **Flip:** `duration:0.5`, `ease:"power3.inOut"` (snappy ease-in-out half-turn).
- **Queue drain:** if the user hovered another name mid-flip, the `onComplete` immediately fires the queued `nextProject`.

### Menu wiring (hover, debounced 50ms)
```js
const links = document.querySelectorAll(".project-list a");
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    const idx = parseInt(link.dataset.index);
    clearTimeout(hoverDelay);
    hoverDelay = setTimeout(() => revealProject(idx), 50);
  });
});
document.querySelector(".project-list").addEventListener("mouseleave", () => {
  links.forEach(l => l.classList.remove("active"));
  clearTimeout(hoverDelay);
  hoverDelay = setTimeout(() => revealProject(0), 50);   // flip back to the default image
});
```
- Each `mouseenter` marks its link `.active` (opacity → 1) and schedules a reveal **50ms later**; the `clearTimeout` debounce means sweeping the cursor across several names only triggers the one you land on.
- `mouseleave` on the whole list clears the active state and flips the mosaic **back to `PROJECT_IMAGES[0]`** (project index 0).

### Timing / easing summary
| Action | property | from → to | duration | ease | stagger / delay |
|---|---|---|---|---|---|
| z-float (per tile, looped) | `z` (translateZ) | current → random −40..40px | random 0.6–1.4s | `sine.inOut` | kickoff `i×0.015s`; loops via `onComplete` |
| grid flip | `rotateY` | `(n−1)×180°` → `n×180°` | 0.5 | `power3.inOut` | `each:0.05`, `from:"center"`, `grid:[9,12]` |
| hover debounce | — | — | — | — | `setTimeout` 50ms |
| menu opacity | `opacity` (CSS) | 0.5 → 1 | 0.3s (CSS transition) | — | — |

## Assets / images
**6 full-bleed images, each a 4:3 landscape** (rendered at 720×540 and sliced across the 12×9 grid): one default/rest image plus five project images. Mixed editorial look, ranging from monochrome to saturated. No real brands. By role:
- **Default / rest image** (index 0, shown at rest and between flips): soft monochrome-grey macro of a smooth, rounded white pebble/capsule form nested in a shallow dimple of a matte light-grey surface. Almost colorless — pale greys and gentle shadows.
- **Project 1:** high-contrast black-and-white fashion shot — a woman mid-motion in a flowing white satin slip dress and a long black fringed opera glove, against a dark charcoal-grey studio background.
- **Project 2:** cyberpunk night-city scene — two helmeted figures in silhouette flanking a tall glowing red-orange neon monolith, wrapped in purple-magenta haze over a wet, reflective street, with dark skyscrapers behind. Dominant colors: deep purple, magenta, and hot red-orange.
- **Project 3:** cosmic deep-space nebula — billowing orange and blue gas clouds strewn with stars and a few floating planets/moons. Dominant colors: warm amber-orange against navy and steel blue.
- **Project 4:** a person shot from behind in silhouette, hands raised to the back of the head, rim-lit against a vivid electric-blue backdrop. Near-black subject on saturated cobalt/royal blue.
- **Project 5:** dark, moody still life of three purple bearded irises (yellow beards, green stems) against a deep oxblood-red tiled wall. Dominant colors: violet-purple and rich burgundy red.

Any 4:3 images work; the effect reads best with bold, high-contrast subjects since each is diced into 108 cube faces.

## Behavior notes
- **Desktop / pointer-driven:** the reveal is entirely `mouseenter`/`mouseleave`-based (no scroll, click, or touch path).
- **Race-safe:** a flip mid-flight never gets interrupted — new requests queue into `nextProject` and fire on `onComplete`; the 50ms `setTimeout` debounce plus `clearTimeout` prevents flicker while the cursor crosses names.
- **Two independent transform channels:** the looping `z` float and the discrete `rotateY` flip coexist on every `.tile` without fighting.
- **Fixed grid size:** the 12×9 × 60px layout and 720×540 slice math are interdependent — keep them in sync if resized (the mosaic is not fluid/responsive in the original).
- No reduced-motion branch in the original; the z-float `onComplete` recursion runs forever.

## Images

This component ships with 7 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/mosaic-flip-hover-effect/default.jpg
https://motionprompts.dev/c/mosaic-flip-hover-effect/img1.jpg
https://motionprompts.dev/c/mosaic-flip-hover-effect/img2.jpg
https://motionprompts.dev/c/mosaic-flip-hover-effect/img3.jpg
https://motionprompts.dev/c/mosaic-flip-hover-effect/img4.jpg
https://motionprompts.dev/c/mosaic-flip-hover-effect/img5.jpg
… 1 more under https://motionprompts.dev/c/mosaic-flip-hover-effect/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--muted`, `--accent`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone module: the mosaic is built once by reaching straight into the DOM (`document.querySelector(".project-preview")`, then a nested loop of 108 `createElement`/`appendChild` calls), the two animations — the endless per-tile `breathe()` float and the hover-triggered `revealProject()` flip — are both created from inside asynchronous callbacks rather than during any single synchronous pass, and five plain top-level bindings (`activeProject`, `revealCount`, `isRevealing`, `nextProject`, `hoverDelay`) carry the whole reveal state machine from one hover to the next. None of it expects a second copy of itself to ever run against the same page.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen, and the double-invoke does **not** recreate the DOM subtree in between — `.project-preview` is the same node on both passes. The concrete damage: the tile-building loop runs a second time and appends another 108 `.tile` elements into it without the first batch ever having been removed, breaking the fixed 12×9/60px grid this component's slice math depends on, while the first batch's own `breathe()` cascades — never revert-tracked, see below — keep animating 108 orphaned cubes nobody can see were ever created. This will not reproduce in a production build, because only development double-invokes effects. Treat the cleanup as part of the effect, not an afterthought.

*(1) The entry point* — The script runs at the top level, the moment the module is evaluated: the `.project-preview` lookup and the entire tile/face-building loop execute at import time, before any component has rendered. Move all of it — the build loop, the initial `PROJECT_IMAGES[0]` paint pass, the `breathe()` kickoff, `revealProject()`, and the menu wiring — into a `useEffect` with an empty dependency array. `TILES_X`/`TILES_Y`/`TILE_SIZE`/`TILE_FACES`/`PROJECT_IMAGES` and the pure `setTileImage()` helper can stay outside the component; nothing about them touches the DOM.

*(2) Element lookups* — `.project-preview`, `.project-list a`, and `.project-list` are all reached through unscoped `document.querySelector`/`querySelectorAll`. Give the outer `<section class="spotlight">` a root ref and scope all three off it. The flip tween has the same problem in a different shape: `gsap.to(".tile", { rotateY: … })` selects by class name, so for the instant where two generations of the grid coexist it will happily animate both. Target the array this component already builds instead — `tiles.map((t) => t.element)`, which is the same row-major order `document.querySelectorAll(".tile")` would have returned, so the center-out grid stagger's indexing is unaffected — and the ambiguity disappears regardless of how many `.tile` nodes are momentarily on the page.

*(3) Cleanup* — Wrap the build-and-wire body in a `gsap.context` scoped to the root ref, but a bare wrap is not enough here, because neither animation this component creates runs during the context factory's synchronous pass. `breathe()`'s next tween is spawned from the previous one's `onComplete`; `revealProject()`'s flip tween is spawned from a `mouseenter`/`mouseleave` listener. Both fire after the factory has already returned, and a `gsap.to()` call made at that point is invisible to the context — nothing records it for `ctx.revert()` to find — so reverting on unmount kills only whichever single tween happens to be mid-flight and leaves every later regeneration, 108 breathing loops among them, running forever against tiles that no longer exist. Register both as named context methods instead, and reach them by name from the recursive kickoff and from the listeners:

```jsx
const ctx = gsap.context((self) => {
  self.add("breathe", (el) => {
    gsap.to(el, { z: gsap.utils.random(-40, 40), onComplete: () => ctx.breathe(el) /* same randomized range and easing as the loop above */ });
  });
  self.add("revealProject", (projectIndex) => {
    /* the guard chain, the face repaint, then gsap.to(tiles.map((t) => t.element), { rotateY: … }) exactly as above */
  });

  tiles.forEach((tile, i) => gsap.delayedCall(i * 0.015, () => ctx.breathe(tile.element)));
  // mouseenter/mouseleave call ctx.revealProject(idx) / ctx.revealProject(0), never revealProject(...) directly
}, rootRef);
```

That fixes the animations; three more things happen outside GSAP entirely and `ctx.revert()` has no reach into any of them. The 108 tile elements are plain DOM nodes this effect created by hand — remove them explicitly (`previewEl.replaceChildren()`, or track each `tile.element` and call `.remove()`) or the next mount's build loop appends into a container that already holds a full mosaic. `hoverDelay` is a raw `setTimeout`, not a `gsap.delayedCall`, so `clearTimeout(hoverDelay)` needs to be in the same cleanup, or a hover landing just before an unmount fires `ctx.revealProject()` into a component that is already gone. And the `mouseenter`/`mouseleave` handlers wired onto `.project-list a`/`.project-list` are fresh anonymous closures created inside this effect, not one stable top-level function the DOM can dedupe against — keep a reference to each and `removeEventListener` it, or the StrictMode remount leaves two `mouseenter` handlers stacked on every link.

`activeProject`, `revealCount`, `isRevealing`, `nextProject`, and `tiles` should end up as plain variables declared inside the effect body, not lifted to the new file's module scope the way the original script's top-level `let`s might tempt a direct port — nothing outside this effect reads them, so refs aren't needed either. The reason this matters specifically here: reverting a tween does not fire its `onComplete`, so a StrictMode unmount that lands mid-flip kills the tween `ctx.revert()` finally caught but leaves `isRevealing` at `true`. If that binding survived into the next mount — because it had been hoisted to module scope — every subsequent hover would fall into `revealProject`'s "a flip is already in progress, queue it" guard forever, since the one tween whose `onComplete` would have drained the queue is exactly the one that was just killed. Declaring these fresh inside the effect on every run is what makes `isRevealing` actually reset to `false` on the next mount instead of staying stuck.
