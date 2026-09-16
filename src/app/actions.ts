'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { buildHtml, buildSubject } from '@/lib/leadEmail';
import { type LeadResult, leadSchema } from '@/lib/leadSchema';
import { SITE } from '@/lib/site';

/**
 * In-process rate limit.
 *
 * Deliberately modest: it stops a single client hammering the endpoint and
 * burning the Resend quota. It is per-instance, so it is a speed bump rather
 * than a real defence — put a proper limiter at the edge before launch if the
 * page ever attracts targeted abuse.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function submitLead(
  _prev: LeadResult | null,
  formData: FormData,
): Promise<LeadResult> {
  const parsed = leadSchema.safeParse({
    firstName: formData.get('firstName') ?? '',
    email: formData.get('email') ?? '',
    phone: formData.get('phone') ?? '',
    issues: formData.getAll('issues').map(String),
    goal: formData.get('goal') ?? '',
    volume: formData.get('volume') ?? '',
    message: formData.get('message') ?? '',
    consent: formData.get('consent') ?? '',
    website: formData.get('website') ?? '',
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? 'form');
      if (!errors[field]) errors[field] = issue.message;
    }
    return { ok: false, errors };
  }

  const lead = parsed.data;

  // Honeypot: a real visitor never sees this field, so anything in it is a bot.
  // Report success so the bot has no signal to adapt to.
  if (lead.website) return { ok: true };

  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headerList.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return { ok: false, message: 'That is a few too many submissions. Please try again shortly.' };
  }

  const consent = {
    at: new Date().toISOString(),
    ip,
    userAgent: headerList.get('user-agent') ?? 'unknown',
    pageUrl: headerList.get('referer') ?? SITE.url,
  };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_INBOX ?? SITE.email.display;
  const from = process.env.LEAD_FROM ?? `Quantum Credit <onboarding@resend.dev>`;

  if (!apiKey) {
    // Not configured yet. Log the lead so nothing is silently lost in
    // development, and tell the visitor the truth rather than a fake success.
    console.warn('[lead] RESEND_API_KEY is not set — lead not delivered:', {
      ...lead,
      consent,
    });
    return {
      ok: false,
      message: `Our form isn’t connected yet. Please call or text ${SITE.phone.display} and we’ll pick it up straight away.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: buildSubject(lead),
      html: buildHtml(lead, consent),
    });

    if (error) throw new Error(error.message);
  } catch (cause) {
    console.error('[lead] delivery failed', cause);
    return {
      ok: false,
      message: `We couldn’t send that just now. Please call or text ${SITE.phone.display} — we don’t want to lose you over a form.`,
    };
  }

  return { ok: true };
}
