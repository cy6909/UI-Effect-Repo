# Pinned Horizontal Scroll Gallery with Image Parallax & Masked Title Reveals

## Goal

Build a full-page scroll experience where a pinned section converts vertical scrolling into a horizontal 5-slide image strip: as the user scrolls down, the strip slides left, each full-bleed image gets an opposing parallax drift, and each slide's big uppercase title slides up into view (through a clipping mask) exactly when its slide becomes visible. After the strip finishes, the page releases into a dark outro section.

## Tech

Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, and `lenis` (npm) for smooth scrolling. No other libraries.

## Layout / HTML

```
<body>
  <div class="brandmark">Studio Nord</div>          <!-- fixed, sits above the slides the whole way -->
  <section class="sticky">
    <div class="slider">
      <div class="slides">
        <div class="slide">
          <div class="img"><img src="..." alt="Vaulted pavilion against a clear sky" /></div>
          <div class="title">
            <h1><span class="proj">Tide<br />Hall</span><span class="meta">Concrete · Bergen, 2024</span></h1>
          </div>
        </div>
        ... (5 slides total, same structure)
      </div>
    </div>
  </section>
  <section class="outro">
    <div class="outro-inner">
      <p class="kicker">Studio Nord · Architecture</p>
      <h1>Built in concrete,<br />glass and <span class="grad">light</span></h1>
      <p class="colophon">Selected works · Est. 2016</p>
    </div>
  </section>
  <script type="module" src="./script.js"></script>
</body>
```

The 5 slide titles. Each `<h1>` holds **two spans**: `.proj` (the project name, split over two lines with `<br />`) and `.meta` (a one-line credit). Both ride the same reveal, because the tween animates the `h1`:

| # | `.proj` | `.meta` |
|---|---------|---------|
| 1 | `Tide<br />Hall` | `Concrete · Bergen, 2024` |
| 2 | `Fjord<br />House` | `Interior · Oslo, 2023` |
| 3 | `Concrete<br />Stair` | `Board-formed · Malmo, 2023` |
| 4 | `Round<br />Room` | `Renovation · Aarhus, 2022` |
| 5 | `Light<br />Study` | `Daylight · Skagen, 2022` |

The copy is neutral demo text for a fictional practice ("Studio Nord"); swap it for your own.

## Styling

- Global reset: `* { margin: 0; padding: 0; box-sizing: border-box; }`.
- Palette — one cold ground, one orange used as **surface, never as small text**:
  ```css
  :root {
    --navy: #1c2a4a;        /* dominant ink-blue ground */
    --paper: #f5f2ec;       /* cool bone text */
    --accent: #f26430;      /* orange: the 3px rules and the gradient, not type */
    --accent-soft: #ffb38a; /* light end of the orange — this one IS AA on navy */
    --powder: #a9c1d9;      /* powder-blue support, muted meta text */
  }
  ```
