'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { faqs } from '@/data/content';
import { useActions, useUI } from '@/components/providers/StoreProvider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export function FAQAccordion() {
  const { faqValue } = useUI();
  const { setFaqValue, openEnquiry } = useActions();

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-ivory py-24 md:py-32">
      <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-40">
            <SectionHeading
              id="faq-title"
              align="left"
              eyebrow="Questions"
              title={
                <>
                  Frequently <em className="text-wine">Asked</em>
                </>
              }
              description="Everything you might want to know before planning your florals."
            />
            <Reveal delay={0.1} className="mt-8 rounded-2xl bg-cream p-6">
              <p className="font-serif text-2xl text-burgundy">Still have a question?</p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/70">Send us your query with your event details.</p>
              <button type="button" onClick={() => openEnquiry()} className="btn btn-primary mt-5 !min-h-11 !text-[0.66rem]">
                Ask the Florist
              </button>
            </Reveal>
          </div>
        </div>

        <Accordion.Root type="single" collapsible value={faqValue} onValueChange={setFaqValue} className="border-t border-burgundy/10 lg:col-span-8">
          {faqs.map((f, i) => (
            <Accordion.Item key={f.q} value={`faq-${i}`} className="border-b border-burgundy/10">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7">
                  <span className="flex gap-5">
                    <span className="mt-1 font-serif text-base italic text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-[1.35rem] leading-snug text-burgundy transition-colors group-hover:text-wine md:text-[1.6rem]">{f.q}</span>
                  </span>
                  <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-burgundy/20 text-burgundy transition-all duration-500 ease-luxe group-hover:border-burgundy group-data-[state=open]:rotate-45 group-data-[state=open]:border-burgundy group-data-[state=open]:bg-burgundy group-data-[state=open]:text-ivory">
                    <Plus aria-hidden className="size-4" strokeWidth={1.5} />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-2xl pb-7 pl-10 pr-12 text-[0.95rem] leading-relaxed text-charcoal/75">{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
