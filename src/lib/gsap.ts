import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

/**
 * Single GSAP entry point.
 *
 * Registration is guarded for the server (client modules still evaluate during
 * SSR) and is idempotent, so React StrictMode's double effects and Turbopack
 * hot reloads cannot register a plugin twice.
 *
 * Import this only from `"use client"` modules.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
  // Mobile browsers fire resize when the URL bar hides; without this the
  // scroll triggers would recalculate constantly.
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'power3.out', duration: 0.7 });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
