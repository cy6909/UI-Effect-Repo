import code from '@content/TextAnimations/FoldText/FoldText.jsx?raw';
import css from '@content/TextAnimations/FoldText/FoldText.css?raw';
import tailwind from '@tailwind/TextAnimations/FoldText/FoldText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/FoldText/FoldText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/FoldText/FoldText.tsx?raw';

export const foldText = {
  dependencies: `gsap`,
  usage: `import FoldText from './FoldText';

<FoldText
  text="Launch with clarity"
  splitBy="char"
  hinge="top"
  trigger="scroll"
  duration={0.65}
  stagger={0.045}
  ease="power3.out"
  perspective={700}
  creaseShading={0.55}
  fontSize="clamp(3rem, 10vw, 7rem)"
  fontWeight={800}
  color="#f7f2e8"
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
