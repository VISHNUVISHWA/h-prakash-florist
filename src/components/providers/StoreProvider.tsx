'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { SiteAction } from '@/lib/actions';
import type { GalleryCategory, GalleryItem } from '@/data/gallery';
import { productById } from '@/data/products';

export type CartLine = { id: string; qty: number };
export type Toast = { id: number; message: string; tone?: 'default' | 'success' | 'info' };
type Lightbox = { items: GalleryItem[]; index: number } | null;
type Enquiry = { open: boolean; eventType?: string; note?: string };
type Search = { open: boolean; query: string };

type ShopState = { cart: CartLine[]; wishlist: string[]; cartCount: number; subtotal: number };
type UIState = {
  cartOpen: boolean;
  wishlistOpen: boolean;
  mobileNavOpen: boolean;
  search: Search;
  quickViewId: string | null;
  enquiry: Enquiry;
  lightbox: Lightbox;
  productFilter: string;
  galleryFilter: GalleryCategory;
  faqValue: string;
};

type Actions = {
  runAction: (action: SiteAction) => void;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  openSearch: (query?: string) => void;
  closeSearch: () => void;
  openQuickView: (id: string) => void;
  closeQuickView: () => void;
  openEnquiry: (eventType?: string, note?: string) => void;
  closeEnquiry: () => void;
  openLightbox: (items: GalleryItem[], index: number) => void;
  setLightboxIndex: (index: number) => void;
  closeLightbox: () => void;
  setProductFilter: (filter: string) => void;
  setGalleryFilter: (filter: GalleryCategory) => void;
  setFaqValue: (value: string) => void;
  scrollTo: (selector: string) => void;
  toast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
};

const ShopCtx = createContext<ShopState | null>(null);
const UICtx = createContext<UIState | null>(null);
const ActionsCtx = createContext<Actions | null>(null);
const ToastCtx = createContext<Toast[]>([]);

const STORAGE_KEY = 'hpf-demo-store-v1';

