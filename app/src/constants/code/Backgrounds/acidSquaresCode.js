import code from '@content/Backgrounds/AcidSquares/AcidSquares.jsx?raw';
import css from '@content/Backgrounds/AcidSquares/AcidSquares.css?raw';
import tailwind from '@tailwind/Backgrounds/AcidSquares/AcidSquares.jsx?raw';
import tsCode from '@ts-default/Backgrounds/AcidSquares/AcidSquares.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/AcidSquares/AcidSquares.tsx?raw';

export const acidSquares = {
  dependencies: `ogl`,
  usage: `import AcidSquares from './AcidSquares';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <AcidSquares
    color1="#5227FF"
    color2="#A855F7"
    color3="#FFFFFF"
    detail="medium"
    speed={0.7}
    waveDepth={1}
    zoom={1.3}
    density={10.0}
    glow={1.0}
    exposure={2700}
    spread={0.3}
    stepSize={0.002}
    colorShift={0}
    contrast={1}
    brightness={1.0}
    opacity={1.0}
    mouseInteraction={true}
    mouseStrength={0.1}
    mouseRadius={0.35}
    blur={0}
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
