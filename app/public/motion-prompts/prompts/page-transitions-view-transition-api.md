# Page Transitions with the View Transition API (fetch-and-swap portfolio, clip-path wipe)

## Goal
Build a **real multi-page portfolio** (three actual `.html` files) where clicking a nav link is intercepted by the native **Navigation API**, which fetches the destination HTML and swaps the document `<body>` inside `document.startViewTransition()`. The star effect is the crossfade wipe driven entirely by CSS `::view-transition-old/new(root)` pseudo-elements: **the outgoing page fades to 40% opacity and slides up 35% while the incoming page wipes in from the bottom via an animated `clip-path`**, both over **1.5s** with a `cubic-bezier(0.87, 0, 0.13, 1)` ease. On mount, every destination runs its own GSAP intro — nav links rise into view, the home headline reveals character-by-character, the about paragraph reveals line-by-line — with Lenis smooth scrolling re-initialized per page.

## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm), `split-type` (npm, the standalone SplitType library — **not** GSAP's SplitText plugin), and `lenis` (npm) for smooth scroll. **No GSAP plugins, no ScrollTrigger.** The page transition itself uses the **browser-native View Transition API** (`document.startViewTransition`) and **Navigation API** (`navigation.addEventListener("navigate", …)`), not a library. Imports:
```js
import Lenis from "lenis";
import gsap from "gsap";
import SplitType from "split-type";
```
Three sibling pages — `index.html`, `work.html`, `about.html` — each links `./styles.css` and loads the **same** `<script type="module" src="./script.js">`.

## Layout / HTML
All three pages share the same `<nav>` and the same script. Only the content block below the nav differs.

**Shared nav (identical on every page):**
```
nav
  .logo
    .link > a[href="./index.html"]   "Index"
  .links
    .link > a[href="./work.html"]    "Work"
    .link > a[href="./about.html"]   "About"
```

**index.html** — home, a single giant centered headline:
```
nav … (as above)
.container
  .hero
    h1   "Kaelon"        ← fictional studio name, uppercase display
```

**work.html** — four editorial images stacked vertically:
```
nav …
.container
  .images
    img   (work portrait 1)
    img   (work portrait 2)
    img   (work portrait 3)
    img   (work portrait 4)
```

**about.html** — a two-column split, portrait left + a large paragraph right:
```
nav …
.container
  .info
    .col                     ← left column: full-height portrait
      img   (about portrait)
    .col                     ← right column (nth-child(2)): the paragraph
      p   "<one long editorial studio statement, ~40–60 words>"
```
The `<p>` is plain prose (the JS splits it into lines itself). Use neutral, fictional copy for a design/photography studio named "Kaelon" — e.g. an "about the studio" statement about craft, imagery and motion. No real brands anywhere.

## Styling
Global reset: `* { margin:0; padding:0; box-sizing:border-box }`. `html, body { width:100%; height:100%; background-color:#000 }`. Global `img { width:100%; height:100%; object-fit:cover }`.

**Font:** `font-family: "Neue Haas Grotesk Display Pro"` on `html, body` — a tight neo-grotesque display face. There is **no** `@font-face`/`@import` in the source, so add a `sans-serif` fallback; a close free substitute is Helvetica Neue / Inter.

**Palette:**
- `#000` — body background (only glimpsed for a beat during the swap)
- `#f1efe7` — warm off-white cream: the page background (`.container`, `.images`)
- `#242726` — warm near-black: all text (`nav a`, `.hero h1`, `.col p`)

