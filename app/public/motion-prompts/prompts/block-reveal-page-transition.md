# Block Reveal Page Transition (pixel-grid flicker cover-and-reveal)

## Goal
Build a client-side "fake router" for a small four-page site where **navigating between pages plays a full-screen grid of small dark blocks that flickers in with a random stagger to fully cover the viewport, swaps the page content underneath while covered, then flickers the blocks back out to reveal the new page**. The star effect is the two-phase random-stagger opacity flicker of a procedurally generated 60px block grid acting as a transition curtain. Trigger is a click on the fixed bottom nav links.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) only — **no GSAP plugins, no ScrollTrigger, no SplitText, no Lenis**. There is no scroll interaction at all. Import as:
```js
import gsap from "gsap";
```
No `gsap.registerPlugin` call is needed.

## Layout / HTML
```
.transition-grid            (fixed full-viewport overlay; JS fills it with blocks)

nav                         (fixed bottom-center pill row)
  a[data-route="/"]         "Homebase"
  a[data-route="/gateway"]  "Gateway"
  a[data-route="/station"]  "Station"
  a[data-route="/colony"]   "Colony"

section.page.active[data-route="/"]          (Homebase — first page, visible on load)
  .section-bg > img         (full-bleed background image)
  .section-header > h1      "Homebase"
section.page[data-route="/gateway"]          (Gateway)
  .section-bg > img
  .section-header > h1      "Gateway"
section.page[data-route="/station"]          (Station)
  .section-bg > img
  .section-header > h1      "Station"
section.page[data-route="/colony"]           (Colony)
  .section-bg > img
  .section-header > h1      "Colony"
```
- The `.transition-grid` starts **empty** in the HTML — JS builds and appends all the block `<div>`s.
- Each nav link carries a `data-route` matching a `section.page`'s `data-route`. Only one `section.page` has class `active` at a time.
- Use neutral fictional page names (four sci-fi place labels like Homebase / Gateway / Station / Colony). No real brands.

## Styling
Fonts:
- Display: **Anton** (heavy condensed uppercase display face, Google Fonts, single weight 400), used for `h1` and the `.brand-mark`. Import it at the top of the CSS: `@import url("https://fonts.googleapis.com/css2?family=Anton&display=swap");` — or self-host it, which is what the published demo does.
- UI: **DM Mono** (Google Fonts, weights 300/400/500 + italics), used for nav links.

Color tokens:
- `--base-100: #fcfcfc` (near-white text)
- `--base-200: #3f3f3f` (mid-grey page background, seen only briefly)
- `--base-300: #0f0f0f` (near-black — the transition blocks AND the nav pill background)
- `body { background-color: var(--base-200); color: var(--base-100); }`

Type:
- `h1`: `text-transform: uppercase; font-family:"Anton", "Space Grotesk", sans-serif; font-size: clamp(4rem, 15vw, 13rem); font-weight:400; line-height:0.86; letter-spacing:0.005em;` — Anton ships a single weight, so do not ask for 500.
- `a`: `text-transform: uppercase; color: var(--base-100); font-family:"DM Mono", monospace; font-size:0.8rem; font-weight:450; line-height:1; text-decoration:none;`
- `img { width:100%; height:100%; object-fit: cover; }`

Key structural CSS (load-bearing):
- `nav`: `position: fixed; bottom: 5rem; left: 50%; transform: translateX(-50%); display:flex; gap:0.25rem; z-index:2;`
- `nav a`: `padding:0.5rem 0.75rem; background-color: var(--base-300); border-radius:0.2rem; transition: transform 200ms ease-out;` and `nav a:active { transform: scale(0.9); }` (a small press feedback on click).
- `section`: `position:relative; width:100%; height:100svh; display:flex; justify-content:center; align-items:center; overflow:hidden;`
- **Fake-router visibility:** `section.page { display:none; }` and `section.page.active { display:flex; }` — only the active page is in the layout; the others are removed entirely.
- `.section-bg`: `position:absolute; width:100%; height:100%; z-index:-1;` (image sits behind the centered `h1`).
- `.transition-grid`: `position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:100; overflow:hidden;` — it sits above everything (nav is z-index 2, grid is z-index 100) and never blocks clicks.
- `.transition-block`: `position:absolute; background-color: var(--base-300); opacity:0;` — every block is absolutely positioned by inline `left`/`top`/`width`/`height` from JS and starts fully transparent.

