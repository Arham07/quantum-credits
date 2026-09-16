'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { isMotionAllowed, MOTION_OK } from '@/lib/motion';

/**
 * Decorative circuit traces, after cantor8.io.
 *
 * Two mirrored pairs of orthogonal "PCB" traces cross the section. Each pair is
 * a lead path at full opacity plus a trail path offset by (±20, +20) at 35%,
 * which produces the ghosted double-line look.
 *
 * Two phases:
 *  1. Draw-on, once, when the section enters — 2.75s `power2.inOut` with a
 *     0.18s stagger across the four paths.
 *  2. An endless travelling pulse on duplicate paths. That one is pure CSS:
 *     `pathLength="1"` remaps each path to a unit interval, so a
 *     `stroke-dasharray: 0.04 0.96` dash is exactly 4% of the trace regardless
 *     of its real length, and animating `stroke-dashoffset` to -1 walks it from
 *     end to end. No getTotalLength(), no JS, no per-frame work.
 *
 * Purely decorative, so it is `aria-hidden` and gets no non-JS fallback —
 * progressive enhancement is the right call for an effect nobody needs to see.
 */

type Point = readonly [number, number];

/** Orthogonal polyline with `r`-radius fillets at each corner. */
function ortho(points: readonly Point[], r = 20): string {
  const [first, ...rest] = points;
  let d = `M ${first[0]} ${first[1]}`;

  for (let i = 1; i < points.length - 1; i += 1) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];

    // Corners are axis-aligned, so the unit vectors are always ±1 on one axis.
    const inX = Math.sign(cx - px);
    const inY = Math.sign(cy - py);
    const outX = Math.sign(nx - cx);
    const outY = Math.sign(ny - cy);

    const radius = Math.min(r, Math.hypot(cx - px, cy - py) / 2, Math.hypot(nx - cx, ny - cy) / 2);

    d += ` L ${cx - inX * radius} ${cy - inY * radius}`;
    d += ` Q ${cx} ${cy} ${cx + outX * radius} ${cy + outY * radius}`;
    void rest;
  }

  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

const PAIR_A: readonly Point[] = [
  [1600, 706],
  [1180, 706],
  [1180, 520],
  [820, 520],
  [820, 330],
  [420, 330],
  [420, 176],
  [-160, 176],
];

const PAIR_B: readonly Point[] = [
  [-160, 116],
  [300, 116],
  [300, 302],
  [660, 302],
  [660, 472],
  [1040, 472],
  [1040, 642],
  [1600, 642],
];

/** Lead then trail for each pair; the trail is nudged so the two never overlap. */
const TRACES = [
  { id: 'a1', d: ortho(PAIR_A), dx: 0, dy: 0, faint: false, reverse: true },
  { id: 'a2', d: ortho(PAIR_A), dx: -20, dy: 20, faint: true, reverse: true },
  { id: 'b1', d: ortho(PAIR_B), dx: 0, dy: 0, faint: false, reverse: false },
  { id: 'b2', d: ortho(PAIR_B), dx: 20, dy: 20, faint: true, reverse: false },
] as const;

export function CircuitLines({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = root.current;
      if (!svg) return;

      // Traces render fully drawn by default, so with motion off there is
      // nothing to animate and nothing to undo.
      if (!isMotionAllowed()) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const base = gsap.utils.toArray<SVGPathElement>('[data-trace-base]', svg);

        // pathLength="1" is already on the elements, so one dash unit is the
        // whole trace and the rewind below is length-independent.
        gsap.set(base, { strokeDasharray: 1, strokeDashoffset: 1 });

        return gsap.to(base, {
          strokeDashoffset: 0,
          duration: 2.75,
          ease: 'power2.inOut',
          stagger: 0.18,
          scrollTrigger: { trigger: svg, start: 'top 85%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <svg
      ref={root}
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Fades each trace out at both screen edges so nothing ends abruptly. */}
        <linearGradient
          id="qc-trace-ltr"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="qc-trace-rtl"
          gradientUnits="userSpaceOnUse"
          x1="1440"
          y1="0"
          x2="0"
          y2="0"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {TRACES.map((t) => (
        <g key={t.id} transform={`translate(${t.dx} ${t.dy})`}>
          <path
            data-trace-base
            d={t.d}
            pathLength={1}
            fill="none"
            stroke={`url(#${t.reverse ? 'qc-trace-rtl' : 'qc-trace-ltr'})`}
            strokeWidth="1"
            strokeOpacity={t.faint ? 0.35 : 1}
          />
          <path
            className="qc-pulse"
            d={t.d}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity={t.faint ? 0.45 : 0.85}
          />
        </g>
      ))}
    </svg>
  );
}
