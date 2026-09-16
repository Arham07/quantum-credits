# Quantum Credit

One-page site for a US credit-repair service. Its only job is to produce a
qualified lead: call, text, or a booked consultation.

```bash
npm install --legacy-peer-deps   # see "Install" below
cp .env.example .env.local
npm run dev
```

`npm run check` runs everything: Biome, `tsc --noEmit`, Vitest, and a WCAG
contrast audit of the design tokens.

## Install

`--legacy-peer-deps` is required. npm 10.9.8 crashes with
`Cannot read properties of null (reading 'edgesOut')` while resolving Vitest's
`jsdom` → optional `canvas` peer. The flag is a workaround for that npm bug, not
a sign of a real dependency conflict; drop it once npm fixes it.

## Compliance — read before editing copy

A credit repair organisation is regulated by **CROA** (15 U.S.C. §1679), the
FTC's **Telemarketing Sales Rule** (16 CFR §310.4) and the **TCPA**
(47 CFR §64.1200). Two rules drive the whole voice of this site:

1. **§1679b(a)(3)** forbids "untrue or misleading representation of the
   services." We describe a **process** — challenging items — never an
   **outcome**. The bureaus decide outcomes, not us.
2. **§310.4(a)(2)** is stricter still and applies the moment a sale is closed by
   phone. If the business *represents that it will remove derogatory information
   or improve credit*, it cannot collect anything until six months after
   documented results. This is the theory behind the $2.7B CFPB judgment against
   Progrexion/Lexington Law, who claimed only "50% in 6 months".

So, when writing copy:

