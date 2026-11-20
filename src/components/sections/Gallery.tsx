'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Expand } from 'lucide-react';
import { galleryFilters, galleryItems } from '@/data/gallery';
import { useActions, useUI } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DemoNote } from '@/components/ui/DemoNote';
import { cn } from '@/lib/utils';

const INITIAL = 12;

// Repeating rhythm of tile proportions for a column-masonry feel (CSS columns never leave gaps).
const shapes = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[5/4]', 'aspect-[3/4]', 'aspect-[4/3]'];
const tileShape = (i: number) => shapes[i % shapes.length];

export function Gallery() {
  const { galleryFilter } = useUI();
  const { setGalleryFilter, openLightbox } = useActions();
  const [expanded, setExpanded] = useState(false);
  const filtered = galleryFilter === 'all' ? galleryItems : galleryItems.filter((g) => g.category === galleryFilter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL);

  useEffect(() => setExpanded(false), [galleryFilter]);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          id="gallery-title"
          eyebrow="Inspiration Gallery"
          title={
            <>
              A Glimpse Into Our <em className="text-wine">Floral Inspirations</em>
            </>
          }
        >
          <DemoNote className="mt-5 justify-center">
            Demo inspiration photography. These images are illustrative and are not completed projects by H Prakash Florist.
          </DemoNote>
        </SectionHeading>

        <div role="group" aria-label="Filter gallery" className="-mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none md:mx-0 md:justify-center md:px-0">
          {galleryFilters.map((f) => {
            const active = galleryFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setGalleryFilter(f.id)}
                className={cn(
                  'relative shrink-0 rounded-full border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300',
                  active ? 'border-burgundy text-ivory' : 'border-burgundy/15 text-charcoal/75 hover:border-burgundy/40 hover:text-burgundy',
                )}
              >
                {active && <motion.span layoutId="gallery-chip" className="absolute inset-0 rounded-full bg-burgundy" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {filtered.length} images
        </p>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={`${galleryFilter}-${expanded}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4"
          >
            {visible.map((item, i) => (
              <li key={item.id} className="mb-3 break-inside-avoid md:mb-4">
                <button
                  type="button"
                  onClick={() => openLightbox(filtered, i)}
                  className={cn('group relative block w-full overflow-hidden rounded-[1.1rem] bg-cream text-left', tileShape(i))}
                  aria-label={`Open image: ${item.title}`}
                  aria-haspopup="dialog"
                >
                  <Photo
                    src={item.image}
                    alt=""
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    quality={80}
                    className="transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.08]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <span className="absolute inset-x-3 bottom-3 flex translate-y-2 items-end justify-between gap-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 md:inset-x-4 md:bottom-4">
                    <span className="font-serif text-lg leading-tight text-ivory md:text-xl">{item.title}</span>
                    <Expand aria-hidden className="size-4 shrink-0 text-ivory" strokeWidth={1.4} />
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {filtered.length > INITIAL && (
          <div className="mt-12 text-center">
            <button type="button" onClick={() => setExpanded((e) => !e)} className="btn btn-outline" aria-expanded={expanded}>
              {expanded ? 'Show Fewer' : `View All ${filtered.length} Inspirations`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