- Fonts: **Space Grotesk** for the display type (`.proj`, the outro `h1`), **Inter** for body, **Space Mono** for the brandmark, the `.meta` credits and the kicker.
- `html, body`: `width: 100%; height: 700vh;` (the tall body provides the scroll runway), `background-color: var(--navy)`, `font-family: "Inter"`.
- Every `section`: `position: relative; width: 100vw; height: 100vh; padding: 1.5em; overflow: hidden;`.
- `section.sticky`: `background-color: var(--navy)` — visible as a frame around the slider because of the section padding.
- `.brandmark`: `position: fixed; top: 1.9em; right: 1.9em; z-index: 10;` a Space Mono chip on `rgba(28,42,74,.55)` with a hairline border and `backdrop-filter: blur(14px)`. It never animates; it is what keeps the pin from feeling like a bare slideshow.
- `section.outro`: `background-color: var(--navy)`, flex, centered. Inside `.outro-inner` (max 900px): `.kicker` in `--accent-soft` above a 44px orange gradient rule drawn with `::before`; `h1` in Space Grotesk `clamp(40px, 6.2vw, 84px)` where the `<span class="grad">` word is painted with `linear-gradient(100deg, var(--accent), var(--accent-soft))` through `background-clip: text`; `.colophon` in `--powder`.
- **The photographs are graded in CSS**, which is what makes five unrelated interiors read as one commission: `img` carries `filter: grayscale(1) contrast(1.08) brightness(0.98)`, and `.img::after` lays `linear-gradient(160deg, var(--navy), var(--powder))` over it in `mix-blend-mode: color` — a navy duotone. Above that, `.slide::before` drops a 155° scrim from `rgba(15,24,46,.72)` to transparent across the top-left so the title holds contrast over bright and dark slides alike.
- `.slider`: `position: relative; width: 100%; height: 100%; overflow: hidden;` (this is the viewport/mask for the strip).
- `.slides`: `position: relative; width: 500%; height: 100%; display: flex; will-change: transform; transform: translateX(0);` — the horizontally-moving track, 5× the slider width.
- `.slide`: `position: relative; flex: 1; height: 100%;` (each slide is exactly one slider-width wide).
- `.img`: `position: absolute; width: 100%; height: 100%; overflow: hidden;` (crops the parallaxing image).
- `img`: `position: relative; width: 100%; height: 100%; object-fit: cover; will-change: transform, scale; transform: translateX(0) scale(1.35);` — the 1.35 upscale gives the image extra bleed so it can shift horizontally without showing edges.
- `.title`: `position: relative; width: max-content; margin: 1.1em 1.2em; z-index: 2;` and crucially `clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);` — a full-rectangle clip that masks the `h1` when it is translated above the box (this is what makes the title "rise from nothing").
- `.title h1`: `display: block; will-change: transform;` — the sizing lives on its two spans. `.proj`: `display:block; color: var(--paper); font-family:"Space Grotesk"; text-transform:uppercase; font-size:84px; font-weight:700; letter-spacing:-0.03em; line-height:0.9`. `.meta`: `display:block; margin-top:1.1rem; color: var(--accent-soft);` Space Mono 11px uppercase, preceded by a 42px × 3px solid `--accent` bar drawn with `::before`.
- **Mobile (`max-width: 768px`)**: `.proj` drops to `clamp(28px, 10.5vw, 44px)` with `overflow-wrap: break-word`, and `.title` is capped at `max-width: calc(100% - 1.8em)` — measured against the slide panel, not the viewport, so a settled title never bleeds past the right edge of its slide.
- Include the standard Lenis helper CSS (`.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }`, `.lenis.lenis-stopped { overflow: clip; }`, `.lenis.lenis-smooth iframe { pointer-events: none; }`).

## GSAP effect (be exact)

Wrap everything in `DOMContentLoaded`. Register `ScrollTrigger`.

### 1. Lenis smooth scroll wired into GSAP's ticker

