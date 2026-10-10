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

import Scanner from '@/content/Backgrounds/Scanner/Scanner';
import { scanner } from '../../constants/code/Backgrounds/scannerCode';

const DEFAULT_PROPS = {
  color1: '#5227FF',
  color2: '#FF9FFC',
  color3: '#FFFFFF',
  speed: 0.5,
  sweepSpeed: 0.25,
  sweepWidth: 1.6,
  sweepFalloff: 6,
  scale: 1.5,
  frequency: 2,
  ripple: 0.22,
  bandDensity: 11,
  lineSharpness: 5.5,
  glow: 0.22,
  scanDirection: 'vertical',
  colorSpread: 0.7,
  brightness: 1.0,
  contrast: 1.15,
  softness: 1.4,
  vignette: 0.45,
  scanline: true,
  grain: true,
  grainIntensity: 0.05,
  opacity: 1.0,
  mouseInteraction: true,
  mouseRadius: 0.5,
  mouseStrength: 0.5
};

const ScannerDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    color3,
    speed,
    sweepSpeed,
    sweepWidth,
    sweepFalloff,
    scale,
    frequency,
    ripple,
    bandDensity,
    lineSharpness,
    glow,
    scanDirection,
    colorSpread,
    brightness,
    contrast,
    softness,
    vignette,
    scanline,
    grain,
    grainIntensity,
    opacity,
    mouseInteraction,
    mouseRadius,
    mouseStrength
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'color1',
        type: 'string',
        default: "'#5227FF'",
        description: 'Deep violet base color of the scanning field.'
      },
      {
        name: 'color2',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Pink color of the interference bands.'
      },
      {
        name: 'color3',
        type: 'string',
        default: "'#FFFFFF'",
        description: 'White color used for the brightest signal peaks.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.5',
        description: 'Overall animation speed of the signal.'
      },
      {
        name: 'sweepSpeed',
        type: 'number',
        default: '0.25',
        description: 'Rate of the scan band travelling across the field.'
      },
      {
        name: 'sweepWidth',
        type: 'number',
        default: '1.6',
        description: 'Spacing between successive scan bands.'
      },
      {
        name: 'sweepFalloff',
        type: 'number',
        default: '6',
        description: 'How tightly the sweep concentrates; higher values give a narrower band.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '1.5',
        description: 'Zoom level of the signal field.'
      },
      {
        name: 'frequency',
        type: 'number',
        default: '2',
        description: 'Spatial frequency of the underlying signal that bends the scan lines.'
      },
      {
        name: 'ripple',
        type: 'number',
        default: '0.22',
        description: 'How strongly the signal bends the scan lines out of straight.'
      },
      {
        name: 'bandDensity',
        type: 'number',
        default: '11',
        description: 'Number of scan lines packed across the field.'
      },
      {
        name: 'lineSharpness',
        type: 'number',
        default: '5.5',
        description: 'Thins the scan lines into a crisp trace; lower values give a soft glow.'
      },
      {
        name: 'glow',
        type: 'number',
        default: '0.22',
        description: 'Soft fill between the lines, giving the band volume.'
      },
      {
        name: 'scanDirection',
        type: 'string',
        default: "'vertical'",
        description: "Direction of the scan: 'vertical', 'horizontal', or 'diagonal'."
      },
      {
        name: 'colorSpread',
        type: 'number',
        default: '0.7',
        description: 'Amount of chromatic separation between the violet and pink channels.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description: 'Overall brightness of the field.'
      },
      {
        name: 'contrast',
        type: 'number',
        default: '1.15',
        description: 'Contrast between the base tone and the bright peaks.'
      },
      {
        name: 'softness',
        type: 'number',
        default: '1.4',
        description: 'Anti-alias rolloff; higher values calm high-frequency shimmer.'
      },
      {
        name: 'vignette',
        type: 'number',
        default: '0.45',
        description: 'Strength of the edge fade around the field.'
      },
      {
        name: 'scanline',
        type: 'boolean',
        default: 'true',
        description: 'Overlays fine CRT raster lines across the field.'
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
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Overall opacity of the effect.'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enables the soft scan focus that follows the pointer.'
      },
      {
        name: 'mouseRadius',
        type: 'number',
        default: '0.5',
        description: 'Radius of the pointer focus region.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '0.5',
        description: 'Strength of the pointer focus brightening.'
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
            <Scanner
              key={key}
              color1={color1}
              color2={color2}
              color3={color3}
              speed={speed}
              sweepSpeed={sweepSpeed}
              sweepWidth={sweepWidth}
              sweepFalloff={sweepFalloff}
              scale={scale}
              frequency={frequency}
              ripple={ripple}
              bandDensity={bandDensity}
              lineSharpness={lineSharpness}
              glow={glow}
              scanDirection={scanDirection}
              colorSpread={colorSpread}
              brightness={brightness}
              contrast={contrast}
              softness={softness}
              vignette={vignette}
              scanline={scanline}
              grain={grain}
              grainIntensity={grainIntensity}
              opacity={opacity}
              mouseInteraction={mouseInteraction}
              mouseRadius={mouseRadius}
              mouseStrength={mouseStrength}
            />
            <BackgroundContent pillText="New Background" headline="A calm scanning signal field." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="scanner"
              currentProps={{
                color1,
                color2,
                color3,
                speed,
                sweepSpeed,
                sweepWidth,
                sweepFalloff,
                scale,
                frequency,
                ripple,
                bandDensity,
                lineSharpness,
                glow,
                scanDirection,
                colorSpread,
                brightness,
                contrast,
                softness,
                vignette,
                scanline,
                grain,
                grainIntensity,
                opacity,
                mouseInteraction,
                mouseRadius,
                mouseStrength
              }}
              defaultProps={{
                color1: '#5227FF',
                color2: '#FF9FFC',
                color3: '#FFFFFF',
                speed: 0.5,
                sweepSpeed: 0.25,
                sweepWidth: 1.6,
                sweepFalloff: 6,
                scale: 1.5,
                frequency: 2,
                ripple: 0.22,
                bandDensity: 11,
                lineSharpness: 5.5,
                glow: 0.22,
                scanDirection: 'vertical',
                colorSpread: 0.7,
                brightness: 1.0,
                contrast: 1.15,
                softness: 1.4,
                vignette: 0.45,
                scanline: true,
                grain: true,
                grainIntensity: 0.05,
                opacity: 1.0,
                mouseInteraction: true,
                mouseRadius: 0.5,
                mouseStrength: 0.5
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
              title="Sweep Speed"
              min={0}
              max={2}
              step={0.05}
              value={sweepSpeed}
              onChange={val => updateProp('sweepSpeed', val)}
            />

            <PreviewSlider
              title="Sweep Width"
              min={0.2}
              max={4}
              step={0.05}
              value={sweepWidth}
              onChange={val => updateProp('sweepWidth', val)}
            />

            <PreviewSlider
              title="Sweep Falloff"
              min={0.5}
              max={8}
              step={0.1}
              value={sweepFalloff}
              onChange={val => updateProp('sweepFalloff', val)}
            />

            <PreviewSelect
              title="Scan Direction"
              name="scanner-direction"
              width={140}
              value={scanDirection}
              options={[
                { label: 'Vertical', value: 'vertical' },
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Diagonal', value: 'diagonal' }
              ]}
              onChange={val => updateProp('scanDirection', val)}
            />

            <PreviewSlider
              title="Scale"
              min={0.4}
              max={3}
              step={0.05}
              value={scale}
              onChange={val => updateProp('scale', val)}
            />

            <PreviewSlider
              title="Frequency"
              min={0.2}
              max={4}
              step={0.05}
              value={frequency}
              onChange={val => updateProp('frequency', val)}
            />

            <PreviewSlider
              title="Ripple"
              min={0}
              max={1.5}
              step={0.05}
              value={ripple}
              onChange={val => updateProp('ripple', val)}
            />

            <PreviewSlider
              title="Band Density"
              min={1}
              max={14}
              step={0.5}
              value={bandDensity}
              onChange={val => updateProp('bandDensity', val)}
            />

            <PreviewSlider
              title="Line Sharpness"
              min={0.5}
              max={6}
              step={0.1}
              value={lineSharpness}
              onChange={val => updateProp('lineSharpness', val)}
            />

            <PreviewSlider
              title="Glow"
              min={0}
              max={1}
              step={0.02}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />

            <PreviewSlider
              title="Color Spread"
              min={0}
              max={1}
              step={0.01}
              value={colorSpread}
              onChange={val => updateProp('colorSpread', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0}
              max={2}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSlider
              title="Contrast"
              min={0.4}
              max={3}
              step={0.05}
              value={contrast}
              onChange={val => updateProp('contrast', val)}
            />

            <PreviewSlider
              title="Softness"
              min={0}
              max={5}
              step={0.05}
              value={softness}
              onChange={val => updateProp('softness', val)}
            />

            <PreviewSlider
              title="Vignette"
              min={0}
              max={1}
              step={0.01}
              value={vignette}
              onChange={val => updateProp('vignette', val)}
            />

            <PreviewSwitch title="Scanline" isChecked={scanline} onChange={val => updateProp('scanline', val)} />

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
              title="Cursor Focus"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSlider
              title="Cursor Radius"
              min={0.1}
              max={1.5}
              step={0.01}
              value={mouseRadius}
              onChange={val => updateProp('mouseRadius', val)}
            />

            <PreviewSlider
              title="Cursor Strength"
              min={0}
              max={1.5}
              step={0.05}
              value={mouseStrength}
              onChange={val => updateProp('mouseStrength', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={scanner} componentName="Scanner" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ScannerDemo;
