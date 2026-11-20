import type { SiteAction } from '@/lib/actions';

export type MenuLink = { label: string; action: SiteAction; note?: string };
export type MenuFeature = { title: string; description: string; image: string; action: SiteAction; tag?: string; cta?: string };
export type MenuTile = { label: string; image: string; action: SiteAction };

export type MegaMenuData = {
  intro: { eyebrow: string; title: string; description: string; cta: { label: string; action: SiteAction } };
  columns: { title: string; links: MenuLink[] }[];
  features?: MenuFeature[];
  tiles?: MenuTile[];
  /** product ids shown as quick-add mini cards */
  quickShop?: string[];
};

export type NavItem = { id: string; label: string; action: SiteAction; menu?: MegaMenuData };

const p = (filter: string): SiteAction => ({ kind: 'products', filter });
const s = (to: string): SiteAction => ({ kind: 'scroll', to });
const enq = (eventType?: string): SiteAction => ({ kind: 'enquiry', eventType });
const gal = (filter: Parameters<typeof galleryAction>[0]) => galleryAction(filter);
function galleryAction(filter: 'all' | 'weddings' | 'events' | 'bouquets' | 'garlands' | 'installations'): SiteAction {
  return { kind: 'gallery', filter };
}

export const navigation: NavItem[] = [
  { id: 'home', label: 'Home', action: s('#top') },
  {
    id: 'shop',
    label: 'Shop Flowers',
    action: p('all'),
    menu: {
      intro: {
        eyebrow: 'The Flower Boutique',
        title: 'Fresh blooms, beautifully composed',
        description: 'Bouquets, garlands and arrangements, styled to order for every occasion.',
        cta: { label: 'Shop All Flowers', action: p('all') },
      },
      columns: [
        {
          title: 'Shop by Flower Type',
          links: [
            { label: 'Roses', action: p('roses') },
            { label: 'Jasmine', action: p('jasmine') },
            { label: 'Marigolds', action: p('marigolds') },
            { label: 'Lilies', action: p('lilies') },
            { label: 'Orchids', action: p('orchids') },
            { label: 'Lotus', action: p('lotus') },
            { label: 'Chrysanthemums', action: p('chrysanthemums') },
            { label: 'Mixed Seasonal Flowers', action: p('seasonal') },
          ],
        },
        {
          title: 'Shop by Product',
          links: [
            { label: 'Fresh Flower Bouquets', action: p('bouquets') },
            { label: 'Loose Flowers', action: p('loose') },
            { label: 'Flower Baskets', action: p('baskets') },
            { label: 'Floral Gift Boxes', action: p('boxes') },
            { label: 'Premium Arrangements', action: p('premium') },
            { label: 'Traditional Garlands', action: p('garlands') },
            { label: 'Custom Bouquets', action: enq('Custom Bouquet / Flower Order'), note: 'Enquire' },
          ],
        },
        {
          title: 'Shop by Occasion',
          links: [
            { label: 'Birthday', action: p('birthday') },
            { label: 'Anniversary', action: p('anniversary') },
            { label: 'Wedding', action: p('wedding') },
            { label: 'Congratulations', action: p('congratulations') },
            { label: 'Housewarming', action: p('housewarming') },
            { label: 'Festivals', action: p('festivals') },
          ],
        },
      ],
      features: [
        {
          tag: 'Featured',
          title: 'The Blush Rose Edit',
          description: 'Soft pink roses in natural light.',
          image: '/assets/mega-menu/shop-flowers.webp',
          action: { kind: 'product', id: 'blush-pink-rose-arrangement' },
          cta: 'Quick View',
        },
      ],
      quickShop: ['classic-red-rose-bouquet', 'white-lily-elegance-bouquet', 'fresh-jasmine-flower-garland'],
    },
  },
  {
    id: 'wedding',
    label: 'Wedding Decorations',
    action: s('#weddings'),
    menu: {
      intro: {
        eyebrow: 'Weddings',
        title: 'Florals for the day you’ll always remember',
        description: 'From traditional mandaps to contemporary receptions, we design the whole celebration in flowers.',
        cta: { label: 'Explore Wedding Designs', action: s('#weddings') },
      },
      columns: [
        {
          title: 'Ceremony',
          links: [
            { label: 'Wedding Mandap Decorations', action: s('#weddings') },
            { label: 'Wedding Stage Decorations', action: s('#weddings') },
            { label: 'Entrance Floral Arches', action: gal('installations') },
            { label: 'Aisle Decorations', action: gal('weddings') },
            { label: 'Floral Ceiling Installations', action: gal('installations') },
          ],
        },
        {
          title: 'Bridal & Reception',
          links: [
            { label: 'Reception Backdrops', action: gal('weddings') },
            { label: 'Bridal Bouquets', action: { kind: 'product', id: 'luxury-wedding-flower-bouquet' } },
            { label: 'Wedding Garlands', action: p('garlands') },
            { label: 'Traditional South Indian Weddings', action: s('#weddings') },
            { label: 'Contemporary Luxury Weddings', action: s('#weddings') },
          ],
        },
      ],
      features: [
        {
          title: 'Traditional Wedding Elegance',
          description: 'Mandaps in jasmine, rose & marigold.',
          image: '/assets/gallery/weddings/traditional-wedding-mandap.webp',
          action: s('#weddings'),
          cta: 'View Inspiration',
        },
        {
          title: 'Modern Floral Celebrations',
          description: 'Blush & ivory reception staging.',
          image: '/assets/gallery/weddings/floral-reception-stage.webp',
          action: gal('weddings'),
          cta: 'View Gallery',
        },
      ],
    },
  },
  {
    id: 'events',
    label: 'Event Decorations',
    action: s('#events'),
    menu: {
      intro: {
        eyebrow: 'Celebrations',
        title: 'Every gathering, styled in flowers',
        description: 'Intimate family functions to corporate evenings, each designed around your theme.',
        cta: { label: 'Plan Your Event', action: enq() },
      },
      columns: [
        {
          title: 'Family Celebrations',
          links: [
            { label: 'Birthday Parties', action: s('#events') },
            { label: 'Engagement Ceremonies', action: s('#events') },
            { label: 'Baby Showers', action: s('#events') },
            { label: 'Anniversary Celebrations', action: s('#events') },
            { label: 'Naming Ceremonies', action: enq('Naming Ceremony') },
          ],
        },
        {
          title: 'More Occasions',
          links: [
            { label: 'Corporate Events', action: s('#events') },
            { label: 'Housewarming Decorations', action: enq('Housewarming') },
            { label: 'Festival Decorations', action: gal('garlands') },
            { label: 'Private Parties', action: enq('Private Party') },
            { label: 'Custom Themed Events', action: enq('Other / Custom Theme') },
          ],
        },
      ],
      features: [
        {
          title: 'Birthday Styling',
          description: 'Blush, gold & floral arches.',
          image: '/assets/mega-menu/event-decoration.webp',
          action: s('#events'),
          cta: 'Explore Designs',
        },
        {
          title: 'Corporate Floral Styling',
          description: 'Refined tables & stage florals.',
          image: '/assets/mega-menu/corporate-decor.webp',
          action: enq('Corporate Event'),
          cta: 'Enquire',
        },
      ],
    },
  },
  {
    id: 'collections',
    label: 'Floral Collections',
    action: p('all'),
    menu: {
      intro: {
        eyebrow: 'Curated Collections',
        title: 'Collections composed with intention',
        description: 'Explore signature edits, from luxurious roses to auspicious traditional florals.',
        cta: { label: 'View All Collections', action: p('all') },
      },
      columns: [
        {
          title: 'Collections',
          links: [
            { label: 'Luxury Rose Collection', action: p('luxury-roses') },
            { label: 'Seasonal Blooms', action: p('seasonal-blooms') },
            { label: 'Traditional Floral Collection', action: p('traditional') },
            { label: 'Wedding Essentials', action: p('wedding-essentials') },
          ],
        },
        {
          title: 'Edits',
          links: [
            { label: 'Premium Bouquets', action: p('premium-bouquets') },
            { label: 'Festive Flowers', action: p('festive') },
            { label: 'Best Sellers', action: p('best-sellers'), note: 'Demo' },
            { label: 'New Arrivals', action: p('new-arrivals'), note: 'Demo' },
          ],
        },
      ],
      features: [
        {
          tag: 'Collection',
          title: 'Luxury Rose Collection',
          description: 'Roses in red, blush and ivory.',
          image: '/assets/mega-menu/floral-collections.webp',
          action: p('luxury-roses'),
          cta: 'Shop Collection',
        },
      ],
      quickShop: ['premium-orchid-arrangement', 'white-rose-floral-box', 'pastel-celebration-bouquet'],
    },
  },
  {
    id: 'services',
    label: 'Our Services',
    action: s('#process'),
    menu: {
      intro: {
        eyebrow: 'Services',
        title: 'Floral design, from concept to installation',
        description: 'Tell us about your occasion and we will shape a floral concept around it.',
        cta: { label: 'Book a Consultation', action: enq() },
      },
      columns: [
        {
          title: 'Design & Styling',
          links: [
            { label: 'Complete Wedding Floral Styling', action: enq('Wedding') },
            { label: 'Venue Flower Decoration', action: enq() },
            { label: 'Custom Floral Design', action: enq('Other / Custom Theme') },
            { label: 'Event Flower Installation', action: gal('installations') },
          ],
        },
        {
          title: 'Supply & Consultation',
          links: [
            { label: 'Fresh Flower Supply', action: p('loose') },
            { label: 'Bridal Flower Accessories', action: p('wedding-essentials') },
            { label: 'Corporate Floral Styling', action: enq('Corporate Event') },
            { label: 'Personalized Floral Consultation', action: s('#consultation') },
          ],
        },
      ],
      features: [
        {
          title: 'Venue Transformations',
          description: 'Mandaps, stages & ceilings.',
          image: '/assets/mega-menu/wedding-decor.webp',
          action: s('#weddings'),
          cta: 'See Weddings',
        },
        {
          title: 'How We Work',
          description: 'Four simple steps to your design.',
          image: '/assets/gallery/weddings/ceremony-floral-ceiling.webp',
          action: s('#process'),
          cta: 'Our Process',
        },
      ],
    },
  },
  {
    id: 'gallery',
    label: 'Gallery',
    action: gal('all'),
    menu: {
      intro: {
        eyebrow: 'Inspiration Gallery',
        title: 'A glimpse of floral possibilities',
        description: 'Browse demo inspiration imagery by occasion. It is not a portfolio of completed projects.',
        cta: { label: 'Open Full Gallery', action: gal('all') },
      },
      columns: [],
      tiles: [
        { label: 'Wedding Gallery', image: '/assets/gallery/weddings/wedding-aisle.webp', action: gal('weddings') },
        { label: 'Reception Gallery', image: '/assets/gallery/weddings/elegant-wedding-table.webp', action: gal('weddings') },
        { label: 'Mandap Gallery', image: '/assets/gallery/weddings/traditional-wedding-mandap.webp', action: gal('weddings') },
        { label: 'Birthday Gallery', image: '/assets/gallery/events/birthday-party-flowers.webp', action: gal('events') },
        { label: 'Corporate Events', image: '/assets/gallery/events/corporate-floral-table.webp', action: gal('events') },
        { label: 'Bouquets & Arrangements', image: '/assets/gallery/florals/pastel-rose-arrangement.webp', action: gal('bouquets') },
      ],
    },
  },
  {
    id: 'about',
    label: 'About Us',
    action: s('#about'),
    menu: {
      intro: {
        eyebrow: 'H Prakash Florist',
        title: 'Making every celebration bloom beautifully',
        description: 'A floral decoration and flower boutique in Ekkaduthangal, Chennai.',
        cta: { label: 'Our Story', action: s('#about') },
      },
      columns: [
        {
          title: 'Discover',
          links: [
            { label: 'Our Story', action: s('#about') },
            { label: 'Our Floral Craftsmanship', action: s('#why-us') },
            { label: 'Why Choose Us', action: s('#why-us') },
            { label: 'Our Process', action: s('#process') },
            { label: 'Customer Experiences', action: s('#testimonials') },
          ],
        },
      ],
      features: [
        {
          title: 'The Art of Making Every Moment Bloom',
          description: 'Traditional and contemporary floral styles.',
          image: '/assets/gallery/weddings/hanging-floral-installation.webp',
          action: s('#why-us'),
          cta: 'Why Choose Us',
        },
      ],
    },
  },
  {
    id: 'contact',
    label: 'Contact',
    action: s('#consultation'),
    menu: {
      intro: {
        eyebrow: 'Get in Touch',
        title: 'Let’s create something beautiful together',
        description: 'Share your occasion and ideas. We’ll help shape the florals around them.',
        cta: { label: 'Request a Quote', action: enq() },
      },
      columns: [
        {
          title: 'Reach Out',
          links: [
            { label: 'Request a Quote', action: enq() },
            { label: 'WhatsApp Enquiry', action: s('#consultation'), note: 'Preview' },
            { label: 'Call Us', action: s('#contact') },
            { label: 'Visit Our Shop', action: s('#contact') },
          ],
        },
        {
          title: 'Help',
          links: [
            { label: 'Service Areas', action: { kind: 'faq', index: 7 } },
            { label: 'Frequently Asked Questions', action: s('#faq') },
            { label: 'How to Request a Quotation', action: { kind: 'faq', index: 4 } },
          ],
        },
      ],
      features: [
        {
          tag: 'Visit',
          title: 'Ekkaduthangal, Chennai',
          description: 'Near the Ekkaduthangal metro station.',
          image: '/assets/gallery/florals/white-lilies.webp',
          action: s('#contact'),
          cta: 'Shop Details',
        },
      ],
    },
  },
];
