# Build: Sliding Lightbox Gallery

## Goal
An editorial **click-triggered image lightbox**: a 4×4 grid of 16 numbered thumbnails on the left, a tall portrait **preview box** bottom-right. Clicking any thumbnail **slides a full-size copy of that image into the preview box from the right edge**, while the image that was already there **scales up to 1.5× and slides off to the left**, and the **whole page background tweens (via a CSS transition) to a color hand-matched to that thumbnail**. Old previews are never removed — they pile up off to the left, clipped by the box's `overflow:hidden`. The star effect is the pure `gsap.to` cross-slide (incoming from the right, outgoing zooming out to the left) over a 1s duration, paired with the 1s background-color fade.

## Tech
Vanilla HTML/CSS/JS with ES module imports (Vite/npm project). Use **`gsap` (npm) only** — no plugins, no framework, no ScrollTrigger, no SplitText, no Lenis, no Three.js. A single import:
```js
import gsap from "gsap";
```
The animation is driven entirely by two `gsap.to()` calls inside a click handler; the background color change is a plain CSS `transition` (not GSAP).

## Layout / HTML
Class names are load-bearing (the JS queries `.item .img img` and `.preview-container`). Structure:

```html
<nav>
  <div class="col intro">
    <div class="copy">
      <p class="label">Archive, season one</p>
      <p>Sixteen frames from a year in the studio. Select any frame to bring it up on the viewing board.</p>
    </div>
  </div>
  <div class="col cats">
    <div class="copy">
      <p class="label">(01) Hands</p>
      <p>Close studies of hands at work, shot at the bench. Frames 1 to 4.</p>
    </div>
    <div class="copy">
      <p class="label">(02) Making</p>
      <p>Forms taking shape, photographed mid-process. Frames 5 to 8.</p>
    </div>
    <div class="copy">
      <p class="label">(03) Still life</p>
      <p>Finished pieces arranged against plain walls. Frames 9 to 12.</p>
    </div>
    <div class="copy">
      <p class="label">(04) Light</p>
      <p>Studies of the afternoon light that crosses the studio. Frames 13 to 16.</p>
    </div>
  </div>
  <div class="col brand">
    <p class="logo">Framework</p>
    <p class="brand-sub">A photographic index of a year in the studio</p>
  </div>
</nav>

<div class="container">
  <div class="gallery">
    <div class="row">
      <div class="item"><div class="index"><p>1</p></div><div class="img"><img src="/c/lightbox/1.jpeg" alt="Hands wedging a ball of pale clay against a linen apron" /></div></div>
      <div class="item"><div class="index"><p>2</p></div><div class="img"><img src="/c/lightbox/2.jpeg" alt="Wet hands centring clay on a spinning wheel" /></div></div>
      <div class="item"><div class="index"><p>3</p></div><div class="img"><img src="/c/lightbox/3.jpeg" alt="Fingers opening the mouth of a freshly thrown pot" /></div></div>
      <div class="item"><div class="index"><p>4</p></div><div class="img"><img src="/c/lightbox/4.jpeg" alt="Clay-covered hands trimming the shoulder of a pot" /></div></div>
    </div>
    <!-- row 2: items 5–8, row 3: items 9–12, row 4: items 13–16 — same pattern -->
  </div>
  <div class="preview">
    <div class="preview-meta">
      <p class="label">Viewing board</p>
      <p>The last frame slides off as the next one arrives.</p>
    </div>
    <div class="preview-container">
      <img src="/c/lightbox/1.jpeg" alt="Hands wedging a ball of pale clay against a linen apron" />   <!-- initial preview = image 1 -->
    </div>
  </div>
</div>

<script type="module" src="./script.js"></script>
```

- **16 items** total, laid out as **4 rows × 4 items**. Each `.item` = an `.index` block holding its number `<p>1</p>`…`<p>16</p>` (stacked above) and an `.img` wrapper holding one `<img>` whose filename is `/c/lightbox/<n>.jpeg` (the number must be recoverable from the src — the JS regex-matches `(\d+)\.jpeg`).
- The **`.preview-container` starts with one `<img>` already inside it** — image `1.jpeg` — so the box is not empty on load.
- The three nav columns carry modifier classes — `.col.intro`, `.col.cats`, `.col.brand` — because each gets a different `flex` share and the mobile query hides `.cats` by name.
- Copy is neutral demo text for a fictional studio archive ("Framework"), with the four section labels `(01) Hands`, `(02) Making`, `(03) Still life`, `(04) Light`; keep it or swap for your own, no real brand names.

