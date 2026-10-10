# Text Hover Image Ring

## Goal
Build a full-screen black editorial hero: one large centered agency paragraph in which **four keywords are highlighted in a pixel/raster display font**. The star effect is a **hover reveal**: when the cursor enters one of those highlighted words, **a ring of 11 image tiles fades in and continuously orbits around the cursor** while lerp-following it, and the rest of the paragraph dims to grey so the hovered word stays bright. Move off the word and the ring fades back out. The orbit and follow are entirely GSAP-driven (core `gsap` + `gsap.ticker`), no plugins.

## Tech
Vanilla HTML/CSS/JS shipped as `index.html` + `styles.css` + an ES-module `script.js` (`<script type="module" src="./script.js">`). Use only **`gsap` (npm) core — no GSAP plugins, no ScrollTrigger, no SplitText, no Lenis, no Three.js.** The motion is: `gsap.to` tweens on each tile plus a global `gsap.ticker.add` rAF loop and a hand-rolled lerp. Must run in a fresh Vite + npm project. Import shape:
```js
import gsap from "gsap";
```

## Layout / HTML
```html
<body>
  <div class="hero-copy">
    <p>
      We are a digital agency. From concept to <span>execution</span>, we
      design experiences, <span>products</span> and services that help our
      international <span>clients</span> create emotional and meaningful
      <span>connections</span> between their brand and people.
    </p>
  </div>

  <nav>
    <p>Motionprompts &nbsp;&nbsp;&nbsp;&nbsp; / &nbsp;&nbsp;&nbsp;&nbsp;26092017</p>
    <p>Youtube</p>
  </nav>

  <footer>
    <p>Subscribe</p>
    <p>MotionpromptsPRO</p>
  </footer>

  <div class="container">
    <div class="gallery">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>

  <script type="module" src="./script.js"></script>
</body>
```
Key points the JS/CSS depend on:
- Exactly **four `<span>`** inside the single hero `<p>`, wrapping the words **execution, products, clients, connections** (in that order). These are the only hover targets.
- **Exactly 11 empty `.item` divs** inside `.container > .gallery`. JS injects one `<img>` into each (they start empty).
- `nav` (fixed top) and `footer` (fixed bottom) are corner chrome only, two `<p>` each. Use the neutral demo copy above — no real brand names.

## Styling

**Reset / global**
- `* { margin:0; padding:0; box-sizing:border-box; }`
- `html, body { width:100%; height:100vh; font-family:"Timmons NY", sans-serif; background:#000; }` — near-black stage. "Timmons NY" is a tall condensed display face used only by the chrome; any condensed display sans is an acceptable fallback.
- `img { width:100%; height:100%; object-fit:cover; }` — tiles center-crop their image.

**Corner chrome** — `nav, footer { position:fixed; width:100%; display:flex; justify-content:space-between; padding:1em; text-transform:uppercase; font-size:30px; color:#fff; }`. `nav { top:0; }`, `footer { bottom:0; }`. Two `<p>` each, pushed to the edges.

**Ring stage** — `.container { position:relative; width:100%; height:100%; overflow:hidden; pointer-events:none; }` and `.gallery { pointer-events:none; }`. **`pointer-events:none` on both is essential**: the container sits above the hero paragraph in the DOM, so the ring must let mouse events pass through to the `<span>`s underneath — otherwise the tiles would swallow the hover and the effect could never trigger.

**Tiles** — `.item`:
```css
pointer-events: none;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 100px;
height: 70px;
background: #b0b0b0;   /* placeholder grey before the image paints */
margin: 10px;
opacity: 0;            /* start invisible; GSAP fades them in on hover */
```
Every tile is a **100×70px (≈10:7 landscape) rectangle stacked on the container's exact center**; its position on the ring comes entirely from GSAP `x`/`y` (see below). Starts at `opacity:0`.

**Hero paragraph** — `.hero-copy { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); }` (dead-center block). `.hero-copy p { font-size:50px; font-family:"FK Grotesk Neue"; color:#fff; text-align:center; letter-spacing:-0.04em; line-height:110%; }` — a tight, centered grotesk. Fall back to any clean grotesk sans (e.g. system sans) if unavailable.

