# Magnetic Spotlight Marquee

## Goal

Build a full-viewport dark hero with a single horizontal strip of website-screenshot thumbnails that **auto-scrolls infinitely to the left**, and, as the star effect, **magnetically follows the cursor's vertical position**: on `mousemove` the whole strip lerps up/down to sit under the pointer (clamped to a band inset from the top and bottom edges). Centered over the moving images is a block of title + tagline + copy set in `mix-blend-mode: difference`, so wherever the strip passes behind the text the colors invert. As the strip descends toward the text, the **text lines rise out of its way**, and every line also gets a subtle **velocity "wake"** — a gaussian-weighted nudge in the direction the strip is moving, strongest for the lines nearest the strip. Everything is spring-smooth: nothing snaps, it all eases.

## Tech

Vanilla HTML/CSS/JS with ES module imports. Use **`gsap`** (npm) plus the GSAP plugin **`SplitText`**. No ScrollTrigger, no Lenis, no smooth-scroll library, no Three.js. Import as:

```js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
```

All motion is driven by (a) one infinite `gsap.to` tween for the marquee and (b) a single `gsap.ticker.add(...)` per-frame loop that does the lerping. It runs in a fresh Vite project with just `gsap` installed.

## Layout / HTML

One `<section class="spotlight">` containing four absolutely/relatively positioned blocks: a top nav, the marquee strip, the centered content, and a bottom footer. The marquee has a **track** wrapping exactly **6 items**, each holding one landscape `<img>`.

```html
<section class="spotlight">
  <div class="spotlight-nav">
    <p>hello@yourstudio.com</p>
    <p>Instagram, YouTube, X</p>
  </div>

  <div class="spotlight-marquee">
    <div class="spotlight-marquee-track">
      <div class="spotlight-marquee-item"><img src="/img-1.jpg" alt="" /></div>
      <div class="spotlight-marquee-item"><img src="/img-2.jpg" alt="" /></div>
      <div class="spotlight-marquee-item"><img src="/img-3.jpg" alt="" /></div>
      <div class="spotlight-marquee-item"><img src="/img-4.jpg" alt="" /></div>
      <div class="spotlight-marquee-item"><img src="/img-5.jpg" alt="" /></div>
      <div class="spotlight-marquee-item"><img src="/img-6.jpg" alt="" /></div>
    </div>
  </div>

  <div class="spotlight-content-wrapper">
    <h1>MP Studio</h1>
    <h3>Making stuff others try to copy</h3>
    <div class="spotlight-copy">
      <p>Two short paragraphs of neutral studio blurb about web design, animation and front-end development…</p>
      <p>…and a second paragraph about GSAP animations, interactive interfaces and clean code.</p>
    </div>
  </div>

  <div class="spotlight-footer">
    <p>One centered narrow line of small footer copy about the studio's craft.</p>
  </div>

  <script type="module" src="./script.js"></script>
</section>
```

Load-bearing structural facts:
- `.spotlight-marquee` is the **strip** (the element that translates vertically to chase the cursor). `.spotlight-marquee-track` is the **track** (the element that translates horizontally for the marquee). They are separate elements — vertical and horizontal transforms live on different nodes.
- The 6 `.spotlight-marquee-item`s are the "source set"; JS clones them to fill the width (see effect).
- `.spotlight-content-wrapper` holds `h1`, `h3` and `.spotlight-copy` (two `<p>` side by side). These headings/paragraphs are what SplitText splits into lines.
- Use neutral demo copy. Title **"MP Studio"**, a short tagline, two blurb paragraphs, one footer sentence. No real brand names.

## Styling

Fonts via Google Fonts: **Instrument Serif** (for `h1` and the nav) and **Instrument Sans** (for `h3`, `p`). Import both at the top of the CSS.

Global reset: `* { margin:0; padding:0; box-sizing:border-box; }`.

