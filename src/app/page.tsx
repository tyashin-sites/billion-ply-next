import { GrainStrip, HomeWoodlark, Audiences } from '@/components/custom/Home';
import { pageMetadata } from '@/lib/seo';
import { CtaBand, Faq, Features, Hero, JsonLd, Stats, Story, Testimonials } from '@/components/kit';
import type { CtaBandProps, FaqProps, FeaturesProps, HeroProps, StatsProps, StoryProps, TestimonialsProps } from '@/components/kit';
import { organizationLd, websiteLd, faqLd } from '@/lib/schema';

const META = pageMetadata({
  title: "Billionply | Decorative Veneer, Plywood & Flush Doors Since 1997",
  description: "Billionply makes decorative veneer, marine plywood, block board, prelam and flexible ply and flush doors in Haryana. Since 1997, 1000+ dealers in India.",
  path: "/",
});

export const metadata = { ...META, title: { absolute: META.title as string } };

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), faqLd([{"q":"What products does Billionply make?","a":"Decorative Veneer (IS 1328), Marine Plywood (IS 710), Block Board (IS 1659), Prelam Plywood, Flexible Plywood and Flush Doors."},{"q":"Which standards and technology do you use?","a":"4 Quad Press technology for strength, E1 grade for safe indoor use, Italian sanders for a smooth finish, and termite and borer protection."},{"q":"How long has Billionply been in the industry?","a":"Since 1997. Three generations of the Chhabra family run the company, with 1000+ dealers across India."},{"q":"Where can I buy Billionply products?","a":"Through our dealers across India. Use Find a dealer, or message us on WhatsApp and we will connect you with the nearest one."}])]} />
      <Hero {...({
        "variant": "split",
        "eyebrow": "In the industry since 1997",
        "headline": "Real wood for interiors and furniture",
        "sub": "Decorative veneer, plywood, block board and flush doors from Bahadurgarh, Haryana. Three generations of the Chhabra family.",
        "primaryCta": {
          "label": "Explore the range",
          "href": "/products"
        },
        "secondaryCta": {
          "label": "Download catalogue",
          "href": "/catalogues"
        },
        "image": {
          "src": "/images/mood/living-room.jpg",
          "alt": "A living room finished in wood veneer and plywood furniture",
          "brief": "A living room finished in wood veneer and plywood furniture",
          "aspect": "landscape"
        },
        "facts": [
          "Since 1997",
          "1000+ dealers across India",
          "IS 1328 · IS 710 · IS 1659"
        ]
      } satisfies HeroProps)} />
      <Stats {...({
        "items": [
          {
            "value": "Since 1997",
            "label": "Three generations of the Chhabra family"
          },
          {
            "value": "1000+",
            "label": "Dealers across India"
          },
          {
            "value": "500+",
            "label": "Completed projects"
          },
          {
            "value": "400+",
            "label": "Veneer species"
          }
        ]
      } satisfies StatsProps)} />
      <Features {...({
        "variant": "grid",
        "eyebrow": "The range",
        "headline": "Six products, made at our own plant",
        "items": [
          {
            "title": "Decorative Veneer",
            "body": "IS 1328. Natural wood veneers for furniture, walls and doors, up to 10 ft tall.",
            "icon": "Layers",
            "href": "/products/decorative-veneer"
          },
          {
            "title": "Marine Plywood",
            "body": "IS 710. BWP-bonded hardwood plywood for kitchens, bathrooms and coastal homes.",
            "icon": "Waves",
            "href": "/products/marine-plywood"
          },
          {
            "title": "Block Board",
            "body": "IS 1659. Strong, stable boards for furniture, doors and partitions.",
            "icon": "Package",
            "href": "/products/block-board"
          },
          {
            "title": "Prelam Plywood",
            "body": "A factory-pressed melamine finish, ready for modular interiors.",
            "icon": "Paintbrush",
            "href": "/products/prelam-plywood"
          },
          {
            "title": "Flexible Plywood",
            "body": "Bendy ply for curved furniture, shopfitting and set design.",
            "icon": "Feather",
            "href": "/products/flexible-plywood"
          },
          {
            "title": "Flush Doors",
            "body": "Solid-core doors that resist warping and swelling, up to 10 ft.",
            "icon": "Home",
            "href": "/products/flush-door"
          }
        ],
        "columns": 3
      } satisfies FeaturesProps)} />
      <HomeWoodlark />
      <GrainStrip />
      <Story {...({
        "variant": "split",
        "eyebrow": "Our legacy",
        "headline": "Driven by the Purpose. Leading by Example.",
        "paragraphs": [
          "Billionply is more than a plywood and veneer maker. It is a legacy built on the expertise of three generations, blending traditional craft with modern technology."
        ],
        "image": {
          "src": "/images/team/leadership-group.jpg",
          "alt": "Jitender, Rahul and Rishabh Chhabra of Billionply",
          "brief": "Jitender, Rahul and Rishabh Chhabra of Billionply",
          "aspect": "wide"
        },
        "imageSide": "left",
        "facts": [
          {
            "label": "Pressing",
            "value": "4 Quad Press"
          },
          {
            "label": "Finishing",
            "value": "Italian sanders"
          },
          {
            "label": "Emission",
            "value": "E1 grade"
          }
        ]
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
      <Faq {...({
        "eyebrow": "Common questions",
        "headline": "Good to know",
        "items": [
          {
            "q": "What products does Billionply make?",
            "a": "Decorative Veneer (IS 1328), Marine Plywood (IS 710), Block Board (IS 1659), Prelam Plywood, Flexible Plywood and Flush Doors."
          },
          {
            "q": "Which standards and technology do you use?",
            "a": "4 Quad Press technology for strength, E1 grade for safe indoor use, Italian sanders for a smooth finish, and termite and borer protection."
          },
          {
            "q": "How long has Billionply been in the industry?",
            "a": "Since 1997. Three generations of the Chhabra family run the company, with 1000+ dealers across India."
          },
          {
            "q": "Where can I buy Billionply products?",
            "a": "Through our dealers across India. Use Find a dealer, or message us on WhatsApp and we will connect you with the nearest one."
          }
        ]
      } satisfies FaqProps)} />
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
