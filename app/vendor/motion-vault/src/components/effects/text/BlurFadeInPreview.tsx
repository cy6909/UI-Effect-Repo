import BlurFadeIn from './BlurFadeIn';

/** Featured preview for the blur-fade-in effect (looped, per-character). */
export default function BlurFadeInPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <BlurFadeIn
        text="让文字像雾一样散开"
        split="char"
        loop
        stagger={0.09}
        className="text-xl font-medium text-zinc-950"
      />
    </div>
  );
}
