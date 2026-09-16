import { cx } from '@/lib/cx';

/**
 * The wordmark, rebuilt from the logo animation the client supplied.
 *
 * The supplied asset is an .mp4, which cannot be a header logo — it can't be
 * recoloured, it can't scale crisply, and it costs a video decode above the
 * fold. This reproduces the mark in SVG: crosshair + letter-spaced QUANTUM over
 * CRE (ink) DIT (brand blue). Replace with the client's own SVG when it lands.
 */
export function Wordmark({
  tone = 'ink',
  className,
}: {
  tone?: 'ink' | 'light';
  className?: string;
}) {
  const ink = tone === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 32 32"
        className={cx('h-7 w-7 shrink-0', ink)}
        aria-hidden="true"
        focusable="false"
      >
        {/* Crosshair: two open arcs around a ringed centre. */}
        <path
          d="M16 3.2a12.8 12.8 0 0 0-12.8 12.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <path
          d="M16 28.8a12.8 12.8 0 0 0 12.8-12.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <circle cx="16" cy="16" r="7.4" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M16 8.6v14.8M8.6 16h14.8" stroke="var(--color-brand-500)" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="2.6" fill="var(--color-brand-500)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cx(
            'text-[0.5625rem] font-medium uppercase tracking-[0.34em]',
            tone === 'light' ? 'text-white/70' : 'text-muted',
          )}
        >
          Quantum
        </span>
        <span className={cx('font-display text-body font-bold uppercase tracking-tight', ink)}>
          Cre<span className="text-brand-500">dit</span>
        </span>
      </span>
    </span>
  );
}
