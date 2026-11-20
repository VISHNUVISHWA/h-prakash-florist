'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroSlides } from '@/data/content';
import { useActions } from '@/components/providers/StoreProvider';
import { Photo } from '@/components/ui/Photo';
import { cn } from '@/lib/utils';

const SLIDE_MS = 7000;
const heading = ['Where', 'Every', 'Bloom', 'Tells', 'a', 'Beautiful', 'Story'];
const ease = [0.22, 1, 0.36, 1] as const;

function Petal({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 56" aria-hidden className={cn('pointer-events-none absolute animate-float', className)} style={{ animationDelay: `${delay}s` }}>
      <path d="M20 2C6 18 4 38 20 54C36 38 34 18 20 2Z" fill="currentColor" />
      <path d="M20 8V50" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
    </svg>
  );
}

export function HeroSection() {
  const { runAction, openEnquiry } = useActions();
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const elapsed = useRef(0);

  // Reduced motion → start paused (user can still play / navigate).
  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  // Mount remaining slides after the first image has had time to load (protects LCP).
  useEffect(() => {
    const t = window.setTimeout(() => setMounted(new Set(heroSlides.map((_, i) => i))), 2500);
    return () => window.clearTimeout(t);
  }, []);

  const goTo = useCallback((i: number) => {
    const next = (i + heroSlides.length) % heroSlides.length;
    elapsed.current = 0;
    setMounted((m) => (m.has(next) ? m : new Set(m).add(next)));
    setActive(next);
  }, []);

  // Autoplay driven by rAF; progress written straight to the DOM (no re-render per frame).
  const running = playing && !hoverPaused;
  useEffect(() => {
    progressRefs.current.forEach((el, i) => {
      if (el) el.style.transform = `scaleX(${i < active ? 1 : i === active ? elapsed.current / SLIDE_MS : 0})`;
    });
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      if (document.visibilityState === 'visible') elapsed.current += now - last;
      last = now;
      const el = progressRefs.current[active];
      if (el) el.style.transform = `scaleX(${Math.min(elapsed.current / SLIDE_MS, 1)})`;
      if (elapsed.current >= SLIDE_MS) {
        goTo(active + 1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, active, goTo]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Featured floral collections"
      className="relative isolate flex min-h-[max(640px,92svh)] flex-col overflow-hidden bg-burgundy-950 text-ivory"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHoverPaused(true)}
      onPointerLeave={() => setHoverPaused(false)}
      onFocus={() => setHoverPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHoverPaused(false);
      }}
    >
      {/* Slides */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[4%] h-[112%]">
        {heroSlides.map((slide, i) =>
          mounted.has(i) ? (
            <motion.div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${heroSlides.length}: ${slide.label}`}
              aria-hidden={i !== active}
              className="grain absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0">
                <Photo
                  src={slide.image}
                  alt={slide.alt}
                  priority={i === 0}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  quality={90}
                  sizes="100vw"
                  style={{ objectPosition: slide.position }}
                />
              </div>
            </motion.div>
          ) : null,
        )}
      </motion.div>

      {/* Readability overlays */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-burgundy-950/85 via-burgundy-950/45 to-burgundy-950/5 max-md:via-burgundy-950/60" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-burgundy-950/80 to-transparent" />

      {/* Floating petals */}
      <Petal className="left-[46%] top-[24%] w-4 text-rose/70 max-md:hidden" />
      <Petal className="left-[8%] top-[78%] w-3 text-gold/60" delay={2.5} />
      <Petal className="right-[12%] top-[30%] w-5 text-rose-soft/60 max-lg:hidden" delay={1.2} />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 items-center pb-8 pt-[7.5rem] lg:pt-[11rem]"
      >
        <div className="container-luxe w-full">
          <div className="max-w-[46rem]">
            <motion.p
              className="eyebrow flex items-center gap-3 text-gold-soft"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            >
              <span aria-hidden className="h-px w-10 bg-gold" />
              H Prakash Florist • Chennai
            </motion.p>

            <h1 className="display mt-5 text-[clamp(2.6rem,min(11vw,8vh),3.4rem)] leading-[0.98] sm:text-[clamp(3rem,min(8vw,9vh),4.4rem)] lg:text-[clamp(3.6rem,min(6.4vw,10vh),6.1rem)]">
              <span className="sr-only">Where Every Bloom Tells a Beautiful Story</span>
              <span aria-hidden className="flex flex-wrap gap-x-[0.24em]">
                {heading.map((word, i) => (
                  <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em]">
                    <motion.span
                      className={cn('inline-block', (word === 'Beautiful' || word === 'Bloom') && 'italic text-rose-soft')}
                      initial={{ y: '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1.1, delay: 0.35 + i * 0.08, ease }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </span>
            </h1>

            <motion.p
              className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1, ease }}
            >
              From breathtaking wedding celebrations to thoughtfully crafted bouquets, we bring your most beautiful moments to life
              with flowers.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease }}
            >
              <a
                href="#categories"
                onClick={(e) => {
                  e.preventDefault();
                  runAction({ kind: 'scroll', to: '#categories' });
                }}
                className="btn btn-gold"
              >
                Explore Our Collections
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
              </a>
              <button type="button" onClick={() => openEnquiry('Wedding')} className="btn btn-ghost-light">
                Plan Your Dream Event
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Carousel controls */}
      <div className="relative z-20">
        <div className="container-luxe flex items-end justify-between gap-6 pb-6 md:pb-8">
          <div className="flex flex-1 items-end gap-3 md:max-w-2xl md:gap-6">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active}
                className="group flex-1 text-left"
              >
                <span
                  className={cn(
                    'mb-3 hidden truncate text-xs tracking-[0.08em] transition-colors duration-500 md:block',
                    i === active ? 'text-ivory' : 'text-ivory/55 group-hover:text-ivory/80',
                  )}
                >
                  <span className="mr-2 font-serif text-sm italic text-gold-soft">0{i + 1}</span>
                  {slide.label}
                </span>
                <span className="sr-only md:hidden">Slide {i + 1}: {slide.label}</span>
                <span className="relative block h-px w-full overflow-hidden bg-ivory/25">
                  <span
                    ref={(el) => {
                      progressRefs.current[i] = el;
                    }}
                    className="absolute inset-0 origin-left bg-gold"
                    style={{ transform: `scaleX(${i < active ? 1 : 0})` }}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => goTo(active - 1)} className="icon-btn border border-ivory/25 text-ivory hover:bg-ivory/10" aria-label="Previous slide">
              <ChevronLeft className="size-5" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="icon-btn border border-ivory/25 text-ivory hover:bg-ivory/10"
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
            >
              {playing ? <Pause className="size-4" strokeWidth={1.5} /> : <Play className="size-4" strokeWidth={1.5} />}
            </button>
            <button type="button" onClick={() => goTo(active + 1)} className="icon-btn border border-ivory/25 text-ivory hover:bg-ivory/10" aria-label="Next slide">
              <ChevronRight className="size-5" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          runAction({ kind: 'scroll', to: '#about' });
        }}
        className="absolute bottom-28 right-6 z-20 hidden flex-col items-center gap-3 text-ivory/70 transition-colors hover:text-ivory xl:right-12 xl:flex"
        aria-label="Scroll to introduction"
      >
        <span className="eyebrow ![writing-mode:vertical-rl] !text-[0.6rem]">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-gold" />
        </span>
      </a>

      <p className="sr-only" aria-live={running ? 'off' : 'polite'}>
        Slide {active + 1} of {heroSlides.length}: {heroSlides[active].label}
      </p>
    </section>
  );
}