**Highlighted words** — `.hero-copy p span { cursor:pointer; font-family:"FK Raster Grotesk"; position:relative; z-index:1; display:inline-block; }` plus `.hero-copy p span:hover { color:#fff; }`. The **distinctive typographic contrast is the star of the styling**: the four keywords render in a **pixel/dot-matrix "raster" grotesk display font**, visibly coarser than the smooth grotesk of the surrounding sentence. If that exact face isn't available, use any pixel/bitmap or blocky raster display font for the spans so they read as a different, chunkier typeface. `position:relative; z-index:1` keeps the hovered word painting above its dimmed siblings.

## GSAP effect (exhaustive — this is the whole component)

Wrap everything in `window.onload = function () { … }`. No plugins, no `registerPlugin`. The snippets below are a **reference implementation, not a mandated copy-paste** — you may restructure the code, but treat every literal number, easing, duration, and event target as load-bearing: they define the motion and must be reproduced exactly (`radius:300`, lerp `0.1`, spin `+= 0.005`, tween `duration:0.5` / `ease:"power1.out"`, the `clientX-800`/`clientY-450` offsets, and the `-item.offsetWidth/2` / `-item.offsetHeight/2` recenter).

### 1. Constants and state
```js
const items = document.querySelectorAll(".item");          // 11 tiles
const container = document.querySelector(".container");
const spans = document.querySelectorAll(".hero-copy span"); // 4 keywords
const numberOfItems = items.length;                         // 11
const angleIncrement = (2 * Math.PI) / numberOfItems;       // ≈ 0.5712 rad (32.7°) between neighbours
const radius = 300;                                         // ring radius in px
let currentAngle = 0;                                       // advances every frame (continuous spin)
let isMouseOverSpan = false;
let targetX = 0, targetY = 0;                               // ring-center target (lerp destination)
let currentX = 0, currentY = 0;                             // ring-center actual (lerped)
```

### 2. Inject the 11 images
On load, loop the 11 `.item` divs and append one `<img>` to each, sourced from a `basePath + "img" + (index + 1) + ".jpg"` pattern with `alt = "Image " + (index + 1)`:
```js
const basePath = "/img/";   // ← placeholder: point at YOUR image folder (see note)
items.forEach((item, index) => {
  const img = document.createElement("img");
  img.src = basePath + "img" + (index + 1) + ".jpg";   // img1.jpg … img11.jpg
  img.alt = "Image " + (index + 1);
  item.appendChild(img);
});
```
Tile *index* uses `img{index+1}.jpg`, so the 11 tiles map 1:1 to `img1`…`img11`, in order.

> **Image paths are placeholders — you must repoint them.** `basePath` and the `img1.jpg…img11.jpg` filenames are just a naming convention from the reference repo; there is no `/c/text-hover-effect/` folder in a fresh project. Set `basePath` to wherever your 11 images actually live so they resolve — e.g. a Vite `public/` path like `/img/`, a relative `./assets/`, or imported module URLs. **If the sources 404 the ring still orbits but every tile shows only the flat `#b0b0b0` placeholder grey**, so the image-reveal effect looks broken. Supply 11 images (any that match the aspect/mood in *Assets*) named `img1.jpg…img11.jpg` (or adjust the pattern), and the ring fills with pictures as intended.

### 3. `updateGallery(mouseX, mouseY, show = true)` — lerp-follow + place the ring
```js
const updateGallery = (mouseX, mouseY, show = true) => {
  targetX = mouseX - container.getBoundingClientRect().left;
  targetY = mouseY - container.getBoundingClientRect().top;

  currentX += (targetX - currentX) * 0.1;   // lerp factor 0.1 → smooth trailing follow
  currentY += (targetY - currentY) * 0.1;

  items.forEach((item, index) => {
    const angle = currentAngle + index * angleIncrement;
    const x = currentX + radius * Math.cos(angle) - item.offsetWidth / 2;   // −50
    const y = currentY + radius * Math.sin(angle) - item.offsetHeight / 2;  // −35
    gsap.to(item, {
      x: x,
      y: y,
      opacity: show ? 1 : 0,
      duration: 0.5,
      ease: "power1.out",
    });
  });
};
```
Details that matter:
- The container is full-bleed, so its `getBoundingClientRect().left/top` are effectively `0` — `targetX/targetY` are basically the raw values passed in.
- **`currentX/currentY` chase the target with a lerp of 0.1 per call** — the ring center trails the cursor with an easy, elastic-feeling lag rather than snapping.
- Each tile is placed on a **circle of radius 300** around `(currentX, currentY)`: `x = currentX + 300·cos(angle) − 50`, `y = currentY + 300·sin(angle) − 35` (the −50 / −35 recenter each 100×70 tile on its point). `angle = currentAngle + index·angleIncrement` spaces the 11 tiles evenly and rotates them all by the shared, ever-advancing `currentAngle`.
- Every tile is tweened with **`gsap.to`, `duration:0.5`, `ease:"power1.out"`**, and its **`opacity` goes to 1 when `show` is true, 0 when false** — that's the fade-in on enter / fade-out on leave.

