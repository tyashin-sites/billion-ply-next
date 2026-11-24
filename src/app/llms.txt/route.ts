import { siteConfig, FULL_ADDRESS } from '@/config/site';
import { SITE_URL } from '@/lib/seo';

/** /llms.txt — a plain, factual summary for AI answer engines. Facts only. */
export const dynamic = 'force-static';

const PAGES: { label: string; path: string; description: string }[] = [
  {
    "label": "Home",
    "path": "/",
    "description": "Billionply makes decorative veneer, marine plywood, block board, prelam and flexible ply and flush doors in Haryana. Since 1997, 1000+ dealers in India."
  },
  {
    "label": "Products",
    "path": "/products",
    "description": "The Billionply range: decorative veneer (IS 1328), marine plywood (IS 710), block board (IS 1659), prelam and flexible plywood, and flush doors."
  },
  {
    "label": "Decorative Veneer",
    "path": "/products/decorative-veneer",
    "description": "Billionply decorative veneer to IS 1328: natural, recon, teak, exotic, metallic, open-grain, rustic and dyed, with a 10 ft height option."
  },
  {
    "label": "Marine Plywood",
    "path": "/products/marine-plywood",
    "description": "Billionply marine plywood to IS 710: hardwood core bonded with BWP resin, resists water, warping, delamination and fungus. Available in 10 ft sizes."
  },
  {
    "label": "Block Board",
    "path": "/products/block-board",
    "description": "Billionply block board to IS 1659: strong, moisture-resistant and dimensionally stable for furniture, doors, partitions and panelling. 10 ft sizes."
  },
  {
    "label": "Prelam Plywood",
    "path": "/products/prelam-plywood",
    "description": "Billionply prelam plywood: a factory-pressed melamine finish that needs no extra surface work. For furniture, partitions, cabinets and modular interiors."
  },
  {
    "label": "Flexible Plywood",
    "path": "/products/flexible-plywood",
    "description": "Billionply flexible plywood bends and curves without cracking. For curved furniture, architectural features, shopfitting, boats and stage design."
  },
  {
    "label": "Flush Door",
    "path": "/products/flush-door",
    "description": "Billionply flush doors: solid core with sound insulation, resist warping, cracking and swelling. Smooth face ready for paint or polish, in a 10 ft size."
  },
  {
    "label": "Compare",
    "path": "/compare",
    "description": "Compare Billionply marine plywood, block board, prelam and flexible plywood, veneer and flush doors: water resistance, uses, IS standard and sizes."
  },
  {
    "label": "Guide",
    "path": "/product-guide",
    "description": "Which Billionply product for which job: interiors, doors, heavy-duty furniture and wet or harsh areas like kitchens, bathrooms and coastal homes."
  },
  {
    "label": "Catalogues",
    "path": "/catalogues",
    "description": "Download Billionply catalogues: the full natural decorative veneer catalogue and the recon veneer catalogue, as PDF files you can share with clients."
  },
  {
    "label": "Dealers",
    "path": "/dealers",
    "description": "Find a Billionply dealer near you. Search by city, pincode or state, or contact us and we will connect you with your nearest dealer."
  },
  {
    "label": "Become a dealer",
    "path": "/become-a-dealer",
    "description": "Become a Billionply dealer. Join 1000+ dealers across India selling decorative veneer, plywood, block board and flush doors. Apply in two minutes."
  },
  {
    "label": "Samples",
    "path": "/sample-request",
    "description": "Architects and interior designers: request Billionply samples of decorative veneer, prelam, plywood, block board and flush doors for your next project."
  },
  {
    "label": "About",
    "path": "/about",
    "description": "Billionply (Jai Shiv Plywood Pvt. Ltd.): three generations of the Chhabra family in plywood and veneer since 1997. Our story, mission and leadership."
  },
  {
    "label": "Certifications",
    "path": "/certifications",
    "description": "Billionply standards and certifications: decorative veneer to IS 1328, marine plywood to IS 710, block board to IS 1659, E1 grade and termite protection."
  },
  {
    "label": "Projects",
    "path": "/projects",
    "description": "Billionply projects and gallery: 500+ completed projects, and a look inside our plant and warehouse in Bahadurgarh, Haryana."
  },
  {
    "label": "Events",
    "path": "/events",
    "description": "Billionply at Matecia 2025: photos of our stand and team. Meet the people behind the boards at trade shows and exhibitions across India."
  },
  {
    "label": "Contact",
    "path": "/contact",
    "description": "Contact Billionply: call +91 83444 44635, email sales@billionply.com, message us on WhatsApp or send an enquiry. Plant at Bahadurgarh, Haryana."
  }
];

export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    ...(FULL_ADDRESS ? [`- Address: ${FULL_ADDRESS}`] : []),
    ...(siteConfig.contact.phoneDisplay ? [`- Phone: ${siteConfig.contact.phoneDisplay}`] : []),
    ...(siteConfig.contact.email ? [`- Email: ${siteConfig.contact.email}`] : []),
    ...(siteConfig.hours.summary ? [`- Hours: ${siteConfig.hours.summary}`] : []),
    '',
    '## Pages',
    ...PAGES.map((p) => `- [${p.label}](${SITE_URL}${p.path === '/' ? '' : p.path}): ${p.description}`),
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
