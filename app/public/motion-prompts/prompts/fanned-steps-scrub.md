# Fanned Steps on an Arc — a sequence that rolls through the frame on a giant wheel

## Goal

Build a pinned section where **step cards rest on the rim of an enormous wheel sitting just below
the viewport and roll through it as you scroll**: each card swings up from the right, passes
upright through the centre, and swings off to the left, staying tangent to the arc the whole way.
Three cards are visible at once, so the reader can see they are inside a sequence rather than
looking at one card at a time.

Use it when the order is real information — steps, phases, a schedule. If the order does not
matter, this is the wrong mechanic and a grid is the right one.

## Tech

Vanilla HTML/CSS/JS with ES modules: `gsap` + `ScrollTrigger`, and `lenis`. No other plugins.

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
```

Wire Lenis to ScrollTrigger — this is not optional:

```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Lenis animates its own scroll position; ScrollTrigger reads the native one. Without that first line
the two clocks drift and the triggers fire at the wrong moment or not at all — the component looks
broken in a way that never reaches the console. `lagSmoothing(0)` stops GSAP from swallowing a long
frame, which on a scrubbed mechanic shows up as a jump.

## Structure

```html
<section class="process">
  <div class="track">              <!-- tall: this is the travel -->
    <div class="stage">            <!-- sticky: this is what you see -->
      <p class="label">The commission</p>
      <article class="step">…</article>    <!-- ×4 -->
      <div class="progress"><i></i></div>
    </div>
  </div>
</section>
```

## The parameters that ruin it — both measured

These are the whole point of this prompt. Everything else is dressing.

### 1. The radius is not chosen — it is solved for.

The design question is not "how big is the wheel", it is **"where do I want the neighbouring card
to sit"**. Pick that, and the radius falls out:

```js
SPREAD = innerWidth < 760 ? Math.PI * 0.55 : Math.PI * 0.9;
R = (innerWidth * 0.42) / Math.sin(SPREAD / steps.length);   // x = sin(paso)·R, solved for R
```

42% of the width from centre is far enough out that the middle card still dominates, close enough
in that the neighbour always peeks into frame.

Guessing the radius is the failure mode, and it failed **twice**. A constant (R = 560) put the
outer cards so far out that six of twenty-three frames came out nearly blank. Adding a floor and
scaling above it (`Math.max(560, innerWidth * 0.7)`) fixed desktop and left mobile broken: at
390px the floor wins, the neighbour lands 363px from centre against a 195px half-width, and
`qc-layout` reported two scroll positions with **0.4% and 0.0% of the viewport painted**. Solving
for R adapts on its own and never empties the centre.

Recompute inside `onRefresh` so rotating a phone does not leave the geometry computed against the
old width.

### 2. The opacity falloff must be gentle.

```js
const opacidad = gsap.utils.clamp(0, 1, 1.25 - Math.abs(a) * 0.85);
```

An aggressive clamp (`1.35 - |a| * 1.7`) extinguishes the neighbours and leaves exactly one card
on screen — which destroys the only thing this mechanic is for, which is *showing that there is a
sequence*. Keep at least the two neighbours legible.

### 3. Squash the arc vertically.

```js
// `a` is the card's angle on the arc and `R` the solved radius — both from the block further down.
gsap.set(f, {
  x: Math.sin(a) * R,
  y: (R - Math.cos(a) * R) * 0.55 - 40,        // <- 0.55 squashes it, -40 lifts it back up
  rotation: a * (180 / Math.PI) * 0.55,
});
```

A true circle pushes the neighbouring cards too far down and they leave the frame from the
bottom instead of the sides. Multiply the vertical component by ~0.55 and damp the rotation by
the same factor: the cards should *lean*, not lie down.

## Motion

One ScrollTrigger. No tween, no timeline on the cards — every position is written with
`gsap.set` inside `onUpdate`:

```js
const place = (p) => {
  const n = steps.length;
  steps.forEach((f, i) => {
    const rest = -SPREAD / 2 + ((i + 0.5) / n) * SPREAD;
    const a = rest + (0.5 - p) * SPREAD * 1.25;
    gsap.set(f, {
      x: Math.sin(a) * R,
      y: (R - Math.cos(a) * R) * 0.55 - 40,
      rotation: a * (180 / Math.PI) * 0.55,
      opacity: gsap.utils.clamp(0, 1, 1.25 - Math.abs(a) * 0.85),
      zIndex: Math.round(100 - Math.abs(a) * 50),
      scale: gsap.utils.clamp(0.86, 1, 1.06 - Math.abs(a) * 0.22),
    });
  });
};

ScrollTrigger.create({
  trigger: track, start: "top top", end: "bottom bottom",
  onUpdate: (s) => { place(s.progress); bar.style.width = `${s.progress * 100}%`; },
  onRefresh: (s) => { geometry(); place(s.progress); },
  invalidateOnRefresh: true,
});
```

