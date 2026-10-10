# Direction-Aware Grid Hover Highlight

## Goal
Build a full-viewport, dark "tech-menu" page with a two-row grid of labeled cells (skill/technology tags like "( html )", "( gsap )"…). The star effect: a single solid **highlight block glides beneath whichever cell the cursor is over**, smoothly tweening its position, its width/height, and its background color to snap exactly onto the hovered cell's bounds. Because the block always animates **from the previously hovered cell toward the new one**, it appears to slide in from whatever direction the cursor entered — a "direction-aware" hover. Each cell owns its own accent color, so the block also cross-fades through a palette as you sweep across the grid.

## Tech
Vanilla HTML/CSS/JS, shipped as `index.html` + `styles.css` + an ES-module `script.js` (`<script type="module" src="./script.js">`). **No GSAP, no npm dependencies, no smooth scroll.** The entire animation is a **CSS `transition`** on the highlight element; JS only writes inline `transform` / `width` / `height` / `background-color` values on `mousemove`, using `document.elementFromPoint` hit-testing. Must run in a fresh Vite project with zero installs.

## Layout / HTML
```html
<nav>
  <p>Motionprompts</p>
  <p>/ Experiment 448</p>
</nav>

<div class="container">
  <div class="grid">
    <div class="grid-row">
      <div class="grid-item"><p>( html )</p></div>
      <div class="grid-item"><p>( css )</p></div>
      <div class="grid-item"><p>( javascript )</p></div>
    </div>
    <div class="grid-row">
      <div class="grid-item"><p>( gsap )</p></div>
      <div class="grid-item"><p>( scrolltrigger )</p></div>
      <div class="grid-item"><p>( react )</p></div>
      <div class="grid-item"><p>( next.js )</p></div>
      <div class="grid-item"><p>( three.js )</p></div>
    </div>
  </div>
  <div class="highlight"></div>
</div>

<footer>
  <p>Unlock Source Code with PRO</p>
  <p>Link in description</p>
</footer>
```
Key points:
- Exactly **8 `.grid-item` cells**: 3 in the first row, 5 in the second. Each contains one `<p>` label wrapped in parentheses with inner spaces, e.g. `( html )`.
- `.highlight` is a **sibling of `.grid`**, placed directly inside `.container` (it is positioned against the container, not the grid).
- `nav` and `footer` are fixed chrome bars; the second nav `<p>` and both footer `<p>`s are dimmed.

## Styling
- Global reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`.
- `body`: `font-family: "Akkurat Mono", sans-serif;` (a monospace grotesk — any mono with a sans-serif fallback reads right), `background-color: #1a1a1a`.
- All `p`: `text-transform: uppercase; color: #fff; font-size: 13px; font-weight: 500;` (labels render as "( HTML )" etc.).
- `nav, footer`: `position: fixed; width: 100vw; padding: 1em; display: flex; justify-content: space-between; align-items: center; background-color: #1a1a1a; z-index: 10;`. Nav pinned `top: 0` with `border-bottom: 1px solid rgba(255,255,255,0.2)`; footer pinned `bottom: 0` with the same `border-top`. `nav p:not(:first-child)` and `footer p` get `opacity: 0.3`.
- `.container`: `position: relative; width: 100%; height: 100svh; display: flex; align-items: center; justify-content: center;` — full-viewport stage that centers the grid.
- `.grid`: `position: relative; margin: 0 auto; width: 90%; height: 60%; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.2);`.
- `.grid-row, .grid-item`: `flex: 1; display: flex; justify-content: center; align-items: center; height: 100%;` — both rows split the grid height 50/50; cells split each row evenly (3 wide cells on top, 5 narrower below).
- Hairline dividers, all `1px solid rgba(255,255,255,0.2)`: `.grid-row:nth-child(1) { border-bottom: … }` and `.grid-item:not(:last-child) { border-right: … }`.
- `.grid-item p`: `position: relative; z-index: 2;` — **essential**: the label paints above the highlight block, so text stays readable on top of the colored fill.
- `.highlight`: 
  ```css
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  pointer-events: none;   /* essential: must never be hit by elementFromPoint */
  transition: transform 0.25s ease, width 0.25s ease, height 0.25s ease,
    background-color 0.25s ease;
  opacity: 1;
  ```
  It anchors at the container's top-left; JS drives it purely via inline `transform: translate(x, y)` + `width` + `height` + `background-color`.

