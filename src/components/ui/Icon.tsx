/**
 * Inline icons.
 *
 * Hand-rolled rather than an icon package: the page needs eight glyphs, and a
 * dependency would ship a tree-shaking surface and a version to maintain for
 * less markup than this file. All are 24×24, 1.6 stroke, and inherit colour.
 *
 * Every one is decorative and always sits beside its own label, so each carries
 * an explicit aria-hidden. It is repeated per-element rather than folded into
 * `base` because a11y linting cannot see attributes through a spread — and an
 * icon that silently loses aria-hidden is exactly the bug worth catching.
 */
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  focusable: false,
};

export function PhoneIcon() {
  return (
    <svg {...base} aria-hidden="true">
      <path d="M6.6 3.5h-2A1.6 1.6 0 0 0 3 5.2C3 13.4 10.6 21 18.8 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.2 1.2 0 0 0-.9-1.2l-3-.8a1.2 1.2 0 0 0-1.2.4l-1 1.2a13.6 13.6 0 0 1-5.4-5.4l1.2-1a1.2 1.2 0 0 0 .4-1.2l-.8-3a1.2 1.2 0 0 0-1.2-.9Z" />
    </svg>
  );
}

export function MessageIcon() {
  return (
    <svg {...base} aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.6 9.6 0 0 1-2.9-.5L3 21l1.6-4.8A8.1 8.1 0 0 1 3.6 11.5a8.4 8.4 0 0 1 9-8.4 8.4 8.4 0 0 1 8.4 8.4Z" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg {...base} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...base} strokeWidth={2} aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function CrossIcon() {
  return (
    <svg {...base} strokeWidth={2} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg {...base} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg {...base} aria-hidden="true">
      <path d="M12 3 4.5 6v6c0 4.4 3.1 8.3 7.5 9.4 4.4-1.1 7.5-5 7.5-9.4V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg {...base} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
