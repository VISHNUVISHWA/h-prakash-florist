'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { productById } from '@/data/products';
import { useActions, useShop, useUI } from '@/components/providers/StoreProvider';
import { Sheet } from '@/components/ui/Dialogs';
import { Photo } from '@/components/ui/Photo';
import { formatINR } from '@/lib/utils';

export function WishlistDrawer() {
  const { wishlistOpen } = useUI();
  const { wishlist } = useShop();
  const { setWishlistOpen, toggleWishlist, addToCart, runAction, openQuickView } = useActions();

  return (
    <Sheet
      open={wishlistOpen}
      onOpenChange={setWishlistOpen}
      title="Wishlist"
      description={wishlist.length ? `${wishlist.length} saved design${wishlist.length === 1 ? '' : 's'}` : 'Save designs you love'}
    >
      {wishlist.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-cream text-gold-deep">
            <Heart aria-hidden className="size-8" strokeWidth={1.1} />
          </span>
          <p className="display mt-6 text-3xl text-burgundy">Nothing saved yet</p>
          <p className="mt-2 text-sm text-charcoal/65">Tap the heart on any design to keep it here for later.</p>
          <button type="button" className="btn btn-primary mt-8" onClick={() => runAction({ kind: 'products', filter: 'all' })}>
            Discover Designs
          </button>
        </div>
      ) : (
        <ul className="flex-1 divide-y divide-burgundy/10 overflow-y-auto px-5 sm:px-7">
          <AnimatePresence initial={false}>
            {wishlist.map((id) => {
              const p = productById(id);
              if (!p) return null;
              return (
                <motion.li key={id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="flex gap-4 py-5">
                  <button
                    type="button"
                    onClick={() => {
                      setWishlistOpen(false);
                      openQuickView(p.id);
                    }}
                    className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-cream"
                    aria-label={`View ${p.name}`}
                  >
                    <Photo src={p.image} alt="" sizes="96px" quality={75} />
                  </button>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-gold-deep">{p.category}</p>
                        <p className="mt-0.5 font-serif text-lg leading-tight text-burgundy">{p.name}</p>
                        <p className="mt-1 text-xs text-charcoal/70">{formatINR(p.price)} (demo)</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(p.id)}
                        className="icon-btn -mr-2 -mt-2 !size-9 text-charcoal/70 hover:bg-burgundy/5 hover:text-wine"
                        aria-label={`Remove ${p.name} from wishlist`}
                      >
                        <X className="size-4" strokeWidth={1.4} />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(p.id);
                        toggleWishlist(p.id);
                      }}
                      className="mt-auto inline-flex w-fit items-center gap-2 pt-3 text-[0.68rem] uppercase tracking-[0.16em] text-burgundy"
                    >
                      <ShoppingBag aria-hidden className="size-3.5" strokeWidth={1.5} />
                      <span className="link-underline">Move to bag</span>
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      )}
    </Sheet>
  );
}
