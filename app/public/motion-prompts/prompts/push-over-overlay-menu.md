# Minimal Push Overlay Menu
## Goal
Build a dark, minimal one-page site with a fixed menu bar whose star effect is a **fullscreen "push-over" overlay menu**: clicking the circular hamburger toggle runs a single GSAP timeline (custom "hop" ease) that simultaneously **pushes the entire page content down by 100svh**, **wipes the dark overlay open top-to-bottom via an animated `clip-path` polygon**, slides the overlay's inner content up from `-50%` to `0`, fades in a side media image, and reveals every menu link/tag/footer line with **SplitText line-masked reveals in reverse stagger**. Clicking again plays the mirrored closing timeline and the page slides back up.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use `gsap` (npm) plus the GSAP plugins **`CustomEase`** and **`SplitText`**, and **`lenis`** for smooth scrolling. All logic in one `script.js` (`<script type="module">`), one `styles.css`, one `index.html`. Register plugins with `gsap.registerPlugin(CustomEase, SplitText)` and run everything inside a `DOMContentLoaded` listener.
## Layout / HTML
```html
<nav>
  <div class="menu-bar">
    <div class="menu-logo"><a href="#"><img src="<logo>" alt="" /></a></div>
    <div class="menu-toggle-btn">
      <div class="menu-toggle-label"><p>Menu</p></div>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
