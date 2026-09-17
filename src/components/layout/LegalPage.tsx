import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import type { LegalBlock, LegalDoc } from '@/content/legalTypes';
import { SITE } from '@/lib/site';

/**
 * A stable key from the block's own text. Authored content has no ids, and the
 * array index would be a lie the moment a paragraph is inserted mid-section.
 */
function blockKey(block: LegalBlock): string {
  if ('h3' in block) return `h3:${block.h3}`;
  if ('note' in block) return `note:${block.note.slice(0, 60)}`;
  if ('list' in block) return `list:${block.list[0]?.slice(0, 60)}`;
  if ('quote' in block) return `quote:${block.quote[0]?.slice(0, 60)}`;
  return `p:${block.p.slice(0, 60)}`;
}

function Block({ block }: { block: LegalBlock }) {
  if ('h3' in block) {
    return <h3 className="mt-7 text-display-md">{block.h3}</h3>;
  }
  if ('list' in block) {
    return (
      <ul className="mt-4 flex flex-col gap-2.5">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3 text-body text-muted">
            <span
              aria-hidden="true"
              className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-brand-600"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if ('note' in block) {
    return (
      <p className="mt-5 rounded-ui border border-line bg-surface p-4 text-meta text-ink">
        {block.note}
      </p>
    );
  }
  if ('quote' in block) {
    return (
      <blockquote className="mt-5 flex flex-col gap-3 border-l-2 border-brand-600 pl-5">
        {block.quote.map((line) => (
          <p key={line.slice(0, 40)} className="text-body text-ink">
            {line}
          </p>
        ))}
      </blockquote>
    );
  }
  return <p className="mt-4 text-body text-muted">{block.p}</p>;
}

/**
 * Shared shell for the policy pages.
 *
 * A jump list rather than a sidebar: these run long, and on a phone a sticky
 * sidebar would eat a third of the screen for navigation nobody uses twice.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Container className="py-section">
        <div className="max-w-prose">
          <Link
            href="/"
            className="text-meta font-medium text-brand-600 underline underline-offset-4"
          >
            ← Back to {SITE.name}
          </Link>

          <h1 className="mt-6 text-display-lg">{doc.title}</h1>
          <p className="mt-4 text-lede text-muted">{doc.summary}</p>
          <p className="mt-3 text-fine text-muted">Last updated {doc.updated}</p>

          {doc.callout ? (
            <p className="mt-7 rounded-ui border border-brand-600/30 bg-brand-50 p-5 text-meta text-ink">
              {doc.callout}
            </p>
          ) : null}

          <nav aria-label="On this page" className="mt-9 border-y border-line py-6">
            <h2 className="text-eyebrow font-medium uppercase text-muted">On this page</h2>
            <ol className="mt-4 flex flex-col gap-2">
              {doc.sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    // Opt out of SmoothScroll's Lenis bridge. These pages carry
                    // no motion, and routing the jump list through Lenis made it
                    // race with ScrollTrigger's refreshes — the scroll would
                    // silently not happen on a fresh load. A native jump uses
                    // the same `scroll-padding-top` offset (88px) as every other
                    // link on the site, and it is deterministic.
                    data-native-anchor
                    className="text-meta text-muted transition-colors hover:text-brand-600"
                  >
                    <span className="tabular-nums">{String(i + 1).padStart(2, '0')}.</span>{' '}
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {doc.sections.map((section, i) => (
            <section key={section.id} id={section.id} tabIndex={-1} className="mt-12 outline-none">
              <h2 className="text-display-md">
                <span className="mr-2 tabular-nums text-brand-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.heading}
              </h2>
              {section.blocks.map((block) => (
                <Block key={blockKey(block)} block={block} />
              ))}
            </section>
          ))}
        </div>
      </Container>
    </main>
  );
}
