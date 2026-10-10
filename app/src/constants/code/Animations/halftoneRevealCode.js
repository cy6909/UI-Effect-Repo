import code from '@content/Animations/HalftoneReveal/HalftoneReveal.jsx?raw';
import css from '@content/Animations/HalftoneReveal/HalftoneReveal.css?raw';
import tailwind from '@tailwind/Animations/HalftoneReveal/HalftoneReveal.jsx?raw';
import tsCode from '@ts-default/Animations/HalftoneReveal/HalftoneReveal.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/HalftoneReveal/HalftoneReveal.tsx?raw';

export const halftoneReveal = {
  dependencies: `ogl`,
  usage: `import HalftoneReveal from './HalftoneReveal';

<div style={{ height: '500px', position: 'relative' }}>
  <HalftoneReveal
    src="https://picsum.photos/seed/halftone-reveal/1200/800"
    inkColor="#141414"
    paperColor="#f4efe4"
    mode="mono"
    dotDensity={90}
    angle={28}
    revealRadius={0.28}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
