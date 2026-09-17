/**
 * WCAG 2.1 AA contrast audit for the design tokens.
 *
 * Keep the values here in step with the @theme block in src/app/globals.css.
 * Run with `npm run check:contrast` (also part of `npm run check`).
 *
 * Dark sections are checked against --color-night rather than a composite of
 * the mesh gradient: the mesh only ever lightens the base, and the gradient's
 * darkest point IS --color-night, so testing against it is the worst case.
 *
 * The accent is #0090F9, sampled from the client's logo. The neutrals are the
 * Strategic Plan deck's own: #202020 ink, #606060 muted, #E9EBF2 ground.
 *
 * Not listed below: brand-500 against `ground`, which measures 2.77:1. Its only
 * appearance there is the wordmark, and WCAG 1.4.11 exempts logotypes from
 * contrast requirements. If brand-500 is ever used for an icon or control on
 * the page ground, it must move to brand-600 and gain a row here.
 */
const T = {
  ground: '#E9EBF2',
  surface: '#FFFFFF',
  ink: '#202020',
  muted: '#606060',
  line: '#D5D5DB',
  night: '#101010',
  'night-700': '#1C1C1C',
  'card-night': '#1C1C1C',
  // White at 90% over brand-600 — the floor for secondary text on an accent
  // card. Composited here rather than trusted, because opacity over a
  // saturated fill is exactly where this silently drops below AA.
  'white-90-on-accent': '#E6F0F8',
  'white-70-on-cardnight': '#BBBBBB',
  'night-ink': '#BDBDBD',
  'brand-50': '#EAF6FF',
  'brand-100': '#CFE9FF',
  'brand-500': '#0090F9',
  'brand-600': '#006CBB',
  'brand-700': '#005AA8',
  'success-100': '#D9F2E6',
  'success-600': '#0C7954',
  'warn-500': '#B07C2E',
  'danger-500': '#D9534F',
  'danger-600': '#B8403C',
  white: '#FFFFFF',
};

const lin = (c) => {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
};
const ratio = (a, b) => {
  const [x, y] = [lum(T[a]), lum(T[b])].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// [foreground, background, purpose, minimum]
const PAIRS = [
  ['ink', 'ground', 'body and headings on the page', 4.5],
  ['ink', 'surface', 'body and headings on cards', 4.5],
  ['muted', 'ground', 'secondary text on the page', 4.5],
  ['muted', 'surface', 'secondary text on cards', 4.5],
  ['brand-600', 'ground', 'eyebrows and links', 4.5],
  ['brand-600', 'surface', 'links and eyebrows on cards', 4.5],
  ['white', 'brand-600', 'primary button label', 4.5],
  ['white', 'brand-700', 'primary button label, hover', 4.5],
  ['success-600', 'surface', 'included-list ticks', 4.5],
  ['success-600', 'success-100', 'success state on its own tint', 4.5],
  ['danger-600', 'surface', 'form field errors', 4.5],
  ['danger-600', 'ground', 'form errors on the page ground', 4.5],
  ['white', 'night', 'headings on dark sections', 4.5],
  ['white', 'night-700', 'headings on the featured tier', 4.5],
  ['night-ink', 'night', 'body copy on dark sections', 4.5],
  ['night-ink', 'night-700', 'body copy on the featured tier', 4.5],
  ['brand-100', 'night', 'eyebrows on dark sections', 4.5],
  // Non-text: icons, rules, focus rings and chart bars only need 3:1.
  ['brand-500', 'night', 'accent fills and chart bars on dark (non-text)', 3],
  ['brand-500', 'surface', 'accent fills and icons on light (non-text)', 3],
  ['white', 'brand-600', 'ribbon label on the featured tier', 4.5],
  ['brand-500', 'night-700', 'total-value figure on the featured tier', 4.5],
  ['ink', 'brand-50', 'callout text on its own tint', 4.5],
  ['brand-600', 'ground', 'focus ring on the page ground (non-text)', 3],
  ['brand-100', 'night-700', 'eyebrows on the featured tier', 4.5],
  ['warn-500', 'surface', 'placeholder tag border (non-text)', 3],
  ['line', 'surface', 'card borders (non-text)', 1.2],

  // --- Card surfaces. Every card on the page is one of these three tones. ---
  ['ink', 'surface', 'white card: heading and body', 4.5],
  ['muted', 'surface', 'white card: secondary copy', 4.5],
  ['brand-600', 'surface', 'white card: eyebrow and link', 4.5],
  ['white', 'card-night', 'near-black card: heading', 4.5],
  ['night-ink', 'card-night', 'near-black card: body copy', 4.5],
  ['white-70-on-cardnight', 'card-night', 'near-black card: eyebrow at 70% opacity', 4.5],
  ['brand-100', 'card-night', 'near-black card: accent eyebrow', 4.5],
  // The accent card is the one genuinely new surface, and the one that fails
  // if built naively: white on the raw logo blue (#0090F9) is 3.3:1. It uses
  // brand-600 instead, and its secondary text stops at 90% white — 85% is
  // already 4.38 and fails.
  ['white', 'brand-600', 'accent card: heading', 4.5],
  ['white-90-on-accent', 'brand-600', 'accent card: secondary copy at 90% opacity', 4.5],
];

let fails = 0;
console.log('pair'.padEnd(36), 'ratio'.padStart(7), '  min   result   purpose');
for (const [fg, bg, purpose, min] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) fails++;
  console.log(
    `${fg} on ${bg}`.padEnd(36),
    r.toFixed(2).padStart(7),
    ` ${min.toFixed(1)}  ${ok ? 'PASS' : 'FAIL'}     ${purpose}`,
  );
}
console.log(
  fails === 0 ? '\nAll pairs meet their WCAG 2.1 AA minimum.' : `\n${fails} pair(s) FAILED.`,
);
process.exit(fails === 0 ? 0 : 1);
