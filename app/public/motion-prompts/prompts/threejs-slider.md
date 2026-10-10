# ThreeJS Infinite Vertical Slider (WebGL, velocity vertex-bend, no GSAP)
## Goal
Build a full-screen **infinite vertical slider rendered entirely in Three.js** — no DOM images, no
animation library. Ten textured planes of slightly random heights are stacked head-to-toe into one
tall column inside a WebGL scene and **loop endlessly** as you scroll. Input comes from the **mouse
wheel, click-drag, and touch swipe**; a hand-rolled `requestAnimationFrame` engine lerps a virtual
scroll position, adds **momentum with friction** on release, and wraps the column so slides recycle
forever in both directions. The star effect: **scroll velocity bends each plane's vertices along Z**
— a sine-shaped bulge that peaks at screen center and is **signed by scroll direction** (curves one
way scrolling down, the other way scrolling up) and **scaled by how fast/decelerating you are**, so
the images ripple into a soft curved sheet while moving and flatten back out when still. Two small
HTML text nodes — a slide **title** and a zero-padded **counter** — always track the slide currently
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