**Key structural CSS (load-bearing):**
- `.container { width:100vw; height:100%; min-height:100vh; background-color:#f1efe7 }` — wrap every page's content so the cream background is consistent and pages can scroll taller than the viewport (Work does).
- `nav { position:fixed; top:0; left:0; width:100vw; padding:1.5em; display:flex; justify-content:space-between; align-items:center }`. `.links { display:flex; gap:1em }`.
- **Nav link mask:** `.link { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) }` (a full rectangle that clips its overflowing child). `nav a { display:inline-block; position:relative; transform:translateY(16px); will-change:transform; text-decoration:none; color:#242726; font-size:14px; font-weight:600 }` — links start pushed **16px down** and hidden by the parent's clip; GSAP lifts them to `y:0`.
- **Hero headline:** `.hero h1 { width:100%; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); text-transform:uppercase; color:#242726; font-size:20vw; font-weight:bolder; display:flex; justify-content:center; letter-spacing:-0.5rem; line-height:1; clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) }`. `.hero h1 .char { position:relative; will-change:transform }` — the clip-path masks the chars that SplitType pushes below.
- **Work images:** `.images { width:100%; background-color:#f1efe7; margin:0 auto; display:flex; flex-direction:column; gap:1em; padding:15em 0 }`. `.images img { width:35%; margin:0 auto }` — four portraits centered, each 35% of viewport width, tall stack (so the page scrolls).
- **About split:** `.info { width:100%; height:100%; display:flex }`. `.col { flex:1 }`. `.col:nth-child(2) { display:flex; flex-direction:column; justify-content:center; align-items:center; padding:2em }`. `.col p { font-weight:600; font-size:2rem; color:#242726; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale }`. Line mask (created by JS): `.col p .line { clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%) }`; `.col p .line span { position:relative; will-change:transform }`.

**View Transition pseudo-element CSS (this is the transition — keep verbatim):**
```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;            /* baseline, overridden by the shorthand below */
}
@keyframes move-out {
  from { opacity: 1;   transform: translateY(0);    }
  to   { opacity: 0.4; transform: translateY(-35%); }
}
@keyframes move-in {
  from { clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%); }  /* zero-height sliver at the bottom */
  to   { clip-path: polygon(0% 100%, 100% 100%, 100% 0%,   0% 0%);   }  /* full rectangle */
}
::view-transition-old(root) { animation: 1.5s cubic-bezier(0.87, 0, 0.13, 1) both move-out; }
::view-transition-new(root) { animation: 1.5s cubic-bezier(0.87, 0, 0.13, 1) both move-in;  }
```
The old page **fades 1→0.4 and slides up 35%**; the new page's `clip-path` grows from a flat bottom line up to a full rectangle — a **bottom-up reveal**. Both run **1.5s** with the same sharp ease-in-out bezier (the earlier `0.5s` is superseded by the `animation` shorthand).

## GSAP effect (exhaustive)

Everything is orchestrated by two functions — `initializeLenis()` and `initializeAnimations()` — called on first `DOMContentLoaded` and again after every intercepted navigation.

### Lenis (`initializeLenis`)
- If a `lenis` instance already exists, `lenis.destroy()` first (avoids stacking instances across page swaps).
- `lenis = new Lenis({ autoRaf: true, smoothWheel: true })`.
- Also register a manual rAF loop: `function raf(time){ lenis.raf(time); requestAnimationFrame(raf) } requestAnimationFrame(raf)`. (`autoRaf:true` already drives it; the manual loop is present in the source too — harmless.)

### Intro animations (`initializeAnimations`) — all fire on mount

**1. Nav links rise (always):**
```js
gsap.to(".link a", {
  y: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power4.out",
  delay: 1,
});
```
Targets all three `<a>` (they start at CSS `translateY(16px)`, masked by `.link`'s clip-path). They lift to `y:0` with a **0.1s stagger** after a **1s delay**.

**2. Home headline — character reveal (only if `.hero h1` exists):**
```js
const heroText = new SplitType(".hero h1", { types: "chars" });
gsap.set(heroText.chars, { y: 400 });
gsap.to(heroText.chars, {
  y: 0,
  duration: 1,
  stagger: 0.075,
  ease: "power4.out",
  delay: 1,
});
```
SplitType splits the `<h1>` into `.char` spans; each is set **400px below**, then slides up to `y:0` with a **0.075s stagger**, **1s delay**, `power4.out`. The `.hero h1` clip-path hides the chars until they arrive.

**3. About paragraph — line reveal (only if `.info p` exists):**
- First, **flatten** any pre-existing `.info p .line` nodes: for each, replace the node with a text node of its `textContent` (resets state on re-mount).
- Then split into lines with SplitType, using a div wrapper and the `line` class:
  ```js
  const text = new SplitType(".info p", { types: "lines", tagName: "div", lineClass: "line" });
  ```
- Wrap each produced line's inner HTML in a `<span>`: `line.innerHTML = "<span>" + content + "</span>"`.
- Set + animate the inner spans:
  ```js
  gsap.set(".info p .line span", { y: 400, display: "block" });
  gsap.to(".info p .line span", {
    y: 0,
    duration: 2,        // note: slower than the others
    stagger: 0.075,
    ease: "power4.out",
    delay: 0.25,
  });
  ```
Each line's span starts **400px down** (masked by `.line`'s clip-path) and slides up over **2s**, **0.075s stagger**, **0.25s delay**, `power4.out`.

