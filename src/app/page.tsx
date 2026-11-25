import { GrainStrip, HomeWoodlark, Audiences } from '@/components/custom/Home';
import { RangeGroups } from '@/components/custom/Answers';
import { copyMetadata } from '@/lib/seo';
import { CtaBand, Faq, Hero, JsonLd, Story, Testimonials } from '@/components/kit';
import type { CtaBandProps, HeroProps, StoryProps, TestimonialsProps } from '@/components/kit';
import { organizationLd, websiteLd, faqLd } from '@/lib/schema';
import { HOME, PAGE_COPY } from '@/data/seo-content';

export const metadata = copyMetadata('/');

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("LocalBusiness"), websiteLd(), faqLd(HOME.faqs)]} />
      <Hero {...({
        variant: 'split',
        eyebrow: HOME.eyebrow,
        headline: PAGE_COPY['/'].h1,
        answer: HOME.text,
        primaryCta: { label: 'Explore products', href: '/products' },
        secondaryCta: { label: 'Download catalogue', href: '/catalogues' },
        links: HOME.categoryLinks,
        image: {
          src: '/images/mood/living-room.jpg',
          alt: 'A living room with wood-veneered furniture',
          brief: 'A living room with wood-veneered furniture',
          aspect: 'landscape',
        },
        facts: HOME.trustLine,
      } satisfies HeroProps)} />
      <section className="section pt-0">
        <div className="container-x max-w-3xl">
          <h2 className="tt-2">{HOME.answerHeading}</h2>
          <p className="mt-5 text-[1.125rem] leading-relaxed">{HOME.answer}</p>
        </div>
      </section>
      <RangeGroups eyebrow="The range" heading={HOME.rangeHeading} />
      <HomeWoodlark />
      <GrainStrip />
      <Story {...({
        variant: 'split',
        eyebrow: 'Since 1997',
        headline: HOME.expertiseHeading,
        paragraphs: [HOME.expertise],
        image: {
          src: '/images/factory/factory-1.jpg',
          alt: 'Billionply warehouse with stacked boards',
          brief: 'Billionply warehouse with stacked boards',
          aspect: 'wide',
        },
        imageSide: 'left',
        link: { label: 'About Billionply', href: '/about' },
      } satisfies StoryProps)} />
      <Testimonials {...({
        "eyebrow": "Client feedback",
        "headline": "Trusted by builders, architects and homeowners",
        "items": [
          {
            "quote": "Working with Billionply has been a game-changer for our projects. Their plywood and veneer products are not just of exceptional quality but also reflect a deep understanding of sustainable design. The team's commitment to detail and personalized service makes them a trusted partner in bringing our architectural visions to life.",
            "name": "Priyank Sharma",
            "role": "Builder"
          },
          {
            "quote": "Billionply veneer collection has transformed our interior projects. The natural beauty and durability of their products are unmatched. What sets them apart is their ability to tailor their offerings to our exact specifications, ensuring that each project is a perfect blend of aesthetics and functionality.",
            "name": "Rohan Mehta",
            "role": "Architect"
          },
          {
            "quote": "Choosing Billionply for our home renovation was the best decision we made. The veneers they provided added a touch of elegance to our interiors, and the quality is truly top-notch. From selection to installation, the experience was smooth, thanks to their knowledgeable and friendly staff.",
            "name": "Neha Singh",
            "role": "Homeowner"
          }
        ]
      } satisfies TestimonialsProps)} />
      <Audiences />
      <Faq eyebrow="Common questions" headline="Good to know" items={HOME.faqs} />
      <CtaBand {...({
        "eyebrow": "Talk to Billionply",
        "headline": "Planning a project?",
        "body": "Tell us what you are building. We help you pick the board, send samples and connect you with your nearest dealer.",
        "primaryCta": {
          "label": "Send an enquiry",
          "href": "/contact"
        },
        "secondaryCta": {
          "label": "Chat on WhatsApp",
          "href": "https://wa.me/918287903410"
        }
      } satisfies CtaBandProps)} />
    </>
  );
}
