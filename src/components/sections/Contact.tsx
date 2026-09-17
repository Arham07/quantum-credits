import { LeadQuiz } from '@/components/interactive/LeadQuiz';
import { CircuitLines } from '@/components/motion/CircuitLines';
import { Reveal } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { CalendarIcon, MessageIcon, PhoneIcon, ShieldIcon } from '@/components/ui/Icon';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { Section } from '@/components/ui/Section';
import { NO_ADVANCE_PAYMENT } from '@/content/legal';
import { SITE, SMS_HREF, TEL_HREF } from '@/lib/site';

export function Contact() {
  const direct = [
    {
      key: 'call',
      href: TEL_HREF,
      icon: <PhoneIcon />,
      label: 'Call us',
      value: SITE.phone.display,
      placeholder: SITE.phone.placeholder,
    },
    {
      key: 'text',
      href: SMS_HREF,
      icon: <MessageIcon />,
      label: 'Text us',
      value: 'Ask one question, no commitment',
      placeholder: false,
    },
    {
      key: 'book',
      href: SITE.booking.url,
      icon: <CalendarIcon />,
      label: 'Book a time',
      value: 'Pick a slot that suits you',
      placeholder: SITE.booking.placeholder,
      external: true,
    },
  ];

  return (
    <Section id="contact" tone="surface" className="relative overflow-hidden">
      <CircuitLines className="pointer-events-none absolute inset-0 h-full w-full text-brand-500/40" />

      <Container className="relative">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-eyebrow font-medium uppercase text-brand-600">Get started</p>
              <h2 className="mt-3 max-w-[14ch] text-display-lg">
                Find out what’s actually on your reports.
              </h2>
              <p className="mt-4 max-w-prose text-lede text-muted">
                The consultation is free and there is no obligation. We pull all three reports,
                count what is there with you, and tell you honestly whether we can help.
              </p>
            </Reveal>

            <Reveal stagger className="mt-7 flex flex-col gap-2.5">
              {direct.map((item) => (
                <Card
                  as="a"
                  key={item.key}
                  bare
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 p-4 transition-opacity hover:opacity-80"
                >
                  <span className="text-brand-600">{item.icon}</span>
                  <span>
                    <span className="block text-meta font-medium text-ink">
                      {item.label}
                      <PlaceholderTag show={item.placeholder} />
                    </span>
                    <span className="block text-meta text-muted">{item.value}</span>
                  </span>
                </Card>
              ))}
            </Reveal>

            <Reveal className="mt-6 flex gap-3 text-fine text-muted">
              <span className="mt-0.5 shrink-0 text-brand-600">
                <ShieldIcon />
              </span>
              <p className="max-w-prose">{NO_ADVANCE_PAYMENT}</p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="text-ink">
            <LeadQuiz />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
