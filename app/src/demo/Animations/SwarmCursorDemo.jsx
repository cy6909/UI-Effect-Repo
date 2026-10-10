import { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';

import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import PropTable from '../../components/common/Preview/PropTable';
import Dependencies from '../../components/code/Dependencies';

import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import Customize from '../../components/common/Preview/Customize';

import { swarmCursor } from '../../constants/code/Animations/swarmCursorCode';
import SwarmCursor from '../../content/Animations/SwarmCursor/SwarmCursor';
import { useColorModeValue } from '../../components/setup/color-mode';

const DEFAULT_PROPS = {
  color: '#ffffff',
  accentColor: '#ffffff',
  count: 8,
  size: 5,
  merge: 0.77,
  glow: 0.75,
  opacity: 1,
  spread: 100,
  separation: 0.15,
  speed: 2.5,
  wander: 0.25,
  trail: 0.75,
  scatterOnClick: true,
  enabled: true
};

const SwarmCursorDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    color,
    accentColor,
    count,
    size,
    merge,
    glow,
    opacity,
    spread,
    separation,
    speed,
    wander,
    trail,
    scatterOnClick,
    enabled
  } = props;
  const renderedColor = useColorModeValue(color === DEFAULT_PROPS.color ? '#27272a' : color, color);
  const renderedAccentColor = useColorModeValue(
    accentColor === DEFAULT_PROPS.accentColor ? '#52525b' : accentColor,
    accentColor
  );
  const headingColor = useColorModeValue('#27272a', '#ffffff');
  const helperColor = useColorModeValue('#d4d4d8', 'rgba(255,255,255,0.5)');

  const propData = useMemo(
    () => [
      { name: 'color', type: 'string', default: "'#ffffff'", description: 'Base color of the swarm.' },
      {
        name: 'accentColor',
        type: 'string',
        default: "'#ffffff'",
        description: 'Color where the swarm is densest.'
      },
      { name: 'count', type: 'number', default: '10', description: 'Number of particles in the swarm.' },
      { name: 'size', type: 'number', default: '10', description: 'Radius of each particle, in pixels.' },
      {
        name: 'merge',
        type: 'number',
        default: '0.77',
        description: 'How readily nearby particles fuse into a single body. Lower is gooier.'
      },
      { name: 'glow', type: 'number', default: '0.75', description: 'Strength of the soft halo around the swarm.' },
      { name: 'opacity', type: 'number', default: '1', description: 'Overall opacity of the effect.' },
      {
        name: 'spread',
        type: 'number',
        default: '100',
        description: 'Radius of the cloud the swarm orbits the cursor at.'
      },
      {
        name: 'separation',
        type: 'number',
        default: '0.15',
        description: 'How strongly particles push each other apart.'
      },
      {
        name: 'speed',
        type: 'number',
        default: '2.5',
        description: 'Travel speed and turn rate of the swarm, on a 1-10 dial.'
      },
      {
        name: 'wander',
        type: 'number',
        default: '0.25',
        description: 'How strongly the drifting flow field pulls particles off their chase.'
      },
      {
        name: 'trail',
        type: 'number',
        default: '0.75',
        description: 'Length of the motion trail each particle leaves behind.'
      },
      {
        name: 'scatterOnClick',
        type: 'boolean',
        default: 'true',
        description: 'Burst the swarm outward on click, then let it regroup.'
      },
      { name: 'enabled', type: 'boolean', default: 'true', description: 'Enable or disable the effect.' },
      { name: 'children', type: 'React.ReactNode', default: '—', description: 'Content the swarm moves over.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={450} p={0} overflow="hidden">
            <SwarmCursor
              color={renderedColor}
              accentColor={renderedAccentColor}
              count={count}
              size={size}
              merge={merge}
              glow={glow}
              opacity={opacity}
              spread={spread}
              separation={separation}
              speed={speed}
              wander={wander}
              trail={trail}
              scatterOnClick={scatterOnClick}
              enabled={enabled}
            >
              <Flex direction="column" align="center" gap={2} userSelect="none" pointerEvents="none">
                <Text fontWeight={600} fontSize="2.6rem" color={headingColor} letterSpacing="-0.02em">
                  Move your cursor
                </Text>
                <Text fontSize="1rem" color={helperColor}>
                  a living swarm follows — click to scatter it
                </Text>
              </Flex>
            </SwarmCursor>
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Color" color={renderedColor} onChange={val => updateProp('color', val)} />
            <PreviewColorPickerCustom
              title="Accent Color"
              color={renderedAccentColor}
              onChange={val => updateProp('accentColor', val)}
            />

            <PreviewSlider
              title="Count"
              min={6}
              max={40}
              step={1}
              value={count}
              onChange={val => updateProp('count', val)}
            />
            <PreviewSlider
              title="Size"
              min={1}
              max={80}
              step={1}
              value={size}
              onChange={val => updateProp('size', val)}
            />
            <PreviewSlider
              title="Merge"
              min={0.15}
              max={1.6}
              step={0.01}
              value={merge}
              onChange={val => updateProp('merge', val)}
            />
            <PreviewSlider
              title="Glow"
              min={0}
              max={1}
              step={0.01}
              value={glow}
              onChange={val => updateProp('glow', val)}
            />
            <PreviewSlider
              title="Opacity"
              min={0.1}
              max={1}
              step={0.01}
              value={opacity}
              onChange={val => updateProp('opacity', val)}
            />
            <PreviewSlider
              title="Spread"
              min={30}
              max={320}
              step={5}
              value={spread}
              onChange={val => updateProp('spread', val)}
            />
            <PreviewSlider
              title="Separation"
              min={0}
              max={1.5}
              step={0.01}
              value={separation}
              onChange={val => updateProp('separation', val)}
            />
            <PreviewSlider
              title="Speed"
              min={1}
              max={10}
              step={0.1}
              value={speed}
              onChange={val => updateProp('speed', val)}
            />
            <PreviewSlider
              title="Wander"
              min={0}
              max={1.2}
              step={0.01}
              value={wander}
              onChange={val => updateProp('wander', val)}
            />
            <PreviewSlider
              title="Trail"
              min={0}
              max={1}
              step={0.01}
              value={trail}
              onChange={val => updateProp('trail', val)}
            />

            <PreviewSwitch
              title="Scatter On Click"
              isChecked={scatterOnClick}
              onChange={val => updateProp('scatterOnClick', val)}
            />
            <PreviewSwitch title="Enabled" isChecked={enabled} onChange={val => updateProp('enabled', val)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={swarmCursor} componentName="SwarmCursor" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SwarmCursorDemo;
