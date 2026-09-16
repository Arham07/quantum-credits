'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PhoneIcon } from '@/components/ui/Icon';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { PRIMARY_NAV, ROUTES, SITE, TEL_HREF } from '@/lib/site';
import { Wordmark } from './Wordmark';

/**
 * Sticky header.
 *
 * The `scrolled` state is a class toggle driven by ScrollTrigger rather than a
 * React state update, so scrolling never re-renders the tree. `@custom-variant
 * scrolled` in globals.css is what makes `scrolled:` utilities resolve.
 */
export function SiteHeader() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // A numeric start/end pair makes this a plain "is the page scrolled past
      // 8px" trigger that stays active all the way down, so onToggle fires
      // exactly twice — on and off. A `start: 'top -8'` with no end is only
      // active for an instant, so the class never stuck.
      const trigger = ScrollTrigger.create({
        start: 8,
        end: 'max',
        onToggle: (self) => el.classList.toggle('is-scrolled', self.isActive),
        onRefresh: (self) => el.classList.toggle('is-scrolled', self.isActive),
      });

      return () => trigger.kill();
    },
    { scope: root },
  );

  return (
    <header
      ref={root}
      className="sticky top-0 z-40 h-nav border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300 scrolled:border-line scrolled:bg-surface/85 scrolled:backdrop-blur"
    >
      <Container className="flex h-nav items-center justify-between gap-6">
        <a href={ROUTES.home} className="shrink-0" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {PRIMARY_NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-meta text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={TEL_HREF}
            className="inline-flex items-center gap-2 text-meta font-medium text-ink transition-colors hover:text-brand-600 max-sm:hidden"
          >
            <span className="text-brand-600">
              <PhoneIcon />
            </span>
            {SITE.phone.display}
          </a>
          <Button href={ROUTES.contact} size="md" className="max-md:hidden">
            Book a free consultation
          </Button>
        </div>
      </Container>
    </header>
  );
}
