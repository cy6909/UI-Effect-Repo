# Draggable Pill Menu — Drag-Anywhere Drawer + Snap-Back Drop Zone + Expanding Hamburger

## Goal
Build a small **pill-shaped floating menu drawer** docked in the top-left corner. Two things make it: (1) the whole pill is **draggable anywhere in the viewport** with GSAP `Draggable`, and when you drag it back near its origin a **dashed "drop-zone" outline fades in** and the pill **springs back into its corner** on release; (2) clicking the hamburger toggler **expands the pill** — the nav-items row grows from `width: 0` to its full width while each link **fades + scales in with a staggered pop**, and the toggler bars **morph into an X**. Closing reverses it, with the links popping out from the end first. It is entirely click- and drag-driven — no scroll, no autoplay.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the single GSAP plugin **`Draggable`**. No ScrollTrigger, no smooth-scroll library. Import as:
```js
import gsap from "gsap";
import { Draggable } from "gsap/all";
gsap.registerPlugin(Draggable);
```

## Layout / HTML
```
.menu-drop-zone                      (fixed dashed outline behind the drawer — the snap target ghost)

.menu-drawer                         (fixed pill container — this whole element is the drag handle)
  .menu-logo
    img                              (small square logo mark)
  .menu-items                        (the collapsible links row — animated width)
    .menu-item > a  "Work"
    .menu-item > a  "Studio"
    .menu-item > a  "Contact"
  .menu-toggler                      (hamburger button — click target to expand/collapse)
    span
    span
```
Use neutral, fictional link labels — **Work, Studio, Contact**. No real brand names. Around the pill the demo lays out a static page (a headline, a lede, small mono labels at the corners) so the drag has a room to happen in; none of it animates.

## Styling
Fonts: **Inter** for the page and the links, **Space Mono** for the small uppercase perimeter labels (`.stage-tag`, `.eyebrow`, `.ground`), **Space Grotesk** for the headline.

Color tokens — bone page, near-black ink, and two accents that only ever appear as small areas (cobalt for links and the drag mark, lime for the toggler you press):
```css
:root {
  --paper: #f0ede4;
  --paper-lit: #f7f5ef;
  --paper-edge: #e4e1d5;
  --ink: #0d0d0d;
  --muted: #5f6368;
  --accent: #1141ff;       /* cobalt */
  --accent-lime: #c6f21e;

  --pill-shell: #fbfaf5;   /* the pill: flat warm-white shell… */
  --pill-toggle: #c6f21e;  /* …lime where you press */
}
```
`body` sits on `var(--paper)` under a wide `radial-gradient` highlight, so the page reads as lit paper rather than flat fill.

Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`. Everything is `rem`-based (assume `1rem = 16px`). The JS reads pixel widths off the DOM, so keep these dimensions:

Structural / load-bearing CSS:
- `.menu-drop-zone`: `position: fixed; top: 2rem; left: 2rem; height: calc(3.5rem + 0.7rem);` `border: 0.075rem dashed rgba(0,0,0,0.5); border-radius: 4rem;` `transition: opacity 0.2s ease-out;` `pointer-events: none; opacity: 0;`. (Its **width is set by JS**, not CSS — it is a dashed ghost the exact size of the pill, sitting under the drawer's home position, invisible until you drag near home.)
- `.menu-drawer`: `position: fixed; top: 2rem; left: 2rem; padding: 0.35rem;` `background-color: var(--pill-shell); border: 1px solid rgba(13,13,13,.12); border-radius: 4rem; box-shadow: 0 8px 24px rgba(13,13,13,.1); z-index: 30;` `display: flex; align-items: center;`. This element is the GSAP Draggable target. The `0.35rem` padding is read by the JS — do not change it.
- `.menu-logo`: `width: 6rem; height: 3.5rem; padding-left: 0.5rem; border-radius: 4rem;` flex-centered, `flex-shrink: 0;`. `.menu-logo img { width: 3.5rem; }`.
- `.menu-items`: `display: flex; gap: 0.35rem;` (this is the element whose `width`/`marginRight` are animated; it starts at width 0 so its links are clipped away).
- `.menu-items .menu-item`: `width: max-content; height: 3.5rem; border-radius: 4rem;` flex-centered, `flex-shrink: 0; opacity: 0;` (no fill of its own — the items read directly on the pill shell). `.menu-item a`: `text-decoration:none; color: var(--ink); font-weight: 600; font-size: 1rem; letter-spacing: -0.005em; padding: 0 1.5rem; user-select: none;` and turns `var(--accent)` on hover/focus.
- `.menu-toggler`: `position: relative; width: 3.5rem; height: 3.5rem; padding: 1.125rem;` `background-color: var(--pill-toggle); border-radius: 4rem;` `display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.2rem;` `flex-shrink: 0; cursor: pointer; transition: background-color .25s ease;` — the lime square is the only saturated area of the closed pill, which is what makes it read as the handle.
- `.menu-toggler span`: `position: relative; width: 100%; height: 0.125rem; background-color: var(--ink);` `transition: transform .3s ease, background-color .25s ease; transform-origin: center; will-change: transform;` (two thin black bars = the hamburger).
- `.drift-mark`: an inline decorative `<svg>` asterisk (three cobalt `#1141ff` strokes) `position: fixed; top:50%; right: clamp(2rem,8vw,9rem); transform: translateY(-50%); width: min(24rem,30vw); opacity: .22; pointer-events: none; z-index: 5;` — a big anchor on the empty right half that gives the drag somewhere to go. It is `aria-hidden`, never animated, and `display:none` on mobile.
- **Mobile (`max-width: 768px`)**: the pill moves to `top/left: 1rem` and shrinks to `2.9rem` tall (logo `4.2rem`, link text `0.86rem`, toggler padding `0.95rem`), and `.menu-drop-zone` follows at `calc(2.9rem + 0.7rem + 2px)`.

