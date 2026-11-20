'use client';

import { useEffect, useState } from 'react';
import { Check, Heart, Minus, Plus, ShoppingBag } from 'lucide-react';
import { productById } from '@/data/products';
import { useActions, useShop, useUI } from '@/components/providers/StoreProvider';
import { Modal } from '@/components/ui/Dialogs';
import { Photo } from '@/components/ui/Photo';
import { DemoNote } from '@/components/ui/DemoNote';
import { cn, formatINR } from '@/lib/utils';

export function ProductQuickView() {
  const { quickViewId } = useUI();
  const { wishlist } = useShop();
  const { closeQuickView, addToCart, toggleWishlist, setCartOpen, openEnquiry } = useActions();
  const product = quickViewId ? productById(quickViewId) : undefined;
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [quickViewId]);

  const saved = product ? wishlist.includes(product.id) : false;

  return (
    <Modal open={!!product} onOpenChange={(o) => !o && closeQuickView()} title={product?.name ?? 'Product'} description={product?.description}>
      {product && (
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-cream md:aspect-auto md:min-h-[560px]">
            <Photo src={product.image} alt={product.name} sizes="(min-width: 1024px) 512px, (min-width: 768px) 50vw, 100vw" quality={90} />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-ivory/92 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-burgundy backdrop-blur">
                {product.badge}
              </span>
            )}
          </div>
          <div className="flex flex-col p-6 sm:p-8 lg:p-12">
            <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-gold-deep">{product.category}</p>
            <h2 className="display mt-3 pr-10 text-4xl text-burgundy lg:text-5xl">{product.name}</h2>
            <p className="mt-4 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-charcoal">{formatINR(product.price)}</span>
              <span className="rounded-full border border-gold/60 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-gold-deep">Demo price</span>
            </p>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-charcoal/75">{product.description}</p>
            <ul className="mt-6 space-y-2.5 border-t border-burgundy/10 pt-6">
              {product.details.map((d) => (
                <li key={d} className="flex items-start gap-3 text-sm text-charcoal/80">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="flex h-12 items-center rounded-full border border-burgundy/20" role="group" aria-label="Quantity">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="grid h-full w-11 place-items-center text-burgundy disabled:opacity-30" aria-label="Decrease quantity">
                  <Minus className="size-4" />
                </button>
                <output className="w-8 text-center tabular-nums" aria-live="polite">
                  {qty}
                </output>
                <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} disabled={qty >= 20} className="grid h-full w-11 place-items-center text-burgundy disabled:opacity-30" aria-label="Increase quantity">
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  addToCart(product.id, qty);
                  setAdded(true);
                }}
                className="btn btn-primary flex-1"
              >
                {added ? <Check aria-hidden className="size-4" /> : <ShoppingBag aria-hidden className="size-4" strokeWidth={1.5} />}
                {added ? 'Added to Bag' : 'Add to Bag'}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-pressed={saved}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                className={cn('icon-btn !size-12 border', saved ? 'border-wine bg-wine text-ivory' : 'border-burgundy/20 text-burgundy hover:border-burgundy')}
              >
                <Heart className="size-5" strokeWidth={1.5} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {added && (
              <button
                type="button"
                onClick={() => {
                  closeQuickView();
                  setCartOpen(true);
                }}
                className="link-underline mt-4 w-fit text-[0.7rem] uppercase tracking-[0.18em] text-burgundy"
              >
                View bag →
              </button>
            )}

            <div className="mt-auto space-y-3 pt-8">
              <button type="button" onClick={() => openEnquiry('Custom Bouquet / Flower Order', `Interested in: ${product.name}`)} className="link-underline text-left text-sm text-gold-deep">
                Want it customised? Ask the florist
              </button>
              <DemoNote>Demo product. Images, prices and availability are illustrative and not confirmed by the business.</DemoNote>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
