import code from '@content/TextAnimations/ParticleText/ParticleText.jsx?raw';
import css from '@content/TextAnimations/ParticleText/ParticleText.css?raw';
import tailwind from '@tailwind/TextAnimations/ParticleText/ParticleText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/ParticleText/ParticleText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/ParticleText/ParticleText.tsx?raw';

export const particleText = {
  dependencies: ``,
  usage: `import ParticleText from './ParticleText';

<div style={{ width: '100%', height: 360, background: '#09090f' }}>
  <ParticleText
    text="Launch Faster"
    particleSize={2}
    density={4}
    color="#ffffff"
    highlightColor="#8b5cf6"
    scatter={180}
    gatherDuration={1600}
    stagger={420}
    pointerRepel={40}
    repelRadius={120}
    idleDrift={0.7}
    trigger="hover"
    fontSize="clamp(3rem, 12vw, 8rem)"
    fontWeight={800}
    fontFamily="inherit"
    glow
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
