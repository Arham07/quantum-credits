import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/** The small tracked label above a heading. */
export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cx('text-eyebrow font-medium uppercase text-brand-600', className)}>{children}</p>
  );
}
