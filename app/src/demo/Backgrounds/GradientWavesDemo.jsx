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

import GradientWaves from '@/content/Backgrounds/GradientWaves/GradientWaves';
import { gradientWaves } from '../../constants/code/Backgrounds/gradientWavesCode';

const DEFAULT_PROPS = {
  horizonColor: '#5227FF',
  waveColor: '#FF9FFC',
  crestColor: '#FFFFFF',
  speed: 0.4,
  amplitude: 2.5,
  waveScale: 0.6,
  waveRatio: 0.9,
  swell: 35,
  turbulence: 20,
  tilt: 1.11,
  zoom: 1.0,
  height: 5.5,
  fogDepth: 15,
  detail: 'medium',
  brightness: 1.0,
  opacity: 1.0,
  mouseInteraction: true,
  parallaxStrength: 0.5,
  grain: true,
  grainIntensity: 0.05
};

const GradientWavesDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    mouseInteraction,
    parallaxStrength,
    grain,
    grainIntensity
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'horizonColor',
        type: 'string',
        default: "'#5227FF'",
        description: 'Distant haze color the waves fade into.'
      },
      {
        name: 'waveColor',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Mid color of the rolling wave bodies.'
      },
      {
        name: 'crestColor',
        type: 'string',
        default: "'#FFFFFF'",
        description: 'Highlight color of the nearest wave crests.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.4',
        description: 'Animation speed of the undulating wave field.'
      },
      {
        name: 'amplitude',
        type: 'number',
        default: '2.5',
        description: 'Height of the sine-plasma waves.'
      },
      {
        name: 'waveScale',
        type: 'number',
        default: '0.6',
        description: 'Overall spatial frequency of the waves.'
      },
      {
        name: 'waveRatio',
        type: 'number',
        default: '0.9',
        description: 'Ratio between the short and long wavelength components.'
      },
      {
        name: 'swell',
        type: 'number',
        default: '35',
        description: 'Large-scale horizontal swell distortion.'
      },
      {
        name: 'turbulence',
        type: 'number',
        default: '20',
        description: 'Large-scale cross-flow turbulence distortion.'
      },
      {
        name: 'tilt',
        type: 'number',
        default: '1.11',
        description: 'Camera pitch toward the horizon (radians).'
      },
      {
        name: 'zoom',
        type: 'number',
        default: '1.0',
        description: 'Field-of-view zoom into the wave field.'
      },
      {
        name: 'height',
        type: 'number',
        default: '5.5',
        description: 'Vertical offset of the horizon line.'
      },
      {
        name: 'fogDepth',
        type: 'number',
        default: '15',
        description: 'Distance over which the waves fade into haze and transparency.'
      },
      {
        name: 'detail',
        type: 'string',
        default: "'medium'",
        description: "Raymarch quality tier: 'low', 'medium', or 'high'."
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description: 'Overall brightness multiplier for the final color.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Global opacity of the effect.'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enable subtle pointer-driven camera parallax.'
      },
      {
        name: 'parallaxStrength',
        type: 'number',
        default: '0.5',
        description: 'Strength of the cursor parallax drift.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Overlay a whisper-subtle animated film grain on the effect.'
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
            <GradientWaves
              key={key}
              horizonColor={horizonColor}
              waveColor={waveColor}
              crestColor={crestColor}
              speed={speed}
              amplitude={amplitude}
              waveScale={waveScale}
              waveRatio={waveRatio}
              swell={swell}
              turbulence={turbulence}
              tilt={tilt}
              zoom={zoom}
              height={height}
              fogDepth={fogDepth}
              detail={detail}
              brightness={brightness}
              opacity={opacity}
              mouseInteraction={mouseInteraction}
              parallaxStrength={parallaxStrength}
              grain={grain}
              grainIntensity={grainIntensity}
            />
            <BackgroundContent pillText="New Background" headline="Soft rolling gradient waves fading into haze." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="gradient-waves"
              currentProps={{
                horizonColor,
                waveColor,
                crestColor,
                speed,
                amplitude,
                waveScale,
                waveRatio,
                swell,
                turbulence,
                tilt,
                zoom,
                height,
                fogDepth,
                detail,
                brightness,
                opacity,
                mouseInteraction,
                parallaxStrength,
                grain,
                grainIntensity
              }}
              defaultProps={{
                horizonColor: '#5227FF',
                waveColor: '#FF9FFC',
                crestColor: '#FFFFFF',
                speed: 0.4,
                amplitude: 2.5,
                waveScale: 0.6,
                waveRatio: 0.9,
                swell: 35,
                turbulence: 20,
                tilt: 1.11,
                zoom: 1.0,
                height: 5.5,
                fogDepth: 15,
                detail: 'medium',
                brightness: 1.0,
                opacity: 1.0,
                mouseInteraction: true,
                parallaxStrength: 0.5,
                grain: true,
                grainIntensity: 0.05
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom
              title="Horizon Color"
              color={horizonColor}
              onChange={val => updateProp('horizonColor', val)}
            />
            <PreviewColorPickerCustom
              title="Wave Color"
              color={waveColor}
              onChange={val => updateProp('waveColor', val)}
            />
            <PreviewColorPickerCustom
              title="Crest Color"
              color={crestColor}
              onChange={val => updateProp('crestColor', val)}
            />

            <PreviewSlider
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Amplitude"
              min={0}
              max={5}
              step={0.05}
              value={amplitude}
              onChange={val => updateProp('amplitude', val)}
            />

            <PreviewSlider
              title="Wave Scale"
              min={0.3}
              max={3}
              step={0.05}
              value={waveScale}
              onChange={val => updateProp('waveScale', val)}
            />

            <PreviewSlider
              title="Wave Ratio"
              min={0.3}
              max={3}
              step={0.05}
              value={waveRatio}
              onChange={val => updateProp('waveRatio', val)}
            />

            <PreviewSlider
              title="Swell"
              min={0}
              max={40}
              step={0.5}
              value={swell}
              onChange={val => updateProp('swell', val)}
            />

            <PreviewSlider
              title="Turbulence"
              min={0}
              max={60}
              step={0.5}
              value={turbulence}
              onChange={val => updateProp('turbulence', val)}
            />

            <PreviewSlider
              title="Tilt"
              min={0.2}
              max={1.3}
              step={0.01}
              value={tilt}
              onChange={val => updateProp('tilt', val)}
            />

            <PreviewSlider
              title="Zoom"
              min={0.4}
              max={2.5}
              step={0.05}
              value={zoom}
              onChange={val => updateProp('zoom', val)}
            />

            <PreviewSlider
              title="Horizon Height"
              min={2}
              max={10}
              step={0.1}
              value={height}
              onChange={val => updateProp('height', val)}
            />

            <PreviewSlider
              title="Fog Depth"
              min={5}
              max={60}
              step={1}
              value={fogDepth}
              onChange={val => updateProp('fogDepth', val)}
            />

            <PreviewSelect
              title="Detail"
              name="gradient-waves-detail"
              width={140}
              value={detail}
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' }
              ]}
              onChange={val => updateProp('detail', val)}
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
              title="Parallax Strength"
              min={0}
              max={1}
              step={0.01}
              value={parallaxStrength}
              onChange={val => updateProp('parallaxStrength', val)}
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
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={gradientWaves} componentName="GradientWaves" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default GradientWavesDemo;
