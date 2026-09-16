import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROOF } from '@/content/proof';

/**
 * Renders only once real, attributed proof exists — see content/proof.ts for
 * why this ships empty rather than with placeholder numbers.
 */
export function Proof() {
  if (!PROOF.enabled || (PROOF.stats.length === 0 && PROOF.testimonials.length === 0)) {
    return null;
  }

  return (
    <Section id="proof" tone="ground">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="What clients have seen."
            align="center"
            className="mx-auto items-center text-center"
          />
        </Reveal>

        {PROOF.stats.length > 0 ? (
          <Reveal stagger className="mt-9 grid gap-4 sm:mt-12 sm:grid-cols-3">
            {PROOF.stats.map((stat) => (
              <article key={stat.id} className="rounded-card bg-night p-9 text-white shadow-card">
                <p className="font-display text-[3.25rem] font-semibold leading-none tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-3 text-meta text-night-ink">{stat.label}</p>
                <p className="mt-4 text-[0.75rem] leading-relaxed text-night-ink/70">
                  {stat.footnote}
                </p>
              </article>
            ))}
          </Reveal>
        ) : null}

        {PROOF.testimonials.length > 0 ? (
          <Reveal stagger className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROOF.testimonials.map((item) => (
              <figure key={item.id} className="rounded-card border border-line bg-surface p-8">
                <blockquote className="text-body">“{item.quote}”</blockquote>
                <figcaption className="mt-5 text-meta font-medium text-muted">
                  {item.attribution}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        ) : null}

        {/* FTC Endorsement Guides (2023): a featured testimonial must disclose
            the results a consumer can generally expect. */}
        {PROOF.expectedResults ? (
          <Reveal as="p" className="mt-8 max-w-prose text-fine text-muted">
            {PROOF.expectedResults}
          </Reveal>
        ) : null}
      </Container>
    </Section>
  );
}
