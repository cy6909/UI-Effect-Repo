import { useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';

import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import Dependencies from '../../components/code/Dependencies';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PropTable from '../../components/common/Preview/PropTable';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import useComponentProps from '../../hooks/useComponentProps';
import { useColorModeValue } from '../../components/setup/color-mode';

import GlowCursor from '../../content/Animations/GlowCursor/GlowCursor';
import { glowCursor } from '../../constants/code/Animations/glowCursorCode';

const DEFAULT_PROPS = {
  color: '#67E8F9',
  secondaryColor: '#A78BFA',
  trailLength: 40,
  trailWidth: 8,
  trailTaper: 0.8,
  followSpeed: 0.16,
  glowIntensity: 1.9,
  glowSpread: 1.2,
  hotspot: 0.65,
  brightness: 1.25,
  opacity: 1,
  pulseSpeed: 1.1,
  noiseStrength: 0.035,
  idleFade: true,
  idleTimeout: 700,
  fadeDuration: 900,
  blendMode: 'screen',
  maxDevicePixelRatio: 1.5,
  enabled: true
};

const BLEND_OPTIONS = [
  { value: 'screen', label: 'Screen' },
  { value: 'plus-lighter', label: 'Plus Lighter' },
  { value: 'normal', label: 'Normal' }
];

const GlowCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color,
    secondaryColor,
    trailLength,
    trailWidth,
    trailTaper,
    followSpeed,
    glowIntensity,
    glowSpread,
    hotspot,
    brightness,
    opacity,
    pulseSpeed,
    noiseStrength,
    idleFade,
    idleTimeout,
    fadeDuration,
    blendMode,
    maxDevicePixelRatio,
    enabled
  } = props;
  const renderedBlendMode = useColorModeValue(
    blendMode === DEFAULT_PROPS.blendMode ? 'normal' : blendMode,
    blendMode
  );

  const propData = useMemo(
    () => [
      { name: 'color', type: 'string', default: "'#67E8F9'", description: 'Color at the bright head of the trail.' },
      {
        name: 'secondaryColor',
        type: 'string',
        default: "'#A78BFA'",
        description: 'Color blended into the end of the trail.'
      },
      {
        name: 'trailLength',
        type: 'number',
        default: '40',
        description: 'Number of smoothed points used to build the trail, from 2 to 64.'
      },
      { name: 'trailWidth', type: 'number', default: '8', description: 'Width of the luminous trail core in pixels.' },
      {
        name: 'trailTaper',
        type: 'number',
        default: '0.8',
        description: 'How strongly the trail narrows and dims toward its tail.'
      },
      {
        name: 'followSpeed',
        type: 'number',
        default: '0.16',
        description: 'How quickly the glowing head catches the pointer.'
      },
      {
        name: 'glowIntensity',
        type: 'number',
        default: '1.9',
        description: 'Strength of the soft inverse-square halo around the trail.'
      },
      {
        name: 'glowSpread',
        type: 'number',
        default: '1.2',
        description: 'Distance the outer glow spreads from the trail core.'
      },
      {
        name: 'hotspot',
        type: 'number',
        default: '0.65',
        description: 'Amount of white-hot color added to the brightest part of the trail.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.25',
        description: 'Final luminance multiplier for the shader.'
      },
      { name: 'opacity', type: 'number', default: '1', description: 'Overall trail opacity.' },
      {
        name: 'pulseSpeed',
        type: 'number',
        default: '1.1',
        description: 'Speed of the energy pulse travelling through the trail. Set to 0 to stop it.'
      },
      {
        name: 'noiseStrength',
        type: 'number',
        default: '0.035',
        description: 'Amount of fine animated texture in the glow.'
      },
      {
        name: 'idleFade',
        type: 'boolean',
        default: 'true',
        description: 'Fade the effect when the pointer stops or leaves the container.'
      },
      {
        name: 'idleTimeout',
        type: 'number',
        default: '700',
        description: 'Idle time in milliseconds before fading begins.'
      },
      {
        name: 'fadeDuration',
        type: 'number',
        default: '900',
        description: 'Approximate duration of the idle fade in milliseconds.'
      },
      {
        name: 'blendMode',
        type: "'normal' | 'screen' | 'plus-lighter'",
        default: "'screen'",
        description: 'CSS blend mode used to composite the canvas over its content.'
      },
      {
        name: 'maxDevicePixelRatio',
        type: 'number',
        default: '1.5',
        description: 'Render-resolution cap for balancing sharpness and GPU cost.'
      },
      { name: 'enabled', type: 'boolean', default: 'true', description: 'Enable or fade out the cursor effect.' },
      {
        name: 'children',
        type: 'React.ReactNode',
        default: '—',
        description: 'Optional content rendered beneath the interactive trail.'
      },
      { name: 'className', type: 'string', default: "''", description: 'Additional classes for the container.' },
      { name: 'style', type: 'React.CSSProperties', default: '{}', description: 'Inline styles for the container.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <GlowCursor {...props} blendMode={renderedBlendMode} />
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              className="demo-instruction"
              fontSize="clamp(2rem, 6vw, 3rem)"
              fontWeight={600}
              textAlign="center"
              pointerEvents="none"
              userSelect="none"
            >
              Move Your Cursor
            </Text>
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Head Color" color={color} onChange={value => updateProp('color', value)} />
            <PreviewColorPickerCustom
              title="Tail Color"
              color={secondaryColor}
              onChange={value => updateProp('secondaryColor', value)}
            />
            <PreviewSelect
              title="Blend Mode"
              options={BLEND_OPTIONS}
              value={blendMode}
              onChange={value => updateProp('blendMode', value)}
              width={140}
            />
            <PreviewSlider
              title="Trail Length"
              min={8}
              max={64}
              step={1}
              value={trailLength}
              onChange={value => updateProp('trailLength', value)}
            />
            <PreviewSlider
              title="Trail Width"
              min={2}
              max={24}
              step={1}
              value={trailWidth}
              valueUnit="px"
              onChange={value => updateProp('trailWidth', value)}
            />
            <PreviewSlider
              title="Trail Taper"
              min={0}
              max={1}
              step={0.01}
              value={trailTaper}
              onChange={value => updateProp('trailTaper', value)}
            />
            <PreviewSlider
              title="Follow Speed"
              min={0.03}
              max={0.5}
              step={0.01}
              value={followSpeed}
              onChange={value => updateProp('followSpeed', value)}
            />
            <PreviewSlider
              title="Glow Intensity"
              min={0}
              max={4}
              step={0.05}
              value={glowIntensity}
              onChange={value => updateProp('glowIntensity', value)}
            />
            <PreviewSlider
              title="Glow Spread"
              min={0.1}
              max={3}
              step={0.05}
              value={glowSpread}
              onChange={value => updateProp('glowSpread', value)}
            />
            <PreviewSlider
              title="Hotspot"
              min={0}
              max={1}
              step={0.01}
              value={hotspot}
              onChange={value => updateProp('hotspot', value)}
            />
            <PreviewSlider
              title="Brightness"
              min={0.25}
              max={2.5}
              step={0.05}
              value={brightness}
              onChange={value => updateProp('brightness', value)}
            />
            <PreviewSlider
              title="Opacity"
              min={0.1}
              max={1}
              step={0.01}
              value={opacity}
              onChange={value => updateProp('opacity', value)}
            />
            <PreviewSlider
              title="Pulse Speed"
              min={0}
              max={4}
              step={0.1}
              value={pulseSpeed}
              onChange={value => updateProp('pulseSpeed', value)}
            />
            <PreviewSlider
              title="Noise"
              min={0}
              max={0.25}
              step={0.005}
              value={noiseStrength}
              onChange={value => updateProp('noiseStrength', value)}
            />
            <PreviewSlider
              title="Idle Timeout"
              min={0}
              max={2000}
              step={50}
              value={idleTimeout}
              valueUnit="ms"
              onChange={value => updateProp('idleTimeout', value)}
            />
            <PreviewSlider
              title="Fade Duration"
              min={100}
              max={2500}
              step={50}
              value={fadeDuration}
              valueUnit="ms"
              onChange={value => updateProp('fadeDuration', value)}
            />
            <PreviewSlider
              title="Max DPR"
              min={0.5}
              max={2}
              step={0.25}
              value={maxDevicePixelRatio}
              onChange={value => updateProp('maxDevicePixelRatio', value)}
            />
            <PreviewSwitch title="Idle Fade" isChecked={idleFade} onChange={value => updateProp('idleFade', value)} />
            <PreviewSwitch title="Enabled" isChecked={enabled} onChange={value => updateProp('enabled', value)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={glowCursor} componentName="GlowCursor" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GlowCursorDemo;
