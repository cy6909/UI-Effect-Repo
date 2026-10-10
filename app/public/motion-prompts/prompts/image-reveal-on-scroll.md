# Image Reveal On Scroll — Clip-Path Unmask Gallery + Per-Item Background Color

## Goal
Build a single full-page vertical-scroll editorial gallery of 8 tall portrait images arranged in a loosely staggered column (each image nudged to a different horizontal position so the eye zig-zags down the page). As each image scrolls into view, GSAP + ScrollTrigger unmask it top-to-bottom by morphing a `clip-path` polygon from a zero-height sliver at the top edge into the full rectangle (a curtain-drop reveal, `power1.out`, 2s). Simultaneously, entering an item tweens a fixed full-viewport background gradient to that item's own accent color, so the whole page's mood shifts color as you scroll. A fixed counter in the top-left corner reads out scroll progress as a whole-number percentage.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`ScrollTrigger`**. Register with `gsap.registerPlugin(ScrollTrigger)`. No smooth-scroll library (native scroll). No SplitText, no other plugins.

## Layout / HTML
Class names are load-bearing — the JS and CSS query them.

```
<div class="counter"><p>0</p></div>
<div class="bg-color"></div>

<div class="items">
  <!-- repeat this block 8 times -->
  <div class="item">
    <div class="item-img">
      <img src="/path/to/1.jpg" alt="" />
    </div>
    <div class="item-info">
      <p>0.451 29 Neo-Tokyo Streetwear Ensemble</p>
    </div>
  </div>
  ...
</div>
```

- Exactly **8** `.item` blocks inside `.items`, each with an `.item-img` wrapper holding one `<img>` and an `.item-info` caption below it.
- `.counter > p` starts as the text `0`. `.bg-color` is an empty fixed layer sitting behind everything.
- Item captions (small mono-ish labels, format `<decimal> <int> <Title>`) in order 1→8:
  1. `0.451 29 Neo-Tokyo Streetwear Ensemble`
  2. `0.312 47 Cybernetic Space Suit Design`
  3. `0.678 15 Martian Explorer Gear Concept`
  4. `0.289 51 Virtual Reality Avant-Garde Apparel`
  5. `0.563 34 Post-Apocalyptic Survival Outfit`
  6. `0.409 22 Interstellar Pilot Uniform Draft`
  7. `0.522 40 Underwater City Diver's Attire`
  8. `0.601 18 Artificial Intelligence Inspired Fashion`

## Styling
Font family: **"Neue Montreal"** (a neutral grotesque). There is no `@font-face` in the source — it's just named on `.counter` and `.items`, so it falls back to the system sans if unavailable. That's fine; don't add a webfont.

Global:
- `* { margin:0; padding:0; box-sizing:border-box }`.
- `img { width:100%; height:100%; object-fit:cover }`.

Fixed layers:
- `.counter { position:fixed; top:0; left:0; padding:2em; color:#000; font-family:"Neue Montreal" }`. It holds the scroll-percentage number and stays pinned to the top-left corner over everything.
- `.bg-color { position:fixed; width:100vw; height:100vh; z-index:-1 }` with initial `background: linear-gradient(0deg, rgba(250,186,74,1) 0%, rgba(252,176,69,0) 100%)` — an amber (`#faba4a`) glow rising from the bottom edge and fading to transparent at the top. Because it's `z-index:-1`, it sits behind the page content (the page itself has no background, so this gradient is the visible backdrop).

Gallery:
- `.items { width:100%; height:100%; padding:4em 2em; font-family:"Neue Montreal" }`.
- `.item { width:40%; margin-bottom:4em }` — each item occupies 40% of the page width; the 4em bottom margin stacks them vertically with air between.
- `.item-info { padding:0.5em 0 }` — the caption sits just under the image.
- `.item-img { overflow:hidden }` — **critical**: this clips the scaled image so the clip-path reveal reads cleanly and no overflow shows.
- `.item-img img { will-change:transform; transform:scale(1.25); clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%) }` — the image is permanently zoomed to 1.25 (the scale is **never animated**, it just guarantees a full crop with no edge gaps), and starts fully masked by a zero-height clip polygon pinned to the top edge (all four points on the top line).

