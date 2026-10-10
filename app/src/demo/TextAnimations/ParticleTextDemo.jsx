import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import useComponentProps from '../../hooks/useComponentProps';
import useForceRerender from '../../hooks/useForceRerender';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { useColorModeValue } from '../../components/setup/color-mode';
import Customize from '../../components/common/Preview/Customize';
import PreviewInput from '../../components/common/Preview/PreviewInput';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import RefreshButton from '../../components/common/Preview/RefreshButton';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import ParticleText from '../../content/TextAnimations/ParticleText/ParticleText';
import { particleText } from '../../constants/code/TextAnimations/particleTextCode';

const DEFAULT_PROPS = {
  text: 'Future Interfaces',
  particleSize: 2.2,
  density: 4,
  color: '#f8fafc',
  highlightColor: '#8b5cf6',
  scatter: 190,
  gatherDuration: 1600,
  stagger: 420,
  pointerRepel: 42,
  repelRadius: 120,
  idleDrift: 0.8,
  trigger: 'mount',
  fontSize: 'clamp(3.5rem, 13vw, 9rem)',
  fontWeight: 800,
  fontFamily: 'inherit',
  glow: true
};

const triggerOptions = [
  { value: 'mount', label: 'Mount' },
  { value: 'hover', label: 'Hover' },
  { value: 'click', label: 'Click' }
];

const weightOptions = [
  { value: 500, label: '500' },
  { value: 650, label: '650' },
  { value: 800, label: '800' },
  { value: 900, label: '900' }
];

const ParticleTextDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    text,
    particleSize,
    density,
    color,
    highlightColor,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    fontSize,
    fontWeight,
    fontFamily,
    glow
  } = props;
  const renderedColor = useColorModeValue(color === DEFAULT_PROPS.color ? '#18181b' : color, color);

  const propData = useMemo(
    () => [
      {
        name: 'text',
        type: 'string',
        default: '"React Bits"',
        description: 'The words sampled into particle targets.'
      },
      {
        name: 'particleSize',
        type: 'number',
        default: '2',
        description: 'Rendered size of each particle in CSS pixels.'
      },
      {
        name: 'density',
        type: 'number',
        default: '4',
        description: 'Pixel sampling step for the offscreen glyph canvas. Lower values create more particles.'
      },
      {
        name: 'color',
        type: 'string',
        default: '"#ffffff"',
        description: 'Primary particle color.'
      },
      {
        name: 'highlightColor',
        type: 'string',
        default: '"#8b5cf6"',
        description: 'Secondary color blended through the particle field.'
      },
      {
        name: 'scatter',
        type: 'number',
        default: '180',
        description: 'How far particles begin from their final glyph targets.'
      },
      {
        name: 'gatherDuration',
        type: 'number',
        default: '1600',
        description: 'Milliseconds for particles to converge into the text.'
      },
      {
        name: 'stagger',
        type: 'number',
        default: '420',
        description: 'Maximum per-particle delay in milliseconds before gathering.'
      },
      {
        name: 'pointerRepel',
        type: 'number',
        default: '40',
        description: 'Strength of the cursor pushback.'
      },
      {
        name: 'repelRadius',
        type: 'number',
        default: '120',
        description: 'Cursor influence radius in pixels.'
      },
      {
        name: 'idleDrift',
        type: 'number',
        default: '0.7',
        description: 'Subtle resting motion after the text has formed.'
      },
      {
        name: 'trigger',
        type: '"mount" | "hover" | "click"',
        default: '"mount"',
        description: 'How the scatter-and-reform sequence can replay after the first formation.'
      },
      {
        name: 'fontSize',
        type: 'number | string',
        default: '"clamp(3rem, 12vw, 8rem)"',
        description: 'Canvas text size used for glyph sampling.'
      },
      {
        name: 'fontWeight',
        type: 'number | string',
        default: '800',
        description: 'Font weight used for sampling.'
      },
      {
        name: 'fontFamily',
        type: 'string',
        default: '"inherit"',
        description: 'Font family used for sampling. Inherit waits for the surrounding font before sampling.'
      },
      {
        name: 'glow',
        type: 'boolean',
        default: 'true',
        description: 'Adds a soft particle bloom in the highlight color.'
      },
      {
        name: 'className',
        type: 'string',
        default: '""',
        description: 'Optional wrapper class name.'
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        default: 'undefined',
        description: 'Optional inline styles for the wrapper.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={430} overflow="hidden">
            <RefreshButton onClick={forceRerender} />
            <ParticleText
              key={key}
              text={text}
              particleSize={particleSize}
              density={density}
              color={renderedColor}
              highlightColor={highlightColor}
              scatter={scatter}
              gatherDuration={gatherDuration}
              stagger={stagger}
              pointerRepel={pointerRepel}
              repelRadius={repelRadius}
              idleDrift={idleDrift}
              trigger={trigger}
              fontSize={fontSize}
              fontWeight={fontWeight}
              fontFamily={fontFamily}
              glow={glow}
            />
          </Box>

          <Customize>
            <PreviewInput
              title="Text"
              value={text}
              placeholder="Your heading"
              width={220}
              maxLength={24}
              onChange={val => updateProp('text', val)}
            />

            <PreviewSelect
              title="Trigger"
              options={triggerOptions}
              value={trigger}
              width={150}
              onChange={val => updateProp('trigger', val)}
            />

            <PreviewSelect
              title="Weight"
              options={weightOptions}
              value={fontWeight}
              width={130}
              onChange={val => updateProp('fontWeight', val)}
            />

            <PreviewColorPickerCustom title="Color" color={renderedColor} onChange={val => updateProp('color', val)} />
            <PreviewColorPickerCustom
              title="Highlight"
              color={highlightColor}
              onChange={val => updateProp('highlightColor', val)}
            />

            <PreviewSlider
              title="Particle Size"
              min={1}
              max={4}
              step={0.1}
              value={particleSize}
              valueUnit="px"
              onChange={val => updateProp('particleSize', val)}
            />

            <PreviewSlider
              title="Density"
              min={2}
              max={8}
              step={1}
              value={density}
              onChange={val => updateProp('density', val)}
            />

            <PreviewSlider
              title="Scatter"
              min={40}
              max={320}
              step={10}
              value={scatter}
              valueUnit="px"
              onChange={val => updateProp('scatter', val)}
            />

            <PreviewSlider
              title="Gather"
              min={500}
              max={3000}
              step={100}
              value={gatherDuration}
              valueUnit="ms"
              onChange={val => updateProp('gatherDuration', val)}
            />

            <PreviewSlider
              title="Stagger"
              min={0}
              max={900}
              step={30}
              value={stagger}
              valueUnit="ms"
              onChange={val => updateProp('stagger', val)}
            />

            <PreviewSlider
              title="Repel Strength"
              min={0}
              max={90}
              step={2}
              value={pointerRepel}
              onChange={val => updateProp('pointerRepel', val)}
            />

            <PreviewSlider
              title="Repel Radius"
              min={40}
              max={220}
              step={5}
              value={repelRadius}
              valueUnit="px"
              onChange={val => updateProp('repelRadius', val)}
            />

            <PreviewSlider
              title="Idle Drift"
              min={0}
              max={2}
              step={0.1}
              value={idleDrift}
              valueUnit="px"
              onChange={val => updateProp('idleDrift', val)}
            />

            <PreviewSwitch title="Glow" isChecked={glow} onChange={checked => updateProp('glow', checked)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={[]} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={particleText} componentName="ParticleText" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default ParticleTextDemo;
