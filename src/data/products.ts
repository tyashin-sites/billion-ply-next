/**
 * Billionply product range — current billionply.com minus Premium Hybrid
 * Veneer (now at Woodlark, woodlarkveneer.com).
 *
 * FACTS RULE: every sentence and spec value below is taken from the current
 * billionply.com product pages, home-page FAQ or the issue-100 brief. A spec
 * field the client has not supplied is `null` and is NOT rendered (no public
 * placeholders). Thickness / size / grade tables and warranty terms are open
 * questions — see docs/ASSET-DEBT.md.
 */

export type UseGroup = 'interiors' | 'doors' | 'heavy-duty' | 'wet-areas';

export interface SpecRow {
  label: string;
  value: string | null;
}

export interface VeneerRange {
  slug: string;
  name: string;
  image: string;
  /** Only where the client's own material describes the range. */
  blurb?: string;
  /** Catalogue key in src/data/catalogues.ts, when the range has one. */
  catalogue?: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Short name for cards and table headers. */
  short: string;
  standard: string | null;
  image: string;
  imageAlt: string;
  /**
   * In-use (lifestyle) shot for the page hero. Mood only: never captioned or
   * described as a Billionply project. When set, the product shot (`image`)
   * moves lower down the page.
   */
  heroImage?: string;
  heroImageAlt?: string;
  /** One line for cards (from the current home page). */
  cardLine: string;
  /** Meta description (≤160 chars). */
  metaDescription: string;
  /** "What it is" — from the current product page. */
  intro: string[];
  uses: string[];
  features: string[];
  spec: SpecRow[];
  /** Comparison-table cells. null → "Ask us" (not stated on the source site). */
  compare: {
    water: string | null;
    uses: string;
    standard: string | null;
    sizes: string | null;
  };
  useGroups: UseGroup[];
  tenFoot: boolean;
  /** Optional catalogue key (src/data/catalogues.ts). */
  catalogue?: string;
}

/** Manufacturing standards stated company-wide on billionply.com (home FAQ). */
export const manufacturing = [
  {
    title: '4 Quad Press technology',
    text: 'Pressing that adds strength and durability to every board.',
  },
  {
    title: 'E1 grade',
    text: 'E1 emission standard for eco-friendliness and safe indoor use.',
  },
  {
    title: 'Italian sanders',
    text: 'A smooth, refined surface, ready for finishing.',
  },
  {
    title: 'Termite and borer protection',
    text: 'Treated against termites and borers for long-lasting durability.',
  },
] as const;

export const veneerRanges: VeneerRange[] = [
  {
    slug: 'natural',
    name: 'Natural Veneers',
    image: '/images/veneers/natural.jpg',
    blurb:
      'Sliced from real timber, each leaf carries its own grain, so no two surfaces are alike. Polish, stain or coat to suit the design.',
    catalogue: 'natural',
  },
  {
    slug: 'recon',
    name: 'Recon Veneers',
    image: '/images/veneers/recon.jpg',
    blurb:
      'Reconstituted veneer: a hybrid-type veneer with a consistent, repeatable grain for large surfaces that must match.',
    catalogue: 'recon',
  },
  {
    slug: 'teak',
    name: 'Teak Veneers',
    image: '/images/veneers/teak.jpg',
    blurb: 'The warm, golden grain of teak for furniture, walls and doors.',
  },
  {
    slug: 'exotic',
    name: 'Exotic Veneers',
    image: '/images/veneers/exotic.jpg',
    blurb: 'Distinctive species with bold figure for statement walls and furniture.',
  },
  {
    slug: 'metallic',
    name: 'Metallic Veneers',
    image: '/images/veneers/metallic.jpg',
    blurb: 'Wood grain with a metallic sheen for contemporary interiors.',
  },
  {
    slug: 'open-grain',
    name: 'Open-grain Veneers',
    image: '/images/veneers/open-grain.jpg',
    blurb: 'A pronounced, textured grain you can see and feel.',
  },
  {
    slug: 'rustic',
    name: 'Rustic Veneers',
    image: '/images/veneers/rustic.jpg',
    blurb: 'Knots, character marks and warm tones for a lived-in look.',
  },
  {
    // Client-confirmed range (shown on the current site's veneer carousel).
    // No description is published, so none is invented here.
    slug: 'dyed',
    name: 'Dyed Veneers',
    image: '/images/veneers/dyed.jpg',
  },
];

/** Further finishes beyond the ranges above (none at present). */
export const veneerFinishes: { name: string; image: string }[] = [];

