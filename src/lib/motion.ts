'use client';

import { useSyncExternalStore } from 'react';

/** Motion runs only when the visitor has not asked for reduced motion. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)';

/** Sticky header height plus breathing room, used when scrolling to anchors. */
export const NAV_OFFSET = 88;

/** Development-only escape hatch: /?motion=reduce exercises the reduced path. */
function hasDevReduceOverride(): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  return new URLSearchParams(window.location.search).get('motion') === 'reduce';
}

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(MOTION_REDUCED);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(MOTION_REDUCED).matches || hasDevReduceOverride();
}

/**
 * Whether animation may run right now.
 *
 * `gsap.matchMedia(MOTION_OK)` alone would miss the development override,
 * so every motion component checks this as well. Keeping the media query in
 * matchMedia means GSAP still reverts its work if the visitor changes the
 * system preference mid-session.
 */
export function isMotionAllowed(): boolean {
  return !getSnapshot();
}

/**
 * True when animation should be suppressed.
 *
 * The server snapshot is `false` so the markup React renders on the server and
 * on first hydration always matches; the client corrects itself immediately
 * afterwards without a hydration mismatch or a set-state-in-effect.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** Exported for tests; mirrors what {@link useReducedMotion} reads. */
export const motionInternals = { getSnapshot, hasDevReduceOverride };
