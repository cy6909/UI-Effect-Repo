# Landing Page Reveal — Giant Word-Mark + Clip-Path Product Grid Unmask

## Goal
Build a full-screen editorial furniture landing hero with an **on-load reveal** driven by a single paused GSAP timeline (~4.8s total, plays once). Two giant word-marks — **"NORK"** and **"WOOD"** — rise letter-by-letter out of masks with a stagger, spread apart and scale up from tiny to full size, while the large center product image un-clips from its collapsed center point and scales up; the six surrounding side-product thumbnails then wipe open top-to-bottom via a staggered `clip-path`, the whole headline block drops from mid-screen down to the bottom edge, the product captions slide up out of their masks, and the top nav drops in. Everything is one timeline, no scroll — a pure load-triggered intro.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no plugins** (no ScrollTrigger, no SplitText, no smooth-scroll). All splitting is done manually in the HTML (each letter is its own element). Import with `import gsap from "gsap";` and build the whole sequence inside a `DOMContentLoaded` handler.

## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):

```
<nav>
  <div class="logo"><a href="#">Nork Wood</a></div>
  <div class="nav-items">
    <a href="#">Home</a>
    <a href="#">Info</a>
    <a href="#">Products</a>
    <a href="#">Shop</a>
  </div>
  <div class="contact"><a href="#">Contact</a></div>
</nav>

<div class="container">
  <div class="items">
    <!-- LEFT column: 3 side items -->
    <div class="items-col">
      <div class="item item-side">
        <div class="item-copy">
          <div class="item-copy-wrapper"><p>Scandinavian Chair</p></div>
          <div class="item-copy-wrapper"><p>(Seating)</p></div>
        </div>
        <div class="item-img"><img src="/c/lp-reveal-anim/img1.jpg" alt="" /></div>
      </div>
      <!-- item2 "Minimal Lamp / (Lighting)" img2, item3 "Modern Desk / (Office)" img3 -->
    </div>

    <!-- CENTER column: the single large hero product -->
    <div class="items-col">
      <div class="item-main">
        <div class="item-copy">
          <div class="item-copy-wrapper"><p>Elegant Sofa</p></div>
          <div class="item-copy-wrapper"><p>(Living Room)</p></div>
        </div>
        <div class="item-img"><img src="/c/lp-reveal-anim/img4.jpg" alt="" /></div>
      </div>
    </div>

    <!-- RIGHT column: 3 side items -->
    <div class="items-col">
      <!-- "Compact Shelf / (Storage)" img5, "Ornate Mirror / (Decor)" img6, "Sleek Table / (Dining)" img7 -->
    </div>
  </div>

  <div class="header">
    <div class="header-item header-item-1">
      <div class="letter"><div class="letter-wrapper">N</div></div>
      <div class="letter"><div class="letter-wrapper">O</div></div>
      <div class="letter"><div class="letter-wrapper">R</div></div>
      <div class="letter"><div class="letter-wrapper">K</div></div>
    </div>
    <div class="header-item header-item-2">
      <div class="letter"><div class="letter-wrapper">W</div></div>
      <div class="letter"><div class="letter-wrapper">O</div></div>
      <div class="letter"><div class="letter-wrapper">O</div></div>
      <div class="letter"><div class="letter-wrapper">D</div></div>
    </div>
  </div>
</div>
```

Details:
- **7 products** total. Left column = 3 `.item.item-side`, center column = 1 `.item-main`, right column = 3 `.item.item-side`.
- Product name + parenthetical category per item, in order: **Scandinavian Chair (Seating)**, **Minimal Lamp (Lighting)**, **Modern Desk (Office)** [left]; **Elegant Sofa (Living Room)** [center hero, img4]; **Compact Shelf (Storage)**, **Ornate Mirror (Decor)**, **Sleek Table (Dining)** [right].
- Each product caption is TWO stacked `.item-copy-wrapper` blocks (name, then category), each wrapping a single `<p>`. Both wrappers are masks.
- The headline is split **manually**: each of the 8 letters is a `.letter` (the mask) containing a `.letter-wrapper` (the moving glyph). "NORK" = `.header-item-1`, "WOOD" = `.header-item-2`.
- Use **"Nork Wood"** as the neutral placeholder furniture brand (nav logo). No real brand names.

