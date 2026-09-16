import { Reveal } from '@/components/motion/Reveal';
import { RevealHeading } from '@/components/motion/RevealHeading';
import { ScoreGauge } from '@/components/motion/ScoreGauge';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { CheckIcon, MessageIcon } from '@/components/ui/Icon';
import { RESULTS_DISCLAIMER } from '@/content/legal';
import type { Hero as HeroContent } from '@/content/types';

export function Hero({ content: HERO }: { content: HeroContent }) {
  return (
    <section id="top" className="relative overflow-hidden pb-section pt-7 sm:pt-10 lg:pt-16">
      <Container>
        <div className="grid items-center gap-9 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal as="p" className="text-eyebrow font-medium uppercase text-brand-600">
              {HERO.eyebrow}
            </Reveal>

            <RevealHeading as="h1" className="mt-4 max-w-[15ch] text-display-xl">
              {HERO.title} <span className="text-brand-600">{HERO.titleAccent}</span>
            </RevealHeading>

            <Reveal as="p" delay={0.3} className="mt-4 max-w-prose text-lede text-muted">
              {HERO.lede}
            </Reveal>

            <Reveal delay={0.5} className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <Button href={HERO.primaryCta.href}>{HERO.primaryCta.label}</Button>
              <Button href={HERO.secondaryCta.href} variant="secondary">
                <MessageIcon />
                {HERO.secondaryCta.label}
              </Button>
            </Reveal>

            <Reveal delay={0.6} stagger className="mt-7 flex flex-col gap-2">
              {HERO.chips.map((chip) => (
                <p key={chip} className="flex items-center gap-2.5 text-meta text-muted">
                  <span className="text-success-600">
                    <CheckIcon />
                  </span>
                  {chip}
                </p>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.2} className="text-ink lg:justify-self-end">
            <ScoreGauge caption={HERO.gauge.caption} />
          </Reveal>
        </div>

        {/* The disclaimer sits with the claim, not in the footer — "clear and
            conspicuous" under the FTC Act means adjacent and readable. */}
        <Reveal as="p" delay={0.7} className="mt-9 max-w-prose text-fine text-muted">
          {RESULTS_DISCLAIMER}
        </Reveal>
      </Container>
    </section>
  );
}
