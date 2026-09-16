'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { isMotionAllowed, MOTION_OK } from '@/lib/motion';

/**
 * The hero dial.
 *
 * A NOTE ON WHAT THIS MAY SHOW — read before changing TARGET.
 * The needle rests on 670, the conventional start of FICO's "Good" band. That
 * is a general fact about how lenders read a file. It must NOT animate from a
 * low score up to a high one: that reads as "this is what we'll get you",
 * which is exactly the outcome claim CROA §1679b(a)(3) prohibits. The dial is
 * an instrument, not a forecast. See content/legal.ts.
 *
 * Technique notes:
 * - `pathLength="100"` remaps each arc to a literal percentage scale, so the
 *   dash maths is `100 - pct` with no getTotalLength() and no layout-dependent
 *   magic numbers.
 * - Bands are drawn as five DISCRETE arcs sized to their real share of the
 *   range, not as one gradient. FICO bands are categorical and wildly unequal
 *   — "Poor" is over half the scale, "Exceptional" under a tenth — so five
 *   equal segments, or a smooth gradient, would misstate the data. A gradient
 *   would also be applied in bounding-box space rather than along the arc,
 *   which puts the wrong colour on each limb.
 */

const CX = 100;
const CY = 100;
const R = 72;
const START_DEG = -120;
const END_DEG = 120;
const SWEEP = END_DEG - START_DEG;
const MIN = 300;
const MAX = 850;
const TARGET = 670;

/** Muted ramp, not signal red/green: this page should not shame the reader. */
const BANDS = [
  { from: 300, to: 579, label: 'Poor', color: '#d64545' },
  { from: 580, to: 669, label: 'Fair', color: '#e8833a' },
  { from: 670, to: 739, label: 'Good', color: '#e3b23c' },
  { from: 740, to: 799, label: 'Very good', color: '#6baf6b' },
  { from: 800, to: 850, label: 'Exceptional', color: '#2e9e63' },
] as const;

/** SVG y grows downward, so -90 puts 0° at twelve o'clock. */
function polar(deg: number, radius: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function arcPath(startDeg: number, endDeg: number, radius = R) {
  const s = polar(startDeg, radius);
  const e = polar(endDeg, radius);
  const large = Math.abs(endDeg - startDeg) <= 180 ? 0 : 1;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${radius} ${radius} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

const pctFor = (score: number) => ((score - MIN) / (MAX - MIN)) * 100;
const degFor = (score: number) => START_DEG + (pctFor(score) / 100) * SWEEP;

const TRACK = arcPath(START_DEG, END_DEG);
const TARGET_PCT = pctFor(TARGET);
const TARGET_BAND = BANDS.find((b) => TARGET <= b.to) ?? BANDS[0];

export function ScoreGauge({ caption }: { caption: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const value = el.querySelector<SVGPathElement>('[data-gauge-value]');
      const needle = el.querySelector<SVGGElement>('[data-gauge-needle]');
      const readout = el.querySelector<HTMLSpanElement>('[data-gauge-readout]');
      const band = el.querySelector<HTMLSpanElement>('[data-gauge-band]');
      const meter = el.querySelector<HTMLDivElement>('[data-gauge-meter]');
      if (!value || !needle || !readout || !band || !meter) return;

      // The resting state is what the server rendered, so with motion off
      // there is simply nothing to do.
      if (!isMotionAllowed()) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const state = { pct: 0 };

        // useGSAP runs in a layout effect, so this rewind lands before the
        // browser paints — the server-rendered resting state never flashes.
        const apply = (pct: number) => {
          const score = Math.round(MIN + (pct / 100) * (MAX - MIN));
          value.style.strokeDashoffset = String(100 - pct);
          needle.style.transform = `rotate(${START_DEG + (pct / 100) * SWEEP}deg)`;
          readout.textContent = String(score);
          const current = BANDS.find((b) => score <= b.to) ?? BANDS[BANDS.length - 1];
          if (band.textContent !== current.label) {
            band.textContent = current.label;
            band.style.color = current.color;
            // The filled arc takes the colour of the band it has reached. One
            // flat colour at any instant, so there is no gradient-along-a-curve
            // problem — and the dial visibly changes character as it climbs.
            value.style.stroke = current.color;
          }
          meter.setAttribute('aria-valuenow', String(score));
          meter.setAttribute('aria-valuetext', `${score}, ${current.label}`);
        };

        apply(0);

        return gsap.to(state, {
          pct: TARGET_PCT,
          duration: 1.8,
          delay: 0.3,
          // Fast launch, long settle — reads as an instrument measuring.
          ease: 'power3.out',
          onUpdate: () => apply(state.pct),
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <figure ref={root} className="flex flex-col items-center gap-4">
      {/* biome-ignore lint/a11y/useSemanticElements: <meter> renders a native
          bar that cannot be restyled into an arc gauge. role="meter" on a
          container is the correct ARIA mapping for a custom gauge. */}
      <div
        data-gauge-meter
        role="meter"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={TARGET}
        aria-valuetext={`${TARGET}, ${TARGET_BAND.label}`}
        aria-label="Credit score range"
        className="relative w-full max-w-[15.5rem] sm:max-w-[19rem] lg:max-w-[23rem]"
      >
        <svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden="true" focusable="false">
          {/* Band segments. `butt` caps: round caps would make the gaps look broken. */}
          {BANDS.map((b) => (
            <path
              key={b.label}
              d={arcPath(degFor(b.from) + 1.2, degFor(b.to) - 1.2)}
              fill="none"
              stroke={b.color}
              strokeOpacity="0.3"
              strokeWidth="13"
              strokeLinecap="butt"
            />
          ))}

          {/* Value arc, revealed by shortening the dash offset. */}
          <path
            data-gauge-value
            d={TRACK}
            pathLength={100}
            fill="none"
            stroke={TARGET_BAND.color}
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={100}
            strokeDashoffset={100 - TARGET_PCT}
          />

          {/* Needle: drawn pointing up, rotated to the score. */}
          <g
            data-gauge-needle
            style={{
              transform: `rotate(${degFor(TARGET)}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          >
            <path
              d={`M ${CX} ${CY - R + 17} L ${CX - 4.5} ${CY + 8} L ${CX + 4.5} ${CY + 8} Z`}
              fill="currentColor"
            />
          </g>
          <circle cx={CX} cy={CY} r="8.5" fill="currentColor" />
          <circle cx={CX} cy={CY} r="3.5" className="fill-surface" />

          <text
            x={polar(START_DEG, R).x - 4}
            y={polar(START_DEG, R).y + 18}
            textAnchor="middle"
            className="fill-current"
            style={{ fontSize: 9, opacity: 0.45 }}
          >
            {MIN}
          </text>
          <text
            x={polar(END_DEG, R).x + 4}
            y={polar(END_DEG, R).y + 18}
            textAnchor="middle"
            className="fill-current"
            style={{ fontSize: 9, opacity: 0.45 }}
          >
            {MAX}
          </text>
        </svg>

        {/* Readout in HTML, not SVG text: real font metrics and tabular figures. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center gap-1">
          <span
            data-gauge-readout
            className="font-display text-[2.5rem] leading-none font-semibold tracking-tight tabular-nums sm:text-[3rem]"
          >
            {TARGET}
          </span>
          <span
            data-gauge-band
            className="text-eyebrow font-medium uppercase"
            style={{ color: TARGET_BAND.color }}
          >
            {TARGET_BAND.label}
          </span>
        </div>
      </div>
      <figcaption className="max-w-[32ch] text-center text-fine text-muted">{caption}</figcaption>
    </figure>
  );
}