## Styling
Font: the design uses **"PP Neue Montreal"** (a clean neo-grotesque sans). It is not a free web font — declare `font-family: "PP Neue Montreal"` on `html, body` and let it fall back to a system sans-serif (`Helvetica, Arial, sans-serif`) if unavailable; the layout does not depend on the exact face. Weights used: **300** (the giant letters), **500** (nav links, captions), **bold** (logo).

Palette:
- Page background: `rgb(196, 196, 176)` — a muted sage / warm-beige olive.
- All text: `#000`.

Global:
- `* { margin:0; padding:0; box-sizing:border-box }`.
- `html, body { width:100%; height:100%; overflow:hidden }` (no scrolling — the whole thing fits one viewport).
- `img { width:100%; height:100%; object-fit:cover }`.
- `a { text-decoration:none; color:#000; font-size:13.5px; font-weight:500 }`.

Nav:
- `nav { position:fixed; top:0; width:100%; padding:1em; display:flex }`; `nav > div { flex:1 }` (three equal thirds).
- `.logo a { font-weight:bold }`. `.nav-items { display:flex; gap:1em; justify-content:center }`. `.contact { display:flex; justify-content:flex-end }`.

Container + grid:
- `.container { display:flex; width:100vw; height:100vh; overflow:hidden }`.
- `.items { width:100%; display:flex }`; `.items-col { flex:1; display:flex }`.
- **Center column override:** `.items-col:nth-child(2) { flex:0 0 300px; display:flex; justify-content:center }` (fixed 300px-wide middle column, the two side columns share the rest).

Side items:
- `.item { position:relative; top:15vh; height:300px; flex:1; display:flex; flex-direction:column }` (pushed down 15vh from the top).
- `.item-copy { padding:0.5em; height:50px; display:flex; flex-direction:column; justify-content:center }`.
- `.item-copy-wrapper { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) }` — a full-rect clip that acts as a **mask** for the caption `<p>`.
- `.item-copy-wrapper p { position:relative; margin-bottom:0.25em; font-weight:500; font-size:13.5px; line-height:100% }`.
- `.item-side .item-img { flex:1; overflow:hidden; clip-path: polygon(0 0, 100% 0, 100% 0, 0 0) }` — **initial** clip collapses the image to a zero-height sliver along its **top edge** (all four points at the top → invisible).

Center hero:
- `.item-main { position:relative; top:15vh; width:300px; height:450px; overflow:hidden }`.
- `.item-main .item-img { overflow:hidden }`.
- `.item-main .item-img img { transform: scale(0.5); clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%) }` — **initial** state: shrunk to half size AND clipped to a single collapsed center point (fully hidden).

Headline:
- `.header { position:absolute; bottom:35%; transform-origin:center center; width:100%; display:flex }` — **initial** `bottom:35%` (floating in the mid/lower screen).
- `.header-item { position:relative; flex:1; display:flex; justify-content:center; transform: scale(0.25) }` — **initial** each word-mark is scaled to a quarter size.
- `.header-item-1 { left: 18vw }` and `.header-item-2 { right: 18vw }` — **initial** the two words sit pulled inward toward center.
- `.letter { flex:1; font-size:17vw; font-weight:300; display:flex; justify-content:center; align-items:center; clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) }` — huge glyphs; the full-rect clip masks the wrapper inside.
- `.letter-wrapper { position:relative }` (this is what moves; JS parks it below the mask).

## GSAP effect (be exact)

