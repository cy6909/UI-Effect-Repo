# Full-Screen Wheel Slider — Clip-Path Upward Wipe + Image Zoom-Settle + Rolodex Numbered Type

## Goal
Build a **full-screen vertical image slider driven entirely by the mouse wheel**. One full-bleed photo fills the viewport under a dark scrim; three tiny uppercase text read-outs (slide number, slide name, year) float over it. Each wheel step plays one 2-second choreographed transition: the incoming slide is **wiped up from the bottom edge by tweening its `clip-path` polygon**, its underlying image simultaneously **zooms/settles from `scale: 2` down to `scale: 1`** (and slides up from `top: 4em` to `0`), and the three stacked text columns each **roll up by exactly 30px** inside a 30px-tall masking window (a rolodex/odometer effect) with a slight per-column stagger. Scrolling back down reverses everything. The page itself never scrolls — the wheel event is intercepted and locked while animating.

## Tech
- Vanilla HTML / CSS / JS with ES module imports, bundled by a **Vite**-style dev server (npm project).
- **`gsap` (npm)** only — **no plugins** (no ScrollTrigger, no SplitText, no smooth-scroll library, no canvas/WebGL). All motion is plain `gsap.to` / `gsap.set` tweens fired on the native `wheel` event.
- Import:
```js
import gsap from "gsap";
```
- All logic runs inside a single `document.addEventListener("DOMContentLoaded", () => { … })` in `script.js` (loaded as `<script type="module" src="./script.js">`).

## Layout / HTML
Class names are load-bearing (the CSS masks and the JS selectors depend on them). Copy is fictional/neutral — no real brands.

```html
<div class="slider-content">                <!-- fixed dark scrim + all text, sits above every slide -->
  <div class="slide-number">
    <div class="prefix">                    <!-- the moving column: 5 stacked rows -->
      <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
    </div>
    <div class="postfix"><span>/</span> 5</div>   <!-- static "/ 5" -->
  </div>

  <div class="slide-name">
    <div class="names">                     <!-- moving column: 5 stacked names -->
      <div>Ether Shift Mode</div>
      <div>Solar Thread</div>
      <div>Quantum Sheen Veil</div>
      <div>Flux Aura</div>
      <div>Echo Nimbus</div>
    </div>
  </div>

  <div class="slide-year">
    <div class="years">                     <!-- moving column: 5 stacked years -->
      <div>2023</div><div>2021</div><div>2022</div><div>2023</div><div>2017</div>
    </div>
  </div>
</div>

<div class="slider">
  <div class="slide" id="slide-1"><img src="/c/full-screen-slider/img-1.jpg" alt="" /></div>
  <div class="slide" id="slide-2"><img src="/c/full-screen-slider/img-2.jpg" alt="" /></div>
  <div class="slide" id="slide-3"><img src="/c/full-screen-slider/img-3.jpg" alt="" /></div>
  <div class="slide" id="slide-4"><img src="/c/full-screen-slider/img-4.jpg" alt="" /></div>
  <div class="slide" id="slide-5"><img src="/c/full-screen-slider/img-5.jpg" alt="" /></div>
  <div style="height: 400vh"></div>          <!-- inert spacer, clipped by body overflow:hidden; has no visual effect -->
</div>

<script type="module" src="./script.js"></script>
```

The five `.slide` divs are **absolutely-positioned and stacked**; DOM order = z-order (slide-5 paints on top of slide-1), which is exactly what the reveal relies on — no z-index juggling. `document.querySelectorAll(".slide")` returns **5** elements (the trailing spacer has no `.slide` class), so slide indices run 0–4.

## Styling
Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`.
`html, body { height:100%; overflow:hidden; font-family:"Neue Montreal"; }` — **`overflow:hidden` on the whole page** (there is no native scroll; the wheel event does everything).

**Font:** `"Neue Montreal"` — a neutral grotesque sans (substitute: Inter / Neue Haas Grotesk / any clean grotesque).

**The slider stage:**
- `.slider { position:relative; width:100vw; height:100vh; }`.
- `.slide { position:absolute; bottom:0; left:0; width:100%; height:100%; overflow:hidden; clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); }` — the default clip-path is a **zero-height sliver pinned to the bottom edge** (all four vertices at `y:100%`), so a slide is fully hidden until revealed.
- `#slide-1 { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }` — the **first slide overrides the default and is fully visible on load** (a full rectangle).
- `img { width:100%; height:100%; object-fit:cover; }` — each photo fills its slide and is hard-cropped.

