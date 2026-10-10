import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PropTable from '../../components/common/Preview/PropTable';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import useComponentProps from '../../hooks/useComponentProps';

import AeroShards from '@/content/Backgrounds/AeroShards/AeroShards';
import { aeroShards } from '../../constants/code/Backgrounds/aeroShardsCode';
import BackgroundContent from '@/components/common/Preview/BackgroundContent';

const DEFAULT_PROPS = {
  backgroundColor: '#120F17',
  shardColor: '#896ABD',
  accentColor: '#A855F7',
  placement: 'full',
  flow: 'stream',
  material: 'pearl',
  detail: 'balanced',
  effect: 'none',
  scale: 1,
  spread: 1,
  depth: 1,
  speed: 1,
  spin: 1,
  interaction: 'repel',
  density: 1.5,
  shardSize: 1.1,
  stretch: 1,
  turbulence: 1,
  glow: 1,
  edgeSoftness: 2,
  bloom: 0.5,
  grain: 0.05,
  chromaticAberration: 0.0075,
  transitionDuration: 1,
  interactionRadius: 1.5,
  interactionStrength: 0.5,
  rippleIntensity: 1,
  holdToGather: true,
  paused: false
};

const AeroShardsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      {
        name: 'backgroundColor',
        type: 'string',
        default: "'#120F17'",
        description: 'Background behind the wind sculpture. Lighting and bloom adapt automatically to light surfaces.'
      },
      {
        name: 'shardColor',
        type: 'string',
        default: "'#896ABD'",
        description: 'Primary body color for the shards.'
      },
      {
        name: 'accentColor',
        type: 'string',
        default: "'#A855F7'",
        description: 'Accent color used to derive reflections, depth, and highlights.'
      },
      {
        name: 'placement',
        type: "'right' | 'left' | 'center' | 'full'",
        default: "'full'",
        description: 'Places the sculpture while preserving a content-safe region.'
      },
      {
        name: 'material',
        type: "'pearl' | 'chrome' | 'satin'",
        default: "'pearl'",
        description: 'Applies a complete lighting and surface finish.'
      },
      {
        name: 'detail',
        type: "'bold' | 'balanced' | 'fine'",
        default: "'balanced'",
        description: 'Balances shard count and size into a finished visual texture.'
      },
      {
        name: 'flow',
        type: "'stream' | 'vortex' | 'ribbon'",
        default: "'stream'",
        description:
          'Morphs the same shards between a flowing stream, circulating vortex, and twisted ribbon without restarting the animation.'
      },
      {
        name: 'rippleIntensity',
        type: 'number',
        default: '1',
        description:
          'Strength of the click/release wave and its accent-colored illumination. Set to 0 to disable ripples.'
      },
      {
        name: 'holdToGather',
        type: 'boolean',
        default: 'true',
        description:
          'Press and hold to gather a softly circulating cloud around the cursor; release to unfurl. Respects interaction="none", pause, and reduced motion.'
      },
      {
        name: 'effect',
        type: "'none' | 'dither' | 'ascii'",
        default: "'none'",
        description:
          'Applies ordered color dithering or compact, shape-matched ASCII before postprocessing. Stylized modes use fewer, larger shards for readability; none preserves the original render.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '1',
        description: 'Zooms the complete shard field without changing its shard count or individual shard size.'
      },
      {
        name: 'spread',
        type: 'number',
        default: '1',
        description: 'Controls how tightly the shards gather around the flow path.'
      },
      {
        name: 'depth',
        type: 'number',
        default: '1',
        description: 'Controls front-to-back volume and perspective variation.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '1',
        description: 'Controls the shared travel speed of every shard.'
      },
      {
        name: 'spin',
        type: 'number',
        default: '1',
        description: 'Controls how quickly shards roll around their direction of travel.'
      },
      {
        name: 'interaction',
        type: "'none' | 'repel' | 'attract'",
        default: "'repel'",
        description:
          'Disables interaction or enables damped cursor repulsion/attraction and click ripples across the field.'
      },
      {
        name: 'density',
        type: 'number',
        default: '1.5',
        description: 'Fine-tuning multiplier for the shard count selected by detail.'
      },
      {
        name: 'shardSize',
        type: 'number',
        default: '1.1',
        description: 'Fine-tuning multiplier for the shard size selected by detail.'
      },
      {
        name: 'stretch',
        type: 'number',
        default: '1',
        description: 'Controls shard length without changing their overall count.'
      },
      {
        name: 'turbulence',
        type: 'number',
        default: '1',
        description: 'Fine-tuning multiplier for the turbulence produced by motion.'
      },
      {
        name: 'glow',
        type: 'number',
        default: '1',
        description: 'Fine-tuning multiplier for emissive edges and reflected highlights.'
      },
      {
        name: 'edgeSoftness',
        type: 'number',
        default: '2',
        description: 'Controls analytic antialiasing without blurring the whole image.'
      },
      {
        name: 'bloom',
        type: 'number',
        default: '0.5',
        description:
          'Adds a soft halo without blurring the shards; on light backgrounds the halo uses the shard and accent colors.'
      },
      {
        name: 'grain',
        type: 'number',
        default: '0.05',
        description: 'Adds screen-space film grain; set to 0 for a completely clean render.'
      },
      {
        name: 'chromaticAberration',
        type: 'number',
        default: '0.0075',
        description:
          'Adds RGB edge separation; set to 0 for a color-neutral finish. Dither and ASCII use subtler separation to preserve their fine patterns.'
      },
      {
        name: 'transitionDuration',
        type: 'number',
        default: '1',
        description: 'Controls the transition time for placement and flow formation changes.'
      },
      {
        name: 'interactionRadius',
        type: 'number',
        default: '1.5',
        description: 'Scales the soft, flow-aligned reach of the cursor interaction.'
      },
      {
        name: 'interactionStrength',
        type: 'number',
        default: '0.5',
        description: 'Fine-tuning multiplier for the selected interaction force.'
      },
      { name: 'paused', type: 'boolean', default: 'false', description: 'Freezes the shard field.' },
      { name: 'className', type: 'string', default: "''", description: 'Additional classes for the root element.' },
      {
        name: 'onError',
        type: '(error: Error) => void',
        default: 'undefined',
        description: 'Called when WebGPU setup or rendering fails.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <AeroShards {...props} onError={error => console.error('[AeroShards]', error)} />

            <BackgroundContent headline="Don't touch them, they are pretty sharp!" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton backgroundId="aero-shards" currentProps={props} defaultProps={DEFAULT_PROPS} />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom
              title="Background"
              color={props.backgroundColor}
              onChange={value => updateProp('backgroundColor', value)}
            />
            <PreviewColorPickerCustom
              title="Shards"
              color={props.shardColor}
              onChange={value => updateProp('shardColor', value)}
            />
            <PreviewColorPickerCustom
              title="Accent"
              color={props.accentColor}
              onChange={value => updateProp('accentColor', value)}
            />
            <PreviewSelect
              title="Placement"
              value={props.placement}
              options={['right', 'left', 'center', 'full']}
              onChange={value => updateProp('placement', value)}
            />
            <PreviewSelect
              title="Material"
              value={props.material}
              options={['pearl', 'chrome', 'satin']}
              onChange={value => updateProp('material', value)}
            />
            <PreviewSelect
              title="Detail"
              value={props.detail}
              options={['bold', 'balanced', 'fine']}
              onChange={value => updateProp('detail', value)}
            />
            <PreviewSelect
              title="Flow"
              value={props.flow}
              options={['stream', 'vortex', 'ribbon']}
              onChange={value => updateProp('flow', value)}
            />
            <PreviewSelect
              title="Effect"
              value={props.effect}
              options={['none', 'dither', { value: 'ascii', label: 'ASCII' }]}
              onChange={value => updateProp('effect', value)}
            />
            <PreviewSelect
              title="Interaction"
              value={props.interaction}
              options={['none', 'repel', 'attract']}
              onChange={value => updateProp('interaction', value)}
            />
            <PreviewSlider
              title="Scale"
              min={0.5}
              max={2.5}
              step={0.05}
              value={props.scale}
              onChange={value => updateProp('scale', value)}
            />
            <PreviewSlider
              title="Spread"
              min={0.15}
              max={1.1}
              step={0.05}
              value={props.spread}
              onChange={value => updateProp('spread', value)}
            />
            <PreviewSlider
              title="Depth"
              min={0}
              max={1.25}
              step={0.05}
              value={props.depth}
              onChange={value => updateProp('depth', value)}
            />
            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={props.speed}
              onChange={value => updateProp('speed', value)}
            />
            <PreviewSlider
              title="Spin"
              min={0}
              max={2}
              step={0.05}
              value={props.spin}
              onChange={value => updateProp('spin', value)}
            />
            <PreviewSlider
              title="Density"
              min={0.5}
              max={1.5}
              step={0.05}
              value={props.density}
              onChange={value => updateProp('density', value)}
            />
            <PreviewSlider
              title="Shard Size"
              min={0.5}
              max={1.5}
              step={0.05}
              value={props.shardSize}
              onChange={value => updateProp('shardSize', value)}
            />
            <PreviewSlider
              title="Stretch"
              min={0.6}
              max={1.8}
              step={0.05}
              value={props.stretch}
              onChange={value => updateProp('stretch', value)}
            />
            <PreviewSlider
              title="Turbulence"
              min={0}
              max={2}
              step={0.05}
              value={props.turbulence}
              onChange={value => updateProp('turbulence', value)}
            />
            <PreviewSlider
              title="Glow"
              min={0}
              max={2}
              step={0.05}
              value={props.glow}
              onChange={value => updateProp('glow', value)}
            />
            <PreviewSlider
              title="Edge Softness"
              min={0}
              max={2}
              step={0.05}
              value={props.edgeSoftness}
              onChange={value => updateProp('edgeSoftness', value)}
            />
            <PreviewSlider
              title="Bloom"
              min={0}
              max={3}
              step={0.05}
              value={props.bloom}
              onChange={value => updateProp('bloom', value)}
            />
            <PreviewSlider
              title="Grain"
              min={0}
              max={0.12}
              step={0.0025}
              value={props.grain}
              onChange={value => updateProp('grain', value)}
            />
            <PreviewSlider
              title="Chromatic Aberration"
              min={0}
              max={0.01}
              step={0.0005}
              value={props.chromaticAberration}
              onChange={value => updateProp('chromaticAberration', value)}
            />
            <PreviewSlider
              title="Transition Duration"
              min={0.2}
              max={2}
              step={0.05}
              value={props.transitionDuration}
              onChange={value => updateProp('transitionDuration', value)}
            />
            <PreviewSlider
              title="Interaction Radius"
              min={0.5}
              max={2}
              step={0.05}
              value={props.interactionRadius}
              onChange={value => updateProp('interactionRadius', value)}
            />
            <PreviewSlider
              title="Interaction Strength"
              min={0}
              max={2}
              step={0.05}
              value={props.interactionStrength}
              onChange={value => updateProp('interactionStrength', value)}
            />
            <PreviewSlider
              title="Ripple Intensity"
              value={props.rippleIntensity}
              min={0}
              max={2}
              step={0.05}
              onChange={value => updateProp('rippleIntensity', value)}
            />
            <PreviewSwitch
              title="Hold to Gather"
              isChecked={props.holdToGather}
              onChange={value => updateProp('holdToGather', value)}
            />
            <PreviewSwitch title="Paused" isChecked={props.paused} onChange={value => updateProp('paused', value)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['vgpu']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={aeroShards} componentName="AeroShards" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default AeroShardsDemo;
