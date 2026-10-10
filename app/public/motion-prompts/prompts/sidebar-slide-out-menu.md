# Sidebar Slide-Out Menu — Staggered Cards Sliding In From The Right + Background Blur

## Goal
Build a fullscreen hero page with a small **"Get the Overlay" toggle** pinned in the bottom-right corner. Clicking it slides a fixed **column of three white cards in from the right edge** of the screen with a fast GSAP **0.075s stagger** on a `power4.out` ease, while the whole page content **blurs to 15px** and the toggle button itself **slides off-screen to the right**. Clicking **any card** reverses everything — the cards slide back out past the right edge, the toggle slides back into its corner, and the page un-blurs. On top of that, each card has pure-CSS hover behavior: hovering a card swaps it to a deep-blue fill and reveals its body copy, and the first card additionally pops in a large close (×) icon. It is entirely **click- and hover-driven** — no scroll, no autoplay.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins**, no ScrollTrigger, no smooth-scroll library. Import as:
```js
import gsap from "gsap";
```
Icons come from the **Phosphor Icons** web font, served from your own origin. Link one stylesheet per weight you use, in `<head>`:
```html
<link rel="stylesheet" href="/vendor/phosphor/regular/style.css" />
<link rel="stylesheet" href="/vendor/phosphor/thin/style.css" />
```
Get them with `npm i @phosphor-icons/web@2.1.2` and copy those weight folders from
`node_modules/@phosphor-icons/web/src/` (each is a `style.css` plus its `.woff2`). Do **not** use
the package's own `index.js`: it injects these same stylesheets from `cdn.jsdelivr.net`.
Used icon classes: `ph ph-arrow-right` (the arrow in the toggle) and `ph-thin ph-x` (the close × on card 1).

## Layout / HTML
```
.container                             (fullscreen, position:relative — holds the site + toggle; this is what blurs)
  .website-content
    nav                                (fixed top bar, flex, 3 equal columns)
      .logo            "Motionprompts"
      .cta             "Subscribe"      (center column)
      .links                            (right column, flex-end)
        a "About"  a "Infos"  a "Contact"
    .hero                               (left-aligned headline block, vertically centered)
      h1  "Elite web designs"
      p   (a paragraph of body copy)
  .overlay-toggle                       (bottom-right white pill — the OPEN click target)
    p  "Get the Overlay"
    p  > i.ph.ph-arrow-right

.sidebar                               (fixed full-height column on the right; clips the cards)
  .card                                 (card 1)
    .card-title
      div  "Showreel"
      .close-btn > i.ph-thin.ph-x       (large × — only on card 1)
    .card-copy > p                       (body copy, hidden until hover)
  .card                                 (card 2)
    .card-title  "Community"
    .card-copy > p
  .card                                 (card 3)
    .card-title  "Catalog"
    .card-copy > p
```
Note the `.sidebar` is a **sibling of `.container`, not inside it** — so when `.container` blurs, the sidebar cards stay sharp. Use neutral, fictional labels (Motionprompts / Subscribe / About / Infos / Contact / Showreel / Community / Catalog) — no real brand names. Card body copies are short lorem-ipsum sentences.

## Styling
Font: **"Neue Montreal"** (a clean neutral grotesque sans-serif). If unavailable, fall back to a similar sans (`system-ui`, Helvetica). `html, body { width:100%; height:100%; background:#000; color:#fff; font-family:"Neue Montreal"; }`.

Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`.

Color tokens:
- Page background: `#000` (black)
- Text on hero: `#fff`; hero paragraph muted grey `#a0a0a0`
- Toggle pill + cards default fill: `#fff` with `#000` text
- **Card hover fill: `#020B44`** (deep navy blue) with `#fff` text

