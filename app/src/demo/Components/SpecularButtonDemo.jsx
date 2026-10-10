import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import { useColorModeValue } from '../../components/setup/color-mode';

import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';

import SpecularButton from '../../content/Components/SpecularButton/SpecularButton';
import { specularButton } from '../../constants/code/Components/specularButtonCode';

const DEFAULT_PROPS = {
  size: 'lg',
  radius: 18,
  tint: '#ffffff',
  tintOpacity: 0,
  blur: 0,
  textColor: '#f5f5f5',
  lineColor: '#ffffff',
  baseColor: '#525252',
  intensity: 1,
  shineSize: 10,
  shineFade: 40,
  thickness: 1,
  speed: 0.35,
  followMouse: true,
  proximity: 250,
  autoAnimate: false
};

const SIZE_OPTIONS = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' }
];

const SpecularButtonDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    size,
    radius,
    tint,
    tintOpacity,
    blur,
    textColor,
    lineColor,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    followMouse,
    proximity,
    autoAnimate
  } = props;
  const renderedTint = useColorModeValue(tint === DEFAULT_PROPS.tint ? '#ffffff' : tint, tint);
  const renderedTextColor = useColorModeValue(textColor === DEFAULT_PROPS.textColor ? '#18181b' : textColor, textColor);
  const renderedLineColor = useColorModeValue(lineColor === DEFAULT_PROPS.lineColor ? '#18181b' : lineColor, lineColor);
  const renderedBaseColor = useColorModeValue(baseColor === DEFAULT_PROPS.baseColor ? '#d4d4d8' : baseColor, baseColor);

  const propData = useMemo(
    () => [
      { name: 'children', type: 'ReactNode', default: '"Get Started"', description: 'Button label or any custom content.' },
      { name: 'size', type: '"sm" | "md" | "lg"', default: '"lg"', description: 'Preset padding and font size of the button.' },
      { name: 'radius', type: 'number', default: '18', description: 'Corner radius in pixels; clamps to a pill automatically.' },
      { name: 'tint', type: 'string', default: '"#ffffff"', description: 'Color of the glass background tint.' },
      { name: 'tintOpacity', type: 'number', default: '0', description: 'Strength of the glass tint.' },
      { name: 'blur', type: 'number', default: '0', description: 'Backdrop blur in pixels behind the button.' },
      { name: 'textColor', type: 'string', default: '"#f5f5f5"', description: 'Color of the button label.' },
      { name: 'lineColor', type: 'string', default: '"#ffffff"', description: 'Color of the moving specular highlight.' },
      { name: 'baseColor', type: 'string', default: '"#525252"', description: 'Color of the static edge stroke under the highlight.' },
      { name: 'intensity', type: 'number', default: '1', description: 'Brightness of the specular highlight.' },
      { name: 'shineSize', type: 'number', default: '10', description: 'Angular size in degrees of each shine streak along the edge.' },
      { name: 'shineFade', type: 'number', default: '40', description: 'How gradually each streak fades out at its ends, in degrees.' },
      { name: 'thickness', type: 'number', default: '1', description: 'Width of the highlight line in pixels.' },
      { name: 'speed', type: 'number', default: '0.35', description: 'Rotation speed of the sweep when autoAnimate is on.' },
      { name: 'followMouse', type: 'boolean', default: 'true', description: 'Point the light toward the cursor.' },
      { name: 'proximity', type: 'number', default: '250', description: 'Distance in pixels within which the shine fades in as the cursor approaches.' },
      { name: 'autoAnimate', type: 'boolean', default: 'false', description: 'Keep the shine always on with a rotating sweep, regardless of cursor distance.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button.' },
      { name: 'onClick', type: 'MouseEventHandler', default: '-', description: 'Standard button click handler.' },
      { name: 'type', type: '"button" | "submit" | "reset"', default: '"button"', description: 'Native button type.' },
      { name: 'className', type: 'string', default: '""', description: 'Additional CSS classes for the button.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={400} overflow="hidden" display="flex" alignItems="center" justifyContent="center">
            <SpecularButton
              {...props}
              tint={renderedTint}
              textColor={renderedTextColor}
              lineColor={renderedLineColor}
              baseColor={renderedBaseColor}
            >
              Get Started
            </SpecularButton>
          </Box>

          <Customize>
            <PreviewColorPickerCustom title="Highlight" color={renderedLineColor} onChange={val => updateProp('lineColor', val)} />
            <PreviewColorPickerCustom title="Edge" color={renderedBaseColor} onChange={val => updateProp('baseColor', val)} />
            <PreviewColorPickerCustom title="Tint" color={renderedTint} onChange={val => updateProp('tint', val)} />
            <PreviewColorPickerCustom title="Text" color={renderedTextColor} onChange={val => updateProp('textColor', val)} />
            <PreviewSelect title="Size" options={SIZE_OPTIONS} value={size} onChange={val => updateProp('size', val)} width={140} />
            <PreviewSlider title="Radius" min={0} max={60} step={1} value={radius} valueUnit="px" onChange={val => updateProp('radius', val)} />
            <PreviewSlider title="Tint Opacity" min={0} max={0.4} step={0.01} value={tintOpacity} onChange={val => updateProp('tintOpacity', val)} />
            <PreviewSlider title="Blur" min={0} max={30} step={1} value={blur} valueUnit="px" onChange={val => updateProp('blur', val)} />
            <PreviewSlider title="Intensity" min={0} max={3} step={0.05} value={intensity} onChange={val => updateProp('intensity', val)} />
            <PreviewSlider title="Shine Size" min={5} max={90} step={1} value={shineSize} valueUnit="deg" onChange={val => updateProp('shineSize', val)} />
            <PreviewSlider title="Shine Fade" min={0} max={60} step={1} value={shineFade} valueUnit="deg" onChange={val => updateProp('shineFade', val)} />
            <PreviewSlider title="Thickness" min={0.5} max={5} step={0.1} value={thickness} valueUnit="px" onChange={val => updateProp('thickness', val)} />
            <PreviewSlider title="Speed" min={0} max={2} step={0.05} value={speed} onChange={val => updateProp('speed', val)} />
            <PreviewSlider title="Proximity" min={50} max={500} step={10} value={proximity} valueUnit="px" onChange={val => updateProp('proximity', val)} />
            <PreviewSwitch title="Follow Mouse" isChecked={followMouse} onChange={val => updateProp('followMouse', val)} />
            <PreviewSwitch title="Auto Animate" isChecked={autoAnimate} onChange={val => updateProp('autoAnimate', val)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['ogl']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={specularButton} componentName="SpecularButton" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default SpecularButtonDemo;
