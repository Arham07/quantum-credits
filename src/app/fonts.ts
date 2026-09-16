import { Figtree } from 'next/font/google';

/**
 * One family for everything, the way mastercard.com/businessoutcomes runs a
 * single face across headings and body.
 *
 * Their typeface is "Mark Offc for MC" (MarkForMC-Book/Med/Bold) — Mastercard's
 * proprietary corporate cut of HVD's Mark, licensed to them alone. It is not
 * ours to use, and serving their .ttf files would be a licensing violation.
 *
 * Figtree is the closest legitimate match: the same geometric skeleton, a
 * similarly tall x-height, single-storey `g`, and flat-sided round letterforms,
 * with the slight humanist warmth Mark has over a pure geometric like Futura.
 * It is open-licensed and self-hosted by next/font, so there is no third-party
 * request and no layout shift.
 *
 * If the client ever licenses Mark itself, swap this file for a localFont()
 * call — nothing else in the app references a family name directly.
 */
export const displayFace = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-face',
  display: 'swap',
});

/** Same family; the two variables exist so a future pairing needs no rewrite. */
export const bodyFace = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-face',
  display: 'swap',
});
