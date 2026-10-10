import code from '@content/Animations/ElasticMesh/ElasticMesh.jsx?raw';
import css from '@content/Animations/ElasticMesh/ElasticMesh.css?raw';
import tailwind from '@tailwind/Animations/ElasticMesh/ElasticMesh.jsx?raw';
import tsCode from '@ts-default/Animations/ElasticMesh/ElasticMesh.tsx?raw';
import tsTailwind from '@ts-tailwind/Animations/ElasticMesh/ElasticMesh.tsx?raw';

export const elasticMesh = {
  dependencies: `ogl`,
  usage: `import ElasticMesh from './ElasticMesh';

<div style={{ width: 480, height: 320 }}>
  <ElasticMesh color1="#4F46E5" color2="#0EA5E9" />
</div>

<div style={{ width: 480, height: 320 }}>
  <ElasticMesh
    image="https://picsum.photos/seed/elastic/800/600"
    interaction="drag"
    tilt={16}
    shading={1}
  />
</div>`,
  code,
  css,
  tailwind,
  tsCode,
  tsTailwind
};
