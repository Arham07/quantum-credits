import { Reveal } from '@/components/motion/Reveal';
import { Card, mutedTextClass } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { NumberedItem } from '@/content/types';

export function WhyDeclined({ items: WHY_DECLINED }: { items: readonly NumberedItem[] }) {
  return (
    <Section id="why-declined" tone="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Before you apply again"
            title="Four reasons a bank says no."
            lede="Underwriting rarely tells you which one it was. Usually it is one of these — and three of the four have nothing to do with how much you earn."
          />
        </Reveal>

        {/* The reference alternates card fills rather than repeating one — it is
            what stops a four-up grid reading as a table. Card 2 takes the
            near-black, so the rhythm reads on mobile (where they stack) as well
            as on the 2x2. */}
        <Reveal stagger className="mt-9 grid gap-3 sm:mt-12 sm:gap-5 sm:grid-cols-2">
          {WHY_DECLINED.map((item, i) => {
            const tone = i === 1 ? 'night' : 'surface';
            return (
              <Card as="article" key={item.id} tone={tone}>
                <p
                  className={`font-display text-lg font-semibold tabular-nums sm:text-2xl ${
                    tone === 'night' ? 'text-brand-100' : 'text-brand-600'
                  }`}
                >
                  {item.index}
                </p>
                <h3 className="mt-2 text-display-md sm:mt-3">{item.title}</h3>
                <p className={`mt-3 text-body ${mutedTextClass(tone)}`}>{item.body}</p>
              </Card>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
