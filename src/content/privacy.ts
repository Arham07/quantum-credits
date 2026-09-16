import { SITE } from '@/lib/site';
import { LEGAL_UPDATED } from './legalMeta';
import type { LegalDoc } from './legalTypes';

/**
 * Privacy policy.
 *
 * Written against the regimes that actually reach a credit repair organisation:
 *  - GLBA Privacy Rule + Safeguards Rule (16 CFR 313/314). The FTC treats a
 *    business "significantly engaged in providing financial products or
 *    services" as a financial institution, and names credit counselors and
 *    other financial advisors explicitly. We assume we are covered rather than
 *    argue we are not.
 *  - FCRA, because we handle consumer reports.
 *  - TCPA (47 CFR §64.1200) for the call/text consent we collect on the form.
 *  - CCPA/CPRA for California residents, plus the other state regimes that now
 *    mirror it. Note GLBA-regulated data is exempt from CCPA, so the policy
 *    says which rules govern which data instead of pretending it is uniform.
 */
export const PRIVACY: LegalDoc = {
  title: 'Privacy policy',
  summary:
    'What we collect, why, who ever sees it, and how to make us delete it. Written to be read, not to be survived.',
  updated: LEGAL_UPDATED,
  callout:
    'The short version: we collect what the dispute process actually needs, we never sell your information, and we only contact you the way you told us to. You can ask us to delete your data at any time.',
  sections: [
    {
      id: 'who',
      heading: 'Who this covers',
      blocks: [
        {
          p: `This policy applies to ${SITE.domain} and to the credit restoration services provided by ${SITE.legalName} (“we”, “us”). We are a credit repair organization as defined by the Credit Repair Organizations Act, 15 U.S.C. §1679 et seq.`,
        },
        {
          p: 'Because we provide a financial service, information about our clients is also governed by the Gramm-Leach-Bliley Act and, where it comes from a consumer report, by the Fair Credit Reporting Act. Where those federal rules apply, they take precedence over the state rights described further down.',
        },
      ],
    },
    {
      id: 'collect',
      heading: 'What we collect',
      blocks: [
        { h3: 'What you give us' },
        {
          list: [
            'Contact details — your name, email address and phone number.',
            'What you tell us about your situation — the issues on your reports, roughly how many negative items you have, and what you are trying to get approved for.',
            'Anything you type into the message box or say to us on a call.',
          ],
        },
        { h3: 'What you give us once you become a client' },
        {
          list: [
            'Identity documents required to file disputes on your behalf — government identification and proof of address.',
            'Your Social Security number, where a bureau or furnisher requires it to process a dispute.',
            'Your credit reports from Experian, Equifax and TransUnion, and the investigation results the bureaus mail to you.',
          ],
        },
        {
          note: 'We ask for identity documents and a Social Security number only after you have engaged us, and only because the bureaus will not act on a dispute without them. We will never ask you for a “credit privacy number”, a new credit identity or an EIN to use in place of your SSN. Those are federal fraud, and anyone offering you one should be reported to the FTC.',
        },
        { h3: 'What we collect automatically' },
        {
          list: [
            'Standard server logs — IP address, browser and device type, pages viewed, and the page that referred you.',
            'When you submit the form, a record of your consent: the time, your IP address, your browser, the page URL, and the exact consent wording shown to you. We keep this because a call or text consent is only worth what we can prove about it.',
          ],
        },
      ],
    },
    {
      id: 'use',
      heading: 'What we use it for',
      blocks: [
        {
          list: [
            'Responding to your enquiry and running your free consultation.',
            'Preparing, sending and tracking disputes with the credit bureaus and data furnishers.',
            'Escalating your file to legal counsel if you are being sued.',
            'Sending you progress reports and service messages.',
            'Meeting our own legal obligations — including record-keeping the Credit Repair Organizations Act requires.',
          ],
        },
        {
          p: 'We do not use your information to make automated decisions about you, and we do not profile you for advertising.',
        },
      ],
    },
    {
      id: 'calls',
      heading: 'Calls and text messages',
      blocks: [
        {
          p: 'If you tick the consent box on our form, you are giving prior express written consent for us to contact you at the number you gave us — including by automatic dialing system, artificial or prerecorded voice, and SMS — about our services.',
        },
        {
          p:
            'That consent is not a condition of buying anything from us. You can reach us on ' +
            SITE.phone.display +
            ' instead and never tick the box. Message and data rates may apply, and message frequency varies.',
        },
        {
          p: 'To stop texts, reply STOP to any message. Reply HELP for help. You can also withdraw consent by any reasonable means — email, a phone call, or telling us on a call — and we will action it within ten business days.',
        },
      ],
    },
    {
      id: 'share',
      heading: 'Who we share it with',
      blocks: [
        { p: 'We do not sell your personal information, and we never have.' },
        { p: 'We share it only where the work requires it, or where the law does:' },
        {
          list: [
            'The credit bureaus and data furnishers we dispute with on your behalf — this is the service.',
            'Service providers who operate our systems, such as our email delivery and scheduling tools. They act on our instructions and may not use your data for anything else.',
            'Legal counsel, if your file is escalated because you are being sued.',
            'Regulators, or in response to a subpoena, court order or other legal obligation.',
            'A buyer or successor, if the business is ever sold — on the same terms as this policy.',
          ],
        },
        {
          p: 'We are not affiliated with Equifax, Experian, TransUnion, or with any creditor or collection agency. We work only for you.',
        },
      ],
    },
    {
      id: 'security',
      heading: 'How we protect it',
      blocks: [
        {
          p: 'We maintain an information security programme appropriate to the sensitivity of what we hold, as the FTC Safeguards Rule requires. In practice: documents move through a secure portal rather than email attachments, access is limited to the people working your file, and data is encrypted in transit.',
        },
        {
          p: 'No system is perfectly secure, and we will not pretend otherwise. If a breach affects your information, we will notify you and the relevant regulators as the law requires.',
        },
      ],
    },
    {
      id: 'retention',
      heading: 'How long we keep it',
      blocks: [
        {
          list: [
            'Enquiries that do not become clients — deleted within 24 months, or sooner on request.',
            'Client files — kept for the length of the engagement and then as long as our record-keeping obligations require.',
            'Your signed acknowledgment of the Consumer Credit File Rights statement — two years, as CROA §1679c(c) requires.',
            'Call and text consent records — at least five years, because the limitation period for a TCPA claim is four.',
          ],
        },
      ],
    },
    {
      id: 'rights',
      heading: 'Your rights',
      blocks: [
        { h3: 'California residents' },
        {
          p: 'Under the CCPA as amended by the CPRA, you have the right to know what personal information we have collected, where we got it, why we use it and who we disclose it to; to have it corrected; to have it deleted; to limit our use of sensitive personal information; and to opt out of its sale or sharing — though we do not sell or share it. We will not discriminate against you for exercising any of these rights.',
        },
        {
          note: 'Personal information we hold under the Gramm-Leach-Bliley Act is exempt from the CCPA. That is most of a client file. Ask us anyway — we will tell you what we hold and delete whatever we are not required to keep.',
        },
        { h3: 'Everyone else' },
        {
          p: 'We extend the same rights to everyone, regardless of where you live. Several states — including Colorado, Connecticut, Virginia, Texas and Utah — now give comparable rights by statute, and we would rather run one standard than a map.',
        },
        {
          p: `To exercise any of this, email ${SITE.email.display} or call ${SITE.phone.display}. We will verify who you are before we act, and respond within 45 days.`,
        },
      ],
    },
    {
      id: 'cookies',
      heading: 'Cookies and tracking',
      blocks: [
        {
          p: 'This site does not use advertising cookies, and it does not track you across other websites. We use only what is needed to serve the page and keep it working.',
        },
        {
          note: 'If analytics or an advertising pixel is added later, this section must be updated before it goes live, and a cookie banner will be required.',
        },
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      blocks: [
        {
          p: 'This service is for adults. We do not knowingly collect information from anyone under 18. If you believe a child has given us information, contact us and we will delete it.',
        },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        {
          p: 'If we change this policy we will update the date at the top. If a change materially affects how we use information we already hold, we will tell you directly rather than rely on you re-reading this page.',
        },
      ],
    },
    {
      id: 'contact',
      heading: 'Contact us',
      blocks: [
        {
          p: `${SITE.legalName} · ${SITE.email.display} · ${SITE.phone.display}. A postal address for written requests will be listed here before launch.`,
        },
      ],
    },
  ],
};