**Hamburger→X morph is pure CSS** (a `transition`, not GSAP) driven by an `.close` class the JS toggles on `.menu-toggler`:
```css
.menu-toggler.close span:nth-child(1) {
  transform: rotate(45deg)  translateX(0.125rem) translateY(0.1rem)  scaleX(0.9);
}
.menu-toggler.close span:nth-child(2) {
  transform: rotate(-45deg) translateX(0.125rem) translateY(-0.1rem) scaleX(0.9);
}
```

## GSAP effect (exhaustive)

### 0. Measure the pill widths in JS
Grab refs: `.menu-drop-zone`, `.menu-drawer`, `.menu-logo`, `.menu-items`, all `.menu-item`s, `.menu-toggler`. Track `let isMenuOpen = false;`.

Read live pixel dimensions and derive the two pill widths (padding and gap are the CSS `0.35rem` = `0.35 * 16 = 5.6px`):
```js
let menuItemsFullWidth = menuItems.offsetWidth;   // natural width of the links row
const drawerGap     = 0.35 * 16;
const drawerPadding = 0.35 * 16;
const logoWidth     = menuLogo.offsetWidth;        // 6rem box
const togglerWidth  = menuToggler.offsetWidth;     // 3.5rem box

const closedMenuWidth = drawerPadding + logoWidth + drawerGap + togglerWidth + drawerPadding;
let   openMenuWidth   = drawerPadding + logoWidth + drawerGap + menuItemsFullWidth + drawerGap + togglerWidth + drawerPadding;
```

### 1. Initial (closed) states — set immediately
```js
gsap.set(menuItems,        { width: 0, marginRight: 0 });   // collapse the links row
gsap.set(menuItemElements, { opacity: 0, scale: 0.85 });    // links hidden + slightly shrunk
gsap.set(menuDropZone,     { width: closedMenuWidth });     // ghost matches the closed pill
```

### 2. Re-measure after the web font loads
Inter arrives as a web font after first layout and changes the measured text width, so re-measure `menuItemsFullWidth` once fonts are ready (only if the menu is still closed):
```js
document.fonts.ready.then(() => {
  if (isMenuOpen) return;
  gsap.set(menuItems, { width: "auto" });
  menuItemsFullWidth = menuItems.offsetWidth;
  gsap.set(menuItems, { width: 0 });
  openMenuWidth = drawerPadding + logoWidth + drawerGap + menuItemsFullWidth + drawerGap + togglerWidth + drawerPadding;
});
```

### 3. Toggle wiring
`menuToggler` `click` → `toggleMenu()`: if `isMenuOpen` call `closeMenu()` else `openMenu()`, then flip `isMenuOpen`.

