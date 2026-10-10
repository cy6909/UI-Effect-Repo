# Stacked Layers Overlay Menu — Curtain-Drop Background Stack + Clip-Path Panel Wipe + Masked Line Reveal

## Goal
Build a fixed top navbar with a hamburger toggler that opens a **fullscreen overlay menu**. The signature effect is a three-part open sequence off a single **paused GSAP timeline**: (1) four stacked full-height green background layers **drop down from the top like curtains** (`scaleY: 0 → 1`, `transform-origin: top`) one after another with a small stagger; (2) overlapping that, the dark nav panel **wipes in from top to bottom via an animated `clip-path` polygon**; and (3) the menu links — split into masked lines — **slide up from below their masks** in three staggered groups. Clicking the toggler again `.reverse()`s the exact same timeline to close (curtains retract, panel wipes up), and the hamburger bars morph into an X via CSS. It is entirely click-driven — no scroll, no autoplay.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`SplitText`**. No ScrollTrigger, no smooth-scroll library. Import as:
```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
```

## Layout / HTML
```
nav                                  (fixed top bar, flex space-between, z-index 2)
  .nav-logo > a > img                (small square logo mark, top-left)
  button.nav-toggler                 (hamburger — click target)
    span                             (top bar)
    span                             (bottom bar)

.nav-content                         (absolute overlay, pointer-events:none, z-index 1)
  .nav-bg                            (stacked background layer 1)
  .nav-bg                            (stacked background layer 2)
  .nav-bg                            (stacked background layer 3)
  .nav-bg                            (stacked background layer 4)
  .nav-items                         (the dark clip-path panel holding the links)
    .nav-items-col                   (col 1, narrower)
      .nav-socials    → 6 × a        (social links)
      .nav-legal      → 4 × a        (small legal links)
    .nav-items-col                   (col 2, wider)
      .nav-primary-links   → 5 × a   (big primary links)
      .nav-secondary-links → 4 × a   (medium secondary links)

section.hero                         (fullscreen background image, sits under the menu)
```
Use neutral, fictional labels — no real brand names:
- **.nav-socials** (6): Bluesky, Pinterest, YouTube, Instagram, LinkedIn, X
- **.nav-legal** (4): Cookie Policy, Accessibility, Data Rights, Disclosures
- **.nav-primary-links** (5): Home, Experiments, Latest Updates, Documentation, Community
- **.nav-secondary-links** (4): Playground, Build Something, Activity Feed, Profile

## Styling
Fonts (Google Fonts): **Onest** (variable 100–900, body/links) and **Google Sans** (variable, optical-size + italic axes — loaded but the visible UI is essentially all Onest). `body { font-family: "Onest", sans-serif; background-color: #141414; }`.

Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`.

Color tokens (all greens on near-black):
- Page background: `#141414`
- `.nav-toggler span` bars + all link text: `#fff`
- `.nav-legal a` text: `#318b6f` (muted green)
- `.nav-items` panel fill: `#084331` (deep green)
- The four stacked `.nav-bg` layers, in DOM order 1→4:
  - `nth-child(1)`: `#57cea5` (light mint green)
  - `nth-child(2)`: `#063124` (near-black deep green)
  - `nth-child(3)`: `#0b5c43` (dark green)
  - `nth-child(4)`: `#21ba80` (medium emerald)

Type sizes (all links: `text-decoration:none; color:#fff; display:block; letter-spacing:-2%; line-height:1.1; margin-bottom:0.5rem;`):
- `.nav-socials a`: `1.25rem`
- `.nav-legal a`: `0.9rem`, color `#318b6f`
- `.nav-primary-links a`: `3rem` (the big display links)
- `.nav-secondary-links a`: `1.5rem`
- `.nav-logo img`: `40px × 40px`

Structural / load-bearing CSS:
- `.hero`: `position: relative; width: 100%; height: 100svh;` fullscreen background image `no-repeat 50% 50%`, `background-size: cover`.
- `nav`: `position: fixed; top: 0; width: 100%;` flex `justify-content: space-between; align-items: center;` `padding: 1rem; z-index: 2;`.
- `.nav-logo, .nav-toggler`: `padding: 1rem; cursor: pointer;`.
- `.nav-toggler`: `background: none; border: none;` flex column, `justify-content: center; align-items: center; gap: 5px;`. Each `span`: `width: 40px; height: 2px; background: #fff; transition: all 0.4s ease;` (two thin white bars, 5px apart).
- **Hamburger → X morph is pure CSS** (a `transition`, not GSAP), driven by an `.open` class the JS toggles on `.nav-toggler`:
  ```css
  .nav-toggler.open span:first-child   { transform: translateY(3.5px)  rotate(45deg)  scaleX(0.75); }
  .nav-toggler.open span:nth-child(2)  { transform: translateY(-3.5px) rotate(-45deg) scaleX(0.75); }
  ```
