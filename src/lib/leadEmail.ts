import 'server-only';
import { TCPA_CONSENT } from '@/content/legal';
import type { LeadInput } from './leadSchema';
import { normalisePhone } from './leadSchema';
import { QUIZ_STEPS, TIERS, VOLUME_TO_TIER } from './offer';

/** Turns a stored option value back into the label the visitor actually read. */
function labelFor(stepId: string, value: string): string {
  const step = QUIZ_STEPS.find((s) => s.id === stepId);
  return step?.options.find((o) => o.value === value)?.label ?? value;
}

export interface ConsentArtifact {
  at: string;
  ip: string;
  userAgent: string;
  pageUrl: string;
}

/**
 * The quoted band, derived from the visitor's own answer, so the client opens
 * the email already knowing the price before they pick up the phone.
 */
export function quoteFor(volume: string | undefined) {
  if (!volume) return null;
  const tierId = VOLUME_TO_TIER[volume];
  return TIERS.find((t) => t.id === tierId) ?? null;
}

export function buildSubject(lead: LeadInput): string {
  const quote = quoteFor(lead.volume || undefined);
  const band = quote ? `${quote.name} · $${quote.price}` : 'band not stated';
  return `New lead — ${lead.firstName} (${band})`;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function buildHtml(lead: LeadInput, consent: ConsentArtifact): string {
  const quote = quoteFor(lead.volume || undefined);
  const phone = normalisePhone(lead.phone);

  const rows: [string, string][] = [
    ['Name', lead.firstName],
    ['Email', lead.email],
    ['Phone', phone],
    [
      'Quoted band',
      quote ? `${quote.name} — $${quote.price} (${quote.items} items)` : 'Not stated',
    ],
    ['Goal', lead.goal ? labelFor('goal', lead.goal) : 'Not stated'],
    ['Item count', lead.volume ? labelFor('volume', lead.volume) : 'Not stated'],
    [
      'Issues',
      lead.issues.length ? lead.issues.map((v) => labelFor('issues', v)).join(', ') : 'Not stated',
    ],
    ['Message', lead.message || '—'],
  ];

  // The consent artifact is retained because a TCPA defence lives or dies on
  // being able to reproduce exactly what the visitor was shown and when.
  return `<div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;color:#101014;line-height:1.55">
  <h2 style="margin:0 0 4px;font-size:19px">New consultation request</h2>
  <p style="margin:0 0 20px;color:#5a5f6b">Submitted ${esc(consent.at)}</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:640px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:8px 14px 8px 0;color:#5a5f6b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:8px 0;border-bottom:1px solid #d9dce5">${esc(v)}</td></tr>`,
      )
      .join('')}
  </table>
  <h3 style="margin:28px 0 6px;font-size:14px;color:#5a5f6b">Consent record — retain for at least 5 years</h3>
  <p style="margin:0 0 6px;font-size:12px;color:#5a5f6b">
    IP ${esc(consent.ip)} · ${esc(consent.userAgent)}<br>Page ${esc(consent.pageUrl)}
  </p>
  <p style="margin:0;padding:12px;background:#e9ebf2;border-radius:8px;font-size:12px;color:#5a5f6b">
    Disclosure shown and affirmatively accepted: “${esc(TCPA_CONSENT)}”
  </p>
</div>`;
}
