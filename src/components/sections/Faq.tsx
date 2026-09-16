import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { ChevronIcon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ACCURACY_DISCLAIMER } from '@/content/legal';
import type { FaqItem } from '@/content/types';

/**
 * Native <details>/<summary>: keyboard support, screen-reader semantics and
 * in-page find all work for free, and it needs no JavaScript at all. No `name`
 * attribute — these are independent, because a reader comparing "what does it
 * cost" against "how do I cancel" should be able to open both.
 */
export function Faq({ items: FAQS }: { items: readonly FaqItem[] }) {
  return (
    <Section id="questions" tone="ground">
      <Container>
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="The ones people actually ask."
              lede="Including the two most companies in this industry avoid."
            />
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="border-t border-line">
              {FAQS.map((item) => (
                <li key={item.id}>
                  <details className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-left sm:py-5 text-body font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180">
                        <ChevronIcon />
                      </span>
                    </summary>
                    <p className="max-w-prose pb-7 text-body text-muted">{item.a}</p>
                  </details>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-prose text-fine text-muted">{ACCURACY_DISCLAIMER}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
