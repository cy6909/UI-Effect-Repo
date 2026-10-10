import { useEffect, useRef, useState } from 'react';

/**
 * IntersectionObserver hook with enter/exit hysteresis, used to gate live previews.
 *
 * Why hysteresis: a single observer with a small rootMargin causes boundary thrash —
 * cards just inside the margin mount, then unmount the moment they scroll a few px
 * past the viewport edge, producing visible white flashes ("闪屏") while scrolling.
 *
 * - enter observer: mounts the preview 240px BEFORE it reaches the viewport,
 *   so content is already there when the user sees it.
 * - exit observer: keeps the preview mounted until it is 600px PAST the viewport,
 *   so briefly scrolling by never blanks a card.
 */
export function useInView<T extends HTMLElement>(enterMargin = '240px', exitMargin = '600px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const enter = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setInView(true);
      },
      { rootMargin: enterMargin, threshold: 0 },
    );
    const exit = new IntersectionObserver(
      (entries) => {
        if (entries[0] && !entries[0].isIntersecting) setInView(false);
      },
      { rootMargin: exitMargin, threshold: 0 },
    );

    enter.observe(el);
    exit.observe(el);
    return () => {
      enter.disconnect();
      exit.disconnect();
    };
  }, [enterMargin, exitMargin]);

  return { ref, inView };
}
