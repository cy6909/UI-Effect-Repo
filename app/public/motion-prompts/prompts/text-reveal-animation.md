# Text Reveal Animation (per-line char slide-in with skew, three trigger modes)

## Goal
Build a demo page of three full-viewport sections, each centered on one giant uppercase headline, where **every character of the headline slides in from the right with a skew and fades into place**. Each `<h1>` is split into lines / words / chars with GSAP SplitText, and the chars animate `x:100 → 0`, `skewX:20 → 0`, `opacity:0 → 1` on a `power3.out` ease. The signature detail: the per-character stagger is keyed to each char's **index within its own line**, so on a multi-line headline **all lines reveal in parallel** (all first-chars fire together, all second-chars 0.05s later, etc.) rather than one long left-to-right sweep across the whole block. The three sections demonstrate three trigger modes: (1) plays once on page load, (2) replays every time it scrolls into view (and resets when scrolled back above), (3) scrubs forward/back tied to scroll position. Smooth scroll via Lenis.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins `SplitText` and `ScrollTrigger`, and `lenis` (npm) for smooth scroll. No framework, no Three.js, no CustomEase. Imports:
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```
Register once at top level: `gsap.registerPlugin(SplitText, ScrollTrigger);`. Note SplitText is a GSAP plugin (bundled with modern gsap npm).

## Layout / HTML
Three `<section>`s, each with a single centered headline. The trigger mode is chosen by a data-attribute on the `<h1>`:

```html
<section class="one">
  <h1 class="animated-header">Lorem ipsum dolor sit</h1>
</section>

<section class="two">
  <h1 class="animated-header" data-animate-on-scroll>Lorem ipsum dolor sit, amet consectetur adipisicing</h1>
</section>

<section class="three">
  <h1 class="animated-header" data-scrub>Lorem ipsum dolor sit amet</h1>
</section>
```

- Every headline carries the class `animated-header` (the JS selects all of them).
- Section one's headline has **no data-attribute** → plays once on load.
- Section two's headline has **`data-animate-on-scroll`** → replays on scroll-enter.
- Section three's headline has **`data-scrub`** → scroll-scrubbed.
- The middle headline is intentionally the **longest** text (wraps to multiple lines at `width:65%`) so the parallel-per-line reveal is visible. Use neutral placeholder copy (e.g. lorem-style phrases); no brand names.

## Styling
Import the font (a heavy condensed sans, all weights + italics):
```css
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
```

Palette (CSS variables on `:root`) — three high-contrast dark-bg / neon-fg pairs:
- `--base-100: #23002b` (deep purple)   `--base-200: #ff94c2` (pink)
- `--base-300: #002529` (deep teal)     `--base-400: #94c6ff` (light blue)
- `--base-500: #291900` (deep brown)    `--base-600: #c2ff46` (acid green)

Reset: `* { margin:0; padding:0; box-sizing:border-box; }`

Typography (the display headline):
```css
h1 {
  text-transform: uppercase;
  font-family: "Barlow Condensed", sans-serif;
  font-weight: 900;
  font-size: clamp(3rem, 10vw, 15rem);
  letter-spacing: -2%;
  line-height: 0.75;      /* tight leading — lines pack close */
}
```

Sections (each fills the viewport, centers its headline):
```css
section {
  position: relative;
  width: 100%;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;        /* clips the x:100 offset chars while they slide in */
}
section h1 { width: 65%; } /* forces long headlines to wrap to multiple lines */

.one   { background-color: var(--base-100); color: var(--base-200); }
.two   { background-color: var(--base-300); color: var(--base-400); }
.three { background-color: var(--base-500); color: var(--base-600); }
```

SplitText element display rules (these class names must match the SplitText config below):
```css
.line { display: block; }
.word { display: inline-block; }
.char {
  display: inline-block;
  will-change: transform, opacity;
}
```
`overflow:hidden` on the section plus `display:inline-block` chars are what let each char translate horizontally without breaking layout or showing outside the panel.

## GSAP effect (exhaustive — this is the core)

### Smooth-scroll wiring (Lenis driven by the GSAP ticker)
Inside a `DOMContentLoaded` listener:
```js
const lenis = new Lenis({ autoRaf: false });
lenis.on("scroll", ScrollTrigger.update);              // keep ScrollTrigger synced to Lenis
gsap.ticker.add((time) => { lenis.raf(time * 1000); }); // Lenis rAF driven by GSAP ticker (ms)
gsap.ticker.lagSmoothing(0);                           // disable lag smoothing so scrub stays glued
```
`autoRaf:false` — Lenis does not run its own rAF loop; the GSAP ticker drives it.

### Wait for fonts, then init each headline
```js
document.fonts.ready.then(() => {
  document.querySelectorAll(".animated-header").forEach((el) => {
    initAnimatedHeader(el, {
      animateOnScroll: el.hasAttribute("data-animate-on-scroll"),
      scrub: el.hasAttribute("data-scrub"),
    });
  });
});
```
Waiting on `document.fonts.ready` is important — SplitText must measure line breaks against the final loaded font, or char positions will be wrong.

