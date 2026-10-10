# Outline Text Filled by Media — the word is hollow until the image fills it

## Goal

Build a pinned stage where a giant word sits **hollow** — stroked, transparent fill — over a
photograph, and a scroll-driven wipe uncovers a second copy of the same word **filled with that
photograph**, letter by letter, left to right.

Use it when the name of something has to *be* the image: a season title, a film title, a record
sleeve.

## Tech

Vanilla HTML/CSS/JS with ES modules: `gsap` + `ScrollTrigger`, and `lenis`.

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

## The mechanic in one line

Two copies of the same word, pixel-aligned, one stroked and hollow and one filled via
`background-clip: text`; a `clip-path` wipe uncovers the filled copy.

```html
<div class="word" aria-label="Undertow">
  <span class="hollow" aria-hidden="true">Undertow</span>
  <span class="filled" aria-hidden="true">Undertow</span>
</div>
```

## The four decisions that ARE this component

### 1. Two copies, not one element that changes.

`-webkit-text-stroke` with a transparent fill and a background clipped to text are **different
paint paths**. Any crossfade between them flickers on the sub-pixel edge of every letter. Two
stacked copies with a `clip-path` wipe are exact, cheap and perfectly reversible.

### 2. The alignment is the whole job.

```css
.word { display: grid; }
.word span { grid-area: 1 / 1; /* identical everything else */ }
```

Both copies share **one grid cell** and identical typography. Everything that affects where a glyph
lands — family, size, weight, `line-height`, `letter-spacing`, `padding`, `white-space` — must be
identical in the two rules. Drift them by a single pixel and the outline shows as a ghost beside the
fill: the effect is dead and it looks like a rendering bug.

What the filled copy *does* add is only paint, never metrics: `background-image`,
`background-size`, `background-position`, `background-clip: text`, and the `clip-path` wipe. If you
find yourself adding anything to the filled rule that is not in that list, it will move the text.

### 3. The fill image comes from the background's own `src`, set in JS.

```js
filled.style.setProperty("--fill", `url("${bg.getAttribute("src")}")`);
```

Two reasons. The letters end up **in register** with what is behind them, so the word reads as a
window cut into the photograph rather than as a word containing a different picture. And there is
one place to change the photo instead of two.

### 4. The wipe finishes early — at 78% of the track.

```js
const w = gsap.utils.clamp(0, 1, p / 0.78);
```

If it completes exactly as the section leaves, the reader never sees the finished word. The payoff
has to land while the sentence is still on screen, and then **hold**. The last fifth of the track
is that hold.

## The light comes up with it

```js
bg.style.opacity = 0.42 + w * 0.3;
```

Brightening the background in step with the wipe is what makes it read as light arriving rather
than as a mask sliding across. It is one line and it changes the whole register of the effect.

## Details

- `padding-block: 0.08em` on the word: at `clamp(3.2rem, 15vw, 13rem)` the glyphs overflow their
  box and clip against the ascenders.
- `aria-label` on the wrapper, `aria-hidden` on both copies — otherwise the word is announced
  twice.
- `-webkit-text-stroke` has no universal standard equivalent. Where it is unsupported the hollow
  copy is simply invisible and the filled one carries the section: degrade, not break.

## Reduced motion

Show the word already filled (`clip-path: none`) and collapse the track. The image inside the
letters is the point and it survives; only the wipe goes.

## Adapting

Change the word (one word, up to nine or ten characters — the wipe needs width to read), the
photograph, the palette, the type. A heavy serif or a fat grotesk both work; a light weight does
not, because there is not enough counter area for the image to show. Keep: two copies, one grid
cell, the fill sourced from the background, the early finish, and the background brightening in
step.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches for
`.filled` and `.bg` with `document.querySelector`, wires a single `Lenis` instance into GSAP's
ticker, and never has to undo any of it. React withdraws that guarantee, and the failure here does
not throw — the wipe still plays, just off two disagreeing clocks, or the background never settles
back to its resting opacity after the route changes.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything
reaches the screen. This component creates three long-lived things in one pass: the
`ScrollTrigger` that writes `--wipe`, the `Lenis` instance, and the `gsap.ticker.add` callback that
feeds Lenis's `raf` on every tick. A remount that skips cleanup leaves two triggers both writing
`--wipe` off two different scroll listeners — the wipe visibly doubles speed or stutters — while a
first, orphaned `Lenis` keeps receiving ticks from a callback nobody removed and fights the second
instance over the same wheel input. None of this shows up in a production build, because only
development double-invokes effects; the cleanup below is not optional polish, it is the difference
between one smooth scroller and two.

*(1) The entry point.* The script waits for `DOMContentLoaded`. By the time a React component
mounts, that event has already fired, so the listener is never called — no error, the section just
never gets its wipe, its `Lenis`, or its `--fill` custom property. Delete the
`document.addEventListener("DOMContentLoaded", …)` wrapper and move its body — plugin
registration, the `--fill` write, the reduced-motion check, the `Lenis` setup,
`ScrollTrigger.create` — directly into a `useEffect` with an empty dependency array.

*(2) Element lookups.* `document.querySelector(".filled")` and `.bg` assume this component owns
the document. With only two elements it is simpler to skip the query entirely: put a `ref` on the
filled span and one on the background image, and read `bgRef.current.getAttribute("src")` instead
of querying for it. If you keep the selector form for `.track`, scope it to a root `ref` on the
element that wraps the word and the track. This is not a style nit: during the StrictMode remount
two copies of the subtree exist for an instant, and an unscoped `document.querySelector` binds to
whichever copy is on its way out — `filled.style.setProperty("--fill", …)` then writes into a node
about to be discarded, and the copy that actually mounts shows no image at all.

*(3) Cleanup.* Wrap the effect body — the `--fill` write, the reduced-motion early return, the
`Lenis` wiring, and `ScrollTrigger.create` — in a `gsap.context` scoped to the root ref, and revert
it in the cleanup:

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    /* --fill write, reduced-motion check, Lenis setup, ScrollTrigger.create */
  }, rootRef);
  return () => ctx.revert();
}, []);
```

`ctx.revert()` kills the trigger and undoes the inline `--wipe` and opacity writes it made, but it
has no idea the effect also created a `Lenis` instance and a `gsap.ticker.add` subscription — those
are not tweens or triggers, so `gsap.context` never records them. Call `lenis.destroy()` and
`gsap.ticker.remove(tick)` yourself, holding onto the exact function reference passed to
`gsap.ticker.add` so you can remove that same one. Remove the ticker callback before destroying the
instance, not after, so no in-flight tick calls `lenis.raf` on an instance that is already gone.
Skip this pair and the leak is silent: a second `Lenis` on the next mount, both still listening for
`scroll` and both calling `ScrollTrigger.update`, arguing over the same wheel event. If this word is
one section among several sharing the page, `Lenis` belongs at the app shell rather than inside
this component — lift the single instance up and let this effect only add its own `scroll` relay
and its own trigger.

One more callback sits outside GSAP's bookkeeping:
`document.fonts.ready.then(() => ScrollTrigger.refresh())` can resolve after a StrictMode unmount
has already reverted this component's context. Calling `ScrollTrigger.refresh()` at that point is
harmless on its own — there is nothing left here to refresh — but it refreshes every trigger
currently on the page, including ones belonging to whatever mounted next. Guard it with a boolean
flipped in the cleanup, the same discipline the `load`-event lifecycle needs elsewhere in this
catalogue, so a stale promise doesn't reach into a scene it no longer belongs to.
