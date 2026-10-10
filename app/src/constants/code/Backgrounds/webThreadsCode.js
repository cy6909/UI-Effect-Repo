import code from '@content/Backgrounds/WebThreads/WebThreads.jsx?raw';
import css from '@content/Backgrounds/WebThreads/WebThreads.css?raw';
import tailwind from '@tailwind/Backgrounds/WebThreads/WebThreads.jsx?raw';
import tsCode from '@ts-default/Backgrounds/WebThreads/WebThreads.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/WebThreads/WebThreads.tsx?raw';

export const webThreads = {
  dependencies: `ogl`,
  usage: `import WebThreads from './WebThreads';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <WebThreads
    color1="#5227FF"
    color2="#FF9FFC"
    color3="#FFFFFF"
    speed={0.2}
    threadCount={6}
    frequency={5.0}
    spread={0.18}
    taper={1.0}
    position={0.5}
    fanMode="center"
    glow={0.02}
    falloff={0.6}
    thickness={1.1}
    brightness={0.6}
    opacity={1.0}
    mirror={true}
    shimmer={false}
    grain={true}
    grainIntensity={0.05}
    mouseInteraction={true}
    mouseStrength={0.3}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
