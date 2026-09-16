import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cx } from '@/lib/cx';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onNight';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-ui font-medium transition-[background-color,color,border-color,opacity] duration-200 disabled:cursor-not-allowed disabled:opacity-60';

const SIZES: Record<Size, string> = {
  md: 'h-12 px-5 text-meta',
  lg: 'h-[3.625rem] px-8 text-base',
};

/**
 * Variants deliberately avoid transform on hover — the reference's discipline,
 * and it keeps hover off the compositor's critical path on long pages.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'border border-line bg-surface text-ink hover:border-brand-600 hover:text-brand-600',
  ghost: 'text-ink hover:text-brand-600',
  onNight: 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
};

interface Common {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type AnchorProps = Common & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className' | 'children'
  >;

type ButtonProps = Common &
  Omit<ComponentPropsWithoutRef<'button'>, 'className' | 'children'> & { href?: undefined };

export function Button(props: AnchorProps | ButtonProps) {
  const { variant = 'primary', size = 'lg', className, children } = props;
  const classes = cx(BASE, SIZES[size], VARIANTS[variant], className);

  if ('href' in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    // `tel:`, `sms:` and `mailto:` are not routes — next/link would try to
    // prefetch them. Anything off-page uses a plain anchor.
    const isPlainAnchor = external || /^(tel:|sms:|mailto:|https?:)/.test(href);

    if (isPlainAnchor) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
