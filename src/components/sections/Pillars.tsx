import { PillarStepper } from '@/components/motion/PillarStepper';
import type { NumberedItem } from '@/content/types';

/**
 * The method — the turn from problem to answer.
 *
 * The section is only a wrapper: the heading and the stepper are one
 * composition inside PillarStepper, because the stepper's wrapper is the
 * scroll-height element and the sticky child is what actually fills the
 * viewport. Anything rendered here instead sits outside that and shows a seam.
 */
export function Pillars({ items }: { items: readonly NumberedItem[] }) {
  return (
    <section id="how-it-works" tabIndex={-1} className="bg-ground text-ink outline-none">
      <PillarStepper
        eyebrow="How we get it done"
        title="Four moves, run in order, every round."
        lede="Most companies send the same dispute letter to three addresses and call it a programme. This is the sequence we actually run on your file."
        items={items}
      />
    </section>
  );
}
