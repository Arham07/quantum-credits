'use client';

import 'lenis/dist/lenis.css';
import { type LenisRef, ReactLenis, useLenis } from 'lenis/react';
import { type ReactNode, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { NAV_OFFSET, useReducedMotion } from '@/lib/motion';

/**
 * Keeps ScrollTrigger in step with Lenis and gives in-page anchors both smooth
 * scrolling and correct focus movement. Rendered only when motion is allowed.
 */
function ScrollBridge() {
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;

    // lenis.css sets `html.lenis { height: auto }`, so measurements change.
    const resync = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    resync();

    // Webfonts land after first paint and reflow every section below them, so
    // every trigger measured before this point is wrong. This is the single
    // most common cause of ScrollTrigger positions being off on first load.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) resync();
    });
    window.addEventListener('load', resync);

    return () => {
      cancelled = true;
      window.removeEventListener('load', resync);
    };
  }, [lenis]);

  return null;
}

/**
 * Smooth scrolling for the whole page.
 *
 * The element tree never changes shape: when the visitor prefers reduced
 * motion the same ReactLenis root renders with smoothing switched off, which
 * leaves native scrolling in place. Swapping the wrapper out instead would
 * remount every child after hydration.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduced) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [reduced]);

  const options = reduced
    ? { autoRaf: false, smoothWheel: false, syncTouch: false, anchors: false }
    : {
        autoRaf: false,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.1,
        // Lenis handles in-page anchor clicks itself. We used to intercept them
        // by hand and call lenis.scrollTo() after a history.pushState() — but
        // Next's App Router patches pushState, and calling it immediately before
        // scrollTo kills the scroll outright: the router's scroll handling pins
        // the page at 0. The symptom was a nav link that silently did nothing,
        // intermittently, depending on what else was refreshing ScrollTrigger.
        // `anchors` is the library's own path and does not touch history.
        anchors: { offset: -NAV_OFFSET },
      };

  return (
    <ReactLenis root options={options} ref={lenisRef}>
      {reduced ? null : <ScrollBridge />}
      {children}
    </ReactLenis>
  );
}
