# Landing Page Reveal — Counter Preloader + Sliding Image Stack + Masked Hero Unveil

## Goal
Build a full-viewport editorial landing hero fronted by a cinematic **preloader that plays automatically once on page load** (~8 seconds total). A bone overlay covers the screen; inside it a giant `0 → 100%` counter ticks up in randomized jumps while, below it, a **stack of ten portrait images wipes across the frame** — each image slides in from the left and, moments later, slides out to the right, producing a rapid slideshow-wipe. When the counter hits `100%`, the digits slide up out of a mask, a giant masked wordmark slides up into the same slot and then slides up out again, the whole bone overlay fades away, the hero background image de-zooms from `2x` to `1x`, the giant hero name rises character-by-character out of its clip mask, and the top nav bar drops down into place. All motion is plain `gsap.to` tweens driven by `power4.out` / `power3.inOut` eases — no timeline object, no plugins.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) **only** — no GSAP plugins, no SplitText (text is split into `<span>`s by a tiny hand-written helper), no smooth-scroll library (the page does not scroll during the intro; it is a pure load-triggered sequence). Import with `import gsap from "gsap";`. Two independent trigger mechanisms run in parallel (details below): the image-stack tweens fire on fixed `delay` timers from load, while the counter/logo/overlay/hero/nav tweens are chained after a randomized counting loop completes.

## Layout / HTML
Semantic structure (class names are load-bearing — the JS/CSS query them):

```html
<nav>
  <div class="nav-logo"><a href="#">kudos</a></div>
  <div class="menu"><p>Menu</p></div>
  <div class="shop">
    <a href="#">Shop</a>
    <a href="#">Cart (0)</a>
  </div>
</nav>

<div class="hero">
  <img src="/hero.jpg" alt="" />
</div>

<div class="hero-copy">
  <h1>kudos</h1>
</div>

<div class="overlay">
  <div class="overlay-content">
    <div class="images">
      <div class="img-holder">
        <!-- exactly 10 identical <img> -->
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
        <img src="/loader.jpg" alt="" />
      </div>
    </div>
    <div class="text">
      <div class="counter"><p>100%</p></div>
      <div class="logo"><p>kudos</p></div>
    </div>
  </div>
</div>
```

Notes:
- Use **"kudos"** (lowercase) as the neutral placeholder brand/name — it appears in the nav logo, as the preloader wordmark (`.logo p`), and as the giant hero headline (`.hero-copy h1`).
- The `.img-holder` holds **exactly 10** `<img>` elements pointing at the same portrait image.
- `.overlay` is a **fixed** full-screen cover with `z-index:1000` that sits above everything during the intro; it is faded to `opacity:0` at the end but is **not** removed from the DOM.
- `.counter p` initial text is `100%` (the JS overwrites it every counting tick).

## Styling
Fonts: **Space Grotesk** for the display type (the counter, the preloader wordmark, the giant hero name), **Inter** for body, **Space Mono** for the small nav labels. All three are free web fonts and must actually be loaded — nothing here relies on a system fallback.

Palette (P1 Canary):
```css
:root {
  --color-bone: #f4f4f0;   /* the overlay, the nav bar and the giant hero name */
  --color-ink: #0a0a0a;    /* the counter digits, the wordmark, nav text */
  --color-accent: #ffe500; /* canary — used as a surface (chip, underline) with ink on top, never as text */
  --color-gray: #8c8c88;
}
```

- `--color-bone: #f4f4f0` — the overlay background, the nav background, and the colour of the giant hero name.
- `--color-ink: #0a0a0a` — the counter digits, the preloader wordmark and the nav text.

Global:
- `* { margin:0; padding:0; box-sizing:border-box }`.
- `img { width:100%; height:100%; object-fit:cover }`.

Key elements and their **initial states** (the animation depends on these exact values):

