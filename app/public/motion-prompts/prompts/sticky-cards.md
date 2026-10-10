# Sticky Stacking Service Cards on Scroll

## Goal
Build a scroll-driven page where four full-width **service cards** each pin at 35% of the viewport as you scroll and stack up under the next incoming card, while every pinned card's inner wrapper is scrubbed upward by a decreasing multiple of `14vh` — producing a layered "peel" as later cards slide over earlier ones. A centered intro headline stays pinned (with **no pin spacing**) for the whole duration of the stack, from the first card until the last. Smooth scroll via Lenis. The star effect is the **per-card pin + scrubbed inner-translate stack**, with the headline pin overlapping it.

## Tech
Vanilla HTML/CSS/JS with ES module imports, built under Vite (npm). Use:
- `gsap` (npm) with the single plugin **`ScrollTrigger`** (`gsap/ScrollTrigger`), registered once via `gsap.registerPlugin(ScrollTrigger)`.
- `lenis` (npm) for smooth scroll, wired into GSAP's ticker.

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
```

No framework, no SplitText, no CustomEase, no Three.js. All logic runs at module top level (no `DOMContentLoaded` wrapper needed since the script is a deferred module).

## Layout / HTML
One wrapper `div.app` containing five siblings in this exact order:

```html
<div class="app">
  <section class="hero"><img src="…hero" alt="" /></section>

  <section class="intro">
    <h1>Creating standout brands for startups that bring joy and leave lasting impressions.</h1>
  </section>

  <section class="cards">
    <div class="card" id="card-1">
      <div class="card-inner">
        <div class="card-content">
          <h1>Brand Foundation</h1>
          <p>The heart of your company's story. It shapes your vision, values, and voice, ensuring a clear and powerful impact in every, interaction.</p>
        </div>
        <div class="card-img"><img src="…card-1" alt="Brand Foundation" /></div>
      </div>
    </div>
    <div class="card" id="card-2"> … Design Identity … </div>
    <div class="card" id="card-3"> … Digital Presence … </div>
    <div class="card" id="card-4"> … Product Design … </div>
  </section>

  <section class="outro"><h1>Let's build a brand that leaves a mark.</h1></section>
