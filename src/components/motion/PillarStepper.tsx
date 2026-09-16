'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import type { NumberedItem } from '@/content/types';
import { cx } from '@/lib/cx';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { isMotionAllowed, MOTION_OK, useReducedMotion } from '@/lib/motion';

/**
 * Scroll-pinned stepper, after Mastercard's "Impact Highlights".
 *
 * The section is `n × 100vh` tall with a `position: sticky` child, so there is
 * `(n-1) × 100vh` of travel. For item `i`, with `v = position - i`:
 *
 *   rotateX     30 × v degrees
 *   translateY  −75 × v percent
 *   opacity     clamp(1 − 0.7·|v|, 0, 1)
 *
 * Two deliberately different motion registers, which is the whole trick:
 * the numeral drum is scroll-LINKED with no easing, so it feels physically
 * attached to the wheel; the copy is DISCRETE and tweened in CSS over 0.8s, so
 * each sentence feels committed. Making both scroll-linked reads as mush.
 *
 * The mesh lives on the sticky child, not on the section: the section is 400vh,
 * and a background sized to it would stretch the radial stops over four screens
 * so the middle two read as flat black. On the sticky child the gradient is
 * always exactly one viewport tall.
 *
 * That is also why the section heading is rendered HERE rather than as a
 * separate block above. A heading outside the sticky sat on flat `night` while
 * the stepper sat on the mesh, which drew a hard colour seam across the section,
 * and it was followed by half a viewport of dead space before the first pillar
 * reached the pinned area. One surface, one composition, neither problem.
 *
 * It runs on phones too, as Mastercard's does: at 375px their section is still
 * 400vh with the same sticky drum, just scaled down (numeral 128px, and the
 * pill goes landscape instead of circular). The layout stacks there —
 * label, counter, drum, copy — rather than sitting in one row.
 *
 * The one difference from theirs: a step costs 85vh on a phone rather than
 * 100vh. The effect is identical, each step just advances a little sooner,
 * which suits thumb scrolling and keeps roughly a screen of length off the page.
 *
 * Reduced motion still gets the flat list. That is an accessibility floor, not
 * a viewport question: pinning the page for someone who asked for less motion
 * is exactly what the preference exists to prevent.
 */
export function PillarStepper({
  eyebrow,
  title,
  lede,
  items,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  items: readonly NumberedItem[];
}) {
  const root = useRef<HTMLDivElement>(null);
  // Drives LAYOUT, not just animation: with motion off the section must not be
  // 400vh tall, or the reader scrolls four blank screens past a pinned panel
  // that never changes. `useReducedMotion` returns false on the server and
  // corrects on the client, so the markup hydrates without a mismatch.
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      if (!isMotionAllowed()) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const numerals = gsap.utils.toArray<HTMLElement>('[data-step-numeral]', el);
        const panels = gsap.utils.toArray<HTMLElement>('[data-step-panel]', el);
        const counter = el.querySelector<HTMLElement>('[data-step-counter]');
        const last = items.length - 1;
        let shown = -1;

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const position = self.progress * last;

            for (let i = 0; i < numerals.length; i += 1) {
              const v = position - i;
              const numeral = numerals[i];
              numeral.style.transform = `rotateX(${30 * v}deg) translateY(${-75 * v}%) translateZ(0)`;
              numeral.style.opacity = String(gsap.utils.clamp(0, 1, 1 - 0.7 * Math.abs(v)));
            }

            const active = Math.round(position);
            if (active === shown) return;
            shown = active;

            if (counter) {
              counter.textContent = `${String(active + 1).padStart(2, '0')} • ${String(items.length).padStart(2, '0')}`;
            }
            panels.forEach((panel, i) => {
              panel.classList.toggle('is-active', i === active);
              panel.classList.toggle('is-prev', i < active);
            });
          },
        });

        // Set the opening frame so nothing is mid-transform before first scroll.
        trigger.refresh();

        return () => trigger.kill();
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [items, reduced] },
  );

  return (
    <div
      ref={root}
      style={{ ['--qc-steps' as string]: items.length }}
      className={
        reduced ? undefined : 'h-[calc(var(--qc-steps)*85vh)] md:h-[calc(var(--qc-steps)*100vh)]'
      }
    >
      <div
        className={cx(
          'mesh',
          // `min-h-screen`, not `h-screen`, and no `overflow-hidden`: on a
          // short viewport a fixed height would silently clip the pillar copy,
          // and text you cannot read is a worse failure than a panel that grows.
          // The drum clips its own numerals with clip-path, so nothing here
          // needs to hide overflow.
          !reduced && 'sticky top-0 flex min-h-screen items-center',
        )}
      >
        <Container className={cx('py-section', !reduced && 'md:py-0')}>
          <div className="flex flex-col gap-10 md:gap-12">
            <header className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-6">
                <p className="text-eyebrow font-medium uppercase text-brand-100">{eyebrow}</p>
                {/* The counter snaps at the midpoint between steps, with no
                    transition — it is a readout, not pagination chrome.
                    Hidden wherever the stepper is not driving it: with all four
                    pillars listed in a column, a frozen "01 • 04" would claim a
                    position the reader is not in. */}
                <p
                  data-step-counter
                  className={cx(
                    'shrink-0 font-display text-xl font-medium tabular-nums text-white md:text-[1.625rem]',
                    reduced && 'hidden',
                  )}
                >
                  01 • {String(items.length).padStart(2, '0')}
                </p>
              </div>
              <h2 className="max-w-[18ch] text-display-lg">{title}</h2>
              <p className="max-w-prose text-lede text-night-ink">{lede}</p>
            </header>

            <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
              {/* The numeral drum. `perspective` on the frame plus preserve-3d
                  on each numeral is what makes rotateX read as a physical
                  cylinder rather than a flat squash; the fog gradient makes
                  numerals emerge from and dissolve into the frame's edges. */}
              <div className={cx('md:col-span-4', reduced && 'hidden')}>
                <div className="qc-drum relative mx-auto h-[10.5rem] w-full rounded-full bg-white sm:h-[12rem] md:aspect-square md:h-auto md:max-w-[13rem]">
                  {items.map((item, i) => (
                    <div
                      key={item.id}
                      data-step-numeral
                      className="absolute inset-0 flex items-center justify-center font-display text-[6.5rem] font-semibold leading-none tracking-tighter tabular-nums text-night sm:text-[7rem] md:text-[6rem]"
                      style={{ transformStyle: 'preserve-3d', opacity: i === 0 ? 1 : 0 }}
                    >
                      {item.index}
                    </div>
                  ))}
                </div>
              </div>

              {/* Copy. On desktop the panels stack and cross-fade; on mobile
                  they are simply four blocks in a column. */}
              <div
                className={cx(
                  'md:col-span-8',
                  !reduced && 'relative min-h-[13rem] md:min-h-[15rem]',
                )}
              >
                {items.map((item, i) => (
                  <article
                    key={item.id}
                    data-step-panel
                    className={cx(
                      'mb-12 last:mb-0',
                      !reduced && 'qc-panel absolute inset-x-0 top-0 mb-0',
                      !reduced && i === 0 && 'is-active',
                    )}
                  >
                    {/* The drum already shows the index while the stepper is
                        running; this numeral is only for the flat list. */}
                    {reduced ? (
                      <p className="font-display text-3xl font-semibold tabular-nums text-white/30">
                        {item.index}
                      </p>
                    ) : null}
                    <h3 className={cx('text-display-md text-white', reduced && 'mt-2')}>
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-prose text-lede text-night-ink">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
