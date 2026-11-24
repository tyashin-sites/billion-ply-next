/**
 * Company content: leadership, legacy timeline, testimonials, gallery,
 * events and certifications. Sourced from the current billionply.com only.
 * Empty lists hide their section; nothing here is a public placeholder.
 */

export const leadership = [
  {
    name: 'Jitender Chhabra',
    role: 'Managing Director',
    image: '/images/team/jitender-chhabra.jpg',
  },
  {
    name: 'Rahul Chhabra',
    role: 'Chief Executive Officer',
    image: '/images/team/rahul-chhabra.jpg',
  },
  {
    name: 'Rishabh Chhabra',
    role: 'Chief Sales Officer',
    image: '/images/team/rishabh-chhabra.jpg',
  },
];

/**
 * Legacy timeline. Only milestones the current site states. Add dated
 * milestones here when the client sends them (docs/ASSET-DEBT.md).
 */
export const timeline: { year?: string; title: string; text: string }[] = [
  {
    year: '1997',
    title: 'Into plywood and veneer',
    text: 'The Chhabra family enters the plywood and veneer industry.',
  },
  {
    title: 'Three generations',
    text: 'Expertise handed down and built on across three generations of the family.',
  },
  {
    title: 'A full range',
    text: 'Decorative veneer, marine plywood, block board, prelam and flexible plywood, and flush doors, made with 4 Quad Press technology and Italian sanders.',
  },
  {
    year: 'Today',
    title: 'Billionply today',
    text: 'Three generations, 1000+ dealers across India, 400+ veneer species and 500+ completed projects.',
  },
];

export const mission =
  'To create exceptional plywood and veneer solutions that embody innovation, sustainability and superior craftsmanship: premium products that exceed industry standards in durability, strength and elegance, made with environmentally responsible sourcing and manufacturing.';

export const vision =
  'To be the leading provider of innovative and sustainable plywood solutions, transforming spaces with quality, elegance and durability, and to cover every segment of the plywood industry with a range that inspires interior and furniture design.';

/** Copied from the current billionply.com home page (client's own testimonials). */
export const testimonials = [
  {
    quote:
      "Working with Billionply has been a game-changer for our projects. Their plywood and veneer products are not just of exceptional quality but also reflect a deep understanding of sustainable design. The team's commitment to detail and personalized service makes them a trusted partner in bringing our architectural visions to life.",
    name: 'Priyank Sharma',
    role: 'Builder',
  },
  {
    quote:
      'Billionply veneer collection has transformed our interior projects. The natural beauty and durability of their products are unmatched. What sets them apart is their ability to tailor their offerings to our exact specifications, ensuring that each project is a perfect blend of aesthetics and functionality.',
    name: 'Rohan Mehta',
    role: 'Architect',
  },
  {
    quote:
      'Choosing Billionply for our home renovation was the best decision we made. The veneers they provided added a touch of elegance to our interiors, and the quality is truly top-notch. From selection to installation, the experience was smooth, thanks to their knowledgeable and friendly staff.',
    name: 'Neha Singh',
    role: 'Homeowner',
  },
];

/** Gallery from the current /gallery/ page: plant, warehouse and stock. */
export const factoryGallery = [
  { src: '/images/factory/factory-1.jpg', alt: 'Billionply warehouse with stacked boards' },
  { src: '/images/factory/factory-2.jpg', alt: 'Inside the Billionply warehouse' },
  { src: '/images/factory/factory-3.jpg', alt: 'Rows of plywood stock at Billionply' },
  { src: '/images/factory/factory-4.jpg', alt: 'Stacks of finished boards in the warehouse' },
  { src: '/images/factory/factory-5.jpg', alt: 'Finished stock ready for dispatch' },
  { src: '/images/factory/factory-6.jpg', alt: 'The Billionply plant yard' },
  { src: '/images/factory/factory-7.jpg', alt: 'The Billionply office building' },
  { src: '/images/factory/factory-8.jpg', alt: 'A stack of Billionply boards' },
];

/**
 * Named projects / case studies. Empty until the client sends them; the
 * Projects page renders a case-study grid only when this has entries.
 */
export const caseStudies: {
  slug: string;
  title: string;
  location?: string;
  products: string[];
  summary: string;
  images: string[];
}[] = [];

export const events = [
  {
    slug: 'matecia-2025',
    name: 'Matecia 2025',
    summary: 'The Billionply stand and team at Matecia 2025.',
    photos: [
      '2917', '2824', '3385', '2898', '2828', '3419', '3627', '3662',
      '3702', '3709', '2924', '2983', '3010', '2637', '2861', '3023',
    ].map((n) => ({
      src: `/images/events/matecia-2025-${n}.jpg`,
      alt: 'Billionply at Matecia 2025',
      tall: ['2637', '2861', '3023'].includes(n),
    })),
  },
];

/**
 * BIS licences and certificate images. Empty until the client sends them.
 * Each licence renders only the fields that are filled in.
 */
export const certifications: {
  standard: string;
  title: string;
  licenceNumber?: string;
  image?: string;
  validUntil?: string;
}[] = [
  {
    // Printed with the ISI mark on the back cover of the client's own Natural
    // Veneer e-catalogue (billionply.com). Added on Aditya's go-ahead,
    // 24 Nov 2026. Validity date and certificate image still to come.
    standard: 'IS 1328',
    title: 'Decorative veneer (IS 1328)',
    licenceNumber: 'CM/L-9693005',
  },
];
