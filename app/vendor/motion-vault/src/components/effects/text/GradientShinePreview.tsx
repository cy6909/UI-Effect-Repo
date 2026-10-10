import GradientShine from './GradientShine';

/** Effect 05 — periodic light sweep across the text (2.5s sweep, ~5s cycle). */
export default function GradientShinePreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <GradientShine
        text="光会自己找到方向"
        duration={2.5}
        repeatDelay={2.5}
        className="text-[28px] font-semibold tracking-[-0.01em]"
      />
    </div>
  );
}
