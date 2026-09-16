import type { Metadata } from 'next';
import { LegalShell } from '@/components/layout/LegalShell';
import { TERMS } from '@/content/terms';

export const metadata: Metadata = {
  title: 'Terms of use',
  description:
    'The rules for using the Quantum Credit website. Your service agreement is a separate signed document.',
  // Policy pages should not compete with the homepage in search results.
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalShell doc={TERMS} />;
}
