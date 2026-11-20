'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Flower2, X } from 'lucide-react';
import { filterLabels, filterProducts, shopChips } from '@/data/products';
import { useActions, useUI } from '@/components/providers/StoreProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DemoNote } from '@/components/ui/DemoNote';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

export function FeaturedProducts() {
  const { productFilter } = useUI();
  const { setProductFilter, openEnquiry } = useActions();
  const list = filterProducts(productFilter);
  const isChip = (shopChips as readonly string[]).includes(productFilter);
  const label = filterLabels[productFilter] ?? productFilter;

  return (
    <section id="shop" aria-labelledby="shop-title" className="relative bg-cream py-24 md:py-32">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="shop-title"
            align="left"
            eyebrow="Featured Flowers"
            title={
              <>
                Handpicked Blooms, <em className="text-wine">Made for You</em>
              </>
            }
            description="Bouquets, garlands and arrangements, each one composed by hand. Tap any design for a closer look."
            className="max-w-2xl"
          />
          <DemoNote className="max-w-xs lg:mb-2">All prices are illustrative demo placeholders, not confirmed prices from H Prakash Florist.</DemoNote>
        </div>

        {/* Filters */}
        <div className="mt-12 flex items-center gap-3 border-b border-burgundy/10 pb-5">
          <div role="group" aria-label="Filter products" className="-mx-4 flex flex-1 gap-2 overflow-x-auto px-4 scrollbar-none md:mx-0 md:px-0">
            {shopChips.map((chip) => {
              const active = productFilter === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setProductFilter(chip)}
                  className={cn(
                    'relative shrink-0 rounded-full px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300',
                    active ? 'text-ivory' : 'text-charcoal/75 hover:text-burgundy',
                  )}
                >
                  {active && (
                    <motion.span layoutId="product-chip" className="absolute inset-0 -z-0 rounded-full bg-burgundy" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">{filterLabels[chip]}</span>
                </button>
              );
            })}
            {!isChip && (
              <button
                type="button"
                onClick={() => setProductFilter('all')}
                className="flex shrink-0 items-center gap-2 rounded-full bg-burgundy px-4 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] text-ivory"
                aria-label={`Clear filter: ${label}`}
              >
                {label}
                <X aria-hidden className="size-3.5" />
              </button>
            )}
          </div>
          <p className="hidden shrink-0 text-xs text-charcoal/70 md:block" aria-live="polite">
            {list.length} design{list.length === 1 ? '' : 's'}
          </p>
        </div>

        {list.length > 0 ? (
          <motion.ul layout className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <div className="mx-auto mt-14 max-w-lg rounded-[1.5rem] border border-dashed border-gold/60 bg-ivory px-8 py-14 text-center">
            <Flower2 aria-hidden className="mx-auto size-9 text-gold-deep" strokeWidth={1.1} />
            <p className="display mt-4 text-3xl text-burgundy">No demo designs for “{label}” yet</p>
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              Availability varies by season. Ask the florist about {label.toLowerCase()} for your occasion, or browse the full collection.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" className="btn btn-primary" onClick={() => openEnquiry('Custom Bouquet / Flower Order', `Interested in: ${label}`)}>
                Request {label}
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setProductFilter('all')}>
                View All
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
