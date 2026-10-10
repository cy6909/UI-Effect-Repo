# Playable Objects — Physics Pill Footer
## Goal
Build a two-screen page whose second screen is a **dark footer where 12 white "pill" tags rain down from above the viewport and pile up under real 2D physics (Matter.js)**. A GSAP ScrollTrigger with `once: true` boots the physics engine the first time the footer scrolls into view; every pill is a Matter.js rigid body synced to a DOM element via a `requestAnimationFrame` loop, and a Matter `MouseConstraint` lets the user **grab, drag and fling the pills** in real time. Smooth scrolling via Lenis. The centered footer headline reads "Because why list when you can play?".
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugin `ScrollTrigger`, `lenis` for smooth scroll, and `matter-js` for the physics simulation (`import Matter from "matter-js"`). Register the plugin with `gsap.registerPlugin(ScrollTrigger)`. No canvas rendering — Matter runs headless and you drive the DOM elements yourself.
## Layout / HTML
Two stacked full-viewport sections:
```
<section class="hero">
  <h1>Scroll down to break the laws of web design</h1>
</section>
<section class="footer">
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
