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

import AcidSquares from '@/content/Backgrounds/AcidSquares/AcidSquares';
import { acidSquares } from '../../constants/code/Backgrounds/acidSquaresCode';

const DEFAULT_PROPS = {
  color1: '#5227FF',
  color2: '#A855F7',
  color3: '#FFFFFF',
  detail: 'medium',
  speed: 0.7,
  waveDepth: 1,
  zoom: 1.3,
  density: 10.0,
  glow: 1.0,
  exposure: 2700,
  spread: 0.3,
  stepSize: 0.002,
  colorShift: 0,
  contrast: 1,
  brightness: 1.0,
  opacity: 1.0,
  mouseInteraction: true,
  mouseStrength: 0.1,
  mouseRadius: 0.35,
  blur: 0,
  grain: true,
  grainIntensity: 0.05
};

const AcidSquaresDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    color3,
    detail,
    speed,
    waveDepth,
    zoom,
    density,
    glow,
    exposure,
    spread,
    stepSize,
    colorShift,
    contrast,
    brightness,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    blur,
    grain,
    grainIntensity
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'color1',
        type: 'string',
        default: "'#5227FF'",
        description: 'Violet core color used for the dim depths of the corridor.'
      },
      {
        name: 'color2',
        type: 'string',
        default: "'#A855F7'",
        description: 'Pink mid-tone color used for the glowing crystal faces.'
      },
      {
        name: 'color3',
        type: 'string',
        default: "'#FFFFFF'",
        description: 'White highlight color used for the hottest edges.'
      },
      {
        name: 'detail',
        type: '"low" | "medium" | "high"',
        default: "'medium'",
        description: 'Raymarch quality tier (20 / 32 / 48 steps). Higher looks richer but costs more.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.7',
        description: 'Speed of the forward drift through the lattice.'
      },
      {
        name: 'waveDepth',
        type: 'number',
        default: '1',
        description: 'How far the view gently drifts in and back out as the corridor breathes. 0 holds it still.'
      },
      {
        name: 'zoom',
        type: 'number',
        default: '1.3',
        description: 'Field of view into the corridor. Higher zooms in.'
      },
      {
        name: 'density',
        type: 'number',
        default: '10.0',
        description: 'How tightly the boxes of the lattice are packed.'
      },
      {
        name: 'glow',
        type: 'number',
        default: '1.0',
        description: 'Gain applied to the accumulated light along each ray.'
      },
      {
        name: 'exposure',
        type: 'number',
        default: '2700',
        description: 'Tone-mapping exposure. Higher values darken the render.'
      },
      {
        name: 'spread',
        type: 'number',
        default: '0.3',
        description: 'Controls how the ray step grows each iteration; strongly shapes the look.'
      },
      {
        name: 'stepSize',
        type: 'number',
        default: '0.002',
        description: 'Minimum ray step. Larger values thin out the glow.'
      },
      {
        name: 'colorShift',
        type: 'number',
        default: '0',
        description: 'Rate of the gentle brightness shimmer cycling over time.'
      },
      {
        name: 'contrast',
        type: 'number',
        default: '1',
        description: 'Contrast applied around the mid-tones of the final image.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description: 'Overall brightness multiplier before tone mapping.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Overall opacity of the effect over the transparent background.'
      },
      {
        name: 'mouseInteraction',
        type: 'boolean',
        default: 'true',
        description: 'Enables a soft depression that sinks the lattice downward around the pointer.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '0.1',
        description: 'How deeply the cursor presses the lattice down inside the affected area.'
      },
      {
        name: 'mouseRadius',
        type: 'number',
        default: '0.35',
        description: 'Size of the area around the pointer that collapses, as a fraction of the view height.'
      },
      {
        name: 'blur',
        type: 'number',
        default: '0',
        description: 'Softens the whole effect with a post-process Gaussian blur. 0 is crisp; 1 is a soft haze.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Adds a faint animated film grain over the final image for a subtle analog texture.'
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
            <AcidSquares
              key={key}
              color1={color1}
              color2={color2}
              color3={color3}
              detail={detail}
              speed={speed}
              waveDepth={waveDepth}
              zoom={zoom}
              density={density}
              glow={glow}
              exposure={exposure}
              spread={spread}
              stepSize={stepSize}
              colorShift={colorShift}
              contrast={contrast}
              brightness={brightness}
              opacity={opacity}
              mouseInteraction={mouseInteraction}
              mouseStrength={mouseStrength}
              mouseRadius={mouseRadius}
              blur={blur}
              grain={grain}
              grainIntensity={grainIntensity}
            />
            <BackgroundContent pillText="New Background" headline="A luminous crystal corridor of stacked squares." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="acid-squares"
              currentProps={{
                color1,
                color2,
                color3,
                detail,
                speed,
                waveDepth,
                zoom,
                density,
                glow,
                exposure,
                spread,
                stepSize,
                colorShift,
                contrast,
                brightness,
                opacity,
                mouseInteraction,
                mouseStrength,
                mouseRadius,
                blur,
                grain,
                grainIntensity
              }}
              defaultProps={{
                color1: '#5227FF',
                color2: '#A855F7',
                color3: '#FFFFFF',
                detail: 'medium',
                speed: 0.7,
                waveDepth: 1,
                zoom: 1.3,
                density: 10.0,
                glow: 1.0,
                exposure: 2700,
                spread: 0.3,
                stepSize: 0.002,
                colorShift: 0,
                contrast: 1,
                brightness: 1.0,
                opacity: 1.0,
                mouseInteraction: true,
                mouseStrength: 0.1,
                mouseRadius: 0.35,
                blur: 0,
                grain: true,
                grainIntensity: 0.05
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color3} onChange={val => updateProp('color3', val)} />

            <PreviewSelect
              title="Detail"
              name="acid-squares-detail"
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
              title="Speed"
              min={0}
              max={2}
              step={0.05}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />

            <PreviewSlider
              title="Wave Depth"
              min={0}
              max={4}
              step={0.1}
              value={waveDepth}
              onChange={val => updateProp('waveDepth', val)}
            />

            <PreviewSlider
              title="Color Shift"
              min={0}
              max={2}
              step={0.05}
              value={colorShift}
              onChange={val => updateProp('colorShift', val)}
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
              title="Density"
              min={4}
              max={16}
              step={0.5}
              value={density}
              onChange={val => updateProp('density', val)}
            />

            <PreviewSlider
              title="Spread"
              min={0.15}
              max={0.45}
              step={0.01}
              value={spread}
              onChange={val => updateProp('spread', val)}
            />

            <PreviewSlider
              title="Step Size"
              min={0.001}
              max={0.02}
              step={0.001}
              value={stepSize}
              onChange={val => updateProp('stepSize', val)}
            />

            <PreviewSlider
              title="Glow"
              min={0.2}
              max={3}
              step={0.05}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />

            <PreviewSlider
              title="Exposure"
              min={400}
              max={6000}
              step={50}
              value={exposure}
              onChange={val => updateProp('exposure', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0.2}
              max={2.5}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSlider
              title="Contrast"
              min={0.5}
              max={2.5}
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
              title="Cursor Collapse"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSlider
              title="Collapse Strength"
              min={0}
              max={1.5}
              step={0.05}
              value={mouseStrength}
              onChange={val => updateProp('mouseStrength', val)}
            />

            <PreviewSlider
              title="Cursor Radius"
              min={0.05}
              max={1}
              step={0.01}
              value={mouseRadius}
              onChange={val => updateProp('mouseRadius', val)}
            />

            <PreviewSlider
              title="Blur"
              min={0}
              max={1}
              step={0.01}
              value={blur}
              onChange={val => updateProp('blur', val)}
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
          <CodeExample codeObject={acidSquares} componentName="AcidSquares" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default AcidSquaresDemo;
