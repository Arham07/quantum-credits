import { CardMarquee } from '@/components/motion/CardMarquee';
import { Reveal } from '@/components/motion/Reveal';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import type { ChallengedItem } from '@/content/types';

/**
 * The marquee strip, directly under the hero — the same slot the reference
 * gives its product carousel.
 *
 * No <Section> wrapper: the row has to bleed past the container to the viewport
 * edge or the loop looks like a widget in a box rather than something passing
 * through. The heading keeps the container; only the track escapes it.
 */
export function ChallengeStrip({ items }: { items: readonly ChallengedItem[] }) {
  return (
    <section id="what-we-challenge" tabIndex={-1} className="bg-ground pb-section outline-none">
      <Container>
        <Reveal>
          <Eyebrow>What we challenge</Eyebrow>
          <p className="mt-3 max-w-[38ch] text-display-md">
            Everything on your file that looks inaccurate, incomplete, outdated or unverifiable.
          </p>
        </Reveal>
      </Container>

      <Reveal className="mt-8 sm:mt-10">
        <CardMarquee items={items} />
      </Reveal>
    </section>
  );
}
