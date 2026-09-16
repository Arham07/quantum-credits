import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';

/** The page's single horizontal rhythm. Every section uses it; nothing sets its own gutter. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cx('mx-auto w-full max-w-content px-5 sm:px-8 lg:px-10', className)}>
      {children}
    </div>
  );
}
