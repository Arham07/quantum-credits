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
 * The draft banner is on until a consumer-finance attorney has signed these
 * off — flip LEGAL_IS_DRAFT in content/legalMeta.ts. Publishing unreviewed
 * policy text with no marking is how a placeholder ends up being relied on.
 */
export function LegalShell({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <SkipLink />
      {LEGAL_IS_DRAFT ? (
        <div className="bg-warn-500/12 border-b border-warn-500/40">
          <Container className="py-2.5">
            <p className="text-fine text-ink">
              <strong className="font-semibold">Draft for review.</strong> This document is a
              researched starting point and has not yet been reviewed by a consumer-finance
              attorney. Do not rely on it as final.
            </p>
          </Container>
        </div>
      ) : null}
      <SiteHeader />
      <LegalPage doc={doc} />
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
