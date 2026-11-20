'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useActions } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';

export function PromotionalBanner() {
  const { openEnquiry } = useActions();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.08]);

  return (
    <section ref={ref} aria-labelledby="promo-title" className="grain relative isolate overflow-hidden bg-burgundy-950 text-ivory">
      <motion.div style={{ y, scale }} className="absolute inset-x-0 -top-[14%] -z-10 h-[128%]">
        <Photo
          src="/assets/banners/banner-bouquets.webp"
          alt="Close-up of blush roses and white lilies with champagne-toned styling (demo inspiration image)"
          sizes="100vw"
          quality={90}
          style={{ objectPosition: '75% 50%' }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-burgundy-950/90 via-burgundy-950/60 to-burgundy-950/10" />

      <div className="container-luxe flex min-h-[78vh] items-center py-24 md:min-h-[720px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-gold-soft">
            <span aria-hidden className="h-px w-10 bg-gold" /> Bespoke Floral Design
          </p>
          <h2 id="promo-title" className="display mt-6 text-[2.9rem] sm:text-6xl lg:text-[5.4rem]">
            Designed With Flowers.
            <br />
            <em className="text-rose-soft">Remembered Forever.</em>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/85 md:text-lg">
            Let us create something extraordinary for your next celebration.
          </p>
          <button type="button" onClick={() => openEnquiry()} className="btn btn-gold mt-10">
            Request a Custom Decoration Quote
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