- `.nav-content`: `position: absolute; top: 0; left: 0; width: 100%; pointer-events: none; z-index: 1;` (never blocks the hero when closed).
- `.nav-bg`: `position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;` **`transform: scaleY(0); transform-origin: top; will-change: transform; pointer-events: none;`** — the four layers are stacked on top of each other, each collapsed to zero height at the top edge (this is the closed state the timeline animates from).
- `.nav-items`: flex row, `gap: 2rem; padding: 8rem; background-color: #084331;` **`clip-path: polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%); will-change: clip-path;`** — the closed clip-path is a degenerate zero-height rectangle pinned at the top edge (all four points at `y:0`), so the panel is invisible until the timeline expands it.
- `.nav-items-col:nth-child(1)`: `flex: 2;` flex column, `justify-content: space-between; gap: 2rem;` (socials on top, legal on bottom).
- `.nav-items-col:nth-child(2)`: `flex: 4;` flex row, `gap: 2rem; justify-content: space-between;` (primary + secondary link groups side by side).
- **Masked-line initial state** (set in CSS, matched by SplitText output): `.nav-content a .line { position: relative; will-change: transform; transform: translateY(100%); }` — every split line starts pushed down 100%, hidden below its line-mask.

## GSAP effect (exhaustive)

### 1. State flags + the paused timeline
```js
const navToggler = document.querySelector(".nav-toggler");
const navBgs = document.querySelectorAll(".nav-bg");   // NodeList of the 4 layers

let isMenuOpen = false;
let isAnimating = false;

const tl = gsap.timeline({
  paused: true,
  onComplete: () => { isAnimating = false; },
  onReverseComplete: () => {
    gsap.set(linkBlocks.join(", "), { y: "100%" });   // re-hide every line after close
    isAnimating = false;
  },
});
```
The timeline is **built once, paused**. `isAnimating` is a re-entrancy guard set true on every click and cleared by `onComplete` (open) / `onReverseComplete` (close). On reverse-complete the link lines are force-reset back to `y: "100%"` because the link reveal is a **separate** set of tweens (not part of `tl`) and would otherwise stay revealed.

### 2. Timeline contents (exact order + timing)
**Tween A — background curtain stack** (appended at time 0):
```js
tl.to(navBgs, {
  scaleY: 1,
  duration: 0.75,
  stagger: 0.1,
  ease: "power3.inOut",
});
```
All four `.nav-bg` layers animate `scaleY: 0 → 1` from `transform-origin: top`, so each **drops down from the top edge like a curtain**. `stagger: 0.1` fires them 0.1s apart (layer 1 at 0, layer 2 at 0.1, layer 3 at 0.2, layer 4 at 0.3), each over `0.75s` on `power3.inOut`. Because the four colors are stacked with the light mint (`#57cea5`) first in DOM and the emerald/dark greens after, the staggered drop reads as overlapping colored curtains settling into place. This tween's total span = `0.75 + 0.1×3 = 1.05s`.

**Tween B — panel clip-path wipe** (position `"-=0.6"`, i.e. 0.6s before the end of tween A → starts at ≈ `1.05 − 0.6 = 0.45s`):
```js
tl.to(".nav-items", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 0.75,
  ease: "power3.inOut",
}, "-=0.6");
```
Animates the dark panel's `clip-path` from the degenerate top-pinned rectangle to the **full rectangle**, so the panel **wipes open downward from the top edge** over `0.75s` on `power3.inOut`, overlapping the tail of the curtain drop. Timeline ends at ≈ `0.45 + 0.75 = 1.2s`.

### 3. SplitText — split every menu anchor into masked lines
Created once at init (after the timeline object exists, since `linkBlocks` is referenced above):
```js
const splitLinks = SplitText.create(".nav-items a", {
  type: "lines",
  mask: "lines",
  linesClass: "line",
});
```
- Targets **all anchors** inside `.nav-items` (socials, legal, primary, secondary).
- `type: "lines"` splits each link into line elements; `mask: "lines"` wraps each line in an `overflow: hidden` mask; `linesClass: "line"` tags each with `.line`, which the CSS pre-offsets to `translateY(100%)` (hidden below its mask).

