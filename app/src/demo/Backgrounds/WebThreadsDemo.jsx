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

import WebThreads from '@/content/Backgrounds/WebThreads/WebThreads';
import { webThreads } from '../../constants/code/Backgrounds/webThreadsCode';

const DEFAULT_PROPS = {
  color1: '#5227FF',
  color2: '#FF9FFC',
  color3: '#FFFFFF',
  speed: 0.2,
  threadCount: 6,
  frequency: 5.0,
  spread: 0.18,
  taper: 1.0,
  position: 0.5,
  fanMode: 'center',
  glow: 0.02,
  falloff: 0.6,
  thickness: 1.1,
  brightness: 0.6,
  opacity: 1.0,
  mirror: true,
  shimmer: false,
  grain: true,
  grainIntensity: 0.05,
  mouseInteraction: true,
  mouseStrength: 0.3
};

const WebThreadsDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    color3,
    speed,
    threadCount,
    frequency,
    spread,
    taper,
    position,
    fanMode,
    glow,
    falloff,
    thickness,
    brightness,
    opacity,
    mirror,
    shimmer,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    backgroundColor,
    lightMode
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'color1',
        type: 'string',
        default: "'#5227FF'",
        description: 'Color of the first thread; threads blend from this toward color2.'
      },
      {
        name: 'color2',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Color of the last thread; threads blend toward this hue.'
      },
      {
        name: 'color3',
        type: 'string',
        default: "'#FFFFFF'",
        description: 'Hot-core color mixed into the brightest parts of the threads.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.2',
        description: 'Animation speed of the weaving motion.'
      },
      {
        name: 'threadCount',
        type: 'number',
        default: '6',
        description: 'Number of glowing threads (1–10).'
      },
      {
        name: 'frequency',
        type: 'number',
        default: '5.0',
        description: 'Number of sine waves across the screen width.'
      },
      {
        name: 'spread',
        type: 'number',
        default: '0.18',
        description: 'How far the threads fan out away from the pinch point.'
      },
      {
        name: 'taper',
        type: 'number',
        default: '1.0',
        description: 'Per-thread amplitude growth; higher values fan later threads out more.'
      },
      {
        name: 'position',
        type: 'number',
        default: '0.5',
        description: 'Vertical position of the woven strand (0 bottom, 1 top).'
      },
      {
        name: 'fanMode',
        type: 'string',
        default: "'center'",
        description: 'Where the threads pinch together: center, left, or right.'
      },
      {
        name: 'glow',
        type: 'number',
        default: '0.02',
        description: 'Brightness of the glow radiating from each thread.'
      },
      {
        name: 'falloff',
        type: 'number',
        default: '0.6',
        description: 'How tightly the glow hugs the thread (higher = thinner filament).'
      },
      {
        name: 'thickness',
        type: 'number',
        default: '1.1',
        description: 'Core thickness of each thread.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '0.6',
        description: 'Overall brightness multiplier.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Overall opacity of the effect (0–1).'
      },
      {
        name: 'mirror',
        type: 'boolean',
        default: 'true',
        description: 'Mirror the wave phase across the pinch point for a woven look.'
      },
      {
        name: 'shimmer',
        type: 'boolean',
        default: 'false',
        description: 'Add a subtle per-thread phase shimmer.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Overlay a whisper-subtle animated film grain on the threads.'
      },
      {
        name: 'grainIntensity',
        type: 'number',
        default: '0.05',
        description: 'Amplitude of the grain overlay. 0 disables it entirely.'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Let the pinch point drift toward the cursor with a soft brightness bloom.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '0.3',
        description: 'Strength of the cursor influence on the pinch point and bloom.'
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
            <WebThreads
              key={key}
              color1={color1}
              color2={color2}
              color3={color3}
              speed={speed}
              threadCount={threadCount}
              frequency={frequency}
              spread={spread}
              taper={taper}
              position={position}
              fanMode={fanMode}
              glow={glow}
              falloff={falloff}
              thickness={thickness}
              brightness={brightness}
              opacity={opacity}
              mirror={mirror}
              shimmer={shimmer}
              grain={grain}
              grainIntensity={grainIntensity}
              mouseInteraction={mouseInteraction}
              mouseStrength={mouseStrength}
              backgroundColor={backgroundColor}
              lightMode={lightMode}
            />
            <BackgroundContent pillText="New Background" headline="Luminous threads woven to a glowing pinch." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="web-threads"
              currentProps={{
                color1,
                color2,
                color3,
                speed,
                threadCount,
                frequency,
                spread,
                taper,
                position,
                fanMode,
                glow,
                falloff,
                thickness,
                brightness,
                opacity,
                mirror,
                shimmer,
                grain,
                grainIntensity,
                mouseInteraction,
                mouseStrength
              }}
              defaultProps={{
                color1: '#5227FF',
                color2: '#FF9FFC',
                color3: '#FFFFFF',
                speed: 0.2,
                threadCount: 6,
                frequency: 5.0,
                spread: 0.18,
                taper: 1.0,
                position: 0.5,
                fanMode: 'center',
                glow: 0.02,
                falloff: 0.6,
                thickness: 1.1,
                brightness: 0.6,
                opacity: 1.0,
                mirror: true,
                shimmer: false,
                grain: true,
                grainIntensity: 0.05,
                mouseInteraction: true,
                mouseStrength: 0.3
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom title="Core Color" color={color3} onChange={val => updateProp('color3', val)} />

            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Thread Count"
              min={1}
              max={10}
              step={1}
              value={threadCount}
              onChange={val => updateProp('threadCount', val)}
            />

            <PreviewSlider
              title="Frequency"
              min={1}
              max={14}
              step={0.5}
              value={frequency}
              onChange={val => updateProp('frequency', val)}
            />

            <PreviewSlider
              title="Spread"
              min={0}
              max={0.6}
              step={0.01}
              value={spread}
              onChange={val => updateProp('spread', val)}
            />

            <PreviewSlider
              title="Taper"
              min={0}
              max={3}
              step={0.05}
              value={taper}
              onChange={val => updateProp('taper', val)}
            />

            <PreviewSlider
              title="Position"
              min={0}
              max={1}
              step={0.01}
              value={position}
              onChange={val => updateProp('position', val)}
            />

            <PreviewSelect
              title="Fan Mode"
              name="web-threads-fan"
              width={140}
              value={fanMode}
              options={[
                { label: 'Center', value: 'center' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' }
              ]}
              onChange={val => updateProp('fanMode', val)}
            />

            <PreviewSlider
              title="Glow"
              min={0}
              max={0.06}
              step={0.001}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />

            <PreviewSlider
              title="Falloff"
              min={0.3}
              max={1.2}
              step={0.01}
              value={falloff}
              onChange={val => updateProp('falloff', val)}
            />

            <PreviewSlider
              title="Thickness"
              min={0.3}
              max={3}
              step={0.05}
              value={thickness}
              onChange={val => updateProp('thickness', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0}
              max={2.5}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSlider
              title="Opacity"
              min={0}
              max={1}
              step={0.01}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
            />

            <PreviewSwitch title="Mirror" isChecked={mirror} onChange={val => updateProp('mirror', val)} />

            <PreviewSwitch title="Shimmer" isChecked={shimmer} onChange={val => updateProp('shimmer', val)} />

            <PreviewSwitch title="Grain" isChecked={grain} onChange={val => updateProp('grain', val)} />

            <PreviewSlider
              title="Grain Intensity"
              min={0}
              max={0.3}
              step={0.01}
              value={grainIntensity}
              onChange={val => updateProp('grainIntensity', val)}
            />

            <PreviewSwitch
              title="Cursor Light"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSlider
              title="Cursor Strength"
              min={0}
              max={1}
              step={0.01}
              value={mouseStrength}
              onChange={val => updateProp('mouseStrength', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={webThreads} componentName="WebThreads" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default WebThreadsDemo;