## GSAP effect (exhaustive)

### Constants & grid generation
- `const BLOCK_SIZE = 60;` — each block is a 60×60px square.
- `createTransitionGrid()` builds the curtain:
  - `gridWidth = window.innerWidth`, `gridHeight = window.innerHeight`.
  - `columns = Math.ceil(gridWidth / BLOCK_SIZE)`.
  - `rows = Math.ceil(gridHeight / BLOCK_SIZE) + 1` (one extra row so the bottom edge is always covered).
  - `offsetX = (gridWidth - columns * BLOCK_SIZE) / 2` and `offsetY = (gridHeight - rows * BLOCK_SIZE) / 2` — centers the grid (offsets are ≤ 0, so the grid slightly overhangs to guarantee full coverage).
  - Nested loop `row` × `col`: create `div.transition-block`, set inline `width/height = 60px`, `left = col*60 + offsetX`, `top = row*60 + offsetY`, append to `.transition-grid`, and push into a `blocks[]` array.
  - Before generating, clear the grid: `transitionGrid.innerHTML = ""` and reset `blocks = []`.
  - After building, `gsap.set(blocks, { opacity: 0 })`.
- Call `createTransitionGrid()` once on load, and **rebuild it on `window.resize`** (`window.addEventListener("resize", createTransitionGrid)`).

### The two transition tweens (this is the whole effect)
Two functions, each a single `gsap.to(blocks, …)` over the block array, each with an `onComplete` callback (`next`) to chain the sequence:

**`leave(next)` — cover the screen:**
```js
gsap.to(blocks, {
  opacity: 1,
  duration: 0.05,
  ease: "power2.inOut",
  stagger: { amount: 0.5, from: "random" },
  onComplete: next,
});
```
- Every block animates `opacity: 0 → 1`.
- Per-block `duration` is only **0.05s** (a fast flicker-on), but the whole set is spread across **`stagger: { amount: 0.5, from: "random" }`** — total stagger window of **0.5s**, and `from:"random"` shuffles the order so blocks light up in a scattered, dissolve-in pattern rather than any directional sweep. Net wall-clock time ≈ 0.55s.

**`enter(next)` — reveal the new page:**
```js
gsap.set(blocks, { opacity: 1 });          // ensure fully covered first
gsap.to(blocks, {
  opacity: 0,
  duration: 0.05,
  delay: 0.3,
  ease: "power2.inOut",
  stagger: { amount: 0.5, from: "random" },
  onComplete: next,
});
```
- First force all blocks to `opacity: 1` (fully opaque cover), then tween `opacity: 1 → 0`.
- Same `duration: 0.05`, same `ease: "power2.inOut"`, same `stagger: { amount: 0.5, from: "random" }`, plus a **`delay: 0.3`** — a 0.3s hold on full black before the blocks flicker back out (this pause is what hides the content swap). Net wall-clock time ≈ 0.85s.

### Sequencing (`navigate(route)`)
State: `currentRoute = "/"`, `isTransitioning = false`.
- Guard: if `isTransitioning` or `route === currentRoute`, return (ignore re-clicks and clicks on the current page).
- Set `isTransitioning = true`, then:
  1. `leave(() => { … })` — blocks flicker IN to cover.
  2. In `leave`'s `onComplete`: `showPage(route)` (toggle `.active` so the new `section.page` becomes the only visible page) and `currentRoute = route`. **The swap happens while the screen is fully covered.**
  3. Then call `enter(() => { isTransitioning = false; })` — after the 0.3s hold, blocks flicker OUT to reveal, and re-entrancy unlocks on complete.
- `showPage(route)`: loop all `.page` sections, `page.classList.toggle("active", page.dataset.route === route)`.

