'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Lock, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { productById } from '@/data/products';
import { useActions, useShop, useUI } from '@/components/providers/StoreProvider';
import { Sheet } from '@/components/ui/Dialogs';
import { Photo } from '@/components/ui/Photo';
import { formatINR } from '@/lib/utils';

export function CartDrawer() {
  const { cartOpen } = useUI();
  const { cart, cartCount, subtotal } = useShop();
  const { setCartOpen, setQty, removeFromCart, runAction, openQuickView } = useActions();
  const [checkoutNotice, setCheckoutNotice] = useState(false);

  return (
    <Sheet
      open={cartOpen}
      onOpenChange={(o) => {
        setCartOpen(o);
        if (!o) setCheckoutNotice(false);
      }}
      title="Your Bag"
      description={cartCount ? `${cartCount} item${cartCount === 1 ? '' : 's'} · demo cart` : 'Demo cart'}
    >
      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="grid size-20 place-items-center rounded-full bg-cream text-gold-deep">
            <ShoppingBag aria-hidden className="size-8" strokeWidth={1.1} />
          </span>
          <p className="display mt-6 text-3xl text-burgundy">Your bag is empty</p>
          <p className="mt-2 text-sm text-charcoal/65">Discover bouquets, garlands and arrangements, all made by hand.</p>
          <button type="button" className="btn btn-primary mt-8" onClick={() => runAction({ kind: 'products', filter: 'all' })}>
            Browse Flowers
          </button>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-burgundy/10 overflow-y-auto px-5 sm:px-7">
            <AnimatePresence initial={false}>
              {cart.map((line) => {
                const p = productById(line.id);
                if (!p) return null;
                return (
                  <motion.li
                    key={line.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    className="flex gap-4 py-5"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false);
                        openQuickView(p.id);
                      }}
                      className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-cream"
                      aria-label={`View ${p.name}`}
                    >
                      <Photo src={p.image} alt="" sizes="96px" quality={75} />
                    </button>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[0.6rem] uppercase tracking-[0.18em] text-gold-deep">{p.category}</p>
                          <p className="mt-0.5 font-serif text-lg leading-tight text-burgundy">{p.name}</p>
                          <p className="mt-1 text-xs text-charcoal/70">{formatINR(p.price)} each (demo)</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(p.id)}
                          className="icon-btn -mr-2 -mt-2 !size-9 text-charcoal/70 hover:bg-burgundy/5 hover:text-wine"
                          aria-label={`Remove ${p.name} from bag`}
                        >
                          <Trash2 className="size-4" strokeWidth={1.4} />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center rounded-full border border-burgundy/15" role="group" aria-label={`Quantity for ${p.name}`}>
                          <button type="button" onClick={() => setQty(p.id, line.qty - 1)} className="grid size-9 place-items-center text-burgundy" aria-label="Decrease quantity">
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(p.id, line.qty + 1)}
                            disabled={line.qty >= 20}
                            className="grid size-9 place-items-center text-burgundy disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <p className="text-sm font-medium tabular-nums text-charcoal">{formatINR(p.price * line.qty)}</p>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          <div className="border-t border-burgundy/10 bg-cream/70 px-5 py-6 sm:px-7">
            <div className="flex items-baseline justify-between">
              <span className="text-sm uppercase tracking-[0.16em] text-charcoal/70">Subtotal</span>
              <span className="font-serif text-3xl text-burgundy tabular-nums">{formatINR(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-charcoal/70">Illustrative demo prices. Taxes and delivery are not calculated.</p>

            <AnimatePresence>
              {checkoutNotice && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                  role="alert"
                >
                  <p className="mt-4 rounded-xl border border-gold/60 bg-ivory p-3 text-sm leading-relaxed text-charcoal/80">
                    <strong className="font-medium text-burgundy">Payment is not enabled in this demo.</strong> To order, please request a quote and the florist can confirm availability and pricing.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 grid gap-3">
              <button type="button" onClick={() => setCheckoutNotice(true)} className="btn btn-primary w-full">
                <Lock aria-hidden className="size-4" strokeWidth={1.5} /> Demo Checkout · Payment Disabled
              </button>
              {checkoutNotice ? (
                <button type="button" onClick={() => runAction({ kind: 'enquiry', eventType: 'Custom Bouquet / Flower Order', note: `Bag: ${cart.map((l) => `${l.qty} × ${productById(l.id)?.name}`).join(', ')}` })} className="btn btn-outline w-full">
                  Request a Quote for This Bag
                </button>
              ) : (
                <button type="button" onClick={() => setCartOpen(false)} className="btn btn-outline w-full">
                  Continue Shopping
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </Sheet>
  );
}
