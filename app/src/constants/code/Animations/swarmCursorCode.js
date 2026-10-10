import code from '@content/Animations/SwarmCursor/SwarmCursor.jsx?raw';
import css from '@content/Animations/SwarmCursor/SwarmCursor.css?raw';
import tailwind from '@tailwind/Animations/SwarmCursor/SwarmCursor.jsx?raw';
import tsCode from '@ts-default/Animations/SwarmCursor/SwarmCursor.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/SwarmCursor/SwarmCursor.tsx?raw';

export const swarmCursor = {
  dependencies: `ogl`,
  usage: `import SwarmCursor from './SwarmCursor';

<div style={{ position: 'relative', width: '100%', height: '450px' }}>
  <SwarmCursor
    color="#ffffff"
    accentColor="#ffffff"
    count={10}
    size={10}
    speed={2.5}
    spread={100}
    wander={0.25}
    trail={0.75}
    scatterOnClick
  >
    {/* Your content here */}
  </SwarmCursor>
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
