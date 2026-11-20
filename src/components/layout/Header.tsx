'use client';

import { useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, Heart, MapPin, Menu, Search, ShoppingBag } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { useActions, useShop } from '@/components/providers/StoreProvider';
import { ActionLink } from '@/components/ui/ActionLink';
import { LogoMark, Wordmark } from '@/components/ui/Logo';
import { MegaMenuPanel } from './MegaMenu';
import { cn } from '@/lib/utils';

function CountBadge({ count, solid }: { count: number; solid: boolean }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.4, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 22 }}
          className={cn(
            'absolute right-0.5 top-0.5 grid min-w-[1.15rem] place-items-center rounded-full px-1 text-[0.62rem] font-semibold leading-[1.15rem]',
            solid ? 'bg-burgundy text-ivory' : 'bg-ivory text-burgundy',
          )}
          aria-hidden
        >
          {count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const { openSearch, setCartOpen, setWishlistOpen, setMobileNavOpen, openEnquiry, scrollTo } = useActions();
  const { cartCount, wishlist } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  // Prevents the open-on-focus handler from reopening a menu when Escape returns focus to its trigger.
  const suppressFocusOpen = useRef(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setActive(null), 160);
  }, [cancelClose]);
  const open = useCallback(
    (id: string) => {
      cancelClose();
      setActive(id);
    },
    [cancelClose],
  );
  const closeNow = useCallback(() => {
    cancelClose();
    setActive(null);
  }, [cancelClose]);

  // Close when clicking outside the navigation.
  useEffect(() => {
    if (!active) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeNow();
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [active, closeNow]);

  const onNavKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && active) {
      e.stopPropagation();
      const id = active;
      closeNow();
      suppressFocusOpen.current = true;
      triggerRefs.current[id]?.focus();
      suppressFocusOpen.current = false;
    }
  };

  const onNavBlur = (e: FocusEvent) => {
    if (!navRef.current?.contains(e.relatedTarget as Node | null)) closeNow();
  };

  const solid = scrolled || active !== null;
  const light = !solid;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
        solid ? 'bg-ivory/92 shadow-[0_10px_40px_-24px_rgba(75,15,28,0.35)] backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      {/* Legibility gradient over hero imagery */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 -z-10 h-[170%] bg-gradient-to-b from-burgundy-950/60 via-burgundy-950/20 to-transparent transition-opacity duration-500',
          solid ? 'opacity-0' : 'opacity-100',
        )}
      />

      {/* Announcement bar — collapses on scroll */}
      <div className={cn('grid transition-[grid-template-rows] duration-500 ease-luxe', scrolled ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]')}>
        <div className="overflow-hidden">
          <div className="bg-burgundy text-ivory">
            <div className="container-luxe flex h-9 items-center justify-center gap-6 text-[0.68rem] tracking-[0.14em] md:justify-between">
              <p className="hidden items-center gap-1.5 text-ivory/80 md:flex">
                <MapPin aria-hidden className="size-3.5 text-gold" strokeWidth={1.5} />
                Ekkaduthangal, Chennai
              </p>
              <p className="truncate text-center uppercase">
                <span className="hidden sm:inline">Making Every Celebration Bloom Beautifully</span>
                <span className="hidden px-3 text-gold sm:inline" aria-hidden>
                  |
                </span>
                <span>Weddings • Events • Fresh Flowers</span>
              </p>
              <button
                type="button"
                onClick={() => openEnquiry()}
                className="link-underline hidden uppercase text-gold-soft md:inline"
              >
                Book a consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="container-luxe">
        <div
          className={cn(
            'relative flex items-center justify-between gap-4 transition-[height] duration-500 ease-luxe',
            scrolled ? 'h-16' : 'h-[4.5rem] lg:h-20',
          )}
        >
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className={cn('icon-btn -ml-2', light ? 'text-ivory hover:bg-ivory/10' : 'text-burgundy hover:bg-burgundy/5')}
              aria-label="Open menu"
            >
              <Menu className="size-6" strokeWidth={1.4} />
            </button>
          </div>

          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              closeNow();
              scrollTo('#top');
            }}
            className="flex items-center gap-3 max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2"
          >
            <LogoMark priority className={cn('transition-[width,height] duration-500', scrolled ? 'size-11' : 'size-12 lg:size-14')} />
            <span className="hidden sm:block">
              <Wordmark light={light} compact={scrolled} />
            </span>
            <span className="sr-only sm:hidden">H Prakash Florist, back to top</span>
          </a>

          {/* Desktop search pill */}
          <button
            type="button"
            onClick={() => openSearch()}
            className={cn(
              'hidden min-w-[300px] items-center gap-3 rounded-full border px-5 py-2.5 text-left text-sm transition-colors duration-500 lg:flex xl:min-w-[380px]',
              light
                ? 'border-ivory/35 bg-ivory/10 text-ivory/85 backdrop-blur-md hover:bg-ivory/15'
                : 'border-burgundy/15 bg-cream/60 text-charcoal/70 hover:border-burgundy/30',
            )}
          >
            <Search aria-hidden className="size-4" strokeWidth={1.5} />
            <span>Search roses, garlands, mandap décor…</span>
          </button>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => openSearch()}
              className={cn('icon-btn lg:hidden', light ? 'text-ivory hover:bg-ivory/10' : 'text-burgundy hover:bg-burgundy/5')}
              aria-label="Search products"
            >
              <Search className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className={cn('icon-btn relative max-sm:hidden', light ? 'text-ivory hover:bg-ivory/10' : 'text-burgundy hover:bg-burgundy/5')}
              aria-label={`Wishlist, ${wishlist.length} item${wishlist.length === 1 ? '' : 's'}`}
            >
              <Heart className="size-5" strokeWidth={1.5} />
              <CountBadge count={wishlist.length} solid={solid} />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className={cn('icon-btn relative', light ? 'text-ivory hover:bg-ivory/10' : 'text-burgundy hover:bg-burgundy/5')}
              aria-label={`Shopping bag, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              <CountBadge count={cartCount} solid={solid} />
            </button>
            <button
              type="button"
              onClick={() => openEnquiry()}
              className={cn('btn ml-2 !min-h-11 !px-5 !text-[0.66rem] max-md:hidden', light ? 'btn-gold' : 'btn-primary')}
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navigation + mega menus */}
      <div
        ref={navRef}
        className="relative hidden lg:block"
        onPointerLeave={(e) => e.pointerType === 'mouse' && scheduleClose()}
        onPointerEnter={cancelClose}
        onKeyDown={onNavKeyDown}
        onBlur={onNavBlur}
      >
        <nav aria-label="Main" className={cn('border-t transition-colors duration-500', light ? 'border-ivory/15' : 'border-burgundy/8')}>
          <ul className="container-luxe flex h-12 items-stretch justify-center gap-1 xl:gap-3">
            {navigation.map((item) => {
              const isOpen = active === item.id;
              const base = cn(
                'relative flex h-full items-center gap-1 px-2.5 text-[0.8rem] tracking-[0.06em] transition-colors duration-300 xl:px-3 xl:text-[0.84rem]',
                light ? 'text-ivory/90 hover:text-ivory' : 'text-charcoal/80 hover:text-burgundy',
                isOpen && (light ? 'text-ivory' : 'text-burgundy'),
              );
              const underline = (
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-2.5 bottom-0 h-px origin-left bg-gold transition-transform duration-500 ease-luxe xl:inset-x-3',
                    isOpen ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              );
              if (!item.menu) {
                return (
                  <li key={item.id} onPointerEnter={(e) => e.pointerType === 'mouse' && scheduleClose()}>
                    <ActionLink action={item.action} onDone={closeNow} className={cn(base, 'group')}>
                      {item.label}
                      <span aria-hidden className="absolute inset-x-2.5 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 ease-luxe group-hover:scale-x-100 xl:inset-x-3" />
                    </ActionLink>
                  </li>
                );
              }
              const panelId = `mega-${item.id}`;
              return (
                <li key={item.id} onPointerEnter={(e) => e.pointerType === 'mouse' && open(item.id)}>
                  <button
                    ref={(el) => {
                      triggerRefs.current[item.id] = el;
                    }}
                    type="button"
                    className={base}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => (isOpen ? closeNow() : open(item.id))}
                    onFocus={(e) => {
                      // Open on keyboard focus (focus-visible), not on mouse click focus.
                      if (!suppressFocusOpen.current && e.currentTarget.matches(':focus-visible')) open(item.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        open(item.id);
                        requestAnimationFrame(() =>
                          document.getElementById(panelId)?.querySelector<HTMLElement>('a,button')?.focus(),
                        );
                      }
                    }}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn('size-3.5 opacity-70 transition-transform duration-300', isOpen && 'rotate-180')}
                      strokeWidth={1.5}
                    />
                    {underline}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={`${item.label} menu`}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                        className="absolute inset-x-0 top-full max-h-[calc(100dvh-8.5rem)] overflow-y-auto border-t border-burgundy/8 bg-ivory shadow-[0_40px_80px_-40px_rgba(75,15,28,0.45)]"
                      >
                        <MegaMenuPanel menu={item.menu} label={item.label} onNavigate={closeNow} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
