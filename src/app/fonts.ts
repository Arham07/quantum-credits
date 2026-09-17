import { Inter, Sora } from 'next/font/google';

/**
 * Self-hosted by next/font — the files are downloaded at build time and served
 * from our own origin, so there is no third-party request and no layout shift.
 * (The Lovable reference declares Inter and never loads it; don't repeat that.)
 *
 * Sora is a geometric grotesk with a wide, even rhythm that matches the
 * letter-spaced QUANTUM in the logo.
 *
 * (A brief detour through a single Figtree family, chasing
 * mastercard.com/businessoutcomes's look, was reverted at the client's
 * request — back to this Sora/Inter pairing.)
 */
export const displayFace = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display-face',
  display: 'swap',
});

export const bodyFace = Inter({
  subsets: ['latin'],
  variable: '--font-body-face',
  display: 'swap',
});
