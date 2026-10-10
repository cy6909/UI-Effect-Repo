import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';

import useForceRerender from '../../hooks/useForceRerender';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import SlicedWaves from '@/content/Backgrounds/SlicedWaves/SlicedWaves';
import { slicedWaves } from '../../constants/code/Backgrounds/slicedWavesCode';

const DEFAULT_PROPS = {
  color1: '#FF9FFC',
  color2: '#5227FF',
  color3: '#B497CF',
  columns: 14,
  rows: 8,
  barThickness: 0.1,
  speed: 0.35,
  travel: 0.7,
  waveSpread: 0.9,
  rowOffset: 1.0,
  softness: 0.05,
  glow: 0,
  brightness: 1.0,
  contrast: 1.0,
  opacity: 0.5,
  orientation: 'horizontal',
  alternate: false,
  mouseInteraction: true,
  mouseStrength: 1,
  mouseRadius: 0.3,
  grain: true,
  grainIntensity: 0.05
};

const SlicedWavesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    color3,
    columns,
    rows,
    barThickness,
    speed,
    travel,
    waveSpread,
    rowOffset,
    softness,
    glow,
    brightness,
    contrast,
    opacity,
    orientation,
    alternate,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    grain,
    grainIntensity
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'color1',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Highlight color for bars at the top of their travel.'
      },
      {
        name: 'color2',
        type: 'string',
        default: "'#5227FF'",
        description: 'Deep color for bars at the bottom of their travel.'
      },
      {
        name: 'color3',
        type: 'string',
        default: "'#B497CF'",
        description: 'Accent tint blended across the grid.'
      },
      {
        name: 'columns',
        type: 'number',
        default: '14',
        description: 'Number of grid columns.'
      },
      {
        name: 'rows',
        type: 'number',
        default: '8',
        description: 'Number of grid rows.'
      },
      {
        name: 'barThickness',
        type: 'number',
        default: '0.1',
        description: 'Thickness of each bar relative to its cell.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.35',
        description: 'Animation speed of the travelling wave.'
      },
      {
        name: 'travel',
        type: 'number',
        default: '0.7',
        description: 'How far each bar moves within its cell.'
      },
      {
        name: 'waveSpread',
        type: 'number',
        default: '0.9',
        description: 'Phase step between columns; controls how tight the wave is.'
      },
      {
        name: 'rowOffset',
        type: 'number',
        default: '1.0',
        description: 'Per-row phase offset that staggers the bars.'
      },
      {
        name: 'softness',
        type: 'number',
        default: '0.05',
        description: 'Edge softness; higher values turn bars into glowing bands.'
      },
      {
        name: 'glow',
        type: 'number',
        default: '0',
        description: 'Soft halo emitted around each bar.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description: 'Overall brightness of the bars.'
      },
      {
        name: 'contrast',
        type: 'number',
        default: '1.0',
        description: 'Color contrast applied to the final render.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '0.5',
        description: 'Overall opacity of the effect.'
      },
      {
        name: 'orientation',
        type: 'string',
        default: "'horizontal'",
        description: "Bar orientation: 'horizontal' slats move vertically, 'vertical' slats move horizontally."
      },
      {
        name: 'alternate',
        type: 'boolean',
        default: 'false',
        description: 'Reverse the travel direction on alternating rows.'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enable cursor-proximity brightening and thickening.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '1',
        description: 'Strength of the cursor-proximity response.'
      },
      {
        name: 'mouseRadius',
        type: 'number',
        default: '0.3',
        description: 'Radius of the cursor influence falloff.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Adds a subtle animated grain.'
      },
      {
        name: 'grainIntensity',
        type: 'number',
        default: '0.05',
        description: 'Amplitude of the grain overlay. 0 disables it entirely.'
      },
      {
        name: 'className',
        type: 'string',
        default: "''",
        description: 'Additional CSS classes applied to the container.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <SlicedWaves
              key={key}
              color1={color1}
              color2={color2}
              color3={color3}
              columns={columns}
              rows={rows}
              barThickness={barThickness}
              speed={speed}
              travel={travel}
              waveSpread={waveSpread}
              rowOffset={rowOffset}
              softness={softness}
              glow={glow}
              brightness={brightness}
              contrast={contrast}
              opacity={opacity}
              orientation={orientation}
              alternate={alternate}
              mouseInteraction={mouseInteraction}
              mouseStrength={mouseStrength}
              mouseRadius={mouseRadius}
              grain={grain}
              grainIntensity={grainIntensity}
            />
            <BackgroundContent pillText="New Background" headline="A soft slatted wave rippling across the grid." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="sliced-waves"
              currentProps={{
                color1,
                color2,
                color3,
                columns,
                rows,
                barThickness,
                speed,
                travel,
                waveSpread,
                rowOffset,
                softness,
                glow,
                brightness,
                contrast,
                opacity,
                orientation,
                alternate,
                mouseInteraction,
                mouseStrength,
                mouseRadius,
                grain,
                grainIntensity
              }}
              defaultProps={{
                color1: '#FF9FFC',
                color2: '#5227FF',
                color3: '#B497CF',
                columns: 14,
                rows: 8,
                barThickness: 0.1,
                speed: 0.35,
                travel: 0.7,
                waveSpread: 0.9,
                rowOffset: 1.0,
                softness: 0.05,
                glow: 0,
                brightness: 1.0,
                contrast: 1.0,
                opacity: 0.5,
                orientation: 'horizontal',
                alternate: false,
                mouseInteraction: true,
                mouseStrength: 1,
                mouseRadius: 0.3,
                grain: true,
                grainIntensity: 0.05
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color3} onChange={val => updateProp('color3', val)} />

            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Travel"
              min={0}
              max={1}
              step={0.01}
              value={travel}
              onChange={val => updateProp('travel', val)}
            />

            <PreviewSlider
              title="Wave Spread"
              min={0}
              max={3}
              step={0.05}
              value={waveSpread}
              onChange={val => updateProp('waveSpread', val)}
            />

            <PreviewSlider
              title="Row Offset"
              min={0}
              max={3}
              step={0.05}
              value={rowOffset}
              onChange={val => updateProp('rowOffset', val)}
            />

            <PreviewSlider
              title="Columns"
              min={2}
              max={40}
              step={1}
              value={columns}
              onChange={val => updateProp('columns', val)}
            />

            <PreviewSlider
              title="Rows"
              min={1}
              max={24}
              step={1}
              value={rows}
              onChange={val => updateProp('rows', val)}
            />

            <PreviewSlider
              title="Bar Thickness"
              min={0.05}
              max={0.9}
              step={0.01}
              value={barThickness}
              onChange={val => updateProp('barThickness', val)}
            />

            <PreviewSelect
              title="Orientation"
              name="sliced-waves-orientation"
              width={140}
              value={orientation}
              options={[
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Vertical', value: 'vertical' }
              ]}
              onChange={val => updateProp('orientation', val)}
            />

            <PreviewSlider
              title="Softness"
              min={0}
              max={0.4}
              step={0.005}
              value={softness}
              onChange={val => updateProp('softness', val)}
            />

            <PreviewSlider
              title="Glow"
              min={0}
              max={1}
              step={0.01}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0.2}
              max={2}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSlider
              title="Contrast"
              min={0.2}
              max={2}
              step={0.05}
              value={contrast}
              onChange={val => updateProp('contrast', val)}
            />

            <PreviewSlider
              title="Opacity"
              min={0}
              max={1}
              step={0.05}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
            />

            <PreviewSwitch
              title="Alternate Rows"
              isChecked={alternate}
              onChange={val => updateProp('alternate', val)}
            />

            <PreviewSwitch
              title="Cursor Interaction"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSwitch title="Grain" isChecked={grain} onChange={val => updateProp('grain', val)} />

            <PreviewSlider
              title="Grain Intensity"
              min={0}
              max={0.3}
              step={0.01}
              value={grainIntensity}
              onChange={val => updateProp('grainIntensity', val)}
            />

            <PreviewSlider
              title="Cursor Strength"
              min={0}
              max={2}
              step={0.05}
              value={mouseStrength}
              onChange={val => updateProp('mouseStrength', val)}
            />

            <PreviewSlider
              title="Cursor Radius"
              min={0.05}
              max={1}
              step={0.05}
              value={mouseRadius}
              onChange={val => updateProp('mouseRadius', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={slicedWaves} componentName="SlicedWaves" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SlicedWavesDemo;
