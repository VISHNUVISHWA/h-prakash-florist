'use client';

import { motion } from 'motion/react';
import { ArrowRight, CalendarHeart, Palette, PartyPopper, Sparkles } from 'lucide-react';
import { useActions } from '@/components/providers/StoreProvider';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const steps = [
  { icon: CalendarHeart, title: 'Share Your Occasion', text: 'Tell us about your event, date, venue and the mood you imagine.' },
  { icon: Sparkles, title: 'Explore Floral Ideas', text: 'Discover flowers, palettes and styles that suit your celebration.' },
  { icon: Palette, title: 'Personalize Your Design', text: 'Refine colours, florals and details until the concept feels right.' },
  { icon: PartyPopper, title: 'Bring Your Celebration to Life', text: 'Your floral design is crafted and styled for the big day.' },
];

export function ProcessSection() {
  const { openEnquiry } = useActions();
  return (
    <section id="process" aria-labelledby="process-title" className="relative overflow-hidden bg-wine py-24 text-ivory md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.25]" style={{ background: 'radial-gradient(60% 80% at 85% 0%, #c8a46b55, transparent 60%), radial-gradient(50% 60% at 0% 100%, #e8a5b244, transparent 60%)' }} />
      <div className="container-luxe relative">
        <SectionHeading
          id="process-title"
          tone="dark"
          eyebrow="How It Works"
          title={
            <>
              Your Floral Vision, <em className="text-rose">Beautifully Realized</em>
            </>
          }
          description="A simple, personal process, from the first conversation to the final petal."
        />

        <motion.ol
          className="relative mt-16 grid gap-0 lg:mt-20 lg:grid-cols-4 lg:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        >
          {/* Desktop connector line (animated from the list, since a scaleX(0) element has no area to observe) */}
          <motion.span
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px origin-left bg-gold/60 lg:block"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="relative flex gap-6 pb-12 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:pb-0 lg:text-center">
              {/* Mobile vertical line */}
              {i < steps.length - 1 && <span aria-hidden className="absolute left-8 top-16 h-[calc(100%-4rem)] w-px bg-gold/40 lg:hidden" />}
              <Reveal delay={i * 0.15} className="relative z-10 shrink-0">
                <span className="grid size-16 place-items-center rounded-full border border-gold/70 bg-wine text-gold shadow-[0_0_0_8px_rgba(104,28,50,1)]">
                  <Icon aria-hidden className="size-6" strokeWidth={1.3} />
                </span>
              </Reveal>
              <Reveal delay={i * 0.15 + 0.1} className="pt-2 lg:mt-8 lg:max-w-[16rem] lg:pt-0">
                <p className="font-serif text-base italic text-gold-soft">Step {i + 1}</p>
                <h3 className="mt-1 font-serif text-[1.75rem] leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/75">{text}</p>
              </Reveal>
            </li>
          ))}
        </motion.ol>

        <Reveal className="mt-16 text-center lg:mt-20">
          <button type="button" onClick={() => openEnquiry()} className="btn btn-gold">
            Start Planning Your Event
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.5} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