Per-item accent background (set on each `.item-img` via `nth-child`, matching the JS color array index by index):
- `.item:nth-child(1) .item-img { background:#faba4a }`
- `.item:nth-child(2) .item-img { background:#bb2a26 }`
- `.item:nth-child(3) .item-img { background:#7e7d65 }`
- `.item:nth-child(4) .item-img { background:#989682 }`
- `.item:nth-child(5) .item-img { background:#5e4036 }`
- `.item:nth-child(6) .item-img { background:#e33b12 }`
- `.item:nth-child(7) .item-img { background:#252d1a }`
- `.item:nth-child(8) .item-img { background:#b04c0d }`

Per-item horizontal stagger (each item `position:relative` with a `left` offset, so the column weaves side to side):
- `.item:nth-child(1), .item:nth-child(5), .item:nth-child(8) { left:5% }`
- `.item:nth-child(3), .item:nth-child(7) { left:20% }`
- `.item:nth-child(2), .item:nth-child(4), .item:nth-child(6) { left:50% }`

## GSAP effect (be exact)

Two independent pieces of JS: (A) the per-item scroll-reveal + background tween, (B) the scroll-percentage counter.

### A. Per-item clip-path reveal + background color tween

Define the accent color array (index-aligned with the CSS `nth-child` backgrounds above):
```js
const bgColors = ["#faba4a","#bb2a26","#7e7d65","#989682","#5e4036","#e33b12","#252d1a","#b04c0d"];
const bgColorElement = document.querySelector(".bg-color");
```

Loop every `.item` with `gsap.utils.toArray(".item").forEach((item, index) => { ... })`. Inside, grab `const img = item.querySelector(".item-img img")` and create ONE `gsap.fromTo` per image:

```js
gsap.fromTo(
  img,
  { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
  {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power1.out",
    duration: 2,
    scrollTrigger: {
      trigger: item,
      start: "center bottom",
      end: "bottom top",
      toggleActions: "play none none none",
      onEnter: () => updateBackground(bgColors[index]),
      onEnterBack: () => updateBackground(bgColors[index]),
    },
  }
);
```