function readStorage(): { cart: CartLine[]; wishlist: string[] } | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const cart = Array.isArray(parsed.cart)
      ? parsed.cart.filter((l: CartLine) => productById(l?.id) && Number.isFinite(l.qty) && l.qty > 0)
      : [];
    const wishlist = Array.isArray(parsed.wishlist) ? parsed.wishlist.filter((id: string) => productById(id)) : [];
    return { cart, wishlist };
  } catch {
    return null;
  }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [search, setSearch] = useState<Search>({ open: false, query: '' });
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [enquiry, setEnquiry] = useState<Enquiry>({ open: false });
  const [lightbox, setLightbox] = useState<Lightbox>(null);
  const [productFilter, setProductFilter] = useState('all');
  const [galleryFilter, setGalleryFilter] = useState<GalleryCategory>('all');
  const [faqValue, setFaqValue] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist the demo cart & wishlist for this browser only.
  useEffect(() => {
    const stored = readStorage();
    if (stored) {
      setCart(stored.cart);
      setWishlist(stored.wishlist);
    }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
    } catch {
      /* storage unavailable — keep in-memory state */
    }
  }, [cart, wishlist, hydrated]);

  const toastId = useRef(0);
  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (message: string, tone: Toast['tone'] = 'default') => {
      const id = ++toastId.current;
      setToasts((t) => [...t.slice(-2), { id, message, tone }]);
      window.setTimeout(() => dismissToast(id), 3600);
    },
    [dismissToast],
  );

  // Track whether any overlay is open so we can wait for scroll-lock release before scrolling.
  const overlayOpenRef = useRef(false);
  overlayOpenRef.current =
    cartOpen || wishlistOpen || mobileNavOpen || search.open || !!quickViewId || enquiry.open || !!lightbox;

  const closeAllOverlays = useCallback(() => {
    setCartOpen(false);
    setWishlistOpen(false);
    setMobileNavOpen(false);
    setSearch((s) => ({ ...s, open: false }));
    setQuickViewId(null);
    setEnquiry((e) => ({ ...e, open: false }));
    setLightbox(null);
  }, []);

  const scrollTo = useCallback((selector: string) => {
    const wasOpen = overlayOpenRef.current;
    const go = () => {
      if (selector === '#top') {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      } else {
        document.querySelector(selector)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
      try {
        history.replaceState(null, '', selector === '#top' ? ' ' : selector);
      } catch {
        /* ignore */
      }
    };
    // Dialogs lock body scroll; wait for them to unmount first.
    window.setTimeout(go, wasOpen ? 380 : 10);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      const product = productById(id);
      if (!product) return;
      setCart((c) => {
        const existing = c.find((l) => l.id === id);
        if (existing) return c.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + qty, 20) } : l));
        return [...c, { id, qty: Math.min(qty, 20) }];
      });
      toast(`${product.name} added to your bag`, 'success');
    },
    [toast],
  );
  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => (qty <= 0 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty: Math.min(qty, 20) } : l))));
  }, []);
  const removeFromCart = useCallback((id: string) => setCart((c) => c.filter((l) => l.id !== id)), []);
  const wishlistRef = useRef(wishlist);
  wishlistRef.current = wishlist;
  const toggleWishlist = useCallback(
    (id: string) => {
      const product = productById(id);
      const has = wishlistRef.current.includes(id);
      setWishlist((w) => (has ? w.filter((x) => x !== id) : w.includes(id) ? w : [...w, id]));
      toast(has ? `Removed ${product?.name} from your wishlist` : `Saved ${product?.name} to your wishlist`);
    },
    [toast],
  );

  const openSearch = useCallback((query = '') => setSearch({ open: true, query }), []);
  const closeSearch = useCallback(() => setSearch((s) => ({ ...s, open: false })), []);
  const openQuickView = useCallback((id: string) => {
    setSearch((s) => ({ ...s, open: false }));
    setQuickViewId(id);
  }, []);
  const closeQuickView = useCallback(() => setQuickViewId(null), []);
  const openEnquiry = useCallback((eventType?: string, note?: string) => {
    setMobileNavOpen(false);
    setQuickViewId(null);
    setLightbox(null);
    setCartOpen(false);
    setEnquiry({ open: true, eventType, note });
  }, []);
  const closeEnquiry = useCallback(() => setEnquiry((e) => ({ ...e, open: false })), []);
  const openLightbox = useCallback((items: GalleryItem[], index: number) => setLightbox({ items, index }), []);
  const setLightboxIndex = useCallback(
    (index: number) => setLightbox((l) => (l ? { ...l, index: (index + l.items.length) % l.items.length } : l)),
    [],
  );
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const runAction = useCallback(
    (action: SiteAction) => {
      switch (action.kind) {
        case 'scroll':
          scrollTo(action.to);
          closeAllOverlays();
          break;
        case 'products':
          setProductFilter(action.filter);
          scrollTo('#shop');
          closeAllOverlays();
          break;
        case 'gallery':
          setGalleryFilter(action.filter);
          scrollTo('#gallery');
          closeAllOverlays();
          break;
        case 'faq':
          setFaqValue(`faq-${action.index}`);
          scrollTo('#faq');
          closeAllOverlays();
          break;
        case 'enquiry':
          openEnquiry(action.eventType, action.note);
          break;
        case 'product':
          setMobileNavOpen(false);
          openQuickView(action.id);
          break;
        case 'search':
          setMobileNavOpen(false);
          openSearch(action.query);
          break;
        case 'cart':
          setMobileNavOpen(false);
          setCartOpen(true);
          break;
        case 'wishlist':
          setMobileNavOpen(false);
          setWishlistOpen(true);
          break;
        case 'toast':
          toast(action.message, 'info');
          break;
      }
    },
    [scrollTo, closeAllOverlays, openEnquiry, openQuickView, openSearch, toast],
  );

  const actions = useMemo<Actions>(
    () => ({
      runAction,
      addToCart,
      setQty,
      removeFromCart,
      toggleWishlist,
      setCartOpen,
      setWishlistOpen,
      setMobileNavOpen,
      openSearch,
      closeSearch,
      openQuickView,
      closeQuickView,
      openEnquiry,
      closeEnquiry,
      openLightbox,
      setLightboxIndex,
      closeLightbox,
      setProductFilter,
      setGalleryFilter,
      setFaqValue,
      scrollTo,
      toast,
      dismissToast,
    }),
    [runAction, addToCart, setQty, removeFromCart, toggleWishlist, openSearch, closeSearch, openQuickView, closeQuickView, openEnquiry, closeEnquiry, openLightbox, setLightboxIndex, closeLightbox, scrollTo, toast, dismissToast],
  );

  const shop = useMemo<ShopState>(() => {
    const cartCount = cart.reduce((n, l) => n + l.qty, 0);
    const subtotal = cart.reduce((n, l) => n + (productById(l.id)?.price ?? 0) * l.qty, 0);
    return { cart, wishlist, cartCount, subtotal };
  }, [cart, wishlist]);

  const ui = useMemo<UIState>(
    () => ({ cartOpen, wishlistOpen, mobileNavOpen, search, quickViewId, enquiry, lightbox, productFilter, galleryFilter, faqValue }),
    [cartOpen, wishlistOpen, mobileNavOpen, search, quickViewId, enquiry, lightbox, productFilter, galleryFilter, faqValue],
  );

  return (
    <ActionsCtx.Provider value={actions}>
      <ShopCtx.Provider value={shop}>
        <UICtx.Provider value={ui}>
          <ToastCtx.Provider value={toasts}>{children}</ToastCtx.Provider>
        </UICtx.Provider>
      </ShopCtx.Provider>
    </ActionsCtx.Provider>
  );
}

function useRequired<T>(ctx: React.Context<T | null>, name: string): T {
  const value = useContext(ctx);
  if (!value) throw new Error(`${name} must be used inside <StoreProvider>`);
  return value;
}

export const useActions = () => useRequired(ActionsCtx, 'useActions');
export const useShop = () => useRequired(ShopCtx, 'useShop');
export const useUI = () => useRequired(UICtx, 'useUI');
export const useToasts = () => useContext(ToastCtx);
