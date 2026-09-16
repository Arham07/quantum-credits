import { LEGAL_UPDATED } from './legalMeta';
import type { LegalDoc } from './legalTypes';

/**
 * Consumer Credit File Rights Under State and Federal Law.
 *
 * The quoted block is the statement mandated word-for-word by CROA
 * §1679c(a) (15 U.S.C. §1679c). It is federal statutory text, reproduced
 * verbatim from the US Code — do not paraphrase, shorten or "improve" it.
 *
 * IMPORTANT: publishing it here does NOT satisfy the statute. §1679c(b)
 * requires it be handed to the consumer as a document SEPARATE from the
 * contract and from any other written material, BEFORE the contract is
 * executed, and §1679c(c) requires keeping the consumer's signed
 * acknowledgment of receipt for two years. This page is the public copy.
 */
export const DISCLOSURES: LegalDoc = {
  title: 'Your credit file rights',
  summary:
    'What federal law says you are entitled to — including the things no credit repair company can do for you, and your right to walk away from any contract within three business days.',
  updated: LEGAL_UPDATED,
  callout:
    'Federal law requires us to give you this statement on its own, as a separate signed document, before you enter into any contract with us. This page is a public copy so you can read it before you ever speak to us.',
  sections: [
    {
      id: 'statement',
      heading: 'Consumer Credit File Rights Under State and Federal Law',
      blocks: [
        {
          p: 'The following is the statement required word-for-word by the Credit Repair Organizations Act, 15 U.S.C. §1679c(a). It is federal law, not our wording:',
        },
        {
          quote: [
            '“You have a right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any ‘credit repair’ company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report. The credit bureau must remove accurate, negative information from your report only if it is over 7 years old. Bankruptcy information can be reported for 10 years.',
            '“You have a right to obtain a copy of your credit report from a credit bureau. You may be charged a reasonable fee. There is no fee, however, if you have been turned down for credit, employment, insurance, or a rental dwelling because of information in your credit report within the preceding 60 days. The credit bureau must provide someone to help you interpret the information in your credit file. You are entitled to receive a free copy of your credit report if you are unemployed and intend to apply for employment in the next 60 days, if you are a recipient of public welfare assistance, or if you have reason to believe that there is inaccurate information in your credit report due to fraud.',
            '“You have a right to sue a credit repair organization that violates the Credit Repair Organization Act. This law prohibits deceptive practices by credit repair organizations.',
            '“You have the right to cancel your contract with any credit repair organization for any reason within 3 business days from the date you signed it.',
            '“Credit bureaus are required to follow reasonable procedures to ensure that the information they report is accurate. However, mistakes may occur.',
            '“You may, on your own, notify a credit bureau in writing that you dispute the accuracy of information in your credit file. The credit bureau must then reinvestigate and modify or remove inaccurate or incomplete information. The credit bureau may not charge any fee for this service. Any pertinent information and copies of all documents you have concerning an error should be given to the credit bureau.',
            '“If the credit bureau’s reinvestigation does not resolve the dispute to your satisfaction, you may send a brief statement to the credit bureau, to be kept in your file, explaining why you think the record is inaccurate. The credit bureau must include a summary of your statement about disputed information with any report it issues about you.',
            '“The Federal Trade Commission regulates credit bureaus and credit repair organizations. For more information contact: The Public Reference Branch, Federal Trade Commission, Washington, D.C. 20580.”',
          ],
        },
      ],
    },
    {
      id: 'plain-english',
      heading: 'The same thing in plain English',
      blocks: [
        {
          p: 'The statute above is the version that counts. This is what it means in practice, because we would rather you understood it than skimmed it.',
        },
        {
          list: [
            'You can dispute your own credit report, yourself, for free, by writing to the bureaus. You never have to hire anyone — including us.',
            'Nobody can remove information that is accurate, current and verifiable. Not us, not any company advertising otherwise. Accurate negative information stays up to seven years, and bankruptcy up to ten.',
            'You are entitled to your credit reports, and free in several situations — including if you were turned down for credit, employment, insurance or a rental in the last 60 days.',
            'If a credit repair company breaks the law, you can sue it. That right cannot be signed away.',
            'You can cancel a credit repair contract for any reason within three business days of signing, with no penalty and no obligation.',
          ],
        },
      ],
    },
    {
      id: 'before-you-sign',
      heading: 'What you get from us before you sign anything',
      blocks: [
        {
          p: 'Before you enter into a contract with us, federal law requires you to receive all of the following. If any of it is missing, do not sign:',
        },
        {
          list: [
            'This statement, as a separate document, which you sign to acknowledge you received it.',
            'A written, dated contract you sign, stating the total of all payments, a full description of the services, and how long the work is expected to take.',
            'A conspicuous statement in bold type next to the signature line explaining your right to cancel within three business days.',
            'Two copies of a detachable Notice of Cancellation form.',
            'Copies of everything you signed, at the time you sign it.',
          ],
        },
        {
          note: 'We do not charge for any service before it has been performed. You will not be billed for submitting a form on this site or for booking a consultation.',
        },
      ],
    },
    {
      id: 'cancelling',
      heading: 'How to cancel',
      blocks: [
        {
          p: 'You may cancel without penalty or obligation at any time before midnight of the third business day after you sign. To cancel, send us a signed, dated copy of the Notice of Cancellation form that came with your contract — or any other written notice saying you are cancelling — by mail or by hand.',
        },
        {
          p: 'After those three days you can still stop the monthly rounds whenever you like. There is no cancellation fee and no minimum term.',
        },
      ],
    },
    {
      id: 'complaints',
      heading: 'If you have a complaint',
      blocks: [
        {
          p: 'Talk to us first — most problems are a misunderstanding about what stage a file is at. If we cannot resolve it, you can take it further:',
        },
        {
          list: [
            'Federal Trade Commission — reportfraud.ftc.gov',
            'Consumer Financial Protection Bureau — consumerfinance.gov/complaint',
            'Your state Attorney General’s consumer protection office.',
          ],
        },
      ],
    },
  ],
};
