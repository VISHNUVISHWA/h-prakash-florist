'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Eye, Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/products';
import { useActions, useShop } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { cn, formatINR } from '@/lib/utils';

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { openQuickView, addToCart, toggleWishlist } = useActions();
  const { wishlist } = useShop();
  const saved = wishlist.includes(product.id);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <article className="group" id={`product-${product.id}`}>
      <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-cream">
        <button
          type="button"
          onClick={() => openQuickView(product.id)}
          className="absolute inset-0 block"
          aria-label={`Quick view: ${product.name}`}
          aria-haspopup="dialog"
        >
          <Photo
            src={product.image}
            alt={`${product.name}: ${product.description}`}
            sizes="(min-width: 1440px) 330px, (min-width: 1024px) 23vw, 48vw"
            priority={priority}
            className="transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.08]"
          />
          <span className="absolute inset-0 bg-burgundy-950/0 transition-colors duration-700 group-hover:bg-burgundy-950/10" />
        </button>

        {product.badge && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ivory/92 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-burgundy shadow-sm backdrop-blur md:left-4 md:top-4 md:text-[0.62rem]">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={cn(
            'icon-btn absolute right-2 top-2 !size-10 bg-ivory/92 shadow-sm backdrop-blur md:right-3 md:top-3',
            saved ? 'text-wine' : 'text-burgundy hover:text-wine',
          )}
        >
          <motion.span key={String(saved)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
            <Heart className="size-[1.1rem]" strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
          </motion.span>
        </button>

        {/* Quick actions — revealed on hover for pointer devices, always visible on touch */}
        <div className="absolute inset-x-2 bottom-2 flex gap-2 transition-all duration-500 ease-luxe md:inset-x-3 md:bottom-3 can-hover:translate-y-3 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-within:translate-y-0 can-hover:group-focus-within:opacity-100">
          <button
            type="button"
            onClick={() => openQuickView(product.id)}
            className="icon-btn !size-10 shrink-0 bg-ivory text-burgundy shadow-sm hover:bg-cream md:!size-11"
            aria-label={`Open quick view for ${product.name}`}
            aria-haspopup="dialog"
          >
            <Eye className="size-[1.1rem]" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              addToCart(product.id);
              setAdded(true);
            }}
            className="relative flex h-10 flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-burgundy text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ivory shadow-sm transition-colors hover:bg-wine md:h-11 md:text-[0.66rem]"
            aria-label={`Add to bag: ${product.name}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span key="added" className="flex items-center gap-1.5" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                  <Check aria-hidden className="size-4" strokeWidth={1.8} /> Added
                </motion.span>
              ) : (
                <motion.span key="add" className="flex items-center gap-1.5" initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}>
                  <ShoppingBag aria-hidden className="size-4 max-[380px]:hidden" strokeWidth={1.5} /> Add to bag
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="mt-4 px-0.5">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">{product.category}</p>
        <h3 className="mt-1.5 font-serif text-[1.2rem] leading-tight text-burgundy md:text-[1.4rem]">
          <button type="button" onClick={() => openQuickView(product.id)} className="link-underline text-left" aria-haspopup="dialog">
            {product.name}
          </button>
        </h3>
        <p className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[0.95rem] text-charcoal">{formatINR(product.price)}</span>
          <span className="text-[0.6rem] uppercase tracking-[0.14em] text-charcoal/65">Demo price</span>
        </p>
      </div>
    </article>
  );
}
