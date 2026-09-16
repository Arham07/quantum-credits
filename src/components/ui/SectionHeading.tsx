import type { ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Eyebrow } from './Eyebrow';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'ink' | 'night';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'left',
  tone = 'ink',
  className,
}: Props) {
  return (
    <header
      className={cx(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow className={tone === 'night' ? 'text-brand-100' : undefined}>{eyebrow}</Eyebrow>
      ) : null}
      <h2 className={cx('text-display-lg max-w-[18ch]', align === 'center' && 'max-w-[22ch]')}>
        {title}
      </h2>
      {lede ? (
        <p
          className={cx(
            'text-lede max-w-prose',
            tone === 'night' ? 'text-night-ink' : 'text-muted',
          )}
        >
          {lede}
        </p>
      ) : null}
    </header>
  );
}
