import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Card, mutedTextClass } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { CheckIcon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NO_ADVANCE_PAYMENT } from '@/content/legal';
import type { Tier, ValueLine } from '@/content/types';
import { ROUTES } from '@/lib/site';

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

/**
 * Pricing.
 *
 * Open pricing is itself a differentiator: four of the seven US competitors
 * studied hide theirs and sell the consult instead. Showing it filters
 * tyre-kickers and raises lead quality, which is what the client actually wants.
 *
 * The recurring fee and the inclusions are printed ONCE beneath the grid rather
 * than repeated in all five cards — they are identical across tiers, and five
 * copies of the same list is noise the reader has to diff.
 */
export function Pricing({
  tiers: TIERS,
  monthlyFee: MONTHLY_FEE,
  includes: PRICING_INCLUDES,
  valueStack: VALUE_STACK,
}: {
  tiers: readonly Tier[];
  monthlyFee: number;
  includes: readonly string[];
  valueStack: readonly ValueLine[];
}) {
  const valueTotal = VALUE_STACK.reduce((sum, line) => sum + line.value, 0);
  return (
    <Section id="pricing" tone="ground">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Priced on what’s actually in your file."
            lede="We pull all three reports, count what is there, and you land in one of five bands. No quote before the count — that would just be a guess with a number on it."
            align="center"
            className="mx-auto items-center text-center"
          />
        </Reveal>

        {/* Below `sm` this is a swipe row, not a stack: five tiers stacked
            vertically was ~900px of scrolling to compare five numbers. Cards sit
            at 78% width so the next one peeks in — that sliver is the
            affordance, so no "swipe" label is needed. */}
        <Reveal
          stagger
          className="qc-swipe -mx-5 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 pt-3 sm:mx-0 sm:mt-12 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pt-0 lg:mt-14 lg:grid-cols-3 xl:grid-cols-5"
        >
          {TIERS.map((tier) => {
            const tone = tier.featured ? 'accent' : 'surface';
            return (
              <Card
                as="article"
                key={tier.id}
                tone={tone}
                className="flex w-[78%] shrink-0 snap-start flex-col p-6 sm:w-auto sm:p-7"
              >
                {tier.featured ? (
                  // On the accent fill the ribbon has to invert — a brand-600
                  // pill on a brand-600 card would be invisible.
                  <p className="absolute -top-3 left-7 rounded-full bg-ink px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
                    Most common
                  </p>
                ) : null}

                <p
                  className={`text-eyebrow font-medium uppercase ${
                    tier.featured ? 'text-white/90' : 'text-brand-600'
                  }`}
                >
                  {tier.name}
                </p>
                <p className="mt-3 font-display text-[2.25rem] font-semibold leading-none tabular-nums sm:mt-4 sm:text-[2.5rem]">
                  {usd(tier.price)}
                </p>
                <p className="mt-4 text-meta font-medium">{tier.items} negative items</p>
                <p className={`mt-2 text-meta ${mutedTextClass(tone)}`}>{tier.blurb}</p>
              </Card>
            );
          })}
        </Reveal>

        <Card
          as={Reveal}
          tone="night"
          className="mt-8 grid gap-7 lg:mt-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14"
        >
          <div>
            <p className="font-display text-xl font-semibold sm:text-2xl">
              Then {usd(MONTHLY_FEE)} per month, per round
            </p>
            <p className="mt-2 text-meta text-night-ink">
              For as long as there is something left to challenge. Every band gets all of this:
            </p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {PRICING_INCLUDES.map((line) => (
                <li key={line} className="flex gap-3 text-meta text-night-ink">
                  <span className="mt-0.5 shrink-0 text-brand-500">
                    <CheckIcon />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-64">
            <Button href={ROUTES.contact} className="w-full">
              Find out which band you’re in
            </Button>
            <p className="mt-3 text-center text-[0.8125rem] text-night-ink">
              Free, and we count them with you.
            </p>
          </div>
        </Card>

        {/* The deck's value stack, used as the anchor. */}
        <Card as={Reveal} tone="surface" className="mt-4 sm:mt-6">
          <h3 className="text-display-md">What’s in the programme</h3>
          <dl className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {VALUE_STACK.map((line) => (
              <div
                key={line.id}
                className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
              >
                <dt className="text-meta text-muted">{line.label}</dt>
                <dd className="font-display font-semibold tabular-nums">{usd(line.value)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 pt-1 sm:col-span-2">
              <dt className="font-display text-lg font-semibold">Total value</dt>
              <dd className="font-display text-lg font-semibold tabular-nums text-brand-600">
                {usd(valueTotal)}
              </dd>
            </div>
          </dl>
        </Card>

        <Reveal as="p" className="mt-8 max-w-prose text-fine text-muted">
          {NO_ADVANCE_PAYMENT}
        </Reveal>
      </Container>
    </Section>
  );
}
