import code from '@content/Animations/CursorGrid/CursorGrid.jsx?raw';
import css from '@content/Animations/CursorGrid/CursorGrid.css?raw';
import tailwind from '@tailwind/Animations/CursorGrid/CursorGrid.jsx?raw';
import tsCode from '@ts-default/Animations/CursorGrid/CursorGrid.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/CursorGrid/CursorGrid.tsx?raw';

export const cursorGrid = {
  usage: `import CursorGrid from './CursorGrid';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <CursorGrid
    cellSize={70}
    color="#D946EF"
    radius={140}
    falloff="smooth"
    holdTime={400}
    fadeDuration={800}
    lineWidth={1.2}
    maxOpacity={1}
    fillOpacity={0}
    gridOpacity={0}
    cellRadius={0}
    clickPulse
    pulseSpeed={600}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