```
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 2. Measurements (computed once on load)

- `stickyHeight = window.innerHeight * 6` — the pin distance (6× viewport height).
- `slideWidth = slider.offsetWidth` — width of one slide (= visible slider width).
- `totalMove = slidesContainer.offsetWidth - slider.offsetWidth` — total horizontal travel of the track (i.e. 4 × slideWidth, since the track is 500% wide).

### 3. Initial title state

For every slide, `gsap.set(titleH1, { y: -200 })`. Combined with the `.title` container's 200px height and rectangular `clip-path`, every headline starts fully hidden above its mask.

### 4. Title reveal via IntersectionObserver (NOT ScrollTrigger)

Create one `IntersectionObserver` with `{ root: slider, threshold: [0, 0.25] }`, observing all 5 `.slide` elements. Track a `currentVisibleIndex` variable (initially `null`). In the callback, for each entry compute `currentIndex` (the slide's index in the NodeList):

- If `entry.intersectionRatio >= 0.25`: set `currentVisibleIndex = currentIndex`, then loop over ALL titles and tween each with `gsap.to(title, { y: index === currentIndex ? 0 : -200, duration: 0.5, ease: "power2.out", overwrite: true })`. So the active slide's title slides down/up into view (y: -200 → 0) while every other title retracts back up (y → -200).
- Else if `entry.intersectionRatio < 0.25` **and** `currentVisibleIndex === currentIndex` (the active slide is leaving): set `prevIndex = currentIndex - 1`, `currentVisibleIndex = prevIndex >= 0 ? prevIndex : null`, and tween all titles with `y: index === prevIndex ? 0 : -200`, same `duration: 0.5`, `ease: "power2.out"`, `overwrite: true`. This handles scrolling back up: the previous slide's title returns.

Only one title is ever visible at a time; the 0.25 visibility threshold is what flips them.

### 5. The pinned horizontal scroll (single ScrollTrigger, no timeline)

```
ScrollTrigger.create({
  trigger: stickySection,   // section.sticky
  start: "top top",
  end: `+=${stickyHeight}px`,  // +=6 viewport heights
  scrub: 1,                    // 1s catch-up smoothing
  pin: true,
  pinSpacing: true,
  onUpdate: (self) => { ... }
});
```

Inside `onUpdate` (all writes use `gsap.set`, i.e. immediate, no tweens — the scrub + Lenis provide the smoothing):

1. `mainMove = self.progress * totalMove`; move the track: `gsap.set(slidesContainer, { x: -mainMove })`. Progress 0 → 1 maps to translateX 0 → −(4 × slideWidth), so the strip slides fully left through all 5 slides.
2. Compute `currentSlide = Math.floor(mainMove / slideWidth)` and `slideProgress = (mainMove % slideWidth) / slideWidth` (0→1 within the current slide transition).
3. **Image parallax** — for each slide's `<img>`:
   - If the slide is `currentSlide` or `currentSlide + 1`:
     `relativeProgress = (index === currentSlide) ? slideProgress : slideProgress - 1`, then
     `parallaxAmount = relativeProgress * slideWidth * 0.25`, and
     `gsap.set(image, { x: parallaxAmount, scale: 1.35 })`.
     Effect: the outgoing (`currentSlide`) image drifts right 0 → +25% of a slide width as it exits left, and the incoming (`currentSlide + 1`) image starts at −25% and settles to 0 — a classic opposing-parallax handoff (images move at 25% of the track speed, in the opposite visual direction).
   - The handoff is seamless: when `slideProgress` reaches 1, `currentSlide` increments and the just-arrived image is already at `x: 0`, so there is no jump. Over its full two-slide lifetime (entering as "next", exiting as "current") each image travels a total of `0.5 × slideWidth` against the scroll.
   - Any other slide: `gsap.set(image, { x: 0, scale: 1.35 })`.
   - `scale: 1.35` is always maintained so the shifted image never reveals its edges.

No SplitText, CustomEase, or Three.js. The only tweened animation is the title reveal (power2.out, 0.5s); everything scroll-driven is direct `gsap.set` inside `onUpdate`.

## Assets / images

5 full-bleed architecture photographs, landscape orientation (roughly 16:9, large enough to cover a full viewport at 1.35× scale), one per slide, matching the titles:

1. A vaulted pavilion against a clear sky.
2. A plastered living room with a lounge chair and cove lighting.
3. A cast concrete floating staircase beside a board-formed wall.
4. A curved room with a round mirror and a framed drawing.
5. A minimal interior washed in daylight.

Their own colour hardly matters: the CSS greyscales each one and washes a navy duotone over it, so any well-composed architectural frame lands in the same palette. Pick for structure and light. No logos or brand marks in the images.

## Behavior notes

- The whole strip is scroll-scrubbed and fully reversible: scrolling back up plays everything backwards (including the title swaps, handled by the observer's "leaving" branch).
- Measurements are taken once on load (no resize handler needed for the demo).
- The pin lasts 6 viewport heights of scrolling, then the page unpins and the dark outro section scrolls into view normally.
- Desktop-first showcase; no reduced-motion variant required.

## Images

This component ships with 5 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/radga-horizontal-scroll-animation/img1.jpeg
https://motionprompts.dev/c/radga-horizontal-scroll-animation/img2.jpeg
https://motionprompts.dev/c/radga-horizontal-scroll-animation/img3.jpeg
https://motionprompts.dev/c/radga-horizontal-scroll-animation/img4.jpeg
https://motionprompts.dev/c/radga-horizontal-scroll-animation/img5.jpeg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--navy`, `--paper`, `--accent`, `--accent-soft`, `--powder`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.

## Adapting this to React

Everything above describes a standalone document: one script that runs once, reaches into the page with `document.querySelector`, and never has to undo itself. React withdraws all three of those guarantees at once, and it does it quietly — the component renders, looks right for a moment, and then misbehaves in a way that does not point back at any of this.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves you two of everything: two pinned `ScrollTrigger`s disagreeing about the same track position, two `Lenis` instances pulling on the same wheel event, two `IntersectionObserver`s toggling the same five titles. The visible symptom is a doubled or stuttering scrub, and it will not reproduce in a production build, because React only does the double mount in development. Treat the cleanup as part of the effect, not as an afterthought.

*(1) The entry point* — The script waits for `DOMContentLoaded`. By the time a React component mounts, that event has already fired, so the listener is never invoked and Lenis, the observer and the pin never initialize — no error, no animation, nothing to debug. Delete the listener and move its body directly into a `useEffect` with an empty dependency array.

