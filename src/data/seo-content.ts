/**
 * SEO / AEO / LLM copy from marketing (tyashin-platform issue 100, requester
 * comment of 25 Nov 2026). Titles, descriptions, H1s, short answers, tables
 * and FAQs live here so the pages, the FAQPage JSON-LD, /llms.txt and
 * /llms-full.txt all read the same words.
 *
 * FACTS RULE still holds: commercial plywood has no client spec yet, so it
 * carries no IS number, licence, grade, size or borrowed product image.
 * No certification wording beyond IS standards (user to share later). No
 * foundingDate in schema (1997/1998/2004 is open with the client).
 */

export interface PageCopy {
  title: string;
  description: string;
  h1: string;
}

export const PAGE_COPY: Record<string, PageCopy> = {
  '/': {
    title: 'Decorative Veneers, Plywood & Flush Doors | Billionply',
    description:
      'Billionply makes decorative, natural, teak and recon veneers, marine and commercial plywood, block board and flush doors. 1000+ dealers across India.',
    h1: 'Decorative veneers, plywood and flush doors',
  },
  '/products': {
    title: 'Veneers, Plywood, Block Board & Flush Doors | Billionply',
    description:
      'Explore Billionply veneers, marine and commercial plywood, block board, prelam and flexible plywood, and flush doors. Compare uses, sizes and standards.',
    h1: 'Veneers, plywood, block board and flush doors',
  },
  '/products/decorative-veneer': {
    title: 'Decorative Veneers: Teak & Non-Teak | Billionply',
    description:
      'Decorative veneers to IS 1328 in teak and non-teak woods: natural, recon, dyed, metallic and more. For furniture, walls and doors, up to 10 ft tall.',
    h1: 'Decorative veneers in teak and non-teak',
  },
  '/products/natural-veneer': {
    title: 'Natural Veneers: Oak, Walnut, Ash & More | Billionply',
    description:
      'Natural wood veneers from Billionply: oak, walnut, ash, sapele, wenge, sycamore and more. Every sheet has its own grain. Request samples.',
    h1: 'Natural veneers',
  },
  '/products/teak-veneer': {
    title: 'Teak Veneers for Furniture, Walls & Doors | Billionply',
    description:
      'Billionply teak veneers bring teak grain to furniture, wall panelling and doors. See how natural teak compares with recon teak, and request samples.',
    h1: 'Teak veneers',
  },
  '/products/recon-veneer': {
    title: 'Recon Veneers: Consistent Grain & Colour | Billionply',
    description:
      'Recon veneers from Billionply give a consistent, repeatable grain for large walls and matching furniture. Teak, walnut, oak and wenge looks.',
    h1: 'Recon veneers',
  },
  '/products/marine-plywood': {
    title: 'Marine Plywood (IS 710, BWP Grade) | Billionply',
    description:
      'Billionply marine plywood to IS 710: hardwood bonded with BWP resin for kitchens, bathrooms and coastal areas. Available in 10 ft sizes.',
    h1: 'Marine plywood (IS 710)',
  },
  '/products/commercial-plywood': {
    title: 'Commercial Plywood for Interiors | Billionply',
    description:
      'Commercial plywood for furniture, wardrobes, partitions and panelling in dry interiors. See how it differs from marine plywood, and ask for specs.',
    h1: 'Commercial plywood',
  },
  '/products/block-board': {
    title: 'Block Board (IS 1659) for Furniture & Doors | Billionply',
    description:
      'Billionply block board to IS 1659: strong, moisture-resistant and dimensionally stable for furniture, doors and partitions. 10 ft sizes available.',
    h1: 'Block board (IS 1659)',
  },
  '/products/prelam-plywood': {
    title: 'Prelam Plywood for Modular Interiors | Billionply',
    description:
      'Prelam plywood with a factory-pressed melamine surface for furniture, cabinets, partitions and wall panels. No extra surface finishing needed.',
    h1: 'Prelam plywood',
  },
  '/products/flexible-plywood': {
    title: 'Flexible Plywood (Bendy Ply) | Billionply',
    description:
      'Flexible plywood, or bendy ply, for curved furniture, architectural elements, shopfitting and set design. Bends without cracking or breaking.',
    h1: 'Flexible plywood',
  },
  '/products/flush-door': {
    title: 'Flush Doors: Solid Core, 10 ft Size | Billionply',
    description:
      'Billionply solid-core flush doors resist warping, cracking and swelling. Smooth face, ready for paint or polish. Available in a 10 ft size.',
    h1: 'Solid-core flush doors',
  },
  '/compare': {
    title: 'Compare Veneer, Plywood, Block Board & Doors | Billionply',
    description:
      'Compare decorative veneer, marine plywood, block board, prelam, flexible plywood and flush doors by use, water resistance, IS standard and size.',
    h1: 'Compare veneers, plywood and doors',
  },
  '/product-guide': {
    title: 'Which Plywood or Veneer Should I Use? | Billionply',
    description:
      'Choose the right plywood, veneer or door for kitchens, bathrooms, wardrobes, walls and furniture with this short guide from Billionply.',
    h1: 'Which plywood or veneer should you use?',
  },
  '/catalogues': {
    title: 'Veneer Catalogues to Download | Billionply',
    description:
      'Download the Billionply natural veneer and recon veneer catalogues as PDF files to plan interiors and share with clients.',
    h1: 'Veneer catalogues',
  },
  '/dealers': {
    title: 'Find a Plywood & Veneer Dealer | Billionply',
    description:
      'Find a Billionply plywood, veneer and flush door dealer. Search by city, pincode or state, or ask our team to connect you with one.',
    h1: 'Find a Billionply dealer',
  },
  '/become-a-dealer': {
    title: 'Plywood & Veneer Dealership | Billionply',
    description:
      'Become a Billionply dealer for decorative veneers, plywood, block board and flush doors. Join a network of 1000+ dealers across India.',
    h1: 'Become a Billionply dealer',
  },
  '/sample-request': {
    title: 'Request Veneer & Plywood Samples | Billionply',
    description:
      'Architects and interior designers can request Billionply samples of veneer, plywood, prelam, block board and flush doors for a project.',
    h1: 'Request veneer and plywood samples',
  },
  '/certifications': {
    title: 'IS Standards for Veneer & Plywood | Billionply',
    description:
      'See the Indian Standards behind Billionply products: IS 1328 decorative veneer, IS 710 marine plywood and IS 1659 block board.',
    h1: 'Indian Standards and quality',
  },
  '/about': {
    title: 'About Billionply: Plywood & Veneer Since 1997',
    description:
      'Billionply, from Jai Shiv Plywood Pvt. Ltd., makes plywood, veneers and flush doors. Meet the team and see what three generations have built.',
    h1: 'Plywood and veneer expertise, built over three generations',
  },
  '/projects': {
    title: 'Projects and Gallery | Billionply',
    description:
      'See Billionply plywood and veneer stock and facilities in Bahadurgarh, Haryana, from a company with 500+ completed projects.',
    h1: 'Billionply projects and gallery',
  },
  '/events': {
    title: 'Events and Exhibitions | Billionply',
    description:
      'Photos of the Billionply team and stand at industry exhibitions, including Matecia. See our veneers, plywood and doors on display.',
    h1: 'Billionply events and exhibitions',
  },
  '/contact': {
    title: 'Contact Billionply: Veneer, Plywood & Doors',
    description:
      'Contact Billionply for veneers, plywood, block board and flush doors. Call +91 83444 44635, message us on WhatsApp or send an enquiry.',
    h1: 'Contact Billionply',
  },
};

