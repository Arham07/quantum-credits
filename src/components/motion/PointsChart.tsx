'use client';

import { useRef } from 'react';
import type { ChartRow } from '@/content/types';
import { gsap, useGSAP } from '@/lib/gsap';
import { isMotionAllowed, MOTION_OK } from '@/lib/motion';

/**
 * The deck's points chart, as floating range bars on a shared 0–max axis.
 *
 * Ranges, not single values, because the underlying figure is a range — drawing
 * one bar per row would imply a precision the data does not have. See
 * CHART_DISCLAIMER in content/legal.ts for why this is labelled illustrative.
 *
 * Built on a CSS grid with a `<table>`-free semantic list; each bar is a plain
 * div sized in percent, so it is readable with CSS alone and the animation only
 * scales it in.
 */
export function PointsChart({ rows, max }: { rows: readonly ChartRow[]; max: number }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      // Bars are sized in CSS; the tween only scales them in, so with motion
      // off the chart is already correct.
      if (!isMotionAllowed()) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const bars = gsap.utils.toArray<HTMLElement>('[data-bar]', el);

        return gsap.from(bars, {
          scaleX: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          // Grow from the low end of each range, not from the axis origin.
          transformOrigin: 'left center',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [rows] },
  );

  const ticks = [0, max / 4, max / 2, (max * 3) / 4, max];

  return (
    <div ref={root}>
      <ul className="flex flex-col gap-5">
        {rows.map((row) => (
          <li key={row.id} className="grid gap-2 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-5">
            <span className="text-meta font-medium">{row.label}</span>
            <span className="relative flex h-9 items-center rounded-full bg-white/5">
              <span
                data-bar
                className="absolute h-9 rounded-full bg-gradient-to-r from-brand-600 to-brand-500"
                style={{
                  left: `${(row.min / max) * 100}%`,
                  width: `${((row.max - row.min) / max) * 100}%`,
                }}
              />
              <span className="relative ml-auto pr-3.5 text-[0.8125rem] font-medium tabular-nums text-white">
                {row.min}–{row.max}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-4 hidden justify-between border-t border-white/10 pt-2 text-[0.75rem] tabular-nums text-night-ink sm:flex sm:pl-[12.25rem]"
        aria-hidden="true"
      >
        {ticks.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <p className="mt-2 text-[0.75rem] uppercase tracking-wide text-night-ink sm:pl-[12.25rem]">
        Points on a standard 300–850 scale
      </p>
    </div>
  );
}
