import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import Customize from '../../components/common/Preview/Customize';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import SplitFlapText from '../../content/TextAnimations/SplitFlapText/SplitFlapText';
import { splitFlapText } from '../../constants/code/TextAnimations/splitFlapTextCode';

const PHRASE_SETS = {
  launch: ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  travel: ['BOARDING NOW', 'FINAL CALL', 'GATE OPEN'],
  product: ['BUILD FASTER', 'SHIP CLEANER', 'DELIGHT USERS'],
  numeric: ['FLIGHT 204', 'GATE 18', 'SEAT 07A']
};

const DEFAULT_PROPS = {
  words: ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'],
  flipDuration: 0.12,
  stagger: 0.06,
  cycleDelay: 2400,
  charset: 'alphanumeric',
  flipsPerChar: 8,
  tileColor: '#111827',
  textColor: '#f8fafc',
  tileRadius: 8,
  gap: 6,
  fontSize: 52,
  loop: true,
  padTo: 12
};

const phraseOptions = [
  { value: 'launch', label: 'Launch' },
  { value: 'travel', label: 'Travel' },
  { value: 'product', label: 'Product' },
  { value: 'numeric', label: 'Numeric' }
];

const charsetOptions = [
  { value: 'alphanumeric', label: 'A-Z + 0-9' },
  { value: 'alpha', label: 'A-Z' },
  { value: 'numeric', label: '0-9' },
  { value: 'ABCDEF0123456789•', label: 'Hex + dot' }
];

const SplitFlapTextDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    words,
    flipDuration,
    stagger,
    cycleDelay,
    charset,
    flipsPerChar,
    tileColor,
    textColor,
    tileRadius,
    gap,
    fontSize,
    loop,
    padTo
  } = props;

  const phraseSet =
    Object.entries(PHRASE_SETS).find(([, phrases]) => phrases.join('\u001f') === words.join('\u001f'))?.[0] || 'launch';

  const propData = useMemo(
    () => [
      {
        name: 'words',
        type: 'string[]',
        default: "['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']",
        description: 'Phrases to cycle through like a departure board.'
      },
      {
        name: 'text',
        type: 'string',
        default: 'undefined',
        description: 'Optional single phrase. When set, it takes precedence over words.'
      },
      {
        name: 'flipDuration',
        type: 'number',
        default: '0.12',
        description: 'Duration, in seconds, of each individual flap turn.'
      },
      {
        name: 'stagger',
        type: 'number',
        default: '0.06',
        description: 'Delay, in seconds, between each tile starting its cascade.'
      },
      {
        name: 'cycleDelay',
        type: 'number',
        default: '2400',
        description: 'Hold time, in milliseconds, before cycling to the next phrase.'
      },
      {
        name: 'charset',
        type: '"alpha" | "alphanumeric" | "numeric" | string',
        default: '"alphanumeric"',
        description: 'Characters used for the intermediate flip glyphs.'
      },
      {
        name: 'flipsPerChar',
        type: 'number',
        default: '8',
        description: 'Number of intermediate glyphs each changed tile flips through.'
      },
      {
        name: 'tileColor',
        type: 'string',
        default: '"#111827"',
        description: 'Base color of each mechanical tile.'
      },
      {
        name: 'textColor',
        type: 'string',
        default: '"#f8fafc"',
        description: 'Color of the glyphs on every flap.'
      },
      {
        name: 'tileRadius',
        type: 'number | string',
        default: '8',
        description: 'Corner radius for each tile.'
      },
      {
        name: 'gap',
        type: 'number | string',
        default: '6',
        description: 'Space between adjacent flap tiles.'
      },
      {
        name: 'fontSize',
        type: 'number | string',
        default: '52',
        description: 'Tile type size. Numeric values are treated as pixels.'
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Whether the phrase array repeats after the final phrase.'
      },
      {
        name: 'padTo',
        type: 'number',
        default: '12',
        description: 'Fixed tile count used to keep the board width stable.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Optional class name for custom styling.'
      },
      {
        name: 'style',
        type: 'CSSProperties',
        default: '{}',
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
            className="demo-container"
            minH={360}
            p={{ base: 6, md: 12 }}
            overflow="hidden"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SplitFlapText
              words={words}
              flipDuration={flipDuration}
              stagger={stagger}
              cycleDelay={cycleDelay}
              charset={charset}
              flipsPerChar={flipsPerChar}
              tileColor={tileColor}
              textColor={textColor}
              tileRadius={tileRadius}
              gap={gap}
              fontSize={fontSize}
              loop={loop}
              padTo={padTo}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Phrase Set"
              options={phraseOptions}
              value={phraseSet}
              onChange={value => {
                updateProp('words', PHRASE_SETS[value]);
              }}
            />
            <PreviewSelect
              title="Charset"
              options={charsetOptions}
              value={charset}
              onChange={value => updateProp('charset', value)}
            />
            <PreviewColorPickerCustom
              title="Tile Color"
              color={tileColor}
              onChange={value => updateProp('tileColor', value)}
            />
            <PreviewColorPickerCustom
              title="Text Color"
              color={textColor}
              onChange={value => updateProp('textColor', value)}
            />
            <PreviewSlider
              title="Flip Duration"
              min={0.06}
              max={0.24}
              step={0.01}
              value={flipDuration}
              valueUnit="s"
              onChange={value => updateProp('flipDuration', value)}
            />
            <PreviewSlider
              title="Stagger"
              min={0}
              max={0.14}
              step={0.01}
              value={stagger}
              valueUnit="s"
              onChange={value => updateProp('stagger', value)}
            />
            <PreviewSlider
              title="Cycle Delay"
              min={900}
              max={5000}
              step={100}
              value={cycleDelay}
              valueUnit="ms"
              onChange={value => updateProp('cycleDelay', value)}
            />
            <PreviewSlider
              title="Flips"
              min={1}
              max={14}
              step={1}
              value={flipsPerChar}
              onChange={value => updateProp('flipsPerChar', value)}
            />
            <PreviewSlider
              title="Pad To"
              min={8}
              max={18}
              step={1}
              value={padTo}
              onChange={value => updateProp('padTo', value)}
            />
            <PreviewSlider
              title="Font Size"
              min={32}
              max={76}
              step={1}
              value={fontSize}
              valueUnit="px"
              onChange={value => updateProp('fontSize', value)}
            />
            <PreviewSlider
              title="Tile Radius"
              min={0}
              max={18}
              step={1}
              value={tileRadius}
              valueUnit="px"
              onChange={value => updateProp('tileRadius', value)}
            />
            <PreviewSlider
              title="Gap"
              min={2}
              max={14}
              step={1}
              value={gap}
              valueUnit="px"
              onChange={value => updateProp('gap', value)}
            />
            <PreviewSwitch title="Loop" isChecked={loop} onChange={checked => updateProp('loop', checked)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={[]} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={splitFlapText} componentName="SplitFlapText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SplitFlapTextDemo;