### The page transition (Navigation API + View Transition API)
Registered once, guarded by `if (navigation.addEventListener)`:
```js
navigation.addEventListener("navigate", (event) => {
  // ignore cross-origin or non-.html destinations
  if (!event.destination.url.includes(document.location.origin) ||
      !event.destination.url.endsWith(".html")) return;

  event.intercept({
    handler: async () => {
      const response = await fetch(event.destination.url);
      const text = await response.text();

      const transition = document.startViewTransition(() => {
        // swap ONLY the body contents + the title, synchronously
        document.body.innerHTML = text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1];
        document.title       = text.match(/<title[^>]*>(.*?)<\/title>/i)[1];
      });

      transition.ready.then(() => {
        window.scrollTo(0, 0);
        initializeAnimations();   // run the new page's intro
        initializeLenis();        // fresh smooth-scroll instance
      });
    },
    scroll: "manual",             // we handle scroll reset ourselves
  });
});
```
Flow per click: intercept → `fetch` the target page → inside `startViewTransition` regex-extract and inject the new `<body>` innerHTML and `<title>` → when the transition is `ready`, jump scroll to top and re-run the GSAP intro + Lenis for the freshly-swapped DOM. The CSS `::view-transition-*` rules above supply the actual visual crossfade (old fades/slides up, new clip-path wipes up). Because the new page's GSAP intro also carries a 1s delay, its content lifts in just as the wipe settles.

Wire everything on load:
```js
document.addEventListener("DOMContentLoaded", () => {
  initializeLenis();
  initializeAnimations();
});
```

## Assets / images
**5 images total**, all moody editorial fashion/portrait photography on the warm cream palette, described by role:

**Work page — 4 stacked portraits** (portrait orientation, ~2:3, rendered at 35% viewport width, centered):
1. A moody low-key portrait of a woman with a short black bob and a long pearl earring, black turtleneck, against a blue-grey gradient.
2. A high-contrast black-and-white profile of a shaved-head woman almost fully in shadow, a single band of light across her eye.
3. An extreme close-up of a freckled face with red glossy lips wearing a fuzzy beige bucket hat.
4. A full-length editorial shot of a woman in a black turtleneck coat spinning so the fabric motion-blurs against a cream backdrop.

**About page — 1 portrait** (fills the full-height left column, `object-fit:cover`):
5. A teal-lit silhouette profile of a man with curly hair, face rim-lit against a deep teal background.

No logos or real brand marks.

## Behavior notes
- **Browser support:** the transition depends on the **Navigation API** and **View Transition API** (Chromium-based browsers). The `if (navigation.addEventListener)` guard means unsupported browsers simply fall back to normal full-page navigation — links still work, just without the animated swap. This is fine and expected.
- The intro runs on **both** first load and every subsequent in-place swap; `initializeLenis` destroys the prior instance each time so smooth scroll never stacks.
- Only same-origin URLs ending in `.html` are intercepted; anything else navigates normally.
- Works on desktop and mobile; no `prefers-reduced-motion` branch and no min-width gate in the source. No infinite loops — every animation is a one-shot intro per page mount.

## Images

This component ships with 5 reference assets, served publicly.
Use them as-is to reproduce the demo faithfully, then swap in your own — the layout expects the
same aspect ratios.

