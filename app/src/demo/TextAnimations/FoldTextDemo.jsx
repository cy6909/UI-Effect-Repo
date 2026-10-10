import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import Customize from '../../components/common/Preview/Customize';
import Dependencies from '../../components/code/Dependencies';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PropTable from '../../components/common/Preview/PropTable';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import useComponentProps from '../../hooks/useComponentProps';
import useForceRerender from '../../hooks/useForceRerender';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { useColorModeValue } from '../../components/setup/color-mode';

import FoldText from '../../content/TextAnimations/FoldText/FoldText';
import { foldText } from '../../constants/code/TextAnimations/foldTextCode';

const DEFAULT_PROPS = {
  text: 'Design unfolds',
  splitBy: 'char',
  hinge: 'top',
  duration: 0.65,
  stagger: 0.045,
  ease: 'power3.out',
  perspective: 700,
  creaseShading: 0.55,
  trigger: 'mount',
  fontSize: 80,
  fontWeight: 800,
  color: '#f7f2e8'
};

const SPLIT_OPTIONS = [
  { value: 'char', label: 'Character' },
  { value: 'word', label: 'Word' },
  { value: 'line', label: 'Line' }
];

const HINGE_OPTIONS = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' }
];

const TRIGGER_OPTIONS = [
  { value: 'mount', label: 'Mount' },
  { value: 'hover', label: 'Hover' },
  { value: 'scroll', label: 'Scroll' },
  { value: 'loop', label: 'Loop' }
];

const EASE_OPTIONS = [
  { value: 'power3.out', label: 'Power out' },
  { value: 'expo.out', label: 'Expo out' },
  { value: 'back.out(1.2)', label: 'Soft back' },
  { value: 'circ.out', label: 'Circular' }
];

const FoldTextDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    text,
    splitBy,
    hinge,
    duration,
    stagger,
    ease,
    perspective,
    creaseShading,
    trigger,
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
        default: '"Design unfolds"',
        description: 'The text content to split and fold into place.'
      },
      {
        name: 'splitBy',
        type: '"char" | "word" | "line"',
        default: '"char"',
        description: 'Controls whether each character, word, or explicit line folds as a panel.'
      },
      {
        name: 'hinge',
        type: '"top" | "bottom" | "left" | "right"',
        default: '"top"',
        description: 'The edge that acts as the 3D fold hinge.'
      },
      {
        name: 'duration',
        type: 'number',
        default: '0.65',
        description: 'Duration in seconds for each panel to unfold.'
      },
      {
        name: 'stagger',
        type: 'number',
        default: '0.045',
        description: 'Delay in seconds between panels; 0.03–0.08 keeps the cascade crisp.'
      },
      {
        name: 'ease',
        type: 'string',
        default: '"power3.out"',
        description: 'GSAP easing curve used by the unfold timeline.'
      },
      {
        name: 'perspective',
        type: 'number',
        default: '700',
        description: 'Perspective distance applied to each panel parent.'
      },
      {
        name: 'creaseShading',
        type: 'number',
        default: '0.55',
        description: 'Strength of the gradient shade while panels are folded.'
      },
      {
        name: 'trigger',
        type: '"mount" | "hover" | "scroll" | "loop"',
        default: '"mount"',
        description: 'Determines when the unfold animation starts.'
      },
      {
        name: 'fontSize',
        type: 'string | number',
        default: '80',
        description: 'Font size applied to the root text.'
      },
      {
        name: 'fontWeight',
        type: 'string | number',
        default: '800',
        description: 'Font weight applied to the root text.'
      },
      {
        name: 'color',
        type: 'string',
        default: '"#f7f2e8"',
        description: 'Text color of the folded panels.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Adds custom classes to the root element.'
      },
      {
        name: 'style',
        type: 'CSSProperties',
        default: '{}',
        description: 'Inline style overrides for the root element.'
      }
    ],
    []
  );

  const updateAndReplay = (name, value) => {
    updateProp(name, value);
    forceRerender();
  };

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" minH={430} overflow="hidden">
            <RefreshButton onClick={forceRerender} />
            <Box
              position="relative"
              minH={430}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              textAlign="center"
              px={8}
            >
              <FoldText
                key={key}
                text={text}
                splitBy={splitBy}
                hinge={hinge}
                duration={duration}
                stagger={stagger}
                ease={ease}
                perspective={perspective}
                creaseShading={creaseShading}
                trigger={trigger}
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={renderedColor}
              />
            </Box>
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Enter heading text"
              maxLength={34}
              onChange={value => updateAndReplay('text', value)}
            />

            <PreviewSelect
              title="Split By"
              options={SPLIT_OPTIONS}
              value={splitBy}
              onChange={value => updateAndReplay('splitBy', value)}
            />
            <PreviewSelect
              title="Hinge"
              options={HINGE_OPTIONS}
              value={hinge}
              onChange={value => updateAndReplay('hinge', value)}
            />
            <PreviewSelect
              title="Trigger"
              options={TRIGGER_OPTIONS}
              value={trigger}
              onChange={value => updateAndReplay('trigger', value)}
            />
            <PreviewSelect
              title="Ease"
              options={EASE_OPTIONS}
              value={ease}
              width={140}
              onChange={value => updateAndReplay('ease', value)}
            />

            <PreviewColorPickerCustom
              title="Text Color"
              color={renderedColor}
              onChange={value => updateAndReplay('color', value)}
            />

            <PreviewSlider
              title="Duration"
              min={0.35}
              max={1.2}
              step={0.05}
              value={duration}
              valueUnit="s"
              onChange={value => updateAndReplay('duration', value)}
            />

            <PreviewSlider
              title="Stagger"
              min={0.03}
              max={0.08}
              step={0.005}
              value={stagger}
              valueUnit="s"
              onChange={value => updateAndReplay('stagger', value)}
            />

            <PreviewSlider
              title="Perspective"
              min={350}
              max={1200}
              step={25}
              value={perspective}
              valueUnit="px"
              onChange={value => updateAndReplay('perspective', value)}
            />

            <PreviewSlider
              title="Crease Shading"
              min={0}
              max={1}
              step={0.05}
              value={creaseShading}
              onChange={value => updateAndReplay('creaseShading', value)}
            />

            <PreviewSlider
              title="Font Size"
              min={44}
              max={112}
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
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={foldText} componentName="FoldText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default FoldTextDemo;
