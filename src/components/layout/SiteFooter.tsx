import { Container } from '@/components/ui/Container';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import {
  CANCELLATION_RIGHTS,
  MASTER_DISCLAIMER,
  NO_LEGAL_ADVICE,
  NOT_AFFILIATED,
} from '@/content/legal';
import { FOOTER_NAV, SITE, sectionHref } from '@/lib/site';
import { Wordmark } from './Wordmark';

/**
 * The disclaimer block is the point of this footer, not an afterthought. It is
 * set at the same size as the rest of the fine print rather than shrunk — "clear
 * and conspicuous" is a legal standard, and 9px grey does not meet it.
 */
export function SiteFooter({ onHome = true }: { onHome?: boolean }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ground text-muted">
      <Container className="py-11 sm:py-14 lg:py-20">
        <div className="grid gap-9 sm:gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-[34ch] text-meta">
              Credit restoration across Experian, Equifax and TransUnion. Every item challenged,
              every round.
            </p>
            <p className="mt-4 text-meta">
              <a
                href={`tel:${SITE.phone.e164}`}
                className="text-ink transition-colors hover:text-brand-600"
              >
                {SITE.phone.display}
              </a>
              <br />
              <a href={`mailto:${SITE.email.display}`} className="transition-colors hover:text-ink">
                {SITE.email.display}
              </a>
              <PlaceholderTag show={SITE.email.placeholder} />
            </p>
            <p className="mt-3 text-meta">
              {SITE.hours.display}
              <PlaceholderTag show={SITE.hours.placeholder} />
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-10">
            {FOOTER_NAV.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h2 className="text-eyebrow font-medium uppercase text-ink">{column.title}</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={sectionHref(link.href, onHome)}
                        className="text-meta transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-7 text-fine sm:mt-14 sm:gap-4 sm:pt-8">
          <p>
            {SITE.legalName}
            <PlaceholderTag />, a credit repair organization registered in {SITE.registration.state}
            , registration #{SITE.registration.number}, bonded in the amount of{' '}
            {SITE.registration.bond}.
            <PlaceholderTag show={SITE.registration.placeholder} />
          </p>
          <p>{NO_LEGAL_ADVICE}</p>
          <p>{CANCELLATION_RIGHTS}</p>
          <p>{NOT_AFFILIATED}</p>
          <p>{MASTER_DISCLAIMER}</p>
          <p className="pt-2 text-muted/70">
            © {year} {SITE.legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
