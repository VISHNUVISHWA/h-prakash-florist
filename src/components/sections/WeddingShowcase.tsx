'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Expand } from 'lucide-react';
import { weddingShowcase } from '@/data/content';
import type { GalleryItem } from '@/data/gallery';
import { useActions } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DemoNote } from '@/components/ui/DemoNote';
import { asset } from '@/lib/base';
import { cn } from '@/lib/utils';

const lightboxItems: GalleryItem[] = [
  { id: 'wedding-hero', title: weddingShowcase.hero.title, image: weddingShowcase.hero.image, category: 'weddings', enquiry: 'Wedding' },
  ...weddingShowcase.tiles.map((t) => ({ id: t.title, title: t.title, image: t.image, category: 'weddings' as const, enquiry: 'Wedding' })),
];

const spanClass = {
  tall: 'row-span-2',
  wide: 'col-span-2',
  base: '',
} as const;

export function WeddingShowcase() {
  const { openEnquiry, openLightbox } = useActions();
  const heroRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['-8%', '8%']);
  const { scrollYProgress: bannerProgress } = useScroll({ target: bannerRef, offset: ['start end', 'end start'] });
  const bannerY = useTransform(bannerProgress, [0, 1], ['-14%', '14%']);

  return (
    <section id="weddings" aria-labelledby="weddings-title" className="relative overflow-hidden bg-burgundy py-24 text-ivory md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: `url(${asset('/assets/decorative/botanical-pattern.svg')})`, backgroundSize: '520px' }}
      />
      <div className="container-luxe relative">
        {/* Split screen */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 xl:col-span-6">
            <SectionHeading
              id="weddings-title"
              tone="dark"
              align="left"
              eyebrow="Wedding Decorations"
              title={
                <>
                  Your Dream Wedding, <em className="text-rose">Beautifully Bloomed</em>
                </>
              }
              description="From timeless traditional ceremonies to modern luxury celebrations, discover floral designs crafted for unforgettable wedding moments."
            />
            <Reveal delay={0.1} className="mt-10 grid gap-6 border-t border-ivory/15 pt-8 sm:grid-cols-2">
              <div>
                <p className="font-serif text-2xl text-gold-soft">Traditional Elegance</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">Jasmine, rose and marigold mandaps rooted in South Indian ritual.</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-gold-soft">Modern Celebrations</p>
                <p className="mt-2 text-sm leading-relaxed text-ivory/70">Blush and ivory staging, floral ceilings and statement entrances.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <button type="button" className="btn btn-gold" onClick={() => openEnquiry('Wedding')}>
                Enquire About Wedding Decorations
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
              </button>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <div ref={heroRef} className="relative mx-auto max-w-[520px] lg:mr-0">
              <button
                type="button"
                onClick={() => openLightbox(lightboxItems, 0)}
                className="grain group relative block aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[1.75rem]"
                aria-label={`View larger: ${weddingShowcase.hero.title}`}
                aria-haspopup="dialog"
              >
                <motion.div style={{ y: heroY }} className="absolute inset-x-0 -top-[10%] h-[120%]">
                  <Photo
                    src={weddingShowcase.hero.image}
                    alt="Traditional South Indian wedding mandap with jasmine strands, rose canopy and marigold accents (demo inspiration image)"
                    sizes="(min-width: 640px) 520px, 100vw"
                    className="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.05]"
                  />
                </motion.div>
                <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/70 via-transparent to-transparent" />
              </button>
              <div className="absolute -bottom-8 left-4 right-4 rounded-2xl bg-ivory p-5 text-charcoal shadow-2xl sm:-left-10 sm:right-auto sm:max-w-sm md:p-6 lg:-left-16">
                <p className="eyebrow !text-[0.6rem] text-gold-deep">Signature Ceremony</p>
                <p className="mt-2 font-serif text-2xl leading-tight text-burgundy">{weddingShowcase.hero.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{weddingShowcase.hero.description}</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Masonry */}
        <ul className="mt-24 grid grid-flow-dense auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:gap-5 lg:mt-32 lg:auto-rows-[270px] lg:grid-cols-4">
          {weddingShowcase.tiles.map((tile, i) => (
            <li key={tile.title} className={cn(spanClass[tile.span])}>
              <Reveal delay={(i % 4) * 0.07} className="h-full">
                <button
                  type="button"
                  onClick={() => openLightbox(lightboxItems, i + 1)}
                  className="group relative block h-full w-full overflow-hidden rounded-[1.25rem] text-left"
                  aria-label={`View larger: ${tile.title}`}
                  aria-haspopup="dialog"
                >
                  <Photo
                    src={tile.image}
                    alt=""
                    sizes={tile.span === 'wide' ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                    className="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.08]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-burgundy-950/5 to-transparent" />
                  <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ivory/15 text-ivory opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand aria-hidden className="size-4" strokeWidth={1.4} />
                  </span>
                  <span className="absolute inset-x-4 bottom-4 md:inset-x-5 md:bottom-5">
                    <span className="block font-serif text-lg leading-tight text-ivory md:text-2xl">{tile.title}</span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-width cinematic banner */}
      <div ref={bannerRef} className="grain relative mt-24 h-[62vh] min-h-[420px] overflow-hidden md:mt-32">
        <motion.div style={{ y: bannerY }} className="absolute inset-x-0 -top-[16%] h-[132%]">
          <Photo src={weddingShowcase.banner} alt="" sizes="100vw" quality={85} />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-burgundy-950/60" />
        <div className="container-luxe relative flex h-full flex-col items-center justify-center text-center">
          <Reveal>
            <p className="eyebrow text-gold-soft">Floral Ceiling Installations · Entrance Arches · Aisles</p>
            <p className="display mx-auto mt-5 max-w-4xl text-4xl text-ivory sm:text-5xl lg:text-7xl">
              Every detail, <em className="text-rose-soft">woven in flowers</em>
            </p>
            <button type="button" onClick={() => openEnquiry('Wedding')} className="btn btn-ghost-light mt-9">
              Plan Your Wedding Florals
            </button>
          </Reveal>
        </div>
      </div>
      <div className="container-luxe">
        <DemoNote tone="dark" className="mt-6">
          Inspiration imagery for demonstration only. These are not photographs of completed H Prakash Florist projects.
        </DemoNote>
      </div>
    </section>
  );
}
