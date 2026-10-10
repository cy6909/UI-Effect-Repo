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

import LightTunnel from '@/content/Backgrounds/LightTunnel/LightTunnel';
import { lightTunnel } from '../../constants/code/Backgrounds/lightTunnelCode';

const DEFAULT_PROPS = {
  cableColor: '#A855F7',
  pulseColor: '#A855F7',
  tunnelColor: '#5227FF',
  tunnelOpacity: 0,
  speed: 0.1,
  flowDirection: 'outward',
  pulseSpeed: 2,
  pulseLength: 0.28,
  pulseBlend: 1,
  pulseWidth: 1,
  cableCount: 20,
  thickness: 0.35,
  rimWidth: 0.15,
  waviness: 0.3,
  sway: 0.5,
  size: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  glow: 1.0,
  fadeNear: 0.5,
  fadeFar: 2,
  brightness: 1.0,
  colorVariance: true,
  grain: true,
  grainIntensity: 0.05,
  opacity: 1.0,
  mouseInteraction: true,
  mouseStrength: 0.1
};

const LightTunnelDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    cableColor,
    pulseColor,
    tunnelColor,
    tunnelOpacity,
    speed,
    flowDirection,
    pulseSpeed,
    pulseLength,
    pulseBlend,
    pulseWidth,
    cableCount,
    thickness,
    rimWidth,
    waviness,
    sway,
    size,
    centerX,
    centerY,
    glow,
    fadeNear,
    fadeFar,
    brightness,
    colorVariance,
    grain,
    grainIntensity,
    opacity,
    mouseInteraction,
    mouseStrength
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'cableColor',
        type: 'string',
        default: "'#A855F7'",
        description: 'Base color of the fibre-optic cables.'
      },
      {
        name: 'pulseColor',
        type: 'string',
        default: "'#A855F7'",
        description: 'Color of the light pulses travelling along each cable.'
      },
      {
        name: 'tunnelColor',
        type: 'string',
        default: "'#5227FF'",
        description: 'Tint color of the cable body fill (visible when tunnelOpacity is above 0).'
      },
      {
        name: 'tunnelOpacity',
        type: 'number',
        default: '0',
        description: 'Opacity of the cable body fill. 0 leaves the tunnel see-through so only rims and pulses show.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.1',
        description: 'Overall scroll speed of the pulses down the tunnel.'
      },
      {
        name: 'flowDirection',
        type: "'inward' | 'outward'",
        default: "'outward'",
        description: 'Whether the light travels toward or away from the vanishing point.'
      },
      {
        name: 'pulseSpeed',
        type: 'number',
        default: '2',
        description: 'Speed multiplier for the individual light pulses.'
      },
      {
        name: 'pulseLength',
        type: 'number',
        default: '0.28',
        description: 'Length of the glowing pulse along each cable.'
      },
      {
        name: 'pulseBlend',
        type: 'number',
        default: '1',
        description: 'How softly the pulse fades out at its edges — low is a crisp packet, high is a long smooth trail.'
      },
      {
        name: 'pulseWidth',
        type: 'number',
        default: '1',
        description:
          'How much of the cable cross-section the pulse lights up — 1 fills the cable, lower narrows it to a filament.'
      },
      {
        name: 'cableCount',
        type: 'number',
        default: '20',
        description: 'Number of cables radiating around the tunnel.'
      },
      {
        name: 'thickness',
        type: 'number',
        default: '0.35',
        description: 'Thickness of each cable core.'
      },
      {
        name: 'rimWidth',
        type: 'number',
        default: '0.15',
        description: 'Width of the soft outline glow around each cable.'
      },
      {
        name: 'waviness',
        type: 'number',
        default: '0.3',
        description: 'Amount of wavy distortion applied along the tunnel depth.'
      },
      {
        name: 'sway',
        type: 'number',
        default: '0.5',
        description: 'Strength of the gentle rotational sway of the tunnel.'
      },
      {
        name: 'size',
        type: 'number',
        default: '1.0',
        description: 'Zoom / scale of the tunnel field.'
      },
      {
        name: 'centerX',
        type: 'number',
        default: '0.0',
        description: 'Horizontal offset of the vanishing point.'
      },
      {
        name: 'centerY',
        type: 'number',
        default: '0.0',
        description: 'Vertical offset of the vanishing point.'
      },
      {
        name: 'glow',
        type: 'number',
        default: '1.0',
        description: 'Intensity of the cable rim glow.'
      },
      {
        name: 'fadeNear',
        type: 'number',
        default: '0.5',
        description: 'Radius over which the tunnel fades in near the center.'
      },
      {
        name: 'fadeFar',
        type: 'number',
        default: '2',
        description: 'Radius at which the tunnel fades out toward the edges.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description: 'Overall brightness multiplier of the effect.'
      },
      {
        name: 'colorVariance',
        type: 'boolean',
        default: 'true',
        description: 'Adds subtle per-cable color variation so cables are not uniform.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Adds a whisper-subtle animated film grain to break up banding in the gradients.'
      },
      {
        name: 'grainIntensity',
        type: 'number',
        default: '0.05',
        description: 'Amplitude of the grain overlay. 0 disables it entirely.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Global opacity of the rendered tunnel.'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enables gentle parallax of the vanishing point toward the pointer.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '0.1',
        description: 'Magnitude of the cursor parallax drift.'
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
            <LightTunnel
              key={key}
              cableColor={cableColor}
              pulseColor={pulseColor}
              tunnelColor={tunnelColor}
              tunnelOpacity={tunnelOpacity}
              speed={speed}
              flowDirection={flowDirection}
              pulseSpeed={pulseSpeed}
              pulseLength={pulseLength}
              pulseBlend={pulseBlend}
              pulseWidth={pulseWidth}
              cableCount={cableCount}
              thickness={thickness}
              rimWidth={rimWidth}
              waviness={waviness}
              sway={sway}
              size={size}
              centerX={centerX}
              centerY={centerY}
              glow={glow}
              fadeNear={fadeNear}
              fadeFar={fadeFar}
              brightness={brightness}
              colorVariance={colorVariance}
              grain={grain}
              grainIntensity={grainIntensity}
              opacity={opacity}
              mouseInteraction={mouseInteraction}
              mouseStrength={mouseStrength}
            />
            <BackgroundContent pillText="New Background" headline="A fibre-optic tunnel of travelling light." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="light-tunnel"
              currentProps={{
                cableColor,
                pulseColor,
                tunnelColor,
                tunnelOpacity,
                speed,
                flowDirection,
                pulseSpeed,
                pulseLength,
                pulseBlend,
                pulseWidth,
                cableCount,
                thickness,
                rimWidth,
                waviness,
                sway,
                size,
                centerX,
                centerY,
                glow,
                fadeNear,
                fadeFar,
                brightness,
                colorVariance,
                grain,
                grainIntensity,
                opacity,
                mouseInteraction,
                mouseStrength
              }}
              defaultProps={{
                cableColor: '#A855F7',
                pulseColor: '#A855F7',
                tunnelColor: '#5227FF',
                tunnelOpacity: 0,
                speed: 0.1,
                flowDirection: 'outward',
                pulseSpeed: 2,
                pulseLength: 0.28,
                pulseBlend: 1,
                pulseWidth: 1,
                cableCount: 20,
                thickness: 0.35,
                rimWidth: 0.15,
                waviness: 0.3,
                sway: 0.5,
                size: 1.0,
                centerX: 0.0,
                centerY: 0.0,
                glow: 1.0,
                fadeNear: 0.5,
                fadeFar: 2,
                brightness: 1.0,
                colorVariance: true,
                grain: true,
                grainIntensity: 0.05,
                opacity: 1.0,
                mouseInteraction: true,
                mouseStrength: 0.1
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom
              title="Cable Color"
              color={cableColor}
              onChange={val => updateProp('cableColor', val)}
            />
            <PreviewColorPickerCustom
              title="Pulse Color"
              color={pulseColor}
              onChange={val => updateProp('pulseColor', val)}
            />
            <PreviewColorPickerCustom
              title="Tunnel Color"
              color={tunnelColor}
              onChange={val => updateProp('tunnelColor', val)}
            />
            <PreviewSlider
              title="Tunnel Opacity"
              min={0}
              max={1}
              step={0.01}
              value={tunnelOpacity}
              onChange={val => updateProp('tunnelOpacity', val)}
            />

            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSelect
              title="Flow Direction"
              name="light-tunnel-flow"
              width={140}
              value={flowDirection}
              options={[
                { label: 'Inward', value: 'inward' },
                { label: 'Outward', value: 'outward' }
              ]}
              onChange={val => updateProp('flowDirection', val)}
            />

            <PreviewSlider
              title="Pulse Speed"
              min={0}
              max={3}
              step={0.05}
              value={pulseSpeed}
              onChange={val => updateProp('pulseSpeed', val)}
            />

            <PreviewSlider
              title="Pulse Length"
              min={0.02}
              max={0.5}
              step={0.01}
              value={pulseLength}
              onChange={val => updateProp('pulseLength', val)}
            />

            <PreviewSlider
              title="Pulse Blend"
              min={0}
              max={1}
              step={0.01}
              value={pulseBlend}
              onChange={val => updateProp('pulseBlend', val)}
            />

            <PreviewSlider
              title="Pulse Width"
              min={0.1}
              max={1}
              step={0.01}
              value={pulseWidth}
              onChange={val => updateProp('pulseWidth', val)}
            />

            <PreviewSlider
              title="Cable Count"
              min={10}
              max={80}
              step={1}
              value={cableCount}
              onChange={val => updateProp('cableCount', val)}
            />

            <PreviewSlider
              title="Thickness"
              min={0.1}
              max={1}
              step={0.01}
              value={thickness}
              onChange={val => updateProp('thickness', val)}
            />

            <PreviewSlider
              title="Rim Width"
              min={0}
              max={1}
              step={0.01}
              value={rimWidth}
              onChange={val => updateProp('rimWidth', val)}
            />

            <PreviewSlider
              title="Waviness"
              min={0}
              max={1}
              step={0.01}
              value={waviness}
              onChange={val => updateProp('waviness', val)}
            />

            <PreviewSlider
              title="Sway"
              min={0}
              max={1}
              step={0.01}
              value={sway}
              onChange={val => updateProp('sway', val)}
            />

            <PreviewSlider
              title="Size"
              min={0.3}
              max={3}
              step={0.05}
              value={size}
              onChange={val => updateProp('size', val)}
            />

            <PreviewSlider
              title="Center Offset X"
              min={-1}
              max={1}
              step={0.01}
              value={centerX}
              onChange={val => updateProp('centerX', val)}
            />

            <PreviewSlider
              title="Center Offset Y"
              min={-1}
              max={1}
              step={0.01}
              value={centerY}
              onChange={val => updateProp('centerY', val)}
            />

            <PreviewSlider
              title="Glow"
              min={0}
              max={3}
              step={0.05}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />

            <PreviewSlider
              title="Fade Near"
              min={0.01}
              max={0.6}
              step={0.01}
              value={fadeNear}
              onChange={val => updateProp('fadeNear', val)}
            />

            <PreviewSlider
              title="Fade Far"
              min={0.9}
              max={2.5}
              step={0.05}
              value={fadeFar}
              onChange={val => updateProp('fadeFar', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0}
              max={2.5}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSwitch
              title="Color Variance"
              isChecked={colorVariance}
              onChange={val => updateProp('colorVariance', val)}
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
              title="Opacity"
              min={0}
              max={1}
              step={0.01}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
            />

            <PreviewSwitch
              title="Cursor Parallax"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSlider
              title="Cursor Strength"
              min={0}
              max={0.4}
              step={0.01}
              value={mouseStrength}
              onChange={val => updateProp('mouseStrength', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={lightTunnel} componentName="LightTunnel" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default LightTunnelDemo;
