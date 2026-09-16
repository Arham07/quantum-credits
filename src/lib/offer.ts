import type { QuizStep, Tier } from '@/content/types';

/**
 * The commercial domain model: what we sell, at what price, and the exact
 * option values the lead form will accept.
 *
 * This lives in lib/ rather than content/ on purpose. It is not marketing copy
 * — it is the data the Zod schema validates against, the mapping that turns a
 * quiz answer into a quote, and the prices that must agree between the pricing
 * grid and the lead email. Those consumers span lib/, components/ and app/, so
 * a single leaf module is the only place all three can share it without the
 * content layer leaking into validation.
 *
 * Supplied by the client directly. These supersede the $197 + $97/mo figures in
 * the Strategic Plan deck, which belong to the prior brand.
 */

export const TIERS: readonly Tier[] = [
  {
    id: 'p1',
    name: 'Package 1',
    price: 200,
    items: '0–50',
    blurb: 'A clean-ish file with a handful of things dragging it down.',
  },
  {
    id: 'p2',
    name: 'Package 2',
    price: 400,
    items: '51–150',
    blurb: 'Where most files land once all three reports are pulled.',
    featured: true,
  },
  {
    id: 'p3',
    name: 'Package 3',
    price: 600,
    items: '151–250',
    blurb: 'Years of accumulation across multiple furnishers.',
  },
  {
    id: 'p4',
    name: 'Package 4',
    price: 800,
    items: '251–350',
    blurb: 'A heavy file — usually collections stacked on collections.',
  },
  {
    id: 'p5',
    name: 'Package 5',
    price: 1000,
    items: '351+',
    blurb: 'The most complex files we take. Nothing is out of scope.',
  },
];

export const MONTHLY_FEE = 80;

/**
 * The quiz. PII is step 4 by design: three zero-commitment steps first roughly
 * triples completion against asking a stranger for their phone number cold.
 *
 * Legends live here with their options rather than in content/ because a step's
 * question and its answers are one unit — splitting them across two files makes
 * it far too easy to reword a question and leave the options behind.
 */
export const QUIZ_STEPS: readonly QuizStep[] = [
  {
    id: 'issues',
    legend: 'What’s hurting your credit?',
    help: 'Pick everything that applies — or “I’m not sure”, which is a completely normal answer.',
    kind: 'multi',
    options: [
      { value: 'collections', label: 'Collections' },
      { value: 'late', label: 'Late payments' },
      { value: 'chargeoffs', label: 'Charge-offs' },
      { value: 'repossession', label: 'Repossession' },
      { value: 'bankruptcy', label: 'Bankruptcy' },
      { value: 'inquiries', label: 'Hard inquiries' },
      { value: 'identity', label: 'Identity theft' },
      { value: 'unsure', label: 'I’m not sure' },
    ],
  },
  {
    id: 'goal',
    legend: 'What are you trying to get approved for?',
    kind: 'single',
    options: [
      { value: 'home', label: 'Buy a home' },
      { value: 'auto', label: 'Get approved for a car' },
      { value: 'rates', label: 'Lower my rates' },
      { value: 'business', label: 'Start or fund a business' },
      { value: 'cleanup', label: 'Just clean it up' },
    ],
  },
  {
    id: 'volume',
    legend: 'Roughly how many negative items are on your reports?',
    help: 'A rough guess is fine — we count them properly on the call. This is what sets your price band.',
    kind: 'single',
    options: [
      { value: 'unsure', label: 'Not sure' },
      { value: '0-50', label: '0–50' },
      { value: '51-150', label: '51–150' },
      { value: '151-250', label: '151–250' },
      { value: '251-350', label: '251–350' },
      { value: '351+', label: '351 or more' },
    ],
  },
];

/** Maps a quiz volume answer to a tier id, so the lead email carries the quote. */
export const VOLUME_TO_TIER: Record<string, string> = {
  '0-50': 'p1',
  '51-150': 'p2',
  '151-250': 'p3',
  '251-350': 'p4',
  '351+': 'p5',
};
