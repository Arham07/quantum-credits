import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

interface SectionProps {
  id: string;
  /**
   * Sections are light throughout, alternating ground/surface so neighbours
   * differ. Dark is a CARD tone now, not a section tone — see ui/Card.tsx.
   */
  tone?: 'ground' | 'surface';
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
  return (
    <section
      id={id}
      tabIndex={-1}
      className={cx(
        'py-section outline-none',
        tone === 'ground' ? 'bg-ground text-ink' : 'bg-surface text-ink',
        className,
      )}
    >
      {children}
    </section>
  );
}
