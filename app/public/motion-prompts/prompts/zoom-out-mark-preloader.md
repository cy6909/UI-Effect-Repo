# Zoom-Out Mark Preloader

## Goal

Build a full-viewport hero page for a fictional coastal smokehouse whose loading screen is not a
loading screen. The page opens **completely white with a counter in the corner**, and when the
counter reaches 100 the white recedes — because the white was never a veil. It was the inside of
the brand's `+` mark, blown up until the solid crossing of its two arms covered the whole
viewport. As the mark shrinks back to its normal size the hero photograph is **discovered around
it**, not uncovered beneath it, and the mark comes to rest exactly on the `+` that sits between
the two words of the headline. Then, and only then, the two words fly in from opposite edges, and
once they have settled the mark turns 360° on its own axis.

The one idea to get right: **there is one mark, not a veil plus a mark.** Everything else in this
brief exists to keep that illusion from breaking.

## Tech

Vanilla HTML/CSS/JS as `index.html` + `styles.css` + an ES-module `script.js`
(`<script type="module" src="./script.js">`), plus **GSAP** (core only — no plugins, no
ScrollTrigger, no SplitText). No canvas, no WebGL, no smooth-scroll library. One `gsap.timeline()`
runs the whole sequence.

Fonts: **DM Sans** for everything and **Newsreader** italic for the `%` next to the counter. Any
geometric grotesk works; the design does not depend on the exact face, because — see below — the
mark is drawn, not typed.

## Layout / HTML

```html
<div class="pre" id="pre" aria-hidden="true">
  <span class="pre__mark" id="preMark"><span class="cross"><i></i><i></i></span></span>
  <div class="pre__count"><span id="preNum">0</span><i>%</i></div>
</div>

<header class="nav">
  <a class="nav__mark" href="#">SALT <span class="nav__plus">+</span> SMOKE</a>
  <button class="nav__menu" type="button">MENU <span class="nav__plus">+</span></button>
</header>

<main>
  <section class="hero">
    <div class="hero__media"><img src="hero.jpg" alt="…" /></div>

    <h1 class="hero__type" aria-label="Salt + Smoke">
      <span class="hero__word hero__word--a">SALT</span>
      <span class="hero__word hero__word--b" aria-hidden="true">
        <span class="cross" id="heroCross"><i></i><i></i></span>
      </span>
      <span class="hero__word hero__word--c">SMOKE</span>
    </h1>

    <p class="hero__note">Cold-smoked over oak and sea air on the Atlantic shelf, cured slowly
      enough that the weather gets a say in how it turns out.</p>

    <a class="hero__cta arrowlink" href="#"><span class="arrowlink__arrow"></span>See The Cure</a>

    <button class="replay" type="button" id="replay">REPLAY <span class="nav__plus">+</span></button>
  </section>
</main>
```

Non-negotiable points of this markup:

- **`.pre` lives outside `<main>`, and it has no background of its own.** It is `position: fixed;
  inset: 0; z-index: 200; overflow: hidden; pointer-events: none;` with `background: transparent`.
  If you give the preloader a white background, shrinking the mark reveals nothing — there is
  still white behind it — and the entire effect evaporates. The white you see **while the mark is
  receding** must come from the mark itself.
  §7 adds one opaque white layer to this element, and it is not an exception to the rule so much
  as its mirror image: it exists only for the phase in which nothing is being revealed yet, and it
  is removed on the very frame the recede begins. The invariant to hold onto is not "the preloader
  never has white behind the mark" — it is **"the preloader has nothing behind the mark from the
  moment the mark starts moving."**
- **The same `.cross` markup appears twice**: once inside `.pre__mark`, once inside
  `.hero__word--b`. They are the same component in the same place at the same size, which is why
  the handover at the end is a swap of elements and not a movement.
- The `<h1>` carries `aria-label="Salt + Smoke"` and the cross span is `aria-hidden`, because the
  mark is two empty `<i>` elements and would otherwise read as nothing at all.
- Add a **one-line inline script in `<head>`**: `document.documentElement.classList.add("js")`,
  and scope the preloader to it (`.pre { display: none } .js .pre { display: block }`). The
  preloader covers the whole screen; if the CSS painted it unconditionally and the module failed
  to load, the visitor would be left staring at a white rectangle with no way out.
- `.replay` is **demo furniture**, not part of the component. A preloader plays once, which makes
  it hard to look at twice; in production you delete the button and the listener and nothing else
  changes.