Type:
- `h1`: `font-family: "Instrument Serif"; font-size: 6rem; font-weight: 500; line-height: 0.9;` (drops to `4rem` under `max-width: 1000px`).
- `h3`: `text-transform: uppercase; font-family: "Instrument Sans"; font-size: 1.5rem; font-weight: 500;`
- `p`: `font-family: "Instrument Sans"; font-weight: 400; font-size: 0.8rem; line-height: 1.25;`
- `.spotlight-nav p`: `font-family: "Instrument Serif"; font-weight: 500; font-size: 0.9rem;`
- `.spotlight-footer p`: `text-align: center; font-size: 0.6rem; width: 30%;` (goes `width: 100%` under 1000px).

Color tokens (exact hex):
- Section background: `#0f0f0f` (near-black).
- Nav + footer text: `#7a7a7a` (mid grey).
- Content text: `#fff`.
- Marquee image fallback bg: `#ddd`.

Layout / positioning:
- `.spotlight`: `position: relative; width: 100%; height: 100svh; overflow: hidden; background: #0f0f0f;`
- `.spotlight-nav`, `.spotlight-footer`: `position: absolute; width: 100%; padding: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #7a7a7a;` — nav pinned `top: 0`, footer pinned `bottom: 0`.
- `.spotlight-marquee` (strip): `position: absolute; top: 0; left: 0; width: 100%; overflow: hidden; display: flex; will-change: transform; pointer-events: none; z-index: 0;` — sits at the very top of the section and is moved down via a JS transform. `pointer-events: none` so it never eats the section's `mousemove`.
- `.spotlight-marquee-track`: `display: flex; flex-shrink: 0; will-change: transform;`
- `.spotlight-marquee-item`: `flex-shrink: 0; width: 18rem; padding: 0 0.5rem;`
- `.spotlight-marquee-item img`: `width: 100%; height: 10rem; object-fit: cover; display: block; border-radius: 6px; background: #ddd;`
- `.spotlight-content-wrapper`: `position: relative; width: 30%; height: 100%; padding-top: 8rem; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 2rem; margin: 0 auto; color: #fff; mix-blend-mode: difference; z-index: 2;` (goes `width: 100%; padding: 2rem;` under 1000px). The **`mix-blend-mode: difference`** is essential — it makes the centered text invert against the images sliding behind it.
  - `.spotlight-content-wrapper h1`: `text-align: center; width: 15rem;`
  - `.spotlight-content-wrapper h3`: `width: 20rem; text-align: center;`
