/**
 * One date for every policy page, so they cannot drift apart.
 * Bump this whenever any of the three documents changes in substance.
 */
export const LEGAL_UPDATED = '17 September 2026';

/**
 * Whether to show a "draft, not yet reviewed" banner on the policy pages.
 *
 * Turned off at the client's request. The underlying position has not changed:
 * these documents are researched against CROA (15 U.S.C. §1679), the FTC
 * Telemarketing Sales Rule, the TCPA, the GLBA Privacy and Safeguards Rules,
 * the FCRA and CCPA/CPRA, but no consumer-finance attorney has reviewed them
 * and two bracketed values are still unfilled — the governing state in Terms,
 * and a postal address in Privacy. That remains on the launch checklist in the
 * README. Set this back to true if the pages need flagging again.
 */
export const LEGAL_IS_DRAFT = false;