### Trigger wiring
For every `nav a`, `addEventListener("click", e => { e.preventDefault(); navigate(link.dataset.route); })`. (No History API / URL change — it is a purely visual fake router.)

## Assets / images
**4 images**, one full-bleed background per page (`.section-bg > img`, `object-fit: cover`), all **16:9 landscape** (~1456×816) to fill the viewport. Role: atmospheric full-screen sci-fi scene behind each page's giant `h1`. Each has a distinct dominant color so the page swap is obvious through the flicker. The four, in nav order:
- **Homebase (`bg_1`):** curved silver/chrome futuristic towers being swallowed by a churning **orange-amber sandstorm** on a desert world; wrecked pods half-buried in the foreground. Dominant colors: burnt orange, tan, glints of steel grey.
- **Gateway (`bg_2`):** a glowing **golden energy portal** (a rectangular doorway with a swirling vortex) framed by two tall rocky spires under a **teal starry night sky**, with turquoise crystals scattered on the ground and stone steps leading up. Dominant colors: deep teal/green sky vs warm gold portal glow.
- **Station (`bg_3`):** a **glass geodesic dome colony** lit up from within, sitting on a red-rock **Mars-like desert**; a huge mottled **orange planet** looms in a green-tinged starry sky. Dominant colors: rust red, amber dome lights, teal-green sky.
- **Colony (`bg_4`):** black **silhouetted spires and towers** of a dense city against an enormous **red-orange sun/star**, with small ships drifting through smoky haze. Dominant colors: fiery red-orange over near-black silhouettes.

Provide 4 distinct landscape images matching these roles, forms and color palettes (no real brands).

## Behavior notes
- **Desktop and mobile** both work; there is no `prefers-reduced-motion` branch and no min-width gate.
- The grid is **regenerated on every resize**, so the block count adapts to the viewport; `gsap.set` re-zeroes opacity each rebuild.
- `.transition-grid` has `pointer-events: none`, so even at full black cover the nav underneath (z-index 2 vs grid z-index 100) can't be clicked — but the `isTransitioning` guard already blocks input during a transition.
- No infinite loops; each animation is one-shot per click. Total transition ≈ 1.4s door-to-door (leave ~0.55s + 0.3s hold + reveal ~0.5s).
- The first page (`/` Homebase) is visible on load with no intro animation; transitions only fire on nav clicks.

## Images

This component ships with 4 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/block-reveal-page-transition/bg_1.jpg
https://motionprompts.dev/c/block-reveal-page-transition/bg_2.jpg
https://motionprompts.dev/c/block-reveal-page-transition/bg_3.jpg
https://motionprompts.dev/c/block-reveal-page-transition/bg_4.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--abyss`, `--deep`, `--gold`, `--gold-deep`, `--mist`, `--mist-dim`, `--hairline`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above is a standalone document that builds a fake client-side router out of five
closures — `createTransitionGrid`, `showPage`, `leave`, `enter`, `navigate` — and three mutable
top-level variables (`blocks`, `currentRoute`, `isTransitioning`) those closures read and write for
the life of the page. React withdraws the two things that design leans on: a document the script
can query directly, and a module scope that lives for exactly one page load.

**(1) The entry point.** The script has no ready-state guard at all — it runs the instant the
module is evaluated: `createTransitionGrid()` is called and the `nav a` listeners are attached at
the bottom of the file, both at import time. In React that is before your component has rendered
anything, so `.transition-grid` and the four `nav a[data-route]` links do not exist yet when this
code would try to touch them. Move the whole body — grid construction, `showPage`, `leave`/`enter`,
and the click/resize wiring — into a `useEffect` with an empty dependency array. Do not leave
`createTransitionGrid()` in the component body: it allocates a fresh set of block `div`s and
re-triggers `gsap.set` on every call, so running it per render would rebuild the whole curtain on
every render.

