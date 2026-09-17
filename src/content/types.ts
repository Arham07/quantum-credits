/**
 * Content shapes for the homepage.
 *
 * Sections read from these types only, never from literals inline, so copy can
 * move to a CMS later by changing `content/home.ts` and nothing else.
 */

export interface Cta {
  label: string;
  href: string;
  /** Opens in a new tab — booking links and anything off-domain. */
  external?: boolean;
}

export interface Hero {
  eyebrow: string;
  title: string;
  titleAccent: string;
  lede: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  chips: readonly string[];
  gauge: { from: number; to: number; caption: string };
}

/** A numbered card — used by both "why declined" and the pillars stepper. */
export interface NumberedItem {
  id: string;
  index: string;
  title: string;
  body: string;
}

export interface ProcessFact {
  id: string;
  title: string;
  body: string;
}

export interface ChartRow {
  id: string;
  label: string;
  /** Lower and upper bound of the illustrative range, on the 0–200 axis. */
  min: number;
  max: number;
}

export interface Tier {
  id: string;
  name: string;
  price: number;
  /** Human-readable band, e.g. "51–150". */
  items: string;
  blurb: string;
  /** Exactly one tier may set this; it gets the ribbon and the stronger mesh. */
  featured?: boolean;
}

export interface ValueLine {
  id: string;
  label: string;
  value: number;
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

/** One step of the lead quiz. */
export interface QuizStep {
  id: string;
  legend: string;
  help?: string;
  kind: 'multi' | 'single';
  options: readonly { value: string; label: string }[];
}

/** Marks sample data invented for review, shown with a "sample" tag. */
export interface Placeholder {
  placeholder?: true;
}

/** One card in the "what we challenge" marquee. */
export interface ChallengedItem {
  id: string;
  title: string;
  note: string;
}
