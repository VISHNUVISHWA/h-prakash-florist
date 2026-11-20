# H Prakash Florist — Landing Page Demo

**Live demo:** https://vishnuvishwa.github.io/h-prakash-florist/

A single-page (`/`) luxury floral e-commerce demo built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion and Radix UI primitives.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Deploying (GitHub Pages)

Pushing to `main` runs `.github/workflows/pages.yml`, which builds a static export under `/<repo-name>` and deploys it. The Pages build uses `GITHUB_PAGES=true` (static export, base path, and pre-generated responsive image variants in `public/_img`). Locally, `npm run dev` and `npm run build` use the normal Next.js image optimiser.

To preview the Pages build locally, run `GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/h-prakash-florist npm run build:pages` and serve `out/` under that path.

## What's simulated

Everything works client-side only. There is no backend:

- **Cart & wishlist**: stored in the visitor's browser (`localStorage`). Checkout is clearly disabled ("Payment is not enabled in this demo").
- **Enquiry / consultation forms**: validated, then show a *simulated* confirmation and a WhatsApp message preview. Nothing is sent.
- **Prices**: illustrative placeholders, labelled "Demo price".
- **Testimonials**: labelled "Sample testimonial · not a real review".
- **Imagery**: AI-generated demo inspiration, labelled as such in the gallery, showcases and lightbox.

## Where to edit content

| What | File |
| --- | --- |
| Business details (phone, email, WhatsApp, Instagram — currently `null` / "to be confirmed") | `src/data/content.ts` → `business` |
| Products, prices, filter tags | `src/data/products.ts` |
| Mega menus & navigation | `src/data/navigation.ts` |
| Gallery items & categories | `src/data/gallery.ts` |
| Hero slides, categories, showcases, FAQs, testimonials | `src/data/content.ts` |
| Colours, fonts, buttons | `src/app/globals.css` |
| SEO metadata | `src/app/layout.tsx` (set `NEXT_PUBLIC_SITE_URL` in production) |

Every link resolves to an in-page action (`src/lib/actions.ts`): scroll to a section, filter products or the gallery, or open an overlay. No other routes exist.

## Replacing images

Images live in `public/assets/`. Photo sources are listed in `unsplash-images/CREDITS.txt`. After replacing or adding images, regenerate the size and blur-placeholder data:

```bash
npm run images:meta
```

Notes on the supplied asset pack:

- Most photos were upscaled from small crops (about 150–300px). They are fine for card-sized slots but soft at large sizes. For a client-ready launch, replace them with original high-resolution photography, starting with the gallery, categories and products.
- The 10 product images in the pack had blurred letterbox bands baked in at the top and bottom. The copies in `public/assets/products/` have been cropped to the real photo; the originals in the asset pack are untouched.
- The logo is the client-supplied file, shown unaltered (`public/assets/brand/logo-original.png`).

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order), providers, globals.css
  components/
    layout/       Header, MegaMenu, MobileNavigation, Footer, FloatingContactButton
    sections/     Hero, BrandIntroduction, CategoryGrid, FeaturedProducts, ProductCard,
                  WeddingShowcase, EventShowcase, PromotionalBanner, Gallery, Testimonials,
                  WhyChooseUs, ProcessSection, ConsultationForm, EnquiryForm,
                  InstagramGallery, FAQAccordion
    overlays/     CartDrawer, WishlistDrawer, ProductQuickView, SearchOverlay,
                  EnquiryModal, GalleryLightbox, Toaster
    providers/    StoreProvider (cart, wishlist, filters, overlays, toasts)
    ui/           Photo (next/image + blur), Dialogs (Radix + Motion), Reveal, etc.
  data/           demo content + generated image-meta.json
scripts/          generate-image-meta.mjs
```

Accessibility: keyboard-operable mega menus (hover, focus, click; Esc to close), focus-trapped dialogs, labelled form fields with inline errors, a skip link, visible focus rings, and `prefers-reduced-motion` support (the hero slideshow starts paused).
