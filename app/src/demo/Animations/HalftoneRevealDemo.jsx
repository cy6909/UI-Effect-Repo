import { useMemo } from 'react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import { Box } from '@chakra-ui/react';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';
import RefreshButton from '@/components/common/Preview/RefreshButton';
import useForceRerender from '@/hooks/useForceRerender';

import HalftoneReveal from '@/content/Animations/HalftoneReveal/HalftoneReveal';
import { halftoneReveal } from '@/constants/code/Animations/halftoneRevealCode';

const DEFAULT_PROPS = {
  src: 'https://picsum.photos/seed/halftone-reveal/1200/800',
  inkColor: '#141414',
  paperColor: '#fff7e6',
  mode: 'mono',
  dotSize: 1,
  dotDensity: 71,
  angle: 45,
  shape: 'circle',
  contrast: 1.15,
  invert: false,
  revealRadius: 0.4,
  edge: 0.8,
  follow: 0.37,
  idleReveal: 0,
  trigger: 'hover'
};

const HalftoneRevealDemo = () => {
  const [key, forceRerender] = useForceRerender();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    src,
    inkColor,
    paperColor,
    mode,
    dotSize,
    dotDensity,
    angle,
    shape,
    contrast,
    invert,
    revealRadius,
    edge,
    follow,
    idleReveal,
    trigger
  } = props;

  const modeOptions = [
    { label: 'Mono', value: 'mono' },
    { label: 'Duotone', value: 'duotone' },
    { label: 'Color (CMYK)', value: 'color' }
  ];

  const shapeOptions = [
    { label: 'Circle', value: 'circle' },
    { label: 'Square', value: 'square' },
    { label: 'Diamond', value: 'diamond' },
    { label: 'Line', value: 'line' }
  ];

  const triggerOptions = [
    { label: 'Hover', value: 'hover' },
    { label: 'Always', value: 'always' },
    { label: 'Off', value: 'off' }
  ];

  const propData = useMemo(
    () => [
      { name: 'src', type: 'string', default: 'picsum photo', description: 'Image URL rendered as a halftone print.' },
      { name: 'inkColor', type: 'string', default: '#141414', description: 'Colour of the printed dots (hex).' },
      {
        name: 'paperColor',
        type: 'string',
        default: '#fff7e6',
        description: 'Colour of the paper behind the ink (hex).'
      },
      {
        name: 'mode',
        type: '"mono" | "duotone" | "color"',
        default: 'mono',
        description: 'Screen model: single ink, two-ink riso, or a CMYK rosette.'
      },
      { name: 'dotSize', type: 'number', default: '1', description: 'Overall scale of each ink dot.' },
      { name: 'dotDensity', type: 'number', default: '71', description: 'Number of dot cells across the frame.' },
      { name: 'angle', type: 'number', default: '45', description: 'Rotation of the halftone screen, in degrees.' },
      {
        name: 'shape',
        type: '"circle" | "square" | "diamond" | "line"',
        default: 'circle',
        description: 'Shape of each printed dot.'
      },
      { name: 'contrast', type: 'number', default: '1.15', description: 'Tonal contrast applied before screening.' },
      { name: 'invert', type: 'boolean', default: 'false', description: 'Invert the tones (negative print).' },
      {
        name: 'revealRadius',
        type: 'number',
        default: '0.4',
        description: 'Radius of the sharp loupe around the cursor.'
      },
      {
        name: 'edge',
        type: 'number',
        default: '0.8',
        description: 'Hardness of the loupe boundary (0 soft, 1 hard).'
      },
      {
        name: 'follow',
        type: 'number',
        default: '0.37',
        description: 'Loupe follow time in seconds (lower = snappier).'
      },
      {
        name: 'idleReveal',
        type: 'number',
        default: '0',
        description: 'Baseline sharpness applied everywhere with no cursor.'
      },
      {
        name: 'trigger',
        type: '"hover" | "always" | "off"',
        default: 'hover',
        description: 'When the loupe is active.'
      },
      { name: 'borderRadius', type: 'string', default: '16px', description: 'Corner radius of the frame.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider
      props={props}
      defaultProps={DEFAULT_PROPS}
      resetProps={resetProps}
      hasChanges={hasChanges}
      demoOnlyProps={[]}
    >
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <HalftoneReveal
              key={key}
              src={src}
              inkColor={inkColor}
              paperColor={paperColor}
              mode={mode}
              dotSize={dotSize}
              dotDensity={dotDensity}
              angle={angle}
              shape={shape}
              contrast={contrast}
              invert={invert}
              revealRadius={revealRadius}
              edge={edge}
              follow={follow}
              idleReveal={idleReveal}
              trigger={trigger}
            />
            <RefreshButton onClick={forceRerender} />
          </Box>

          <Customize>
            <PreviewColorPickerCustom
              title="Ink Color"
              color={inkColor}
              onChange={val => updateProp('inkColor', val)}
            />
            <PreviewColorPickerCustom
              title="Paper Color"
              color={paperColor}
              onChange={val => updateProp('paperColor', val)}
            />
            <PreviewSelect
              title="Mode"
              options={modeOptions}
              value={mode}
              onChange={v => updateProp('mode', v)}
              width={140}
            />
            <PreviewSelect
              title="Dot Shape"
              options={shapeOptions}
              value={shape}
              onChange={v => updateProp('shape', v)}
              width={140}
            />

            <PreviewSlider
              title="Dot Density"
              min={30}
              max={180}
              step={1}
              value={dotDensity}
              onChange={v => updateProp('dotDensity', v)}
            />
            <PreviewSlider
              title="Dot Size"
              min={0.4}
              max={1.6}
              step={0.01}
              value={dotSize}
              onChange={v => updateProp('dotSize', v)}
            />
            <PreviewSlider
              title="Screen Angle"
              min={0}
              max={90}
              step={1}
              value={angle}
              valueUnit="°"
              onChange={v => updateProp('angle', v)}
            />
            <PreviewSlider
              title="Contrast"
              min={0.6}
              max={2}
              step={0.01}
              value={contrast}
              onChange={v => updateProp('contrast', v)}
            />
            <PreviewSwitch title="Invert" isChecked={invert} onChange={v => updateProp('invert', v)} />

            <PreviewSlider
              title="Reveal Radius"
              min={0.05}
              max={0.6}
              step={0.01}
              value={revealRadius}
              onChange={v => updateProp('revealRadius', v)}
            />
            <PreviewSlider
              title="Loupe Edge"
              min={0}
              max={1}
              step={0.01}
              value={edge}
              onChange={v => updateProp('edge', v)}
            />
            <PreviewSlider
              title="Follow"
              min={0.02}
              max={0.4}
              step={0.01}
              value={follow}
              valueUnit="s"
              onChange={v => updateProp('follow', v)}
            />
            <PreviewSlider
              title="Idle Reveal"
              min={0}
              max={1}
              step={0.01}
              value={idleReveal}
              onChange={v => updateProp('idleReveal', v)}
            />
            <PreviewSelect
              title="Trigger"
              options={triggerOptions}
              value={trigger}
              onChange={v => updateProp('trigger', v)}
              width={140}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={halftoneReveal} componentName="HalftoneReveal" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default HalftoneRevealDemo;