### 4. The link reveal (separate tweens, NOT on the timeline)
Links are grouped into three selector blocks:
```js
const linkBlocks = [
  ".nav-socials .line, .nav-legal .line",   // block 1: both small-link groups in col 1
  ".nav-primary-links .line",               // block 2: the big display links
  ".nav-secondary-links .line",             // block 3: the medium links
];

function animateLinksIn() {
  linkBlocks.forEach((selector) => {
    gsap.fromTo(
      selector,
      { y: "100%" },
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.85,
      },
    );
  });
}
```
Each block runs its own `fromTo` sliding its `.line` elements `y: 100% → 0%` over `0.75s` on `power3.out`, with a **0.05s internal stagger** and a shared **0.85s delay** — so all three blocks begin revealing at ~0.85s after open is triggered (while the panel is still wiping in), each group's lines cascading up 0.05s apart from behind their masks.

### 5. Toggle wiring
```js
navToggler.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;

  navToggler.classList.toggle("open");   // CSS morphs the two bars into an X

  if (!isMenuOpen) {
    tl.play();          // curtains drop + panel wipes open
    animateLinksIn();   // fire the (delayed) link reveal in parallel
  } else {
    tl.reverse();       // same timeline backwards: panel wipes up, curtains retract
  }

  isMenuOpen = !isMenuOpen;
});
```
- **Open:** `tl.play()` runs the timeline forward; `animateLinksIn()` is called at the same moment so the link reveal (delayed 0.85s) overlaps the panel wipe. Toggler gains `.open` → CSS morphs bars into an X.
- **Close:** `tl.reverse()` plays the identical timeline backwards — panel `clip-path` collapses back to the top, curtains retract to `scaleY: 0` — and `onReverseComplete` re-hides the link lines (`y: "100%"`). Toggler loses `.open` → X un-morphs to a hamburger.
- The `isAnimating` guard ignores clicks mid-animation; it clears on `onComplete` (open finished) or `onReverseComplete` (close finished).

## Assets / images
- **1 hero image** — role: *fullscreen background behind the whole menu*. A bright, high-key abstract render of flowing white marble: glossy sculpted waves and swirling ridges with soft grey/charcoal veining threading through them. Dominant colors are white and light grey with darker grey vein accents — a light, airy surface (note: much brighter than the dark UI it sits under). Displayed `background-size: cover` at `50% 50%`. Landscape ~16:9 (e.g. 1456×816 or larger).
- **1 logo mark** — role: *nav logo, top-left corner*. A near-white / off-white geometric outline mark (e.g. a rounded loop / racetrack shape) on a **transparent background**, square ~1:1 (512×512 PNG). Rendered at `40×40px`. It reads on the dark hero but would be near-invisible on a light background.

## Behavior notes
- **Responsive (`max-width: 1000px`):** `.nav-content` and `.nav-items` get `height: 100svh;`. `.nav-items` becomes `flex-direction: column; justify-content: center; padding: 0 2rem;`. The `.nav-legal` and `.nav-secondary-links` groups are **hidden** (`display: none`), and both `.nav-items-col`s switch to `flex: none;`.
- Entirely **click-driven** — no scroll, no ScrollTrigger, no autoplay, no loops.
- The overlay `.nav-content` is `pointer-events: none`, so the closed menu never blocks the hero.
- Single source of truth for open/close is the one paused, reversible timeline; the link reveal is fired alongside it and reset on reverse-complete.

## Images

This component ships with 2 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/overlay-menu/hero-garden.jpg
https://motionprompts.dev/c/overlay-menu/hero.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--panel`, `--deep`, `--emerald`, `--mint`, `--ink`, `--muted`, `--faint`, `--display`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone module that runs once at import time: it resolves `.nav-toggler` and the four `.nav-bg` layers straight off `document`, builds one paused `gsap.timeline`, splits every `.nav-items a` into masked lines, wires exactly one click listener to that timeline, and never expects to run a second time or to undo anything.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. This component's open/close state is unusually exposed to that, because the hamburger's `.open` class and the timeline's play direction stay in sync only *because* there is exactly one click listener toggling both together. Leave the vanilla `addEventListener` in place with no matching `removeEventListener`, and the StrictMode remount leaves two listeners on the same toggler button, each closing over its own `isMenuOpen`/`isAnimating` pair. One click then runs both handlers: `toggler.classList.toggle("open")` fires twice and cancels itself, so the bars never morph into an X even though both timelines just played the curtain drop and the clip-path wipe; the next click flips the class twice again and ends up back on `.open` while both timelines are reversing shut. From the second click on, the hamburger icon and the menu's actual open/closed state disagree — and this never shows up on first load, or in production, where the double-invoke doesn't happen.

*(1) The entry point* — Nothing here waits for `DOMContentLoaded` or `load`; the script builds the timeline, splits the links and attaches the click listener the instant the module is evaluated. In React that moment is import time, before the toggler or the four `.nav-bg` layers exist. Move that entire body — timeline, split, `linkBlocks`, `animateLinksIn`, the click listener — into a `useEffect` with an empty dependency array. `gsap.registerPlugin(SplitText)` is the one line that stays at module scope, unchanged.

