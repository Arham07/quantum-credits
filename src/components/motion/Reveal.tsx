'use client';

import type { ElementType, ReactNode } from 'react';
import { useRef } from 'react';
import { cx } from '@/lib/cx';
import { gsap, useGSAP } from '@/lib/gsap';
import { isMotionAllowed, MOTION_OK } from '@/lib/motion';

interface RevealProps {
  as?: ElementType;
  /** Seconds. Matches the reference's convention: 0.3 for ledes, 0.5 for CTAs. */
  delay?: number;
  /** Stagger direct children instead of animating the wrapper as one block. */
  stagger?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The page's one entry animation: opacity + a short rise + a blur that resolves.
 *
 * `.will-reveal` sets opacity:0 in CSS so the very first paint already matches
 * frame 0 — without it the content would flash at full opacity before GSAP's
 * effect runs. That class is neutralised under `prefers-reduced-motion`, so
 * when motion is off the content is simply visible and this component's
 * matchMedia scope never opens.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  stagger = false,
  className,
  children,
}: RevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // `.will-reveal` holds this at opacity 0 for GSAP to fade in. If motion
      // is off, nothing will ever run the tween, so clear it here or the
      // content stays invisible forever. The CSS media query covers a real
      // `prefers-reduced-motion`; this also covers the ?motion=reduce override.
      if (!isMotionAllowed()) {
        gsap.set(el, { opacity: 1, y: 0, filter: 'none' });
        gsap.set(Array.from(el.children), { opacity: 1, y: 0, filter: 'none' });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const targets = stagger ? Array.from(el.children) : el;

        // In stagger mode the tween targets the CHILDREN, so nothing would
        // ever clear the wrapper's own `.will-reveal` opacity:0 and the whole
        // group would stay invisible. Reveal the wrapper, hide the children.
        if (stagger) {
          gsap.set(el, { opacity: 1 });
        }

        gsap.fromTo(
          targets,
          { opacity: 0, y: 20, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.55,
            delay,
            ease: 'power2.out',
            stagger: stagger ? 0.1 : 0,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [delay, stagger] },
  );

  return (
    <Tag ref={root} className={cx('will-reveal', className)}>
      {children}
    </Tag>
  );
}
