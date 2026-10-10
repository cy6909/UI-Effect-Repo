import code from '@content/TextAnimations/StrokeText/StrokeText.jsx?raw';
import css from '@content/TextAnimations/StrokeText/StrokeText.css?raw';
import tailwind from '@tailwind/TextAnimations/StrokeText/StrokeText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/StrokeText/StrokeText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/StrokeText/StrokeText.tsx?raw';

export const strokeText = {
  dependencies: `gsap`,
  usage: `import StrokeText from './StrokeText';

<StrokeText
  text="Draw Attention"
  strokeColor="#A78BFA"
  fillColor="#F8FAFC"
  strokeWidth={1.4}
  drawDuration={1.6}
  fillDelay={0.2}
  stagger={0.05}
  ease="power2.out"
  trigger="mount"
  fillMode="wipe"
  fontSize={128}
  fontWeight={800}
  letterSpacing={-4}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
