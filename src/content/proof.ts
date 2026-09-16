import type { Placeholder } from './types';

/**
 * Social proof.
 *
 * SHIPS EMPTY ON PURPOSE. The section renders nothing while `enabled` is false.
 *
 * Do not populate this with invented numbers or anonymous quotes:
 *  - Anonymous testimonials measurably REDUCE trust in financial services.
 *  - Since the FTC's 2023 Endorsement Guides revision there is no longer a
 *    "results not typical" safe harbour. A featured testimonial now requires
 *    disclosing the results a consumer can GENERALLY expect, which means real
 *    aggregate data you actually hold.
 *  - Every statistic needs a footnote stating sample size and as-of date.
 *
 * To turn the section on: set `enabled: true`, add entries, and fill
 * `expectedResults` with a documented figure.
 */

export interface Testimonial extends Placeholder {
  id: string;
  quote: string;
  /** First name + last initial + city. Never anonymous. */
  attribution: string;
  /** Optional headshot the client has written permission to publish. */
  avatar?: string;
}

export interface ProofStat extends Placeholder {
  id: string;
  value: string;
  label: string;
  /** Sample size and as-of date. Required — see the note above. */
  footnote: string;
}

export const PROOF: {
  enabled: boolean;
  stats: readonly ProofStat[];
  testimonials: readonly Testimonial[];
  expectedResults: string;
} = {
  enabled: false,
  stats: [],
  testimonials: [],
  expectedResults: '',
};