## Styling

**Tokens**, on `:root`: `--paper: #ffffff` (the mark, i.e. the blank screen), `--ink: #16120e`
(the counter), `--night: #0d0b09` (the page ground), `--ash: #b9b1a6` (the standfirst),
`--m: 30px` (gutter), `--ease: cubic-bezier(0.22, 1, 0.36, 1)`. `--ease` is used by every
transition in the piece: the hero image's hover scale, the arrow's growth, the nav's hover, and the
replay button's fade.

**Base.** `*, *::before, *::after { box-sizing: border-box }`; `body { margin: 0; background:
var(--night); color: var(--paper); font-family: "DM Sans", system-ui, sans-serif; font-weight: 400;
font-size: 16px; line-height: 1.22; -webkit-font-smoothing: antialiased; overflow-x: hidden }`;
`img { display: block; width: 100%; height: 100%; object-fit: cover }`; `p { margin: 0 }`;
`a { color: inherit; text-decoration: none }`.

Everything in this component is weight **400**. There is no bold anywhere — not in the headline,
not in the counter, not in the nav. At 200px a geometric grotesk at 400 is already emphatic, and
500 makes the headline look like a different, heavier design.

Three user-agent defaults will undo that on their own if you let them, and all three are on
elements this brief calls out as critical:

