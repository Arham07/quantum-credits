import { describe, expect, it } from 'vitest';
import { buildHtml, buildSubject, quoteFor } from './leadEmail';
import type { LeadInput } from './leadSchema';

const lead: LeadInput = {
  firstName: 'Dana',
  email: 'dana@example.com',
  phone: '(917) 555-0134',
  issues: ['collections', 'late'],
  goal: 'home',
  volume: '151-250',
  message: '',
  consent: 'on',
  website: '',
};

const consent = {
  at: '2026-09-16T12:00:00.000Z',
  ip: '203.0.113.9',
  userAgent: 'Mozilla/5.0',
  pageUrl: 'https://quantumcredit.io/',
};

describe('quoteFor', () => {
  it('maps a quiz band to its tier', () => {
    expect(quoteFor('151-250')?.price).toBe(600);
    expect(quoteFor('351+')?.price).toBe(1000);
  });

  it('returns null when the visitor skipped the question', () => {
    expect(quoteFor(undefined)).toBeNull();
    expect(quoteFor('unsure')).toBeNull();
  });
});

describe('buildSubject', () => {
  it('puts the quote in the subject so the client sees it in the list view', () => {
    expect(buildSubject(lead)).toBe('New lead — Dana (Package 3 · $600)');
  });

  it('says so plainly when no band was given', () => {
    expect(buildSubject({ ...lead, volume: '' })).toContain('band not stated');
  });
});

describe('buildHtml', () => {
  it('renders the answers as their human labels, not their stored values', () => {
    const html = buildHtml(lead, consent);
    expect(html).toContain('Collections, Late payments');
    expect(html).toContain('Buy a home');
    expect(html).toContain('9175550134');
  });

  it('retains the consent artifact a TCPA defence depends on', () => {
    const html = buildHtml(lead, consent);
    expect(html).toContain('203.0.113.9');
    expect(html).toContain('consent is not required as a condition');
  });

  it('escapes user input so a lead cannot inject markup into the inbox', () => {
    const html = buildHtml({ ...lead, firstName: '<img src=x onerror=alert(1)>' }, consent);
    expect(html).not.toContain('<img src=x');
    expect(html).toContain('&lt;img src=x');
  });
});
