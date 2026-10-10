import { useLocale } from '../../personal/Locale';
import { useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import { CodeTab, PreviewTab, TabsLayout } from '../../components/common/TabsLayout';

import CodeExample from '../../components/code/CodeExample';
import Dependencies from '../../components/code/Dependencies';
import Customize from '../../components/common/Preview/Customize';
import PreviewSlider from '../../components/common/Preview/PreviewSlider';
import PreviewSelect from '../../components/common/Preview/PreviewSelect';
import PreviewSwitch from '../../components/common/Preview/PreviewSwitch';
import PreviewColorPickerCustom from '../../components/common/Preview/PreviewColorPickerCustom';
import PropTable from '../../components/common/Preview/PropTable';
import useComponentProps from '../../hooks/useComponentProps';
import { ComponentPropsProvider } from '../../components/context/ComponentPropsContext';

import { depthCarousel } from '../../constants/code/Components/depthCarouselCode';
import DepthCarousel from '../../content/Components/DepthCarousel/DepthCarousel';

const ITEMS = [
  { image: '/assets/demo/day-portrait.webp', alt: 'Alto' },
  { image: '/assets/demo/night-portrait.webp', alt: 'Bay' },
  { image: '/assets/demo/day-landscape.webp', alt: 'Coast' },
  { image: '/assets/demo/night-landscape.webp', alt: 'Dune' },
  { image: '/assets/demo/cs1.webp', alt: 'Edge' },
  { image: '/assets/demo/cs2.webp', alt: 'Fjord' },
  { image: '/assets/demo/cs3.webp', alt: 'Glade' }
];

const EASE_OPTIONS = [
  { label: 'Power3 Out', value: 'power3.out' },
  { label: 'Power2 In Out', value: 'power2.inOut' },
  { label: 'Expo Out', value: 'expo.out' },
  { label: 'Back Out', value: 'back.out(1.4)' },
  { label: 'Linear', value: 'none' }
];

const TILT_OPTIONS = [
  { label: 'Right', value: 'right' },
  { label: 'Left', value: 'left' }
];

const DEFAULT_PROPS = {
  cardWidth: 300,
  cardHeight: 380,
  radius: 18,
  tint: '#05060a',
  depth: 220,
  spread: 90,
  tilt: 22,
  tiltDirection: 'right',
  perspective: 1400,
  visibleCards: 4,
  falloff: 0.2,
  blur: 6,
  duration: 700,
  ease: 'power3.out',
  autoplay: false,
  autoplayDelay: 3200,
  loop: true,
  showControls: true,
  showIndicators: true
};

const DepthCarouselDemo = () => {
  const { t } = useLocale();
  const { props, updateProp, resetProps, hasChanges } = useComponentProps(DEFAULT_PROPS);
  const {
    cardWidth,
    cardHeight,
    radius,
    tint,
    depth,
    spread,
    tilt,
    tiltDirection,
    perspective,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    autoplay,
    autoplayDelay,
    loop,
    showControls,
    showIndicators
  } = props;

  const propData = useMemo(
    () => [
      {
        name: 'items',
        type: 'Array<string | { image: string; alt?: string }>',
        default: '6 sample images',
        description: 'Slides to display. Pass image URLs or objects with an image URL and alt text.'
      },
      { name: 'cardWidth', type: 'number', default: '300', description: 'Width of each card in pixels.' },
      { name: 'cardHeight', type: 'number', default: '380', description: 'Height of each card in pixels.' },
      { name: 'radius', type: 'number', default: '18', description: 'Corner rounding of the cards in pixels.' },
      {
        name: 'tint',
        type: 'string',
        default: '"#05060a"',
        description: 'Colour multiplied over cards as they recede, shading the depth of the stack.'
      },
      {
        name: 'depth',
        type: 'number',
        default: '220',
        description:
          'Z distance in pixels between each card along the depth rail. Higher values push the stack further back.'
      },
      {
        name: 'spread',
        type: 'number',
        default: '90',
        description: 'Lateral offset in pixels applied per card so the stack fans out to one side.'
      },
      {
        name: 'tilt',
        type: 'number',
        default: '22',
        description: 'Degrees each receding card rotates around the vertical axis, revealing its edge.'
      },
      {
        name: 'tiltDirection',
        type: '"left" | "right"',
        default: '"right"',
        description: 'Which side the stack fans and tilts toward.'
      },
      {
        name: 'perspective',
        type: 'number',
        default: '1400',
        description: 'CSS perspective in pixels. Lower values exaggerate the depth foreshortening.'
      },
      {
        name: 'visibleCards',
        type: 'number',
        default: '4',
        description: 'How many cards deep remain visible before further ones fade out.'
      },
      {
        name: 'falloff',
        type: 'number',
        default: '0.2',
        description: 'How quickly brightness, tint and blur ramp up with depth.'
      },
      {
        name: 'blur',
        type: 'number',
        default: '6',
        description: 'Maximum blur in pixels applied to the furthest visible card.'
      },
      {
        name: 'duration',
        type: 'number',
        default: '700',
        description: 'Length of the advance transition in milliseconds.'
      },
      {
        name: 'ease',
        type: 'string',
        default: '"power3.out"',
        description: 'GSAP easing used for navigation transitions.'
      },
      {
        name: 'autoplay',
        type: 'boolean',
        default: 'false',
        description: 'Auto-advance the carousel, pausing on hover or focus.'
      },
      {
        name: 'autoplayDelay',
        type: 'number',
        default: '3200',
        description: 'Delay between auto-advances in milliseconds.'
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Wrap seamlessly from the last card back to the first.'
      },
      {
        name: 'showControls',
        type: 'boolean',
        default: 'true',
        description: 'Show the previous / next arrow buttons.'
      },
      { name: 'showIndicators', type: 'boolean', default: 'true', description: 'Show the dot indicators.' },
      {
        name: 'onChange',
        type: '(index: number, item) => void',
        default: 'undefined',
        description: 'Called whenever the focused card changes.'
      }
    ],
    []
  );

  return (
    <ComponentPropsProvider props={props} defaultProps={DEFAULT_PROPS} resetProps={resetProps} hasChanges={hasChanges}>
      <TabsLayout>
        <PreviewTab>
          <Box position="relative" className="demo-container" h={500} p={0} overflow="hidden">
            <DepthCarousel
              items={ITEMS}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              radius={radius}
              tint={tint}
              depth={depth}
              spread={spread}
              tilt={tilt}
              tiltDirection={tiltDirection}
              perspective={perspective}
              visibleCards={visibleCards}
              falloff={falloff}
              blur={blur}
              duration={duration}
              ease={ease}
              autoplay={autoplay}
              autoplayDelay={autoplayDelay}
              loop={loop}
              showControls={showControls}
              showIndicators={showIndicators}
            />
          </Box>

          <Customize>
            <PreviewColorPickerCustom
              title={t('纵深色调', 'Depth Tint')}
              color={tint}
              onChange={val => updateProp('tint', val)}
            />
            <PreviewSlider
              title={t('卡片宽度', 'Card Width')}
              min={180}
              max={420}
              step={10}
              value={cardWidth}
              valueUnit="px"
              onChange={val => updateProp('cardWidth', val)}
            />
            <PreviewSlider
              title={t('卡片高度', 'Card Height')}
              min={220}
              max={520}
              step={10}
              value={cardHeight}
              valueUnit="px"
              onChange={val => updateProp('cardHeight', val)}
            />
            <PreviewSlider
              title={t('圆角', 'Corner Radius')}
              min={0}
              max={48}
              step={1}
              value={radius}
              valueUnit="px"
              onChange={val => updateProp('radius', val)}
            />

            <PreviewSlider
              title={t('纵深距离', 'Depth')}
              min={80}
              max={420}
              step={10}
              value={depth}
              valueUnit="px"
              onChange={val => updateProp('depth', val)}
            />
            <PreviewSlider
              title={t('水平间距', 'Spread')}
              min={0}
              max={220}
              step={5}
              value={spread}
              valueUnit="px"
              onChange={val => updateProp('spread', val)}
            />
            <PreviewSlider
              title={t('倾斜角度', 'Tilt')}
              min={0}
              max={60}
              step={1}
              value={tilt}
              valueUnit="°"
              onChange={val => updateProp('tilt', val)}
            />
            <PreviewSelect
              title={t('倾斜方向', 'Tilt Direction')}
              options={TILT_OPTIONS}
              value={tiltDirection}
              onChange={val => updateProp('tiltDirection', val)}
            />
            <PreviewSlider
              title={t('透视距离', 'Perspective')}
              min={600}
              max={2400}
              step={50}
              value={perspective}
              valueUnit="px"
              onChange={val => updateProp('perspective', val)}
            />
            <PreviewSlider
              title={t('可见卡片', 'Visible Cards')}
              min={2}
              max={6}
              step={1}
              value={visibleCards}
              onChange={val => updateProp('visibleCards', val)}
            />
            <PreviewSlider
              title={t('透明度衰减', 'Falloff')}
              min={0.05}
              max={0.5}
              step={0.01}
              value={falloff}
              onChange={val => updateProp('falloff', val)}
            />
            <PreviewSlider
              title={t('模糊', 'Blur')}
              min={0}
              max={16}
              step={1}
              value={blur}
              valueUnit="px"
              onChange={val => updateProp('blur', val)}
            />

            <PreviewSlider
              title={t('动画时长', 'Duration')}
              min={200}
              max={1400}
              step={50}
              value={duration}
              valueUnit="ms"
              onChange={val => updateProp('duration', val)}
            />
            <PreviewSelect
              title={t('缓动', 'Ease')}
              options={EASE_OPTIONS}
              value={ease}
              onChange={val => updateProp('ease', val)}
            />
            <PreviewSwitch
              title={t('自动播放', 'Autoplay')}
              isChecked={autoplay}
              onChange={val => updateProp('autoplay', val)}
            />
            <PreviewSlider
              title={t('播放间隔', 'Autoplay Delay')}
              min={1200}
              max={6000}
              step={100}
              value={autoplayDelay}
              valueUnit="ms"
              isDisabled={!autoplay}
              onChange={val => updateProp('autoplayDelay', val)}
            />
            <PreviewSwitch title={t('循环', 'Loop')} isChecked={loop} onChange={val => updateProp('loop', val)} />
            <PreviewSwitch
              title={t('切换按钮', 'Controls')}
              isChecked={showControls}
              onChange={val => updateProp('showControls', val)}
            />
            <PreviewSwitch
              title={t('圆点指示', 'Indicators')}
              isChecked={showIndicators}
              onChange={val => updateProp('showIndicators', val)}
            />
          </Customize>

          <PropTable data={propData} />
          <Dependencies dependencyList={['gsap']} />
        </PreviewTab>

        <CodeTab>
          <CodeExample codeObject={depthCarousel} componentName="DepthCarousel" />
        </CodeTab>
      </TabsLayout>
    </ComponentPropsProvider>
  );
};

export default DepthCarouselDemo;