export function pageCopy(path: string): PageCopy {
  const c = PAGE_COPY[path];
  if (!c) throw new Error(`No page copy for ${path}`);
  return c;
}

/** Section 6: company description for LLMs and schema. */
export const COMPANY_ONE_LINE =
  'Billionply makes decorative veneers (teak and non-teak), recon veneers, marine and commercial plywood, block board, prelam and flexible plywood, and flush doors in Bahadurgarh, Haryana, India.';

export const COMPANY_SHORT =
  'Billionply is a plywood, veneer and door brand of Jai Shiv Plywood Pvt. Ltd., based in Bahadurgarh, Haryana, India. Its range covers decorative veneers (natural, teak, non-teak and recon), marine plywood made to IS 710, commercial plywood, block board made to IS 1659, prelam plywood, flexible plywood and flush doors. Decorative veneer is made to IS 1328. The company has been in the industry since 1997 and works with 1000+ dealers across India.';

/** The user's target keywords, for Organization `knowsAbout`. */
export const KNOWS_ABOUT = [
  'Decorative Veneers',
  'Teak Veneers',
  'Non-Teak Veneers',
  'Natural Veneers',
  'Recon Veneers',
  'Marine Plywood',
  'Commercial Plywood',
  'Block Board',
  'Prelam Plywood',
  'Flexible Plywood',
  'Flush Doors',
];

