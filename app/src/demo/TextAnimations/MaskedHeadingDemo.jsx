import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';

import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import PropTable from '../../components/common/Preview/PropTable';

import MaskedHeading from '../../content/TextAnimations/MaskedHeading/MaskedHeading';
import { maskedHeading } from '../../constants/code/TextAnimations/maskedHeadingCode';

const DEMO_IMAGE = 'https://images.unsplash.com/photo-1500673587002-1d2548cfba1b?q=80&w=1600&auto=format&fit=crop';
const DEMO_VIDEO = '/assets/video/masked-heading.mp4';

const DEFAULT_PROPS = {
  text: 'Designed in the details',
  mediaType: 'video',
  fillScale: 1.25,
  parallax: 26,
  drift: 18,
  brightness: 1,
  saturation: 1,
  grayscale: false,
  reveal: 'rise',
  trigger: 'view',
  duration: 1.1,
  stagger: 0.09,
  align: 'center',
  weight: 700,
  tracking: -0.03,
  lineHeight: 1.06,
  textScale: 0.115
};

const MaskedHeadingDemo = () => {
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    text,
    mediaType,
    fillScale,
    parallax,
    drift,
    brightness,
    saturation,
    grayscale,
    reveal,
    trigger,
    duration,
    stagger,
    align,
    weight,
    tracking,
    lineHeight,
    textScale
  } = props;

  const replayKey = `${text}-${mediaType}-${reveal}-${trigger}-${duration}-${stagger}`;

  const propData = useMemo(
    () => [
      { name: 'text', type: 'string', default: "'Designed in the details'", description: 'Heading copy.' },
      {
        name: 'tag',
        type: 'string',
        default: "'h2'",
        description: 'Element the heading renders as, so it can carry the right semantics.'
      },
      {
        name: 'mediaType',
        type: '"image" | "video"',
        default: '"image"',
        description: 'Whether the source showing through the letters is an image or a looping muted video.'
      },
      { name: 'src', type: 'string', default: "''", description: 'Image or video URL.' },
      { name: 'poster', type: 'string', default: "''", description: 'Poster frame used while a video loads.' },
      {
        name: 'fillScale',
        type: 'number',
        default: '1.25',
        description: 'How far the media is zoomed past the heading. The overscan is what parallax travels into.'
      },
      {
        name: 'parallax',
        type: 'number',
        default: '26',
        description: 'How far the media slides under the letters as the pointer moves, in px.'
      },
      {
        name: 'drift',
        type: 'number',
        default: '18',
        description: 'Amplitude of the slow idle motion, in px. 0 holds the media still.'
      },
      { name: 'brightness', type: 'number', default: '1', description: 'Brightness of the media.' },
      { name: 'saturation', type: 'number', default: '1', description: 'Saturation of the media.' },
      { name: 'grayscale', type: 'boolean', default: 'false', description: 'Render the media in black and white.' },
      {
        name: 'reveal',
        type: '"rise" | "wipe" | "fade" | "none"',
        default: '"rise"',
        description: 'Entrance style: words rise into place, a wipe sweeps across, or the whole block fades up.'
      },
      {
        name: 'trigger',
        type: '"view" | "mount" | "hover"',
        default: '"view"',
        description: 'When the entrance runs.'
      },
      { name: 'duration', type: 'number', default: '1.1', description: 'Entrance duration, in seconds.' },
      {
        name: 'stagger',
        type: 'number',
        default: '0.09',
        description: 'Delay between words, in seconds. Used by the rise reveal.'
      },
      { name: 'align', type: '"left" | "center" | "right"', default: '"center"', description: 'Text alignment.' },
      { name: 'weight', type: 'number', default: '700', description: 'Font weight.' },
      { name: 'tracking', type: 'number', default: '-0.03', description: 'Letter spacing, in em.' },
      { name: 'lineHeight', type: 'number', default: '1.06', description: 'Line height.' },
      {
        name: 'textScale',
        type: 'number',
        default: '0.115',
        description: 'Type size as a fraction of the container width, so the heading stays responsive.'
      },
      { name: 'className', type: 'string', default: "''", description: 'Additional class names.' },
      { name: 'style', type: 'object', default: '—', description: 'Inline styles for the heading.' }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box
            className="demo-container"
            h={420}
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            <MaskedHeading
              key={replayKey}
              text={text}
              mediaType={mediaType}
              src={mediaType === 'video' ? DEMO_VIDEO : DEMO_IMAGE}
              fillScale={fillScale}
              parallax={parallax}
              drift={drift}
              brightness={brightness}
              saturation={saturation}
              grayscale={grayscale}
              reveal={reveal}
              trigger={trigger}
              duration={duration}
              stagger={stagger}
              align={align}
              weight={weight}
              tracking={tracking}
              lineHeight={lineHeight}
              textScale={textScale}
            />
          </Box>

          <Customize>
            <PreviewSelect
              title="Text"
              options={[
                { label: 'Details', value: 'Designed in the details' },
                { label: 'Web', value: 'Made for the web' },
                { label: 'Location', value: 'Shot on location' }
              ]}
              value={text}
              onChange={val => updateProp('text', val)}
              width={140}
            />
            <PreviewSelect
              title="Media"
              options={[
                { label: 'Video', value: 'video' },
                { label: 'Image', value: 'image' }
              ]}
              value={mediaType}
              onChange={val => updateProp('mediaType', val)}
              width={130}
            />
            <PreviewSelect
              title="Reveal"
              options={[
                { label: 'Rise', value: 'rise' },
                { label: 'Wipe', value: 'wipe' },
                { label: 'Fade', value: 'fade' },
                { label: 'None', value: 'none' }
              ]}
              value={reveal}
              onChange={val => updateProp('reveal', val)}
              width={130}
            />
            <PreviewSelect
              title="Trigger"
              options={[
                { label: 'In View', value: 'view' },
                { label: 'On Mount', value: 'mount' },
                { label: 'On Hover', value: 'hover' }
              ]}
              value={trigger}
              onChange={val => updateProp('trigger', val)}
              width={130}
            />
            <PreviewSelect
              title="Align"
              options={[
                { label: 'Center', value: 'center' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' }
              ]}
              value={align}
              onChange={val => updateProp('align', val)}
              width={130}
            />

            <PreviewSlider
              title="Fill Scale"
              min={1}
              max={2}
              step={0.05}
              value={fillScale}
              onChange={val => updateProp('fillScale', val)}
            />
            <PreviewSlider
              title="Parallax"
              min={0}
              max={80}
              step={1}
              value={parallax}
              valueUnit="px"
              onChange={val => updateProp('parallax', val)}
            />
            <PreviewSlider
              title="Drift"
              min={0}
              max={60}
              step={1}
              value={drift}
              valueUnit="px"
              onChange={val => updateProp('drift', val)}
            />
            <PreviewSlider
              title="Brightness"
              min={0.4}
              max={2}
              step={0.05}
              value={brightness}
              onChange={val => updateProp('brightness', val)}
            />
            <PreviewSlider
              title="Saturation"
              min={0}
              max={2}
              step={0.05}
              value={saturation}
              onChange={val => updateProp('saturation', val)}
            />
            <PreviewSlider
              title="Duration"
              min={0.3}
              max={2.4}
              step={0.05}
              value={duration}
              valueUnit="s"
              onChange={val => updateProp('duration', val)}
            />
            <PreviewSlider
              title="Stagger"
              min={0}
              max={0.3}
              step={0.01}
              value={stagger}
              valueUnit="s"
              onChange={val => updateProp('stagger', val)}
            />
            <PreviewSlider
              title="Text Size"
              min={0.05}
              max={0.15}
              step={0.005}
              value={textScale}
              onChange={val => updateProp('textScale', val)}
            />
            <PreviewSlider
              title="Weight"
              min={300}
              max={900}
              step={100}
              value={weight}
              onChange={val => updateProp('weight', val)}
            />
            <PreviewSlider
              title="Tracking"
              min={-0.08}
              max={0.06}
              step={0.005}
              value={tracking}
              valueUnit="em"
              onChange={val => updateProp('tracking', val)}
            />
            <PreviewSlider
              title="Line Height"
              min={0.85}
              max={1.6}
              step={0.02}
              value={lineHeight}
              onChange={val => updateProp('lineHeight', val)}
            />
            <PreviewSwitch title="Grayscale" isChecked={grayscale} onChange={val => updateProp('grayscale', val)} />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={maskedHeading} componentName="MaskedHeading" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default MaskedHeadingDemo;