**openMenu()** — add class `close` to the toggler (CSS morphs bars → X), then:
```js
gsap.to(menuItems, {
  width: menuItemsFullWidth,
  marginRight: drawerGap,
  duration: 0.5,
  ease: "power3.inOut",
  onStart: () => {
    gsap.to(menuItemElements, {
      opacity: 1, scale: 1,
      duration: 0.3,
      stagger: 0.05,
      delay: 0.2,
      ease: "power3.out",
    });
  },
});
```
So the links row expands `width: 0 → menuItemsFullWidth` (and `marginRight 0 → 5.6px`) over **0.5s `power3.inOut`**; `onStart` kicks off a link-pop tween that (after a **0.2s delay**) fades each `.menu-item` `opacity 0→1` and `scale 0.85→1` over **0.3s `power3.out`** with a **0.05s forward stagger** (Work, then Studio, then Contact).

**closeMenu()** — remove class `close`, then:
```js
gsap.to(menuItems, {
  width: 0,
  marginRight: 0,
  duration: 0.5,
  ease: "power3.inOut",
  onStart: () => {
    gsap.to(menuItemElements, {
      opacity: 0, scale: 0.85,
      duration: 0.3,
      ease: "power3.out",
      stagger: { each: 0.05, from: "end" },
    });
  },
});
```
Same 0.5s `power3.inOut` collapse of the row; links fade/scale back out over 0.3s `power3.out` but with **`stagger: { each: 0.05, from: "end" }`** so Contact pops out first, then Studio, then Work (no `delay` this time). The toggler X un-morphs back to a hamburger via the CSS transition.

### 4. Draggable + snap-back drop zone
```js
const snapThreshold = 200;   // px

Draggable.create(menuDrawer, {
  type: "x,y",
  bounds: window,
  cursor: "grab",
  activeCursor: "grabbing",

  onDragStart: function () {
    // size the ghost to whichever pill state is current
    const activeMenuWidth = isMenuOpen ? openMenuWidth : closedMenuWidth;
    gsap.set(menuDropZone, { width: activeMenuWidth });
  },

  onDrag: function () {
    const withinSnap = Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;
    gsap.to(menuDropZone, { opacity: withinSnap ? 1 : 0, duration: 0.1 });
  },

  onDragEnd: function () {
    gsap.to(menuDropZone, { opacity: 0, duration: 0.1 });
    const withinSnap = Math.abs(this.x) < snapThreshold && Math.abs(this.y) < snapThreshold;
    if (withinSnap) {
      gsap.to(menuDrawer, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    }
  },
});
```
- **type `"x,y"`** — free 2D drag; **`bounds: window`** keeps the pill inside the viewport; cursor is `grab` at rest, `grabbing` while dragging.
- `this.x` / `this.y` are the Draggable transform offsets **relative to the home (top-left) position**, so `|x| < 200 && |y| < 200` means "within 200px of home."
- **onDragStart** sets the ghost's width to match the currently open or closed pill (so the outline is the right size to snap into).
- **onDrag** fades the dashed `.menu-drop-zone` ghost to `opacity 1` when inside the 200px snap radius, `0` when outside — each a fast **0.1s** tween. (The CSS also has a `0.2s` opacity transition, but the GSAP tween drives it here.)
- **onDragEnd** hides the ghost (0.1s), and if released inside the snap radius **springs the drawer home** with `{ x: 0, y: 0, duration: 0.3, ease: "power2.out" }`. Released outside the radius, the pill just stays where it was dropped.

## Assets / images
**1 image**, role = *logo mark inside the drawer pill*. A single small square/wordmark logo on a **transparent background** (SVG or PNG), displayed at `3.5rem` (≈56px) wide inside a `6rem` logo box. A bold, dark, geometric mark reads best against the light-grey pill. Any roughly 1:1 mark works; no real brand.

## Behavior notes
- Entirely **click + drag driven** — no scroll, no ScrollTrigger, no loops, no autoplay.
- The `.menu-drop-zone` ghost is `pointer-events: none` and `opacity: 0` at rest; it only appears mid-drag inside the 200px snap radius, and its **width is always assigned by JS**, never CSS.
- The pill can be dragged while **open or closed**; `onDragStart` re-sizes the ghost to the matching state, and the width re-measure on `document.fonts.ready` bails out if the menu is already open (to avoid clobbering an in-progress open width).
- No re-entrancy guard — GSAP overwrites in-flight tweens naturally if the toggler is clicked mid-animation.

