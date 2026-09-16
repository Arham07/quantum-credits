import { Reveal } from '@/components/motion/Reveal';
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

        <Reveal stagger className="mt-9 grid gap-3 sm:mt-12 sm:gap-5 sm:grid-cols-2">
          {WHY_DECLINED.map((item) => (
            <article
              key={item.id}
              className="rounded-card border border-line bg-ground p-5 sm:p-7 lg:p-8"
            >
              <p className="font-display text-lg font-semibold tabular-nums text-brand-600 sm:text-2xl">
                {item.index}
              </p>
              <h3 className="mt-2 text-display-md sm:mt-3">{item.title}</h3>
              <p className="mt-3 text-body text-muted">{item.body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
