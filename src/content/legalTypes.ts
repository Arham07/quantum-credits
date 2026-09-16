/** A block inside a legal section. Kept small so the renderer stays dumb. */
export type LegalBlock =
  | { p: string }
  | { h3: string }
  | { list: readonly string[] }
  | { note: string }
  /** Verbatim statutory or contractual text, set apart from our own prose. */
  | { quote: readonly string[] };

export interface LegalSection {
  id: string;
  heading: string;
  blocks: readonly LegalBlock[];
}

export interface LegalDoc {
  /** Used for <title> and the page heading. */
  title: string;
  /** One line under the heading. */
  summary: string;
  updated: string;
  /** Rendered in a callout above the contents. Omit where nothing is needed. */
  callout?: string;
  sections: readonly LegalSection[];
}