**(2) Element lookups.** `document.querySelector(".transition-grid")`,
`document.querySelectorAll(".page")` and `document.querySelectorAll("nav a")` all assume this
component owns the document. Give the wrapping element a `ref` and resolve all three inside the
effect instead — `rootRef.current.querySelector(".transition-grid")`,
`rootRef.current.querySelectorAll(".page")`, `rootRef.current.querySelector("nav")`. This is not
cosmetic for this component specifically: during the StrictMode double-invoke, an unscoped
`document.querySelectorAll("nav a")` can bind to the four links of the copy that's on its way out,
and every click on the real nav afterward silently goes nowhere.

**(3) `blocks`, `currentRoute`, `isTransitioning` and `pages` stay plain closure variables — this
component needs neither `useState` nor `useRef` for them.** Nothing here is ever read by JSX: the
whole "route change" is `page.classList.toggle("active", …)` on the same DOM nodes React already
rendered, never a conditional render. Declare `let blocks = []`, `let currentRoute = "/"`,
`let isTransitioning = false` at the top of the effect in place of the module-level `let`s, and
every function that used to close over module scope now closes over the effect's scope instead, for
as long as the component stays mounted. The instant one of these values needs to be visible outside
this effect — a parent component that wants to know which page is showing, say — is the instant it
has to become a ref, because a second `useEffect` cannot see into this one's closures.

**(4) Cleanup — `gsap.context`, and here `leave`, `enter` and the resize rebuild all need
`self.add`.** Every tween this component creates runs **after** the factory has already returned:
`leave` and `enter` fire from a nav click, and the resize rebuild's `gsap.set` fires from a
`resize` event — neither is part of the synchronous pass `gsap.context` records by default.
Register all three through the factory's own parameter (never the outer `const ctx`, which is
still in its temporal dead zone during that synchronous pass), then invoke them from outside as
methods on `ctx`:

```jsx
useEffect(() => {
  const grid = rootRef.current.querySelector(".transition-grid");
  const pages = rootRef.current.querySelectorAll(".page");
  const nav = rootRef.current.querySelector("nav");

  let blocks = [];
  let currentRoute = "/";
  let isTransitioning = false;

  function createTransitionGrid() {
    grid.innerHTML = "";
    blocks = [];
    /* same column/row/offset math as above, pushing each block into `blocks` */
    gsap.set(blocks, { opacity: 0 });
  }
  function showPage(route) {
    pages.forEach((p) => p.classList.toggle("active", p.dataset.route === route));
  }

  const ctx = gsap.context((self) => {
    self.add("rebuild", createTransitionGrid);
    self.add("leave", (next) => {
      gsap.to(blocks, {
        opacity: 1,
        onComplete: next,
        // same easing and random-order stagger as the leave tween above
      });
    });
    self.add("enter", (next) => {
      gsap.set(blocks, { opacity: 1 });
      gsap.to(blocks, {
        opacity: 0,
        onComplete: next,
        // same hold, easing and random-order stagger as the enter tween above
      });
    });
    self.rebuild();
  }, rootRef);

  const onResize = () => ctx.rebuild();
  const onNavClick = (e) => {
    const link = e.target.closest("a[data-route]");
    if (!link) return;
    e.preventDefault();
    const route = link.dataset.route;
    if (isTransitioning || route === currentRoute) return;
    isTransitioning = true;
    ctx.leave(() => {
      showPage(route);
      currentRoute = route;
      ctx.enter(() => { isTransitioning = false; });
    });
  };

  window.addEventListener("resize", onResize);
  nav.addEventListener("click", onNavClick);

  return () => {
    window.removeEventListener("resize", onResize);
    nav.removeEventListener("click", onNavClick);
    ctx.revert();
  };
}, []);
```

Without the `self.add` wrapping, a click that starts `leave` right before the user routes away
leaves that tween untracked by `ctx`: `ctx.revert()` cannot kill it, so it keeps ticking, eventually
calls `showPage` and flips `isTransitioning` against a component that no longer exists, and the
block `div`s it was animating are left at whatever opacity it reached. The `resize` listener and
the nav's `click` listener are plain DOM subscriptions, not GSAP objects — `ctx.revert()` never
touches either one, so both are removed by hand in the same cleanup that calls it, one line each.
