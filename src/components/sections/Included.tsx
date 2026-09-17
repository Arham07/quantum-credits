import { CircuitLines } from '@/components/motion/CircuitLines';
import { Reveal } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { CheckIcon, CrossIcon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SELF_HELP_DISCLAIMER } from '@/content/legal';

/**
 * The honesty section.
 *
 * Every competitor studied either omits the right-hand column or buries it in
 * a footer. Saying plainly what the service cannot do is the strongest
 * differentiator available in a category whose core conversion problem is that
 * readers assume it is a scam — and it happens to be the legally required
 * position anyway.
 */
export function Included({
  includes: PRICING_INCLUDES,
  limits: SCOPE_LIMITS,
}: {
  includes: readonly string[];
  limits: readonly string[];
}) {
  return (
    <Section id="included" tone="surface" className="relative overflow-hidden">
      {/* Decorative; sits behind everything and takes no pointer events. */}
      <CircuitLines className="pointer-events-none absolute inset-0 h-full w-full text-brand-500/40" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Straight answers"
            title="What you get — and what we can’t do."
            lede="The second column is the one nobody else prints. Read it before you pay anyone in this industry, including us."
          />
        </Reveal>

        <div className="mt-9 grid gap-4 sm:mt-12 lg:grid-cols-2">
          <Card as={Reveal} tone="surface">
            <h3 className="text-display-md">What’s included</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {PRICING_INCLUDES.map((line) => (
                <li key={line} className="flex gap-3 text-body">
                  <span className="mt-0.5 shrink-0 text-success-600">
                    <CheckIcon />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </Card>

          {/* The honest column takes the near-black fill — it is the one the
              client should actually read, and the contrast earns the look. */}
          <Card as="div" tone="night">
            <h3 className="text-display-md">What we can’t do</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {SCOPE_LIMITS.map((line) => (
                <li key={line} className="flex gap-3 text-body text-night-ink">
                  <span className="mt-0.5 shrink-0 text-danger-500">
                    <CrossIcon />
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <Reveal as="p" className="mt-8 max-w-prose text-fine text-muted">
          {SELF_HELP_DISCLAIMER}
        </Reveal>
      </Container>
    </Section>
  );
}
