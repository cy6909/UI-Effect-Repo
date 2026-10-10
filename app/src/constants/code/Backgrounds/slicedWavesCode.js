import code from '@content/Backgrounds/SlicedWaves/SlicedWaves.jsx?raw';
import css from '@content/Backgrounds/SlicedWaves/SlicedWaves.css?raw';
import tailwind from '@tailwind/Backgrounds/SlicedWaves/SlicedWaves.jsx?raw';
import tsCode from '@ts-default/Backgrounds/SlicedWaves/SlicedWaves.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/SlicedWaves/SlicedWaves.tsx?raw';

export const slicedWaves = {
  dependencies: `ogl`,
  usage: `import SlicedWaves from './SlicedWaves';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <SlicedWaves
    color1="#FF9FFC"
    color2="#5227FF"
    color3="#B497CF"
    columns={14}
    rows={8}
    barThickness={0.1}
    speed={0.35}
    travel={0.7}
    waveSpread={0.9}
    rowOffset={1.0}
    softness={0.05}
    glow={0}
    brightness={1.0}
    contrast={1.0}
    opacity={0.5}
    orientation="horizontal"
    alternate={false}
    mouseInteraction={true}
    mouseStrength={1}
    mouseRadius={0.3}
    grain={true}
    grainIntensity={0.05}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