**The scrim + text overlay:**
- `.slider-content { position:absolute; top:0; left:0; width:100vw; height:100vh; z-index:10000; background:rgba(0,0,0,0.5); }` — a **50% black scrim over the whole viewport**, above every slide, that all the white text sits on.
- The three read-outs are absolutely positioned, all vertically centered at `top:55%` with `transform:translate(-50%,-50%)`:
  - `.slide-number { left:10%; display:flex; gap:0.25em; }`  (`.postfix span { padding:0 0.25em; }`)
  - `.slide-name   { left:30%; }`
  - `.slide-year   { right:20%; }`
- **Shared read-out styling — this is the rolodex mask:**
  `.slide-number, .slide-name, .slide-year { font-size:18px; color:#fff; line-height:30px; clip-path: polygon(0 0, 100% 0, 100% 30px, 0 30px); text-transform:uppercase; }`.
  The `clip-path` crops each read-out to a **30px-tall window** (matching `line-height:30px`), so only **one row** of its column is visible at a time.
- `.prefix, .names, .years { position:relative; top:0; }` — these are the **inner columns of stacked 30px rows** that GSAP translates on `y`; moving one up by 30px swaps which row shows through the window.

**Responsive (`max-width: 900px`):** `.slide-name { left:50%; }` and `.slide-year { right:10%; }` (the labels re-space on narrow screens).

## GSAP effect (be exact)

### State (module-level, set once on DOMContentLoaded)
```js
const slides = document.querySelectorAll(".slide");   // 5 slides, indices 0..4
let currentSlideIndex = 0;
let isAnimating = false;
let currentTopValue = 0;                               // cumulative px offset for the text columns

const elements = [
  { selector: ".prefix", delay: 0 },
  { selector: ".names",  delay: 0.15 },
  { selector: ".years",  delay: 0.3 },
];
```

### Initial set (before any interaction)
For **every slide except index 0**, pre-position its image zoomed and pushed down:
```js
slides.forEach((slide, idx) => {
  if (idx !== 0) gsap.set(slide.querySelector("img"), { scale: 2, top: "4em" });
});
```
Slide 0's image is left untouched (`scale:1`, `top:0`) so the first slide reads normally on load.

### `showSlide(index)` — reveal the next slide (wheel down)
Guarded by the lock: `if (isAnimating) return; isAnimating = true;`. Then:
```js
const slide = slides[index];
const img   = slide.querySelector("img");

currentTopValue -= 30;                                  // roll all text columns UP one 30px row

// 1) the three text columns roll up, staggered by their per-column delay
elements.forEach((elem) => {
  gsap.to(document.querySelector(elem.selector), {
    y: `${currentTopValue}px`,                          // e.g. -30, then -60, -90 … (cumulative)
    duration: 2,
    ease: "power4.inOut",
    delay: elem.delay,                                  // 0, 0.15, 0.3
  });
});

// 2) the incoming image zooms/settles from scale 2 -> 1 and slides top 4em -> 0
gsap.to(img, {
  scale: 1,
  top: "0%",
  duration: 2,
  ease: "power3.inOut",
});

// 3) the slide wipes UP: clip-path grows from the bottom sliver to a full rectangle
gsap.to(slide, {
  clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
  duration: 2,
  ease: "power4.inOut",
  onComplete: () => { isAnimating = false; },
});
```
Notes:
- The clip-path tween takes the two **top vertices from `y:100%` up to `y:0%`**, so the rectangle **grows upward from the bottom edge** — an upward wipe that uncovers the new slide over the one beneath it.
- All three tweens start together (same 2s duration). In the original the clip-path tween is written with a trailing `"<"` position argument, but `gsap.to` ignores a third argument outside a timeline, so it is a **no-op** — treat these as three concurrent tweens, not a sequenced timeline.
- The image and clip-path use different eases on purpose: **image `power3.inOut`**, **text + clip-path `power4.inOut`**.

