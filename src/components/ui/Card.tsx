import type { ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';

export type CardTone = 'surface' | 'night' | 'accent';

/**
 * The page's only card.
 *
 * Before this existed there were five disagreeing recipes — `border-white/12
 * bg-white/5`, `border-white/10 bg-white/5`, `border-line bg-ground`,
 * `border-line bg-ground/80 backdrop-blur-sm`, `border-line bg-surface` — and
 * exactly one card in the whole codebase carried a shadow. That inconsistency
 * was most of what made the page look unlike the reference.
 *
 * The reference's rule is simple and absolute: every card is a 36px radius, a
 * very diffuse shadow, no border, and one of three fills. Borders are the thing
 * to resist adding back — an outline and a shadow together read as neither.
 *
 * TEXT COLOUR IS NOT FREE HERE. `accent` is a saturated fill, so contrast
 * behaves differently on it than on `night`:
 *   - accent cannot use the raw logo blue (#0090F9): white on it is 3.3:1.
 *     It uses brand-600 (5.44:1). See scripts/check-contrast.mjs.
 *   - on accent, secondary text stops at `text-white/90` (4.71:1); /85 is
 *     already 4.38 and fails.
 *   - on night, the reference's `opacity-70` eyebrow is fine (8.88:1).
 * Use `mutedTextClass(tone)` rather than picking an opacity by eye.
 */
/**
 * `on-night` is what swaps the focus ring to the light variant (globals.css).
 * It has to travel with the dark FILLS now that no section is dark — otherwise
 * a link inside a near-black card gets a brand-600 ring it cannot show.
 */
const TONES: Record<CardTone, string> = {
  surface: 'bg-surface text-ink',
  night: 'on-night bg-card-night text-white',
  accent: 'on-night bg-brand-600 text-white',
};

/** The dimmest secondary text each tone can carry and still clear AA. */
export function mutedTextClass(tone: CardTone): string {
  if (tone === 'surface') return 'text-muted';
  if (tone === 'accent') return 'text-white/90';
  return 'text-night-ink';
}

interface CardProps {
  as?: ElementType;
  tone?: CardTone;
  /** Drops the default padding for cards that manage their own spacing. */
  bare?: boolean;
  className?: string;
  children: ReactNode;
  /** Anything the rendered element needs — `href` on an anchor, and so on. */
  [key: string]: unknown;
}

export function Card({
  as: Tag = 'div',
  tone = 'surface',
  bare = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      {...rest}
      className={cx(
        'relative rounded-card shadow-card',
        !bare && 'p-6 sm:p-[30px] xl:p-[35px]',
        TONES[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
