import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { Contact } from '@/components/sections/Contact';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { Included } from '@/components/sections/Included';
import { Pillars } from '@/components/sections/Pillars';
import { Pricing } from '@/components/sections/Pricing';
import { Process } from '@/components/sections/Process';
import { Proof } from '@/components/sections/Proof';
import { WhyDeclined } from '@/components/sections/WhyDeclined';
import {
  CHART_AXIS_MAX,
  CHART_ROWS,
  FAQS,
  HERO,
  PILLARS,
  PRICING_INCLUDES,
  PROCESS_FACTS,
  SCOPE_LIMITS,
  VALUE_STACK,
  WHY_DECLINED,
} from '@/content/home';
import { MONTHLY_FEE, TIERS } from '@/lib/offer';

/**
 * The single page.
 *
 * Content is read here and handed down, so every section stays a pure function
 * of its props and the whole page's copy is visible in one place. Compliance
 * strings are the deliberate exception: those are imported directly by the
 * component that must show them, so they cannot be dropped by forgetting a prop.
 */
export default function Home() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {/* 1 */ <Hero content={HERO} />}
        {/* 2 */ <WhyDeclined items={WHY_DECLINED} />}
        {/* 3 */ <Pillars items={PILLARS} />}
        {/* 4 */ <Process facts={PROCESS_FACTS} chartRows={CHART_ROWS} chartMax={CHART_AXIS_MAX} />}
        {
          /* 5 */ <Pricing
            tiers={TIERS}
            monthlyFee={MONTHLY_FEE}
            includes={PRICING_INCLUDES}
            valueStack={VALUE_STACK}
          />
        }
        {/* 6 */ <Included includes={PRICING_INCLUDES} limits={SCOPE_LIMITS} />}
        {/* 7 */ <Proof />}
        {/* 8 */ <Faq items={FAQS} />}
        {/* 9 */ <Contact />}
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