## The effect (exhaustive — this replaces the GSAP section)
There is **no GSAP and no JS tweening loop**. The motion engine is the CSS `transition: transform 0.25s ease, width 0.25s ease, height 0.25s ease, background-color 0.25s ease` on `.highlight`; the JS just rewrites the target inline values and the browser tweens old→new over **0.25s with the default `ease` curve**. Reproduce the logic exactly:

Everything runs inside a `DOMContentLoaded` listener.

**1. Per-cell accent colors.** Define this 8-color palette, in this order:
```js
const highlightColors = [
  "#E24E1B", // burnt orange
  "#4381C1", // steel blue
  "#F79824", // amber
  "#04A777", // emerald
  "#5B8C5A", // sage green
  "#2176FF", // vivid blue
  "#818D92", // slate grey
  "#22AAA1", // teal
];
```
Loop all `.grid-item`s and stamp `item.dataset.color = highlightColors[index % highlightColors.length]` — with 8 cells, each gets a unique color in DOM order (row 1 left→right, then row 2 left→right).

**2. `moveToElement(element)` — snap the highlight to a cell.** If `element` exists:
- `rect = element.getBoundingClientRect()`, `containerRect = container.getBoundingClientRect()`.
- Set inline styles on the highlight:
  - `transform = translate(${rect.left - containerRect.left}px, ${rect.top - containerRect.top}px)` — the cell's position **relative to the container**.
  - `width = rect.width + "px"`, `height = rect.height + "px"` — the cell's exact size (cells in the 3-column row are wider than in the 5-column row, so the block visibly stretches/squeezes when crossing rows).
  - `backgroundColor = element.dataset.color`.

The CSS transition interpolates all four properties simultaneously, so the block **slides, resizes, and recolors in one 0.25s glide** from wherever it was to the new cell. This is what makes it feel direction-aware: enter a cell from the left and the block slides in from the left cell; drop down a row and it slides down while widening/narrowing.

**3. `moveHighlight(e)` — mousemove hit-testing.** Attached as a `mousemove` listener **on `.container`** (one listener, not per-cell):
- `hoveredElement = document.elementFromPoint(e.clientX, e.clientY)`.
- If `hoveredElement` has class `grid-item` → `moveToElement(hoveredElement)`.
- Else if `hoveredElement.parentElement` has class `grid-item` (the cursor is over the `<p>` label) → `moveToElement(hoveredElement.parentElement)`.
- Otherwise do nothing — over borders, gaps, or outside the grid the highlight simply **stays parked on the last cell** (it never hides or fades).

This is why `pointer-events: none` on `.highlight` is mandatory: without it, `elementFromPoint` would return the highlight itself and the effect would freeze.

**4. Initial state.** Immediately call `moveToElement(firstGridItem)` on load so the highlight starts parked on the first cell ("( html )") with its color `#E24E1B`. (Because the element starts at `top:0; left:0` of the container with no size, the very first paint tweens it into place — acceptable and matches the original.)

No ScrollTrigger, no timelines, no stagger, no rAF loop — trigger is `mousemove` only, plus the one on-load placement.

## Assets / images
None. The page is pure typography, hairline borders, and flat color fills.