### Pre-set (initial JS states, before the timeline)
```js
gsap.set("nav", { y: -100 });                 // nav parked 100px above the top edge
gsap.set(".letter-wrapper", { y: 400 });      // every glyph shoved 400px down, hidden below its .letter mask
gsap.set(".item-copy-wrapper p", { y: 50 });  // every caption line shoved 50px down, hidden below its mask
```

### Defaults + timeline
```js
gsap.defaults({ duration: 1, ease: "power3.out" });      // EVERY tween below is 1s, power3.out (none overrides it)
const tl = gsap.timeline({ paused: true, delay: 0.5 });  // 0.5s delay, then...
// ...build the chain below...
tl.play();
```
Position params: a bare `.to()` appends at the **end of the current timeline**; `"<"` aligns to the **start of the previous tween**. There are three functional phases.

### Phase A — headline letters rise (starts at t=0)
```js
tl.to(".letter-wrapper", { y: 0, stagger: 0.1 });
```
All **8** `.letter-wrapper` glyphs slide from `y:400` back to `y:0` — each rises up out of its `.letter` mask. Stagger `0.1` left-to-right, so "N-O-R-K-W-O-O-D" pop up one after another. Duration 1 each → last glyph starts at 0.7s, this phase ends ~**t=1.7**.

### Phase B — words nudge apart + center image un-clips (appended, starts at t≈1.7)
```js
tl.to(".header-item-1", { left: "12vw" })                     // NORK: left 18vw → 12vw (drifts left)
  .to(".header-item-2", { right: "8vw" }, "<")                // WOOD: right 18vw → 8vw (drifts right) — same start
  .to(".item-main .item-img img",                             // center hero image...
     { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }, "<"); // ...clip opens center-point → full rect
```
The two word-marks begin spreading outward while the center product image blooms open from its collapsed center point to a full rectangle (still at `scale(0.5)`). All three tweens share the same start (`"<"`), duration 1 → ends ~**t=2.7**.

### Phase C — the big finish (all appended at the SAME start, t≈2.7)
All seven tweens below use `"<"` to align to the **start of the first Phase-C tween**, so they run in parallel from ~t=2.7:
```js
tl.to(".header-item-1", { left: 0, scale: 1 })                // NORK slams to left edge + scales 0.25 → 1
  .to(".header-item-2", { right: 0, scale: 1 }, "<")          // WOOD slams to right edge + scales 0.25 → 1
  .to(".item-main .item-img img", { scale: 1 }, "<")          // center hero image scales 0.5 → 1
  .to(".item-side .item-img",                                 // the 6 side thumbnails...
     { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", stagger: 0.1 }, "<") // ...wipe open top→bottom, staggered
  .to(".header", { bottom: 0 }, "<")                          // whole headline block drops 35% → 0 (to bottom edge)
  .to(".item-copy-wrapper p", { y: 0, stagger: 0.05 }, "<")   // all 14 caption lines rise out of their masks
  .to("nav", { y: 0 }, "<");                                  // nav drops in from -100 → 0
```
Clip-path notes:
- The **side images** start clipped to their top edge (`polygon(0 0, 100% 0, 100% 0, 0 0)`) and animate to the full rect `polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)` — the top two points stay put, the bottom two travel down from the top, so each thumbnail **wipes open downward** from the top. Stagger `0.1` across the 6 → they cascade.
- The **caption lines**: 14 `<p>` (2 per product × 7) slide `y:50 → 0`, stagger `0.05`.
- All clip-path polygons have matching 4-point counts so GSAP interpolates them smoothly.