### `initAnimatedHeader(el, options)` — signature & defaults
```js
function initAnimatedHeader(el, {
  animateOnScroll = false,
  scrub = false,
  delay = 0,
  stagger = 0.05,
  duration = 0.65,
} = {}) { … }
```

### Step 1 — Split the headline
```js
const split = SplitText.create(el, {
  type: "lines,words,chars",
  linesClass: "line",
  wordsClass: "word",
  charsClass: "char",
  autoSplit: true,
});
const { chars, lines } = split;
```
`type:"lines,words,chars"` produces nested `.line > .word > .char` wrappers; `autoSplit:true` re-splits automatically if the font/layout changes so line grouping stays correct.

### Step 2 — Set the initial (hidden) state of every char
```js
gsap.set(chars, { x: 100, opacity: 0, skewX: 20 });
```
Each char starts **100px to the right**, **fully transparent**, and **skewed 20°**.

### Step 3 — Build per-line char metadata (the signature detail)
For each line, find only the chars that belong to that line and record each char's index **within its own line**:
```js
const charMeta = lines.flatMap((line) => {
  const lineChars = chars.filter((c) => line.contains(c));
  return lineChars.map((char, charIndexInLine) => ({ char, charIndexInLine }));
});
```
So the first char of *every* line has `charIndexInLine = 0`, the second char of every line has `1`, etc. This is what makes all lines animate in parallel instead of sequentially.

### Step 4 — The `animate(tl)` builder
Add one tween per char onto the timeline, positioning each at an **absolute time** equal to its in-line index × stagger:
```js
const animate = (tl) => {
  charMeta.forEach(({ char, charIndexInLine }) => {
    tl.to(
      char,
      {
        x: 0,
        opacity: 1,
        skewX: 0,
        ease: "power3.out",
        duration,            // 0.65
      },
      charIndexInLine * stagger,   // absolute position on the timeline (index * 0.05s)
    );
  });
  return tl;
};
```
Critical: the third argument is a **number**, an absolute timeline position (not `"+="`). Char N of *any* line is placed at `N * 0.05s`. Result: column 0 of all lines fires at t=0, column 1 at t=0.05, column 2 at t=0.10 … each char taking 0.65s with `power3.out`. Total timeline length = `(maxCharsInLongestLine − 1) * 0.05 + 0.65`.

### Step 5 — Wire the trigger, three modes:

**Mode A — default / on load (section one, no data-attr):**
```js
const tl = gsap.timeline({ delay });   // delay = 0
animate(tl);
```
An un-paused timeline → plays immediately (once fonts are ready). No ScrollTrigger.

**Mode B — `animateOnScroll` (section two, `data-animate-on-scroll`):**
```js
const tl = gsap.timeline({ paused: true, delay });
animate(tl);
ScrollTrigger.create({
  trigger: el,
  start: "top 100%",                 // when the headline's top hits the viewport bottom
  onEnter:     () => tl.restart(),   // (re)play from 0 each time it enters
  onLeaveBack: () => tl.pause(0),    // scrolling back up above it → reset to hidden frame
});
return;
```
Replays on every downward entry; resets to the start (hidden) frame when you scroll back above it.

**Mode C — `scrub` (section three, `data-scrub`):**
```js
const tl = gsap.timeline({ paused: true });
animate(tl);
ScrollTrigger.create({
  trigger: el,
  start: "top 90%",   // begins as the headline nears the bottom of the viewport
  end:   "top 45%",   // fully revealed a bit past center
  scrub: true,        // timeline progress glued to scroll position (reversible)
  animation: tl,
});
return;
```
The reveal is scrubbed: scrolling down plays it forward, scrolling up rewinds it. `start`/`end` map the headline's top from 90% → 45% of the viewport height onto timeline progress 0 → 1.

## Assets / images
None. This component is pure type — no images, SVGs, canvas, or video.

## Behavior notes
- **Desktop and mobile both work**; sizes are all `clamp()`/`vw`/`svh` based. No min-width gate.
- The animation is gated on `document.fonts.ready`, so nothing reveals until the web font has loaded (prevents mis-measured line splits).
- `autoSplit:true` means SplitText re-runs on relevant layout changes; the per-line grouping is recomputed accordingly. (Note: the `charMeta`/timeline is built once at init in the original — it does not rebuild the timeline on resize.)
- No `prefers-reduced-motion` branch in the original.
- All three timelines are one-shot except Mode B, which re-fires on each scroll-enter; Mode C is fully reversible via scrub. No infinite loops.
- Section `overflow:hidden` is load-bearing: it clips the `x:100` starting offset so chars don't spill past the panel edge before they settle.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--aubergine`, `--bone`, `--signal`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.

## Adapting this to React

