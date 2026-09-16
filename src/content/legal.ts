/**
 * Compliance copy.
 *
 * These strings are not decoration and must not be softened, shortened or
 * moved into a collapsed "Terms" link. A credit repair organisation operates
 * under the Credit Repair Organizations Act (CROA, 15 U.S.C. §1679 et seq.),
 * the FTC's Telemarketing Sales Rule (16 CFR §310.4) and the TCPA
 * (47 CFR §64.1200). Two rules drive everything here:
 *
 *   1. §1679b(a)(3) forbids "untrue or misleading representation of the
 *      services". We describe a PROCESS (challenging items) and never an
 *      OUTCOME (removing them) — the bureaus decide outcomes, not us.
 *   2. "Clear and conspicuous" means adjacent to the claim, in the same
 *      medium, at readable size. Not 9px grey in the footer.
 *
 * If you are editing this file, read README → Compliance first.
 */

/** Sits next to any language a reader could mistake for a promise. */
export const RESULTS_DISCLAIMER =
  'Results vary. We cannot guarantee any specific outcome, the removal of any particular item, or an increase in your credit score.';

/**
 * The single most important sentence on the site. CROA requires a version of
 * this in the pre-contract disclosure; saying it out loud on the page is also
 * the strongest trust signal available in a category readers assume is a scam.
 */
export const ACCURACY_DISCLAIMER =
  'We cannot remove accurate, current, and verifiable information from your credit report. No one can — not us, not any credit repair company, and not you. Accurate negative information generally stays on your report for up to seven years, and bankruptcy for up to ten. What we do is identify and challenge information that appears inaccurate, incomplete, outdated, or unverifiable under the Fair Credit Reporting Act.';

/** CROA-mandated in the written disclosure. On-page it costs nothing and buys credibility. */
export const SELF_HELP_DISCLAIMER =
  'You have the right to dispute inaccurate information in your credit report yourself, for free, by contacting the credit bureaus directly. You do not need to hire anyone to do this. Our clients hire us for the time, expertise, documentation and follow-through the process takes.';

export const NO_LEGAL_ADVICE =
  'Quantum Credit is a credit repair organization as defined under the Credit Repair Organizations Act, 15 U.S.C. §1679 et seq. We are not a law firm, we do not provide legal advice, and nothing on this website creates an attorney-client relationship. Everything here is general information only.';

/** §1679e. The 3-day right to cancel is not waivable — §1679f voids any attempt. */
export const CANCELLATION_RIGHTS =
  'You may cancel your contract with us, without penalty or obligation, at any time before midnight of the 3rd business day after the date you signed it. Before you sign anything, you will receive a separate written statement of your Consumer Credit File Rights Under State and Federal Law, a written contract describing the services and the total of all payments, and a detachable Notice of Cancellation form.';

/** §1679b(b) bans charging for services before they are performed. */
export const NO_ADVANCE_PAYMENT =
  'We do not charge for services before they are performed. You will not be billed when you submit this form or book a consultation. The consultation is free and carries no obligation.';

export const NOT_AFFILIATED =
  'Quantum Credit is not affiliated with Equifax, Experian, TransUnion, or any credit bureau, creditor, or collection agency.';

/** The catch-all, rendered once in the footer. */
export const MASTER_DISCLAIMER =
  'Quantum Credit does not guarantee that any client will experience any particular outcome, within any particular time frame, or at all. We do not guarantee the removal of any tradeline and make no promise of any particular result. Individual results vary based on the contents of each client’s credit file and the responses of the credit bureaus and data furnishers. Our work requires active participation from clients, including providing requested documents, identification, and investigation results received by mail. Credit service companies cannot promise a result or a credit score increase.';

/**
 * TCPA "prior express written consent" — 47 CFR §64.1200(f)(9).
 *
 * Every element below is load-bearing and required by the regulation:
 *  - names the seller specifically (never "and our marketing partners")
 *  - names the number the visitor supplied
 *  - discloses autodialer / prerecorded voice / SMS
 *  - states consent is NOT a condition of purchase  ← §64.1200(f)(9)(i)(B)
 *  - gives an alternative way to reach us, and the STOP/HELP keywords
 *
 * Rendered beside an UNCHECKED checkbox, immediately above submit, at body
 * size. Note: the FCC's "one-to-one consent" rule is NOT in force — the 11th
 * Circuit vacated it in Jan 2025 (Insurance Marketing Coalition v. FCC) and
 * the FCC repealed the rule text in Aug 2025 — but every element above is,
 * and state mini-TCPAs can be stricter than the federal floor.
 */
export const TCPA_CONSENT =
  'I give my express written consent for Quantum Credit to contact me at the phone number I provided — including by automatic telephone dialing system, artificial or prerecorded voice, and SMS text message — about its credit repair services, even if that number is on a state or national Do Not Call registry. I understand my consent is not required as a condition of purchasing any goods or services, and that I can call (917) 410-0849 instead. Message and data rates may apply. Message frequency varies. Reply STOP to opt out at any time, or HELP for help.';

export const TERMS_CONSENT =
  'I agree to the Terms of Use and Privacy Policy, and I consent to receive documents and disclosures electronically.';

/**
 * Shown under the points chart.
 *
 * The 30–150 range comes from the client's own Strategic Plan deck. It is an
 * objective performance claim, so it is labelled illustrative and carries the
 * deck's own caveat. If the client cannot substantiate it from their own
 * client files, delete the chart — see README → Compliance.
 */
export const CHART_DISCLAIMER =
  'Illustrative only. These ranges describe what a removed item can be worth in general, not a prediction of your result. Where your score lands depends on what is actually in your file, how many items are challenged successfully, and how the bureaus and furnishers respond.';
