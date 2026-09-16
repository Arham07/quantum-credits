import type { Metadata } from 'next';
import { LegalShell } from '@/components/layout/LegalShell';
import { PRIVACY } from '@/content/privacy';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'What Quantum Credit collects, why, who ever sees it, and how to have it deleted.',
  // Policy pages should not compete with the homepage in search results.
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalShell doc={PRIVACY} />;
}