### 4. Per-span hover handlers (the trigger)
```js
spans.forEach((span) => {
  span.addEventListener("mouseenter", (e) => {
    isMouseOverSpan = true;
    updateGallery(e.clientX, e.clientY, true);   // ring appears at the cursor
  });
  span.addEventListener("mousemove", (e) => {
    if (isMouseOverSpan) {
      targetX = e.clientX - 800;                 // hard-coded offsets (~half a 1600×900 reference viewport)
      targetY = e.clientY - 450;
    }
  });
  span.addEventListener("mouseleave", () => {
    isMouseOverSpan = false;
    updateGallery(0, 0, false);                  // target (0,0) + opacity 0 → tiles fade out toward top-left
  });
});
```
- **`mouseenter`**: flip `isMouseOverSpan` on and place the ring at the raw cursor position with tiles fading to opacity 1.
- **`mousemove`**: while over a span, keep re-aiming the ring's `targetX/targetY` at **`clientX − 800`, `clientY − 450`** (reproduce these literal constants — they're the original's fixed reference-viewport offsets, not a calculated center).
- **`mouseleave`**: flip the flag off and call `updateGallery(0, 0, false)` once — target snaps toward the top-left origin and all tiles tween to `opacity:0` over 0.5s.

### 5. The `gsap.ticker` loop (continuous spin + follow)
```js
gsap.ticker.add(() => {
  currentAngle += 0.005;                    // advance the shared ring angle every frame
  if (currentAngle > 2 * Math.PI) currentAngle -= 2 * Math.PI;
  if (isMouseOverSpan) {
    updateGallery(targetX, targetY, true);  // re-lerp + reposition every frame while hovering
  }
});
```
- `currentAngle` increases **0.005 rad per frame** (~0.3 rad/s at 60fps → one full revolution roughly every ~21s), giving the ring its slow, endless clockwise orbit. It advances **every frame regardless of hover**, so the ring is at a fresh rotation each time you re-enter a word.
- **Only while `isMouseOverSpan`** does the ticker call `updateGallery(targetX, targetY, true)` — that's what drives the per-frame lerp toward the target and the 0.5s tweens, so the orbiting ring smoothly chases the cursor. When not hovering, the ticker keeps spinning `currentAngle` but issues no tweens and the tiles rest invisible (opacity 0).

### 6. Dim-the-paragraph handler (second listener set)
A **separate** `forEach` over the same spans changes the surrounding text color:
```js
document.querySelectorAll(".hero-copy span").forEach((span) => {
  span.addEventListener("mouseenter", () => { span.parentNode.style.color = "#545454"; });
  span.addEventListener("mouseleave", () => { span.parentNode.style.color = "#fff"; });
});
```
On enter, the parent `<p>` turns **`#545454`** (mid grey), dimming the whole sentence; because the hovered `span` has its own `:hover { color:#fff; }` and `z-index:1`, **only the active keyword stays white** — the rest of the paragraph recedes. On leave, the paragraph returns to `#fff`.

## Assets / images
**11 orbiting ring images** (`img1.jpg` … `img11.jpg`), one per tile, all center-cropped to **100×70px (≈10:7 landscape)** via `object-fit:cover`. Use a cohesive but eclectic **moody, cinematic, experimental-editorial** set — high-contrast and atmospheric. A representative mix (any similar images work — do **not** use real brand imagery or logos):
- cinematic / atmospheric scenes: a lone silhouetted figure walking on a reflective surface toward a bright light; an astronaut in a hazy amber landscape beneath a giant pale planet; a close-up of a helmet with a molten-gold reflective visor;
- moody low-key **portraits**: a blonde woman against a dark smoky backdrop; a woman with wet hair pushed back, face partly hidden; a dim slot-framed lower face holding a cigarette; a figure with a pale-blue tulle veil over the head; a hand pressed to backlit frosted glass;
- **surreal 3D render**: a chrome robotic figure in sunglasses and a mosaic conical hat;
- **still-life / cityscape**: a golden lucky-cat figurine in a red circular niche; a hazy orange sunset skyline of high-rise towers.

