import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { Container } from '@/components/ui/Container';
import { LEGAL_IS_DRAFT } from '@/content/legalMeta';
import type { LegalDoc } from '@/content/legalTypes';
import { LegalPage } from './LegalPage';

/**
 * Page chrome for the policy documents.
 *
 * `onHome={false}` is the point of this wrapper: it turns the header, footer
 * and action-bar section links from `#pricing` into `/#pricing`, so they go
 * home and land on the section instead of silently doing nothing here.
 *
 * The draft banner is off (LEGAL_IS_DRAFT). It stays wired so flipping that one
 * flag brings it back if these need marking again before counsel signs off.
 */
export function LegalShell({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <SkipLink />
      {LEGAL_IS_DRAFT ? (
        <div className="border-b border-warn-500/40 bg-warn-500/12">
          <Container className="py-2.5">
            <p className="text-fine text-ink">
              <strong className="font-semibold">Draft for review.</strong> This document is a
              researched starting point and has not yet been reviewed by a consumer-finance
              attorney. Do not rely on it as final.
            </p>
          </Container>
        </div>
      ) : null}
      <SiteHeader onHome={false} />
      <LegalPage doc={doc} />
      <SiteFooter onHome={false} />
      <MobileActionBar onHome={false} />
    </>
  );
}
