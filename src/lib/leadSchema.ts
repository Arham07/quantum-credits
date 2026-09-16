import { z } from 'zod';
import { QUIZ_STEPS } from './offer';

const values = (id: string) =>
  QUIZ_STEPS.find((s) => s.id === id)?.options.map((o) => o.value) ?? [];

const ISSUES = values('issues');
const GOALS = values('goal');
const VOLUMES = values('volume');

/**
 * The lead payload.
 *
 * Validated on the server, never only in the browser — a client-side check is
 * a convenience for the visitor, not a security boundary.
 *
 * The three quiz answers are optional by design: a visitor who scrolls straight
 * to step 4 and gives us a phone number is still a lead worth having, and
 * blocking them to collect segmentation data would trade revenue for tidiness.
 */
export const leadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'Please tell us your first name.')
    .max(80, 'That name is longer than we can store.'),
  email: z
    .string()
    .trim()
    .min(1, 'We need an email to send your summary to.')
    .max(254)
    .pipe(z.email('That email address does not look right.')),
  phone: z
    .string()
    .trim()
    .min(1, 'We need a number to call or text you on.')
    // Deliberately loose: people write numbers a dozen ways, and rejecting a
    // real customer over punctuation costs more than normalising on our side.
    .refine((v) => (v.match(/\d/g) ?? []).length >= 10, 'Please enter a full 10-digit number.')
    .refine((v) => (v.match(/\d/g) ?? []).length <= 15, 'That number has too many digits.'),
  issues: z.array(z.enum(ISSUES as [string, ...string[]])).default([]),
  goal: z
    .enum(GOALS as [string, ...string[]])
    .optional()
    .or(z.literal('')),
  volume: z
    .enum(VOLUMES as [string, ...string[]])
    .optional()
    .or(z.literal('')),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  /** TCPA prior express written consent — 47 CFR §64.1200(f)(9). Must be affirmative. */
  consent: z.literal('on', { message: 'We need your consent before we can call or text you.' }),
  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   *
   * It deliberately PASSES validation. Rejecting it here would hand the bot a
   * distinguishable error to adapt to, and would surface a nonsensical
   * validation message to the rare human whose autofill filled a hidden input.
   * The action drops a filled honeypot silently and reports success instead.
   */
  website: z.string().max(200).optional().or(z.literal('')),
});

export type LeadInput = z.infer<typeof leadSchema>;

export interface LeadResult {
  ok: boolean;
  /** Field name → first error message. */
  errors?: Record<string, string>;
  message?: string;
}

/** Digits only, so the client's phone can dial it without cleanup. */
export function normalisePhone(raw: string): string {
  const digits = (raw.match(/\d/g) ?? []).join('');
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
}
