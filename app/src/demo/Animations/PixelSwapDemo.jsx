import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import PixelSwap from '../../content/Animations/PixelSwap/PixelSwap';
import { pixelSwap } from '../../constants/code/Animations/pixelSwapCode';
import './PixelSwapDemo.css';

const DEFAULT_PROPS = {
  pattern: 'random',
  trigger: 'hover',
  pixelSize: 64,
  gap: 0,
  pixelRadius: 0,
  pixelSpin: 0,
  pixelScale: 0.35,
  duration: 1400,
  pixelDuration: 450,
  randomness: 0,
  fade: true
};

const propData = [
  { name: 'firstContent', type: 'ReactNode', default: '—', description: 'Content shown in the initial state.' },
  { name: 'secondContent', type: 'ReactNode', default: '—', description: 'Content revealed after the pixel cover.' },
  {
    name: 'pixelSize',
    type: 'number',
    default: '64',
    description: 'Square pixel edge length in pixels. Grown automatically when the grid would exceed 320 pixels.'
  },
  { name: 'gap', type: 'number', default: '0', description: 'Space between pixels in pixels.' },
  {
    name: 'pixelRadius',
    type: 'number',
    default: '0',
    description: 'Corner rounding of each pixel as a percentage (0 = square, 50 = circle).'
  },
  {
    name: 'pixelScale',
    type: 'number',
    default: '0.35',
    description: 'Size each pixel starts at, relative to its final size.'
  },
  {
    name: 'fade',
    type: 'boolean',
    default: 'true',
    description: 'Fade each pixel in as it opens. Disable for a hard pixel pop.'
  },
  { name: 'duration', type: 'number', default: '1400', description: 'Total transition duration in milliseconds.' },
  {
    name: 'pixelDuration',
    type: 'number',
    default: '450',
    description: 'Time a single pixel takes to open, in milliseconds.'
  },
  {
    name: 'pattern',
    type: '"random" | "center" | "edges" | "left-to-right" | "right-to-left" | "top-to-bottom" | "bottom-to-top" | "diagonal" | "spiral"',
    default: 'random',
    description: 'Order in which pixels animate.'
  },
  {
    name: 'randomness',
    type: 'number',
    default: '0',
    description: 'Noise mixed into the pattern order, from 0 (strict) to 1 (fully scattered).'
  },
  {
    name: 'pixelSpin',
    type: 'number',
    default: '0',
    description: 'Degrees each pixel rotates as it opens.'
  },
  {
    name: 'easing',
    type: 'string',
    default: 'cubic-bezier(0.22, 1, 0.36, 1)',
    description: 'Easing applied to each pixel as it opens.'
  },
  {
    name: 'trigger',
    type: '"hover" | "click" | "manual"',
    default: 'hover',
    description: 'Interaction that requests a content swap.'
  },
  {
    name: 'initialActive',
    type: 'boolean',
    default: 'false',
    description: 'Whether the second content is initially visible.'
  },
  {
    name: 'active',
    type: 'boolean',
    default: '—',
    description: 'Controlled active state. Use with trigger="manual" for external control.'
  },
  {
    name: 'onActiveChange',
    type: '(active: boolean) => void',
    default: '—',
    description: 'Called whenever an interaction requests a state change.'
  },
  {
    name: 'onComplete',
    type: '(active: boolean) => void',
    default: '—',
    description: 'Called once the incoming content is fully revealed.'
  },
  { name: 'aspectRatio', type: 'string', default: '16 / 10', description: 'CSS aspect-ratio value for the wrapper.' },
  { name: 'className', type: 'string', default: '—', description: 'Additional class names for the wrapper.' },
  { name: 'style', type: 'CSSProperties', default: '—', description: 'Inline styles for the wrapper.' }
];

const PixelSwapDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    pattern,
    trigger,
    pixelSize,
    gap,
    pixelRadius,
    pixelSpin,
    pixelScale,
    duration,
    pixelDuration,
    randomness,
    fade
  } = props;

  const hint = useMemo(() => (trigger === 'click' ? 'Click the card' : 'Hover the card'), [trigger]);

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box className="demo-container" minH={500} p={{ base: 4, md: 8 }}>
            <PixelSwap
              key={trigger}
              trigger={trigger}
              firstContent={
                <div className="pixel-swap-demo__panel pixel-swap-demo__panel--first">
                  <span className="pixel-swap-demo__eyebrow">{hint}</span>
                  <h3 className="pixel-swap-demo__title">Use React Bits</h3>
                </div>
              }
              secondContent={
                <div className="pixel-swap-demo__panel pixel-swap-demo__panel--second">
                  <span className="pixel-swap-demo__eyebrow">Now go and</span>
                  <h3 className="pixel-swap-demo__title">Build anything</h3>
                </div>
              }
              pattern={pattern}
              pixelSize={pixelSize}
              gap={gap}
              pixelRadius={pixelRadius}
              pixelSpin={pixelSpin}
              pixelScale={pixelScale}
              duration={duration}
              pixelDuration={pixelDuration}
              randomness={randomness}
              fade={fade}
              className="pixel-swap-demo"
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Pattern"
              value={pattern}
              options={[
                { label: 'Random', value: 'random' },
                { label: 'Center Out', value: 'center' },
                { label: 'Edges In', value: 'edges' },
                { label: 'Left to Right', value: 'left-to-right' },
                { label: 'Right to Left', value: 'right-to-left' },
                { label: 'Top to Bottom', value: 'top-to-bottom' },
                { label: 'Bottom to Top', value: 'bottom-to-top' },
                { label: 'Diagonal', value: 'diagonal' },
                { label: 'Spiral', value: 'spiral' }
              ]}
              onChange={value => updateProp('pattern', value)}
            />
            <PreviewSelect
              title="Trigger"
              value={trigger}
              options={[
                { label: 'Hover', value: 'hover' },
                { label: 'Click', value: 'click' }
              ]}
              onChange={value => updateProp('trigger', value)}
            />
            <PreviewSlider
              title="Pixel Size"
              min={24}
              max={120}
              step={4}
              value={pixelSize}
              valueUnit="px"
              onChange={value => updateProp('pixelSize', value)}
            />
            <PreviewSlider
              title="Gap"
              min={0}
              max={16}
              step={1}
              value={gap}
              valueUnit="px"
              onChange={value => updateProp('gap', value)}
            />
            <PreviewSlider
              title="Pixel Radius"
              min={0}
              max={50}
              step={1}
              value={pixelRadius}
              valueUnit="%"
              onChange={value => updateProp('pixelRadius', value)}
            />
            <PreviewSlider
              title="Pixel Scale"
              min={0.05}
              max={1}
              step={0.05}
              value={pixelScale}
              displayValue={value => value.toFixed(2)}
              onChange={value => updateProp('pixelScale', value)}
            />
            <PreviewSlider
              title="Pixel Spin"
              min={0}
              max={180}
              step={5}
              value={pixelSpin}
              displayValue={value => `${value}°`}
              onChange={value => updateProp('pixelSpin', value)}
            />
            <PreviewSlider
              title="Duration"
              min={400}
              max={4000}
              step={100}
              value={duration}
              valueUnit="ms"
              onChange={value => updateProp('duration', value)}
            />
            <PreviewSlider
              title="Pixel Duration"
              min={100}
              max={1200}
              step={50}
              value={pixelDuration}
              valueUnit="ms"
              onChange={value => updateProp('pixelDuration', value)}
            />
            <PreviewSlider
              title="Randomness"
              min={0}
              max={1}
              step={0.05}
              value={randomness}
              displayValue={value => value.toFixed(2)}
              isDisabled={pattern === 'random'}
              onChange={value => updateProp('randomness', value)}
            />
            <PreviewSwitch title="Fade" isChecked={fade} onChange={value => updateProp('fade', value)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={[]} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={pixelSwap} componentName="PixelSwap" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default PixelSwapDemo;
