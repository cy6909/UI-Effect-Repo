import code from '@content/TextAnimations/SplitFlapText/SplitFlapText.jsx?raw';
import css from '@content/TextAnimations/SplitFlapText/SplitFlapText.css?raw';
import tailwind from '@tailwind/TextAnimations/SplitFlapText/SplitFlapText.jsx?raw';
import tsCode from '@ts-default/TextAnimations/SplitFlapText/SplitFlapText.tsx?raw';
import tsTailwind from '@ts-tailwind/TextAnimations/SplitFlapText/SplitFlapText.tsx?raw';

export const splitFlapText = {
  dependencies: ``,
  usage: `import SplitFlapText from './SplitFlapText';

<SplitFlapText
  words={['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']}
  flipDuration={0.12}
  stagger={0.06}
  cycleDelay={2400}
  charset="alphanumeric"
  flipsPerChar={8}
  tileColor="#111827"
  textColor="#f8fafc"
  tileRadius={8}
  gap={6}
  fontSize={52}
  loop
  padTo={12}
/>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