- `.overlay`: `position:fixed; top:0; left:0; width:100vw; height:100vh; background: var(--color-bone); display:flex; justify-content:center; align-items:center; z-index:1000`.
- `.overlay-content`: `width:40%`.
- `.images`: `position:relative; height:550px`.
- `.img-holder`: `position:relative; width:80%; height:100%; margin:0 auto; z-index:2; clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%)` (a full rectangle used purely as an **overflow mask** — the off-screen images are clipped by it).
- `.img-holder img`: `position:absolute; top:0; left:-110%` (each image starts one-and-a-bit widths **off to the left**, hidden by the clip-path mask).
- `.text`: `position:relative; margin:1em 0; clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%)` (again a rectangular **mask** clipping the counter/logo spans that slide above and below it).
- `.counter, .logo p`: `font-family:"Space Grotesk"; font-size:160px; font-weight:600; letter-spacing:-0.03em; text-align:center; text-transform:uppercase`. The 160px is deliberate: the 600-weight Grotesk runs wider than a light face, and at 200px the reveal clip window (`.text`, 40vw) shaved the wordmark.
- `.counter p`: `line-height:100%`.
- `.counter p span, .logo p span`: `position:relative; z-index:-2; color: var(--color-ink)`.
- `.logo`: `position:absolute; top:0; left:50%; transform:translateX(-50%)` (overlaps the counter in the same masked slot).
- `.logo p`: `line-height:100%`.
- `.logo p span`: `position:relative; top:200px` (each wordmark char parked 200px **below** its natural line, hidden below the `.text` mask).
- `nav`: `position:fixed; top:-200px; width:100%; padding:1em; background-color: var(--color-bone); display:flex; align-items:center; z-index:1` (parked 200px **above** the top edge, out of view). `nav > div { flex:1 }`.
- `nav a, nav p`: `font-family:"Space Mono", monospace; text-decoration:none; text-transform:uppercase; color: var(--color-ink)`.
- `.menu { display:flex; justify-content:center }`. `.shop { display:flex; justify-content:flex-end; gap:2em }`.
- `.hero`: `width:100vw; height:100vh`.
- `.hero img`: `transform: scale(2)` (starts zoomed to `2x`; de-zooms to `1x`).
- `.hero-copy`: `position:absolute; top:35%; left:50%; transform:translate(-50%,-50%); text-transform:uppercase; clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%)` (rectangular **mask** over the giant name).
- `.hero-copy h1`: `font-family:"Space Grotesk"; font-weight:600; font-size:30vw; letter-spacing:-0.03em; color: var(--color-bone); line-height:100%`.
- `.hero-copy h1 span`: `position:relative; top:30vw` (each char parked ~one line-height **below**, hidden inside the `.hero-copy` mask).

## GSAP effect (be exact)

### Text-split helper (not the SplitText plugin)
A hand-written function wraps every character of an element in a `<span>`:
```js
function splitTextIntoSpans(selector) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = el.innerText.split("").map((c) => `<span>${c}</span>`).join("");
}
```
On `DOMContentLoaded`, call it on `.logo p` and `.hero-copy h1` so the preloader wordmark and the hero name each become a row of per-char spans (which the CSS above has already parked below their masks via `top:200px` / `top:30vw`).

### Clock A — sliding image stack (fixed `delay` timers from load)
Registered inside the same `DOMContentLoaded` handler. Two plain tweens on the ten identical images:

**A1 — images wipe IN (starts at `delay: 4`):**
```js
gsap.to(".img-holder img", {
  left: 0,          // from CSS left:-110%  → left:0 (fills the holder)
  stagger: 0.1,     // image 1 → 10, 0.1s apart
  ease: "power4.out",
  duration: 1.5,
  delay: 4,
});
```
Each image slides from off-left into the frame, one every `0.1s`; because they stack in the same absolutely-positioned holder, the later images cover the earlier ones — a rapid left-to-right slideshow wipe. Span of this tween: `~4.0s → ~6.4s`.

**A2 — images wipe OUT (starts at `delay: 7`):**
```js
gsap.to(".img-holder img", {
  left: "110%",     // from left:0 → off to the right
  stagger: -0.1,    // NEGATIVE stagger: last image first, back to first
  ease: "power4.out",
  duration: 1.5,
  delay: 7,
});
```
The whole stack slides out to the right; the **negative** stagger reverses the order (image 10 leaves first). Span: `~7.0s → ~9.4s`.

### Clock B — randomized counter → chained reveal tweens
A `startLoader()` function runs **immediately** (called at module top level, before the `DOMContentLoaded` handler fires). It counts up in random jumps, then, once it reaches exactly 100, fires the reveal.

