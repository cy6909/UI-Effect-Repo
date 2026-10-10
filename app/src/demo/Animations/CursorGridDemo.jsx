import { useMemo } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import CodeExample from '../../components/code/CodeExample';
import PropTable from '../../components/common/Preview/PropTable';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

import CursorGrid from '../../content/Animations/CursorGrid/CursorGrid';
import { cursorGrid } from '../../constants/code/Animations/cursorGridCode';

const DEFAULT_PROPS = {
  cellSize: 70,
  color: '#D946EF',
  radius: 140,
  falloff: 'smooth',
  holdTime: 400,
  fadeDuration: 800,
  lineWidth: 1.2,
  maxOpacity: 1,
  fillOpacity: 0,
  gridOpacity: 0,
  cellRadius: 0,
  clickPulse: true,
  pulseSpeed: 600
};

const FALLOFF_OPTIONS = [
  { value: 'linear', label: 'Linear' },
  { value: 'smooth', label: 'Smooth' },
  { value: 'sharp', label: 'Sharp' }
];

const CursorGridDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    cellSize,
    color,
    radius,
    falloff,
    holdTime,
    fadeDuration,
    lineWidth,
    maxOpacity,
    fillOpacity,
    gridOpacity,
    cellRadius,
    clickPulse,
    pulseSpeed
  } = props;

  const propData = useMemo(
    () => [
      { name: 'cellSize', type: 'number', default: '70', description: 'Size of each grid cell in pixels.' },
      { name: 'color', type: 'string', default: '"#D946EF"', description: 'Color of the cell strokes, fills and pulses.' },
      { name: 'radius', type: 'number', default: '140', description: 'Radius in pixels around the cursor within which cells light up.' },
      { name: 'falloff', type: '"linear" | "smooth" | "sharp"', default: '"smooth"', description: 'Curve mapping distance from the cursor to cell brightness.' },
      { name: 'holdTime', type: 'number', default: '400', description: 'How long in milliseconds a cell stays lit before it starts fading.' },
      { name: 'fadeDuration', type: 'number', default: '800', description: 'How long in milliseconds a fully lit cell takes to fade out.' },
      { name: 'lineWidth', type: 'number', default: '1.2', description: 'Stroke width of the cell outlines.' },
      { name: 'maxOpacity', type: 'number', default: '1', description: 'Peak opacity of a cell at the cursor position.' },
      { name: 'fillOpacity', type: 'number', default: '0', description: 'Translucent fill of lit cells; 0 disables the fill.' },
      { name: 'gridOpacity', type: 'number', default: '0', description: 'Opacity of a faint always-visible lattice; 0 hides it.' },
      { name: 'cellRadius', type: 'number', default: '0', description: 'Corner radius of the cells in pixels.' },
      { name: 'clickPulse', type: 'boolean', default: 'true', description: 'Emit an expanding ring of lit cells on click.' },
      { name: 'pulseSpeed', type: 'number', default: '600', description: 'Expansion speed of the click ring in pixels per second.' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the wrapper.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <CursorGrid {...props} />
              <Text className="demo-instruction" textAlign="center" fontSize="clamp(2rem, 6vw, 3rem)" fontWeight={600} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                Move Your Cursor
              </Text>
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={color} onChange={val => updateProp('color', val)} />
            <PreviewSelect title="Falloff" options={FALLOFF_OPTIONS} value={falloff} onChange={val => updateProp('falloff', val)} width={140} />
            <PreviewSlider title="Cell Size" min={30} max={160} step={5} value={cellSize} valueUnit="px" onChange={val => updateProp('cellSize', val)} />
            <PreviewSlider title="Radius" min={40} max={400} step={10} value={radius} valueUnit="px" onChange={val => updateProp('radius', val)} />
            <PreviewSlider title="Hold Time" min={0} max={2000} step={50} value={holdTime} valueUnit="ms" onChange={val => updateProp('holdTime', val)} />
            <PreviewSlider title="Fade Duration" min={100} max={3000} step={50} value={fadeDuration} valueUnit="ms" onChange={val => updateProp('fadeDuration', val)} />
            <PreviewSlider title="Line Width" min={0.5} max={4} step={0.1} value={lineWidth} valueUnit="px" onChange={val => updateProp('lineWidth', val)} />
            <PreviewSlider title="Max Opacity" min={0.1} max={1} step={0.05} value={maxOpacity} onChange={val => updateProp('maxOpacity', val)} />
            <PreviewSlider title="Fill Opacity" min={0} max={0.5} step={0.02} value={fillOpacity} onChange={val => updateProp('fillOpacity', val)} />
            <PreviewSlider title="Grid Opacity" min={0} max={0.3} step={0.01} value={gridOpacity} onChange={val => updateProp('gridOpacity', val)} />
            <PreviewSlider title="Cell Corners" min={0} max={20} step={1} value={cellRadius} valueUnit="px" onChange={val => updateProp('cellRadius', val)} />
            <PreviewSlider title="Pulse Speed" min={100} max={2000} step={50} value={pulseSpeed} valueUnit="px/s" onChange={val => updateProp('pulseSpeed', val)} />
            <PreviewSwitch title="Click Pulse" isChecked={clickPulse} onChange={val => updateProp('clickPulse', val)} />
          </Customize>

          <PropTable data={propData} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={cursorGrid} componentName="CursorGrid" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default CursorGridDemo;
