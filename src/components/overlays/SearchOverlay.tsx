'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { products } from '@/data/products';
import type { SiteAction } from '@/lib/actions';
import { useActions, useUI } from '@/components/providers/StoreProvider';
import { Dialog, Modal } from '@/components/ui/Dialogs';
import { Photo } from '@/components/ui/Photo';
import { formatINR } from '@/lib/utils';

const suggestions = ['Roses', 'Jasmine', 'Garlands', 'Lilies', 'Orchids', 'Wedding', 'Birthday', 'Marigold'];

const services: { label: string; keywords: string; action: SiteAction }[] = [
  { label: 'Wedding Mandap & Stage Decorations', keywords: 'wedding mandap stage reception backdrop marriage', action: { kind: 'scroll', to: '#weddings' } },
  { label: 'Birthday & Party Decorations', keywords: 'birthday party kids balloon', action: { kind: 'scroll', to: '#events' } },
  { label: 'Engagement & Baby Shower Décor', keywords: 'engagement baby shower naming ceremony', action: { kind: 'scroll', to: '#events' } },
  { label: 'Corporate Floral Styling', keywords: 'corporate office event conference launch', action: { kind: 'enquiry', eventType: 'Corporate Event' } },
  { label: 'Floral Installations & Arches', keywords: 'arch entrance ceiling installation aisle', action: { kind: 'gallery', filter: 'installations' } },
  { label: 'Festival & Pooja Flowers', keywords: 'festival pooja diwali pongal marigold garland temple', action: { kind: 'products', filter: 'festivals' } },
];

const norm = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s]/g, '');

export function SearchOverlay() {
  const { search } = useUI();
  const { closeSearch, openQuickView, runAction } = useActions();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search.open) setQuery(search.query);
  }, [search.open, search.query]);

  const q = norm(query.trim());
  const terms = q.split(/\s+/).filter(Boolean);
  const productResults = useMemo(() => {
    if (!terms.length) return [];
    return products.filter((p) => {
      const hay = norm([p.name, p.category, p.description, ...p.tags].join(' '));
      return terms.every((t) => hay.includes(t.replace(/s$/, '')));
    });
  }, [terms.join(' ')]); // eslint-disable-line react-hooks/exhaustive-deps
  const serviceResults = useMemo(() => {
    if (!terms.length) return [];
    return services.filter((s) => terms.some((t) => norm(s.label + ' ' + s.keywords).includes(t.replace(/s$/, ''))));
  }, [terms.join(' ')]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal open={search.open} onOpenChange={(o) => !o && closeSearch()} title="Search" variant="top" showClose={false}>
      <div className="container-luxe py-6 md:py-10">
        <div className="flex items-center gap-3 border-b border-burgundy/20 pb-4 focus-within:border-burgundy">
          <Search aria-hidden className="size-6 shrink-0 text-gold-deep" strokeWidth={1.4} />
          <label htmlFor="site-search" className="sr-only">
            Search flowers, bouquets and decorations
          </label>
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            autoFocus
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roses, garlands, wedding décor…"
            className="w-full bg-transparent font-serif text-2xl text-burgundy outline-none placeholder:text-charcoal/35 focus-visible:shadow-none md:text-4xl [&::-webkit-search-cancel-button]:hidden"
            style={{ outline: 'none', boxShadow: 'none' }}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="icon-btn shrink-0 text-charcoal/70 hover:bg-burgundy/5" aria-label="Clear search">
              <X className="size-5" strokeWidth={1.4} />
            </button>
          )}
          <Dialog.Close className="shrink-0 rounded-full border border-burgundy/20 px-4 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-burgundy hover:bg-burgundy hover:text-ivory">
            Close
          </Dialog.Close>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[0.66rem] uppercase tracking-[0.18em] text-charcoal/70">Popular:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="rounded-full border border-burgundy/15 px-3.5 py-1.5 text-xs text-charcoal/80 transition-colors hover:border-burgundy hover:text-burgundy"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 max-h-[60dvh] overflow-y-auto pb-2" aria-live="polite">
          {!terms.length ? (
            <div>
              <p className="eyebrow text-gold-deep">Shop by category</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Bouquets', filter: 'bouquets' },
                  { label: 'Garlands', filter: 'garlands' },
                  { label: 'Baskets & Boxes', filter: 'gifting' },
                  { label: 'Wedding Essentials', filter: 'wedding-essentials' },
                ].map((c) => (
                  <button
                    key={c.filter}
                    type="button"
                    onClick={() => runAction({ kind: 'products', filter: c.filter })}
                    className="group flex items-center justify-between rounded-xl bg-cream px-4 py-4 text-left font-serif text-lg text-burgundy transition-colors hover:bg-sand"
                  >
                    {c.label}
                    <ArrowUpRight aria-hidden className="size-4 text-gold-deep transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          ) : productResults.length === 0 && serviceResults.length === 0 ? (
            <div className="py-10 text-center">
              <p className="display text-3xl text-burgundy">No results for “{query.trim()}”</p>
              <p className="mt-2 text-sm text-charcoal/65">Try another flower or occasion, or ask the florist for something custom.</p>
              <button type="button" className="btn btn-primary mt-6" onClick={() => runAction({ kind: 'enquiry', eventType: 'Custom Bouquet / Flower Order', note: `Looking for: ${query.trim()}` })}>
                Request a Custom Arrangement
              </button>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="eyebrow text-gold-deep">
                  Products <span className="text-charcoal/70">({productResults.length})</span>
                </p>
                {productResults.length ? (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {productResults.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => openQuickView(p.id)}
                          className="group flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-cream"
                        >
                          <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                            <Photo src={p.image} alt="" sizes="64px" quality={75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[0.6rem] uppercase tracking-[0.18em] text-gold-deep">{p.category}</span>
                            <span className="block truncate font-serif text-lg text-burgundy">{p.name}</span>
                            <span className="text-xs text-charcoal/70">{formatINR(p.price)} · demo price</span>
                          </span>
                          <ArrowUpRight aria-hidden className="size-4 shrink-0 text-gold-deep opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-charcoal/70">No matching demo products.</p>
                )}
              </div>
              <div className="lg:col-span-4">
                <p className="eyebrow text-gold-deep">Decoration services</p>
                {serviceResults.length ? (
                  <ul className="mt-4 space-y-1">
                    {serviceResults.map((s) => (
                      <li key={s.label}>
                        <button type="button" onClick={() => runAction(s.action)} className="group flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-sm text-charcoal/85 hover:bg-cream hover:text-burgundy">
                          {s.label}
                          <ArrowUpRight aria-hidden className="size-4 shrink-0 text-gold-deep" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-charcoal/70">No matching services.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