- `.spotlight-copy`: `display: flex; gap: 1rem;` and `.spotlight-copy p:nth-child(1) { text-align: right; }` (left paragraph is right-aligned, so the two columns hug the gutter).
- `.line` (SplitText's per-line class): `position: relative; white-space: nowrap; will-change: transform;` — each split line is its own transformable box.

Stacking: strip `z-index: 0`, content `z-index: 2`. The content sits above the images and blends with them.

## GSAP effect (exhaustive — this is the whole component)

### Config constants (name them exactly; every number below matters)

```js
const config = {
  marqueeScrollSpeed: 100, // px/sec horizontal marquee speed
  stripFollowEase: 0.05,   // lerp factor for strip chasing the cursor Y
  stripEdgeInset: 175,     // px: strip rest-center from top; also the clamp inset top & bottom
  contentRiseRate: 0.85,   // how much the text rises per px the strip descends past rest
  risenTopGap: 100,        // px: don't let text rise above this gap from section top
  liftHeadStart: 125,      // px: strip "reaches" a line this many px before its center
  wakeStrength: 2.5,       // multiplier on strip velocity for the wake nudge
  wakeReach: 125,          // px: gaussian sigma for how far the wake reaches
  lineSettleEase: 0.09,    // lerp factor for each line settling to its target Y
};
```

### 1) Infinite horizontal marquee (clone-to-fill + one repeating tween)

- Read the 6 source items: `const sourceItems = Array.from(track.children);`
- Measure one full set width: `const oneSetWidth = sourceItems.reduce((sum, i) => sum + i.offsetWidth, 0);` (6 × 18rem ≈ 1728px).
- Decide how many extra copies are needed to cover the viewport plus one: `const setsNeeded = Math.ceil(window.innerWidth / oneSetWidth) + 1;`
- Clone the whole source set `setsNeeded` times and append the clones to the track (so the track is much wider than the viewport and has no visible gap when it wraps):
  ```js
  for (let c = 0; c < setsNeeded; c++)
    sourceItems.forEach((i) => track.appendChild(i.cloneNode(true)));
  ```
- Drive the marquee with one infinitely repeating linear tween whose x is **wrapped** by a modifier so it loops seamlessly:
  ```js
  gsap.to(track, {
    x: `-=${oneSetWidth}`,
    duration: oneSetWidth / config.marqueeScrollSpeed, // ≈ 17.3s per set
    ease: "none",
    repeat: -1,
    modifiers: {
      x: (x) => `${gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x))}px`,
    },
  });
  ```
  `gsap.utils.wrap(-oneSetWidth, 0, x)` keeps x always in `[-oneSetWidth, 0)`, so as it passes `-oneSetWidth` it jumps back to `0` — invisible because a full set has just scrolled by. Net effect: continuous leftward scroll at 100 px/s, forever.

### 2) SplitText — split heading + tagline + copy into lines