**B0 — the counting loop** (`updateCounter`, self-scheduling via `setTimeout`):
```js
let currentValue = 0;
function updateCounter() {
  if (currentValue === 100) { animateText(); return; }
  currentValue += Math.floor(Math.random() * 10) + 1;   // jump by 1..10
  currentValue = Math.min(currentValue, 100);
  // re-render digits as spans + a "%" span, e.g. <span>7</span><span>3</span><span>%</span>
  document.querySelector(".counter p").innerHTML =
    currentValue.toString().split("").map((c) => `<span>${c}</span>`).join("") + "<span>%</span>";
  setTimeout(updateCounter, Math.floor(Math.random() * 200) + 100); // 100..300ms between ticks
}
updateCounter();
```
The big black number climbs from `0%` to `100%` in irregular jumps, each digit re-wrapped in its own span every frame. With avg jump ~5.5 and avg delay ~200ms it lands on 100 at **roughly 3–3.5s** — so it finishes right as the image stack (Clock A) is mid-wipe. (The two clocks are independent; the counter's landing time is random and is tuned only by these ranges.)

**B1 — the reveal** (`animateText`, called when the count hits 100). It waits `setTimeout(..., 300)` and then fires **seven** independent `gsap.to` tweens. Treat `t = 0` as the moment these tweens are created (≈ count-finish + 0.3s). All use `ease:"power3.inOut"`.

```js
// 1) counter digits slide UP out of the mask
gsap.to(".counter p span", { top: "-400px", stagger: 0.1, ease: "power3.inOut", duration: 1 });          // t=0

// 2) wordmark chars slide UP INTO the mask (top:200px → 0)
gsap.to(".logo p span",     { top: "0",      stagger: 0.1, ease: "power3.inOut", duration: 1 });          // t=0

// 3) wordmark chars slide UP out of the mask (0 → -400px)
gsap.to(".logo p span",     { top: "-400px", stagger: 0.1, ease: "power3.inOut", duration: 1, delay: 3 });// t=3

// 4) the bone overlay fades away (opacity 1 → 0; NOT removed from DOM)
gsap.to(".overlay",         { opacity: 0,                  ease: "power3.inOut", duration: 1, delay: 4 }); // t=4

// 5) hero image de-zooms scale 2 → 1
gsap.to(".hero img",        { scale: 1,                    ease: "power3.inOut", duration: 2, delay: 3.5 });// t=3.5

// 6) giant hero name rises char-by-char (top:30vw → 0)
gsap.to(".hero-copy h1 span",{ top: "0",     stagger: 0.1, ease: "power3.inOut", duration: 2, delay: 4 }); // t=4

// 7) nav bar drops down (top:-200px → 0)
gsap.to("nav",              { top: "0",                    ease: "power3.inOut", duration: 2, delay: 4 }); // t=4
```

Sequence within Clock B, in words:
1. **t=0–1:** as the counter reaches 100, its digits slide straight up and out of the `.text` mask while, in the same slot, the "kudos" wordmark rises up into view (a swap: number out, name in).
2. **t=3–4:** the wordmark slides up and out of the mask (clears the slot).
3. **t=3.5–5.5:** the hero background image de-zooms from `2x` to `1x`.
4. **t=4–5:** the bone overlay fades to transparent, revealing the hero underneath.
5. **t=4–6:** the giant bone hero name rises character-by-character out of its clip mask (`top:30vw → 0`, staggered 0.1).
6. **t=4–6:** the top nav bar slides down from above into place.

### Timeline summary (approximate absolute seconds, counter landing ≈ 3.3s)
| t (s) | what |
|------|------|
| 0–3.3 | counter jumps `0%→100%` (random), black digits re-rendered each tick |
| ~4.0–6.4 | image stack wipes IN, left→right (`left:-110%→0`, stagger 0.1, power4.out, 1.5s) |
| ~3.6 | count done → 300ms pause → reveal tweens created |
| ~3.6–4.6 | digits slide up out (`-400px`) + wordmark rises in (`200px→0`) |
| ~6.6–7.6 | wordmark slides up out (`0→-400px`) |
| ~7.1–9.1 | hero image de-zooms `2→1` |
| ~7.6–8.6 | overlay fades `opacity 1→0` |
| ~7.6–9.6 | hero name rises char-by-char (`30vw→0`, stagger 0.1) + nav drops (`-200px→0`) |
| ~7.0–9.4 | image stack wipes OUT to the right (`0→110%`, negative stagger) |

Total runtime ≈ **8 seconds** (preview waits ~8.5s). Because the counter is randomized, exact overlaps drift a little each load — that variability is intentional. The **fully-revealed final state** (overlay gone, hero de-zoomed, giant hero name up, nav dropped in) only settles at the very end of the sequence (~9.6s); a faithful side-by-side should be captured near the end so both renders show the same phase rather than one mid-reveal.

### Ease / value reference
- Image stack in/out: `ease:"power4.out"`, `duration:1.5`, `stagger:0.1` (in) / `-0.1` (out).
- Every reveal tween (digits, wordmark, overlay, hero image, hero name, nav): `ease:"power3.inOut"`.
- Reveal durations: counter/wordmark = `1`, hero image / hero name / nav = `2`, overlay = `1`.
- Reveal staggers (all char groups): `0.1`.
- The masks are **CSS `clip-path` rectangles** on `.img-holder`, `.text`, and `.hero-copy` — nothing masks via `overflow`; the animated `left` / `top` offsets slide content past those clip edges.

## Assets / images
- **1 hero image** (`hero.jpg`): a full-bleed **landscape (~16:9 / ~1.9:1)** photograph used as the whole-viewport hero background (`object-fit:cover`, initially `scale(2)`, de-zooming to `1`). A low-key editorial fashion portrait — a model in a white shirt against a dark charcoal wall. It has to be **dark**, because the giant hero name is bone-coloured and sits directly on it.
- **10 preloader images** (`loader.jpg`, repeated 10×): a **portrait (~2:3, ~0.69:1)** photograph filling the `.img-holder` (`object-fit:cover`). An editorial fashion portrait in raking light, matching the hero. The ten can be the same image (identical, as in the original) or a small matched set; because they overlap and wipe fast, a single repeated portrait reads as a clean recurring wipe.

No client brands anywhere — use "kudos" as the neutral wordmark.

## Behavior notes
- **Autoplays once** on load; no scroll, hover, or click triggers. The page does not scroll during the intro. `startLoader()` runs at module top level; the `splitTextIntoSpans` calls and the image-stack tweens run in the `DOMContentLoaded` handler (which fires after the module executes, so the wordmark spans exist before `animateText` needs them).
- The `.overlay` stays in the DOM at `opacity:0` after the reveal (it is faded, not removed). Give the hero content its natural stacking so the transparent overlay does not block interaction if you extend the page.
- No reduced-motion or responsive re-timing in the original — a `prefers-reduced-motion` guard that skips straight to the final state (overlay hidden, hero `scale:1`, name/nav in place) is a reasonable add.
- **Responsive** (`@media max-width: 900px`): `.overlay-content` widens to `75%`; `.counter, .logo p` drop to `100px`, and to `clamp(48px, 18vw, 90px)` on phones, where the centre nav links hide. The animation values are otherwise unchanged.

## Images

This component ships with 2 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/landing-page-reveal/hero.jpg
https://motionprompts.dev/c/landing-page-reveal/loader.jpg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--color-bone`, `--color-ink`, `--color-accent`, `--color-gray`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Full-screen overlay** — a fixed element covers the viewport (a loader or transition). Only one may exist per page and it must remove itself when done. If your page already has one, keep that and drop this; otherwise the second silently hides the first.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Here that means two `startLoader()` calls, each with its own private `currentValue` closure, both self-rescheduling through `setTimeout` and both racing to overwrite the same `.counter p`'s `innerHTML` on independent random schedules — the big black number visibly stutters between two unrelated climbs instead of counting once up to `100%`. Whichever climb lands on `100` first fires its own `animateText`, running all seven reveal tweens — digits out, wordmark in and back out, overlay fade, hero de-zoom, hero name up, nav down — while the other climb is still ticking; when that second climb finishes, it fires the same seven tweens again, a second time, on top of a hero and nav the first pass already settled. None of this reproduces in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — This component starts from two separate triggers, and each is broken in React for a different reason. Both `splitTextIntoSpans` calls and the two `.img-holder img` wipe tweens are wrapped in a `DOMContentLoaded` listener with no `readyState` guard — by the time a React effect runs, that event has already fired, so this half is dead code the instant it's ported. `startLoader()` isn't inside that listener at all: it's a bare statement at the bottom of the module, evaluated at import time, before the `.counter p` node `updateCounter` immediately writes into even exists. Delete the listener and the standalone call, and fold both bodies into one `useEffect` with an empty dependency array, in the same order the file already implies — split first, then start the counter. The original only gets away with the reverse-looking file order (the counter-starting call sits below the function that needs the split to have already run) because a module script finishes evaluating — and therefore calls `startLoader()` — before the browser's own `DOMContentLoaded` fires; once both are ordinary statements inside one synchronous effect body, that accident of module timing does no work anymore, but keeping the split first still matches what actually executes first once you merge them.

*(2) Element lookups* — `.logo p`, `.hero-copy h1`, `.img-holder img`, `.counter p`, `.overlay`, `.hero img`, `nav`, `.counter p span`, `.logo p span`, and `.hero-copy h1 span` are ten separate global lookups, each trusting this markup is the page's only copy. Give the component a root ref and scope every one of them to it — either directly (`rootRef.current.querySelector(...)`) or implicitly, by creating the GSAP calls inside a `gsap.context` scoped to that ref, which resolves its own selector strings against the scope automatically. This matters most for `.counter p`: during the StrictMode remount two copies of the markup exist for an instant, and an unscoped lookup can bind the entire counting loop's `innerHTML` writes to the copy that's on its way out.

*(3) Cleanup* — This component splits cleanly into a part `gsap.context` sees for free and a part it does not, and the two need different treatment. The image-stack tweens on `.img-holder img` are created synchronously, in the same tick the effect runs, so a plain `gsap.context((self) => { /* the split calls, then both .img-holder img tweens */ }, rootRef)` auto-tracks them — `ctx.revert()` kills them and clears their inline `left` values whether they've already played out or are still sitting on their own multi-second delay. The seven reveal tweens inside `animateText` get none of that for free: `animateText` only runs once `updateCounter`'s self-rescheduling `setTimeout` chain reaches `100` and then waits out a further pause of its own, so by the time any of those seven `gsap.to` calls executes, the context's synchronous factory pass finished seconds earlier. Attribute them explicitly by registering a named function inside the factory pass — `self.add("revealText", () => { /* the seven reveal tweens */ })` — and invoking it later as `ctx.revealText()` from inside that callback: the registration itself runs during the factory's own synchronous pass, where only the `self` parameter is safe to reference, but the function body runs only once called, and any animations it creates still funnel into the context for `ctx.revert()` to catch.

The counter's timer chain needs its own guard regardless, for the same reason a `gsap.ticker.add` subscription would: neither a raw `setTimeout` nor a ticker callback is a tween or a trigger, so nothing about `gsap.context` knows either one exists. Keep the latest timeout id in a variable the cleanup can reach, and a `cancelled` flag checked at the top of every tick and again before the pending reveal fires:

```jsx
useEffect(() => {
  let cancelled = false;
  let tickId;

  const ctx = gsap.context((self) => {
    // splitTextIntoSpans(".logo p") and (".hero-copy h1"), scoped to rootRef.current,
    // then the two .img-holder img tweens (wipe in, wipe out), unchanged
    self.add("revealText", () => {
      // the seven reveal tweens: counter digits out, wordmark in, wordmark out,
      // overlay fade, hero de-zoom, hero name up, nav down
    });
  }, rootRef);

  let currentValue = 0;
  function updateCounter() {
    if (cancelled) return;
    if (currentValue === 100) {
      tickId = setTimeout(() => {
        if (cancelled) return;
        ctx.revealText();
      }, 300);
      return;
    }
    // increment currentValue, re-render ".counter p" as spans, exactly as above
    tickId = setTimeout(updateCounter, /* the same randomized gap the original uses */);
  }
  updateCounter();

  return () => {
    cancelled = true;
    clearTimeout(tickId);
    ctx.revert();
  };
}, []);
```

Skip the flag and StrictMode's mount-unmount-mount leaves the first mount's climb running on its own schedule — `currentValue` lives in a closure private to that one call of `updateCounter`, so the two mounts never even share a counter — until it eventually reaches `100` and fires its own `animateText` against a `.overlay`, `.hero img`, and `nav` the second mount is independently animating too.

One thing the cleanup does *not* need: reverting `splitTextIntoSpans` itself. It rebuilds `innerHTML` from the element's current `innerText` every time it runs, and `innerText` collapses the existing per-character spans back to the same plain string — so a second pass, even one triggered by a StrictMode remount, produces the same flat one-span-per-character markup rather than nesting a fresh split inside the last one. There's no `.revert()` to call and no flag to guard it with.
