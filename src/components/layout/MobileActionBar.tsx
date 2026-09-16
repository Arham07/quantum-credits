import { CalendarIcon, MessageIcon, PhoneIcon } from '@/components/ui/Icon';
import { ROUTES, SITE, SMS_HREF, TEL_HREF } from '@/lib/site';

/**
 * Fixed Call / Text / Book bar, phones only.
 *
 * Texting is the gap in this category — of the seven US competitors studied,
 * not one offers an SMS CTA, though all of them collect SMS consent. It is also
 * a far lower-commitment ask than a call, which matters for a reader who is
 * embarrassed about their credit file.
 *
 * `body` reserves --spacing-actionbar of padding so this never covers content.
 */
export function MobileActionBar() {
  const items = [
    { href: TEL_HREF, label: 'Call', icon: <PhoneIcon />, sub: SITE.phone.display },
    { href: SMS_HREF, label: 'Text', icon: <MessageIcon />, sub: 'Ask anything' },
    { href: ROUTES.contact, label: 'Book', icon: <CalendarIcon />, sub: 'Free consult' },
  ];

  return (
    <nav
      aria-label="Contact Quantum Credit"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-line bg-surface/95 backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className="flex h-actionbar flex-col items-center justify-center gap-0.5 text-ink transition-colors hover:text-brand-600"
        >
          <span className="text-brand-600">{item.icon}</span>
          <span className="text-[0.8125rem] font-medium leading-none">{item.label}</span>
          <span className="text-[0.625rem] leading-none text-muted">{item.sub}</span>
        </a>
      ))}
    </nav>
  );
}