export interface Faq {
  q: string;
  a: string;
}

export type Section =
  | { kind: 'table'; heading: string; columns: string[]; rows: string[][]; note?: string }
  | { kind: 'list'; heading: string; items: { label?: string; text: string }[]; note?: string }
  | { kind: 'steps'; heading: string; items: string[] }
  | { kind: 'text'; heading: string; text: string };

export interface ProductAnswer {
  shortAnswer: string;
  sections: Section[];
  faqs: Faq[];
}

const MARINE_VS_COMMERCIAL: Section = {
  kind: 'table',
  heading: 'Marine plywood or commercial plywood?',
  columns: ['', 'Marine plywood', 'Commercial plywood'],
  rows: [
    ['Use it in', 'Kitchens, bathrooms, coastal areas and boats', 'Dry interiors'],
    ['Typical jobs', 'Kitchen cabinets, vanity units, tall doors', 'Wardrobes, furniture, partitions, panelling'],
    ['Choose it when', 'Water or constant moisture is likely', 'The area stays dry'],
  ],
};

export const PRODUCT_ANSWERS: Record<string, ProductAnswer> = {
  'decorative-veneer': {
    shortAnswer:
      'Decorative veneer is a thin layer of real wood, used as the visible surface of furniture, walls and doors. Billionply makes decorative veneers to IS 1328 in teak and non-teak woods, as natural or recon veneer, with heights up to 10 ft.',
    sections: [
      {
        kind: 'table',
        heading: 'Teak and non-teak veneers',
        columns: ['', 'Teak veneer', 'Non-teak veneer'],
        rows: [
          ['Wood', 'Teak', 'Oak, walnut, ash, sapele, wenge, sycamore, cherry, ebony and more'],
          ['Look', 'Warm golden-brown, with straight or crown grain', 'From pale sycamore to dark wenge, with straight, crown, burl or figured grain'],
          ['Choose it for', 'A classic Indian look in furniture, doors and panelling', 'A specific colour, or a modern or statement look'],
        ],
      },
      {
        kind: 'table',
        heading: 'Natural and recon veneers',
        columns: ['', 'Natural veneer', 'Recon veneer'],
        rows: [
          ['Made from', 'Real timber, sliced into thin leaves', 'Wood veneer, reassembled and sliced again'],
          ['Grain', 'Different on every sheet', 'Consistent and repeatable'],
          ['Choose it for', 'Character and one-of-a-kind surfaces', 'Large walls and furniture that must match'],
        ],
      },
      {
        kind: 'list',
        heading: 'Veneer finishes and series',
        items: [
          { label: 'Dyed veneers', text: 'real wood veneer coloured to shades such as grey, silver, white and charcoal. Dyed options include koto, ash, oak, lacewood, sucupira and eucalyptus.' },
          { label: 'Smoked veneers', text: 'deeper, darker tones on woods such as oak, eucalyptus, larch, walnut and sapele.' },
          { label: 'Metallic veneers', text: 'wood grain with a metallic sheen, including burl, oak, larch and eucalyptus.' },
          { label: 'Design veneers', text: 'patterned layouts such as V, W and zig-zag.' },
          { label: 'Also in the range', text: 'exotic, open-grain and rustic veneers.' },
        ],
      },
    ],
    faqs: [
      { q: 'What is decorative veneer used for?', a: 'Furniture, wall panelling, doors, and interiors of homes, offices and commercial spaces.' },
      { q: 'What sizes do Billionply decorative veneers come in?', a: 'Various sizes, including a 10 ft height for tall doors and high walls. Ask our team for the size of a specific veneer.' },
      { q: 'Can decorative veneer be polished?', a: 'Yes. It can be polished, stained or coated to suit the design.' },
      { q: 'Which Indian Standard applies to decorative veneer?', a: 'IS 1328 is the Indian Standard for veneered decorative plywood. Billionply decorative veneer is made to IS 1328.' },
      { q: 'Does Billionply make hybrid veneer?', a: 'Billionply makes recon veneer, which is a kind of hybrid veneer. For premium hybrid veneer, visit Woodlark at woodlarkveneer.com.' },
    ],
  },
  'natural-veneer': {
    shortAnswer:
      'Natural veneer is a thin leaf of real timber, sliced from a log and used as a decorative surface. Because it comes from one tree, every sheet has its own grain. Billionply offers natural veneers in teak and non-teak woods.',
    sections: [
      {
        kind: 'list',
        heading: 'Woods in the natural range',
        items: [
          { label: 'Light', text: 'white ash, white oak, sycamore, anegre, knotty pine' },
          { label: 'Medium', text: 'cherry, red oak, red elm, steamed beech, antique oak, lacewood' },
          { label: 'Dark', text: 'American walnut, sapele, santos, sucupira, tineo, wenge, ebony, ziricote' },
          { label: 'Figured', text: 'mappa burl, sapele pommele, flake oak' },
          { label: 'Teak', text: 'see Teak veneers' },
        ],
        note: 'The same wood can look different depending on the cut. Crown cut shows arched, cathedral-like grain. Quarter cut shows straighter, more even lines.',
      },
      {
        kind: 'text',
        heading: 'Where natural veneer is used',
        text: 'Furniture, wall panelling, doors, and feature surfaces in homes, offices and commercial spaces.',
      },
    ],
    faqs: [
      { q: 'Is natural veneer real wood?', a: 'Yes. It is a thin slice of real timber fixed to a board such as plywood.' },
      { q: 'Why do two sheets of natural veneer look different?', a: 'Each comes from a different part of a tree, so grain and colour change naturally. Ask to see the actual sheets when matching matters.' },
      { q: 'What is the difference between crown cut and quarter cut?', a: 'Crown cut shows arched grain. Quarter cut shows straight, parallel grain.' },
    ],
  },
  'teak-veneer': {
    shortAnswer:
      'Teak veneer is a thin layer of teak wood used to give furniture, walls and doors the look of teak. Billionply teak veneer is part of its decorative veneer range, made to IS 1328.',
    sections: [
      {
        kind: 'table',
        heading: 'Natural teak or recon teak?',
        columns: ['', 'Natural teak veneer', 'Recon teak veneer'],
        rows: [
          ['Grain', 'Natural variation on every sheet', 'Consistent across sheets'],
          ['Best for', 'Furniture and doors with character', 'Large walls and matching sets'],
          ['Look', 'Warm golden-brown of natural teak', 'Teak looks such as golden, vintage, smoked and Burma teak crown'],
        ],
        note: 'Recon teak names describe the look. They do not mean the sheet is sliced from that type of teak log.',
      },
      { kind: 'text', heading: 'Where teak veneer is used', text: 'Furniture, wall panelling and doors.' },
    ],
    faqs: [
      { q: 'Is teak veneer the same as solid teak?', a: 'No. Solid teak is teak all the way through. Teak veneer is a thin layer of teak on a board such as plywood or block board.' },
      { q: 'Is teak veneer good for doors?', a: 'Yes. It is used as the face of interior doors. Billionply decorative veneers include a 10 ft height option for tall doors.' },
      { q: 'What is the difference between teak and recon teak?', a: 'Teak veneer is sliced from teak. Recon teak is made from reassembled wood veneer to give a uniform teak look.' },
    ],
  },
  'recon-veneer': {
    shortAnswer:
      'Recon veneer, short for reconstituted veneer, is real wood veneer that has been reassembled into a block and sliced again. The result is a consistent, repeatable grain. It is a kind of hybrid veneer.',
    sections: [
      {
        kind: 'list',
        heading: 'Why choose recon veneer',
        items: [
          { text: 'Sheets match, so large walls and long runs look even.' },
          { text: 'The same design can be used across several rooms or pieces of furniture.' },
          { text: 'Woods such as teak, walnut, oak, wenge, ash and mahogany are available as recon looks.' },
        ],
        note: 'Looks in the current range: teak, walnut, oak, wenge, ash, sapele, mahogany, ebony, koto, sycamore, beech and burl. The full list of designs and codes is in the recon veneer catalogue.',
      },
    ],
    faqs: [
      { q: 'Is recon veneer real wood?', a: 'Yes. It is made from real wood veneer, reassembled to control the grain and colour.' },
      { q: 'When should I use recon veneer instead of natural veneer?', a: 'When many sheets need to match, such as reception walls, hotel rooms, offices and modular furniture.' },
      { q: 'Is recon veneer the same as hybrid veneer?', a: 'Recon veneer is a kind of hybrid veneer. Premium hybrid veneer is available from Woodlark at woodlarkveneer.com.' },
    ],
  },
  'marine-plywood': {
    shortAnswer:
      'Marine plywood is plywood made for wet conditions. Billionply marine plywood uses high-quality hardwood bonded with boiling water-proof (BWP) grade resin, and is made to IS 710. It resists water, warping, delamination and fungal attack.',
    sections: [MARINE_VS_COMMERCIAL],
    faqs: [
      { q: 'What is IS 710?', a: 'IS 710 is the Indian Standard for marine plywood.' },
      { q: 'What does BWP mean?', a: 'Boiling water-proof. It describes the resin used to bond the layers.' },
      { q: 'Is marine plywood good for kitchens?', a: 'Yes. It is made for kitchens, bathrooms and other areas exposed to moisture.' },
      { q: 'Does Billionply marine plywood come in 10 ft?', a: 'Yes. It is available in 10 ft sizes for tall doors and large furniture.' },
    ],
  },
  'commercial-plywood': {
    shortAnswer:
      'Commercial plywood is plywood for dry interior work, such as wardrobes, furniture, partitions and panelling. In India the term usually refers to moisture-resistant (MR) grade plywood. It is not meant for areas with constant water.',
    sections: [
      {
        kind: 'text',
        heading: 'Where commercial plywood is used',
        text: 'Wardrobes and shelves, beds and tables, partitions, wall panelling, office furniture, and as a base for decorative veneer.',
      },
      {
        kind: 'steps',
        heading: 'How to choose',
        items: [
          'Is the area dry? Commercial plywood suits bedrooms, living rooms and offices.',
          'Will it meet water? Choose marine plywood for kitchens, bathrooms and coastal areas.',
          'Is it a long shutter or shelf? Consider block board.',
          'Do you want a ready finish? Consider prelam plywood.',
        ],
      },
      MARINE_VS_COMMERCIAL,
    ],
    faqs: [
      { q: 'What is commercial plywood?', a: 'Plywood for dry interior work such as furniture, wardrobes and partitions.' },
      { q: 'Can commercial plywood be used in a kitchen?', a: 'Choose marine plywood for areas near water. Commercial plywood suits areas that stay dry.' },
      { q: 'Can decorative veneer be applied on commercial plywood?', a: 'Yes. Plywood is commonly used as a base for decorative veneer.' },
    ],
  },
  'block-board': {
    shortAnswer:
      'Block board is a board used for furniture, doors, partitions and panelling, where strength and stability matter over longer lengths. Billionply block board is made to IS 1659, is moisture-resistant and dimensionally stable, and comes in 10 ft sizes.',
    sections: [],
    faqs: [
      { q: 'What is block board used for?', a: 'Furniture, doors, partitions and panelling.' },
      { q: 'Which Indian Standard applies to block board?', a: 'IS 1659 is the Indian Standard for block boards.' },
      { q: 'Does block board come in 10 ft?', a: 'Yes. Billionply offers 10 ft sizes, which means fewer joints on long runs.' },
    ],
  },
  'prelam-plywood': {
    shortAnswer:
      'Prelam plywood is plywood with melamine paper pressed on in the factory, so it needs no extra surface finishing. It is used for furniture, partitions, cabinets, wall panels and modular interiors.',
    sections: [],
    faqs: [
      { q: 'What is prelam plywood?', a: 'Plywood with a factory-pressed melamine surface.' },
      { q: 'Does prelam plywood need laminate or polish?', a: 'No. The surface comes ready finished.' },
      { q: 'What is the difference between prelam plywood and veneer?', a: 'Prelam has a printed or coloured melamine surface. Veneer is a layer of real wood.' },
    ],
  },
  'flexible-plywood': {
    shortAnswer:
      'Flexible plywood, also called bendy ply or flexi-ply, is made from thin veneer layers with the grain running parallel, so it bends without cracking. It is used for curved furniture, architectural elements, shopfitting, boat building and set design.',
    sections: [],
    faqs: [
      { q: 'What is flexible plywood used for?', a: 'Curved furniture, curved architectural elements, shopfitting, boat building and stage sets.' },
      { q: 'Why does flexible plywood bend?', a: 'Its thin veneer layers are glued with the grain running parallel.' },
    ],
  },
  'flush-door': {
    shortAnswer:
      'A flush door is a door with a flat, smooth face on both sides. Billionply flush doors have a solid core for strength and sound insulation, resist warping, cracking and swelling, and are ready for paint or polish. A 10 ft size is available.',
    sections: [
      {
        kind: 'text',
        heading: 'Where flush doors are used',
        text: 'Bedrooms, offices, commercial spaces and large 10 ft door frames.',
      },
    ],
    faqs: [
      { q: 'What is a flush door?', a: 'A door with a flat, smooth surface and no raised panels.' },
      { q: 'Are Billionply flush doors solid core?', a: 'Yes. The solid core gives sound insulation and a sturdy feel.' },
      { q: 'Can a flush door be painted, polished or veneered?', a: 'Billionply flush doors have a smooth face that is ready for paint or polish. Decorative veneer is also used as a face for doors.' },
      { q: 'What sizes are available?', a: 'Billionply flush doors include a 10 ft size. Ask our team for other sizes.' },
    ],
  },
};

