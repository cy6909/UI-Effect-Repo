import code from '@content/Backgrounds/CRTWarp/CRTWarp.jsx?raw';
import css from '@content/Backgrounds/CRTWarp/CRTWarp.css?raw';
import tailwind from '@tailwind/Backgrounds/CRTWarp/CRTWarp.jsx?raw';
import tsCode from '@ts-default/Backgrounds/CRTWarp/CRTWarp.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/CRTWarp/CRTWarp.tsx?raw';

export const crtWarp = {
  dependencies: `three`,
  usage: `import CRTWarp from './CRTWarp';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <CRTWarp
    color="#c755f7"
    backgroundColor="#05010a"
    speed={0.5}
    curvature={0.25}
    scanlineStrength={0.25}
    scanlineFrequency={200}
    waveAmplitude={0.3}
    waveFrequency={2.5}
    bloom={1.5}
    bloomRadius={1}
    noise={0.1}
    vignette={0}
    brightness={1.25}
    pixelation={1}
    rgbShift={0.015}
    mouseReact
    mouseStrength={0.5}
    dpr={1}
    fps={30}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
