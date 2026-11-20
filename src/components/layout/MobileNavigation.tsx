'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Heart, MapPin, Search, ShoppingBag } from 'lucide-react';
import { navigation } from '@/data/navigation';
import { useActions, useShop, useUI } from '@/components/providers/StoreProvider';
import { ActionLink } from '@/components/ui/ActionLink';
import { Photo } from '@/components/ui/Photo';
import { Sheet } from '@/components/ui/Dialogs';

export function MobileNavigation() {
  const { mobileNavOpen } = useUI();
  const { setMobileNavOpen, runAction, openEnquiry } = useActions();
  const { cartCount, wishlist } = useShop();

  return (
    <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen} title="Menu" side="left" className="max-w-[400px]">
      <div className="flex-1 overflow-y-auto px-5 pb-6 sm:px-7">
        <button
          type="button"
          onClick={() => runAction({ kind: 'search' })}
          className="mt-5 flex w-full items-center gap-3 rounded-full border border-burgundy/15 bg-cream/70 px-5 py-3 text-left text-sm text-charcoal/70"
        >
          <Search aria-hidden className="size-4" strokeWidth={1.5} />
          Search flowers & décor…
        </button>

        <nav aria-label="Mobile" className="mt-4">
          <Accordion.Root type="single" collapsible className="divide-y divide-burgundy/10">
            {navigation.map((item) =>
              item.menu ? (
                <Accordion.Item key={item.id} value={item.id}>
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left font-serif text-[1.45rem] text-burgundy">
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className="size-5 text-gold-deep transition-transform duration-300 group-data-[state=open]:rotate-180"
                        strokeWidth={1.4}
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <div className="space-y-5 pb-6">
                      <p className="text-sm leading-relaxed text-charcoal/70">{item.menu.intro.description}</p>
                      {item.menu.columns.map((col) => (
                        <div key={col.title}>
                          <p className="eyebrow !text-[0.6rem] text-gold-deep">{col.title}</p>
                          <ul className="mt-2 grid grid-cols-2 gap-x-4">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <ActionLink action={link.action} className="block py-2 text-left text-[0.92rem] text-charcoal/85">
                                  {link.label}
                                </ActionLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {item.menu.tiles && (
                        <ul className="grid grid-cols-2 gap-3">
                          {item.menu.tiles.map((tile) => (
                            <li key={tile.label}>
                              <ActionLink action={tile.action} className="relative block aspect-[4/3] overflow-hidden rounded-xl">
                                <Photo src={tile.image} alt="" sizes="180px" quality={75} />
                                <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 to-transparent" />
                                <span className="absolute inset-x-3 bottom-2 font-serif text-base leading-tight text-ivory">{tile.label}</span>
                              </ActionLink>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.menu.features && (
                        <div className="flex gap-3 overflow-x-auto scrollbar-none">
                          {item.menu.features.map((f) => (
                            <ActionLink key={f.title} action={f.action} className="relative block aspect-[4/3] w-[70%] shrink-0 overflow-hidden rounded-xl text-left">
                              <Photo src={f.image} alt="" sizes="260px" quality={75} />
                              <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 to-transparent" />
                              <span className="absolute inset-x-3 bottom-2.5 font-serif text-lg leading-tight text-ivory">{f.title}</span>
                            </ActionLink>
                          ))}
                        </div>
                      )}
                      <ActionLink action={item.menu.intro.cta.action} className="btn btn-outline !min-h-11 w-full !text-[0.66rem]">
                        {item.menu.intro.cta.label}
                      </ActionLink>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ) : (
                <div key={item.id}>
                  <ActionLink action={item.action} className="block w-full py-4 text-left font-serif text-[1.45rem] text-burgundy">
                    {item.label}
                  </ActionLink>
                </div>
              ),
            )}
          </Accordion.Root>
        </nav>
      </div>

      <div className="space-y-3 border-t border-burgundy/10 bg-cream/60 px-5 py-5 sm:px-7">
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => runAction({ kind: 'wishlist' })} className="btn btn-outline !min-h-11 !px-3 !text-[0.64rem]">
            <Heart aria-hidden className="size-4" strokeWidth={1.5} /> Wishlist ({wishlist.length})
          </button>
          <button type="button" onClick={() => runAction({ kind: 'cart' })} className="btn btn-outline !min-h-11 !px-3 !text-[0.64rem]">
            <ShoppingBag aria-hidden className="size-4" strokeWidth={1.5} /> Bag ({cartCount})
          </button>
        </div>
        <button type="button" onClick={() => openEnquiry()} className="btn btn-primary w-full">
          Get a Quote
        </button>
        <p className="flex items-center justify-center gap-1.5 pt-1 text-xs text-charcoal/70">
          <MapPin aria-hidden className="size-3.5 text-gold-deep" strokeWidth={1.5} /> Ekkaduthangal, Chennai
        </p>
      </div>
    </Sheet>
  );
}
