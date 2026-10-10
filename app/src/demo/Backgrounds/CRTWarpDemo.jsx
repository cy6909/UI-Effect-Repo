import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PropTable from '../../components/common/Preview/PropTable';
import BackgroundContent from '../../components/common/Preview/BackgroundContent';
import OpenInStudioButton from '../../components/common/Preview/OpenInStudioButton';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import useComponentProps from '../../hooks/useComponentProps';
import CRTWarp from '../../content/Backgrounds/CRTWarp/CRTWarp';
import { crtWarp } from '../../constants/code/Backgrounds/crtWarpCode';

const DEFAULT_PROPS = {
  color: '#c755f7',
  backgroundColor: '#05010a',
  speed: 0.5,
  curvature: 0.25,
  scanlineStrength: 0.25,
  scanlineFrequency: 200,
  waveAmplitude: 0.3,
  waveFrequency: 2.5,
  bloom: 1.5,
  bloomRadius: 1,
  noise: 0.1,
  vignette: 0,
  brightness: 1.25,
  pixelation: 1,
  rgbShift: 0.015,
  mouseReact: true,
  mouseStrength: 0.5,
  dpr: 1,
  fps: 30,
  paused: false
};

const CRTWarpDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);

  const propData = useMemo(
    () => [
      { name: 'color', type: 'string', default: "'#c755f7'", description: 'Main phosphor color.' },
      { name: 'backgroundColor', type: 'string', default: "'#05010a'", description: 'Canvas background color.' },
      { name: 'speed', type: 'number', default: '0.5', description: 'Animation speed.' },
      { name: 'curvature', type: 'number', default: '0.25', description: 'Strength of the CRT barrel distortion.' },
      {
        name: 'scanlineStrength',
        type: 'number',
        default: '0.25',
        description: 'Visibility of the horizontal scanlines.'
      },
      {
        name: 'scanlineFrequency',
        type: 'number',
        default: '200',
        description: 'Number of scanline bands across the canvas.'
      },
      { name: 'waveAmplitude', type: 'number', default: '0.3', description: 'Amount of fluid displacement.' },
      { name: 'waveFrequency', type: 'number', default: '2.5', description: 'Density of the plasma waves.' },
      { name: 'bloom', type: 'number', default: '1.5', description: 'Intensity of the soft phosphor glow.' },
      { name: 'bloomRadius', type: 'number', default: '1', description: 'Spread of the glow sampling.' },
      { name: 'noise', type: 'number', default: '0.1', description: 'Fine analog grain amount.' },
      { name: 'vignette', type: 'number', default: '0', description: 'Edge darkening strength.' },
      { name: 'brightness', type: 'number', default: '1.25', description: 'Overall output brightness.' },
      { name: 'pixelation', type: 'number', default: '1', description: 'Pixel block size; 1 keeps the image smooth.' },
      { name: 'rgbShift', type: 'number', default: '0.015', description: 'Horizontal phosphor-channel separation.' },
      { name: 'mouseReact', type: 'boolean', default: 'true', description: 'Lets the pointer bend the signal.' },
      { name: 'mouseStrength', type: 'number', default: '0.5', description: 'Strength of the pointer distortion.' },
      { name: 'dpr', type: 'number', default: '1', description: 'Maximum device pixel ratio used by the renderer.' },
      { name: 'fps', type: 'number', default: '30', description: 'Maximum render frame rate.' },
      { name: 'paused', type: 'boolean', default: 'false', description: 'Freezes the animation when true.' },
      { name: 'className', type: 'string', default: 'undefined', description: 'Optional container class name.' },
      { name: 'style', type: 'object', default: 'undefined', description: 'Optional inline container styles.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <CRTWarp {...props} />
            <BackgroundContent pillText="New Background" headline="Make every pixel pulse" />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton backgroundId="crt-warp" currentProps={props} defaultProps={DEFAULT_PROPS} />
          </Flex>

          <Customize>
            <PreviewColorPickerCustom
              title="Phosphor Color"
              color={props.color}
              onChange={value => updateProp('color', value)}
            />
            <PreviewColorPickerCustom
              title="Background"
              color={props.backgroundColor}
              onChange={value => updateProp('backgroundColor', value)}
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
              title="Curvature"
              min={0}
              max={1}
              step={0.01}
              value={props.curvature}
              onChange={value => updateProp('curvature', value)}
            />
            <PreviewSlider
              title="Wave Amount"
              min={0}
              max={1}
              step={0.01}
              value={props.waveAmplitude}
              onChange={value => updateProp('waveAmplitude', value)}
            />
            <PreviewSlider
              title="Wave Density"
              min={0.5}
              max={6}
              step={0.1}
              value={props.waveFrequency}
              onChange={value => updateProp('waveFrequency', value)}
            />
            <PreviewSlider
              title="Scanline Strength"
              min={0}
              max={1}
              step={0.01}
              value={props.scanlineStrength}
              onChange={value => updateProp('scanlineStrength', value)}
            />
            <PreviewSlider
              title="Scanline Density"
              min={40}
              max={500}
              step={5}
              value={props.scanlineFrequency}
              onChange={value => updateProp('scanlineFrequency', value)}
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
              title="Bloom Radius"
              min={0.1}
              max={3}
              step={0.05}
              value={props.bloomRadius}
              onChange={value => updateProp('bloomRadius', value)}
            />
            <PreviewSlider
              title="Noise"
              min={0}
              max={0.25}
              step={0.005}
              value={props.noise}
              onChange={value => updateProp('noise', value)}
            />
            <PreviewSlider
              title="Vignette"
              min={0}
              max={1}
              step={0.01}
              value={props.vignette}
              onChange={value => updateProp('vignette', value)}
            />
            <PreviewSlider
              title="Brightness"
              min={0.25}
              max={2.5}
              step={0.05}
              value={props.brightness}
              onChange={value => updateProp('brightness', value)}
            />
            <PreviewSlider
              title="RGB Shift"
              min={0}
              max={0.03}
              step={0.001}
              value={props.rgbShift}
              onChange={value => updateProp('rgbShift', value)}
            />
            <PreviewSelect
              title="Pixel Size"
              options={[
                { value: 1, label: 'Smooth' },
                { value: 2, label: '2 px' },
                { value: 4, label: '4 px' },
                { value: 8, label: '8 px' }
              ]}
              value={props.pixelation}
              onChange={value => updateProp('pixelation', value)}
            />
            <PreviewSelect
              title="Render Quality"
              options={[
                { value: 0.75, label: 'Performance' },
                { value: 1, label: 'Balanced' },
                { value: 1.5, label: 'Sharp' }
              ]}
              value={props.dpr}
              onChange={value => updateProp('dpr', value)}
            />
            <PreviewSelect
              title="Frame Rate"
              options={[
                { value: 24, label: '24 FPS' },
                { value: 30, label: '30 FPS' },
                { value: 45, label: '45 FPS' },
                { value: 60, label: '60 FPS' }
              ]}
              value={props.fps}
              onChange={value => updateProp('fps', value)}
            />
            <PreviewSwitch
              title="Pointer Warp"
              isChecked={props.mouseReact}
              onChange={value => updateProp('mouseReact', value)}
            />
            <PreviewSlider
              title="Pointer Strength"
              min={0}
              max={1.5}
              step={0.01}
              value={props.mouseStrength}
              isDisabled={!props.mouseReact}
              onChange={value => updateProp('mouseStrength', value)}
            />
            <PreviewSwitch title="Pause" isChecked={props.paused} onChange={value => updateProp('paused', value)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['three']} />
        </PreviewTab>
        <CodeTab>
          <CodeExample codeObject={crtWarp} componentName="CRTWarp" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CRTWarpDemo;
