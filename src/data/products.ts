export type Product = {
  id: string;
  name: string;
  category: string;
  /** Illustrative demo price — not a confirmed business price */
  price: number;
  image: string;
  badge?: string;
  description: string;
  details: string[];
  tags: string[];
};

export const products: Product[] = [
  {
    id: 'classic-red-rose-bouquet',
    name: 'Classic Red Rose Bouquet',
    category: 'Bouquets',
    price: 1299,
    image: '/assets/products/classic-red-rose-bouquet.webp',
    badge: 'Signature',
    description:
      'Rich red roses and seasonal accents gathered into a round hand-tied bouquet — a timeless gesture of love.',
    details: ['Red roses with seasonal accents', 'Round hand-tied style', 'Flowers & size can be customised'],
    tags: ['bouquets', 'roses', 'anniversary', 'birthday', 'congratulations', 'luxury-roses', 'best-sellers', 'premium-bouquets'],
  },
  {
    id: 'blush-pink-rose-arrangement',
    name: 'Blush Pink Rose Arrangement',
    category: 'Bouquets',
    price: 1499,
    image: '/assets/products/blush-pink-rose-arrangement.webp',
    badge: 'Blush Edit',
    description:
      'Pink roses with delicate fillers in soft white wrap — romantic, gentle and made for heartfelt celebrations.',
    details: ['Pink roses & soft fillers', 'Soft white wrap', 'Colour palette can be personalised'],
    tags: ['bouquets', 'roses', 'birthday', 'anniversary', 'luxury-roses', 'premium-bouquets', 'new-arrivals'],
  },
  {
    id: 'white-lily-elegance-bouquet',
    name: 'White Lily Elegance Bouquet',
    category: 'Bouquets',
    price: 1799,
    image: '/assets/products/white-lily-elegance-bouquet.webp',
    description:
      'Graceful white lilies with fresh green foliage — serene, fragrant and quietly luxurious.',
    details: ['White lilies with foliage', 'Wrap & ribbon to suit', 'Ideal for congratulations & housewarmings'],
    tags: ['bouquets', 'lilies', 'congratulations', 'housewarming', 'premium-bouquets', 'wedding-essentials'],
  },
  {
    id: 'mixed-seasonal-flower-basket',
    name: 'Mixed Seasonal Flower Basket',
    category: 'Baskets',
    price: 1599,
    image: '/assets/products/mixed-seasonal-flower-basket.webp',
    badge: 'Seasonal',
    description:
      'A woven basket brimming with roses, ranunculus and seasonal blooms — soft, cheerful and ready to gift.',
    details: ['Seasonal mixed blooms', 'Hand-woven cane basket', 'Selection varies with the season'],
    tags: ['baskets', 'gifting', 'seasonal', 'seasonal-blooms', 'birthday', 'housewarming', 'congratulations'],
  },
  {
    id: 'fresh-jasmine-flower-garland',
    name: 'Fresh Jasmine Flower Garland',
    category: 'Garlands',
    price: 699,
    image: '/assets/products/fresh-jasmine-flower-garland.webp',
    badge: 'Traditional',
    description:
      'Fresh jasmine buds, strung by hand into the fragrant, auspicious garland at the heart of South Indian ceremonies.',
    details: ['Fresh jasmine buds', 'Length made to order', 'For weddings, poojas & welcomes'],
    tags: ['garlands', 'jasmine', 'traditional', 'wedding', 'festivals', 'wedding-essentials', 'best-sellers', 'festive'],
  },
  {
    id: 'traditional-marigold-garland',
    name: 'Traditional Marigold Garland',
    category: 'Garlands',
    price: 449,
    image: '/assets/products/traditional-marigold-garland.webp',
    badge: 'Festive',
    description:
      'Vibrant saffron marigolds, strung into bright, auspicious décor for festivals and homes.',
    details: ['Fresh marigolds', 'Sold per strand (demo)', 'Door, pooja & mandap décor'],
    tags: ['garlands', 'marigolds', 'traditional', 'festivals', 'festive', 'housewarming', 'best-sellers'],
  },
  {
    id: 'premium-orchid-arrangement',
    name: 'Premium Orchid Arrangement',
    category: 'Premium',
    price: 2299,
    image: '/assets/products/premium-orchid-arrangement.webp',
    badge: 'Premium',
    description:
      'Sculptural violet orchid stems — architectural, long-lasting elegance for refined spaces.',
    details: ['Orchid stems', 'Vase or planter to suit', 'Suited to offices & gifting'],
    tags: ['premium', 'orchids', 'housewarming', 'congratulations', 'new-arrivals'],
  },
  {
    id: 'luxury-wedding-flower-bouquet',
    name: 'Luxury Wedding Flower Bouquet',
    category: 'Wedding',
    price: 2499,
    image: '/assets/products/luxury-wedding-flower-bouquet.webp',
    badge: 'Bridal',
    description:
      'A romantic bridal bouquet of peach and ivory roses with soft greenery, designed to complement the bridal look.',
    details: ['Roses with soft greenery', 'Hand-tied finish', 'Designed around your outfit palette'],
    tags: ['wedding', 'bouquets', 'roses', 'wedding-essentials', 'premium'],
  },
  {
    id: 'pastel-celebration-bouquet',
    name: 'Pastel Celebration Bouquet',
    category: 'Bouquets',
    price: 1899,
    image: '/assets/products/pastel-celebration-bouquet.webp',
    description:
      'Peach and blush roses with soft seasonal blooms in a dreamy pastel wrap — made for birthdays and happy news.',
    details: ['Roses & seasonal blooms', 'Pastel wrap', 'Perfect for birthdays'],
    tags: ['bouquets', 'birthday', 'congratulations', 'seasonal-blooms', 'new-arrivals', 'premium-bouquets'],
  },
  {
    id: 'white-rose-floral-box',
    name: 'White Rose Floral Box',
    category: 'Floral Boxes',
    price: 1999,
    image: '/assets/products/white-rose-floral-box.webp',
    badge: 'Gift Box',
    description:
      'Ivory roses in a fresh, minimal gift wrap — a modern, understated way to say it beautifully.',
    details: ['Ivory roses', 'Gift wrap or box on request', 'Ribbon colour can be changed'],
    tags: ['boxes', 'gifting', 'roses', 'anniversary', 'luxury-roses', 'premium'],
  },
  {
    id: 'pink-lily-rose-bouquet',
    name: 'Pink Lily & Rose Bouquet',
    category: 'Bouquets',
    price: 1699,
    image: '/assets/gallery/florals/pink-lily-bouquet.webp',
    description:
      'Stargazer-pink lilies and soft roses in a blush wrap — fragrant, feminine and full of warmth.',
    details: ['Pink lilies & roses', 'Blush tissue wrap', 'Great for birthdays & anniversaries'],
    tags: ['bouquets', 'lilies', 'roses', 'birthday', 'anniversary', 'seasonal-blooms'],
  },
  {
    id: 'festive-marigold-jasmine-basket',
    name: 'Festive Loose Marigolds',
    category: 'Loose Flowers',
    price: 899,
    image: '/assets/gallery/florals/marigold-jasmine-basket.webp',
    description:
      'Loose marigolds for poojas, rangoli and festive offerings.',
    details: ['Loose marigolds', 'Quantity made to order', 'Festive & pooja use'],
    tags: ['baskets', 'loose', 'marigolds', 'jasmine', 'festivals', 'festive', 'traditional', 'housewarming'],
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);

/** Human-readable labels for every filter key used across menus & chips */
export const filterLabels: Record<string, string> = {
  all: 'All',
  bouquets: 'Bouquets',
  garlands: 'Garlands',
  gifting: 'Baskets & Boxes',
  baskets: 'Flower Baskets',
  boxes: 'Floral Gift Boxes',
  loose: 'Loose Flowers',
  premium: 'Premium',
  wedding: 'Wedding',
  roses: 'Roses',
  jasmine: 'Jasmine',
  marigolds: 'Marigolds',
  lilies: 'Lilies',
  orchids: 'Orchids',
  lotus: 'Lotus',
  chrysanthemums: 'Chrysanthemums',
  seasonal: 'Mixed Seasonal Flowers',
  birthday: 'Birthday',
  anniversary: 'Anniversary',
  congratulations: 'Congratulations',
  housewarming: 'Housewarming',
  festivals: 'Festivals',
  traditional: 'Traditional Floral Collection',
  'luxury-roses': 'Luxury Rose Collection',
  'seasonal-blooms': 'Seasonal Blooms',
  'wedding-essentials': 'Wedding Essentials',
  'premium-bouquets': 'Premium Bouquets',
  festive: 'Festive Flowers',
  'best-sellers': 'Best Sellers (demo selection)',
  'new-arrivals': 'New Arrivals (demo selection)',
};

export const shopChips = ['all', 'bouquets', 'garlands', 'gifting', 'premium', 'wedding'] as const;

export function filterProducts(filter: string) {
  if (filter === 'all') return products;
  return products.filter((p) => p.tags.includes(filter));
}
