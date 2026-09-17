import { ROUTES, SITE, SMS_HREF } from '@/lib/site';
import type {
  ChallengedItem,
  ChartRow,
  FaqItem,
  Hero,
  NumberedItem,
  ProcessFact,
  ValueLine,
} from './types';

/**
 * Homepage copy.
 *
 * VOICE RULE — read before editing: we describe what we DO, never what will
 * HAPPEN. "challenge", "dispute", "work every item" are safe; "remove",
 * "delete", "guarantee", "in 3 months you'll…" are not. See content/legal.ts.
 */

export const HERO: Hero = {
  eyebrow: 'Credit restoration · All 3 bureaus',
  title: 'The items on your report',
  titleAccent: 'aren’t the whole story.',
  lede: 'We challenge everything across Experian, Equifax and TransUnion that looks inaccurate, incomplete, outdated or unverifiable — and freeze the secondary bureaus feeding them. Every round, until there’s nothing left to challenge.',
  primaryCta: { label: 'Book a free consultation', href: ROUTES.contact },
  secondaryCta: { label: `Text ${SITE.phone.display}`, href: SMS_HREF },
  chips: [
    'All 3 bureaus, every round',
    '30–45 day dispute cycle',
    'Legal escalation at no extra charge',
  ],
  gauge: {
    from: 300,
    to: 850,
    caption: 'Where your file sits today is a starting point, not a verdict.',
  },
};

/**
 * The marquee strip under the hero.
 *
 * Voice rule applies here as much as anywhere: these are things we CHALLENGE,
 * never things we promise to remove. Each note says what the item is, not what
 * will happen to it.
 *
 * Deliberately a separate list rather than reusing QUIZ_STEPS.issues: that one
 * includes "I'm not sure", which is a valid thing for a visitor to say about
 * their own file and a nonsense thing to put on a card.
 */
export const CHALLENGED_ITEMS: readonly ChallengedItem[] = [
  { id: 'collections', title: 'Collections', note: 'Accounts sold on to a third party' },
  { id: 'charge-offs', title: 'Charge-offs', note: 'Written off, still sitting on your file' },
  { id: 'late-payments', title: 'Late payments', note: '30, 60, 90 days and beyond' },
  { id: 'inquiries', title: 'Hard inquiries', note: 'Pulls you never authorised' },
  { id: 'repossessions', title: 'Repossessions', note: 'Voluntary and involuntary' },
  { id: 'bankruptcies', title: 'Bankruptcies', note: 'Including discharged filings' },
  { id: 'student-loans', title: 'Student loans', note: 'Defaults and misreported balances' },
  { id: 'foreclosures', title: 'Foreclosures', note: 'And the deficiency balances after' },
];

/**
 * The deck's "Top Reasons for Bank Decline". Kept close to the client's own
 * wording — this is the section that makes the reader feel understood.
 */
export const WHY_DECLINED: readonly NumberedItem[] = [
  {
    id: 'thin-file',
    index: '01',
    title: 'Insufficient credit file',
    body: 'You haven’t used credit enough for Experian, Equifax and TransUnion to calculate a traditional score. It does not mean you have bad credit — it means you’re close to invisible to a lender’s model.',
  },
  {
    id: 'pti',
    index: '02',
    title: 'Excessive payment-to-income ratio',
    body: 'Too much of your gross monthly income is already going to recurring debt payments, leaving too little for everyday living and nothing for an unexpected emergency. Underwriting sees the gap before you do.',
  },
  {
    id: 'ltv',
    index: '03',
    title: 'Loan-to-value too high',
    body: 'The amount requested, combined with the length of the repayment term, exceeds the lender’s risk limits for the specific asset being pledged. The file isn’t the problem — the structure is.',
  },
  {
    id: 'negatives',
    index: '04',
    title: 'Negative items',
    body: 'The lender pulled your history and found red flags that mark you as a higher-risk borrower. Those items tell the bank you may not repay as agreed — whether or not they’re actually accurate.',
  },
];

/** The deck's "4 Pillars to Approval", rewritten in process voice. */
export const PILLARS: readonly NumberedItem[] = [
  {
    id: 'freeze',
    index: '01',
    title: 'Freeze the secondary bureaus',
    body: 'Before anything else, we suppress and freeze the secondary consumer reporting agencies. These are the data furnishers the big three lean on to validate what sits on your report. Cut the supply line first and every round after it lands harder.',
  },
  {
    id: 'challenge',
    index: '02',
    title: 'Challenge every negative item',
    body: 'Documents drafted from consumer law and customised to your file, sent to all three bureaus every single round — hard inquiries, charge-offs, foreclosures, collections, student loans, bankruptcies. Not a template. Not a sample. Every item, every cycle.',
  },
  {
    id: 'positive',
    index: '03',
    title: 'Add positive data points',
    body: 'Challenging alone only subtracts. We add authorized-user and primary tradelines that report to all three bureaus, and get your utilization down under 7% — so the file that’s left tells a lender a different story.',
  },
  {
    id: 'finance',
    index: '04',
    title: 'Assess your finance options',
    body: 'The point was never a number on a screen. We assess what you’re actually likely to be approved for, then sit down and go over the concrete figures with you.',
  },
];