```
https://motionprompts.dev/c/page-transitions-view-transition-api/img1.jpeg
https://motionprompts.dev/c/page-transitions-view-transition-api/img2.jpeg
https://motionprompts.dev/c/page-transitions-view-transition-api/img3.jpeg
https://motionprompts.dev/c/page-transitions-view-transition-api/img4.jpeg
https://motionprompts.dev/c/page-transitions-view-transition-api/portrait.jpeg
```

They are hotlinkable for prototyping. For anything you ship, replace them: they are licensed for
demonstration of this component, not for redistribution.

## Using this outside its demo page

This component is written as a complete page — that is how the demo is meant to look. If you are dropping it into an existing project, or combining it with other components, these are the things it declares at document level and that you need to move or reconcile first.

- **Palette on `:root`** — `--ink`, `--cream`, `--cobalt`, `--hair`. These names are not namespaced and they collide: `--ink` is defined by 164 of the 219 components in this catalogue, `--paper` by 94, `--muted` by 80, each with different values — and they will also collide with whatever your own project defines. Move them onto the component's wrapper (`.my-section { --ink: … }`) or rename them with a prefix.
- **Rules on `*`, `html, body`** — the demo owns the whole document, so these set the page background, typography and resets. Dropped into an existing project they restyle the entire page, not just this section. Re-target them at the component's wrapper before using it.
- **Smooth scroll (Lenis)** — this creates its own Lenis instance, and a page may only have one. If your project already runs Lenis, drop the setup shown above and reuse the existing instance, keeping the `lenis.on("scroll", ScrollTrigger.update)` wiring once. Two instances fight over the same scroll and stutter visibly, with no error in the console.

## Adapting this to React

Everything above describes a real multi-page site — three separate `.html` documents, a native `navigate` listener, and a script that runs the same two functions once per document load. React collapses those three documents into one bundle and one persistent DOM, and that changes what almost every piece of this script is for: the fetch-and-swap machinery disappears, the "does this page have `.hero h1`" checks turn into "which route owns this JSX," and the intro that used to fire once per real page load now has to be re-armed deliberately on every client-side route change.

Under React 19 with StrictMode, every effect mounts, unmounts, and mounts again before anything reaches the screen. Setup that runs twice with teardown that runs never leaves two of everything — two lift-in tweens on the same nav anchors, two Lenis instances fighting over the same wheel event. The symptom is jitter or a doubled reveal, and it will not reproduce in a production build, because React only double-mounts in development. Treat the cleanup as part of the effect, not an afterthought.

*(1) The entry point.* The script waits for `DOMContentLoaded` with no `readyState` guard. By the time a React component mounts, that event has already fired, so a ported listener would never run — delete it. Its two calls, `initializeLenis()` and `initializeAnimations()`, do not collapse into one shared effect with an empty dependency array, because once this is a single-page app the two no longer share a lifetime: see point (4).

*(2) Element lookups.* Every selector here — `.link a`, `.hero h1`, `.info p`, `.info p .line` — is a `document.querySelector` written against a single document that, at any moment, holds exactly one page's markup; the `if (document.querySelector(".hero h1"))` and `if (document.querySelector(".info p"))` guards exist only so the same script can also run, harmlessly, against the other two documents that lack that markup. Once index/work/about are three route components instead of three files, that ambiguity disappears: `.hero h1` only ever exists inside the home route's JSX, `.info p` only inside the about route's. Drop the existence checks and put each tween directly in the effect of the component that renders the element it targets, scoped to that component's own root ref. `.link a` is the one lookup that stays shared, because it belongs to the nav rather than to any single route.

*(3) The transition mechanic itself does not port.* `event.intercept`'s handler fetches the destination file's raw text and writes `text.match(/<body[^>]*>([\s\S]*)<\/body>/i)[1]` straight into `document.body.innerHTML`, inside `document.startViewTransition`. That only works because nothing else owns `document.body`. The instant a React root is mounted into it, this line rips out every node React is tracking without telling React, and the next commit reconciles against a tree that no longer matches its fiber tree — it throws on the first `insertBefore` or `removeChild` it tries to issue. Do not port the `fetch` and regex-extraction step at all: it exists only to move HTML between three physically separate documents, and under React there is one document and three components already sitting in the same bundle, addressed by whichever router this app uses.

