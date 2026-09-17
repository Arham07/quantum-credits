import { PillarStepper } from '@/components/motion/PillarStepper';
import type { NumberedItem } from '@/content/types';

/**
 * The method. Dark, because this is the turn from problem to answer and the
 * page should feel like it changes gear here.
 *
 * The section is only a wrapper: the heading and the stepper are one
 * composition inside PillarStepper, because the stepper's wrapper is the
 * scroll-height element and the mesh belongs to its sticky child. Anything
 * rendered here instead would sit outside that surface and show a seam.
 */
export function Pillars({ items }: { items: readonly NumberedItem[] }) {
  return (
    <section id="how-it-works" tabIndex={-1} className="on-night bg-night text-white outline-none">
      <PillarStepper
        eyebrow="How we get it done"
        title="Four moves, run in order, every round."
        lede="Most companies send the same dispute letter to three addresses and call it a programme. This is the sequence we actually run on your file."
        items={items}
      />
    </section>
  );
}