export const PROCESS_FACTS: readonly ProcessFact[] = [
  {
    id: 'cycle',
    title: 'A 30–45 day dispute cycle',
    body: 'One full round: documents out to all three bureaus, statutory response window, results back, next round drafted from what came in.',
  },
  {
    id: 'every-item',
    title: 'Every item worked, every round',
    body: 'We don’t pick the easy ones and leave the rest. Anything legally challengeable gets challenged again, cycle after cycle.',
  },
  {
    id: 'reports',
    title: 'Monthly progress reports',
    body: 'You see exactly what went out, what came back and what’s still open. No guessing what you’re paying for.',
  },
  {
    id: 'legal',
    title: 'Legal escalation at no extra charge',
    body: 'If you’re being sued, your file escalates to legal. That isn’t an upsell and it isn’t a separate invoice.',
  },
];

/** The deck's points chart. Illustrative — see CHART_DISCLAIMER in legal.ts. */
export const CHART_ROWS: readonly ChartRow[] = [
  { id: 'personal', label: 'Personal information', min: 10, max: 35 },
  { id: 'inquiries', label: 'Hard inquiries', min: 15, max: 55 },
  { id: 'chargeoffs', label: 'Charge-offs', min: 60, max: 150 },
  { id: 'bankruptcy', label: 'Bankruptcy', min: 80, max: 200 },
  { id: 'collections', label: 'Collections', min: 55, max: 145 },
];

export const CHART_AXIS_MAX = 200;

export const PRICING_INCLUDES: readonly string[] = [
  'All three bureaus — Experian, Equifax and TransUnion — attacked each round',
  'Secondary consumer reporting agencies suppressed and frozen',
  'Every negative item worked each month, not just the easy ones',
  'Escalation to legal if you’re being sued, at no extra charge',
  'Your initial cost can be split into two payments',
];

/** The deck's own value stack, used as the price anchor. */
export const VALUE_STACK: readonly ValueLine[] = [
  { id: 'cleaning', label: 'Credit Cleaning', value: 1295 },
  { id: 'boosting', label: 'Credit Boosting', value: 795 },
  { id: 'coaching', label: 'Credit Coaching', value: 395 },
  { id: 'capital', label: 'Credit Capital Access', value: 195 },
];

/**
 * The honesty column. Every competitor studied either omits this or buries it.
 * It is the single strongest differentiator on the page — and it is the
 * legally required position anyway.
 */
export const SCOPE_LIMITS: readonly string[] = [
  'We can’t remove accurate, current, verifiable information. Nobody can.',
  'We don’t win every dispute — no one does. We work every item that’s legally challengeable, every cycle.',
  'We don’t provide a remedy for legitimate debt you actually owe.',
  'We can’t promise a score, a timeframe, or an approval. Anyone who does is telling you what you want to hear.',
];

export const FAQS: readonly FaqItem[] = [
  {
    id: 'accurate',
    q: 'Can you remove accurate negative information?',
    a: 'No. No one can — not us, not any credit repair company, and not you. Accurate, current and verifiable information stays on your report for up to seven years, and bankruptcy for up to ten. What we do is find and challenge the information that appears inaccurate, incomplete, outdated or unverifiable, and add positive history that changes what’s left.',
  },
  {
    id: 'cost',
    q: 'What does it cost, and why does the price vary?',
    a: 'Your one-time cost is set by how many negative items sit across all three reports — five bands from $200 to $1,000 — then $80 per month for each round after that. We price on item count because that is what actually drives the work. You can split the initial cost into two payments.',
  },
  {
    id: 'how-long',
    q: 'How long does this take?',
    a: 'A dispute cycle runs 30–45 days, and your file keeps going until there is nothing left to challenge. How many cycles that takes depends entirely on what is in your file and how the bureaus and furnishers respond, so anyone quoting you a fixed finish date is guessing.',
  },
  {
    id: 'cancel',
    q: 'How do I cancel, and is there a charge if I do?',
    a: 'You can cancel your contract without penalty or obligation any time before midnight of the third business day after you sign it — that is your right under federal law and we cannot take it away. After that you can stop the monthly rounds whenever you like. There is no cancellation fee and no minimum term.',
  },
  {
    id: 'my-work',
    q: 'Do I have to do any work?',
    a: 'Some, and it matters. We need your identification and documents up front, and you need to forward us the investigation results the bureaus mail to you. Files where the client forwards their mail promptly move measurably faster.',
  },
  {
    id: 'security',
    q: 'Will my information be protected?',
    a: 'Yes. Your documents move through a secure portal, not email attachments, and we only ever ask for what the dispute process actually requires. We will never ask you for a "credit privacy number" or a new credit identity — those are federal fraud, and anyone offering you one should be reported.',
  },
  {
    id: 'affiliation',
    q: 'Are you affiliated with the credit bureaus or collection agencies?',
    a: 'No. Quantum Credit is independent of Equifax, Experian, TransUnion, and every creditor and collection agency. We work only for you.',
  },
  {
    id: 'debt',
    q: 'Can you help with debt I actually owe?',
    a: 'Not directly — this programme is not a remedy for legitimate debt. What we can do is clean up what is inaccurate around it, build positive history, and then honestly assess what you would be approved for.',
  },
  {
    id: 'diy',
    q: 'Could I just do this myself?',
    a: 'Yes, and for free. You have the right to dispute inaccurate information yourself by contacting the bureaus directly, and you never need to hire anyone. Clients hire us for the drafting, the documentation, the escalation and the follow-through across three bureaus, every cycle, without dropping it.',
  },
  {
    id: 'consult',
    q: 'What actually happens in the free consultation?',
    a: 'We pull and read all three reports with you, count what is actually there, tell you which band you fall into and what the realistic path looks like. If we are not the right fit we will say so. There is no charge and no obligation, and you are not billed anything to book it.',
  },
];
