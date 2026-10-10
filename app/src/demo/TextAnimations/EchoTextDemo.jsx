import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import RefreshButton from '../../components/common/Preview/RefreshButton';

import useComponentProps from '../../hooks/useComponentProps';
import useForceRerender from '../../hooks/useForceRerender';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { useColorModeValue } from '../../components/setup/color-mode';

import EchoText from '../../content/TextAnimations/EchoText/EchoText';
import { echoText } from '../../constants/code/TextAnimations/echoTextCode';

const DEFAULT_PROPS = {
  text: 'Motion Echo',
  echoes: 12,
  lag: 0.24,
  offset: 36,
  direction: 'right',
  fade: 0.72,
  blur: 3,
  tint: '#7dd3fc',
  mode: 'both',
  cursorRadius: 320,
  duration: 900,
  ease: 'ease-out',
  fontSize: 'clamp(3rem, 9vw, 7rem)',
  fontWeight: 800,
  color: '#f8fafc'
};

const DIRECTION_OPTIONS = [
  { value: 'right', label: 'Right' },
  { value: 'left', label: 'Left' },
  { value: 'up', label: 'Up' },
  { value: 'down', label: 'Down' },
  { value: 'diagonal', label: 'Diagonal' }
];

const MODE_OPTIONS = [
  { value: 'both', label: 'Entrance + Pointer' },
  { value: 'entrance', label: 'Entrance Only' },
  { value: 'pointer', label: 'Pointer Only' }
];

const EASE_OPTIONS = [
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'snappy', label: 'Snappy' },
  { value: 'linear', label: 'Linear' }
];

const FONT_SIZE_OPTIONS = [
  { value: 'clamp(2.5rem, 7vw, 5.5rem)', label: 'Compact' },
  { value: 'clamp(3rem, 9vw, 7rem)', label: 'Hero' },
  { value: 'clamp(4rem, 12vw, 9rem)', label: 'Billboard' }
];

const EchoTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const [key, forceRerender] = useForceRerender();
  const {
    text,
    echoes,
    lag,
    offset,
    direction,
    fade,
    blur,
    tint,
    mode,
    cursorRadius,
    duration,
    ease,
    fontSize,
    fontWeight,
    color
  } = props;
  const renderedColor = useColorModeValue(color === DEFAULT_PROPS.color ? '#18181b' : color, color);

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '"Motion Echo"',
        description: 'Text rendered by the crisp front copy and every echo layer.'
      },
      {
        name: 'echoes',
        type: 'number',
        default: '12',
        description: 'Number of ghost copies behind the front text.'
      },
      {
        name: 'lag',
        type: 'number',
        default: '0.24',
        description: 'How slowly deeper echoes chase the current target.'
      },
      {
        name: 'offset',
        type: 'number',
        default: '36',
        description: 'Pixel travel used by the entrance spread and pointer response.'
      },
      {
        name: 'direction',
        type: '"right" | "left" | "up" | "down" | "diagonal"',
        default: '"right"',
        description: 'Direction the entrance trail collapses from.'
      },
      {
        name: 'fade',
        type: 'number',
        default: '0.72',
        description: 'Opacity falloff applied from one echo to the next.'
      },
      {
        name: 'blur',
        type: 'number',
        default: '3',
        description: 'Maximum blur in pixels on the deepest echo.'
      },
      {
        name: 'tint',
        type: 'string | false',
        default: '"#7dd3fc"',
        description: 'Optional chromatic tint blended into the echo layers.'
      },
      {
        name: 'mode',
        type: '"entrance" | "pointer" | "both"',
        default: '"both"',
        description: 'Whether to run the entrance, pointer smear, or both.'
      },
      {
        name: 'cursorRadius',
        type: 'number',
        default: '320',
        description:
          'Distance in pixels over which the cursor pulls the text to full offset. Larger values react from further away and arrive later.'
      },
      {
        name: 'duration',
        type: 'number',
        default: '900',
        description: 'Entrance convergence duration in milliseconds.'
      },
      {
        name: 'ease',
        type: '"linear" | "ease-out" | "ease-in-out" | "snappy"',
        default: '"ease-out"',
        description: 'Timing curve used for the entrance convergence.'
      },
      {
        name: 'fontSize',
        type: 'string | number',
        default: '"clamp(3rem, 9vw, 7rem)"',
        description: 'Font size applied to the text stack.'
      },
      {
        name: 'fontWeight',
        type: 'string | number',
        default: '800',
        description: 'Font weight applied to all copies.'
      },
      {
        name: 'color',
        type: 'string',
        default: '"#f8fafc"',
        description: 'Color of the crisp front copy.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Additional class names for the root element.'
      },
      {
        name: 'style',
        type: 'CSSProperties',
        default: 'undefined',
        description: 'Optional inline styles for the root element.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            position="relative"
            className="demo-container"
            minH={430}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            px={{ base: 6, md: 14 }}
          >
            <RefreshButton onClick={forceRerender} />
            <EchoText
              key={key}
              text={text}
              echoes={echoes}
              lag={lag}
              offset={offset}
              direction={direction}
              fade={fade}
              blur={blur}
              tint={tint}
              mode={mode}
              cursorRadius={cursorRadius}
              duration={duration}
              ease={ease}
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={renderedColor}
            />
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              maxLength={24}
              width={220}
              onChange={val => updateProp('text', val)}
            />

            <PreviewColorPickerCustom
              title="Text Color"
              color={renderedColor}
              onChange={val => updateProp('color', val)}
            />

            <PreviewColorPickerCustom
              title="Echo Tint"
              color={tint || '#7dd3fc'}
              onChange={val => updateProp('tint', val)}
            />

            <PreviewSwitch
              title="Tint Echoes"
              isChecked={Boolean(tint)}
              onChange={checked => updateProp('tint', checked ? '#7dd3fc' : false)}
            />

            <PreviewSelect
              title="Mode"
              options={MODE_OPTIONS}
              value={mode}
              width={180}
              onChange={val => updateProp('mode', val)}
            />

            <PreviewSlider
              title="Cursor Radius"
              min={80}
              max={900}
              step={10}
              value={cursorRadius}
              valueUnit="px"
              isDisabled={mode === 'entrance'}
              onChange={val => updateProp('cursorRadius', val)}
            />

            <PreviewSelect
              title="Direction"
              options={DIRECTION_OPTIONS}
              value={direction}
              width={140}
              onChange={val => {
                updateProp('direction', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Ease"
              options={EASE_OPTIONS}
              value={ease}
              width={150}
              onChange={val => {
                updateProp('ease', val);
                forceRerender();
              }}
            />

            <PreviewSelect
              title="Size"
              options={FONT_SIZE_OPTIONS}
              value={fontSize}
              width={140}
              onChange={val => updateProp('fontSize', val)}
            />

            <PreviewSlider
              title="Echoes"
              min={2}
              max={18}
              step={1}
              value={echoes}
              onChange={val => updateProp('echoes', val)}
            />
            <PreviewSlider
              title="Lag"
              min={0.05}
              max={0.3}
              step={0.01}
              value={lag}
              onChange={val => updateProp('lag', val)}
            />
            <PreviewSlider
              title="Offset"
              min={8}
              max={56}
              step={1}
              value={offset}
              valueUnit="px"
              onChange={val => updateProp('offset', val)}
            />
            <PreviewSlider
              title="Fade"
              min={0.35}
              max={0.85}
              step={0.01}
              value={fade}
              onChange={val => updateProp('fade', val)}
            />
            <PreviewSlider
              title="Blur"
              min={0}
              max={7}
              step={0.25}
              value={blur}
              valueUnit="px"
              onChange={val => updateProp('blur', val)}
            />
            <PreviewSlider
              title="Duration"
              min={300}
              max={1600}
              step={50}
              value={duration}
              valueUnit="ms"
              onChange={val => {
                updateProp('duration', val);
                forceRerender();
              }}
            />
            <PreviewSlider
              title="Weight"
              min={500}
              max={950}
              step={50}
              value={fontWeight}
              onChange={val => updateProp('fontWeight', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={[]} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={echoText} componentName="EchoText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default EchoTextDemo;
