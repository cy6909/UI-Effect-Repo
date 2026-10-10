import code from '@content/Backgrounds/AeroShards/AeroShards.jsx?raw';
import css from '@content/Backgrounds/AeroShards/AeroShards.css?raw';
import tailwind from '@tailwind/Backgrounds/AeroShards/AeroShards.jsx?raw';
import tsCode from '@ts-default/Backgrounds/AeroShards/AeroShards.tsx?raw';
import tsTailwind from '@ts-tailwind/Backgrounds/AeroShards/AeroShards.tsx?raw';

export const aeroShards = {
  dependencies: `vgpu`,
  usage: `import AeroShards from './AeroShards';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <AeroShards
    backgroundColor="#120F17"
    shardColor="#896ABD"
    accentColor="#A855F7"
    placement="full"
    flow="stream"
    material="pearl"
    detail="balanced"
    effect="none"
    scale={1}
    spread={1}
    depth={1}
    speed={1}
    spin={1}
    interaction="repel"
    density={1.5}
    shardSize={1.1}
    stretch={1}
    turbulence={1}
    glow={1}
    edgeSoftness={2}
    bloom={0.5}
    grain={0.05}
    chromaticAberration={0.0075}
    transitionDuration={1}
    interactionRadius={1.5}
    interactionStrength={0.5}
    rippleIntensity={1}
    holdToGather={true}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