## Images

This component ships with 1 reference asset, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/draggable-menu/logo.svg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--paper`, `--paper-lit`, `--paper-edge`, `--ink`, `--muted`, `--accent`, `--accent-lime`, `--pill-shell`, `--pill-toggle`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two `Draggable` instances installed on the same pill fighting over the same pointer events, two `click` listeners on the toggler each flipping their own copy of `isMenuOpen`. The symptom is a drawer that stutters mid-drag or opens twice on one click, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The file's own last line, `mount(Object.assign({}, DEFAULTS))`, runs the instant the module is evaluated — no `DOMContentLoaded`, no readiness check, nothing to wait for. That "instant the module is evaluated" is import time in React, before the component has rendered `.menu-drawer` or anything else `mount()` looks for. Move the entire body of `mount()` — the width measurements, the three `gsap.set` calls, the font-ready listener, `toggleMenu`'s wiring, and the `Draggable.create` call — into a `useEffect` with an empty dependency array, and return the function `mount()` already builds as `destroy`. The `mount(config)` / `destroy()` pair is not scaffolding to strip out here; it already has the shape `useEffect` wants.

*(2) Element lookups* — `.menu-drop-zone` and `.menu-drawer` are siblings, not container and content, so the root `ref` has to wrap both, not just the drawer. Scope all six lookups this component makes — drop zone, drawer, logo, items row, the `.menu-item` list, and the toggler — to that ref. `.menu-drop-zone` is the one easiest to get wrong: it sits at `opacity: 0` and reads as decorative, but it is a live target the drag callbacks write to on every `drag` event, and an unscoped `document.querySelector(".menu-drop-zone")` will happily bind to the copy the StrictMode remount is discarding.

*(3) Cleanup* — Wrap the body of `mount()` in a `gsap.context` scoped to the root ref and revert it in the cleanup:

```jsx
useEffect(() => {
  let destroyed = false;
  const ctx = gsap.context(() => {
    // the three gsap.set(...) calls, then Draggable.create(menuDrawer, { ... })
  }, rootRef);

  return () => {
    destroyed = true;
    ctx.revert();
  };
}, []);
```

That covers the `Draggable` instance itself: unlike a `gsap.ticker` subscription, `Draggable` does carry its own `.revert()` method, and because `Draggable.create` runs synchronously inside the factory above, `ctx.revert()` reaches it and tears it down correctly — there is no need to keep the array `Draggable.create` returns and call `.kill()` on it by hand the way the vanilla `destroy()` does; that bookkeeping exists there only because the vanilla version has no context to hand the instance to.

What `ctx.revert()` cannot reach is every tween created after that synchronous pass finishes: the row-width tween and the item pop tween inside `openMenu`/`closeMenu`, and the drop-zone opacity tween and the snap-back tween inside `onDragStart`/`onDrag`/`onDragEnd`. `gsap.context` only attributes a tween to itself while its factory function is synchronously running, and none of those four run during that window — `openMenu`/`closeMenu` fire later, from the toggler's `click` listener, and the three drag callbacks fire later still, called directly by `Draggable` in response to pointer events, bypassing anything `gsap.context` wraps. A component that unmounts mid-open, or mid-drag, leaves one of those tweens live with nothing tracking it. The vanilla `destroy()` already closes this gap without relying on the context at all: it keeps the literal list of elements any of those tweens can touch — items row, drawer, drop zone, and every `.menu-item` — and calls `gsap.killTweensOf` on that list, then `gsap.set(..., { clearProps: "all" })`. Port those two calls into the effect's cleanup, after `ctx.revert()`, along with removing the toggler's `click` listener and clearing its `close` class — the same three things `destroy()` already does.

*(4) The font-ready promise* — `document.fonts.ready.then(...)` can settle after a StrictMode unmount has already run. The script already guards for this with its own `destroyed` flag; reuse the same flag your cleanup sets instead of adding a second one. Keep the guard's other half too: `if (destroyed || isMenuOpen) return;` also bails out when the drawer has already been opened by the time the font resolves, so the re-measured width doesn't overwrite an in-progress opening tween. Losing that second condition wouldn't announce itself as a mounting bug — it would look like an occasional wrong-width drawer on a slow connection, which is a harder bug to trace back here.
