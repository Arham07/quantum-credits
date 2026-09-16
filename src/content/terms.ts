import { SITE } from '@/lib/site';
import { LEGAL_UPDATED } from './legalMeta';
import type { LegalDoc } from './legalTypes';

/**
 * Terms of use for the WEBSITE. Not the service agreement.
 *
 * The CROA contract is a separate, signed, dated document with its own
 * mandated content (§1679d) and a detachable Notice of Cancellation (§1679e).
 * Nothing here may stand in for it or contradict it.
 *
 * Deliberately absent: a binding arbitration clause and a class action waiver.
 * CROA §1679f voids any consumer waiver of rights under the Act, courts have
 * repeatedly declined to enforce arbitration clauses in credit repair
 * contracts, and §1679g gives an express private right of action with fee
 * shifting. A clause that looks like it strips those rights is both
 * unenforceable and evidence of bad faith. Do not add one without counsel.
 */
export const TERMS: LegalDoc = {
  title: 'Terms of use',
  summary:
    'The rules for using this website. Your actual service agreement is a separate document you sign — nothing here replaces it.',
  updated: LEGAL_UPDATED,
  callout:
    'These terms cover the website only. If you become a client you will sign a separate written contract, and you will receive your Consumer Credit File Rights statement and a Notice of Cancellation before you do.',
  sections: [
    {
      id: 'acceptance',
      heading: 'Accepting these terms',
      blocks: [
        {
          p: `By using ${SITE.domain} you agree to these terms. If you do not agree, please do not use the site. We may update them; the date at the top tells you when we last did.`,
        },
      ],
    },
    {
      id: 'not-the-contract',
      heading: 'This website is not your service agreement',
      blocks: [
        {
          p: 'Nothing on this site creates a contract for credit repair services. Submitting the form, booking a consultation, calling or texting us costs nothing and commits you to nothing.',
        },
        {
          p: 'If you decide to work with us, you will receive and sign a separate written contract that states the total of all payments, describes the services in full, and estimates how long the work will take — together with your Consumer Credit File Rights statement and two copies of a detachable Notice of Cancellation. If those terms and these ever conflict, the signed contract governs.',
        },
      ],
    },
    {
      id: 'no-guarantee',
      heading: 'No guarantee of results',
      blocks: [
        {
          p: 'We describe a process, not an outcome. We cannot and do not guarantee any particular result, the removal of any particular item, any score increase, or any time frame.',
        },
        {
          p: 'We cannot remove accurate, current and verifiable information from your credit report. Nobody can. What we do is identify and challenge information that appears inaccurate, incomplete, outdated or unverifiable, and help you build positive history alongside it.',
        },
        {
          p: 'You can dispute inaccurate information yourself, for free, by contacting the credit bureaus directly. You are never required to hire anyone.',
        },
      ],
    },
    {
      id: 'no-advice',
      heading: 'Not legal or financial advice',
      blocks: [
        {
          p: 'We are not a law firm and we do not provide legal advice. Nothing on this site creates an attorney-client relationship. We are not investment advisers, tax advisers or accountants, and nothing here is financial, tax or investment advice. It is general information only.',
        },
      ],
    },
    {
      id: 'eligibility',
      heading: 'Who may use this site',
      blocks: [
        {
          p: 'You must be at least 18 and able to enter into a binding contract. Our services are offered to residents of the United States. We may decline to work with anyone, and we will say so honestly if we do not think we can help.',
        },
      ],
    },
    {
      id: 'your-information',
      heading: 'What you send us',
      blocks: [
        {
          p: 'Please give us accurate information. Filing disputes on a file built from wrong details wastes your money and can do real damage, so we will stop work if we discover what we were given is not true.',
        },
        {
          p: 'Do not submit anyone else’s personal information unless you are authorised to. Do not send us sensitive documents through the contact form — once you are a client, use the secure portal.',
        },
        {
          p: 'How we handle what you send is set out in our privacy policy.',
        },
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      blocks: [
        { p: 'While using this site, please do not:' },
        {
          list: [
            'Submit false information, or impersonate anyone.',
            'Use the site for anything unlawful, or to facilitate credit or identity fraud.',
            'Attempt to gain unauthorised access to the site, its systems or anyone else’s data.',
            'Scrape, harvest or bulk-download the site, or use automated means to submit forms.',
            'Interfere with the site’s operation or security.',
          ],
        },
      ],
    },
    {
      id: 'ip',
      heading: 'Our content',
      blocks: [
        {
          p: `The text, design, graphics and code on this site belong to ${SITE.legalName} or our licensors, except where they are federal statutory text reproduced in the public interest. You may read, print and share pages for your own personal use. You may not republish, sell or use them commercially without our written permission.`,
        },
        {
          p: 'Equifax, Experian and TransUnion are trademarks of their respective owners. We reference them to describe what we do; the reference does not imply any affiliation or endorsement.',
        },
      ],
    },
    {
      id: 'third-party',
      heading: 'Links to other sites',
      blocks: [
        {
          p: 'Where we link to a regulator, a credit bureau or a scheduling tool, we do not control that site and are not responsible for its content or its privacy practices. Their terms apply once you leave ours.',
        },
      ],
    },
    {
      id: 'warranties',
      heading: 'The site is provided as is',
      blocks: [
        {
          p: 'We work to keep this site accurate and available, but we provide it “as is” and “as available”, without warranties of any kind to the fullest extent the law allows. We do not warrant that it will be uninterrupted, error-free or free of harmful components.',
        },
        {
          note: 'Nothing in this section limits any right you have under the Credit Repair Organizations Act, the Fair Credit Reporting Act, or any other consumer protection law. Those rights cannot be waived, and we are not trying to.',
        },
      ],
    },
    {
      id: 'liability',
      heading: 'Limitation of liability',
      blocks: [
        {
          p: 'To the fullest extent permitted by law, we are not liable for indirect, incidental, special or consequential damages arising from your use of this website.',
        },
        {
          p: 'This limitation does not apply to — and we expressly do not attempt to limit — our liability under the Credit Repair Organizations Act or any other liability that cannot lawfully be limited. CROA §1679f makes any purported waiver of your rights under that Act void, and §1679g gives you a right to sue us for actual damages, punitive damages, costs and attorney’s fees.',
        },
      ],
    },
    {
      id: 'law',
      heading: 'Governing law',
      blocks: [
        {
          p: 'These terms are governed by the laws of the State of [STATE], without regard to its conflict of law rules. Nothing in this clause limits any right you have to bring a claim under federal consumer protection law, or in the courts of the state where you live.',
        },
        {
          note: 'PLACEHOLDER — the governing state must be set before launch, and this section reviewed by a consumer-finance attorney. Do not add an arbitration clause or class action waiver without that review; see the note in the source file for why.',
        },
      ],
    },
    {
      id: 'contact-terms',
      heading: 'Contact us',
      blocks: [
        {
          p: `Questions about these terms: ${SITE.email.display} or ${SITE.phone.display}.`,
        },
      ],
    },
  ],
};
