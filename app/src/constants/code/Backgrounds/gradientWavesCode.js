import code from '@content/Backgrounds/GradientWaves/GradientWaves.jsx?raw';
import css from '@content/Backgrounds/GradientWaves/GradientWaves.css?raw';
import tailwind from '@tailwind/Backgrounds/GradientWaves/GradientWaves.jsx?raw';
import tsCode from '@ts-default/Backgrounds/GradientWaves/GradientWaves.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/GradientWaves/GradientWaves.tsx?raw';

export const gradientWaves = {
  dependencies: `ogl`,
  usage: `import GradientWaves from './GradientWaves';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GradientWaves
    horizonColor="#5227FF"
    waveColor="#FF9FFC"
    crestColor="#FFFFFF"
    speed={0.4}
    amplitude={2.5}
    waveScale={0.6}
    waveRatio={0.9}
    swell={35}
    turbulence={20}
    tilt={1.11}
    zoom={1.0}
    height={5.5}
    fogDepth={15}
    detail="medium"
    brightness={1.0}
    opacity={1.0}
    mouseInteraction={true}
    parallaxStrength={0.5}
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