**No `scrub`.** There is no tween to smooth — the positions are written directly every update.
All the smoothness you see comes from Lenis. Adding `scrub` here would only add latency.

**`SPREAD = Math.PI * 0.9`** — a wide arc on purpose. It is what puts three cards on screen at
once. The `(i + 0.5) / n` and the `× 1.25` on the travel are the margins that let the first card
enter from off-frame and the last one leave completely.

## Pin with sticky, not with ScrollTrigger's `pin`

```css
.track  { min-height: 300svh; position: relative; }
.stage { position: sticky; top: 0; height: 100svh; display: grid; place-items: center; }
```

`position: sticky` wraps nothing in a `.pin-spacer`, so it does not alter document flow or height
and coexists with any other section on the page. Reach for ScrollTrigger's `pin` only when you
need it to reserve the space for you; here the track already does.

**300svh is the rhythm** — 200svh of travel with the scene held, shared between the four steps.
More = slower steps, less = they trip over each other. It is the only number to touch.

## The card is a ticket, and that is not decoration

Two notches masked out of the sides with radial gradients:

```css
-webkit-mask: radial-gradient(circle 11px at 0 62%, transparent 98%, #000 100%),
              radial-gradient(circle 11px at 100% 62%, transparent 98%, #000 100%);
-webkit-mask-composite: source-in;
mask-composite: intersect;
```

A rounded rectangle on an arc reads as one more card. The ticket silhouette says *step in a
sequence* before the reader gets to the number. Note the two mask-composite syntaxes: WebKit
wants `source-in`, the standard wants `intersect`, and you need both.

## Also required

- `overflow-x: clip` on the section: the outer cards are off-frame by design and would otherwise
  lengthen the document. Never `hidden` — it would create a scroll container and kill the sticky.
- A **progress bar**. Inside a pinned section the scrollbar lies about where you are; the bar is
  the only honest cue. Two pixels is enough.
- `document.fonts.ready.then(() => ScrollTrigger.refresh())` — headline metrics move the track.

## Reduced motion

Drop the arc entirely and stack the steps, *and shrink the track back to `min-height: 0`* so the
reader is not made to scroll through 300svh of nothing. Cards are what they always were: a
numbered list.

## Adapting

Change the count (three to six; beyond six the arc gets crowded and cards overlap at centre), the
card content, the palette, the ticket notch position. Keep: the radius derived from viewport
width, the gentle falloff, the vertical squash, sticky rather than `pin`, and the progress bar.

## Adapting this to React

Everything above describes a standalone document: a script that waits for `DOMContentLoaded`,
bails under `prefers-reduced-motion` before touching Lenis or GSAP at all, otherwise builds one
`Lenis` instance driven by `gsap.ticker`, resolves `.track`, the four `.step` cards and the
`.progress i` bar once, solves `R` and `SPREAD` from the viewport, and wires a single
`ScrollTrigger` on `.track` whose `onUpdate` writes every card's arc position straight onto the DOM
with `gsap.set` — no tween, no timeline, just trigonometry re-evaluated on every scroll tick. React
withdraws every guarantee that setup leans on, and it does it quietly: the wheel rolls correctly on
first load and only misbehaves on a second mount or a real navigation away.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything
reaches the screen. Run this body twice without reverting the first pass and you get two `Lenis`
instances each computing its own eased scroll target from the same wheel deltas and independently
calling `scrollTo`, two `ScrollTrigger`s on the same `.track`, and two `onUpdate` handlers writing
`x`/`y`/`rotation`/`opacity`/`zIndex`/`scale` onto the same four `.step` cards from two progress
values that only agree when the two `Lenis` instances happen to be in the same phase. The visible
symptom is a wheel that stutters instead of rolling smoothly, and a progress bar whose width
flickers between two close but distinct percentages — nothing you'd catch from reading the arc
math, only from mounting it twice. None of this reproduces in a production build, since only
development double-invokes effects.