</div>
```

- **Four cards**, ids `card-1` … `card-4`. Each `.card` wraps a `.card-inner` that holds two children: a `.card-content` (an `<h1>` title + a `<p>` paragraph) and a `.card-img` (a single `<img>`).
- Card titles / paragraphs (neutral agency copy):
  1. **Brand Foundation** — "The heart of your company's story. It shapes your vision, values, and voice, ensuring a clear and powerful impact in every, interaction."
  2. **Design Identity** — "Your brand's visual fingerprint. It crafts a distinctive look that sparks recognition and builds emotional connections with your audience."
  3. **Digital Presence** — "Our web solutions combine cutting-edge design and seamless functionality to create experiences that captivate and inspire your audience."
  4. **Product Design** — "We craft user-first products that are both functional and visually appealing, delivering solutions that leave a lasting impression."
- Intro `<h1>`: "Creating standout brands for startups that bring joy and leave lasting impressions."
- Outro `<h1>`: "Let's build a brand that leaves a mark."

## Styling
Fonts: load **Geist** and **Geist Mono** from Google Fonts (`family=Geist:wght@100..900&family=Geist+Mono:wght@100..900`). Use **Geist** as the page sans-serif (the body font-family). No monospace is actually rendered; Geist is what shows.

Global reset & base:
- `* { margin:0; padding:0; box-sizing:border-box; }`
- `img { width:100%; height:100%; object-fit:cover; }`
- `h1 { font-size:4rem; font-weight:600; line-height:1; margin-bottom:2.5em; }`
- `p { font-size:1.25rem; font-weight:500; }`

Full-viewport panels:
- `.hero, .intro, .outro { position:relative; width:100vw; height:100vh; padding:2em; }`
- `.hero { padding:0; }` (image is full-bleed).
- `.intro, .outro { background-color:#fff; display:flex; align-items:center; }`
- `.intro h1, .outro h1 { margin-bottom:0; }`

Cards (this is the geometry the effect hangs on):
- `.card { position:relative; }` — **no explicit height**; each card's height is content-driven.
- `.card-inner { position:relative; will-change:transform; width:100%; height:100%; padding:2em; display:flex; gap:4em; }` — the `.card-inner` is the element that gets translated by GSAP (not the `.card`), and `will-change:transform` is set on it.
- `.card-content { flex:3; }` (text column, ~3/4 width)
- `.card-img { flex:1; aspect-ratio:16/9; border-radius:0.75em; overflow:hidden; }` (image column, ~1/4 width, rounded, clipped)

Per-card `.card-inner` background colors (the color lives on `.card-inner`, not `.card`):
- `#card-1 .card-inner { background-color:#c3abff; }` (lilac / light purple)
- `#card-2 .card-inner { background-color:#ffffff; }` (white)
- `#card-3 .card-inner { background-color:#fed35b; }` (warm yellow)
- `#card-4 .card-inner { background-color:#1e1e1e; color:#fff; }` (near-black, white text)

Because cards are later in DOM order, each incoming card paints **on top of** the previous ones — so as cards pin and stack, `card-4` ends visually on top.

## GSAP effect (be exhaustive)

### Smooth scroll wiring (Lenis + GSAP ticker)
```js
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
Default Lenis options. Lenis scroll events drive `ScrollTrigger.update`, GSAP's ticker drives Lenis' `raf`, and lag smoothing is disabled so scrub stays glued to scroll.

### Collect cards
```js
const cards = gsap.utils.toArray(".card"); // [card-1, card-2, card-3, card-4], length 4
```

### 1) Pin the intro headline across the whole stack (no pin spacing)
A single ScrollTrigger pins the `.intro` section in place while all the cards scroll and stack:
```js
ScrollTrigger.create({
  trigger: cards[0],               // card-1
  start: "top 35%",                // pin begins when card-1's top reaches 35% of viewport
  endTrigger: cards[cards.length - 1], // card-4 (last card)
  end: "top 30%",                  // pin releases when card-4's top reaches 30% of viewport
  pin: ".intro",
  pinSpacing: false,               // NO spacer — following content keeps scrolling under the fixed headline
});
```
The intro headline (which sits directly above the cards in the DOM) freezes in place the moment card-1 climbs to the 35% line and stays frozen until card-4 nearly arrives (its top at 30%). With `pinSpacing:false`, no extra scroll length is inserted — the cards scroll up over/under the pinned headline.

### 2) Per-card pin + scrubbed inner-translate (the stack)
Loop every card. **Skip the last card** (`index === cards.length - 1`) — card-4 is never pinned and never animated; it is the final card that lands on top of the stack. For each of the first three cards (`card-1`, `card-2`, `card-3`):

**a) Pin the card (no pin spacing):**
```js
ScrollTrigger.create({
  trigger: card,
  start: "top 35%",     // this card pins when its top reaches 35% of viewport
  endTrigger: ".outro",
  end: "top 65%",       // stays pinned until the outro's top reaches 65% of viewport
  pin: true,
  pinSpacing: false,    // no spacer → each card pins at the same 35% line and overlaps the previous pinned cards
});
```
Because every card pins at the identical `top 35%` line with `pinSpacing:false`, they accumulate stacked at that line — a new card slides up and pins over the ones already held, building the deck.

**b) Scrub the card's inner wrapper upward:**
```js
gsap.to(card.querySelector(".card-inner"), {
  y: `-${(cards.length - index) * 14}vh`, // negative → moves UP, in vh units
  ease: "none",                            // linear; only easing comes from scrub + Lenis
  scrollTrigger: {
    trigger: card,
    start: "top 35%",     // same start as the pin
    endTrigger: ".outro",
    end: "top 65%",       // same end as the pin — all inners finish together at outro top 65%
    scrub: true,          // tied 1:1 to scroll position
  },
});
```

**Exact `y` end values** (`(cards.length - index) * 14vh`, with `cards.length === 4`):
- `card-1` (index 0): `y: -56vh`
- `card-2` (index 1): `y: -42vh`
- `card-3` (index 2): `y: -28vh`
- `card-4` (index 3): **no tween** (last card)

Each `.card-inner` slides from `y: 0` to its negative target over its own scrub window. Earlier cards travel farther up (−56 → −42 → −28) and, because they reach the 35% line sooner but all share the same end (`outro top 65%`), they animate over a longer scroll span. The net read: as each incoming card pins over the one below it, the covered card's content drifts upward and peeks past the top edge of the newcomer — a continuous layered peel, with the dark `card-4` settling on top at the end.

### Values summary
- **Trigger:** scroll only (ScrollTrigger + Lenis). No load/hover/click/mousemove.
- **Animated property:** `y` (translateY) of each `.card-inner`, in `vh`. Start `0` → end `−56vh / −42vh / −28vh` for cards 1/2/3.
- **ease:** `"none"` (linear) on the tweens. **scrub:** `true` on the inner-translate triggers.
- **Pins:** intro pinned `card-1 top 35%` → `card-4 top 30%`; cards 1–3 each pinned `top 35%` → `outro top 65%`. **All pins use `pinSpacing:false`.**
- **No** duration/delay/stagger/timeline labels, no SplitText, no CustomEase, no lerp/rAF loop of your own (Lenis' internal rAF is the only one). No `gsap.set` initial poses.

## Assets / images
- **1 hero image** — a full-viewport, full-bleed background filling `.hero` (`width:100%; height:100%; object-fit:cover`). A **landscape (~3:2) black-and-white studio photograph**: a lone folding chair spotlit at center on a seamless cyclorama backdrop, deep-black surrounds and soft grey floor — a moody, high-contrast greyscale editorial scene.
- **4 card images** — one per card, each rendered inside a **16:9 rounded, overflow-hidden frame** occupying roughly the right quarter of the card (`.card-img`, `flex:1`, `object-fit:cover`; portrait/square sources are center-cropped to the frame). Four cohesive editorial / product photographs, provided in card order (repeat in order if fewer are available). No brand logos:
  1. **Lilac card** — a landscape (16:9) **monochrome purple flat-lay** of streetwear laid out on a deep-violet surface (sneakers, folded white tee, shoulder bag, cap, jacket); dominant tones lilac and purple with white accents.
  2. **White card** — a **portrait product photograph** of a single cream-and-terracotta sneaker floating among red and white flowers; warm blush background, dominant colors cream, deep red and soft pink.
  3. **Yellow card** — a **grainy black-and-white portrait crop**: the collar and neck of a person in a dark blazer against a pale grey wall, face out of frame; high-contrast greyscale.
  4. **Dark card** — a **light grey-and-white marble / fluid texture**, soft flowing swirls with faint darker veining; near-monochrome white-and-grey abstract.

## Behavior notes
- **Desktop-first.** At `max-width:900px`: `h1` margin-bottom becomes `4rem`; `p` font-size becomes `1rem`; `.card-inner` switches to `flex-direction:column`; and **`.card-img { display:none; }`** — the image column is hidden entirely on small screens, so cards show text only. The pin/scrub stack still runs.
- Everything is scroll-scrubbed — nothing autoplays, so motion only occurs while scrolling. No explicit reduced-motion handling in the original.
- Section panels use `100vh`; cards are content-height. The whole effect relies on `pinSpacing:false` everywhere so the pinned elements overlap instead of pushing the page longer.

## Images

This component ships with 5 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/sticky-cards/assets/card-1.jpeg
https://motionprompts.dev/c/sticky-cards/assets/card-2.jpeg
https://motionprompts.dev/c/sticky-cards/assets/card-3.jpeg
https://motionprompts.dev/c/sticky-cards/assets/card-4.jpeg
https://motionprompts.dev/c/sticky-cards/assets/hero.jpeg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--paper`, `--periwinkle`, `--bone`, `--amber`, `--muted`, `--font-display`, `--font-mono`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. This component builds four `ScrollTrigger`s — the `.intro` pin plus one pin per non-last card — and three scrub tweens off a single Lenis instance. Setup that runs twice with teardown that runs never leaves a second copy of all seven pinning the same `.intro`/`.card` a second time, with the second scrub tween racing the first to write `y` on the same `.card-inner`. The visible symptom is a stack that snaps to the wrong offset or jumps twice per scroll tick, and two Lenis instances both driving `ScrollTrigger.update` on the same wheel event. None of this reproduces in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — Every statement above runs at the top level: `gsap.registerPlugin(ScrollTrigger)`, the `Lenis` construction and its ticker wiring, `cards = gsap.utils.toArray(".card")`, the intro's `ScrollTrigger.create`, and the `cards.forEach` loop that builds each card's pin and scrub tween all fire the instant the module is evaluated — which in React is import time, before this component has rendered a single `.card` or `.intro`. Move everything from the `Lenis` construction down into a `useEffect` with an empty dependency array. `gsap.registerPlugin(ScrollTrigger)` is the one line that can stay at module scope: it's one-time, app-wide configuration, harmless to run again on a remount.

*(2) Element lookups* — `gsap.utils.toArray(".card")` and the `.card-inner` lookup inside the loop both need to resolve against this component's own subtree, not the document, so build the array from a root ref (`gsap.utils.toArray(root.querySelectorAll(".card"))`) before the loop runs. A second, easier-to-miss version of the same problem hides inside the two `ScrollTrigger.create` calls themselves: `pin: ".intro"` on the headline trigger, and `endTrigger: ".outro"` on both the headline trigger and every per-card trigger, are bare selector strings — ScrollTrigger resolves those itself with its own internal, unscoped `document.querySelector`, not with anything you passed in. During the StrictMode double-mount that lookup can bind to the outgoing copy's `.intro` or `.outro` instead of the live one, so the pin freezes a headline that's already left the tree while the on-screen headline keeps scrolling past it. Resolve `.intro` and `.outro` from the root ref yourself and pass the elements, not the strings.

*(3) Cleanup* — Wrap the intro pin and the per-card loop in one `gsap.context` scoped to the root ref:

```jsx
useEffect(() => {
  const root = rootRef.current;
  const intro = root.querySelector(".intro");
  const outro = root.querySelector(".outro");
  const cards = gsap.utils.toArray(root.querySelectorAll(".card"));

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  const onTick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: cards[0],
      start: "top 35%",
      endTrigger: cards[cards.length - 1],
      end: "top 30%",
      pin: intro,
      pinSpacing: false,
    });

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return;
      const cardInner = card.querySelector(".card-inner");

      ScrollTrigger.create({
        trigger: card,
        start: "top 35%",
        endTrigger: outro,
        end: "top 65%",
        pin: true,
        pinSpacing: false,
      });

      gsap.to(cardInner, {
        y: `-${(cards.length - index) * 14}vh`,
        scrollTrigger: {
          trigger: card,
          start: "top 35%",
          endTrigger: outro,
          end: "top 65%",
          scrub: true,
        },
      });
    });
  }, rootRef);

  return () => {
    gsap.ticker.remove(onTick);
    lenis.destroy();
    ctx.revert();
  };
}, []);
```

The intro pin and the whole per-card loop run synchronously, in one pass through the factory — nothing here is deferred behind a callback the way a pinned `onUpdate` handler would be — so `ctx.revert()` alone unwinds all four triggers, the three scrub tweens, and the inline transform each one wrote on its `.card-inner`. There's no `self.add(...)` to reach for in this component: that pattern only matters when a trigger or tween gets created later, from inside a callback that runs after the factory has already returned, and nothing in this loop does that. The tween's own pacing — no easing beyond the linear ramp `scrub` already imposes — carries over unchanged; only the wiring around it moves.

The ticker line is the one thing `ctx.revert()` does not touch: `gsap.ticker.add` registers with GSAP's ticker, not with the context, so the anonymous arrow the original script passes it can never be unsubscribed. Keep it as a named reference — `onTick` above — and call `gsap.ticker.remove(onTick)` in the cleanup. Remove the ticker callback and destroy Lenis before calling `ctx.revert()`, not after: a tick landing in between can still call `lenis.raf()` on an instance you're mid-teardown on, or push a `ScrollTrigger.update` into triggers that no longer exist. `lenis.on("scroll", ScrollTrigger.update)` needs no separate teardown — it lives on the Lenis instance's own emitter, so `lenis.destroy()` clears it as a side effect. If this stack ends up sharing a page with other Lenis-driven sections, the singleton note already in this document under "Using this outside its demo page" still applies unchanged: lift the `Lenis` instance to the app shell instead of constructing a second one here.