### `hideSlide(index)` — collapse the current slide (wheel up)
The exact reverse, on the slide being left behind:
```js
currentTopValue += 30;                                  // roll text columns back DOWN one row
elements.forEach((elem) => {
  gsap.to(document.querySelector(elem.selector), {
    y: `${currentTopValue}px`, duration: 2, ease: "power4.inOut", delay: elem.delay,
  });
});

// slide clip-path collapses back to the bottom sliver (downward wipe out)
gsap.to(slide, {
  clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
  duration: 2, ease: "power4.inOut",
});

// image zooms back out: scale 1 -> 2, top 0 -> 4em
gsap.to(img, { scale: 2, top: "4em", duration: 2, ease: "power3.inOut" });

// (original fires the same clip-path collapse a second time carrying the onComplete lock reset —
//  redundant but harmless; you only need one clip-path tween whose onComplete does isAnimating=false)
```

### Wheel driver
```js
window.addEventListener("wheel", (e) => {
  if (isAnimating) return;                              // ignore input during the 2s transition
  if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
    showSlide(currentSlideIndex + 1);                   // scroll DOWN -> reveal next
    currentSlideIndex++;
  } else if (e.deltaY < 0 && currentSlideIndex > 0) {
    hideSlide(currentSlideIndex);                       // scroll UP -> hide current
    currentSlideIndex--;
  }
});
```
- **`isAnimating` lock**: one wheel notch = one complete 2s transition; every wheel event that arrives mid-transition is dropped. There is no queue and no momentum — it advances exactly one slide per accepted notch.
- Bounds are clamped: you cannot go past slide 5 (index 4) or before slide 1 (index 0).
- Because `currentTopValue` is cumulative and shared by all three columns, the number/name/year windows always show the row matching the current slide (row 1 at index 0, row 2 at index 1, …), staying in lockstep with the images.

## Assets / images
**5 full-bleed background photographs**, one per slide, each filling the entire viewport (`100vw × 100vh`, `object-fit: cover`, so a **landscape ~16:9 source** frames best; crops are expected). Style them as a **cohesive, cinematic, editorial set of dimly-lit interior scenes** — atmospheric gallery/museum-hall ambiences with figures, warm-to-neutral tones — so the 50% black scrim and small white type read clearly over every one. Incoming slides (2–5) are shown pre-zoomed at `scale:2` and settle to `scale:1`, so keep important subject matter away from the extreme edges. No brand marks or logos in the images. By role:
1. **img-1** (slide 1, visible on load): a quiet, dim interior scene — two small figures dwarfed by large blank/pale wall panels in a shadowy hall.
2. **img-2** (slide 2): visitors seated and standing before a large dark-walled framed picture.
3. **img-3** (slide 3): an ornate neoclassical room with two framed portraits flanking a doorway.
4. **img-4** (slide 4): motion-blurred figures walking past framed pictures in a warm-toned hall.
5. **img-5** (slide 5): a wide skylit corridor lined with large pictures and benches.

## Behavior notes
- **Wheel-only, no scroll, no autoplay, no loop, no rAF.** Page is `overflow:hidden`; the only interaction is the wheel. The trailing `400vh` spacer div is inert (clipped away) — do not rely on it for scrolling.
- **Desktop-first** — this is a `wheel`-driven interaction with no touch fallback, so it is effectively desktop-only.
- **Reduced-motion:** nothing animates until the user scrolls; if you add a `prefers-reduced-motion` path, snap `clip-path`/`scale`/`y` instantly (duration 0) instead of the 2s tweens rather than removing the slide change.
- Keep the three eases and the 2s duration exactly (`power4.inOut` for text + clip-path, `power3.inOut` for the image) and the per-column delays (`0 / 0.15 / 0.3`) — the slight offset between the number, name, and year columns is the signature texture of the effect.

## Images

This component ships with 5 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/full-screen-slider/img-1.jpg
https://motionprompts.dev/c/full-screen-slider/img-2.jpg
https://motionprompts.dev/c/full-screen-slider/img-3.jpg
https://motionprompts.dev/c/full-screen-slider/img-4.jpg
https://motionprompts.dev/c/full-screen-slider/img-5.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--coal`, `--fog`, `--zinc`, `--signal`, `--line`, `--gutter`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two `wheel` listeners on `window`, each driving its own copy of the slide index and the animating lock. The visible symptom is a single wheel notch that seems to skip a slide or fire the transition twice, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script waits for `DOMContentLoaded`. By the time a React component mounts, that event has already fired, so the listener is never called and the effect never runs — no error, no slider, nothing to debug. Move the whole body into a `useEffect` with an empty dependency array: the three module-level counters (`currentSlideIndex`, `isAnimating`, `currentTopValue`), the `elements` array, the initial `gsap.set` pass over slides 1 through 4, the `showSlide`/`hideSlide` declarations, and the `wheel` listener that drives them.