*(1) The entry point* — the whole body, from `gsap.registerPlugin` through the reduced-motion
check, the `Lenis`/ticker wiring, the `.track`/`.step`/`.progress i` lookups, `geometry()` and
`place()`, the initial `geometry(); place(0);` pass, the `ScrollTrigger.create` call and the
`fonts.ready` continuation, sits inside `document.addEventListener("DOMContentLoaded", ...)`. A
React component mounts after that event has already fired on the document, so none of it ever
runs — not even the reduced-motion branch. Delete the listener and move the entire body into a
`useEffect` with an empty dependency array. `gsap.registerPlugin(ScrollTrigger)` can move to module
scope; it currently re-registers on every mount, which is harmless but buys nothing.

*(2) Element lookups* — `document.querySelector(".track")` and
`document.querySelector(".progress i")` both assume this component owns the document; scope both
to a root ref instead. `.track` matters twice over, since the same node is also passed as
`ScrollTrigger.create`'s `trigger`, so an unscoped lookup during the StrictMode remount can hand
the trigger a `.track` that is on its way out while the `.step` cards resolve against the copy that
stays. `gsap.utils.toArray(".step")` is the one lookup that does **not** need a manual rewrite:
once it runs inside the `gsap.context` below, GSAP resolves that selector text against the
context's own scope automatically.

*(3) Cleanup* — wrap the reduced-motion check, the `Lenis` construction and ticker wiring, the
`geometry()`/`place()` definitions, the initial `geometry(); place(0);` call and the
`ScrollTrigger.create` call in one `gsap.context` scoped to the root ref:

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // matchMedia check + early return, Lenis + ticker wiring,
    // geometry()/place() definitions, geometry(); place(0);, ScrollTrigger.create
  }, rootRef);
  return () => ctx.revert();
}, []);
```

`ctx.revert()` kills the one trigger on `.track` and undoes the inline styles the initial,
synchronous `place(0)` call wrote onto the four `.step` cards. It does **not** reach any later call
`onUpdate` or `onRefresh` makes: those invoke `place()` well after the factory has returned, on a
scroll or refresh event, so the `gsap.set` writes they produce are invisible to the context. Left
alone, revert leaves the cards holding whatever arc position the last scroll tick wrote — a card
frozen mid-roll instead of resting at the pose `place(0)` describes — visible for a beat on the
next mount until the first real scroll event corrects it. Clear it explicitly, reusing the same
`steps` array the effect already holds rather than re-querying: `gsap.set(steps, { clearProps:
"all" })`.

`gsap.ticker.add((t) => lenis.raf(t * 1000))` sits outside the context for the usual reason — a
ticker subscription is neither a tween nor a trigger — and this component has no
`requestAnimationFrame` loop of its own besides it: the entire frame pump for smooth scroll and the
arc placement rides on that one subscription. Keep the function by reference and tear everything
down in this order, so a tick already in flight cannot call `.raf()` on a `Lenis` instance that no
longer exists:

```jsx
const pumpLenis = (t) => lenis.raf(t * 1000);
gsap.ticker.add(pumpLenis);
// cleanup:
gsap.ticker.remove(pumpLenis);
lenis.destroy();
ctx.revert();
gsap.set(steps, { clearProps: "all" });
```

`lenis.on("scroll", ScrollTrigger.update)` needs no separate teardown — it lives on the `Lenis`
instance's own emitter, so `lenis.destroy()` clears it along with that subscription. Smooth scroll
is a document-level resource: if this section ever ships embedded in a page that already runs its
own `Lenis`, lift the instance to the app shell and have this effect subscribe
`ScrollTrigger.update` to the existing one instead of constructing a second instance to fight it
over the same wheel input.

The last thing the effect starts is `document.fonts.ready.then(() => ScrollTrigger.refresh())`.
`.track`'s `start: "top top"`/`end: "bottom bottom"` are measured in absolute page-scroll
coordinates, so anything above this section reflowing once the real face loads shifts where those
two points land; refresh recomputes them and, through `onRefresh`, reruns `geometry()` and
`place(s.progress)` for whatever `R` and `SPREAD` the current viewport now solves for. Font loading
is asynchronous and can easily outlast a StrictMode mount-unmount cycle, so guard the continuation
with the same flag the cleanup sets — otherwise a refresh scheduled by an instance that no longer
owns `.track` still fires, running `onRefresh` and `place()` against a `steps` array whose
component has already been torn down:

```jsx
let cancelled = false;
document.fonts.ready.then(() => {
  if (cancelled) return;
  ScrollTrigger.refresh();
});
return () => {
  cancelled = true;
  gsap.ticker.remove(pumpLenis);
  lenis.destroy();
  ctx.revert();
  gsap.set(steps, { clearProps: "all" });
};
```
