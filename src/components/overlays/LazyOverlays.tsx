'use client';

import dynamic from 'next/dynamic';

// Overlays are only needed after an interaction, so keep them out of the initial JS bundle.
const CartDrawer = dynamic(() => import('./CartDrawer').then((m) => m.CartDrawer), { ssr: false });
const WishlistDrawer = dynamic(() => import('./WishlistDrawer').then((m) => m.WishlistDrawer), { ssr: false });
const ProductQuickView = dynamic(() => import('./ProductQuickView').then((m) => m.ProductQuickView), { ssr: false });
const SearchOverlay = dynamic(() => import('./SearchOverlay').then((m) => m.SearchOverlay), { ssr: false });
const EnquiryModal = dynamic(() => import('./EnquiryModal').then((m) => m.EnquiryModal), { ssr: false });
const GalleryLightbox = dynamic(() => import('./GalleryLightbox').then((m) => m.GalleryLightbox), { ssr: false });

export function LazyOverlays() {
  return (
    <>
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickView />
      <SearchOverlay />
      <EnquiryModal />
      <GalleryLightbox />
    </>
  );
}
