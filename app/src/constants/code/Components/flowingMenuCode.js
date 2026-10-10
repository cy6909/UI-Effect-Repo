import code from '@content/Components/FlowingMenu/FlowingMenu.jsx?raw';
import css from '@content/Components/FlowingMenu/FlowingMenu.css?raw';
import tailwind from '@tailwind/Components/FlowingMenu/FlowingMenu.jsx?raw';
import tsCode from '@ts-default/Components/FlowingMenu/FlowingMenu.tsx?raw';
import tsTailwind from '@ts-tailwind/Components/FlowingMenu/FlowingMenu.tsx?raw';

export const flowingMenu = {
  dependencies: `gsap`,
  usage: `import FlowingMenu from './FlowingMenu'

const demoItems = [
  { link: '#', text: 'Mojave', image: 'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'Sonoma', image: 'https://images.unsplash.com/photo-1781499455083-6ccc3beb20cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'Monterey', image: 'https://images.unsplash.com/photo-1776394254711-4a0d7345269a?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' },
  { link: '#', text: 'Sequoia', image: 'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?q=80&w=600&h=400&fit=crop&sat=-100&auto=format' }
];

<div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
