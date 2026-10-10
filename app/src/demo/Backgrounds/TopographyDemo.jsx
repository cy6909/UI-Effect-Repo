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

import Topography from '@/content/Backgrounds/Topography/Topography';
import { topography } from '../../constants/code/Backgrounds/topographyCode';

const DEFAULT_PROPS = {
  lowColor: '#5227FF',
  midColor: '#FF9FFC',
  highColor: '#FFFFFF',
  speed: 0.35,
  morphAmount: 3.0,
  morphSpeed: 0.05,
  bands: 2.0,
  thickness: 0.01,
  scale: 2.0,
  pixelSize: 1.0,
  glow: 0.5,
  colorMode: 'elevation',
  contrast: 3.0,
  brightness: 1.0,
  fillBands: false,
  opacity: 1.0,
  grain: true,
  grainIntensity: 0.05,
  mouseInteraction: true,
  mouseRadius: 0.3,
  mouseStrength: 0.4
};

const TopographyDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    lowColor,
    midColor,
    highColor,
    speed,
    morphAmount,
    morphSpeed,
    bands,
    thickness,
    scale,
    pixelSize,
    glow,
    colorMode,
    contrast,
    brightness,
    fillBands,
    opacity,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseRadius,
    mouseStrength
  } = props;
  const [key, forceRerender] = useForceRerender();

  const propData = useMemo(
    () => [
      {
        name: 'lowColor',
        type: 'string',
        default: "'#5227FF'",
        description: 'Color used for the lowest elevation bands.'
      },
      {
        name: 'midColor',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Color used for the mid elevation bands.'
      },
      {
        name: 'highColor',
        type: 'string',
        default: "'#FFFFFF'",
        description: 'Color used for the highest ridge lines.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.35',
        description: 'Animation speed of the morphing elevation field.'
      },
      {
        name: 'morphAmount',
        type: 'number',
        default: '3.0',
        description: 'Amplitude of the field morphing (how much the terrain shifts).'
      },
      {
        name: 'morphSpeed',
        type: 'number',
        default: '0.05',
        description: 'How differently each control point animates over time.'
      },
      {
        name: 'bands',
        type: 'number',
        default: '2.0',
        description: 'Contour line density (number of elevation bands).'
      },
      {
        name: 'thickness',
        type: 'number',
        default: '0.01',
        description: 'Thickness of the contour lines.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '1.0',
        description: 'Zoom level of the topographic field.'
      },
      {
        name: 'pixelSize',
        type: 'number',
        default: '1.0',
        description: 'Retro pixelation step (1 = smooth, higher = chunkier).'
      },
      {
        name: 'glow',
        type: 'number',
        default: '0.5',
        description: 'Soft bloom radius around the contour lines.'
      },
      {
        name: 'colorMode',
        type: 'string',
        default: "'elevation'",
        description: "Line coloring mode: 'elevation', 'uniform', or 'alternating'."
      },
      {
        name: 'contrast',
        type: 'number',
        default: '3.0',
        description: 'Contrast of the line coverage (sharpens or softens lines).'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.0',
        description: 'Overall brightness of the contour lines.'
      },
      {
        name: 'fillBands',
        type: 'boolean',
        default: 'false',
        description: 'Softly tint the areas between contour lines by elevation.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Overall opacity of the effect.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Whisper-subtle animated film grain over the effect.'
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
        description: 'Lift the elevation field gently around the cursor.'
      },
      {
        name: 'mouseRadius',
        type: 'number',
        default: '0.3',
        description: 'Radius of the cursor elevation bump.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '0.4',
        description: 'Strength of the cursor elevation bump.'
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
            <Topography
              key={key}
              lowColor={lowColor}
              midColor={midColor}
              highColor={highColor}
              speed={speed}
              morphAmount={morphAmount}
              morphSpeed={morphSpeed}
              bands={bands}
              thickness={thickness}
              scale={scale}
              pixelSize={pixelSize}
              glow={glow}
              colorMode={colorMode}
              contrast={contrast}
              brightness={brightness}
              fillBands={fillBands}
              opacity={opacity}
              grain={grain}
              grainIntensity={grainIntensity}
              mouseInteraction={mouseInteraction}
              mouseRadius={mouseRadius}
              mouseStrength={mouseStrength}
            />
            <BackgroundContent pillText="New Background" headline="A living topographic contour map." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="topography"
              currentProps={{
                lowColor,
                midColor,
                highColor,
                speed,
                morphAmount,
                morphSpeed,
                bands,
                thickness,
                scale,
                pixelSize,
                glow,
                colorMode,
                contrast,
                brightness,
                fillBands,
                opacity,
                grain,
                grainIntensity,
                mouseInteraction,
                mouseRadius,
                mouseStrength
              }}
              defaultProps={{
                lowColor: '#5227FF',
                midColor: '#FF9FFC',
                highColor: '#FFFFFF',
                speed: 0.35,
                morphAmount: 3.0,
                morphSpeed: 0.05,
                bands: 2.0,
                thickness: 0.01,
                scale: 1.0,
                pixelSize: 1.0,
                glow: 0.5,
                colorMode: 'elevation',
                contrast: 3.0,
                brightness: 1.0,
                fillBands: false,
                opacity: 1.0,
                grain: true,
                grainIntensity: 0.05,
                mouseInteraction: true,
                mouseRadius: 0.3,
                mouseStrength: 0.4
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom
              title="Low Color"
              color={lowColor}
              onChange={val => updateProp('lowColor', val)}
            />
            <PreviewColorPickerCustom
              title="Mid Color"
              color={midColor}
              onChange={val => updateProp('midColor', val)}
            />
            <PreviewColorPickerCustom
              title="High Color"
              color={highColor}
              onChange={val => updateProp('highColor', val)}
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
              title="Morph Amount"
              min={0.5}
              max={6}
              step={0.1}
              value={morphAmount}
              onChange={val => updateProp('morphAmount', val)}
            />

            <PreviewSlider
              title="Morph Speed"
              min={0.01}
              max={0.2}
              step={0.01}
              value={morphSpeed}
              onChange={val => updateProp('morphSpeed', val)}
            />

            <PreviewSlider
              title="Bands"
              min={1}
              max={12}
              step={0.5}
              value={bands}
              onChange={val => updateProp('bands', val)}
            />

            <PreviewSlider
              title="Thickness"
              min={0.01}
              max={0.25}
              step={0.01}
              value={thickness}
              onChange={val => updateProp('thickness', val)}
            />

            <PreviewSlider
              title="Scale"
              min={0.3}
              max={3}
              step={0.05}
              value={scale}
              onChange={val => updateProp('scale', val)}
            />

            <PreviewSlider
              title="Pixel Size"
              min={1}
              max={40}
              step={1}
              value={pixelSize}
              onChange={val => updateProp('pixelSize', val)}
            />

            <PreviewSlider
              title="Glow"
              min={0}
              max={1.5}
              step={0.05}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />

            <PreviewSelect
              title="Color Mode"
              name="topography-color-mode"
              width={140}
              value={colorMode}
              options={[
                { label: 'Elevation', value: 'elevation' },
                { label: 'Uniform', value: 'uniform' },
                { label: 'Alternating', value: 'alternating' }
              ]}
              onChange={val => updateProp('colorMode', val)}
            />

            <PreviewSlider
              title="Contrast"
              min={0.2}
              max={3}
              step={0.05}
              value={contrast}
              onChange={val => updateProp('contrast', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0}
              max={2}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSwitch title="Fill Bands" isChecked={fillBands} onChange={val => updateProp('fillBands', val)} />

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
              step={0.05}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
            />

            <PreviewSwitch
              title="Cursor Elevation"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
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
          <CodeExample codeObject={topography} componentName="Topography" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default TopographyDemo;