Structural / load-bearing CSS (these dimensions and the `right` offsets are what the GSAP tweens animate to/from — keep them exact):
- `.container`: `position: relative; width: 100vw; height: 100vh;` fullscreen hero background image `no-repeat 50% 50%`, `background-size: cover`.
- `nav`: `position: fixed; width: 100%; display: flex; padding: 1.5em;` with `nav > div { flex: 1; }`. `.cta { text-align: center; }`. `.links { display: flex; justify-content: flex-end; gap: 2em; }`. `a { text-decoration: none; color: #fff; }`.
- `.hero`: `position: absolute; top: 50%; transform: translateY(-50%); padding: 0 1.5em; width: 35%;`. `.hero h1 { font-size: 40px; font-weight: 400; margin-bottom: 10px; }`. `.hero p { color: #a0a0a0; line-height: 1.5; }`.
- `.overlay-toggle`: `position: absolute; right: 0; bottom: 0; width: 250px; height: 150px; margin: 0.75em; padding: 1em; border-radius: 0.5em; background: #fff; color: #000; display: flex; justify-content: space-between; cursor: pointer;` (label top-left, arrow icon top-right). Its `right` is the animated property (starts at the CSS `0`, effectively `right: 0.75em` visually via the margin).
- `.sidebar`: `position: fixed; top: 0; right: 0; width: 30vw; height: 100vh; padding: 0.75em; display: flex; flex-direction: column; gap: 0.75em; overflow: hidden; pointer-events: none;`. **`overflow: hidden` clips the cards while they sit off-screen at `right: -110%`; `pointer-events: none` is the closed state (JS toggles it to `all` when open so the cards become clickable).**
- `.card`: **`position: relative; right: -110%;`** (this off-screen offset is the closed state the GSAP tween animates from) `padding: 1em; flex: 1; background: #fff; color: #000; border-radius: 0.5em; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer;`. Three equal-height cards stacked vertically.
- `.card-title`: `font-size: 50px; letter-spacing: -0.035em;`.
- `.card:nth-child(1) .card-title { display: flex; justify-content: space-between; }` (title text on the left, close-btn on the right — only card 1).
- `.close-btn`: `position: relative; font-size: 60px; transform: scale(0); transition: transform 0.3s; transform-origin: center;` — hidden by default, scaled up on card-1 hover.
- `.card-copy`: `position: relative; opacity: 0; transform: translateY(20px); font-size: 15px; transition: transform 0.3s, opacity 0.3s;` — hidden by default, revealed on hover.

**Pure-CSS hover behavior (NOT GSAP):**
```css
.card:hover                 { background: #020B44; color: #fff; }
.card:hover .card-copy      { opacity: 1; transform: translateY(0px); }   /* copy slides up + fades in over 0.3s */
.card:nth-child(1):hover .close-btn { transform: scale(1); }              /* × pops from scale 0→1 over 0.3s */
```

## GSAP effect (exhaustive)

No plugins, no timeline object — the effect is built from **standalone `gsap.to()` tweens** fired inside two functions (`animateCardsIn` on open, `animateCardsOut` on close). Grab refs once on `DOMContentLoaded`:
```js
const container     = document.querySelector(".container");
const sidebar       = document.querySelector(".sidebar");
const cards         = gsap.utils.toArray(".card");        // the 3 cards, in DOM order
const overlayToggle = document.querySelector(".overlay-toggle");
```

### Open — `animateCardsIn()`
Fires **three parallel standalone tweens**, all starting on the same tick (see note on `"<"` below):

1. **Toggle slides off-screen right:**
   ```js
   gsap.to(overlayToggle, { right: "-500px", duration: 1, ease: "power4.out" });
   ```
   Animates the pill's `right` from its resting `0` to `-500px`, sliding it out past the right edge. `duration: 1`, `ease: "power4.out"`.

2. **Cards slide in, staggered:**
   ```js
   gsap.to(cards, { right: "0%", stagger: 0.075, duration: 1, ease: "power4.out" }, "<");
   ```
   Animates each card's `right` from the CSS `-110%` (fully off-screen to the right, clipped by the sidebar's `overflow: hidden`) to `0%` (flush in place). **`stagger: 0.075`** fires them 0.075s apart in DOM order — card 1 first (Showreel), then card 2 (Community), then card 3 (Catalog). `duration: 1` each, `ease: "power4.out"` (fast launch, long smooth settle).

3. **Page content blurs:**
   ```js
   gsap.to(container, { filter: "blur(15px)", duration: 1, immediateRender: false }, "<");
   ```
   Animates the `.container`'s CSS `filter` from `blur(0px)` to `blur(15px)` over `duration: 1`. **No `ease` specified → GSAP default `power1.out`.** `immediateRender: false` prevents GSAP from snapping the blur to its end value before the tween runs. Because the sidebar is a sibling (outside `.container`), the incoming cards remain crisp while the site behind them goes soft.

