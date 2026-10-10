import code from '@content/Animations/GlowCursor/GlowCursor.jsx?raw';
import css from '@content/Animations/GlowCursor/GlowCursor.css?raw';
import tailwind from '@tailwind/Animations/GlowCursor/GlowCursor.jsx?raw';
import tsCode from '@ts-default/Animations/GlowCursor/GlowCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/GlowCursor/GlowCursor.tsx?raw';

export const glowCursor = {
  dependencies: `ogl`,
  usage: `import GlowCursor from './GlowCursor';

<div style={{ position: 'relative', width: '100%', height: '500px', background: '#050610' }}>
  <GlowCursor
    color="#67E8F9"
    secondaryColor="#A78BFA"
    trailLength={40}
    trailWidth={8}
    trailTaper={0.8}
    followSpeed={0.16}
    glowIntensity={1.9}
    glowSpread={1.2}
    hotspot={0.65}
    brightness={1.25}
    opacity={1}
    pulseSpeed={1.1}
    noiseStrength={0.035}
    idleFade
    idleTimeout={700}
    fadeDuration={900}
    blendMode="screen"
  >
    {/* Your content here */}
  </GlowCursor>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
