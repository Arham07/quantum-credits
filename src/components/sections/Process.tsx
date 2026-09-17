import { PointsChart } from '@/components/motion/PointsChart';
import { Reveal } from '@/components/motion/Reveal';
import { Card, mutedTextClass } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CHART_DISCLAIMER } from '@/content/legal';
import type { ChartRow, ProcessFact } from '@/content/types';

/**
 * Deliberately process-first. Everything here is something we DO on a schedule
 * — not something that will happen to the reader's score.
 */
export function Process({
  facts: PROCESS_FACTS,
  chartRows,
  chartMax,
}: {
  facts: readonly ProcessFact[];
  chartRows: readonly ChartRow[];
  chartMax: number;
}) {
  return (
    <Section id="process" tone="surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What the work looks like"
            title="A cycle, not a promise."
            lede="Nobody can tell you the date your file will be clean. What we can tell you is exactly what happens, and how often."
          />
        </Reveal>

        <Reveal stagger className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {PROCESS_FACTS.map((fact, i) => {
            const tone = i === 0 ? 'accent' : 'surface';
            return (
              <Card as="article" key={fact.id} tone={tone} className="p-5 sm:p-6 xl:p-7">
                <h3 className="text-meta font-semibold sm:text-body">{fact.title}</h3>
                <p className={`mt-3 text-meta ${mutedTextClass(tone)}`}>{fact.body}</p>
              </Card>
            );
          })}
        </Reveal>

        <div className="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <Reveal>
            <h3 className="text-display-md">What a removed item can be worth</h3>
            <p className="mt-4 text-body text-muted">
              Not every item carries the same weight. A stale address correction and a discharged
              collection are not the same lever, which is why the order we work them matters.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <PointsChart rows={chartRows} max={chartMax} />
          </Reveal>
        </div>

        {/* Adjacent to the chart, not in the footer. */}
        <Reveal as="p" className="mt-8 max-w-prose text-fine text-muted">
          {CHART_DISCLAIMER}
        </Reveal>
      </Container>
    </Section>
  );
}