## Styling
Three fonts, all free: **Inter** for body copy, **Space Mono** for the small uppercase labels and the thumbnail index numbers, **Space Grotesk** for the wordmark. `p { font-size:13.5px; line-height:1.55; }`.

Palette (P1 Canary: near-black ink on bone, one saturated yellow accent):
```css
:root {
  --ink: #0a0a0a;
  --ink-soft: rgba(10, 10, 10, 0.72);
  --accent: #ffe500;   /* the only chromatic colour: label chips and the thumbnail hover outline */
  --paper: #ffffff;    /* the empty preview box */
  --bone: #f4f4f0;     /* page base, before the first click repaints it */
  --gray: #8c8c88;
}
```

Global reset & page:
```css
* { margin:0; padding:0; box-sizing:border-box; }
html, body {
  width:100%; height:100%;
  background: var(--bone);
  transition: background-color 1s; /* CRITICAL: the JS sets body bg inline; this 1s transition IS the color fade */
}
body { color: var(--ink); }
img {
  width:100%; height:100%; object-fit:cover;
  filter: grayscale(1) contrast(1.05);   /* the whole archive reads black-and-white; the page colour is the only tone */
}
```

The label chip — a sticker of accent yellow, used in the nav and over the preview:
```css
p.label {
  display:inline-block; white-space:nowrap;
  font-family:"Space Mono", "Courier New", monospace;
  font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;
  color: var(--ink); background: var(--accent);
  padding:0.15em 0.45em; margin-bottom:0.5em;
}
```

Top nav (absolutely positioned band):
```css
nav { position:absolute; top:0; width:100%; display:flex; padding:2em 2.25em; gap:2.5em; align-items:flex-start; }
.col { display:flex; gap:2em; }        /* copy blocks sit in a row inside each column */
.copy { flex:1; max-width:220px; color: var(--ink-soft); }
.copy .label { color: var(--ink); }
.col.intro { flex:2; }
.col.intro .copy { max-width:260px; color: var(--ink); }
.col.cats  { flex:5; }
.col.brand { flex:3; flex-direction:column; gap:0.35em; align-items:flex-end; text-align:right; }
p.logo { font-family:"Space Grotesk", "Inter", sans-serif; font-size:24px; font-weight:700; letter-spacing:-0.02em; line-height:1; color: var(--ink); }
p.brand-sub { font-size:12px; color: var(--ink-soft); }
```

Main container — gallery (left, flex 2) beside preview area (right, flex 4):
```css
.container { position:relative; top:175px; width:100%; height:80vh; display:flex; font-family:"Inter", "Helvetica Neue", Arial, sans-serif; }
.gallery { flex:2; display:flex; flex-direction:column; height:100%; }
.row { flex:1; width:100%; display:flex; }
.item { flex:1; padding:1em; display:flex; flex-direction:column; align-items:center; gap:0.75em; }
.index p { font-family:"Space Mono", "Courier New", monospace; font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color: var(--ink-soft); }
.img { width:80%; height:84px; cursor:pointer; transition: transform .35s ease, box-shadow .35s ease; }
.img:hover { transform: translateY(-3px); box-shadow:0 10px 24px rgba(10,10,10,.22); outline:3px solid var(--accent); }
.preview { width:100%; flex:4; height:100%; display:flex; justify-content:flex-end; align-items:flex-end; gap:2em; padding:2em 2.25em; }
.preview-meta { max-width:180px; padding-bottom:0.25em; color: var(--ink-soft); text-align:right; }
```

**Preview box — this is the stage for the effect:**
```css
.preview-container {
  position:relative;
  width:400px; height:600px;        /* 2:3 portrait */
  background: var(--paper);         /* white, showing before/behind images */
  overflow:hidden;                  /* CRITICAL: clips outgoing/incoming images sliding past the edges */
  flex-shrink:0;
}
.preview-container img { position:absolute; }   /* every preview img is absolutely positioned so left/right can be tweened */
```