Everything above describes a standalone document: three sections wired up once, on a page that only ever loads them a single time. React withdraws that guarantee — under React 19 with StrictMode, this effect mounts, unmounts, and mounts again before anything reaches the screen. Run this component's setup twice without a matching teardown and you get two `Lenis` instances both driven by the same `gsap.ticker`, fighting over the same wheel event; a second `ScrollTrigger` stacked on section two's headline that fires `tl.restart()` on a `tl` the first instance already owns, so the reveal on scroll-enter doubles up or fights the scrub happening in section three; and three more `SplitText` calls layered onto headlines whose `.char` spans are already split, so the second pass nests `.char` inside `.char` and the per-line index math (`charIndexInLine`) that makes all lines reveal in parallel now runs against the wrong nodes. None of this shows up in a production build — only in development, where the double-invoke happens. Treat the cleanup as part of the effect.

*(1) The entry point* — The script's entire body — creating `Lenis`, wiring it to `gsap.ticker`, and waiting on `document.fonts.ready` before touching any headline — sits inside a `document.addEventListener("DOMContentLoaded", …)` listener. That event has already fired by the time a React component mounts (React needed a ready DOM to mount into), so this listener is simply dead: no error, no smooth scroll, no reveal. Delete the listener and move its body into a `useEffect` with an empty dependency array.

*(2) Element lookups* — `document.querySelectorAll(".animated-header")` finds all three `<h1>`s by class, and which of the three modes each one gets is decided purely by reading `data-animate-on-scroll` / `data-scrub` off that same element inside the loop — none of that per-headline logic changes. What has to change is the query itself: give the component's outermost wrapper a `rootRef` and query `rootRef.current.querySelectorAll(".animated-header")` instead of `document`. During the StrictMode remount, two copies of the three sections exist for an instant, and an unscoped query would just as happily attach a `ScrollTrigger` to the copy that is on its way out.

*(3) Cleanup* — this component accumulates five kinds of state that each need their own teardown: a `Lenis` instance, the `gsap.ticker` subscription driving it, up to three GSAP timelines plus two `ScrollTrigger`s (sections two and three only — section one has neither), and three `SplitText` splits, one per headline. A `gsap.context` scoped to the root ref covers the timelines and triggers automatically; `Lenis`, the ticker, and the three splits are not GSAP objects, so each needs an explicit line in the cleanup.

The `document.fonts.ready` wait is where the async concern and the `gsap.context` concern collide, and the way to avoid the `self`/`ctx` ambiguity entirely is to let the promise's `.then()` be the thing that opens the context, instead of opening it up front and reaching into it later from a deferred callback:

```jsx
useEffect(() => {
  let cancelled = false;
  let ctx;

  const lenis = new Lenis({ autoRaf: false });
  lenis.on("scroll", ScrollTrigger.update);
  const driveLenis = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(driveLenis);
  gsap.ticker.lagSmoothing(0);

  document.fonts.ready.then(() => {
    if (cancelled) return; // unmounted before fonts settled — nothing left to split
    ctx = gsap.context(() => {
      const splits = [];
      rootRef.current.querySelectorAll(".animated-header").forEach((el) => {
        const split = SplitText.create(el, { type: "lines,words,chars", autoSplit: true });
        splits.push(split);
        initAnimatedHeader(el, split, {
          animateOnScroll: el.hasAttribute("data-animate-on-scroll"),
          scrub: el.hasAttribute("data-scrub"),
        });
      });
      return () => splits.forEach((split) => split.revert());
    }, rootRef);
  });

  return () => {
    cancelled = true;
    gsap.ticker.remove(driveLenis);
    lenis.destroy();
    ctx?.revert();
  };
}, []);
```

Because the context's factory now runs later — inside the `.then()`, once fonts are actually ready — everything it creates (the three headlines' timelines, the two `ScrollTrigger`s) is still created during that call's own synchronous pass, so the context tracks all of it without ever writing `self.add` or `ctx.add`: there is no gap between "the context exists" and "the content is created" for a deferred callback to fall into. The one thing the context cannot infer on its own is the three `SplitText` splits, since reverting a split rewrites the DOM rather than killing a tween; returning `() => splits.forEach(...)` from the factory registers that cleanup as part of the same teardown, so `ctx.revert()` runs it too. Skip that return and the next mount's three `SplitText.create` calls wrap `.char` spans that are already `.char` spans — the doubled-nesting failure described above.

`gsap.ticker.add(driveLenis)` is neither a tween nor a trigger, so `ctx.revert()` never touches it. This is what drives `lenis.raf` on every tick, since `autoRaf` stays off here, and it has to be removed by that same function reference or it keeps calling `.raf()` on a `Lenis` instance that `destroy()` has already torn down. This component owns its `Lenis` instance outright, so creating and destroying it here is correct; if this section is later composed into a page that already runs Lenis, delete this whole instance/ticker/`lenis.on` block in favor of the existing one, per the note above about a single shared instance. `lenis.destroy()` already tears down the `"scroll"` listener along with the raf loop, so that line needs no separate unsubscribe.

`gsap.registerPlugin(SplitText, ScrollTrigger)` stays exactly where it already is, at module scope outside the component — it only has to run once for the life of the page, not once per mount.
