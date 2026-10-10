import code from '@content/Backgrounds/Scanner/Scanner.jsx?raw';
import css from '@content/Backgrounds/Scanner/Scanner.css?raw';
import tailwind from '@tailwind/Backgrounds/Scanner/Scanner.jsx?raw';
import tsCode from '@ts-default/Backgrounds/Scanner/Scanner.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/Scanner/Scanner.tsx?raw';

export const scanner = {
  dependencies: `ogl`,
  usage: `import Scanner from './Scanner';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Scanner
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    speed={0.5}
    sweepSpeed={0.25}
    sweepWidth={1.6}
    sweepFalloff={6}
    scale={1.5}
    frequency={2}
    ripple={0.22}
    bandDensity={11}
    lineSharpness={5.5}
    glow={0.22}
    scanDirection="vertical"
    colorSpread={0.7}
    brightness={1.0}
    contrast={1.15}
    softness={1.4}
    vignette={0.45}
    scanline={true}
    grain={true}
    grainIntensity={0.05}
    opacity={1.0}
    mouseInteraction={true}
    mouseRadius={0.5}
    mouseStrength={0.5}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
