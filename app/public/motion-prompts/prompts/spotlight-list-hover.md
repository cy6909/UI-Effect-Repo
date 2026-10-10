# Spotlight List Hover Cards — Handwritten Label Swap, Proximity Row Growth & Elastic Glass Cards
## Goal
Build a three-section page whose middle section is a dark, rounded **panel** with a centred list of six titles. When the pointer **enters the list**, four **glass-framed portrait cards** parked in the panel's corners **pop from scale 0 with an elastic ease**. When the pointer **hovers a title**: the bold uppercase title **squashes, blurs and fades out** while a **handwritten version scales in** (back-out ease); the hovered **row grows** by 50px and every other row **shrinks in proportion to its distance** (weights `1/|i−j|`), so the list breathes around the cursor; and the four cards **load that title's images** and **reshuffle** to new random offsets/rotations while following the hovered row's vertical position. Leaving the list scales the cards away and restores the rows. A soft light inside the panel follows the pointer. GSAP with `CustomEase`.
## Tech
Vanilla HTML/CSS/JS with ES module imports. `gsap` (npm) + **`CustomEase`**. Fonts: **Anton** (titles), **Caveat** 600 (handwritten), **DM Sans** 500 (body). No smooth-scroll library.
## Layout / HTML
```html
<div class="sl">
  <section class="sl-intro"><h1>The Sketchbook</h1></section>
  <section class="sl-spotlight">
    <div class="sl-panel">
      <p class="sl-panel__eyebrow">Explore the collection</p>
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
