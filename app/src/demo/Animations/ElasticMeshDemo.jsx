import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import { Flex, Text } from '@chakra-ui/react';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import ElasticMesh from '../../content/Animations/ElasticMesh/ElasticMesh';
import { elasticMesh } from '../../constants/code/Animations/elasticMeshCode';

const propData = [
  {
    name: 'image',
    type: 'string',
    default: "''",
    description: 'Optional image URL to warp. When empty, a color gradient surface is rendered instead.'
  },
  { name: 'color1', type: 'string', default: '#5227FF', description: 'Top color of the gradient surface.' },
  { name: 'color2', type: 'string', default: '#B19EEF', description: 'Bottom color of the gradient surface.' },
  { name: 'showGrid', type: 'boolean', default: 'true', description: 'Draw the mesh lattice over the surface.' },
  { name: 'gridDensity', type: 'number', default: '20', description: 'Number of lattice cells across the sheet.' },
  { name: 'gridOpacity', type: 'number', default: '0.28', description: 'Opacity of the lattice lines.' },
  { name: 'gridColor', type: 'string', default: '#ffffff', description: 'Color of the lattice lines.' },
  {
    name: 'highlight',
    type: 'string',
    default: '#ffffff',
    description: 'Specular highlight color used by the shading.'
  },
  { name: 'borderRadius', type: 'number', default: '25', description: 'Corner radius of the sheet in pixels.' },
  {
    name: 'stiffness',
    type: 'number',
    default: '0.05',
    description: 'How hard the mesh springs back to flat. Higher settles faster.'
  },
  {
    name: 'damping',
    type: 'number',
    default: '0.2',
    description: 'How quickly wobbles die out. Higher damping settles faster with fewer oscillations.'
  },
  {
    name: 'grabRadius',
    type: 'number',
    default: '0.6',
    description: 'How much of the sheet the pointer grabs (fraction of the surface).'
  },
  { name: 'pull', type: 'number', default: '0.4', description: 'How far the surface stretches toward the pointer.' },
  {
    name: 'wobble',
    type: 'number',
    default: '5',
    description: 'Neighbor coupling — higher spreads the deformation into more visible ripples.'
  },
  { name: 'tilt', type: 'number', default: '14', description: 'Perspective tilt of the sheet in degrees.' },
  {
    name: 'shading',
    type: 'number',
    default: '0.5',
    description: 'Fake lighting strength that gives the warp depth. Keep above 0 to read the deformation.'
  },
  { name: 'resolution', type: 'number', default: '25', description: 'Mesh grid density (nodes per side).' },
  {
    name: 'interaction',
    type: '"hover" | "drag"',
    default: '"hover"',
    description: 'Whether the mesh reacts to hover or only while dragging.'
  },
  { name: 'enabled', type: 'boolean', default: 'true', description: 'Enables or disables the pointer interaction.' },
  { name: 'className', type: 'string', default: "''", description: 'Additional class names for the container.' },
  { name: 'style', type: 'object', default: '—', description: 'Inline styles for the container.' }
];

const DEFAULT_PROPS = {
  showImage: true,
  color1: '#5227FF',
  color2: '#B19EEF',
  showGrid: true,
  gridDensity: 20,
  gridOpacity: 0.28,
  gridColor: '#ffffff',
  highlight: '#ffffff',
  borderRadius: 25,
  stiffness: 0.05,
  damping: 0.2,
  grabRadius: 0.6,
  pull: 0.4,
  wobble: 5,
  tilt: 14,
  shading: 0.5,
  resolution: 25,
  interaction: 'hover',
  enabled: true
};

const ElasticMeshDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    showImage,
    color1,
    color2,
    showGrid,
    gridDensity,
    gridOpacity,
    gridColor,
    highlight,
    borderRadius,
    stiffness,
    damping,
    grabRadius,
    pull,
    wobble,
    tilt,
    shading,
    resolution,
    interaction,
    enabled
  } = props;
  const [key, forceRerender] = useForceRerender();

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={['showImage']}
      computedProps={{ image: showImage ? 'https://picsum.photos/seed/elastic/900/600' : '' }}
    >
      <TabsLayout>
        <PreviewTab>
          <Flex direction="column" position="relative" className="demo-container" h={460} p={6} overflow="hidden">
            <ElasticMesh
              key={key}
              image={showImage ? 'https://picsum.photos/seed/elastic/900/600' : ''}
              color1={color1}
              color2={color2}
              showGrid={showGrid}
              gridDensity={gridDensity}
              gridOpacity={gridOpacity}
              gridColor={gridColor}
              highlight={highlight}
              borderRadius={borderRadius}
              stiffness={stiffness}
              damping={damping}
              grabRadius={grabRadius}
              pull={pull}
              wobble={wobble}
              tilt={tilt}
              shading={shading}
              resolution={resolution}
              interaction={interaction}
              enabled={enabled}
            />
            <Text
              position="absolute"
              bottom={3}
              left={0}
              right={0}
              textAlign="center"
              fontSize="sm"
              className="demo-instruction"
            >
              {interaction === 'drag' ? 'Click and drag across the sheet.' : 'Move your cursor across the sheet.'}
            </Text>
          </Flex>

          <Customize>
            <PreviewSwitch title="Use Image" isChecked={showImage} onChange={val => updateProp('showImage', val)} />
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom
              title="Grid Color"
              color={gridColor}
              onChange={val => updateProp('gridColor', val)}
            />
            <PreviewSwitch title="Show Grid" isChecked={showGrid} onChange={val => updateProp('showGrid', val)} />
            <PreviewSlider
              title="Grid Density"
              min={4}
              max={40}
              step={1}
              value={gridDensity}
              onChange={val => updateProp('gridDensity', val)}
            />
            <PreviewSlider
              title="Grid Opacity"
              min={0}
              max={1}
              step={0.01}
              value={gridOpacity}
              onChange={val => updateProp('gridOpacity', val)}
            />
            <PreviewColorPickerCustom
              title="Highlight"
              color={highlight}
              onChange={val => updateProp('highlight', val)}
            />

            <PreviewSlider
              title="Stiffness"
              min={0.02}
              max={0.15}
              step={0.005}
              value={stiffness}
              onChange={val => updateProp('stiffness', val)}
              width={200}
            />
            <PreviewSlider
              title="Damping"
              min={0.03}
              max={0.25}
              step={0.01}
              value={damping}
              onChange={val => updateProp('damping', val)}
              width={200}
            />
            <PreviewSlider
              title="Grab Radius"
              min={0.15}
              max={0.8}
              step={0.01}
              value={grabRadius}
              onChange={val => updateProp('grabRadius', val)}
              width={200}
            />
            <PreviewSlider
              title="Pull"
              min={0}
              max={1}
              step={0.02}
              value={pull}
              onChange={val => updateProp('pull', val)}
              width={200}
            />
            <PreviewSlider
              title="Wobble"
              min={0}
              max={8}
              step={1}
              value={wobble}
              onChange={val => updateProp('wobble', val)}
              width={200}
            />

            <PreviewSlider
              title="Tilt"
              min={0}
              max={32}
              step={1}
              value={tilt}
              valueUnit="°"
              onChange={val => updateProp('tilt', val)}
              width={200}
            />
            <PreviewSlider
              title="Shading"
              min={0}
              max={1.5}
              step={0.05}
              value={shading}
              onChange={val => updateProp('shading', val)}
              width={200}
            />
            <PreviewSlider
              title="Border Radius"
              min={0}
              max={80}
              step={1}
              value={borderRadius}
              valueUnit="px"
              onChange={val => updateProp('borderRadius', val)}
              width={200}
            />
            <PreviewSlider
              title="Resolution"
              min={10}
              max={36}
              step={1}
              value={resolution}
              onChange={val => {
                updateProp('resolution', val);
                forceRerender();
              }}
              width={200}
            />

            <PreviewSelect
              title="Interaction"
              options={[
                { label: 'Hover', value: 'hover' },
                { label: 'Drag', value: 'drag' }
              ]}
              value={interaction}
              onChange={val => updateProp('interaction', val)}
              width={120}
            />
            <PreviewSwitch title="Enabled" isChecked={enabled} onChange={val => updateProp('enabled', val)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={elasticMesh} componentName="ElasticMesh" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ElasticMeshDemo;
