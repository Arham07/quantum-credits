type ClassValue = string | false | null | undefined;

/**
 * Joins class names, dropping falsy values.
 * Only complete class literals may be passed — Tailwind v4 scans source text,
 * so composed strings such as `text-${tone}` would not be generated.
 */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
