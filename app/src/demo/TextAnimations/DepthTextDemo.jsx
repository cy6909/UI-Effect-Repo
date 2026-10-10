import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import Customize from '../../components/common/Preview/Customize';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { useColorModeValue } from '../../components/setup/color-mode';

import DepthText from '../../content/TextAnimations/DepthText/DepthText';
import { depthText } from '../../constants/code/TextAnimations/depthTextCode';

const DEFAULT_PROPS = {
  text: 'Elevate',
  layers: 34,
  depth: 2.4,
  faceColor: '#f8fafc',
  depthColor: '#7c3aed',
  tilt: 7.5,
  pointerTracking: true,
  smoothing: 0.14,
  perspective: 900,
  autoOrbit: true,
  orbitSpeed: 0.35,
  fontSize: 'clamp(3rem, 12vw, 7rem)',
  fontWeight: 900,
  shadow: true
};

const fontWeightOptions = [
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' }
];

const fontSizeOptions = [
  { value: 'clamp(2.5rem, 9vw, 5.5rem)', label: 'Compact' },
  { value: 'clamp(3rem, 12vw, 7rem)', label: 'Hero' },
  { value: 'clamp(3.5rem, 15vw, 8.5rem)', label: 'Billboard' }
];

const DepthTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    text,
    layers,
    depth,
    faceColor,
    depthColor,
    tilt,
    pointerTracking,
    smoothing,
    perspective,
    autoOrbit,
    orbitSpeed,
    fontSize,
    fontWeight,
    shadow
  } = props;
  const renderedFaceColor = useColorModeValue(
    faceColor === DEFAULT_PROPS.faceColor ? '#ffffff' : faceColor,
    faceColor
  );

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '"Elevate"',
        description: 'The word or short phrase rendered as extruded type.'
      },
      {
        name: 'layers',
        type: 'number',
        default: '34',
        description: 'Number of stacked copies that form the extrusion. Clamped to protect the DOM.'
      },
      {
        name: 'depth',
        type: 'number',
        default: '2.4',
        description: 'Spacing in pixels between each layer of the extrusion.'
      },
      {
        name: 'faceColor',
        type: 'string',
        default: '"#f8fafc"',
        description: 'Color of the crisp front face of the text.'
      },
      {
        name: 'depthColor',
        type: 'string',
        default: '"#7c3aed"',
        description: 'Tint used for the back of the extrusion and its shadow.'
      },
      {
        name: 'tilt',
        type: 'number',
        default: '7.5',
        description: 'Maximum pointer-driven rotation in degrees.'
      },
      {
        name: 'pointerTracking',
        type: 'boolean',
        default: 'true',
        description: 'Enables smoothed pointer parallax on fine pointer devices.'
      },
      {
        name: 'smoothing',
        type: 'number',
        default: '0.14',
        description: 'Damping amount used to ease rotation toward the pointer target.'
      },
      {
        name: 'perspective',
        type: 'number',
        default: '900',
        description: 'Perspective distance in pixels for the 3D stack.'
      },
      {
        name: 'autoOrbit',
        type: 'boolean',
        default: 'true',
        description: 'Adds a subtle orbit when pointer tracking is unavailable or idle.'
      },
      {
        name: 'orbitSpeed',
        type: 'number',
        default: '0.35',
        description: 'Speed of the fallback orbit in cycles per second.'
      },
      {
        name: 'fontSize',
        type: 'string',
        default: '"clamp(3rem, 12vw, 7rem)"',
        description: 'CSS font-size value for the display word.'
      },
      {
        name: 'fontWeight',
        type: 'number | string',
        default: '900',
        description: 'Font weight used for every layer.'
      },
      {
        name: 'shadow',
        type: 'boolean',
        default: 'true',
        description: 'Adds a soft colored drop shadow to the front face.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Optional class name for the outer wrapper.'
      },
      {
        name: 'style',
        type: 'CSSProperties',
        default: '{}',
        description: 'Optional inline styles for the outer wrapper.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={420} maxH={460} overflow="hidden" mb={6}>
            <Box position="relative" textAlign="center" px={8}>
              <DepthText
                text={text}
                layers={layers}
                depth={depth}
                faceColor={renderedFaceColor}
                depthColor={depthColor}
                tilt={tilt}
                pointerTracking={pointerTracking}
                smoothing={smoothing}
                perspective={perspective}
                autoOrbit={autoOrbit}
                orbitSpeed={orbitSpeed}
                fontSize={fontSize}
                fontWeight={fontWeight}
                shadow={shadow}
              />
            </Box>
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Your word"
              maxLength={12}
              onChange={value => updateProp('text', value)}
            />

            <PreviewColorPickerCustom
              title="Face Color"
              color={renderedFaceColor}
              onChange={value => updateProp('faceColor', value)}
            />

            <PreviewColorPickerCustom
              title="Depth Color"
              color={depthColor}
              onChange={value => updateProp('depthColor', value)}
            />

            <PreviewSelect
              title="Font Size"
              options={fontSizeOptions}
              value={fontSize}
              onChange={value => updateProp('fontSize', value)}
            />

            <PreviewSelect
              title="Weight"
              options={fontWeightOptions}
              value={fontWeight}
              onChange={value => updateProp('fontWeight', Number(value))}
            />

            <PreviewSlider
              title="Layers"
              min={8}
              max={56}
              step={1}
              value={layers}
              onChange={value => updateProp('layers', value)}
            />

            <PreviewSlider
              title="Depth"
              min={0.8}
              max={5}
              step={0.1}
              value={depth}
              valueUnit="px"
              onChange={value => updateProp('depth', value)}
            />

            <PreviewSlider
              title="Tilt"
              min={0}
              max={12}
              step={0.5}
              value={tilt}
              valueUnit="°"
              onChange={value => updateProp('tilt', value)}
            />

            <PreviewSlider
              title="Smoothing"
              min={0.04}
              max={0.3}
              step={0.01}
              value={smoothing}
              onChange={value => updateProp('smoothing', value)}
            />

            <PreviewSlider
              title="Perspective"
              min={450}
              max={1500}
              step={25}
              value={perspective}
              valueUnit="px"
              onChange={value => updateProp('perspective', value)}
            />

            <PreviewSlider
              title="Orbit Speed"
              min={0.05}
              max={1}
              step={0.05}
              value={orbitSpeed}
              onChange={value => updateProp('orbitSpeed', value)}
            />

            <PreviewSwitch
              title="Pointer Tracking"
              isChecked={pointerTracking}
              onChange={checked => updateProp('pointerTracking', checked)}
            />

            <PreviewSwitch
              title="Auto Orbit"
              isChecked={autoOrbit}
              onChange={checked => updateProp('autoOrbit', checked)}
            />

            <PreviewSwitch title="Shadow" isChecked={shadow} onChange={checked => updateProp('shadow', checked)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={[]} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={depthText} componentName="DepthText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DepthTextDemo;
