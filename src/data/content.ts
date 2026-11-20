import type { SiteAction } from '@/lib/actions';

export const business = {
  name: 'H Prakash Florist',
  locality: 'Ekkaduthangal',
  city: 'Chennai',
  address: 'Near Metro Railway Station, Ekkaduthangal, Chennai, Tamil Nadu, India',
  shortAddress: 'Ekkaduthangal, Chennai, Tamil Nadu, India',
  /** Not verified yet — keep null until the client confirms. UI shows "to be confirmed". */
  phone: null as string | null,
  email: null as string | null,
  whatsapp: null as string | null,
  instagram: null as string | null,
};

export const heroSlides = [
  {
    id: 'weddings',
    label: 'Luxury Wedding Decorations',
    image: '/assets/hero/hero-wedding-mandap.webp',
    alt: 'Sunlit outdoor wedding mandap draped in ivory fabric and crowned with blush roses and white blooms (demo inspiration image)',
    position: '62% 50%',
  },
  {
    id: 'flowers',
    label: 'Fresh Flowers and Bouquets',
    image: '/assets/hero/hero-flowers-bouquet.webp',
    alt: 'Close-up of blush pink roses and white lilies in soft natural light (demo inspiration image)',
    position: '70% 50%',
  },
  {
    id: 'events',
    label: 'Celebrations and Event Styling',
    image: '/assets/banners/banner-wedding.webp',
    alt: 'Floral reception stage with a gold sofa framed by rose-covered pillars and chandeliers (demo inspiration image)',
    position: '50% 45%',
  },
];

export const categories: {
  id: string;
  name: string;
  description: string;
  image: string;
  action: SiteAction;
}[] = [
  {
    id: 'wedding',
    name: 'Wedding Decorations',
    description: 'Mandaps, stages, arches and aisles dressed in bloom.',
    image: '/assets/categories/wedding-decorations.webp',
    action: { kind: 'scroll', to: '#weddings' },
  },
  {
    id: 'bouquets',
    name: 'Fresh Flower Bouquets',
    description: 'Hand-tied bouquets for every heartfelt moment.',
    image: '/assets/categories/fresh-flower-bouquets.webp',
    action: { kind: 'products', filter: 'bouquets' },
  },
  {
    id: 'birthday',
    name: 'Birthday & Party Decorations',
    description: 'Playful, elegant setups for joyful gatherings.',
    image: '/assets/categories/birthday-party-decorations.webp',
    action: { kind: 'scroll', to: '#events' },
  },
  {
    id: 'garlands',
    name: 'Traditional Flower Garlands',
    description: 'Jasmine, rose and marigold strung by hand.',
    image: '/assets/categories/traditional-flower-garlands.webp',
    action: { kind: 'products', filter: 'garlands' },
  },
  {
    id: 'premium',
    name: 'Premium Floral Arrangements',
    description: 'Statement arrangements for refined spaces.',
    image: '/assets/categories/premium-floral-arrangements.webp',
    action: { kind: 'products', filter: 'premium' },
  },
  {
    id: 'corporate',
    name: 'Corporate Event Decorations',
    description: 'Polished florals for launches and conferences.',
    image: '/assets/categories/corporate-event-flowers.webp',
    action: { kind: 'enquiry', eventType: 'Corporate Event' },
  },
];

export const weddingShowcase = {
  hero: {
    title: 'Traditional South Indian Wedding Mandap',
    description:
      'Jasmine strands, rose canopies and marigold accents shape mandaps that honour ritual while feeling effortlessly elegant.',
    image: '/assets/gallery/weddings/traditional-wedding-mandap.webp',
  },
  tiles: [
    { title: 'Luxury Floral Wedding Stage', image: '/assets/gallery/weddings/floral-reception-stage.webp', span: 'tall' },
    { title: 'Reception Flower Backdrop', image: '/assets/gallery/weddings/elegant-wedding-table.webp', span: 'wide' },
    { title: 'Floral Wedding Entrance', image: '/assets/gallery/weddings/floral-entrance-arch.webp', span: 'base' },
    { title: 'Elegant Wedding Aisle', image: '/assets/gallery/weddings/wedding-aisle.webp', span: 'base' },
    { title: 'Wedding Garland Collection', image: '/assets/gallery/events/jasmine-rose-garlands.webp', span: 'wide' },
  ] as const,
  banner: '/assets/gallery/weddings/ceremony-floral-ceiling.webp',
};