| Never | Instead |
|---|---|
| remove, delete, erase | challenge, dispute, work |
| "70–100% of items removed" | "every item that's legally challengeable, every cycle" |
| "in 3–6 months" | "a dispute cycle runs 30–45 days" |
| guaranteed, 100%, permanent | (nothing — don't) |

The client's Strategic Plan deck says *"remove 70–100% of all negative items
within 3–6 months."* That claim is **deliberately not on this site.**

Every disclaimer lives in `src/content/legal.ts` and is rendered **adjacent to
the claim it qualifies**, never only in the footer — "clear and conspicuous" is
a legal standard that 9px grey text does not meet.

Before shipping a copy change, run the audit in step 7 of Verification below.

### Two things still to raise with the client

1. **Advance payment.** §1679b(b): no charging "before such service is fully
   performed." The brief's "initial cost can be split into 2 payments" implies
   collecting up front. Sky Blue Credit's workaround is to bill on day 6, after
   a first cycle of work. Worth a consumer-finance attorney's eye. The site
   itself takes no payment, so this does not block launch.
2. **The points chart** (`CHART_ROWS`) is the deck's own "30–150 points per
   item" figure. It ships labelled illustrative and non-predictive. If the
   client cannot substantiate it from their own client files, delete it.

## Architecture

```
src/
  app/          layout, page, the lead Server Action
  content/      copy — home.ts (prose), legal.ts (disclaimers), proof.ts
  lib/          leaf modules: site identity, offer/pricing, schema, gsap, motion
  components/
    layout/     header, footer, mobile action bar
    sections/   the nine page sections — pure, content arrives as props
    motion/     GSAP wrappers and the three signature animations
    interactive/the lead quiz
    ui/         button, container, section, headings, icons
```

Biome enforces the layering (see `biome.json` overrides):

- **sections** and **ui** are pure: no GSAP, no Lenis, no `content/home`. Content
  arrives as props from `app/page.tsx`. `content/legal` is the deliberate
  exception — a disclaimer must not be droppable by forgetting a prop.
- **motion** and **interactive** take props only; they never import content.
- **lib** are leaves: no components, no app code.

`lib/offer.ts` holds prices and quiz option values rather than `content/` because
it is the data the Zod schema validates against and the mapping that turns a quiz
answer into a quote — consumers span lib, components and app.

### Policy pages

`/privacy`, `/terms` and `/disclosures` share one renderer
(`components/layout/LegalShell` → `LegalPage`) and are authored as typed blocks
in `content/{privacy,terms,disclosures}.ts`, so adding a clause never means
touching JSX. Three things in those files are deliberate and matter:

- **`/disclosures` reproduces the CROA §1679c(a) statement verbatim** from the
  US Code. It is federal statutory text — do not paraphrase or shorten it. And
  publishing it does **not** satisfy the statute: §1679c(b) requires it be given
  as a document separate from the contract, before signing, with the consumer's
  signed acknowledgment kept for two years (§1679c(c)).
- **Terms carries no arbitration clause or class action waiver, on purpose.**
  CROA §1679f voids any consumer waiver of rights under the Act, courts have
  declined to enforce arbitration clauses in credit repair contracts, and
  §1679g gives an express private right of action with fee shifting. A clause
  that appears to strip those rights is unenforceable *and* reads as bad faith.
  Do not add one without counsel.
- **The website terms are not the service agreement.** The CROA contract is a
  separate signed document under §1679d with its own mandated content and a
  detachable Notice of Cancellation. Nothing on the site may stand in for it.

### Design tokens

All colour, type, spacing and radius live in the `@theme` block in
`src/app/globals.css`. Components never contain raw colour values. After
changing a colour, update `scripts/check-contrast.mjs` to match and run
`npm run check:contrast` — all 26 pairs must meet WCAG AA.

**The accent is the logo's own blue, `#0090F9`**, sampled from the animation the
client supplied — the page takes its colour from the mark, not the other way
round. The neutrals are the Strategic Plan deck's, decoded from the PDF:
`#202020` ink, `#606060` muted, `#E9EBF2` ground, plus black and white.

The deck's `#8C52FF` purple is deliberately **not** used. One accent reads
cleaner, and a second hue fought the logo.

Two traps the audit exists to catch:

- `brand-500` is the logo blue **verbatim**, and it measures 3.30:1 on white.
  It is for fills, icons, rules, the wordmark and the wash — never body text.
  Use `brand-600` (`#006CBB`, 5.44:1) for text and for any fill carrying a
  label, and `brand-100` (`#CFE9FF`) for text on dark.
- `brand-500` on `ground` is only 2.77:1, so it has no row in the audit. Its
  one appearance there is the wordmark, and WCAG 1.4.11 exempts logotypes. If
  it is ever used for an icon or control on the page ground, move it to
  `brand-600` and add a row.

The dark-section wash is the `.mesh` utility: **two** radial-gradient stops, one
hue, at 0.13 and 0.07 alpha over `--color-night`. Deliberately minimal — enough
that a full-bleed black section does not read as a flat slab, not enough to
notice as an effect. It was four overlapping stops at 0.3 alpha and read as
decoration. `.mesh-strong` is a single stop at 0.2, for the featured pricing
tier only.

**Type scale.** Every size is a `clamp()` token, so the phone end and the
desktop end are tuned independently and there are no per-breakpoint font
overrides in components. The mobile end was set by measuring the two reference
sites at 375px: cantor8.io runs h1 31.5px / body 13.9px, mastercard.com h1 38px
/ body 15px. We land at h1 32px / body 15px — body does not follow cantor8 down
to 13.9px because this audience skews older and is reading about money.

Components use the `text-body` / `text-meta` / `text-lede` / `text-fine` tokens
rather than literal `text-[17px]`-style values. Add a size to the `@theme` block
instead of hard-coding one, or the phone layout silently stops scaling with the
rest of the page.

**Typeface.** One family across headings and body — **Figtree**, self-hosted by
`next/font`. mastercard.com/businessoutcomes runs a single face the same way;
theirs is *Mark Offc for MC*, Mastercard's proprietary cut of HVD's Mark and
licensed to them alone, so we can neither use it nor serve their `.ttf` files.
Figtree is the closest open-licensed match: same geometric skeleton, similarly
tall x-height, single-storey `g`, flat-sided round letterforms, with the slight
humanist warmth Mark has over a pure geometric. If the client ever licenses Mark
itself, swap `src/app/fonts.ts` for a `localFont()` call — nothing else in the
app names a family. (The Lovable reference declares Inter and **never loads
it**; don't copy that bug.)

### Motion

One entry point (`lib/gsap.ts`), one reduced-motion source of truth
(`lib/motion.ts`). Every motion component checks `isMotionAllowed()` before it
animates **and** makes sure its content is visible when it does not — the
`.will-reveal` class holds elements at `opacity: 0`, so a component that returns
early without clearing it hides that content forever. There is also a `<noscript>`
rule in `layout.tsx` for the no-JS case.

`PillarStepper` runs on phones too, matching Mastercard: at 375px their section
is still 400vh with the same sticky drum, scaled down and stacked
(label → counter → pill → copy). Ours costs 85vh per step on a phone rather than
100vh — identical effect, advances a little sooner, and keeps about a screen of
length off the page.

It changes **layout**, not just animation, under reduced motion: the scroll
height, the pinning and the drum all drop, so nobody scrolls four blank screens.
That is an accessibility floor, not a viewport question.

This Next.js version has breaking changes versus most training data — read
`node_modules/next/dist/docs/` before writing framework code (see `AGENTS.md`).

## Verification

1. `npm run check`
2. `npm run dev`, then walk the page at 1440 / 768 / 375px
3. `/?motion=reduce` — page fully readable and static, no pinning, no dead scroll
4. Length check at 375px — the page should stay near 15 screens
   (`document.documentElement.scrollHeight / innerHeight`). It was 20 before the
   type scale was tuned, which is what made the phone layout feel endless.
5. Keyboard: skip link → header → all four quiz steps → submit, visible focus ring
6. Form: submit invalid (inline errors, typed values retained), then valid
7. `npm run build`
8. **Copy audit:** grep the page for `remove`, `guarantee`, `%` and `month` and
   confirm every hit is process language or carries an adjacent disclaimer

## Before launch

Everything marked `placeholder: true` in `src/lib/site.ts` renders with a small
"sample" tag. Replace them all, then set `SHOW_PLACEHOLDER_TAGS = false`.

- [ ] `RESEND_API_KEY`, `LEAD_INBOX`, `LEAD_FROM` (from a verified Resend domain)
- [ ] Real booking URL (Cal.com / Calendly)
- [ ] Final `@quantumcredit.io` inbox — the deck uses `saavi@currencyconnector.com`
- [ ] Legal entity name, state registration number and surety bond for the footer
- [ ] Published support hours and real social handles
- [ ] Logo as SVG or Lottie. `components/layout/Wordmark.tsx` is a rebuild from
      the supplied `.mp4`, which cannot be a header logo — it can't be
      recoloured, it can't scale crisply, and it costs a video decode above the
      fold.
- [ ] **Attorney review of `/privacy`, `/terms` and `/disclosures`.** All three
      are built and linked, but they are a researched first draft. A banner says
      so on every one — flip `LEGAL_IS_DRAFT` in `src/content/legalMeta.ts` once
      counsel signs off, and bump `LEGAL_UPDATED` whenever the text changes.
      Still outstanding inside them: the governing state in Terms §11, and a
      postal address in Privacy §12.
- [ ] Real testimonials before `content/proof.ts` is enabled: first name + last
      initial + city + photo + written permission, plus a documented
      generally-expected-results figure (the FTC's "results not typical" safe
      harbour is gone since 2023)
- [ ] A proper edge rate limiter if the form attracts abuse — the in-process one
      in `app/actions.ts` is per-instance and only a speed bump
