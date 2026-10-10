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

import MoltenMetal from '@/content/Backgrounds/MoltenMetal/MoltenMetal';
import { moltenMetal } from '../../constants/code/Backgrounds/moltenMetalCode';

const DEFAULT_PROPS = {
  color1: '#5227FF',
  color2: '#FF9FFC',
  color3: '#FFFFFF',
  speed: 0.35,
  scale: 4,
  detail: 3,
  glow: 1.6,
  coreSize: 0.1,
  swirl: 1,
  fold: -0.2,
  blackPoint: 0.05,
  brightness: 1.3,
  colorMode: 'molten',
  grain: true,
  grainIntensity: 0.05,
  mouseInteraction: true,
  mouseStrength: 0.3,
  opacity: 1.0
};

const MoltenMetalDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color1,
    color2,
    color3,
    speed,
    scale,
    detail,
    glow,
    coreSize,
    swirl,
    fold,
    blackPoint,
    brightness,
    colorMode,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
    opacity,
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
        description: 'Shadow color for the dim caustic glow.'
      },
      {
        name: 'color2',
        type: 'string',
        default: "'#FF9FFC'",
        description: 'Midtone color for the flowing filaments.'
      },
      {
        name: 'color3',
        type: 'string',
        default: "'#FFFFFF'",
        description: 'Highlight color for the hot filament cores.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '0.35',
        description: 'Animation speed of the liquid motion.'
      },
      {
        name: 'scale',
        type: 'number',
        default: '4',
        description: 'Zoom of the caustic field (higher = more detail on screen).'
      },
      {
        name: 'detail',
        type: 'number',
        default: '3',
        description: 'Number of domain-folding iterations (1-8).'
      },
      {
        name: 'glow',
        type: 'number',
        default: '1.6',
        description: 'Gain applied to the accumulated filament glow.'
      },
      {
        name: 'coreSize',
        type: 'number',
        default: '0.1',
        description: 'Thickness of the bright filament cores.'
      },
      {
        name: 'swirl',
        type: 'number',
        default: '1',
        description: 'Amount of rotational swirl across the field.'
      },
      {
        name: 'fold',
        type: 'number',
        default: '-0.2',
        description: 'Turbulence / fold strength of the iterative warp.'
      },
      {
        name: 'blackPoint',
        type: 'number',
        default: '0.05',
        description: 'Raises the dark floor so shadows fade to transparent.'
      },
      {
        name: 'brightness',
        type: 'number',
        default: '1.3',
        description: 'Overall brightness of the effect.'
      },
      {
        name: 'colorMode',
        type: 'string',
        default: "'molten'",
        description: 'Palette mapping: molten, ember, or frost.'
      },
      {
        name: 'grain',
        type: 'boolean',
        default: 'true',
        description: 'Adds subtle animated film grain.'
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
        description: 'Enables gentle drift of the field toward the cursor.'
      },
      {
        name: 'mouseStrength',
        type: 'number',
        default: '0.3',
        description: 'Strength of the cursor drift.'
      },
      {
        name: 'opacity',
        type: 'number',
        default: '1.0',
        description: 'Overall opacity of the effect over the page.'
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
            <MoltenMetal
              key={key}
              color1={color1}
              color2={color2}
              color3={color3}
              speed={speed}
              scale={scale}
              detail={detail}
              glow={glow}
              coreSize={coreSize}
              swirl={swirl}
              fold={fold}
              blackPoint={blackPoint}
              brightness={brightness}
              colorMode={colorMode}
              grain={grain}
              grainIntensity={grainIntensity}
              mouseInteraction={mouseInteraction}
              mouseStrength={mouseStrength}
              opacity={opacity}
              backgroundColor={backgroundColor}
              lightMode={lightMode}
            />
            <BackgroundContent pillText="New Background" headline="Molten violet caustics that flow like liquid." />
          </Box>

          <Flex justify="flex-end" mt={2} mb={-2}>
            <OpenInStudioButton
              backgroundId="molten-metal"
              currentProps={{
                color1,
                color2,
                color3,
                speed,
                scale,
                detail,
                glow,
                coreSize,
                swirl,
                fold,
                blackPoint,
                brightness,
                colorMode,
                grain,
                grainIntensity,
                mouseInteraction,
                mouseStrength,
                opacity
              }}
              defaultProps={{
                color1: '#5227FF',
                color2: '#FF9FFC',
                color3: '#FFFFFF',
                speed: 0.35,
                scale: 4,
                detail: 3,
                glow: 1.6,
                coreSize: 0.1,
                swirl: 1,
                fold: -0.2,
                blackPoint: 0.05,
                brightness: 1.3,
                colorMode: 'molten',
                grain: true,
                grainIntensity: 0.05,
                mouseInteraction: true,
                mouseStrength: 0.3,
                opacity: 1.0
              }}
            />
          </Flex>

          <Customize forceRerender={forceRerender}>
            <PreviewColorPickerCustom title="Color 1" color={color1} onChange={val => updateProp('color1', val)} />
            <PreviewColorPickerCustom title="Color 2" color={color2} onChange={val => updateProp('color2', val)} />
            <PreviewColorPickerCustom title="Color 3" color={color3} onChange={val => updateProp('color3', val)} />

            <PreviewSelect
              title="Color Mode"
              name="molten-metal-color-mode"
              width={140}
              value={colorMode}
              options={[
                { label: 'Molten', value: 'molten' },
                { label: 'Ember', value: 'ember' },
                { label: 'Frost', value: 'frost' }
              ]}
              onChange={val => updateProp('colorMode', val)}
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
              title="Scale"
              min={2}
              max={12}
              step={0.1}
              value={scale}
              onChange={val => updateProp('scale', val)}
            />

            <PreviewSlider
              title="Detail"
              min={1}
              max={8}
              step={1}
              value={detail}
              onChange={val => updateProp('detail', val)}
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
              title="Core Size"
              min={0.05}
              max={0.4}
              step={0.01}
              value={coreSize}
              onChange={val => updateProp('coreSize', val)}
            />

            <PreviewSlider
              title="Swirl"
              min={0}
              max={2}
              step={0.05}
              value={swirl}
              onChange={val => updateProp('swirl', val)}
            />

            <PreviewSlider
              title="Fold"
              min={-0.4}
              max={-0.05}
              step={0.01}
              value={fold}
              onChange={val => updateProp('fold', val)}
            />

            <PreviewSlider
              title="Black Point"
              min={0}
              max={0.3}
              step={0.01}
              value={blackPoint}
              onChange={val => updateProp('blackPoint', val)}
            />

            <PreviewSlider
              title="Brightness"
              min={0.2}
              max={3}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />

            <PreviewSlider
              title="Opacity"
              min={0}
              max={1}
              step={0.05}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
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

            <PreviewSwitch
              title="Cursor Drift"
              isChecked={mouseInteraction}
              onChange={val => updateProp('mouseInteraction', val)}
            />

            <PreviewSlider
              title="Cursor Strength"
              min={0}
              max={1}
              step={0.05}
              value={mouseStrength}
              onChange={val => updateProp('mouseStrength', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={moltenMetal} componentName="MoltenMetal" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default MoltenMetalDemo;
