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

import WarpText from '../../content/TextAnimations/WarpText/WarpText';
import { warpText } from '../../constants/code/TextAnimations/warpTextCode';

const DEFAULT_PROPS = {
  text: 'Bend the moment',
  color: '#f8f5ff',
  warpStrength: 0.08,
  warpScale: 1.7,
  speed: 0.55,
  pointerInfluence: 0.42,
  pointerStrength: 0.38,
  refraction: 0.018,
  ripple: true,
  fontSize: 116,
  fontWeight: 800,
  fontFamily: 'inherit',
  letterSpacing: -0.06,
  lineHeight: 0.9
};

const fontOptions = [
  { value: 'inherit', label: 'System' },
  { value: 'Georgia, serif', label: 'Serif' },
  { value: 'ui-monospace, SFMono-Regular, Menlo, monospace', label: 'Mono' }
];

const weightOptions = [
  { value: 600, label: '600' },
  { value: 700, label: '700' },
  { value: 800, label: '800' },
  { value: 900, label: '900' }
];

const WarpTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    text,
    color,
    warpStrength,
    warpScale,
    speed,
    pointerInfluence,
    pointerStrength,
    refraction,
    ripple,
    fontSize,
    fontWeight,
    fontFamily,
    letterSpacing,
    lineHeight
  } = props;
  const renderedColor = useColorModeValue(color === DEFAULT_PROPS.color ? '#18181b' : color, color);

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '"Bend the moment"',
        description: 'The headline text rendered into the WebGL texture.'
      },
      {
        name: 'color',
        type: 'string',
        default: '"#f8f5ff"',
        description: 'Text fill color before the glass refraction pass.'
      },
      {
        name: 'warpStrength',
        type: 'number',
        default: '0.08',
        description: 'Amount of ambient glass distortion at rest.'
      },
      { name: 'warpScale', type: 'number', default: '1.7', description: 'Size of the moving distortion cells.' },
      { name: 'speed', type: 'number', default: '0.55', description: 'Speed of the ambient undulation.' },
      { name: 'pointerInfluence', type: 'number', default: '0.42', description: 'Radius of the cursor lensing area.' },
      {
        name: 'pointerStrength',
        type: 'number',
        default: '0.38',
        description: 'Strength of cursor-driven bending and magnification.'
      },
      {
        name: 'refraction',
        type: 'number',
        default: '0.018',
        description: 'Subtle RGB channel split for the glass edge.'
      },
      { name: 'ripple', type: 'boolean', default: 'true', description: 'Adds a soft ripple to the pointer lens.' },
      {
        name: 'fontSize',
        type: 'string | number',
        default: '"clamp(3rem, 10vw, 9rem)"',
        description: 'Canvas raster font size. Numbers are pixels.'
      },
      {
        name: 'fontWeight',
        type: 'string | number',
        default: '800',
        description: 'Font weight used when rasterising the text texture.'
      },
      {
        name: 'fontFamily',
        type: 'string',
        default: '"inherit"',
        description: 'Font family used when rasterising the text texture.'
      },
      {
        name: 'letterSpacing',
        type: 'string | number',
        default: '"-0.06em"',
        description: 'Tracking applied while drawing the text into the texture.'
      },
      { name: 'lineHeight', type: 'string | number', default: '0.9', description: 'Line height for multi-line text.' },
      { name: 'className', type: 'string', default: '""', description: 'Optional class name for the root element.' },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: 'undefined',
        description: 'Optional inline styles for sizing or layout.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box className="demo-container" minH={430} maxH={460} p={0} overflow="hidden" position="relative">
            <WarpText
              text={text}
              color={renderedColor}
              warpStrength={warpStrength}
              warpScale={warpScale}
              speed={speed}
              pointerInfluence={pointerInfluence}
              pointerStrength={pointerStrength}
              refraction={refraction}
              ripple={ripple}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
              letterSpacing={`${letterSpacing}em`}
              lineHeight={lineHeight}
              style={{ height: '100%', minHeight: '430px', borderRadius: '28px' }}
            />
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Your headline"
              maxLength={36}
              onChange={value => updateProp('text', value)}
            />

            <PreviewColorPickerCustom
              title="Text Color"
              color={renderedColor}
              onChange={value => updateProp('color', value)}
            />

            <PreviewSelect
              title="Font"
              options={fontOptions}
              value={fontFamily}
              onChange={value => updateProp('fontFamily', value)}
            />
            <PreviewSelect
              title="Weight"
              options={weightOptions}
              value={fontWeight}
              onChange={value => updateProp('fontWeight', value)}
            />

            <PreviewSlider
              title="Font Size"
              min={56}
              max={160}
              step={1}
              value={fontSize}
              valueUnit="px"
              onChange={value => updateProp('fontSize', value)}
            />
            <PreviewSlider
              title="Letter Spacing"
              min={-0.12}
              max={0.04}
              step={0.01}
              value={letterSpacing}
              valueUnit="em"
              onChange={value => updateProp('letterSpacing', value)}
            />
            <PreviewSlider
              title="Line Height"
              min={0.78}
              max={1.2}
              step={0.01}
              value={lineHeight}
              onChange={value => updateProp('lineHeight', value)}
            />

            <PreviewSlider
              title="Warp Strength"
              min={0}
              max={0.18}
              step={0.01}
              value={warpStrength}
              onChange={value => updateProp('warpStrength', value)}
            />
            <PreviewSlider
              title="Warp Scale"
              min={0.8}
              max={3}
              step={0.1}
              value={warpScale}
              onChange={value => updateProp('warpScale', value)}
            />
            <PreviewSlider
              title="Speed"
              min={0}
              max={1.5}
              step={0.05}
              value={speed}
              onChange={value => updateProp('speed', value)}
            />
            <PreviewSlider
              title="Pointer Radius"
              min={0.18}
              max={0.75}
              step={0.01}
              value={pointerInfluence}
              onChange={value => updateProp('pointerInfluence', value)}
            />
            <PreviewSlider
              title="Pointer Strength"
              min={0}
              max={0.8}
              step={0.01}
              value={pointerStrength}
              onChange={value => updateProp('pointerStrength', value)}
            />
            <PreviewSlider
              title="Refraction"
              min={0}
              max={0.05}
              step={0.001}
              value={refraction}
              onChange={value => updateProp('refraction', value)}
            />
            <PreviewSwitch title="Ripple" isChecked={ripple} onChange={checked => updateProp('ripple', checked)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={warpText} componentName="WarpText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default WarpTextDemo;