Exact semantics to preserve:
- **Animated property:** only `clipPath`, from `polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)` (zero-height sliver at top — image hidden) → `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` (full rectangle — image fully shown). The bottom two points travel from `y=0%` down to `y=100%`, so the image unmasks like a curtain dropping from the top edge to the bottom. Both polygons have 4 points so the morph interpolates cleanly.
- **`ease: "power1.out"`, `duration: 2`.** This is a **time-based tween triggered by scroll, NOT a scrubbed tween** — there is no `scrub`. When the trigger fires, the 2s reveal plays on its own timeline regardless of scroll speed.
- **ScrollTrigger:** `trigger: item`; `start: "center bottom"` (fires when the item's vertical center reaches the viewport bottom); `end: "bottom top"`; `toggleActions: "play none none none"` (play once on enter; do nothing on leave / enter-back / leave-back — so once revealed it stays revealed and never reverses).
- **Background callbacks:** `onEnter` and `onEnterBack` both call `updateBackground(bgColors[index])`. So scrolling down into an item, or scrolling back up into it, both retint the page to that item's accent.

Background tween helper:
```js
function updateBackground(color) {
  gsap.to(bgColorElement, {
    background: `linear-gradient(0deg, ${color} 0%, rgba(252,176,69,0) 100%)`,
    duration: 2,
    ease: "power1.out",
  });
}
```
It tweens `.bg-color`'s `background` to a fresh vertical gradient: the current item's accent solid at the bottom (`0%`) fading to transparent amber `rgba(252,176,69,0)` at the top (`100%`). `duration: 2`, `ease: "power1.out"`, so the color cross-fades smoothly as you move between items. (GSAP animates the gradient via its CSS plugin string interpolation.)

### B. Scroll-percentage counter

Inside a `DOMContentLoaded` handler:
```js
const counterElement = document.querySelector(".counter p");
const docHeight = document.documentElement.scrollHeight - window.innerHeight;

function updateScrollPercentage() {
  const scrollPosition = window.scrollY;
  const scrolledPercentage = Math.round((scrollPosition / docHeight) * 100);
  counterElement.textContent = `${scrolledPercentage}`;
}
window.addEventListener("scroll", updateScrollPercentage);
```
`docHeight` (total scrollable distance) is measured **once** on DOMContentLoaded; on every native `scroll` event the counter text is set to `round(scrollY / docHeight * 100)` — a plain integer, no `%` sign. It reads `0` at the top and `100` at the very bottom.

## Assets / images
**8 tall portrait images, 2:3 aspect ratio** (source is 896×1344), one per `.item`. They should read as a matched editorial set: stylized fashion / concept portraits — a single figure per frame, dramatic art-directed lighting, each on a bold saturated color field, in a futuristic sci-fi-couture register (streetwear, spacesuit, explorer gear, VR apparel, survival outfit, pilot uniform, diver's attire, AI-inspired look). High contrast, punchy color per image. `object-fit: cover` inside the `.item-img` (which is 40% page width) with a permanent `scale(1.25)` zoom, so give margin around the subject. No brand marks, no logos.

## Behavior notes
- **Load state:** every image starts fully masked (zero-height clip) and reveals only when its ScrollTrigger fires; the first item(s) near the top reveal almost immediately since their center is already near the viewport bottom.
- **Not scrubbed / not reversible:** `toggleActions: "play none none none"` means the reveal plays once and holds — scrolling back up does not re-hide an image (but the background still retints via `onEnterBack`).
- **`overflow:hidden` on `.item-img`** and **`will-change:transform`** on the img are required for a clean clip reveal with the 1.25 zoom.
- **Counter caveat (keep as-is for fidelity):** `docHeight` is computed once at `DOMContentLoaded`; if images load after that and change page height, the percentage denominator won't update — this matches the original.
- Light, mobile-safe, no WebGL/canvas. The layout is percentage-based; on narrow screens the 40%-wide items and `left` offsets still apply (no dedicated media query in the source).

## Images

This component ships with 8 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/image-reveal-on-scroll/1.jpg
https://motionprompts.dev/c/image-reveal-on-scroll/2.jpg
https://motionprompts.dev/c/image-reveal-on-scroll/3.jpg
https://motionprompts.dev/c/image-reveal-on-scroll/4.jpg
https://motionprompts.dev/c/image-reveal-on-scroll/5.jpg
https://motionprompts.dev/c/image-reveal-on-scroll/6.jpg
… 2 more under https://motionprompts.dev/c/image-reveal-on-scroll/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--paper`, `--ink`, `--ink-soft`, `--c1`, `--c2`, `--c3`, `--c4`, `--c5`, `--c6`, `--c7`, `--c8`, `--font`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. This component builds its eight reveal tweens and the `onEnter`/`onEnterBack` background retint from a `gsap.utils.toArray(".item").forEach` loop that also runs at the top level today; ported without care, a StrictMode remount hands each of the eight `.item` elements two live `ScrollTrigger`s watching the same trigger zone, so scrolling into an item can call `updateBackground` twice and can leave a color tween from the discarded first mount still writing to `.bg-color` after the surviving mount has already reverted and rebuilt its own triggers. The visible symptom is a stutter in the color cross-fade rather than a clean retint, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — This file has two different startup timings, not one, and both need to end up in the same place. The reveal loop (`gsap.utils.toArray(".item").forEach(...)`) and the `bgColors`/`updateBackground` pairing it drives run at the top level, the moment the module is evaluated — before React has committed the `.item` elements the loop reads via `item.querySelector(".item-img img")`. The scroll-percentage counter is the only piece guarded, and only by a bare `DOMContentLoaded` listener: by the time a React component mounts, that event has already fired, so `updateScrollPercentage` would never run if the listener were ported as-is. Delete the `DOMContentLoaded` wrapper, pull the reveal loop out of module scope, and put both bodies inside one `useEffect` with an empty dependency array.

*(1b) Order inside the effect — the lookups go ABOVE the loop* — The vanilla file declares `const bgColorElement = document.querySelector(".bg-color")` before the reveal loop, and that order is load-bearing, not incidental: **do not move the lookup below the loop**, however natural it feels to group it with the counter's own lookup. `updateBackground` closes over `bgColorElement`, and the only callers are the `onEnter`/`onEnterBack` of the triggers the loop creates. ScrollTrigger runs each trigger's first refresh **at the moment it is created, synchronously** — still inside that iteration of the `forEach`, before the loop has finished, let alone the effect body. Any item already past its `start` on mount fires `onEnter` right there, and with `start: "center bottom"` the first item always is. So `updateBackground` runs *during* the loop, on the very first pass. If the `const` holding `.bg-color` is written after the loop, that first `onEnter` reads the binding inside its temporal dead zone and throws `Cannot access 'bgColorElement' before initialization`; the throw escapes the effect and takes the React tree down with it — a blank component, not a missing retint. The safe order inside the effect body, top to bottom: read the root ref, resolve `.bg-color` and `.counter p` from it, define `updateBackground`, then build the reveal loop, then the counter's `docHeight` and its scroll listener, then return the cleanup.

*(2) Element lookups* — `bgColorElement` (`.bg-color`), `counterElement` (`.counter p`), and the per-item `item.querySelector(".item-img img")` inside the reveal loop are all unscoped lookups today. Give the component a root ref over the section wrapping `.counter`, `.bg-color` and `.items`, and resolve all three from it instead of `document` — the first two directly (`root.querySelector(...)`, above the loop, per *(1b)*), the third by passing the root as the second argument to `gsap.utils.toArray(".item", root)` and keeping the per-item `item.querySelector` relative to the item. Unscoped selectors are not a style problem here: during the StrictMode remount two copies of the subtree exist for an instant, and an unscoped selector can bind the reveal loop's `img` reference, or the background/counter tween targets, to the copy that's on its way out — the tween that actually runs then animates a node nothing on screen corresponds to anymore.

*(3) Cleanup* — Wrap the reveal loop in a `gsap.context` scoped to the root ref, and revert that context in the cleanup. Note where the lookups and `updateBackground` sit relative to the `gsap.context(...)` call — above it, for the reason in *(1b)*:

```jsx
useEffect(() => {
  const root = rootRef.current;
  const bgColorElement = root.querySelector(".bg-color");
  const counterElement = root.querySelector(".counter p");

  function updateBackground(color) {
    // gsap.to(bgColorElement, { background: `linear-gradient(...)`, … }) exactly as above
  }

  const ctx = gsap.context((self) => {
    // gsap.utils.toArray(".item", root).forEach(...) exactly as constructed above
  }, rootRef);

  // counter: docHeight, updateScrollPercentage, window.addEventListener("scroll", …)

  return () => {
    window.removeEventListener("scroll", updateScrollPercentage);
    ctx.revert();
  };
}, []);
```

The context covers the eight `clipPath` tweens and their `ScrollTrigger`s: they're built synchronously inside the loop, which itself runs synchronously inside the context factory, so the context's own tracking captures all of them for free. It does **not** automatically cover the tween `updateBackground` builds, because most of those calls arrive later — one per `onEnter`/`onEnterBack`, whenever an item's trigger crosses its threshold on a scroll tick — and a `gsap.to()` created after the context factory has returned is invisible to `ctx.revert()`. Route the call through `self.add()`, which runs the function immediately with the context active so whatever it creates is attributed to the context no matter when the callback fires:

```jsx
scrollTrigger: {
  // same trigger config as above
  onEnter: () => self.add(() => updateBackground(bgColors[index])),
  onEnterBack: () => self.add(() => updateBackground(bgColors[index])),
}
```

Use `self` — the argument the factory already received — and never name the outer `ctx` from inside the factory or from inside these callbacks. It is the same trap as *(1b)*, one variable over: the first item's `onEnter` fires during the initial refresh, while the `const ctx = gsap.context(...)` assignment is still in progress, so `ctx.add(...)` there throws `Cannot access 'ctx' before initialization` exactly as a late `bgColorElement` throws its own. `self` is already in scope and cannot.

Skip the `self.add()` wrap and a StrictMode remount can leave a color tween from the discarded first mount's `.bg-color` node still running after the surviving mount has already rebuilt its own eight triggers — the two chains fight over the same gradient for as long as whichever tween finishes last.

The scroll-percentage counter's `window.addEventListener("scroll", updateScrollPercentage)` sits entirely outside this: it is not a GSAP object, so `gsap.context` was never going to see it regardless of where it's called from. Keep the exact function reference and call `window.removeEventListener("scroll", updateScrollPercentage)` in the same cleanup. Without it, every mount this component goes through — the StrictMode double-mount, and later, every real navigation back to this route — adds one more permanent listener closing over that mount's own `counterElement`, each one still recomputing and writing on every scroll for the rest of the page's life. Registering the plugin (`gsap.registerPlugin(ScrollTrigger)`) belongs at module scope, not inside the effect — registering it repeatedly is harmless but pointless.