## Behavior notes
- **Desktop-only effect.** At `max-width: 900px`: `.highlight { display: none; }` (the effect is disabled), `.container` becomes `height: 100%; min-height: 100svh; padding: 25vh 0;`, `.grid` becomes `height: max-content`, each `.grid-row` switches to `flex-direction: column`, cells become full-width with `padding: 60px 0`, and the cell dividers swap from `border-right` to `border-bottom` (`:not(:last-child)`). Also `footer p:nth-child(2) { text-align: right; }`.
- The highlight always fully covers exactly one cell — its geometry is measured live via `getBoundingClientRect`, so it stays correct at any viewport size (above the breakpoint).
- Motion only happens on mouse movement; there are no loops, timers, or scroll behavior.
- Dark UI throughout: near-black `#1a1a1a` ground, white 13px uppercase mono labels, 20%-white hairlines, and the 8 saturated accent fills listed above.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--muted`, `--faint`, `--line`, `--lift`, `--ochre`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, wires a single `mousemove` listener onto `.container`, and never has to undo itself — the tab reloads long before a second listener could ever stack on top of the first. React withdraws that guarantee, and here the failure is quiet by design rather than loud: because `moveToElement` always writes the same four inline values (`transform`, `width`, `height`, `backgroundColor`) for a given cursor position, a duplicated listener does not visibly break the highlight — it just runs `moveToElement` twice per `mousemove` event, calling `getBoundingClientRect` twice and setting the same four styles twice, silently, one more subscriber added every time this component mounts. Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen, but the JSX (`<div class="container">` with `.grid` and `.highlight` inside it) is not torn down between those two runs — only the effect body re-executes — so both mounts wire their handler onto the exact same `.container` node. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script subscribes straight to `document.addEventListener("DOMContentLoaded", …)` with no `document.readyState` guard in front of it. By the time a React component mounts, that event has already fired, so wiring it up this way would simply never run — no error, no highlight block, nothing to debug. Drop the wrapper entirely and move its body — the `container`/`highlight`/`gridItems`/`firstItem` lookups, the loop that stamps `item.dataset.color`, `moveToElement`, `moveHighlight`, the initial `moveToElement(firstItem)` call, and the `container.addEventListener("mousemove", moveHighlight)` call — into a `useEffect` with an empty dependency array. The `highlightColors` array itself touches no DOM and can stay outside the component as a module-level constant, read by index exactly as it is now.

*(2) Element lookups* — `.container`, `.highlight`, and every `.grid-item` are looked up by class off `document`. Give the outer wrapper a root `ref`, and inside the effect resolve `container` and `highlight` from dedicated refs placed on those two elements in JSX, then call `container.querySelectorAll(".grid-item")` and take its first entry for `firstItem` rather than a second unscoped `document.querySelector(".grid-item")`. During the StrictMode remount two copies of this subtree briefly coexist, and an unscoped lookup is not guaranteed to resolve to the copy whose effect is currently running rather than the one on its way out.

*(3) Cleanup* — There is no GSAP, no smooth-scroll library, and no self-driven `requestAnimationFrame` loop in this component: the motion is entirely the CSS `transition` on `.highlight` reacting to the inline styles `moveToElement` writes. The only object the effect creates that outlives a single call is the `mousemove` listener itself, and removing it is the one thing the cleanup has to do:

```jsx
useEffect(() => {
  const container = containerRef.current;
  const highlight = highlightRef.current;
  const gridItems = container.querySelectorAll(".grid-item");
  // ...highlightColors stamping onto gridItems, moveToElement, moveHighlight,
  // exactly as described above, closing over `container` and `highlight`...

  moveToElement(gridItems[0]);
  container.addEventListener("mousemove", moveHighlight);

  return () => container.removeEventListener("mousemove", moveHighlight);
}, []);
```

Skipping this turns the test from the intro into a concrete, reproducible bug: mount the component, navigate away, come back, and `.container` now answers every `mousemove` with two calls to `moveToElement` instead of one, each recomputing the same `getBoundingClientRect` and writing the same four inline styles the other just wrote. Nothing looks wrong on screen, because the two calls agree on every value — the leak only shows up as one more subscriber on the highest-frequency event on the page, compounding with every remount this route survives.
