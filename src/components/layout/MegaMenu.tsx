'use client';

import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import type { MegaMenuData } from '@/data/navigation';
import { productById } from '@/data/products';
import { ActionLink } from '@/components/ui/ActionLink';
import { Photo } from '@/components/ui/Photo';
import { useActions } from '@/components/providers/StoreProvider';
import { cn, formatINR } from '@/lib/utils';

export function MegaMenuPanel({ menu, label, onNavigate }: { menu: MegaMenuData; label: string; onNavigate: () => void }) {
  const { addToCart } = useActions();
  const hasTiles = !!menu.tiles?.length;
  const featureCount = menu.features?.length ?? 0;

  return (
    <div className="container-luxe">
      <div className="grid grid-cols-12 gap-8 py-9 xl:gap-12 xl:py-11">
        {/* Intro */}
        <div className="col-span-3 flex flex-col border-r border-burgundy/10 pr-8 xl:pr-10">
          <p className="eyebrow text-gold-deep">{menu.intro.eyebrow}</p>
          <p className="display mt-4 text-[2rem] leading-[1.05] text-burgundy xl:text-[2.35rem]">{menu.intro.title}</p>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{menu.intro.description}</p>
          <div className="mt-auto pt-8">
            <ActionLink action={menu.intro.cta.action} onDone={onNavigate} className="btn btn-primary !min-h-11 !px-6 !text-[0.68rem]">
              <span>{menu.intro.cta.label}</span>
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
            </ActionLink>
          </div>
        </div>

        {hasTiles ? (
          <ul className="col-span-9 grid grid-cols-3 gap-4" aria-label={`${label} categories`}>
            {menu.tiles!.map((tile) => (
              <li key={tile.label}>
                <ActionLink
                  action={tile.action}
                  onDone={onNavigate}
                  className="group relative block aspect-[16/9] overflow-hidden rounded-2xl bg-cream"
                >
                  <Photo
                    src={tile.image}
                    alt=""
                    sizes="(min-width: 1440px) 340px, 24vw"
                    quality={75}
                    className="transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.07]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 via-burgundy-950/10 to-transparent" />
                  <span className="absolute inset-x-4 bottom-3.5 flex items-center justify-between font-serif text-xl text-ivory">
                    {tile.label}
                    <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </ActionLink>
              </li>
            ))}
          </ul>
        ) : (
          <>
            {/* Link columns + quick shop */}
            <div className={cn('flex flex-col', featureCount >= 2 ? 'col-span-5' : 'col-span-6')}>
              <div className={cn('grid gap-8', menu.columns.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
                {menu.columns.map((col) => (
                  <div key={col.title}>
                    <p className="eyebrow !text-[0.62rem] text-gold-deep">{col.title}</p>
                    <ul className="mt-4 space-y-[0.55rem]">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <ActionLink
                            action={link.action}
                            onDone={onNavigate}
                            className="group inline-flex items-center gap-2 text-left text-[0.92rem] text-charcoal/85 transition-colors hover:text-burgundy"
                          >
                            <span className="link-underline">{link.label}</span>
                            {link.note && (
                              <span className="rounded-full border border-gold/60 px-1.5 py-px text-[0.58rem] uppercase tracking-[0.14em] text-gold-deep">
                                {link.note}
                              </span>
                            )}
                          </ActionLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {menu.quickShop && (
                <div className="mt-8 border-t border-burgundy/10 pt-6">
                  <p className="eyebrow !text-[0.62rem] text-gold-deep">Quick add · demo prices</p>
                  <ul className="mt-4 grid grid-cols-3 gap-3">
                    {menu.quickShop.map((id) => {
                      const product = productById(id);
                      if (!product) return null;
                      return (
                        <li key={id} className="flex items-center gap-3 rounded-xl bg-cream/70 p-2 pr-3">
                          <span className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                            <Photo src={product.image} alt="" sizes="48px" quality={75} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[0.8rem] font-medium text-burgundy">{product.name}</span>
                            <span className="text-xs text-charcoal/65">{formatINR(product.price)}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(id)}
                            className="icon-btn !size-8 shrink-0 bg-burgundy text-ivory hover:bg-wine"
                            aria-label={`Add ${product.name} to bag`}
                          >
                            <Plus className="size-4" strokeWidth={1.6} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* Feature image cards */}
            <div className={cn('grid gap-4', featureCount >= 2 ? 'col-span-4 grid-cols-2' : 'col-span-3')}>
              {menu.features?.map((f) => (
                <ActionLink key={f.title} action={f.action} onDone={onNavigate} className="group flex flex-col text-left">
                  <span className={cn('relative block overflow-hidden rounded-2xl bg-cream', featureCount >= 2 ? 'aspect-[4/5]' : 'aspect-[4/5]')}>
                    <Photo
                      src={f.image}
                      alt=""
                      sizes="(min-width: 1440px) 320px, 22vw"
                      quality={80}
                      className="transition-transform duration-[1.2s] ease-luxe group-hover:scale-[1.06]"
                    />
                    {f.tag && (
                      <span className="absolute left-3 top-3 rounded-full bg-ivory/90 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-burgundy backdrop-blur">
                        {f.tag}
                      </span>
                    )}
                  </span>
                  <span className="mt-3 font-serif text-[1.3rem] leading-tight text-burgundy">{f.title}</span>
                  <span className="mt-1 text-xs text-charcoal/65">{f.description}</span>
                  {f.cta && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-gold-deep">
                      <span className="link-underline">{f.cta}</span>
                      <ArrowRight aria-hidden className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                    </span>
                  )}
                </ActionLink>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
