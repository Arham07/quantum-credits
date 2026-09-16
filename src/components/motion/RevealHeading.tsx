'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { cx } from '@/lib/cx';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { isMotionAllowed, MOTION_OK } from '@/lib/motion';

/**
 * The per-word heading cascade.
 *
 * Words, not characters: character splitting a 60-character headline creates
 * 60 animated nodes for a effect nobody can perceive at that speed, and it
 * breaks text selection and copy-paste for longer. SplitText's `revert()` in
 * the cleanup restores the original DOM so screen readers and selection are
 * never left with the split markup.
 */
export function RevealHeading({
  as: Tag = 'h2',
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // See Reveal: with motion off nothing clears `.will-reveal`, so the
      // heading would never become visible.
      if (!isMotionAllowed()) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const split = new SplitText(el, { type: 'words', wordsClass: 'qc-word' });

        // The tween targets the split words, so the heading's own
        // `.will-reveal` opacity:0 has to be cleared here or the words animate
        // in behind a fully transparent parent.
        gsap.set(el, { opacity: 1 });

        gsap.fromTo(
          split.words,
          { opacity: 0, y: '0.4em' },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        );

        return () => split.revert();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Tag ref={root} className={cx('will-reveal [&_.qc-word]:inline-block', className)}>
      {children}
    </Tag>
  );
}
