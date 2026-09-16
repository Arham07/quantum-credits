import type { Metadata } from 'next';
import { LegalShell } from '@/components/layout/LegalShell';
import { DISCLOSURES } from '@/content/disclosures';

export const metadata: Metadata = {
  title: 'Your credit file rights',
  description:
    'Consumer Credit File Rights Under State and Federal Law, as required by the Credit Repair Organizations Act.',
  // Policy pages should not compete with the homepage in search results.
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalShell doc={DISCLOSURES} />;
}
