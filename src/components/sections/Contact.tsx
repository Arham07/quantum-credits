import { LeadQuiz } from '@/components/interactive/LeadQuiz';
import { CircuitLines } from '@/components/motion/CircuitLines';
import { Reveal } from '@/components/motion/Reveal';
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
    <Section id="contact" tone="night" className="relative overflow-hidden">
      <CircuitLines className="pointer-events-none absolute inset-0 h-full w-full text-white/25" />

      <Container className="relative">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-eyebrow font-medium uppercase text-brand-100">Get started</p>
              <h2 className="mt-3 max-w-[14ch] text-display-lg">
                Find out what’s actually on your reports.
              </h2>
              <p className="mt-4 max-w-prose text-lede text-night-ink">
                The consultation is free and there is no obligation. We pull all three reports,
                count what is there with you, and tell you honestly whether we can help.
              </p>
            </Reveal>

            <Reveal stagger className="mt-7 flex flex-col gap-2.5">
              {direct.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-4 rounded-ui border border-white/12 bg-white/5 p-4 transition-colors hover:border-white/35"
                >
                  <span className="text-brand-500">{item.icon}</span>
                  <span>
                    <span className="block text-meta font-medium text-white">
                      {item.label}
                      <PlaceholderTag show={item.placeholder} />
                    </span>
                    <span className="block text-meta text-night-ink">{item.value}</span>
                  </span>
                </a>
              ))}
            </Reveal>

            <Reveal className="mt-6 flex gap-3 text-fine text-night-ink">
              <span className="mt-0.5 shrink-0 text-brand-500">
                <ShieldIcon />
              </span>
              <p className="max-w-prose">{NO_ADVANCE_PAYMENT}</p>
            </Reveal>
          </div>

          {/* The form keeps the light surface so the inputs read as inputs. */}
          <Reveal delay={0.15} className="text-ink">
            <LeadQuiz />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