/**
 * The four pages added for the target keywords. Not in `products` (which
 * feeds the comparison table): commercial plywood stays out of /compare
 * until the client sends data, and the three veneers are ranges of
 * Decorative Veneer.
 */
export interface RangePage {
  slug: string;
  name: string;
  /** Existing photo of THIS product only; none for commercial plywood. */
  image: string | null;
  imageAlt: string | null;
  cardLine: string;
  /** Parent for the breadcrumb trail. */
  parent?: { name: string; path: string };
  catalogue?: string;
}

export const RANGE_PAGES: RangePage[] = [
  {
    slug: 'natural-veneer',
    name: 'Natural Veneers',
    image: '/images/veneers/natural.jpg',
    imageAlt: 'Billionply natural veneer swatch showing real timber grain',
    cardLine: 'Real timber, sliced thin: every sheet has its own grain.',
    parent: { name: 'Decorative Veneer', path: '/products/decorative-veneer' },
    catalogue: 'natural',
  },
  {
    slug: 'teak-veneer',
    name: 'Teak Veneers',
    image: '/images/veneers/teak.jpg',
    imageAlt: 'Billionply teak veneer swatch with warm golden-brown grain',
    cardLine: 'The warm, golden grain of teak for furniture, walls and doors.',
    parent: { name: 'Decorative Veneer', path: '/products/decorative-veneer' },
  },
  {
    slug: 'recon-veneer',
    name: 'Recon Veneers',
    image: '/images/veneers/recon.jpg',
    imageAlt: 'Billionply recon veneer swatch with a consistent, repeatable grain',
    cardLine: 'A consistent, repeatable grain for large walls that must match.',
    parent: { name: 'Decorative Veneer', path: '/products/decorative-veneer' },
    catalogue: 'recon',
  },
  {
    slug: 'commercial-plywood',
    name: 'Commercial Plywood',
    image: null,
    imageAlt: null,
    cardLine: 'Plywood for wardrobes, furniture and partitions in dry interiors.',
  },
];

