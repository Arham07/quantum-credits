import { afterEach, describe, expect, it, vi } from 'vitest';
import { MOTION_OK, MOTION_REDUCED, motionInternals, NAV_OFFSET } from './motion';

function mockPreference(reduced: boolean): void {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches: query === MOTION_REDUCED ? reduced : !reduced,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      onchange: null,
      dispatchEvent: vi.fn(),
    })),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState(null, '', '/');
});

describe('motion queries', () => {
  it('exposes complementary media queries and a header offset', () => {
    expect(MOTION_OK).toBe('(prefers-reduced-motion: no-preference)');
    expect(MOTION_REDUCED).toBe('(prefers-reduced-motion: reduce)');
    expect(NAV_OFFSET).toBeGreaterThan(0);
  });
});

describe('reduced-motion snapshot', () => {
  it('is false when the visitor expresses no preference', () => {
    mockPreference(false);
    expect(motionInternals.getSnapshot()).toBe(false);
  });

  it('is true when the visitor asks for reduced motion', () => {
    mockPreference(true);
    expect(motionInternals.getSnapshot()).toBe(true);
  });

  it('is true when ?motion=reduce is used outside production', () => {
    mockPreference(false);
    window.history.replaceState(null, '', '/?motion=reduce');
    expect(motionInternals.hasDevReduceOverride()).toBe(true);
    expect(motionInternals.getSnapshot()).toBe(true);
  });

  it('ignores an unrelated motion query value', () => {
    mockPreference(false);
    window.history.replaceState(null, '', '/?motion=on');
    expect(motionInternals.getSnapshot()).toBe(false);
  });
});