Responsive `@media (max-width:900px)` — the nav stops floating and the two panes stack:
```css
nav { position:static; flex-direction:column; gap:1.5em; padding:1.5em 1.25em .5em; }
.col.cats { display:none; }                        /* the four section blurbs go away */
.col.brand { order:-1; align-items:flex-start; text-align:left; }   /* wordmark first */
.col.intro .copy { max-width:34ch; }
.container { top:0; height:auto; flex-direction:column; gap:2.5em; padding-bottom:3em; }
.row { min-height:150px; }
.item { padding:.75em .5em; }
.img { width:86%; height:96px; }
.preview { flex-direction:column; align-items:center; justify-content:flex-start; gap:1.25em; padding:0 1.25em 2em; }
.preview-meta { order:1; max-width:100%; text-align:center; }
.preview-container { width:min(100%, 400px); height:auto; aspect-ratio:2 / 3; }
```

## GSAP effect (the important part — be exhaustive)

There is **no plugin and no timeline**. The entire effect is a click handler that fires **two simultaneous `gsap.to()` tweens** plus one inline style write. GSAP's global default ease applies to both tweens (no `ease` is passed), i.e. **`power1.out`**, duration **1s**, no delay, no stagger, no repeat.

### Setup
```js
import gsap from "gsap";

const images = document.querySelectorAll(".item .img img");   // all 16 thumbnails

// One background tone per plate, index 0 → image 1 … index 15 → image 16.
// The photos are greyscaled by CSS, so these are cool neutrals matched to each frame's
// LIGHTNESS, not its hue: clicking a bright still life lifts the page, a dark one drops it.
const colorArray = [
  "#A4A49E", "#8C8C88", "#888884", "#9C9C96",
  "#90908A", "#8E8E88", "#848480", "#B2B2AC",
  "#C2C2BC", "#B6B6B0", "#AAAAA4", "#B0B0AA",
  "#94948E", "#BCBCB6", "#A6A6A0", "#8A8A84",
];
```

### The click handler (attach to every thumbnail `<img>`)
```js
function handleImageClick(event) {
  const imgSrc    = event.currentTarget.src;              // e.g. ".../c/lightbox/7.jpeg"
  const imgNumber = imgSrc.match(/(\d+)\.jpeg/)[1];       // "7"

  // 1) Background color — inline style write; the CSS `transition: background-color 1s` animates it.
  document.body.style.backgroundColor = colorArray[parseInt(imgNumber) - 1];

  const newImgSrc        = `/c/lightbox/${imgNumber}.jpeg`;
  const previewContainer = document.querySelector(".preview-container");
  const currentLastImg   = previewContainer.querySelector("img:last-child"); // the image currently on top

  // 2) OUTGOING tween — zoom the current image up and drift it off to the left.
  if (currentLastImg) {
    gsap.to(currentLastImg, { duration: 1, scale: 1.5, left: "-50%" });
  }

  // 3) Build the INCOMING image, parked fully off-screen to the right.
  const newImg = document.createElement("img");
  newImg.src = newImgSrc;
  newImg.style.position = "absolute";
  newImg.style.right = "-100%";        // its right edge is one container-width past the right edge
  previewContainer.appendChild(newImg); // appended LAST → it becomes the new img:last-child

  // 4) INCOMING tween — slide it in to fill the box.
  gsap.to(newImg, { duration: 1, right: "0%" });
}

images.forEach((img) => img.addEventListener("click", handleImageClick));
```

### Exact motion, value-by-value
- **Incoming image:** created fresh each click, `position:absolute`, inherits `width:100% height:100% object-fit:cover` from the global `img` rule. Starts at **`right:-100%`** (completely off the right side of the 400px box) and tweens to **`right:0%`** over **1s** → it slides leftward into the box until it exactly fills it. Because it is appended last, it lands on top of everything.
- **Outgoing image:** whatever was previously `img:last-child`. It tweens **`scale` 1 → 1.5** (transform-origin center) **and `left` (0) → -50%** over the same **1s**, i.e. it enlarges to 1.5× while sliding half a container-width to the left, exiting under the `overflow:hidden` clip on the left side. The two tweens run concurrently, so you read it as a cross-slide: new photo pushes in from the right as the old one blooms and leaves left.
- Note the deliberate **asymmetry**: the incoming image animates the `right` offset, the outgoing animates the `left` offset (and adds `scale`). Preserve that — don't unify them.
- **Ease/duration/delay/stagger:** ease = GSAP default `power1.out`; duration = `1`; no delay, no stagger, no repeat, no yoyo, no timeline. Both are independent one-shot `gsap.to` tweens.
- **No cleanup:** outgoing images are never removed from the DOM. After several clicks the container holds a growing stack of `<img>`s, each frozen where its tween ended (scaled 1.5, left -50%), overlapping and mostly hidden by `overflow:hidden`. Only the newest is fully visible.
- **Background fade is NOT GSAP:** it is the CSS `transition: background-color 1s` on `html, body` reacting to the inline `backgroundColor` write — so it fades over 1s in parallel with the slide.
- **First click** is a special but automatic case: the initial `1.jpeg` sitting in the container is the `currentLastImg`, so it gets the outgoing zoom-out treatment while the clicked image slides in.

