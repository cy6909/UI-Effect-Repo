import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import Customize from '../../components/common/Preview/Customize';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import useComponentProps from '../../hooks/useComponentProps';
import useForceRerender from '../../hooks/useForceRerender';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { useColorModeValue } from '../../components/setup/color-mode';

import StrokeText from '../../content/TextAnimations/StrokeText/StrokeText';
import { strokeText } from '../../constants/code/TextAnimations/strokeTextCode';

const DEFAULT_PROPS = {
  text: 'Draw Attention',
  strokeColor: '#A78BFA',
  fillColor: '#F8FAFC',
  strokeWidth: 1.4,
  drawDuration: 1.6,
  fillDelay: 0.2,
  stagger: 0.05,
  ease: 'power2.out',
  trigger: 'mount',
  fillMode: 'wipe',
  fontSize: 128,
  fontWeight: 800,
  letterSpacing: -4,
  reverse: false
};

const triggerOptions = [
  { value: 'mount', label: 'Mount' },
  { value: 'hover', label: 'Hover' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'loop', label: 'Loop' }
];

const fillModeOptions = [
  { value: 'wipe', label: 'Wipe' },
  { value: 'fade', label: 'Fade' },
  { value: 'none', label: 'None' }
];

const easeOptions = [
  { value: 'power2.out', label: 'Power Out' },
  { value: 'power3.out', label: 'Crisp Out' },
  { value: 'expo.out', label: 'Expo Out' },
  { value: 'sine.inOut', label: 'Sine In Out' }
];

const StrokeTextDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    text,
    strokeColor,
    fillColor,
    strokeWidth,
    drawDuration,
    fillDelay,
    stagger,
    ease,
    trigger,
    fillMode,
    fontSize,
    fontWeight,
    letterSpacing,
    reverse
  } = props;
  const renderedFillColor = useColorModeValue(
    fillColor === DEFAULT_PROPS.fillColor ? '#000000' : fillColor,
    fillColor
  );

  const updateAndReplay = (name, value) => {
    updateProp(name, value);
    forceRerender();
  };

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '"Draw Attention"',
        description: 'The heading copy rendered as measured SVG glyphs.'
      },
      {
        name: 'strokeColor',
        type: 'string',
        default: '"#A78BFA"',
        description: 'Color used for the drawing outline.'
      },
      {
        name: 'fillColor',
        type: 'string',
        default: '"#F8FAFC"',
        description: 'Color that floods into the glyphs after the outline draw.'
      },
      {
        name: 'strokeWidth',
        type: 'number',
        default: '1.4',
        description: 'Width of the SVG text outline.'
      },
      {
        name: 'drawDuration',
        type: 'number',
        default: '1.6',
        description: 'Seconds each character outline spends drawing on.'
      },
      {
        name: 'fillDelay',
        type: 'number',
        default: '0.2',
        description: 'Seconds to wait after the outline draw before the fill begins.'
      },
      {
        name: 'stagger',
        type: 'number',
        default: '0.05',
        description: 'Delay in seconds between each character animation.'
      },
      {
        name: 'ease',
        type: 'string',
        default: '"power2.out"',
        description: 'GSAP easing used for the outline draw.'
      },
      {
        name: 'trigger',
        type: '"mount" | "hover" | "scroll" | "loop"',
        default: '"mount"',
        description: 'Chooses when the draw timeline starts.'
      },
      {
        name: 'fillMode',
        type: '"fade" | "wipe" | "none"',
        default: '"wipe"',
        description: 'Controls whether fill appears with a fade, left-to-right wipe, or not at all.'
      },
      {
        name: 'fontSize',
        type: 'number | string',
        default: '128',
        description: 'SVG font size before the responsive viewBox scales the wordmark.'
      },
      {
        name: 'fontWeight',
        type: 'number | string',
        default: '800',
        description: 'Weight of the rendered letterforms.'
      },
      {
        name: 'letterSpacing',
        type: 'number | string',
        default: '-4',
        description: 'Tracking applied during measurement and rendering.'
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: 'false',
        description: 'Draws the stagger from the final character back to the first.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Optional class applied to the root wrapper.'
      },
      {
        name: 'style',
        type: 'CSSProperties',
        default: '{}',
        description: 'Inline styles passed to the root wrapper.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={430} overflow="hidden" p={{ base: 8, md: 14 }}>
            <RefreshButton onClick={forceRerender} />
            <Box position="relative" w="100%" textAlign="center">
              <StrokeText
                key={key}
                text={text}
                strokeColor={strokeColor}
                fillColor={renderedFillColor}
                strokeWidth={strokeWidth}
                drawDuration={drawDuration}
                fillDelay={fillDelay}
                stagger={stagger}
                ease={ease}
                trigger={trigger}
                fillMode={fillMode}
                fontSize={fontSize}
                fontWeight={fontWeight}
                letterSpacing={letterSpacing}
                reverse={reverse}
                style={{ margin: '0 auto' }}
              />
            </Box>
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Your headline"
              maxLength={22}
              onChange={value => updateAndReplay('text', value)}
            />

            <PreviewColorPickerCustom
              title="Stroke"
              color={strokeColor}
              onChange={value => updateAndReplay('strokeColor', value)}
            />
            <PreviewColorPickerCustom
              title="Fill"
              color={renderedFillColor}
              onChange={value => updateAndReplay('fillColor', value)}
            />

            <PreviewSelect
              title="Trigger"
              options={triggerOptions}
              value={trigger}
              onChange={value => updateAndReplay('trigger', value)}
            />
            <PreviewSelect
              title="Fill Mode"
              options={fillModeOptions}
              value={fillMode}
              onChange={value => updateAndReplay('fillMode', value)}
            />
            <PreviewSelect
              title="Ease"
              options={easeOptions}
              value={ease}
              onChange={value => updateAndReplay('ease', value)}
            />

            <PreviewSlider
              title="Stroke Width"
              min={0.5}
              max={4}
              step={0.1}
              value={strokeWidth}
              onChange={value => updateAndReplay('strokeWidth', value)}
            />

            <PreviewSlider
              title="Draw Duration"
              min={0.6}
              max={3}
              step={0.1}
              value={drawDuration}
              valueUnit="s"
              onChange={value => updateAndReplay('drawDuration', value)}
            />

            <PreviewSlider
              title="Fill Delay"
              min={0}
              max={1}
              step={0.05}
              value={fillDelay}
              valueUnit="s"
              onChange={value => updateAndReplay('fillDelay', value)}
            />

            <PreviewSlider
              title="Stagger"
              min={0}
              max={0.12}
              step={0.005}
              value={stagger}
              valueUnit="s"
              onChange={value => updateAndReplay('stagger', value)}
            />

            <PreviewSlider
              title="Font Size"
              min={72}
              max={170}
              step={2}
              value={fontSize}
              valueUnit="px"
              onChange={value => updateAndReplay('fontSize', value)}
            />

            <PreviewSlider
              title="Font Weight"
              min={300}
              max={900}
              step={50}
              value={fontWeight}
              onChange={value => updateAndReplay('fontWeight', value)}
            />

            <PreviewSlider
              title="Letter Spacing"
              min={-10}
              max={8}
              step={0.5}
              value={letterSpacing}
              valueUnit="px"
              onChange={value => updateAndReplay('letterSpacing', value)}
            />

            <PreviewSwitch
              title="Reverse Stagger"
              isChecked={reverse}
              onChange={checked => updateAndReplay('reverse', checked)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={strokeText} componentName="StrokeText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default StrokeTextDemo;