*(2) Element lookups* — The markup here is three siblings directly under `<body>` — `nav`, `.nav-content`, `section.hero` — with no wrapping element, so the component needs an actual root node (wrap the three in a `<div ref={rootRef}>` or equivalent) purely so there is something to scope lookups to. `document.querySelector(".nav-toggler")` becomes `rootRef.current.querySelector(".nav-toggler")`. `document.querySelectorAll(".nav-bg")` needs the same treatment, but it can't lean on `gsap.context`'s automatic selector scoping to get there for free: that mechanism only rewrites selector *text* handed to a GSAP call, and the vanilla script instead resolves the four layers into a live `NodeList` *before* passing them to `tl.to()`. Resolve `.nav-bg` through the context's own scoped selector so the lookup itself is scoped, not just the tween that consumes it.

*(3) Cleanup* — Wrap the timeline, the split and the link-block setup in a `gsap.context` scoped to the root ref:

```jsx
useEffect(() => {
  let tl;
  let linkBlocks;
  let splitLinks;
  let isMenuOpen = false;
  let isAnimating = false;

  const ctx = gsap.context((self) => {
    const q = self.selector;

    tl = gsap.timeline({
      paused: true,
      onComplete: () => { isAnimating = false; },
      onReverseComplete: () => {
        gsap.set(linkBlocks.flat(), { y: "100%" });
        isAnimating = false;
      },
    });

    tl.to(q(".nav-bg"), { scaleY: 1 /* stagger and easing as documented above */ });
    tl.to(q(".nav-items"), {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    }, "-=0.6");

    splitLinks = SplitText.create(q(".nav-items a"), {
      type: "lines",
      mask: "lines",
      linesClass: "line",
    });

    linkBlocks = [
      q(".nav-socials .line, .nav-legal .line"),
      q(".nav-primary-links .line"),
      q(".nav-secondary-links .line"),
    ];

    self.add("animateLinksIn", () => {
      linkBlocks.forEach((lines) =>
        gsap.fromTo(lines, { y: "100%" }, { y: "0%" /* stagger and delay as documented above */ }),
      );
    });
  }, rootRef);

  const toggler = rootRef.current.querySelector(".nav-toggler");
  const handleClick = () => {
    if (isAnimating) return;
    isAnimating = true;
    toggler.classList.toggle("open");
    if (isMenuOpen) {
      tl.reverse();
    } else {
      tl.play();
      ctx.animateLinksIn();
    }
    isMenuOpen = !isMenuOpen;
  };
  toggler.addEventListener("click", handleClick);

  return () => {
    toggler.removeEventListener("click", handleClick);
    ctx.revert();
    splitLinks.revert();
  };
}, []);
```

`tl.to(q(".nav-bg"), …)` and `tl.to(q(".nav-items"), …)` both run during the context's synchronous pass, so `ctx.revert()` already knows about the timeline and rolls back the `scaleY`/`clipPath` inline styles it wrote. `animateLinksIn`'s tweens do not: its `gsap.fromTo` calls only run later, from inside `handleClick`, well after the synchronous pass has finished — wrapping it in `self.add` is what makes those tweens visible to `ctx.revert()` at all. Without that, a StrictMode unmount mid-reveal leaves the just-created tween running against `.line` elements React has already detached. Call it back as `ctx.animateLinksIn()`; never invoke the function directly. Revert the split *after* `ctx.revert()`, not before — the tweens `animateLinksIn` may have in flight target the `.line` nodes `splitLinks.revert()` removes, and killing the tweens first is what makes that safe.

`isMenuOpen` and `isAnimating` stay plain closured `let`s rather than `useRef` or `useState`: neither drives JSX — the hamburger morph is CSS reacting to `.open`, the timeline direction is state GSAP already owns — and because the listener is torn down on every unmount, each new effect run starts a fresh, correct pair. There's no stale-closure case here the way there is when a listener leak lets two generations of state coexist.

One dependency worth carrying over deliberately: `SplitText`'s `type: "lines"` measures line boxes against whatever face is loaded at call time, and the lines it produces are also the masks `animateLinksIn` reveals from — most visibly on `.nav-primary-links`, the largest display links. If the host app's font-loading strategy can't guarantee **Onest** is already active when this effect fires, gate `SplitText.create` (and everything computed from its output) behind `document.fonts.ready`, with the same cancellation flag the async rule above describes, and don't attach `handleClick` until that split exists — the handler above assumes `linkBlocks` and `ctx.animateLinksIn` are already defined the moment a click can happen.
