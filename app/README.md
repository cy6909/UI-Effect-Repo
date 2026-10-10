# UI / Bits — Personal React Bits fork

A Chinese-first personal library built on React Bits. Original component implementations and the upstream license remain intact.

- Browse 1,384 entries across six sources, with Chinese-first navigation, source/category/prompt-kind filters and local favorites. Counts include 75 reference links; they are not all locally runnable components.
- Preview upstream demos, finish/replay a session, inspect/download source variants, or copy the original upstream prompt in English or Chinese.
- Prompts use the upstream Copy prompt template. English is unchanged; Chinese translates its instructions. Source code, dependencies and API property descriptions remain verbatim.
- Personal entry: `src/personal/PersonalApp.jsx`. Build with `npm ci` and `npm run build:personal`.
- Container deployment: `docker compose -f compose.personal.yaml up -d --build` (default port 18120).
- Optional poster regeneration requires FFmpeg: `node scripts/generatePersonalPosters.mjs`.

Component descriptions and some upstream demo controls remain in English. Chinese titles and the personal shell cover all catalog entries; the React Bits Copy prompt supports both Chinese and English. This is not an official React Bits translation.

## Motion Prompts public collection

Attribution: [motionprompts.dev · Vanguardia](https://motionprompts.dev). The official [motionprompts-mcp distribution](https://github.com/VanguardiaAI/motionprompts-mcp) is licensed separately under PolyForm Noncommercial 1.0.0 with attribution; its full license is preserved in `public/motion-prompts/LICENSE.txt`.

This snapshot contains 30 complete public prompts and 218 official excerpts, preserved verbatim in English. No paid full prompts, component source or demo media are redistributed. Images and preview videos load from the original provider; live interactions open there in a new tab. These are catalog entries and public design references, not 248 locally implemented React components or verified prompt-only reproductions.

Regenerate with `node scripts/importMotionPrompts.mjs <official-repo-checkout> <public-api-catalog.json>`. Verify with `node scripts/checkMotionPrompts.mjs`; `public/motion-prompts/manifest.json` records the source commit and access counts. The shared AI index is `/personal-registry/index.json`.

## Personal AI implementations

The `personal-ai` group imports the user's archived M01–M06 and Calendar Cards HTML prototypes. Source downloads preserve the supplied bytes; M02–M06 share the original complete workbench and have separate scene previews. Iframes and response CSP isolate scripts from the library origin; leaving the preview disposes the iframe. Calendar Cards is the archived offline Web Animations API version, not the GSAP/Vite project. Only R01 has an archived original prompt. Model, reasoning effort, skill-loading and first-pass provenance remain unknown. See `public/personal-ai/NOTICE.txt` for source and asset boundaries.

## Additional public libraries and source directory

- MotionVault: 202 MIT effects with original English prompts, source bundles and a separate React 19 preview build. Upstream snapshot: `vendor/motion-vault/UPSTREAM.json`.
- Shadcn Studio: 637 MIT registry source bundles from its public repository; demos open upstream. No original prompts were present in this imported distribution.
- shadcn.io: 75 links from its official MIT README. That repository contains no component implementation source; Pro assets are not imported.
- `/resources` and `/personal-registry/resources.json`: 16 reviewed website references, classified as recreation, source integration, visual intent, installation, or no prompt. These site references are counted separately from the component index.

The original Motion Prompts, React Bits and personal AI imports remain distinct. aimotions requires written permission to republish its collection; it is linked rather than mirrored. Account-gated, paid and unconfirmed redistribution content stays at its official source. No weekly automation or model-generation job is enabled.

Import snapshots with `node scripts/importOpenLibraries.mjs <reviewed-repositories-directory>` after installing the MotionVault locked dependencies there. `node scripts/checkOpenLibraries.mjs` checks every imported prompt/bundle hash and license reference. Each library retains its original MIT notice under `public/open-libraries/`.

## Original project

<div align="center">
	<br>
	<br>
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="src/assets/logos/reactbits-gh-black.svg">
      <source media="(prefers-color-scheme: dark)" srcset="src/assets/logos/reactbits-gh-white.svg">
      <img src="src/assets/logos/reactbits-gh-black.svg" alt="react-bits logo" width="600">
    </picture>
	<br>
	<br>
  <strong>The largest & most creative library of animated React components.</strong>
  <br />
  <sub>Stand out with 200+ free, customizable animations for text, backgrounds, UI, and micro interactions.</sub>
	<br>
	<br>
  <a href="https://github.com/davidhdev/react-bits/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/davidhdev/react-bits"></a>
  <a href="https://github.com/davidhdev/react-bits/blob/main/LICENSE.md"><img alt="License" src="https://img.shields.io/badge/License-MIT+Commons_Clause-magenta"></a>
  <br>
  <br>
  <a href="https://reactbits.dev/">📖 Documentation</a> · <a href="https://reactbits.dev/get-started/installation">⚡ Quick Start</a> · <a href="https://reactbits.dev/tools">🛠️ Tools</a>
</div>

<br />

<div align="center">
  <img src="src/assets/common/gh-showcase.png" alt="React Bits component showcase" width="1000">
</div>

<br />

## React Bits Pro

React Bits Pro adds premium components, page blocks, app UI, and complete templates for your next project.

[![React Bits Pro previews: ASCII Ripple, Radial Liquid, Hero 12, and Dashboard 12](public/assets/readme/react-bits-pro.webp)](https://pro.reactbits.dev/?utm_source=github&utm_medium=readme&utm_campaign=pro-conversion&utm_content=readme-pro)

## ✨ Why React Bits?

React Bits helps you **ship stunning interfaces faster**. Instead of spending hours crafting animations from scratch, grab a polished component and customize it to fit your vision.

> 💬 **Text Animations** · 🌀 **Animations** · 🧩 **Components** · ⚡ **Micro** · 🖼️ **Backgrounds**

## 🚀 Features

- **200+ components** — text animations, UI elements, micro interactions, and backgrounds, growing weekly
- **Minimal dependencies** — lightweight and tree-shakeable
- **Fully customizable** — tweak everything via props or edit the source directly
- **4 variants per component** — JS-CSS, JS-TW, TS-CSS, TS-TW (everyone's happy)
- **Copy-paste ready** — works with any modern React project

## 🛠️ Creative Tools

<div align="center">
  <img src="src/assets/common/tools-readme.webp" alt="React Bits Tools" width="1000" style="border-radius: 30px; max-width: 1920px;">
</div>

<hr />

### Beyond components, React Bits offers **free creative tools** to supercharge your workflow:

| Tool                                                 | What it does                                                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **[Background Studio](https://reactbits.dev/tools)** | Explore animated backgrounds, customize effects, export as video/image/code              |
| **[Shape Magic](https://reactbits.dev/tools)**       | Create inner rounded corners between shapes, export as SVG, React code or clip-path code |
| **[Texture Lab](https://reactbits.dev/tools)**       | Apply 20+ effects (noise, dithering, ASCII) to images/videos and export in high quality  |

## 📦 Installation

React Bits supports [shadcn](https://ui.shadcn.com/) and [jsrepo](https://jsrepo.dev) for quick CLI installs.

```bash
# Example: Add a component via shadcn
npx shadcn@latest add @react-bits/BlurText-TS-TW
```

Each component page includes copy-ready CLI commands. See the [installation guide](https://reactbits.dev/get-started/installation) for full details.

You can also select your preferred technologies, and copy the code manually.

## 🚀 Sponsors

React Bits is proudly supported by these amazing sponsors:

### Diamond

<a href="https://www.shadcnblocks.com/?utm_source=reactbits&utm_medium=sponsor&utm_campaign=diamond&ref=reactbits" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/assets/sponsors/shadcnblocks.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/assets/sponsors/shadcnblocks-lightmode.svg">
    <img src="public/assets/sponsors/shadcnblocks.svg" alt="shadcnblocks.com" style="height: 50px;">
  </picture>
</a>

<a href="https://shaders.com/?utm_source=reactbits&utm_medium=sponsor&utm_campaign=diamond&ref=reactbits" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/assets/sponsors/shaders.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/assets/sponsors/shaders-lightmode.svg">
    <img src="public/assets/sponsors/shaders.svg" alt="shaders.com" style="height: 50px;">
  </picture>
</a>

### Silver

<a href="https://shadcncraft.com/?utm_source=reactbits&utm_medium=sponsor&utm_campaign=silver&ref=reactbits" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/assets/sponsors/shadcncraft.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/assets/sponsors/shadcncraft-lightmode.svg">
    <img src="public/assets/sponsors/shadcncraft.svg" alt="Shadcncraft" style="height: 40px;">
  </picture>
</a>

<a href="https://shadcnuikit.com/?utm_source=reactbits&utm_medium=sponsor&utm_campaign=silver&ref=reactbits" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/assets/sponsors/shadcnuikit.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/assets/sponsors/shadcnuikit-lightmode.svg">
    <img src="public/assets/sponsors/shadcnuikit.svg" alt="shadcnuikit.com" style="height: 40px;">
  </picture>
</a>

<a href="https://shadcnstudio.com/?utm_source=reactbits&utm_medium=sponsor&utm_campaign=silver&ref=reactbits" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/assets/sponsors/shadcnstudio.svg">
    <source media="(prefers-color-scheme: light)" srcset="public/assets/sponsors/shadcnstudio-lightmode.svg">
    <img src="public/assets/sponsors/shadcnstudio.svg" alt="Shadcn Studio" style="height: 40px;">
  </picture>
</a>

<hr />

**[Become a sponsor](https://reactbits.dev/sponsors)** — Get your brand in front of 500K+ developers monthly.

## 🤝 Contributing

We'd love your help! Check the [open issues](https://github.com/DavidHDev/react-bits/issues) or submit ideas via the [feature request template](https://github.com/DavidHDev/react-bits/issues/new?template=2-feature-request.yml).

Please read the [contribution guide](https://github.com/DavidHDev/react-bits/blob/main/CONTRIBUTING.md) first — thanks for making React Bits better!

## 🙌 Contributors

<!-- <a href="https://github.com/davidhdev/react-bits/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=davidhdev/react-bits" />
</a> -->

![Contributors](https://contrib-circles.vercel.app/davidhdev/react-bits?padding=16&borders=none&transparent=true)

## 👤 Maintainer

**[David Haz](https://github.com/DavidHDev)** — creator & lead maintainer

## 🌐 Official Ports

| Framework | Link                                      |
| --------- | ----------------------------------------- |
| Vue.js    | [vue-bits.dev](https://vue-bits.dev/)     |
| Svelte    | [sveltebits.xyz](https://sveltebits.xyz/) |

## 📊 Stats

![Repobeats analytics](https://repobeats.axiom.co/api/embed/b1bf4dc0226458617adbdbf5586f2df953eb0922.svg 'Repobeats analytics image')

## 🗳️ Credit

React Bits occasionally draws inspiration from publicly available code examples. These are rewritten as full-fledged, customizable components for JS, TS, CSS, and Tailwind. If you recognize your work, [open an issue](https://github.com/DavidHDev/react-bits/issues) to request credit.

## 📄 License

[MIT + Commons Clause](https://github.com/davidhdev/react-bits/blob/main/LICENSE.md) — free for personal and commercial use.
