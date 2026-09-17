/**
 * Organisation identity, contact details and link maps.
 *
 * Single source of truth for anything the client might change without a code
 * review. Values marked `placeholder: true` are stand-ins agreed with the
 * client and MUST be confirmed before launch — see README → Before launch.
 */

export const SITE = {
  name: 'Quantum Credit',
  shortName: 'Quantum Credit',
  /** PLACEHOLDER — the registered entity name for the footer identity block. */
  legalName: 'Quantum Credit LLC',
  domain: 'quantumcredit.io',
  url: 'https://quantumcredit.io',
  /** Supplied by the client; same line as the Currency Connector deck. */
  phone: { display: '(917) 410-0849', e164: '+19174100849', placeholder: false },
  /** PLACEHOLDER — the deck uses saavi@currencyconnector.com; new brand needs its own inbox. */
  email: { display: 'hello@quantumcredit.io', placeholder: true },
  /** PLACEHOLDER — awaiting the client's booking link. */
  booking: { url: 'https://cal.com/quantumcredit/consultation', placeholder: true },
  /** PLACEHOLDER — the deck lists @currencyconnector. */
  instagram: {
    handle: '@quantumcredit',
    url: 'https://instagram.com/quantumcredit',
    placeholder: true,
  },
  /** PLACEHOLDER — state registration + surety bond, required in most states' advertising rules. */
  registration: { state: 'New York', number: '0000000', bond: '$10,000', placeholder: true },
  /** PLACEHOLDER — published hours measurably reduce friction (Credit Glory does this). */
  hours: { display: 'Mon–Fri 9am–7pm ET · Sat 10am–4pm ET', placeholder: true },
  timeZoneLabel: 'ET',
} as const;

/** The SMS deep link, pre-filled so the visitor does not have to compose anything. */
export const SMS_HREF = `sms:${SITE.phone.e164}?&body=${encodeURIComponent(
  "Hi Quantum Credit — I'd like to know what my options are.",
)}`;

export const TEL_HREF = `tel:${SITE.phone.e164}`;

/**
 * Set false once every `placeholder: true` value above has been replaced, to
 * hide the small "sample" tags that stop invented content reading as fact.
 */
export const SHOW_PLACEHOLDER_TAGS = true;

/** Section anchors, referenced by the nav and the sections so an id is never written twice. */
export const ROUTES = {
  home: '/',
  process: '#how-it-works',
  pricing: '#pricing',
  included: '#included',
  faq: '#questions',
  contact: '#contact',
  privacy: '/privacy',
  terms: '/terms',
  disclosures: '/disclosures',
} as const;

export interface NavLink {
  label: string;
  href: string;
}

/**
 * Resolve a section anchor for the page it is rendered on.
 *
 * Section links are stored bare (`#pricing`) because on the homepage that is
 * what SmoothScroll's bridge intercepts, giving Lenis scrolling and correct
 * focus movement. On any other route a bare `#pricing` looks for an element
 * that is not there and does nothing, so it has to become `/#pricing` and go
 * home first.
 *
 * Storing `/#pricing` everywhere instead would be simpler and wrong: the
 * bridge only matches `a[href^="#"]`, so the homepage would lose smooth
 * scrolling and the focus handoff on every nav click.
 */
export function sectionHref(href: string, onHome: boolean): string {
  return onHome || !href.startsWith('#') ? href : `/${href}`;
}

export const PRIMARY_NAV: readonly NavLink[] = [
  { label: 'How it works', href: ROUTES.process },
  { label: 'Pricing', href: ROUTES.pricing },
  { label: "What's included", href: ROUTES.included },
  { label: 'Questions', href: ROUTES.faq },
];

export const FOOTER_NAV: readonly { title: string; links: readonly NavLink[] }[] = [
  {
    title: 'Service',
    links: [
      { label: 'How it works', href: ROUTES.process },
      { label: 'Pricing', href: ROUTES.pricing },
      { label: "What's included", href: ROUTES.included },
      { label: 'Common questions', href: ROUTES.faq },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Book a free consultation', href: ROUTES.contact },
      { label: `Call ${SITE.phone.display}`, href: TEL_HREF },
      { label: 'Text us', href: SMS_HREF },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Your credit file rights', href: ROUTES.disclosures },
      { label: 'Privacy policy', href: ROUTES.privacy },
      { label: 'Terms of use', href: ROUTES.terms },
    ],
  },
];