*(2) Element lookups* — `document.querySelectorAll(".slide")` and the three `document.querySelector(elem.selector)` calls inside `showSlide`/`hideSlide` (resolving `.prefix`, `.names`, `.years`) all assume this component owns the document. Give the component a root `ref`, render it on the outermost element (the one wrapping both `.slider-content` and `.slider`), and scope every one of those four lookups to it. The three text-column selectors are the easy ones to miss, because they are re-resolved fresh on every call rather than cached once like `slides` — and because nothing about `.prefix`/`.names`/`.years` identifies which slider instance they belong to, an unscoped lookup will happily bind to a second slider on the same page, or to the copy a StrictMode remount is discarding.

*(3) Cleanup* — Wrap the initial `gsap.set` loop in a `gsap.context` scoped to the root ref, same as any other GSAP setup. But `showSlide` and `hideSlide` don't run during that synchronous pass — they run later, whenever a `wheel` event lands — and `gsap.context` only attributes a tween to itself while its factory is synchronously executing. Call the two functions directly from the `wheel` handler and their tweens are invisible to the context: `ctx.revert()` on unmount leaves whichever transition was in flight still running, still writing to `clip-path` and `scale` on nodes React may have already torn down. Register them as named context methods instead, with the function-argument form of `self.add`, and call them through `ctx` from the listener:

```jsx
useEffect(() => {
  const slides = rootRef.current.querySelectorAll(".slide");
  let currentSlideIndex = 0;
  let isAnimating = false;
  let currentTopValue = 0;

  const ctx = gsap.context((self) => {
    slides.forEach((slide, idx) => {
      if (idx !== 0) gsap.set(slide.querySelector("img"), { scale: 2, top: "4em" });
    });
    self.add("showSlide", (index) => { /* body unchanged, including its own isAnimating lock */ });
    self.add("hideSlide", (index) => { /* body unchanged, including its own isAnimating lock */ });
  }, rootRef);

  const onWheel = (e) => {
    if (isAnimating) return;
    if (e.deltaY > 0 && currentSlideIndex < slides.length - 1) {
      ctx.showSlide(currentSlideIndex + 1);
      currentSlideIndex++;
    } else if (e.deltaY < 0 && currentSlideIndex > 0) {
      ctx.hideSlide(currentSlideIndex);
      currentSlideIndex--;
    }
  };
  window.addEventListener("wheel", onWheel);

  return () => {
    window.removeEventListener("wheel", onWheel);
    ctx.revert();
  };
}, []);
```

Calling `ctx.showSlide(...)` instead of the bare closure is what makes every tween inside it — the three text-column rolls, the image zoom-settle, the clip-path wipe — get attributed to the context, so `ctx.revert()` actually catches them regardless of which transition was mid-flight at unmount. `currentSlideIndex`, `isAnimating` and `currentTopValue` can stay as plain `let` bindings local to the effect rather than `useState`: they gate a synchronous, imperative sequence that never needs to trigger a render, and keeping them inside the effect means a StrictMode remount starts over with fresh values instead of inheriting the previous mount's.

*(4) The wheel listener itself* — `window.addEventListener("wheel", ...)` is not a GSAP artifact, so nothing about `ctx.revert()` touches it. It is also the only thing driving this component: there is no `IntersectionObserver`, no `ScrollTrigger`, just a raw wheel handler closing over the three counters above. Skip its teardown and the StrictMode remount leaves two handlers on `window`, each with its own independent `currentSlideIndex` starting at zero and its own `isAnimating` flag. A single wheel notch then fires both, so one physical scroll step drives two separate calls into `showSlide` (or `hideSlide`) — from two counters that both believe they're advancing from the same slide, since neither handler knows the other exists. Keep the handler reference, as `onWheel` above, and remove it in the same cleanup that reverts the context.
