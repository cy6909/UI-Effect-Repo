import code from '@content/TextAnimations/WarpText/WarpText.jsx?raw';
import css from '@content/TextAnimations/WarpText/WarpText.css?raw';
import tailwind from '@tailwind/TextAnimations/WarpText/WarpText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/WarpText/WarpText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/WarpText/WarpText.tsx?raw';

export const warpText = {
  dependencies: `ogl`,
  usage: `import WarpText from './WarpText';

<WarpText
  text="Bend the moment"
  color="#f8f5ff"
  warpStrength={0.08}
  warpScale={1.7}
  speed={0.55}
  pointerInfluence={0.42}
  pointerStrength={0.38}
  refraction={0.018}
  ripple
  fontSize="clamp(3rem, 10vw, 9rem)"
  fontWeight={800}
  style={{ height: '320px' }}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
