import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface SectionProps {
  id: string;
  /** `night` flips the section onto the dark mesh and switches text colours. */
  tone?: 'ground' | 'surface' | 'night';
  className?: string;
  children: ReactNode;
}

/**
 * A page section.
 *
 * `tabIndex={-1}` makes the element a valid focus target so that after an
 * in-page anchor jump the keyboard caret actually lands here — SmoothScroll
 * focuses the destination once Lenis finishes moving.
 */
export function Section({ id, tone = 'ground', className, children }: SectionProps) {
  const night = tone === 'night';
  return (
    <section
      id={id}
      tabIndex={-1}
      className={cx(
        'scroll-mt-nav py-section outline-none',
        tone === 'ground' && 'bg-ground text-ink',
        tone === 'surface' && 'bg-surface text-ink',
        night && 'on-night mesh text-white',
        className,
      )}
    >
      {children}
    </section>
  );
}