*(2) Element lookups* — `.sticky`, `.slider`, `.slides`, the five `.slide` nodes, their `.title h1` headlines and their `img`s are all found with `document.querySelector`/`querySelectorAll`, which assumes this component owns the document. Give the outer `<section className="sticky">` a root `ref` and scope every lookup to it (`rootRef.current.querySelectorAll(".slide")`, not `document.querySelectorAll(".slide")`). This matters more here than in most components: `slideWidth` and `totalMove` are read once, synchronously, off `offsetWidth`, and during the StrictMode remount two copies of `.slider`/`.slides` exist for an instant — an unscoped selector can measure the copy that is on its way out and hand the pin a stale width for the rest of its life.

*(3) Cleanup* — Wrap the `ScrollTrigger` pin and the initial `gsap.set(titles, { y: -200 })` in a `gsap.context` scoped to the root ref, and revert that context in the cleanup:

```jsx
useEffect(() => {
  const lenis = new Lenis();
  const syncScrollTrigger = () => ScrollTrigger.update();
  lenis.on("scroll", syncScrollTrigger);

  const driveLenis = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(driveLenis);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context((self) => {
    const slider = rootRef.current.querySelector(".slider");
    const slidesContainer = rootRef.current.querySelector(".slides");
    const slides = rootRef.current.querySelectorAll(".slide");
    const titles = Array.from(slides).map((slide) => slide.querySelector(".title h1"));

    gsap.set(titles, { y: -200 });

    // Named registration: the observer below calls this well after this
    // factory has returned, so this is what keeps its tweens inside the
    // context instead of leaking past revert.
    self.add("revealTitle", (activeIndex) => {
      titles.forEach((title, index) => {
        gsap.to(title, { y: index === activeIndex ? 0 : -200, overwrite: true });
      });
    });

    // IntersectionObserver + ScrollTrigger.create exactly as described above,
    // except the two `titles.forEach(...)` blocks become one call each:
    // self.revealTitle(currentIndex) and self.revealTitle(prevIndex).
  }, rootRef);

  return () => {
    ctx.revert();
    gsap.ticker.remove(driveLenis);
    lenis.destroy();
  };
}, []);
```

`self`, not `ctx`, is the argument the factory receives — `ctx` is still in its temporal dead zone at that point in the code above, and writing `ctx.add(...)` there throws `Cannot access 'ctx' before initialization` and takes the tree down with it. Register `ScrollTrigger` (`gsap.registerPlugin(ScrollTrigger)`) once at module scope, not inside the effect.

Two things in this component don't look like GSAP objects, and `ctx.revert()` genuinely does not reach either of them:

- **The `IntersectionObserver`.** It isn't a tween or a trigger, so reverting the context never disconnects it. Keep the instance and call `observer.disconnect()` in the same cleanup — otherwise the StrictMode remount leaves the old observer still watching the five `.slide` nodes that a freshly-mounted copy of this component also owns, and both copies' callbacks fire on the same scroll.
- **The title tweens themselves.** They're created from inside the observer's callback, which fires asynchronously — after the `gsap.context` factory above has already returned. A bare `gsap.to()` called from there is not part of the synchronous pass `ctx.revert()` protects, so on unmount it would keep animating five title nodes that are no longer on the page. Routing it through `self.add("revealTitle", …)` is what pulls it back under the context's protection: a name-registered method still runs *inside* the context no matter how much later it's invoked, so `ctx.revert()` also kills whichever of the two titles is mid-reveal the instant the component unmounts.

The Lenis instance has the same blind spot as the observer, for a related reason: this component doesn't run its own `requestAnimationFrame` loop, it feeds `lenis.raf` off `gsap.ticker.add`, and `gsap.context` has no visibility into ticker subscriptions either. Keep the function reference passed to `gsap.ticker.add` (`driveLenis` above) and remove that exact reference with `gsap.ticker.remove(driveLenis)` before calling `lenis.destroy()` — otherwise the ticker keeps calling `.raf()` on an already-destroyed instance, once per animation frame, for as long as the tab stays open. If this slider ends up nested inside a larger app that already runs its own Lenis instance (see the one-instance-per-page note above), don't call `lenis.destroy()` here at all — only unsubscribe the `syncScrollTrigger` listener this effect itself attached, and leave the shared instance running for whoever else depends on it.