Because the tiles render small, overall tone and contrast matter far more than resolution. Provide **exactly 11** distinct images in this order (tile *index* → `img{index+1}.jpg`); if you have fewer, repeat to reach 11. These are supplied by you — the prompt does not ship them — so make sure the `basePath` in the JS points at them (see *GSAP effect §2*), otherwise the ring shows blank grey tiles.

## Behavior notes
- **Desktop / pointer only.** The entire effect is driven by `mouseenter` / `mousemove` / `mouseleave` on the four keywords — there is **no touch handling and no reduced-motion branch**, so it is not mobile-safe as authored.
- **Continuous rAF spin.** The `gsap.ticker` loop runs for the life of the page, always advancing `currentAngle`; it only repositions/fades the tiles while a keyword is hovered.
- **Everything eases, nothing snaps.** The ring center lerps toward its target at 0.1 per frame, and each tile tween is `duration:0.5, ease:"power1.out"`, so the ring trails and settles behind the cursor.
- `pointer-events:none` on `.container` and `.gallery` is load-bearing: the ring sits above the text but must never intercept the hover that triggers it.
- Wrap the whole script in `window.onload` (not `DOMContentLoaded`) so the tiles exist and are measurable (`offsetWidth`/`offsetHeight`) before the ring is positioned.

## Images

This component ships with 11 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/text-hover-effect/img1.jpg
https://motionprompts.dev/c/text-hover-effect/img10.jpg
https://motionprompts.dev/c/text-hover-effect/img11.jpg
https://motionprompts.dev/c/text-hover-effect/img2.jpg
https://motionprompts.dev/c/text-hover-effect/img3.jpg
https://motionprompts.dev/c/text-hover-effect/img4.jpg
… 5 more under https://motionprompts.dev/c/text-hover-effect/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--muted`, `--amber`, `--surface`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelectorAll`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two `gsap.ticker` subscriptions both advancing the shared `currentAngle`, and two sets of `mouseenter`/`mousemove`/`mouseleave` listeners on the same four spans, each pair racing to lerp the same 11 tiles toward two different targets. The visible symptom is a ring that spins twice as fast and jitters between two centers, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — the script waits for the window `load` event, which is after images and fonts have settled. `useEffect` runs earlier than that, at commit. Here that gap does not actually matter: every size this component reads — `item.offsetWidth`/`offsetHeight` inside `updateGallery`, `container.getBoundingClientRect()` — comes from CSS that fixes the box directly (`.item` is a hard-coded 100×70 rectangle, `.container` is full-bleed), not from the intrinsic dimensions of the 11 `<img>` tags. Nothing here needs the 11 images to have decoded first. Drop `window.onload` entirely and put the body straight inside a `useEffect` with an empty dependency array — there is no measurement in this component that justifies keeping an explicit wait.

*(2) Element lookups* — give the component a root ref on the wrapper that contains `.hero-copy`, `.container` and the four spans, and scope every lookup to it: the 11 `.item` nodes, the `.container` node, the four `.hero-copy span` nodes. The script currently walks `document.querySelectorAll(".hero-copy span")` **twice**, in two independent `forEach` blocks — once to wire the ring trigger (`mouseenter`/`mousemove`/`mouseleave`), once more to wire the paragraph-dimming color swap (`mouseenter`/`mouseleave` on `span.parentNode`). Collapse that into a single pass over the four span refs that attaches both listener groups per span, so cleanup has one list to walk instead of two independently-scoped ones that happen to target the same elements.

Also move the image injection out of the imperative script: `items.forEach` here builds an `<img>` with `createElement`/`appendChild` on every run, which is DOM-node creation, not element lookup. Render the 11 `<img src={basePath + "img" + (i + 1) + ".jpg"}>` tags directly inside their `.item` boxes in JSX, keyed by index. That removes a StrictMode failure mode for free: the imperative version, called twice, would append a second `<img>` into each `.item` on the remount; JSX replaces instead of accumulating.

