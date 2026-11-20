'use client';

import { useState } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { sampleTestimonials } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const total = sampleTestimonials.length;
  const go = (delta: number) => setState(([i]) => [(i + delta + total) % total, delta]);
  const t = sampleTestimonials[index];

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1);
    else if (info.offset.x > 60) go(-1);
  };

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="relative overflow-hidden bg-cream py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 size-[420px] rounded-full bg-rose-soft/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 size-[360px] rounded-full bg-gold-soft/50 blur-3xl" />

      <div className="container-luxe relative">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Client Words"
          title={
            <>
              Kind Words, <em className="text-wine">Beautiful Memories</em>
            </>
          }
          description="Sample testimonials shown for layout demonstration. They will be replaced with verified client reviews."
        />

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="relative min-h-[380px] sm:min-h-[340px]">
            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.figure
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir >= 0 ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir >= 0 ? -40 : 40 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={onDragEnd}
                className="relative cursor-grab touch-pan-y rounded-[2rem] border border-gold/30 bg-ivory px-6 pb-10 pt-14 text-center shadow-[0_30px_80px_-50px_rgba(75,15,28,0.45)] active:cursor-grabbing sm:px-14"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
              >
                <span className="absolute left-1/2 top-0 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-burgundy text-gold">
                  <Quote aria-hidden className="size-6" strokeWidth={1.3} fill="currentColor" />
                </span>
                <span className="inline-block rounded-full border border-gold/60 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold-deep">
                  Sample testimonial · not a real review
                </span>
                <blockquote className="mt-6">
                  <p className="font-serif text-2xl leading-snug text-burgundy text-balance md:text-[2rem]">“{t.quote}”</p>
                </blockquote>
                <figcaption className="mt-8">
                  <span className="block text-sm font-medium tracking-wide text-charcoal">{t.name}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-charcoal/70">{t.context}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button type="button" onClick={() => go(-1)} className="icon-btn border border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-ivory" aria-label="Previous testimonial">
              <ChevronLeft className="size-5" strokeWidth={1.4} />
            </button>
            <div className="flex items-center gap-2">
              {sampleTestimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={i === index}
                  className="grid size-6 place-items-center"
                >
                  <span className={cn('block h-1.5 rounded-full transition-all duration-500', i === index ? 'w-7 bg-burgundy' : 'w-1.5 bg-burgundy/25')} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} className="icon-btn border border-burgundy/20 text-burgundy hover:bg-burgundy hover:text-ivory" aria-label="Next testimonial">
              <ChevronRight className="size-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
