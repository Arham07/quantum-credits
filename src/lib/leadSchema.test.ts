import { describe, expect, it } from 'vitest';
import { leadSchema, normalisePhone } from './leadSchema';

const valid = {
  firstName: 'Dana',
  email: 'dana@example.com',
  phone: '(917) 555-0134',
  issues: ['collections'],
  goal: 'home',
  volume: '51-150',
  message: '',
  consent: 'on',
  website: '',
};

describe('leadSchema', () => {
  it('accepts a complete submission', () => {
    expect(leadSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts a submission that skipped every quiz step', () => {
    const result = leadSchema.safeParse({ ...valid, issues: [], goal: '', volume: '' });
    expect(result.success).toBe(true);
  });

  it.each([
    ['firstName', ''],
    ['email', 'not-an-email'],
    ['phone', '555-014'],
  ])('rejects a bad %s', (field, value) => {
    const result = leadSchema.safeParse({ ...valid, [field]: value });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((i) => i.path[0] === field)).toBe(true);
  });

  it('requires TCPA consent — an unchecked box must not pass', () => {
    const result = leadSchema.safeParse({ ...valid, consent: '' });
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((i) => i.path[0] === 'consent')).toBe(true);
  });

  it('rejects an unknown quiz option, so the select cannot be tampered with', () => {
    expect(leadSchema.safeParse({ ...valid, volume: 'free-please' }).success).toBe(false);
  });

  it('accepts numbers written however people actually write them', () => {
    for (const phone of ['9175550134', '917 555 0134', '+1 (917) 555-0134', '917.555.0134']) {
      expect(leadSchema.safeParse({ ...valid, phone }).success).toBe(true);
    }
  });

  it('lets a filled honeypot through validation for the action to drop silently', () => {
    // It must PASS here: a validation error would give a bot a signal to adapt
    // to. submitLead() is what discards it, reporting success either way.
    const result = leadSchema.safeParse({ ...valid, website: 'http://spam' });
    expect(result.success).toBe(true);
    expect(result.data?.website).toBe('http://spam');
  });
});

describe('normalisePhone', () => {
  it('reduces any formatting to ten digits', () => {
    expect(normalisePhone('(917) 555-0134')).toBe('9175550134');
    expect(normalisePhone('+1 917 555 0134')).toBe('9175550134');
  });
});