Keep the two browser APIs, not the DOM-swap code between them. Wrap the router's own route commit in `document.startViewTransition`, and the `::view-transition-old/new(root)` rules above still fire — they animate whatever the DOM looked like before and after the callback runs, not specifically a body-innerHTML swap. `startViewTransition`'s callback is required to mutate the DOM synchronously, but a router's navigation normally schedules a state update that commits on its own schedule; wrap that call in `flushSync` from `react-dom` so the route change lands inside the callback instead of after it:
```jsx
document.startViewTransition(() => {
  flushSync(() => setRoute(nextRoute));
});
```
Skip `flushSync` and the transition still resolves, but the callback returns before React has touched the DOM — the browser diffs old-against-old, finds nothing changed, and the wipe silently degrades to a hard cut. The `navigation.addEventListener("navigate", ...)` listener and its same-origin/`.html` guard exist to intercept real `<a href>` clicks on a document with no router; once a router owns those links, this listener is dead code, not a pattern to keep alongside it.

*(4) The intro has to be re-armed on every route, not just once.* `initializeAnimations` and `initializeLenis` are not mount-once logic despite sitting behind `DOMContentLoaded` — the source calls them again from `transition.updateCallbackDone` after every navigation, because each destination is a fresh document whose intro has never played. A `useEffect` with an empty dependency array reproduces only that first call. Give the home route's character-reveal and the about route's line-reveal their own effect on their own component instead: a route component's effect re-runs — on a fresh mount, or a remount keyed on the path — exactly when the router switches to it, which is what replaying the intro on every visit actually requires. The nav's lift-in is the one animation not scoped to a single route: it plays on every destination in the source because the whole `<body>`, nav included, is rebuilt from fetched HTML each time. If the nav becomes a persistent layout wrapping the routed content — the normal shape, and the one a router prefers so it isn't remounting shared chrome on every click — its effect fires once, on first load, and will not replay on later navigations the way the source does. Pick one on purpose: key the nav on the current route so React remounts it each time, or re-trigger the same tween from an effect that watches the route and leave the nav itself un-keyed.

*(5) Cleanup.* Wrap each route's tweens — the hero chars, the about-paragraph lines, the nav lift — in a `gsap.context` scoped to that component's root ref, and revert it in the effect's cleanup:
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    /* this route's tween, exactly as described above */
  }, rootRef);
  return () => ctx.revert();
}, []);
```
None of these tweens registers a deferred handler, so there is no `self.add` to reach for here — reverting the context is enough.

Lenis is a document-level resource, and the source treats it as disposable per page: `if (lenis) lenis.destroy()` runs before every `new Lenis(...)`. That exists to survive being re-run against a brand-new document on every navigation; a client-routed app has exactly one document for its whole session, so recreating Lenis on every route change is pure churn, and it reproduces the momentum glitch smooth-scroll libraries are known for when rebuilt mid-scroll. Move `initializeLenis` out of the per-route effects and into the persistent layout's effect instead — created once with an empty dependency array, destroyed once when that layout unmounts.

The source also runs a hand-written loop alongside Lenis's own `autoRaf` option:
```js
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```
`autoRaf` already drives Lenis internally, which makes this loop redundant in the source — harmless there only because the page never tears down mid-session. Once Lenis lives inside something that can unmount, an uncancelled loop like this keeps calling `lenis.raf()` on a destroyed instance for the rest of the page's life. Do not port it: rely on `autoRaf` alone, and there is no handle left over that needs cancelling.

Finally, replace the hand-rolled split reset — walking every `.info p .line`, replacing each with a plain text node of its own `textContent` — with the SplitType instance's own `revert()`, called in the same cleanup that reverts the GSAP context. The manual version exists to guard against `initializeAnimations` finding a previous page's line markup still sitting in the document; an effect that reverts its own split on cleanup doesn't need that guard, because the cleanup runs before the nodes it touched can ever be reused by a later mount. Revert the char split from the hero and the line split from the about paragraph before the context that tweens them, so the split's own DOM surgery never runs against nodes a live tween still references.
