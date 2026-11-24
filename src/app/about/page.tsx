import { Timeline, Leadership } from '@/components/custom/Company';
import { pageMetadata } from '@/lib/seo';
import { Breadcrumbs, CtaBand, Features, JsonLd, Stats, Story } from '@/components/kit';
import type { CtaBandProps, FeaturesProps, StatsProps, StoryProps } from '@/components/kit';
import { organizationLd, websiteLd, breadcrumbLd } from '@/lib/schema';

export const metadata = pageMetadata({
  title: "About Billionply",
  description: "Billionply (Jai Shiv Plywood Pvt. Ltd.): three generations of the Chhabra family in plywood and veneer since 1997. Our story, mission and leadership.",
  path: "/about",
});

const CRUMBS = [{"name":"Home","path":"/"},{"name":"About","path":"/about"}];

export default function Page() {
  return (
    <>
      <JsonLd nodes={[organizationLd("Organization"), websiteLd(), breadcrumbLd(CRUMBS)]} />
      <Breadcrumbs items={CRUMBS} />
      <section className="section pb-0">
        <div className="container-x max-w-3xl">
          <h1 className="tt-display reveal">Driven by the Purpose. Leading by Example.</h1>
        </div>
      </section>
      <Story {...({
        "variant": "split",
        "eyebrow": "Since 1997",
        "headline": "A family craft, modern machines",
        "paragraphs": [
          "Billionply is a legacy built on the expertise of three generations of the Chhabra family, in plywood and veneer since 1997.",
          "Our story began with a passion for excellence and a wish to make products that stand the test of time. Today we pair traditional craft with modern technology, with care for precision, durability and looks in every board."
        ],
        "image": {
          "src": "/images/team/about-hero.jpg",
          "alt": "Billionply leadership in the company office",
          "brief": "Billionply leadership in the company office",
          "aspect": "landscape"
        },
        "imageSide": "right"
      } satisfies StoryProps)} />
      <Stats {...({
        "items": [
          {
            "value": "Since 1997",
            "label": "In plywood and veneer"
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
        ],
        "dark": true
      } satisfies StatsProps)} />
      <Timeline />
      <Features {...({
        "variant": "grid",
        "eyebrow": "What drives us",
        "headline": "Mission and vision",
        "items": [
          {
            "title": "Our mission",
            "body": "Exceptional plywood and veneer with innovation, sustainability and superior craft: products that exceed industry standards in durability, strength and elegance, made with responsible sourcing.",
            "icon": "Target"
          },
          {
            "title": "Our vision",
            "body": "To lead in innovative, sustainable plywood, transforming spaces with quality, elegance and durability, and to cover every segment of the plywood industry.",
            "icon": "Compass"
          }
        ],
        "columns": 2
      } satisfies FeaturesProps)} />
      <Leadership />
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