- the `<h1>` arrives **bold** and with a `margin`; it needs `margin: 0` and `font-weight: 400`;
- both `<button>`s (the nav's and the replay) arrive with a grey border, a background, a system
  font and a smaller size; they need `font: inherit; letter-spacing: inherit; color: inherit;
  background: none; border: 0; cursor: pointer` — otherwise the replay is a pill, which is exactly
  what it must not be;
- `.arrowlink__arrow` is a `<span>` and inline boxes ignore `width`/`height`; give it
  `display: inline-block`.

**Hero.** `position: relative; height: 100svh; min-height: 520px; overflow: hidden;` on
`--night`, with `.hero__media` absolutely filling it and its `<img>` at `object-fit: cover`,
`transform: scale(1.04)`, going to `scale(1.09)` on hover of the whole section over `1.2s`
(put `transform` in a `transition` list — a `:hover` that changes scale with nothing interpolating
it jumps).

`.hero__type` is `position: absolute; inset: 0; margin: 0; display: flex; flex-direction: column;
justify-content: center; line-height: 1.06; letter-spacing: -0.02em; white-space: nowrap;
z-index: 2;`, and `.hero__word { display: block }`. The three words are `align-self: flex-start`,
`center`, `flex-end` respectively — the mark in the centre is the coordinate the preloader lands
on, so this centring is structural, not decorative.

The `z-index: 2` is against `.hero::after` below: the veil is a pseudo-element of the same box and
would otherwise paint over the headline. Give the standfirst, the link and the replay button the
same, and put them **after** `.hero__type` in the DOM. That ordering is what makes the link and the
replay button clickable: `.hero__type` is `inset: 0`, so its box covers them (padding is inside the
box, not outside it), and only being later in source order at the same `z-index` puts them on top.
Get the order wrong and the two controls go dead with nothing in the console to say why.

Its padding and its font-size are the two rules that keep the headline off the rest of the page,
and **both** are needed — fixing only one leaves the bug:

```css
padding: 92px var(--m) 110px;
font-size: clamp(44px, min(15.5vw, 30vh - 62px), 208px);
```

The block is centred inside its own box, so centring it against a bare `inset: 0` centres it
against the **whole screen**, fixed bar and standfirst included. The padding reserves those two
bands so the centring happens in the gap that is actually free. And a width-only clamp asks a wide,
short window — an ordinary laptop at 1229×669 — for a 190px body to fit in a 450px gap, at which
point no amount of padding helps and the text spills over the bar and the footer row at the same
time. Three lines at `line-height: 1.06` occupy `3.18em`, and `30vh - 62px` is the body that keeps
them inside the gap once the bands are deducted. Check it at 1229×669, not only at 1280×800.

Add a bottom veil for legibility: `.hero::after { inset: auto 0 0 0; height: 52%; background:
linear-gradient(to top, rgba(6,5,4,0.72), rgba(6,5,4,0.3) 44%, transparent); pointer-events: none; }`.
The photograph is deliberately dark, but a photograph is never a guarantee about a specific corner;
this is.

**Nav.** `position: fixed; inset: 0 0 auto 0; z-index: 60; display: flex; align-items: center;
justify-content: space-between; padding: 32px var(--m); font-size: 13px; letter-spacing: 0.04em;
color: var(--paper); mix-blend-mode: difference;` — the blend mode is what makes the wordmark invert
itself over both the dark racks and the bright light shaft without any JS colour-switching. The
`z-index: 60` is below the preloader's 200, so the nav is covered while the mark is up. Both nav
items get `padding: 10px 0` and `transition: opacity 0.3s var(--ease)`, going to `opacity: 0.5` on
hover. `.nav__plus` is `display: inline-block; padding: 0 0.28em` — the literal `+` character here,
not the drawn cross; at 13px the glyph's off-centre ink is invisible.

**Counter.** `position: absolute; right: var(--m); bottom: 26px; display: flex; align-items:
baseline; gap: 2px; font-size: 96px; font-weight: 400; line-height: 1; letter-spacing: -0.03em;
font-variant-numeric: tabular-nums; color: var(--ink);` — **ink, not white**, because it is read
against the white crossing of the mark. `tabular-nums` matters: without it the number jitters
horizontally as the digits change. The `%` is a separate `<i>` at `font-family: "Newsreader",
Georgia, serif; font-style: italic; font-size: 21px` — small enough against the 96px number to read
as a unit rather than as part of it, and the only serif on the page.

**The bottom band.** Three items, all at `bottom: 34px`, none of them specified by the rest of this
brief and all three visible in every frame after the handover:

- `.hero__note` — `position: absolute; left: var(--m); max-width: 356px; font-size: 15px;
  line-height: 1.32; color: var(--ash);`
- `.hero__cta` — `position: absolute; right: var(--m);`
- `.replay` — `position: absolute; left: 50%; transform: translateX(-50%); font-size: 12px;
  letter-spacing: 0.08em; color: var(--paper); background: none; border: 0; padding: 8px 10px;`
  and, crucially, **no border, no pill, no box** — it is plain text, the quietest thing on the
  screen. It starts `opacity: 0; visibility: hidden` and only its `is-ready` class (added by the
  last step of the timeline) takes it to `opacity: 0.45; visibility: visible`, going to `1` on
  hover and on `:focus-visible`. `visibility` and not just `opacity`: an invisible but focusable
  button sends the keyboard somewhere there is nothing, and while the sequence is running there is
  nothing to rewind. Its click **rebuilds the sequence from zero** — kill the timeline, strip
  `is-open`, `is-off` and `is-ready`, put the counter back to `0` and `.pre__count` back to
  `opacity: 1`, re-apply the initial states of §8, re-run `measure()`, and play again. It is a
  no-op while reduced motion is on.

**`.arrowlink`** — the CTA, named in the markup and otherwise unspecified: `display: inline-flex;
align-items: center; gap: 10px; font-size: 13px; letter-spacing: 0.04em;`. Its arrow is not a glyph
and not an icon font. `.arrowlink__arrow` is a `22px × 1px` bar of `currentColor` with
`transition: width 0.4s var(--ease)`, and its `::after` is a `7px × 7px` square with only
`border-top` and `border-right` set (`1px solid currentColor`), `rotate(45deg)`, pinned to the bar's
right end at `right: 0; top: -3px`. On hover of the link the bar grows to `34px` — the head stays
put and the shaft lengthens, which is the whole gesture.

**Mobile** (`max-width: 720px`): `--m` drops to `18px`, the counter to `58px` at `bottom: 18px`, and
the headline to `clamp(38px, min(19vw, 26vh - 40px), 92px)` with `padding: 84px var(--m) 170px`.
The bottom band is taller there because it becomes three rows instead of one: the standfirst goes
full width (`max-width: none; right: var(--m); bottom: 76px; font-size: 14px`), and the replay
button drops to its own row beside the link (`left: var(--m); right: auto; bottom: 30px;
transform: none; padding: 8px 10px 8px 0`) — the `transform: none` is not optional, it undoes the
desktop centring, and zeroing the left padding is what lines the label up with the gutter.

## The effect (exhaustive — this is the part to get exactly right)

### 1 · The mark is two bars, not the `+` glyph

```css
.cross { position: relative; display: inline-block; width: 0.5em; height: 1.12em; vertical-align: baseline; }
.cross i { position: absolute; left: 50%; top: 50%; background: currentColor; transform: translate(-50%, -50%); }
.cross i:first-child { width: 0.0625em; height: 0.43em; }   /* vertical arm   */
.cross i:last-child  { width: 0.45em;  height: 0.0675em; }  /* horizontal arm */
```

This looks like a micro-optimisation and it is the load-bearing decision of the whole component.

A glyph's ink sits **asymmetrically inside its box** — advance width by line height — so centring
the box does not centre the drawing. At scale 1 the offset is a few pixels and nobody notices. At
scale 18 it is several hundred, and a white band with a hard edge appears along one side of the
screen while the opposite side shows the photograph early. Trying to correct it from font metrics
fails in two different ways that do not announce themselves: the sign conventions of
`actualBoundingBoxLeft`/`Ascent` are easy to get backwards, and `measureText` run before the
webfont has loaded silently measures the fallback face.

With two bars the centre is the centre at any scale, and the handover from preloader to hero is
exact because both use this same piece. (The proportions above are the real DM Sans `+` measured by
scanning its pixels on a canvas, so it still looks like the typeface's plus sign.)

### 2 · The box the transform centres must be the box the ink centres on

```css
.pre__mark {
  position: absolute; left: 50%; top: 50%;
  display: grid; place-items: center;
  width: 0.5em; height: 1.12em;
  font-size: 1600px;
  color: var(--paper);
  transform: translate(-50%, -50%);
  transform-origin: 50% 50%;
  will-change: transform;
}
```

The `display: grid; place-items: center` with an explicit box **is not styling** — it is the same
bug as §1, one floor up.

If `.pre__mark` is a bare `<span>`, the reference box for `translate(-50%, -50%)` is the *inline
line box*, while the cross inside it is an `inline-block` hanging off the baseline and far taller
than that line. At scale 18 the mismatch throws the drawing thousands of pixels off: the horizontal
arm ends up entirely above the viewport, and instead of a `+` that shrinks you get a white column
that narrows. It still looks like *something*, which is exactly why this one is easy to ship by
accident. **Verify it**: at rest, `document.querySelectorAll('#preMark .cross i')` must give two
rects whose union covers the whole viewport, not one.

### 3 · Start from a large font-size and scale down, never the reverse

`font-size: 1600px` scaled to ~0.12 gives the same pixels as `160px` scaled to 1.2, but not the
same image. The browser rasterises a layer at its natural size and then scales the raster, so
magnifying a 10px bar ×180 produces stair-stepped edges and a halo. Start big, scale down, and the
arms stay clean at every frame of the recede.

### 4 · The start scale is computed, never a magic number

```js
let arm = parseFloat(getComputedStyle(preMark).fontSize) * 0.0625; // the vertical arm, in px
const startScale = () => (Math.hypot(innerWidth, innerHeight) / arm) * 1.2;
```

The scale needed is whatever makes the **crossing** — the solid square where the two arms overlap —
cover the viewport's diagonal, with 1.2 as deliberate margin. Overshooting costs nothing but extra
white; undershooting shows the edge of the mark on the first frame. A number tuned on one monitor
shows the edge on the next one. Read the viewport live so a resize mid-sequence cannot break it.

### 5 · The zoom-out is interpolated in log space

```js
const zoom = { p: 0 };
tl.to(zoom, {
  p: 1, duration: 1.9, ease: "power1.inOut",
  onUpdate() {
    gsap.set(preMark, { scale: target.final * Math.pow(startScale() / target.final, 1 - zoom.p) });
  },
}, "<");
```

**This is the difference between the effect being visible and not being visible**, not a
refinement. Scale is multiplicative. Tweening it linearly from ~18 to ~0.12 spends half the
duration between 18 and 9 — a range in which the crossing still covers the entire screen and
nothing whatsoever happens on it — and then crams the whole reveal into the last few tenths.
Animating the *logarithm* divides the scale by the same factor every instant, so the recede is
perceived at a constant rate from beginning to end. `power1.inOut` on top of that only softens
the two ends.

### 6 · The landing is measured against the hero's mark, not hard-coded

`arm` and `target` are module-level state that §4 and §5 both read, and `measure()` is what fills
them. Declare them as `let arm = 100` and `let target = { x: 0, y: 0, final: 0.1 }`, and call
`measure()` **before** building the timeline — those fallbacks exist so the code cannot crash, not
so it can run on them.

```js
function measure() {
  arm = parseFloat(getComputedStyle(preMark).fontSize) * 0.0625 || 100;
  gsap.set(heroCross, { rotate: 0 });          // a rotated cross has a wider bounding box
  const r = heroCross.getBoundingClientRect();
  target = {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2,
    final: r.width / (arm * 8),                // the cross is 0.5em wide, the arm 0.0625em → ×8
  };
  gsap.set(preMark, { left: target.x, top: target.y, xPercent: -50, yPercent: -50 });
}
```

The hero's type is sized with `clamp()`, so its mark is a different number of pixels at every
window width, and the hero mark's centre is **not** the centre of the viewport (it sits on a text
baseline between two other words). Hard-coding either one produces a small jump at the handover
that is invisible on the machine you built it on and obvious on the next.

Re-measure on `resize`, but **guard it on the preloader still being on screen**
(`if (!pre.classList.contains("is-off")) measure()`), not on the timeline still running. `measure()`
zeroes `heroCross`'s rotation, and a resize during the final 360° turn would otherwise snap the
mark back to 0 mid-spin.

One thing that looks wrong here and is not: `xPercent: -50, yPercent: -50` on an element whose CSS
already says `transform: translate(-50%, -50%)` does **not** double the offset. GSAP resolves a
percentage translate in the computed matrix into its own `xPercent`/`yPercent` rather than into
pixel `x`/`y`, so the two describe the same thing and the second overwrites the first. Measured on
the real component: `.pre__mark` is an `800 × 1792` box and `getComputedStyle(...).transform`
decomposes to a translation of exactly `(-400, -896)`, once. Adding a defensive `x: 0, y: 0`
changes nothing, so leave it out rather than carry a line whose reason is not real.

### 7 · The shield, which exists for exactly one frame

```css
.pre::before { content: ""; position: absolute; inset: 0; background: var(--paper); }
.pre.is-open::before { display: none; }
```

Between first paint and the first line of a deferred module there is a window in which the mark is
still at its resting size — one frame of the hero, visible, before the "blank screen" appears. This
opaque white covers that window and is removed the instant the zoom-out starts, i.e. before there
is anything to reveal. It costs nothing, because during the count the screen is white anyway.

The preloader carries **two** classes and they are not opposites, which the names make easy to
misread. `is-open` means *the shield is gone and the reveal has begun*; it goes on at the start of
the recede. `is-off` means *the preloader is finished*, and it is `display: none`; it goes on at the
handover, two seconds later.

### 8 · Strictly in turns, with the pieces overlapping only where stated

Everything starts from a state the script writes, not the stylesheet, and it is the same routine the
replay button re-runs: call `measure()`, then park `.pre__mark` at `scale: startScale()` (do not
leave that to the zoom's first `onUpdate`, or the frame on which the shield drops is a coin toss),
`.nav` at `opacity: 0`, the hero's `.hero__word--b` at `opacity: 0`, the `.cross` inside it at
`rotate: 0`, the left word at `xPercent: -140, opacity: 0` and the right word at
`xPercent: 140, opacity: 0`, the standfirst and the link at `opacity: 0, y: 18`. Lock the scroll
with a class (`body.is-loading { overflow: hidden }`) rather than an inline style, so the stylesheet
stays in charge of it and the handover only has to remove a class name. Note that the opacity goes on the **wrapper** and the rotation on the **cross
inside it** — two different nodes, so that the 360° turn spins only the mark and not a box whose
size is set by the line it sits on.

Put none of this in CSS: doing so would leave a no-JS visitor with an empty hero, and would give
§9's `clearProps` nothing coherent to undo.

Then one `gsap.timeline()`:

1. **Count.** `tl.to(count, { v: 100, duration: 1.8, ease: "power1.inOut", onUpdate })` at position
   `0`, writing `Math.round(count.v)` into the counter. Nothing else moves.
2. **Recede.** After `"+=0.12"`, fade `.pre__count` out over `0.35s` with `power2.in` — the white
   it was read against is about to leave — drop the shield at `"<"`, and run the log zoom of §5,
   also at `"<"`.
3. **Handover.** A callback sets the hero mark to `opacity: 1`, adds `is-off` to `.pre`, and
   unlocks `body`. At `"<"`, the nav fades in over `0.6s` with `power2.out`, and the two words tween
   `xPercent → 0, opacity → 1` over `1.05s` with `power4.out` and `stagger: 0.07`. **Each word
   arrives from its own side**: the one aligned to the left edge comes from `-140`, the one aligned
   to the right from `+140`. Send them the other way and they cross over the mark, which reads as a
   shuffle rather than as two halves closing on a centre.
4. **The turn.** `tl.to(heroCross, { rotate: 360, duration: 1, ease: "power2.inOut" })` with **no
   position parameter** — it must start after the words have finished. Spinning while they are
   still arriving turns three legible gestures into one blur. The standfirst and the link fade up
   at `"<0.2"` — `opacity → 1, y: 18 → 0, duration: 0.7, ease: "power3.out"`. Last of all, a
   callback puts `is-ready` on the replay button.

Add the positions up and the timeline runs **≈5.9s** end to end: `1.8` for the count, `+0.12` of
gap, `1.9` of recede ending at `3.82`, the words landing at `4.94`, the turn closing at `5.94`.

### 9 · Reduced motion removes the component, it does not soften it

The whole piece consists of covering the screen and receding. There is no gentle version of that,
so under `prefers-reduced-motion: reduce` the preloader is `display: none !important` in CSS, the
script hands over the finished hero immediately (`clearProps` on everything it had set), and the
replay button never appears.

`document.getAnimations()` must be `0`, and GSAP is not what puts it at risk — GSAP does not use
the Web Animations API, so its tweens never show up there at all. What does show up is CSS: the
media query has to switch off the hero image's `transition` **and** its `:hover` scale, and the
nav's, the arrow's and the replay button's transitions. Miss those and the assertion fails while
every tween is already gone.

Listen to the media query's `change` event, but only in one direction: turning reduced motion **on**
mid-sequence hands the finished page over immediately; turning it **off** does not start the
preloader, because a loading screen that begins after the page is already up is nonsense.

## Assets / images

One photograph: `hero.jpg`, a full-bleed 16:9 interior of an old coastal smokehouse at first
light — rows of split fish on weathered oak racks, whitewashed stone, a slate floor, and a single
hard shaft of low sun cutting diagonally through drifting woodsmoke. **Shoot or generate it dark
and low-key**, with the light shaft as the only bright element. This is not a mood choice: the
reveal is white receding onto the page, so a bright page gives you nothing to reveal.

## Behavior notes

- The counter is theatre, not `document.readyState`. If you want it to mean something, drive
  `count.v` from real progress and let the timeline wait on it — but keep the recede on its own
  fixed duration, because a load that finishes in 40ms would otherwise make the whole effect
  invisible.
- `pointer-events: none` on `.pre` throughout, and `is-off` (`display: none`) at the handover: the
  finished page must not have an invisible sheet of glass over it.
- `body` gets `overflow: hidden` while loading and loses it at the handover.
- Nothing here touches the scroll position or installs a scroll listener, so the component composes
  with a scroll-driven page below the fold.

## Using this outside its demo page

The mark does not have to be a `+`. Anything **solid and centred** works: an asterisk, a bar, a
dot, a filled letterform, a square. The three requirements are that (a) it be drawable as elements
rather than a glyph, or at least that you have measured its ink box; (b) it have a filled region
big enough to cover the viewport at a sane scale — an outlined or hairline mark cannot do this;
and (c) the same piece exist somewhere in the resting page for it to land on. If your brand mark
is a wordmark, put the preloader on one solid letter of it.

To change the colour scheme, invert `--paper` and `--night`: a black mark receding onto a pale page
works identically, and then the counter goes light.

## Adapting this to React

Keep the timeline in a single `useLayoutEffect` with a `gsap.context()` scoped to a container ref,
and return `ctx.revert()` from the cleanup — under StrictMode the effect runs twice in development
and without the revert you get two timelines fighting over `scale` on the same node.

Refs, not selectors, for `preMark`, `preNum` and `heroCross`; the counter must be written with
`preNum.current.textContent` inside `onUpdate` and **not** through `useState` — sixty state updates
a second re-renders the tree for a number that only one text node cares about.

`measure()` has to run **after layout**, which is why `useLayoutEffect` and not `useEffect`. It does
*not* need to wait on `document.fonts.ready`, and that is worth stating because it is the obvious
thing to add: every dimension it reads — the cross's `0.5em × 1.12em` box, the explicit
`line-height: 1.06` of the row it sits in — is derived from `font-size` alone, so a font swap
cannot move it. That is another dividend of drawing the mark instead of typing it (§1); if you go
back to a glyph, you *do* have to wait for the face, and you have to remember to. Put the `resize`
listener in the same effect.

The `js` class trick is unnecessary in a client-rendered app but still worth its equivalent: gate
the preloader's mount on the effect having run, so a thrown error upstream cannot leave the overlay
on screen.