export function getRangePage(slug: string): RangePage | undefined {
  return RANGE_PAGES.find((r) => r.slug === slug);
}

/** Home page copy (section 2). */
export const HOME = {
  eyebrow: 'Plywood, veneers and doors since 1997',
  text: 'From natural, teak and recon veneers to marine and commercial plywood, block board, prelam, flexible plywood and flush doors, Billionply has the surface and the board for your project. Choose from 400+ veneer species, with 10 ft sizes in selected products, and get help from a team with three generations of wood expertise.',
  categoryLinks: [
    { label: 'Decorative Veneers', href: '/products/decorative-veneer' },
    { label: 'Teak Veneers', href: '/products/teak-veneer' },
    { label: 'Recon Veneers', href: '/products/recon-veneer' },
    { label: 'Marine Plywood', href: '/products/marine-plywood' },
    { label: 'Commercial Plywood', href: '/products/commercial-plywood' },
    { label: 'Block Board', href: '/products/block-board' },
    { label: 'Prelam Plywood', href: '/products/prelam-plywood' },
    { label: 'Flexible Plywood', href: '/products/flexible-plywood' },
    { label: 'Flush Doors', href: '/products/flush-door' },
  ],
  trustLine: ['400+ veneer species', '1000+ dealers across India', '500+ completed projects', 'IS 1328, IS 710 and IS 1659'],
  answerHeading: 'What does Billionply make?',
  answer:
    'Billionply makes decorative veneers, plywood, block board and flush doors for homes, offices and commercial spaces. The range covers teak and non-teak natural veneers, recon veneers, marine plywood (IS 710), commercial plywood, block board (IS 1659), prelam plywood, flexible plywood and flush doors. Billionply is a brand of Jai Shiv Plywood Pvt. Ltd., based in Bahadurgarh, Haryana, and works with 1000+ dealers across India.',
  rangeHeading: 'One range for surfaces, boards and doors',
  expertiseHeading: 'Expertise in every layer',
  expertise:
    'Billionply brings together species selection, pressing, sanding and finishing. 4 Quad Press technology adds strength, Italian sanders give a smooth surface, and products meet E1 grade with termite and borer protection. Behind it is a family business that has worked with plywood and veneer since 1997, now in its third generation.',
  faqs: [
    { q: 'What products does Billionply make?', a: 'Decorative veneers (natural, teak, non-teak and recon), marine plywood, commercial plywood, block board, prelam plywood, flexible plywood and flush doors.' },
    { q: 'What is the difference between teak and non-teak veneer?', a: 'Teak veneer is sliced from teak and has warm golden-brown tones. Non-teak veneer is sliced from other woods, such as oak, walnut, ash, sapele or wenge, and gives a wider choice of colour and grain.' },
    { q: 'Which plywood is best for a kitchen or bathroom?', a: 'Marine plywood. Billionply marine plywood is bonded with boiling water-proof (BWP) resin and made to IS 710, so it suits kitchens, bathrooms and coastal areas.' },
    { q: 'What is the difference between marine and commercial plywood?', a: 'Marine plywood is made for places with water and constant moisture. Commercial plywood is for dry interior work such as wardrobes, furniture and partitions.' },
    { q: 'Should I choose natural veneer or recon veneer?', a: 'Choose natural veneer when you want a grain that is different on every sheet. Choose recon veneer when many sheets need to match.' },
    { q: 'Where can I buy Billionply products in India?', a: "Through Billionply's network of 1000+ dealers. Use Find a dealer, or message us on WhatsApp and we will connect you with one." },
  ] as Faq[],
};

