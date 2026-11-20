'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { eventShowcase } from '@/data/content';
import type { GalleryItem } from '@/data/gallery';
import { useActions } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const lightboxItems: GalleryItem[] = eventShowcase.map((e) => ({
  id: e.galleryId,
  title: e.title,
  image: e.image,
  category: 'events',
  enquiry: e.eventType,
}));

export function EventShowcase() {
  const { openLightbox, openEnquiry } = useActions();
  return (
    <section id="events" aria-labelledby="events-title" className="bg-ivory py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          id="events-title"
          eyebrow="Event Decorations"
          title={
            <>
              Every Celebration Deserves Something <em className="text-wine">Extraordinary</em>
            </>
          }
          description="Birthdays, engagements, corporate evenings and festive days, each styled in flowers around your theme."
        />

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {eventShowcase.map((event, i) => (
            <li key={event.title}>
              <Reveal delay={(i % 3) * 0.08} className="group">
                <button
                  type="button"
                  onClick={() => openLightbox(lightboxItems, i)}
                  className="relative block aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-cream"
                  aria-label={`Explore designs: ${event.title}`}
                  aria-haspopup="dialog"
                >
                  <Photo
                    src={event.image}
                    alt=""
                    sizes="(min-width: 1440px) 440px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                    className="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.08]"
                  />
                  <span className="absolute inset-0 bg-burgundy-950/0 transition-colors duration-700 group-hover:bg-burgundy-950/30" />
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ivory/95 px-5 py-3 text-[0.66rem] uppercase tracking-[0.18em] text-burgundy shadow-lg transition-all duration-500 can-hover:translate-y-[-30%] can-hover:opacity-0 can-hover:group-hover:-translate-y-1/2 can-hover:group-hover:opacity-100 max-[1023px]:hidden">
                    <Sparkles aria-hidden className="size-3.5" strokeWidth={1.5} /> Explore Designs
                  </span>
                  <span className="absolute left-4 top-4 rounded-full bg-ivory/90 px-3 py-1 font-serif text-sm italic text-burgundy backdrop-blur">
                    0{i + 1}
                  </span>
                </button>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-deep">{event.eventType}</p>
                    <h3 className="mt-1.5 font-serif text-[1.65rem] leading-tight text-burgundy">{event.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{event.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  <button
                    type="button"
                    onClick={() => openLightbox(lightboxItems, i)}
                    className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-burgundy"
                    aria-haspopup="dialog"
                  >
                    <span className="link-underline">Explore Designs</span>
                    <ArrowRight aria-hidden className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </button>
                  <button
                    type="button"
                    onClick={() => openEnquiry(event.eventType)}
                    className="link-underline text-[0.7rem] uppercase tracking-[0.18em] text-gold-deep"
                    aria-haspopup="dialog"
                  >
                    Enquire
                  </button>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