export const eventShowcase = [
  {
    title: 'Birthday Decorations',
    eventType: 'Birthday',
    description: 'Floral arches, blush palettes and cake-table styling.',
    image: '/assets/gallery/events/birthday-party-flowers.webp',
    galleryId: 'birthday-party-flowers',
  },
  {
    title: 'Engagement Decorations',
    eventType: 'Engagement',
    description: 'Romantic backdrops framed in roses and soft drapes.',
    image: '/assets/gallery/events/engagement-floral-decor.webp',
    galleryId: 'engagement-floral-decor',
  },
  {
    title: 'Baby Shower Decorations',
    eventType: 'Baby Shower',
    description: 'Gentle pastels, playful accents and fresh blooms.',
    image: '/assets/gallery/events/baby-shower-decor.webp',
    galleryId: 'baby-shower-decor',
  },
  {
    title: 'Corporate Floral Styling',
    eventType: 'Corporate Event',
    description: 'Refined table runners, podium and stage florals.',
    image: '/assets/gallery/events/corporate-floral-table.webp',
    galleryId: 'corporate-floral-table',
  },
  {
    title: 'Anniversary Decorations',
    eventType: 'Anniversary',
    description: 'Statement rose walls and candlelit settings.',
    image: '/assets/gallery/events/anniversary-floral-wall.webp',
    galleryId: 'anniversary-floral-wall',
  },
  {
    title: 'Festive Floral Decorations',
    eventType: 'Festival / Pooja',
    description: 'Marigold, jasmine and rose for auspicious days.',
    image: '/assets/gallery/events/festive-flower-decor.webp',
    galleryId: 'festive-flower-decor',
  },
];

/** SAMPLE testimonials for layout demonstration only — not genuine customer reviews. */
export const sampleTestimonials = [
  {
    name: 'Sample Client A',
    context: 'Wedding decoration',
    quote:
      'This space is reserved for a verified review. A real client might describe how the mandap florals felt on the day and how the team handled the details.',
  },
  {
    name: 'Sample Client B',
    context: 'Bouquet purchase',
    quote:
      'Placeholder text showing how a short bouquet review would look. Replace with an authentic customer quote once permission is given.',
  },
  {
    name: 'Sample Client C',
    context: 'Birthday celebration',
    quote:
      'Demo copy for layout purposes. A genuine testimonial about a birthday setup, its colour palette and the guests’ reactions would appear here.',
  },
  {
    name: 'Sample Client D',
    context: 'Corporate event',
    quote:
      'Illustrative placeholder for a corporate client review. Swap in a sourced, verified testimonial before publishing this page.',
  },
];

export const faqs = [
  {
    q: 'What types of flower decorations do you offer?',
    a: 'We work across wedding and reception decorations (mandaps, stages, entrances, aisles and backdrops), family celebrations such as engagements, birthdays and baby showers, corporate events and festive décor. We also offer fresh bouquets, arrangements and traditional garlands.',
  },
  {
    q: 'Can I request customized wedding decorations?',
    a: 'Yes. Share your venue, theme, colours and any inspiration images. We’ll discuss a floral concept with you and refine it until it suits your celebration.',
  },
  {
    q: 'Do you provide decorations for birthday parties?',
    a: 'Birthday and party styling is one of the occasions we design for, from intimate home setups to larger venue celebrations. Tell us your theme and we’ll suggest ideas.',
  },
  {
    q: 'Can I purchase individual flowers and garlands?',
    a: 'Fresh flowers, bouquets and traditional garlands can be enquired about directly. Availability of specific flowers can vary by season, so please check with the shop for current options.',
  },
  {
    q: 'How can I request a quotation?',
    a: 'Use the consultation form on this page or the “Get a Quote” button. Share your event type, date, location and requirements. Quotations depend on the design, flowers and scale involved. (On this demo site, form submissions are simulated.)',
  },
  {
    q: 'Can I choose flowers based on my event theme?',
    a: 'Absolutely. We can suggest flowers, colours and styles that complement your theme, outfits and venue, whether traditional, contemporary or a blend of both.',
  },
  {
    q: 'How early should I enquire about wedding decorations?',
    a: 'It’s best to reach out as early as you can, especially for dates in peak wedding seasons, so there’s enough time for planning and design discussions.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'The shop is located in Ekkaduthangal, Chennai. Please get in touch with your event location to confirm whether it can be served.',
  },
];

export const eventTypes = [
  'Wedding',
  'Engagement',
  'Reception',
  'Birthday',
  'Baby Shower',
  'Naming Ceremony',
  'Anniversary',
  'Housewarming',
  'Corporate Event',
  'Festival / Pooja',
  'Private Party',
  'Custom Bouquet / Flower Order',
  'Other / Custom Theme',
];

export const budgetRanges = [
  'Prefer to discuss',
  'Under ₹25,000',
  '₹25,000 – ₹75,000',
  '₹75,000 – ₹2,00,000',
  'Above ₹2,00,000',
];

export const moments = [
  { label: 'Wedding flowers', image: '/assets/mega-menu/wedding-decor.webp' },
  { label: 'Fresh bouquets', image: '/assets/mega-menu/shop-flowers.webp' },
  { label: 'Floral arches', image: '/assets/hero/hero-event-styling.webp' },
  { label: 'Traditional garlands', image: '/assets/mega-menu/traditional-garlands.webp' },
  { label: 'Luxury table arrangements', image: '/assets/mega-menu/floral-collections.webp' },
  { label: 'Event decorations', image: '/assets/mega-menu/event-decoration.webp' },
];
