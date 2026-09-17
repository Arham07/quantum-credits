'use client';

import { Card, mutedTextClass } from '@/components/ui/Card';
import type { ChallengedItem } from '@/content/types';

/**
 * The auto-advancing card strip, after the reference's product marquee.
 *
 * Built as a continuous CSS transform loop rather than a copy of their
 * implementation. Theirs runs a `setInterval` that calls
 * `scrollTo({behavior:'smooth'})` on an `overflow-x-hidden` flex row — and it
 * visibly stalls: with the strip centred in the viewport its `scrollLeft` sat
 * at 0 for thirteen seconds straight. A timer plus programmatic scrolling has
 * a lot of ways to stop (background tabs throttling rAF/timers, a smooth
 * scroll interrupted by anything else touching the scroll position). A
 * transform animation has none of them, needs no JS at all, and reads the
 * same.
 *
 * The track holds the list twice and translates by exactly -50%, so the second
 * copy is underneath the first at the moment it resets — the loop has no seam.
 * `aria-hidden` on the duplicate keeps the content from being announced twice.
 */
export function CardMarquee({ items }: { items: readonly ChallengedItem[] }) {
  return (
    <div
      className="qc-marquee relative flex overflow-hidden"
      // The mask fades both ends so cards enter and leave rather than being
      // chopped off at the viewport edge.
      style={{
        maskImage:
          'linear-gradient(to right, transparent, #000 5rem, #000 calc(100% - 5rem), transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, #000 5rem, #000 calc(100% - 5rem), transparent)',
      }}
    >
      <div className="qc-marquee-track flex shrink-0 gap-4 pr-4">
        {items.map((item) => (
          <MarqueeCard key={item.id} item={item} />
        ))}
      </div>
      <div className="qc-marquee-track flex shrink-0 gap-4 pr-4" aria-hidden="true">
        {items.map((item) => (
          <MarqueeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function MarqueeCard({ item }: { item: ChallengedItem }) {
  return (
    <Card
      tone="night"
      className="flex w-[15.5rem] shrink-0 flex-col justify-between sm:w-[17.5rem] lg:w-[19.5rem]"
    >
      <p className="text-[1.3125rem] font-semibold leading-[1.15] lg:text-[1.5rem]">{item.title}</p>
      <p className={`mt-8 text-meta lg:mt-10 ${mutedTextClass('night')}`}>{item.note}</p>
    </Card>
  );
}
