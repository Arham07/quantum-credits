import { Inter } from 'next/font/google';

/**
 * One family for everything, matching the Lovable reference
 * (id-preview--d189e702…lovableproject.com): Inter throughout, headings and
 * body alike, never bolder than 600 (semibold) — their hero H2 is 48px/600,
 * card titles 18px/600, stat numbers 48px/600, body 18px/400. Confirmed live
 * on the running page, not just from its CSS.
 *
 * The reference itself never loads Inter — it declares
 * `font-family: Inter, system-ui, -apple-system, sans-serif` but ships no
 * `@font-face`, so every visitor actually sees their OS's system-ui fallback
 * (San Francisco, Segoe UI, Roboto…), not Inter. We match the STYLE, not that
 * bug: this downloads and self-hosts Inter for real via next/font, so there is
 * no third-party request and no layout shift.
 *
 * Two next/font calls for the same family, not one shared binding, so a future
 * re-pairing (this project has done that once already, and may again) only
 * ever means editing this file.
 */
export const displayFace = Inter({
  subsets: ['latin'],
  // 700 is loaded ONLY for Wordmark.tsx's "CREDIT" — the client's actual logo
  // replica, which is bold in the supplied artwork and stays that way
  // regardless of the reference's own weight ceiling. Everything else that
  // uses this variable (every heading) stays at 600; nothing in the app
  // requests font-bold except that one component. Omitting 700 here would not
  // make the wordmark render at 600 — with no real 700 outline available, the
  // browser fakes it with synthetic emboldening, which looks visibly worse
  // than the reference's clean 600. Load the real weight instead.
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-face',
  display: 'swap',
});

export const bodyFace = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-face',
  display: 'swap',
});