/** Home range groups, in marketing's order. */
export const RANGE_GROUPS: { title: string; text: string; slugs: string[] }[] = [
  {
    title: 'Veneers for the surface',
    text: 'Decorative veneers to IS 1328, in teak and non-teak woods. Choose natural veneer for one-of-a-kind grain or recon veneer for a grain that repeats across a large wall.',
    slugs: ['decorative-veneer', 'natural-veneer', 'teak-veneer', 'recon-veneer'],
  },
  {
    title: 'Plywood and boards for the structure',
    text: 'Marine plywood for wet areas, commercial plywood for dry interiors, block board for long panels, prelam for a ready finish, and flexible plywood for curves.',
    slugs: ['marine-plywood', 'commercial-plywood', 'block-board', 'prelam-plywood', 'flexible-plywood'],
  },
  {
    title: 'Flush doors',
    text: 'Solid-core doors with a smooth face, ready for paint or polish, including a 10 ft size.',
    slugs: ['flush-door'],
  },
];

/** Product guide: direct answers (section 4). */
export const GUIDE_ANSWERS: { where: string; use: string; links: string[] }[] = [
  { where: 'Kitchen and bathroom', use: 'Marine plywood', links: ['marine-plywood'] },
  { where: 'Wardrobe or bedroom furniture', use: 'Commercial plywood or block board', links: ['commercial-plywood', 'block-board'] },
  { where: 'Long shutters and shelves', use: 'Block board', links: ['block-board'] },
  { where: 'Modular cabinets with a ready finish', use: 'Prelam plywood', links: ['prelam-plywood'] },
  { where: 'Curved walls and furniture', use: 'Flexible plywood', links: ['flexible-plywood'] },
  { where: 'Feature wall with one-of-a-kind grain', use: 'Natural or teak veneer', links: ['natural-veneer', 'teak-veneer'] },
  { where: 'Large wall with matching grain', use: 'Recon veneer', links: ['recon-veneer'] },
  { where: 'Interior doors', use: 'Flush doors', links: ['flush-door'] },
];

/** About page opening (section 5). */
export const ABOUT_OPENING =
  'Billionply makes decorative veneers, plywood, block board and flush doors for homes, offices and commercial spaces. Our work covers teak and non-teak veneers, recon veneers, marine and commercial plywood, prelam and flexible plywood. Three generations of the Chhabra family have built this expertise, in the industry since 1997.';