### Close — `animateCardsOut()`
The mirror image, again three parallel standalone tweens:

1. **Toggle slides back into its corner:**
   ```js
   gsap.to(overlayToggle, { right: "0px", duration: 1, ease: "power4.out" });
   ```
   `right: -500px → 0px`, `duration: 1`, `ease: "power4.out"`.

2. **Cards slide back out, staggered:**
   ```js
   gsap.to(cards, { right: "-110%", stagger: 0.075, duration: 1, ease: "power4.out" });
   ```
   `right: 0% → -110%` (back off-screen), same `stagger: 0.075` in DOM order, `duration: 1`, `ease: "power4.out"`.

3. **Page un-blurs:**
   ```js
   gsap.to(container, { filter: "blur(0px)", duration: 1, immediateRender: false }, "<");
   ```
   `blur(15px) → blur(0px)`, `duration: 1`, default `power1.out` ease, `immediateRender: false`.

**Note on the `"<"` third argument:** in the source it is passed to some of these standalone `gsap.to()` calls, but the position parameter (`"<"`) is **only meaningful on timeline methods** — on the global `gsap.to()` it is simply ignored. The practical result is that all three tweens in each function start together on the same tick. (You may include it verbatim for fidelity, or omit it — behavior is identical.)

### Wiring
```js
overlayToggle.addEventListener("click", () => {
  sidebar.style.pointerEvents = "all";   // enable card clicks while open
  animateCardsIn();
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    sidebar.style.pointerEvents = "none"; // disable card clicks while closed
    animateCardsOut();
  });
});
```
- **Open:** clicking the `.overlay-toggle` sets the sidebar to `pointer-events: all` (so the cards become clickable) and runs `animateCardsIn()`.
- **Close:** clicking **any** card sets the sidebar back to `pointer-events: none` and runs `animateCardsOut()`. (Every card closes the menu, including card 1 — the × icon is decorative CSS, not a separate handler.)
- There is **no re-entrancy guard**; GSAP overwrites in-flight tweens naturally if the user clicks rapidly.

Wrap everything in `document.addEventListener("DOMContentLoaded", () => { ... })`.

## Assets / images
- **1 hero background image** — role: *fullscreen background behind the whole site, sits inside `.container` and is what blurs*. A moody, dark, photographic image (low-key, cinematic). Displayed `background-size: cover` at `50% 50%`. Landscape ~16:9 (e.g. 1920×1080 or larger). Because the UI text is white and the card hover fill is a deep navy, a darker image reads best.

## Behavior notes
- Entirely **click + hover driven** — no scroll, no ScrollTrigger, no loops, no autoplay.
- The card enter/exit + toggle slide + page blur are **GSAP**; the card color swap, body-copy reveal, and card-1 × pop are **pure CSS `:hover` transitions** (all `0.3s`).
- Closed state is expressed in CSS (`.card { right: -110% }`, `.sidebar { pointer-events: none }`); JS only ever tweens toward/away from it and toggles `pointer-events`.
- Responsive (`max-width: 900px`): `.hero { top: 25%; width: 100%; }` and `.sidebar { width: 100vw; }` (the sidebar becomes a full-width overlay; cards still slide in from the right with the same stagger).

## Images