- Targets: `gsap.utils.toArray(".spotlight-content-wrapper h1, .spotlight-content-wrapper h3, .spotlight-copy p")`.
- For each element, `SplitText.create(element, { type: "lines", linesClass: "line", onSplit(instance){ … } })`.
- Keep a flat array `textLines = []` of `{ el, restCenterY: 0, currentY: 0, source: element }`, one entry per split line. In `onSplit`, first remove any prior lines from the same `source` (so re-splits on resize don't duplicate), then push the new `instance.lines`, then call `measureGeometry()`. (`type: "lines"` only, no mask, no chars/words.)

### 3) Geometry measurement (`measureGeometry`, run on split, load and resize)

Compute and cache:
- `sectionHeight = section.getBoundingClientRect().height`
- `stripBaseTop = strip.offsetTop` (0 — strip is `top:0`)
- `stripHeight = strip.offsetHeight` (≈ 160px, the 10rem image row)
- `stripRestCenterY = config.stripEdgeInset` (175) — the strip's resting center measured from the section top.
- For each line, walk the `offsetParent` chain up to the section summing `offsetTop`, then `line.restCenterY = y + line.el.offsetHeight / 2`. Track `contentTopAtRest = min over lines of (restCenterY - offsetHeight/2)` (the top edge of the highest line); fall back to `sectionHeight * 0.4` if there are no lines yet.
- If the pointer hasn't moved yet (`!hasPointerMoved`), seed the strip's vertical state to its rest offset: `const restY = config.stripEdgeInset - stripBaseTop - stripHeight/2;` then `stripTargetY = stripCurrentY = stripPrevY = restY;`. (`restY` is the y-translate that puts the strip's center at 175px, i.e. ≈ 95px down.)

### 4) Pointer input (`mousemove` on the section)

```js
section.addEventListener("mousemove", (e) => {
  hasPointerMoved = true;
  const b = section.getBoundingClientRect();
  const cursorY = e.clientY - b.top;
  const wantedY = cursorY - stripBaseTop - stripHeight / 2;               // translate so strip center is under cursor
  const highestY = config.stripEdgeInset - stripBaseTop - stripHeight / 2; // clamp top (175 from top)
  const lowestY  = sectionHeight - config.stripEdgeInset - stripBaseTop - stripHeight / 2; // clamp bottom (175 from bottom)
  stripTargetY = gsap.utils.clamp(highestY, lowestY, wantedY);
});
```

So the **target** for the strip is the cursor's Y (converted to a center-aligned translate), clamped to a vertical band inset 175px from both the top and bottom of the section. Only the target is set here — the actual move is lerped in the ticker.

### 5) The per-frame loop (`gsap.ticker.add`) — the heart of the effect

Runs every frame for the page lifetime. State vars: `stripCurrentY`, `stripPrevY` (both seeded in `measureGeometry`), and per-line `currentY`.

```js
gsap.ticker.add(() => {
  // (a) strip chases target
  stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase; // lerp 0.05
  gsap.set(strip, { y: stripCurrentY });

  const stripCenterY   = stripBaseTop + stripCurrentY + stripHeight / 2;
  const stripVelocityY = stripCurrentY - stripPrevY; // per-frame delta = signed speed
  stripPrevY = stripCurrentY;

  // (b) how far the strip has descended past its rest center, and how much the text should rise
  const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
  const maxRise    = Math.max(0, contentTopAtRest - config.risenTopGap);
  const contentRise = -Math.min(descentBelowRest * config.contentRiseRate, maxRise); // negative = up

  // (c) per line: rise-out-of-the-way + velocity wake
  textLines.forEach((line) => {
    const gapToStrip  = line.restCenterY - stripCenterY;
    const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;

    const wakeInfluence = Math.exp(
      -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
    );                                                            // gaussian, 1 at strip center, →0 far away
    const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;

    const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
    line.currentY += (lineTarget - line.currentY) * config.lineSettleEase; // lerp 0.09
    gsap.set(line.el, { y: line.currentY });
  });
});
```

What each piece does:
- **(a) Strip follow:** `stripCurrentY` eases toward `stripTargetY` by factor `0.05` every frame — the smooth magnetic lag. Applied as a `y` transform on the strip via `gsap.set`.
- **Strip velocity:** `stripVelocityY = stripCurrentY - stripPrevY` is the signed per-frame movement — positive when the strip is moving down, negative when moving up, ~0 when settled. This is the "wake" driver.
- **(b) Content rise:** once the strip's center passes its rest center (175px) and descends, `descentBelowRest` grows; the text rises by `descentBelowRest * 0.85` (upward, hence negative), but never higher than `maxRise` (so the top line never rises above `risenTopGap = 100`px from the section top). This is a single shared rise value for all lines that have been "reached".
- **`reachedLine`:** a line only participates in the rise once `stripCenterY + 125 >= line.restCenterY` — i.e. the strip gets a 125px head start, lifting each line slightly before the strip's center actually reaches it. Lines the strip hasn't reached yet stay put (target 0 for the rise part).
- **(c) Wake:** `wakeInfluence` is a gaussian of the line's distance to the strip center with sigma `wakeReach = 125` — 1 for lines right at the strip, falling off smoothly for distant lines. `wakeOffset = stripVelocityY * wakeInfluence * 2.5` shoves each nearby line in the direction the strip is currently moving, proportional to strip speed. So a fast pointer flick makes the closest lines "kick" and then settle.
- **Per-line settle:** each line's own `currentY` lerps toward `lineTarget` (`rise + wake`) by factor `0.09`, applied as its `y` transform. This is why lines glide rather than snap, and why the wake decays back to the rest/rise value once the strip stops moving.

### Utilities used

`gsap.utils.wrap` (marquee modifier), `gsap.utils.clamp` (pointer band), `gsap.utils.toArray` (split targets), `gsap.set` (per-frame transforms), `gsap.ticker.add` (the rAF loop). No CustomEase, no ScrollTrigger, no timelines beyond the single infinite marquee tween.

### Resize

`window.addEventListener("resize", measureGeometry)` — re-measures section/strip/line geometry (and re-seeds the strip's rest position if the pointer hasn't moved). SplitText re-runs its `onSplit` on responsive re-split, rebuilding `textLines`.

## Assets / images

**6 distinct landscape photographic thumbnails**, one per marquee item, forming a deliberately eclectic mood-board of subjects and color moods (not website screenshots). They are displayed at **18rem wide × 10rem tall** and cropped with `object-fit: cover`, so any wide source (~16:9 / ~1.8:1) reads fine. Use these six, in order:

1. **Neon cyberpunk street at night** — a foggy city avenue with a lone car headlamps-on, glowing storefronts and pedestrians. Dominant colors: saturated purple/magenta and violet with warm amber glints.
2. **Black candle product still-life** — three matte-black tin candles arranged on angular light-grey surfaces in dramatic directional light. Monochrome: deep black objects against white/pale-grey.
3. **Retro-futuristic orange architecture** — a vintage sci-fi cityscape of rounded orange-and-cream towers, domes and spires with a car in the foreground and autumn trees. Dominant colors: warm orange, cream and tan under a pale sky.
4. **White marble waves** — a close-up of glossy, sculpted white marble in flowing wave-like folds with grey veining. Near-monochrome white and soft grey.
5. **Aerial river landscape** — an overhead shot of a turquoise river meandering in S-curves through flat green grassland toward distant hills. Dominant colors: vivid teal water and bright green fields under blue sky.
6. **Dark cinematic interior** — a dim vintage living room where a figure stands beside an old CRT television glowing red, the only light source in near-total shadow. Dominant colors: deep black shadow with a red glow.

No real brand names or logos.

## Behavior notes

- **Desktop / pointer-driven.** The strip only chases the cursor via `mousemove` on the section; there is no scroll, click, or touch interaction. Before the first pointer move, the strip sits at its rest position (center 175px from top) and the text is at rest.
- **Marquee always runs**, independent of the pointer — continuous leftward scroll at 100 px/s, looping seamlessly via the wrap modifier.
- **Everything is lerped**, so on a static/fresh load a screenshot shows the strip parked near the top and the content centered; the magnetic follow, rise and wake only appear once the pointer moves. No snapping anywhere.
- The centered content is `mix-blend-mode: difference` over the images — expect inverted colors where text overlaps the passing thumbnails; that inversion is the intended look.
- No reduced-motion branch in the original; the ticker loop always runs.

## Images

This component ships with 6 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/magnetic-marquee/marquee-img-1.jpg
https://motionprompts.dev/c/magnetic-marquee/marquee-img-2.jpg
https://motionprompts.dev/c/magnetic-marquee/marquee-img-3.jpg
https://motionprompts.dev/c/magnetic-marquee/marquee-img-4.jpg
https://motionprompts.dev/c/magnetic-marquee/marquee-img-5.jpg
https://motionprompts.dev/c/magnetic-marquee/marquee-img-6.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--bg`, `--ink`, `--muted`, `--safelight`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen — and because the render output does not change between the two passes, the actual DOM nodes (`.spotlight-marquee`, `.spotlight-marquee-track`, the split `.line` spans) are the *same* nodes both times, not fresh copies. Setup that runs twice with teardown that runs never leaves you two of everything acting on that one shared subtree: two infinite tweens each wrapping the same track's `x` inside their own modulo window, two `gsap.ticker.add` loops each writing a `y` transform onto the same strip and the same line elements from two unrelated `stripCurrentY`/`textLines` closures, two `mousemove` listeners on the same section each computing their own `stripTargetY`. The visible symptom is the strip vibrating between two lerp trajectories instead of settling on one, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script checks `document.readyState` before subscribing to `DOMContentLoaded`, and only once the DOM is ready does it look up `.spotlight`, `.spotlight-marquee` and `.spotlight-marquee-track`, clone-fill the track, split the heading, tagline and copy into lines, wire the `mousemove` listener, and start `gsap.ticker.add(tick)`. That guard exists to survive being loaded late in a plain document; in React it is dead weight, because `useEffect` already runs after the DOM is committed. Drop the guard and the listener both, and move that entire sequence — clone-fill, split, listener, ticker — directly into a `useEffect` with an empty dependency array.

*(2) Element lookups* — `.spotlight`, `.spotlight-marquee`, `.spotlight-marquee-track`, and the three `SplitText` targets (`.spotlight-content-wrapper h1`, `.spotlight-content-wrapper h3`, `.spotlight-copy p`) all assume this component owns the document. Give the component a root `ref` on `.spotlight` and resolve every one of them off it. During the StrictMode remount two copies of this subtree exist for an instant, and this component is unusually exposed to picking the wrong one: the clone-fill step sums `offsetWidth` over the six source items to get `oneSetWidth` before appending anything, and an unscoped query that resolves against the outgoing, detached copy reads that width as zero — `Math.ceil(window.innerWidth / 0) + 1` is `Infinity`, so the `for` loop that appends clones never terminates, hanging the tab on the very first mount rather than on some later interaction.

*(3) Cleanup* — Wrap the clone-fill, the marquee tween and the three `SplitText.create` calls in a `gsap.context` scoped to the root ref, and revert that context in the cleanup:

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    /* clone-fill the track, the infinite marquee tween, the three SplitText.create calls */
  }, rootRef);
  return () => {
    /* tick, then splits, then the clone-fill — see below — before ctx.revert() */
  };
}, []);
```

`ctx.revert()` kills the marquee tween — the only tween this component creates — and clears the inline `x` it wrote, but it never touches `gsap.ticker.add(tick)`: a ticker subscription is neither a tween nor a trigger, so the context does not adopt it. `tick` is the heart of this component — it lerps the strip's `y` toward `stripTargetY`, derives `stripVelocityY` from the strip's own previous position, and lerps every line's `y` toward its rise-plus-wake target — and because StrictMode reuses the same `marqueeStrip` and `line.el` nodes across both mounts, a `tick` left running from the first mount keeps calling `gsap.set` on those same nodes in parallel with the second mount's own `tick`, which is exactly the vibrating-strip symptom above. Keep the `tick` reference and call `gsap.ticker.remove(tick)` yourself, first in the cleanup — `gsap.ticker` is a global, page-lifetime scheduler, not something scoped to this component, so nothing else stops it from calling into a mount that no longer owns its elements.

Revert the three `SplitText` instances only after `tick` is removed, not before: `tick` reads `line.el` off the flat `textLines` array on every frame, and `SplitText`'s revert unwraps each `.line` span back into its original text node, so a `tick` that fires between the revert and its own removal writes a `y` transform onto a span that no longer sits where the layout thinks it does. The ordering matters again going into the *next* mount, independent of the ticker: calling `SplitText.create` on an already-split `h1` nests a fresh `.line` wrapper inside the previous one instead of replacing it, and the `offsetParent` walk `measureGeometry` uses to compute `restCenterY` then measures the inner, already-transformed box — the title renders, but its rise-and-wake math is off by whatever the first split's leftover transform was.

Last, undo the clone-fill itself. Setup reads the six original items with `Array.from(track.children)` before appending anything, then appends `setsNeeded` more copies of that same set; if cleanup does not restore the track to exactly those six children, the next mount's `Array.from(track.children)` captures the previous mount's clone-filled track — six originals plus every appended copy — as its new "source", computes `oneSetWidth` from that inflated set, and appends its own copies on top of it. Each StrictMode remount compounds the clone count instead of starting clean, so hold onto the original six-item array from setup and call `track.replaceChildren(...sourceItems)` in the cleanup before `ctx.revert()`. Put together, the order is: remove `tick` from the ticker, revert the three splits, restore the track's six children, then revert the context — the test is not that the strip looks right on first load, it is that you can navigate away and back and find one `tick` loop, one marquee tween, and a track holding exactly six items, not two of each.
