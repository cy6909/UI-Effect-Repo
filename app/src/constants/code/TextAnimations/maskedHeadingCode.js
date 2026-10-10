import code from '@content/TextAnimations/MaskedHeading/MaskedHeading.jsx?raw';
import css from '@content/TextAnimations/MaskedHeading/MaskedHeading.css?raw';
import tailwind from '@tailwind/TextAnimations/MaskedHeading/MaskedHeading.jsx?raw';
import tsCode from '@ts-default/TextAnimations/MaskedHeading/MaskedHeading.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/MaskedHeading/MaskedHeading.tsx?raw';

export const maskedHeading = {
  dependencies: 'gsap',
  usage: `import MaskedHeading from './MaskedHeading';

<MaskedHeading text="Designed in the details" src="/hero.jpg" />

<MaskedHeading
  text="Shot on location"
  mediaType="video"
  src="/reel.mp4"
  poster="/reel-poster.jpg"
  fillScale={1.3}
  parallax={34}
  reveal="wipe"
  trigger="view"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
