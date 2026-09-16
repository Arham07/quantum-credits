import { describe, expect, it } from 'vitest';
import { cx } from './cx';

describe('cx', () => {
  it('joins truthy class names with a single space', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  it('drops falsy values so conditional classes stay readable', () => {
    expect(cx('a', false, null, undefined, 'b')).toBe('a b');
  });

  it('returns an empty string when nothing applies', () => {
    expect(cx(false, null, undefined)).toBe('');
  });
});
