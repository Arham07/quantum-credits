import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { SITE } from '@/lib/site';
import { bodyFace, displayFace } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — credit restoration across all three bureaus`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'We challenge everything on your credit reports that looks inaccurate, incomplete, outdated or unverifiable — across Experian, Equifax and TransUnion, every round. Book a free consultation.',
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — credit restoration across all three bureaus`,
    description:
      'Every negative item challenged, every round, across all three bureaus. Free consultation, no obligation.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#101010',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${displayFace.variable} ${bodyFace.variable}`}>
      <head>
        {/*
          `.will-reveal` holds elements at opacity:0 so GSAP can fade them in
          without a flash of fully-opaque content. If scripts never run, nothing
          would ever reveal them — so undo it when JavaScript is unavailable.
        */}
        <noscript>
          {/* biome-ignore lint/security/noDangerouslySetInnerHtml: a static
              literal with no interpolation; <style> children cannot be JSX. */}
          <style dangerouslySetInnerHTML={{ __html: '.will-reveal{opacity:1!important}' }} />
        </noscript>
      </head>
      {/*
        Browser extensions inject attributes onto <body> before React hydrates
        — ColorZilla's `cz-shortcut-listen`, Grammarly's `data-gr-*`, and
        others — which React reports as a hydration mismatch we cannot fix from
        here. suppressHydrationWarning silences it.

        It only suppresses ONE level deep: this element's own attributes and
        text. A genuine mismatch inside any child still surfaces, so this does
        not hide our own bugs.
      */}
      <body className="antialiased" suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