### Timeline summary (seconds, relative to timeline start; add the 0.5s delay for wall-clock)
| t (s) | what happens |
|------|--------------|
| 0 – 1.7 | 8 headline letters rise `y:400→0` out of masks, stagger 0.1 |
| 1.7 – 2.7 | NORK `left 18→12vw`, WOOD `right 18→8vw`, center image clip center-point → full rect |
| 2.7 – 3.7 | NORK `left→0 scale→1`, WOOD `right→0 scale→1`, center image `scale 0.5→1`, headline block `bottom 35%→0`, nav `y:-100→0` |
| 2.7 – 4.2 | 6 side thumbnails clip open top→bottom, stagger 0.1 |
| 2.7 – 4.35 | 14 caption lines `y:50→0`, stagger 0.05 |

Total runtime ≈ **4.85s** including the 0.5s delay. Every tween is `duration:1, ease:"power3.out"` (the global default — nothing overrides it).

## Assets / images
**7 product photographs** of minimalist furniture / home objects, each shot on a plain neutral studio background (soft warm/grey seamless), matching the muted sage page. `object-fit: cover`.
- **1 hero image** (center, `.item-main`, box ~300×450 → portrait ~2:3): an elegant upholstered sofa as the flagship product.
- **6 thumbnails** (side columns, cover-cropped roughly square): a Scandinavian wooden chair, a minimal table/floor lamp, a modern wooden desk, a compact wooden shelving unit, an ornate decorative mirror, a sleek minimal dining table.
All should read as a matched catalog set — clean, editorial, evenly lit, neutral backdrops. If exact subjects are unavailable, any set of well-lit minimalist furniture on neutral backgrounds works.

## Behavior notes
- **Autoplay once** on `DOMContentLoaded` after a 0.5s delay. No scroll, hover, or click triggers; the page never scrolls (`overflow:hidden` on `html,body`).
- The animation mixes CSS-property tweens (`left`/`right`/`bottom` in `vw`/`%`, `y` in px, `scale`, and `clipPath` polygons) — GSAP handles the unit interpolation; keep the initial CSS values exactly as specified since the tweens read from them.
- **Responsive** (`@media max-width: 900px`): `.item-side { display:none }` (side thumbnails hidden, only the center hero shows); `.header { bottom:45% }`; `.header-item { transform: scale(0.5) }`; `.header-item-1 { left:14vw }`; `.header-item-2 { right:11vw }`. The timeline itself is unchanged — it still animates the (now hidden) side images harmlessly.
- No reduced-motion handling in the original; the whole reveal is the point of the page.

## Images

