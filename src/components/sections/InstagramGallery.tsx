'use client';

import { Expand } from 'lucide-react';
import { moments } from '@/data/content';
import type { GalleryItem } from '@/data/gallery';
import { useActions } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { InstagramIcon } from '@/components/ui/BrandIcons';
import { SectionHeading } from '@/components/ui/SectionHeading';

const items: GalleryItem[] = moments.map((m, i) => ({ id: `moment-${i}`, title: m.label, image: m.image, category: 'bouquets' }));

export function InstagramGallery() {
  const { openLightbox, toast } = useActions();
  return (
    <section id="moments" aria-labelledby="moments-title" className="bg-cream py-24 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          id="moments-title"
          eyebrow="Floral Moodboard"
          title={
            <>
              Blooming <em className="text-wine">Moments</em>
            </>
          }
          description="A moodboard of floral moments for inspiration. These are demo images, not social media posts."
        />
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-1.5 px-1.5 sm:grid-cols-3 lg:grid-cols-6">
        {moments.map((m, i) => (
          <li key={m.label}>
            <Reveal delay={i * 0.06}>
              <button
                type="button"
                onClick={() => openLightbox(items, i)}
                className="group relative block aspect-square w-full overflow-hidden bg-sand"
                aria-label={`View larger: ${m.label}`}
                aria-haspopup="dialog"
              >
                <Photo
                  src={m.image}
                  alt=""
                  sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw"
                  quality={75}
                  className="transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.1]"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-burgundy/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-burgundy/55 group-hover:opacity-100 group-focus-visible:bg-burgundy/55 group-focus-visible:opacity-100">
                  <Expand aria-hidden className="size-5" strokeWidth={1.4} />
                  <span className="font-serif text-lg">{m.label}</span>
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => toast('The official Instagram account will be linked once it has been verified with the business.', 'info')}
          className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-burgundy"
        >
          <InstagramIcon className="size-4" />
          <span className="link-underline">Social profile coming soon</span>
        </button>
      </div>
    </section>
  );
}
