# 3D Scroll Scanner Experience
## Goal
Build a full-page, five-viewport-tall scroll story whose star is a **single stylized 3D product model (a beverage-can hero prop)** rendered in Three.js against a clean off-white stage. On load the model **scales up from nothing and floats** (a gentle sine bob) while slowly self-rotating. As you scroll, its **X-rotation is driven by scroll progress** through a Lenis-fed render loop, so it tumbles forward as the page advances. When you reach a **pinned "scanner" section** — an empty rounded rectangle frame with product-ID chip, barcode, and a red "verified" pill — a GSAP `ScrollTrigger.onEnter` handler **plays a scanner-beep sound, spins the model a full 360°, then shrinks the model and the scanner frame to zero** (the product is "scanned away"). Scrolling back up re-grows the frame and restores the model. The whole thing runs on a continuous `requestAnimationFrame` render loop plus two ScrollTriggers.
## Tech
Vanilla HTML/CSS/JS with ES module imports. Use **`three` (npm)**, **`gsap` (npm)** with the **`ScrollTrigger`** plugin, and **`lenis`** for smooth scroll. Import exactly:
```js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
...

> This prompt requires the Unlimited plan (Full Stack for MCP access). Get a key at https://motionprompts.dev/account/ and pass it as `Authorization: Bearer mpk_...`. Pricing: https://motionprompts.dev/pricing/