This component ships with 7 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/lp-reveal-anim/img1.jpg
https://motionprompts.dev/c/lp-reveal-anim/img2.jpg
https://motionprompts.dev/c/lp-reveal-anim/img3.jpg
https://motionprompts.dev/c/lp-reveal-anim/img4.jpg
https://motionprompts.dev/c/lp-reveal-anim/img5.jpg
https://motionprompts.dev/c/lp-reveal-anim/img6.jpg
… 1 more under https://motionprompts.dev/c/lp-reveal-anim/
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--taupe`, `--pine`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above runs as one paused `gsap.timeline`, built end-to-end inside a single synchronous call to `mount(config)` and played once with no scroll, hover, or click trigger. That single-pass construction is the easy case for this catalogue — there is no `onComplete` relay, no `setTimeout`, nothing waiting on a font or a texture — but React still withdraws the one guarantee this script leans on implicitly: that `mount()` runs exactly once per page load. Under React 19 with StrictMode, `useEffect` mounts, unmounts, and mounts again before the first frame reaches the screen. Run `mount(config)` twice without tearing the first pass down in between and you get two independent copies of this timeline animating the same eight letter-wrappers, the same six side thumbnails and the same fourteen caption lines from the same pre-set starting values — one finishing a beat after the other, so the reveal visibly stutters instead of playing once. Treat `destroy()` as the effect's cleanup, not as a convenience the live-editor happens to use.

*(1) The entry point* — The runtime dispatch at the bottom of the file — `window.MP.register({ defaults: DEFAULTS, mount })` when this catalogue's own live-editor is present, otherwise a `boot()` fallback gated on `document.readyState` — is infrastructure for hand-tuning `letterRise`, `letterStagger`, `copyRise`, `copyStagger`, `navDrop` and `startDelay` from outside the script; a consuming app ships neither branch. The `readyState` check exists to survive `boot()` being wired up after the HTML has already parsed, which cannot happen inside a component — `useEffect` only runs once React has committed the tree. Delete the whole `if (window.MP...) / else` block along with the guard, and call `mount(...)` with whatever config the component receives directly from inside a `useEffect` with an empty dependency array.

*(2) Element lookups* — Every target here — `nav`, `.letter-wrapper`, `.item-copy-wrapper p`, `.header-item-1`, `.header-item-2`, `.item-main .item-img img`, `.item-side .item-img`, `.header` — is a plain CSS string handed straight to `gsap.set`/`gsap.to`; there is not one `document.querySelector` in this script to rewrite. That works in your favor once `mount()`'s body runs inside a `gsap.context` scoped to a root ref: the scope argument makes GSAP resolve every one of those strings against descendants of that ref instead of the whole document, so every selector above stays exactly as written. The one thing to get right when you draw the ref boundary: `<nav>` sits as a sibling of `.container` in the markup, not inside it, so the root ref has to wrap both — scope the ref to `.container` alone and the `nav` selector resolves to nothing, and the nav-drop tween silently does nothing.

*(3) Cleanup — GSAP* — Wrap the entirety of `mount()`'s body — the three pre-set `gsap.set` calls and the eleven chained `.to()`s — in a `gsap.context` scoped to that same root ref:

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.set("nav", { y: -config.navDrop });
    gsap.set(".letter-wrapper", { y: config.letterRise });
    gsap.set(".item-copy-wrapper p", { y: config.copyRise });

    const tl = gsap.timeline({ paused: true, delay: config.startDelay });
    tl.to(".letter-wrapper", { y: 0, stagger: config.letterStagger })
      // ...the rest of the chain, unchanged...
      .to("nav", { y: 0 }, "<");

    tl.play();
  }, rootRef);

  return () => ctx.revert();
}, []);
```

Nothing here is deferred behind a callback — every `gsap.set`, the timeline itself, and every tween chained onto it are created while the factory is still on the stack — so there is no `self.add` to reach for and no `ctx`-before-initialization trap to avoid; that whole distinction only matters for choreography this component doesn't have.

`ctx.revert()` replaces the hand-written `destroy()` outright, not just its `tl.kill()` half. Reverting a context restores the pre-mount value of anything GSAP wrote inside it, including plain `gsap.set` targets — so the manual `gsap.set([...eight selectors...], { clearProps: "all" })` block becomes redundant the moment the pre-sets and the timeline both live inside the same context: `ctx.revert()` already un-writes the inline `y`, `left`, `right`, `bottom`, `scale` and `clipPath` values the timeline leaves behind, which is exactly the list `destroy()` was enumerating by hand. Drop that block; keeping it next to `ctx.revert()` is harmless but redundant.

One line survives the rewrite unscoped and stays a real leak risk: the `gsap.defaults(...)` call above the timeline — the one that gives every tween in this sequence its one-second duration and its power3.out easing — sets those as defaults on the *shared* `gsap` instance, not on this context or this timeline. A context only tracks animations and the property writes they make, not global instance state, so `ctx.revert()` cannot undo it and does not try. This component happens to set the same values on every mount, so re-running it in isolation is harmless, but the moment any other component in the same app calls `gsap.defaults()` with different values, whichever mounted most recently wins for every future tween anywhere on the page — including this component's own next remount. Move the defaults onto the timeline instead of the shared instance:

```jsx
const tl = gsap.timeline({
  paused: true,
  delay: config.startDelay,
  defaults: { /* the same duration and power3.out easing, now scoped to tl instead of the shared instance */ },
});
```

so they apply only to the eleven tweens built on `tl` and never touch the module-global default.
