import type { CategoryId, Effect } from '@/types/effect';
import { textEffects } from './text';
import { cardEffects } from './card';
import { threeDEffects } from './threeD';
import { particleEffects } from './particle';
import { backgroundEffects } from './background';
import { buttonEffects } from './button';
import { layoutEffects } from './layout';
import { scrollEffects } from './scroll';
import { svgEffects } from './svg';
import { loaderEffects } from './loader';
import { springEffects } from './spring';

/** All effects across every category, ordered by category. */
export const effects: Effect[] = [
  ...textEffects,
  ...cardEffects,
  ...layoutEffects,
  ...threeDEffects,
  ...particleEffects,
  ...backgroundEffects,
  ...buttonEffects,
  ...scrollEffects,
  ...svgEffects,
  ...loaderEffects,
  ...springEffects,
];

export function getEffectsByCategory(category: CategoryId): Effect[] {
  return effects.filter((e) => e.categories.includes(category));
}

export { textEffects, cardEffects, layoutEffects, threeDEffects, particleEffects, backgroundEffects, buttonEffects, scrollEffects, svgEffects, loaderEffects, springEffects };