This component ships with 1 reference asset, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/sidebar-slide-out-menu/hero.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--paper`, `--paper-dim`, `--hover-ink`, `--gold`, `--hairline`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two triggers on the same element disagreeing about the same scrub, two smooth scrollers pulling on the same wheel event. The visible symptom is jitter or doubled speed, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script waits for `DOMContentLoaded`. By the time a React component mounts, that event has already fired, so the listener is never called and the effect never runs — no error, no animation, nothing to debug. Delete the listener and put its body directly inside a `useEffect` with an empty dependency array.

*(2) Element lookups* — Every `document.querySelector` in the code above assumes this component owns the document. Give the component a root `ref`, render it on the outermost element, and scope every lookup to it. Unscoped selectors are not a style problem here: during the StrictMode remount two copies of the subtree exist for an instant, and an unscoped selector will bind to the one that is on its way out. This component makes the ref placement non-obvious: the layout above is explicit that `.sidebar` is a **sibling of `.container`, not a descendant** — that separation is what keeps the three cards sharp while `.container` blurs — so the root ref has to sit on a wrapper enclosing both, not on `.container` alone; a ref scoped to `.container` would put the sidebar, its cards and the toggle's click target outside the subtree it can query. Replace `gsap.utils.toArray(".card")` with `Array.from(root.querySelectorAll(".card"))` against that same scoped root, for the same reason.

*(3) Cleanup* — Wrap the two tween-firing functions in a `gsap.context` scoped to the root ref, and revert that context in the cleanup:

```jsx
useEffect(() => {
  const root = rootRef.current;
  const container = root.querySelector(".container");
  const sidebar = root.querySelector(".sidebar");
  const overlayToggle = root.querySelector(".overlay-toggle");
  const cards = Array.from(root.querySelectorAll(".card"));

  const ctx = gsap.context((self) => {
    self.add("animateCardsIn", () => {
      gsap.to(overlayToggle, { right: "-500px" /* duration/ease as narrated above */ });
      gsap.to(cards, { right: "0%" /* stagger/duration/ease as narrated above */ });
      gsap.to(container, { filter: "blur(15px)", immediateRender: false });
    });
    self.add("animateCardsOut", () => {
      gsap.to(overlayToggle, { right: "0px" /* duration/ease as narrated above */ });
      gsap.to(cards, { right: "-110%" /* stagger/duration/ease as narrated above */ });
      gsap.to(container, { filter: "blur(0px)", immediateRender: false });
    });
  }, rootRef);

  const openMenu = () => { sidebar.style.pointerEvents = "all"; ctx.animateCardsIn(); };
  const closeMenu = () => { sidebar.style.pointerEvents = "none"; ctx.animateCardsOut(); };

  overlayToggle.addEventListener("click", openMenu);
  cards.forEach((card) => card.addEventListener("click", closeMenu));

  return () => {
    overlayToggle.removeEventListener("click", openMenu);
    cards.forEach((card) => card.removeEventListener("click", closeMenu));
    ctx.revert();
  };
}, []);
```

`animateCardsIn` and `animateCardsOut` are never called during the factory's synchronous pass — they only run later, from a click. That is exactly the situation `self.add` exists for. Inside the factory the variable is `self`, never `ctx`: `ctx` is still in its temporal dead zone at that point, and referencing it throws `Cannot access 'ctx' before initialization`. And `self.add` has two overloads that do different things. The single-argument form runs its function immediately, during the factory pass, and hands it the context object rather than any argument you meant to pass — using it here would fire the open/close tweens once at mount and leave `ctx.animateCardsIn` undefined, so the toggle's click handler would throw. The name-plus-function form used above only registers the method; it stays inert until the click handler calls `ctx.animateCardsIn()` or `ctx.animateCardsOut()`, at which point `gsap.context` attributes every tween created inside to this context, exactly as if it had run synchronously. Skip `self.add` and call `gsap.to()` straight from `openMenu`/`closeMenu` instead, and the tweens those clicks create are invisible to `ctx.revert()`: a StrictMode remount leaves the first pass's tweens still writable by a second effect pass that now also controls the same elements, and the two start fighting over the same inline `right`/`filter` values on alternating clicks.

`ctx.revert()` only undoes what it tracked: the `right` and `filter` inline styles the two registered tweens write to the toggle, the three cards and `.container`. It does not touch the plain `click` listeners on `overlayToggle` or the cards — those are ordinary DOM subscriptions, not GSAP objects — so they need their own `removeEventListener` in the same cleanup, passing the same function references `addEventListener` received. Skip that and the StrictMode remount leaves the first pass's listeners attached to the same nodes the second pass just wired up: one click on the toggle now runs `animateCardsIn` from both closures, firing the same pair of tweens twice on the same tick. That is harmless today, because GSAP overwrites a tween already targeting the same properties — but it silently doubles the moment `animateCardsIn`/`animateCardsOut` grows any side effect that isn't idempotent, such as an analytics call or a counter.