export const prelamFinishes = [
  { image: '/images/prelam/finish-3221.jpg', alt: 'Prelam finish, dark walnut tone' },
  { image: '/images/prelam/finish-3224.jpg', alt: 'Prelam finish, solid grey' },
  { image: '/images/prelam/finish-3225.jpg', alt: 'Prelam finish, deep brown wood grain' },
  { image: '/images/prelam/finish-3226.jpg', alt: 'Prelam finish, grey wood grain' },
  { image: '/images/prelam/finish-grey.jpg', alt: 'Prelam finish, light grey' },
];

export const products: Product[] = [
  {
    slug: 'decorative-veneer',
    name: 'Decorative Veneer',
    short: 'Decorative Veneer',
    standard: 'IS 1328',
    image: '/images/products/decorative-veneer.jpg',
    imageAlt: 'Fan of Billionply decorative veneer leaves in light and dark woods',
    heroImage: '/images/mood/living-room.jpg',
    heroImageAlt: 'A wood-veneered sideboard and chair in a bright living room',
    cardLine: 'Natural wood veneers for furniture, walls and doors, up to 10 ft tall.',
    metaDescription:
      'Billionply decorative veneer (IS 1328): natural, recon, teak, exotic, metallic, open-grain and rustic ranges, with a 10 ft height option. Download the catalogue.',
    intro: [
      'Crafted from high-quality natural wood, Billionply decorative veneer brings the beauty of real timber to furniture, walls and doors. Every sheet carries its own grain, so no two designs are alike.',
      'It can be polished, stained or coated to match your design, and it is lightweight and easy to apply on high-end interiors. Sourced responsibly, it is a choice that does not trade sustainability for style.',
      'For modern architecture it comes in several sizes, including an extended 10 ft height for grand doors and high walls.',
    ],
    uses: ['Furniture', 'Wall panelling', 'Doors, including tall 10 ft doors', 'High walls', 'Homes, offices and commercial spaces'],
    features: [
      'Unique natural grain on every sheet',
      'Can be polished, stained or coated',
      'Lightweight and easy to apply',
      'Responsibly sourced',
      'Extended 10 ft height option',
    ],
    spec: [
      { label: 'Standard', value: 'IS 1328 (decorative veneer)' },
      { label: 'Material', value: 'Natural wood veneer' },
      { label: 'Ranges', value: 'Natural, Recon, Teak, Exotic, Metallic, Open-grain, Rustic, Dyed' },
      { label: 'Finishing', value: 'Polish, stain or coat' },
      { label: 'Height', value: 'Various sizes, including 10 ft' },
      { label: 'Thickness', value: null },
      { label: 'Warranty', value: null },
    ],
    compare: {
      water: null,
      uses: 'Furniture, walls and doors',
      standard: 'IS 1328',
      sizes: 'Various, up to 10 ft height',
    },
    useGroups: ['interiors', 'doors'],
    tenFoot: true,
    catalogue: 'natural',
  },
  {
    slug: 'marine-plywood',
    name: 'Marine Plywood',
    short: 'Marine Plywood',
    standard: 'IS 710',
    image: '/images/products/marine-plywood.jpg',
    imageAlt: 'Billionply marine plywood sheet with IS 710 face stamps',
    heroImage: '/images/mood/kitchen.jpg',
    heroImageAlt: 'A modern kitchen with wood-finish cabinets and a dining table',
    cardLine: 'BWP-bonded hardwood plywood for kitchens, bathrooms and coastal areas.',
    metaDescription:
      'Billionply marine plywood (IS 710): hardwood core bonded with BWP resin, resistant to water, warping, delamination and fungus. Available in 10 ft sizes.',
    intro: [
      'Manufactured from high-quality hardwood and bonded with boiling water-proof (BWP) grade resin, Billionply marine plywood is built to endure extreme conditions without losing strength or performance.',
      'It is highly resistant to water and resists warping, delamination and fungal attack, so structures stay sturdy for years. It goes through rigorous quality testing to meet IS 710.',
      'It is also available in 10 ft sizes for tall doors, high-end furniture and commercial setups.',
    ],
    uses: ['Kitchens', 'Bathrooms', 'Coastal areas', 'Boats', 'Tall doors', 'High-end furniture and commercial setups'],
    features: [
      'Hardwood core',
      'BWP (boiling water-proof) grade resin',
      'Resists warping, delamination and fungal attack',
      'Tested to IS 710',
      '10 ft sizes available',
    ],
    spec: [
      { label: 'Standard', value: 'IS 710 (marine plywood)' },
      { label: 'Core', value: 'High-quality hardwood' },
      { label: 'Bonding', value: 'BWP (boiling water-proof) grade resin' },
      { label: 'Water resistance', value: 'Highly water resistant; resists warping, delamination and fungal attack' },
      { label: 'Sizes', value: 'Including 10 ft' },
      { label: 'Thickness', value: null },
      { label: 'Warranty', value: null },
    ],
    compare: {
      water: 'Highest: BWP resin, built for constant moisture',
      uses: 'Kitchens, bathrooms, coastal areas, boats, tall doors',
      standard: 'IS 710',
      sizes: 'Including 10 ft',
    },
    useGroups: ['wet-areas', 'doors', 'heavy-duty'],
    tenFoot: true,
  },
  {
    slug: 'block-board',
    name: 'Block Board',
    short: 'Block Board',
    standard: 'IS 1659',
    image: '/images/products/block-board.jpg',
    imageAlt: 'Stacked Billionply block boards showing the edge',
    cardLine: 'Strong, stable boards for furniture, doors and partitions.',
    metaDescription:
      'Billionply block board (IS 1659): strong, moisture-resistant and dimensionally stable for furniture, doors, partitions and panelling. 10 ft sizes for fewer joints.',
    intro: [
      'Billionply block board is made for strength, durability and stability, which makes it a natural choice for furniture, doors, partitions and panelling.',
      'It is moisture-resistant and dimensionally stable, so it holds up to daily use even in challenging environments, with a smooth surface that is easy to work.',
      'It also comes in 10 ft sizes, so long runs need fewer joints.',
    ],
    uses: ['Heavy-duty furniture', 'Doors', 'Partitions', 'Panelling', 'Homes, offices and large commercial projects'],
    features: [
      'Superior strength and stability',
      'Moisture-resistant',
      'Dimensionally stable',
      'Smooth, easy-to-work surface',
      '10 ft sizes for fewer joints',
    ],
    spec: [
      { label: 'Standard', value: 'IS 1659 (block board)' },
      { label: 'Moisture', value: 'Moisture-resistant, dimensionally stable' },
      { label: 'Surface', value: 'Smooth, ready to work' },
      { label: 'Sizes', value: 'Including 10 ft' },
      { label: 'Thickness', value: null },
      { label: 'Warranty', value: null },
    ],
    compare: {
      water: 'Moisture-resistant',
      uses: 'Heavy-duty furniture, doors, partitions, panelling',
      standard: 'IS 1659',
      sizes: 'Including 10 ft',
    },
    useGroups: ['heavy-duty', 'doors', 'interiors'],
    tenFoot: true,
  },
  {
    slug: 'prelam-plywood',
    name: 'Prelam Plywood',
    short: 'Prelam Plywood',
    standard: null,
    image: '/images/products/prelam-plywood.jpg',
    imageAlt: 'Stack of Billionply prelam plywood sheets in wood and solid finishes',
    cardLine: 'Factory-pressed melamine finish, ready to use for modular interiors.',
    metaDescription:
      'Billionply prelam plywood: factory-pressed melamine finish, no extra surface work. For furniture, partitions, cabinets, wall panels and modular interiors.',
    intro: [
      'Billionply prelam plywood comes with factory-pressed melamine paper, so it needs no further surface finishing.',
      'That makes it ideal for furniture, partitions, cabinets, wall panelling and modular interiors, with a finished look from day one.',
      'It is available in a range of colours, textures and finishes, so you can create customised spaces with ready-to-use surfaces.',
    ],
    uses: ['Furniture', 'Partitions', 'Cabinets', 'Wall panelling', 'Modular interiors'],
    features: [
      'Factory-pressed melamine surface',
      'No additional finishing needed',
      'Range of colours, textures and finishes',
      'Ready-to-use surfaces save site time',
    ],
    spec: [
      { label: 'Surface', value: 'Factory-pressed melamine paper' },
      { label: 'Finishes', value: 'Range of colours, textures and finishes' },
      { label: 'Standard', value: null },
      { label: 'Thickness', value: null },
      { label: 'Sizes', value: null },
      { label: 'Warranty', value: null },
    ],
    compare: {
      water: null,
      uses: 'Furniture, partitions, cabinets, wall panels, modular interiors',
      standard: null,
      sizes: null,
    },
    useGroups: ['interiors'],
    tenFoot: false,
  },
  {
    slug: 'flexible-plywood',
    name: 'Flexible Plywood',
    short: 'Flexible Plywood',
    standard: null,
    image: '/images/products/flexible-plywood.jpg',
    imageAlt: 'A curved sheet of Billionply flexible plywood',
    cardLine: 'Bendy ply for curved furniture, shopfitting and set design.',
    metaDescription:
      'Billionply flexible plywood (bendy ply): bends and curves without cracking. For curved furniture, architectural elements, shopfitting and stage and set design.',
    intro: [
      'Flexible plywood, also called bendy ply or flexi-ply, is designed to bend and curve without cracking or breaking, for projects that need curved shapes and smooth, flowing lines.',
      'It is made from thin layers of veneer with the grain running parallel through a high-quality core, which lets it bend easily while staying durable.',
    ],
    uses: ['Curved furniture', 'Architectural elements', 'Custom interiors and interior decoration', 'Shopfitting', 'Boat building', 'Stage and set design'],
    features: [
      'Bends without cracking',
      'Thin veneer layers with parallel grain',
      'Durable once formed',
    ],
    spec: [
      { label: 'Construction', value: 'Thin veneer layers, grain running parallel' },
      { label: 'Behaviour', value: 'Bends and curves without cracking' },
      { label: 'Standard', value: null },
      { label: 'Thickness', value: null },
      { label: 'Sizes', value: null },
      { label: 'Warranty', value: null },
    ],
    compare: {
      water: null,
      uses: 'Curved furniture, architectural features, shopfitting, sets',
      standard: null,
      sizes: null,
    },
    useGroups: ['interiors'],
    tenFoot: false,
  },
  {
    slug: 'flush-door',
    name: 'Flush Door',
    short: 'Flush Door',
    standard: null,
    image: '/images/products/flush-door.jpg',
    imageAlt: 'A Billionply flush door with a smooth wood face',
    cardLine: 'Solid-core doors that resist warping and swelling, up to 10 ft.',
    metaDescription:
      'Billionply flush doors: solid core, sound insulation, resist warping, cracking and swelling. Smooth face ready for paint or polish, in a 10 ft size.',
    intro: [
      'Billionply flush doors combine strength, function and style. They are made with precision from high-quality materials for a solid, smooth surface that looks good and lasts.',
      'They resist warping, cracking and swelling from changes in humidity, so they suit every climate. The solid core gives excellent sound insulation and a sturdy feel.',
      'The smooth face is a ready base for paint or polish, and a 10 ft size is available for larger frames.',
    ],
    uses: ['Homes', 'Offices and commercial spaces', 'Large door frames (10 ft)'],
    features: [
      'Solid core with sound insulation',
      'Resists warping, cracking and swelling',
      'Smooth face, ready to paint or polish',
      '10 ft size available',
    ],
    spec: [
      { label: 'Core', value: 'Solid core' },
      { label: 'Acoustics', value: 'Excellent sound insulation' },
      { label: 'Stability', value: 'Resists warping, cracking and swelling from humidity' },
      { label: 'Finish', value: 'Smooth face, ready for paint or polish' },
      { label: 'Sizes', value: 'Including 10 ft' },
      { label: 'Thickness', value: null },
      { label: 'Warranty', value: null },
    ],
    compare: {
      water: 'Resists swelling from humidity',
      uses: 'Interior doors for homes and commercial spaces',
      standard: null,
      sizes: 'Including 10 ft',
    },
    useGroups: ['doors'],
    tenFoot: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** "Which product for which job" — the grouping the owner's 2027 plan asks for. */
export const useGroups: { id: UseGroup; title: string; lead: string; why: Record<string, string> }[] = [
  {
    id: 'interiors',
    title: 'Interiors',
    lead: 'Walls, furniture surfaces, wardrobes, modular kitchens and feature elements.',
    why: {
      'decorative-veneer': 'Real wood grain for walls and furniture; polish, stain or coat to suit.',
      'prelam-plywood': 'Ready-finished melamine surface for cabinets, partitions and modular units.',
      'flexible-plywood': 'Curves, columns and flowing feature walls.',
      'block-board': 'A stable base for long panels and partitions.',
    },
  },
  {
    id: 'doors',
    title: 'Doors',
    lead: 'Main doors, internal doors and tall 10 ft openings.',
    why: {
      'flush-door': 'A ready door: solid core, sound insulation, resists warping.',
      'block-board': 'Stable core material for doors with minimal joints.',
      'decorative-veneer': 'A natural wood face for doors, including 10 ft heights.',
      'marine-plywood': 'For tall doors and doors in damp areas.',
    },
  },
  {
    id: 'heavy-duty',
    title: 'Heavy-duty furniture',
    lead: 'Beds, tables, shelving and anything that carries weight every day.',
    why: {
      'block-board': 'Strong and dimensionally stable for long spans and heavy loads.',
      'marine-plywood': 'Hardwood core for high-end furniture that must last.',
    },
  },
  {
    id: 'wet-areas',
    title: 'Wet or harsh areas',
    lead: 'Kitchens, bathrooms, coastal homes, boats and anywhere moisture is constant.',
    why: {
      'marine-plywood': 'BWP resin and IS 710: built for water exposure.',
      'block-board': 'Moisture-resistant for spaces that see some damp.',
      'flush-door': 'Resists swelling when humidity changes.',
    },
  },
];