## Assets / images
**16 gallery images.** Each appears twice: as a small **cover-cropped thumbnail** (~84px tall box) in the grid, and, when clicked, as a **full 2:3 portrait** filling the 400×600 preview box (also `object-fit:cover`, so any source aspect crops cleanly, but frame them portrait-friendly). CSS greyscales all of them, so shoot for **tonal range, not colour**: the set is one documentary sequence from a ceramics studio, four frames per section, matching the four nav labels. Describe by role, no brands or logos:

1. Hands wedging a ball of pale clay against a linen apron. *(bg #A4A49E)*
2. Wet hands centring clay on a spinning wheel. *(bg #8C8C88)*
3. Fingers opening the mouth of a freshly thrown pot. *(bg #888884)*
4. Clay-covered hands trimming the shoulder of a pot. *(bg #9C9C96)*
5. Coil-built vessel being shaped on a wooden bench. *(bg #90908A)*
6. A hand smoothing the rim of an unfired bowl. *(bg #8E8E88)*
7. Muddy hands resting on rows of raw earthenware pots. *(bg #848480)*
8. Workbench with wheel head, sponge and a small drying vase. *(bg #B2B2AC)*
9. White ring-shaped vase with dried grass on stacked plinths. *(bg #C2C2BC)*
10. Glazed vessels beside a rough stone cube. *(bg #B6B6B0)*
11. Glazed vases holding dried seed heads. *(bg #AAAAA4)*
12. Still life of a glazed vessel, fan palm and hourglass. *(bg #B0B0AA)*
13. Fluted vase of gypsophila in hard window light. *(bg #94948E)*
14. Afternoon light raking across a plaster wall. *(bg #BCBCB6)*
15. A single ribbon of sunlight falling down a pale wall. *(bg #A6A6A0)*
16. The potter holding a finished pot up to the light. *(bg #8A8A84)*

Each `<img>` carries that sentence as its `alt`. If you have fewer than 16, repeat in order — the effect is identical regardless of content; the color-per-index mapping is what matters for the background fade.

## Behavior notes
- **Click is the only trigger** — no hover, no scroll, no autoplay. Every thumbnail `<img>` gets the same listener.
- The **number in each filename is load-bearing**: the JS extracts it with `/(\d+)\.jpeg/` to both pick the background color (`colorArray[n-1]`) and build the preview src (`/c/lightbox/<n>.jpeg`). Keep numeric `<n>.jpeg` filenames.
- Desktop-oriented; below 900px the nav stops floating and stacks (the four section blurbs hide, the wordmark moves to the top), the gallery sits above the preview, and the preview box becomes `width:min(100%,400px)` with a `2/3` aspect ratio.
- No reduced-motion branch in the original. Both tweens use GSAP's default `power1.out` ease at 1s.

## Images

This component ships with 16 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/lightbox/1.jpeg
https://motionprompts.dev/c/lightbox/10.jpeg
https://motionprompts.dev/c/lightbox/11.jpeg
https://motionprompts.dev/c/lightbox/12.jpeg
https://motionprompts.dev/c/lightbox/13.jpeg
https://motionprompts.dev/c/lightbox/14.jpeg
… 10 more under https://motionprompts.dev/c/lightbox/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--ink-soft`, `--accent`, `--paper`, `--bone`, `--gray`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two triggers on the same element disagreeing about the same scrub, two smooth scrollers pulling on the same wheel event. The visible symptom is jitter or doubled speed, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script runs at the top level: `const images = document.querySelectorAll(".item .img img")` and the `images.forEach(...)` that wires up `handleImageClick` both execute the instant the module is evaluated, which in React is import time, before any of the sixteen thumbnails or the `.preview-container` exist in the DOM. Move both lines into a `useEffect` with an empty dependency array. Leaving the query and the `forEach` in the component body instead would re-run on every render, attaching one more `click` listener to every thumbnail each time this component re-renders.

*(2) Element lookups* — Both `document.querySelectorAll(".item .img img")` and `document.querySelector(".preview-container")` assume this component owns the document. Give the component a root `ref`, render it on the element wrapping `.gallery` and `.preview`, and scope both lookups to it. This is not cosmetic here: during the StrictMode remount, two copies of the sixteen-thumbnail grid exist in the tree for an instant, and an unscoped `querySelectorAll` can bind the click handlers to the sixteen `<img>` nodes that are about to be discarded rather than the ones that survive.

*(3) Cleanup, and the double-fire this component is uniquely exposed to* — StrictMode's mount → unmount → mount cycle reuses the same committed DOM nodes; it does not recreate them. If the cleanup never calls `removeEventListener` for `handleImageClick`, the second effect run attaches a second listener to the same sixteen `<img>` elements, and every real click afterward runs the handler twice in the same synchronous pass. The first pass appends the new preview image and starts sliding it to fill the box; before that tween has rendered a frame, the second pass calls `previewContainer.querySelector("img:last-child")` again and now finds the image the first pass just appended — so the picture the user clicked to bring in gets immediately treated as the outgoing one (scaled up, slid off to the left) while a second, redundant `<img>` for the same click slides in behind it. Keep a reference to `handleImageClick` and remove it from every thumbnail in the cleanup, alongside `ctx.revert()`.

*(4) The swap belongs to a named context method, not the factory body* — Every `gsap.to` in this component runs inside `handleImageClick`, which fires long after the effect's synchronous setup has already returned. Wrapping the click handler directly inside `gsap.context(() => { ... })` does not make GSAP track those tweens — the factory body finished executing before any click happened. Register the swap as a named method on the context instead, with the `self` parameter, and invoke it by name from the handler so the tweens it creates are still recorded for the eventual `revert()`:

```jsx
useEffect(() => {
  const root = rootRef.current;
  const thumbs = root.querySelectorAll(".item .img img");
  const previewContainer = root.querySelector(".preview-container");

  const ctx = gsap.context((self) => {
    self.add("swap", (newImg, currentLastImg) => {
      if (currentLastImg) gsap.to(currentLastImg, { scale: 1.5, left: "-50%" });
      gsap.to(newImg, { right: "0%" });
    });
  }, rootRef);

  function handleImageClick(event) {
    const imgNumber = event.currentTarget.src.match(/(\d+)\.jpeg/)[1];
    document.body.style.backgroundColor = colorArray[parseInt(imgNumber, 10) - 1];
    const currentLastImg = previewContainer.querySelector("img:last-child");
    const newImg = document.createElement("img");
    newImg.src = `/c/lightbox/${imgNumber}.jpeg`;
    newImg.style.position = "absolute";
    newImg.style.right = "-100%";
    previewContainer.appendChild(newImg);
    ctx.swap(newImg, currentLastImg);
  }

  thumbs.forEach((img) => img.addEventListener("click", handleImageClick));

  return () => {
    thumbs.forEach((img) => img.removeEventListener("click", handleImageClick));
    ctx.revert();
  };
}, []);
```

`ctx.revert()` only undoes what GSAP itself created: it kills whatever tween is still running at unmount and strips the inline `left`/`right`/transform styles GSAP wrote. It will not remove the plain `<img>` elements `appendChild` piled into `.preview-container` — but that pile needs no manual teardown either, because a mid-session unmount takes the whole `.preview-container` subtree with it, accumulated images included, in the same step that removes the component. What survives that step is the one write this effect makes outside its own subtree: `document.body.style.backgroundColor`. That line targets the document body directly, so whatever color the last click set stays painted on the page after this component and its cleanup are both gone. If a host app mounts and unmounts this component repeatedly, decide whether the cleanup should reset that color, since nothing here does it for you.
