export type GalleryCategory = 'all' | 'weddings' | 'events' | 'bouquets' | 'garlands' | 'installations';

export type GalleryItem = {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'all'>;
  image: string;
  /** Event type to prefill when enquiring from the lightbox */
  enquiry?: string;
};

export const enquiryForCategory: Record<GalleryItem['category'], string> = {
  weddings: 'Wedding',
  installations: 'Wedding',
  events: 'Other / Custom Theme',
  bouquets: 'Custom Bouquet / Flower Order',
  garlands: 'Festival / Pooja',
};

export const galleryFilters: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'weddings', label: 'Weddings' },
  { id: 'events', label: 'Events' },
  { id: 'bouquets', label: 'Bouquets' },
  { id: 'garlands', label: 'Garlands' },
  { id: 'installations', label: 'Floral Installations' },
];

const g = (folder: string, id: string) => `/assets/gallery/${folder}/${id}.webp`;

export const galleryItems: GalleryItem[] = [
  { id: 'traditional-wedding-mandap', title: 'Traditional Mandap Florals', category: 'weddings', image: g('weddings', 'traditional-wedding-mandap') },
  { id: 'rose-flower-bouquet', title: 'Red Rose Statement Bouquet', category: 'bouquets', image: g('events', 'rose-flower-bouquet') },
  { id: 'floral-entrance-arch', title: 'Garden Floral Arch', category: 'installations', image: g('weddings', 'floral-entrance-arch') },
  { id: 'birthday-party-flowers', title: 'Birthday Balloon Styling', category: 'events', image: g('events', 'birthday-party-flowers') },
  { id: 'jasmine-rose-garlands', title: 'Jasmine Garlands', category: 'garlands', image: g('events', 'jasmine-rose-garlands') },
  { id: 'floral-reception-stage', title: 'Ivory Reception Stage', category: 'weddings', image: g('weddings', 'floral-reception-stage') },
  { id: 'purple-orchid-closeup', title: 'Orchid Study', category: 'bouquets', image: g('florals', 'purple-orchid-closeup') },
  { id: 'hanging-floral-installation', title: 'Cascading Hanging Blooms', category: 'installations', image: g('weddings', 'hanging-floral-installation') },
  { id: 'engagement-floral-decor', title: 'Engagement Stage Florals', category: 'events', image: g('events', 'engagement-floral-decor') },
  { id: 'elegant-wedding-table', title: 'Candlelit Wedding Table', category: 'weddings', image: g('weddings', 'elegant-wedding-table') },
  { id: 'festive-flower-decor', title: 'Marigold Festive Blooms', category: 'garlands', image: g('events', 'festive-flower-decor') },
  { id: 'pastel-rose-arrangement', title: 'Pastel Rose Arrangement', category: 'bouquets', image: g('florals', 'pastel-rose-arrangement') },
  { id: 'ceremony-floral-ceiling', title: 'Draped Ceiling Florals', category: 'installations', image: g('weddings', 'ceremony-floral-ceiling') },
  { id: 'baby-shower-decor', title: 'Baby Shower in Powder Blue', category: 'events', image: g('events', 'baby-shower-decor') },
  { id: 'wedding-aisle', title: 'Hillside Garden Aisle', category: 'weddings', image: g('weddings', 'wedding-aisle') },
  { id: 'pink-hydrangea-blooms', title: 'Hydrangea Close-Up', category: 'bouquets', image: g('florals', 'pink-hydrangea-blooms') },
  { id: 'anniversary-floral-wall', title: 'Red Rose Anniversary Blooms', category: 'installations', image: g('events', 'anniversary-floral-wall') },
  { id: 'corporate-floral-table', title: 'Corporate Table Florals', category: 'events', image: g('events', 'corporate-floral-table') },
  { id: 'temple-garlands', title: 'Temple-Style Hanging Garlands', category: 'garlands', image: '/assets/categories/traditional-flower-garlands.webp' },
  { id: 'luxury-wedding-centerpiece', title: 'Rustic Table Florals', category: 'weddings', image: g('weddings', 'luxury-wedding-centerpiece') },
  { id: 'white-lilies', title: 'White Lily Detail', category: 'bouquets', image: g('florals', 'white-lilies') },
];