**The four values the ticker mutates every frame — `currentAngle`, `currentX`/`currentY`, `targetX`/`targetY`, `isMouseOverSpan` — belong in refs, not component state.** They are written inside the `gsap.ticker` callback up to sixty times a second and read from `mousemove`, and none of them ever needs to appear in JSX. Routing them through `useState` would re-render the component on every tick for values the render output never uses; a plain `useRef` per value (or one ref holding all of them) gives the callbacks a stable place to read and write without fighting React's render cycle.

*(3) Cleanup* — wrap the animation in a `gsap.context` scoped to the root ref:

```jsx
useEffect(() => {
  const spans = rootRef.current.querySelectorAll(".hero-copy span"); // the 4 keywords
  const spanHandlers = [];
  const ticker = { fn: null };

  const ctx = gsap.context((self) => {
    // NAMED registration: `updateGallery`'s gsap.to calls never run during this
    // synchronous pass — they run later, from mouseenter/mousemove and from the
    // ticker callback below. Naming them here is what makes those later tweens
    // count as context members; a bare closure over `gsap.to` would not.
    self.add("updateGallery", (mouseX, mouseY, show = true) => {
      /* the body of updateGallery exactly as described above */
    });

    spans.forEach((span) => {
      const onEnter = (e) => { /* set isMouseOverSpan, call ctx.updateGallery(...) */ };
      const onMove = (e) => { /* update the target refs while isMouseOverSpan is true */ };
      const onLeave = () => { /* clear isMouseOverSpan, call ctx.updateGallery(0, 0, false) */ };
      const onDimEnter = () => { /* dim the parent paragraph */ };
      const onDimLeave = () => { /* restore the parent paragraph */ };
      span.addEventListener("mouseenter", onEnter);
      span.addEventListener("mousemove", onMove);
      span.addEventListener("mouseleave", onLeave);
      span.addEventListener("mouseenter", onDimEnter);
      span.addEventListener("mouseleave", onDimLeave);
      spanHandlers.push({ span, onEnter, onMove, onLeave, onDimEnter, onDimLeave });
    });

    ticker.fn = () => {
      /* advance currentAngle, and while isMouseOverSpan call ctx.updateGallery(...) */
    };
    gsap.ticker.add(ticker.fn);
  }, rootRef);

  return () => {
    gsap.ticker.remove(ticker.fn);
    spanHandlers.forEach(({ span, onEnter, onMove, onLeave, onDimEnter, onDimLeave }) => {
      span.removeEventListener("mouseenter", onEnter);
      span.removeEventListener("mousemove", onMove);
      span.removeEventListener("mouseleave", onLeave);
      span.removeEventListener("mouseenter", onDimEnter);
      span.removeEventListener("mouseleave", onDimLeave);
    });
    ctx.revert();
  };
}, []);
```

Inside the factory the parameter is `self`; `ctx` is not assigned yet at that point in the synchronous pass, and naming it there throws `Cannot access 'ctx' before initialization`. `updateGallery` is registered with the name-plus-function form of `self.add` specifically so it can be called back later, from listeners and from the ticker, as `ctx.updateGallery(...)` — the single-argument form would run it once, immediately, with the GSAP context object in place of `mouseX`.

Two things `ctx.revert()` will not do for you here:

- **The ticker keeps the ring spinning after revert.** `gsap.ticker.add` is not a tween or a trigger, so the context never sees it; only `gsap.ticker.remove(ticker.fn)`, called with the exact function reference that was added, actually stops the per-frame advance of `currentAngle`. Skip it and a remount leaves a second orbit permanently superimposed on the first, both writing `x`/`y` onto the same 11 tiles every frame.
- **Ten `addEventListener` calls per remount (five per span, times two remaining spans' worth of duplication) are plain DOM subscriptions, not GSAP instances.** `ctx.revert()` undoes the tweens and the inline styles GSAP wrote on the tiles, but it has no knowledge of the ring-trigger triplet or the dimming pair attached to each span. Remove all five per span by the same function reference that was attached, or a remounted instance leaves a second dimming handler racing the first to set the paragraph's color on every hover.
