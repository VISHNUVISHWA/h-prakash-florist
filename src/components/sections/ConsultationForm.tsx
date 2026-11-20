import { MapPin, Phone } from 'lucide-react';
import { business } from '@/data/content';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from './EnquiryForm';

export function ConsultationForm() {
  return (
    <section id="consultation" aria-labelledby="consultation-title" className="bg-ivory py-24 md:py-32">
      <div className="container-luxe">
        <div className="grid overflow-hidden rounded-[2rem] bg-cream lg:grid-cols-12">
          {/* Imagery */}
          <div className="grain relative flex min-h-[520px] flex-col justify-between gap-12 overflow-hidden p-6 md:p-10 lg:col-span-5 lg:min-h-full">
            <Photo src="/assets/textures/wine-satin.webp" alt="" sizes="(min-width: 1024px) 40vw, 100vw" quality={75} />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-burgundy-950/20 via-burgundy-950/30 to-burgundy-950/80" />
            <div className="relative flex items-end gap-4">
              <div className="relative h-56 w-40 overflow-hidden rounded-t-[999px] rounded-b-2xl shadow-2xl ring-1 ring-gold/40 md:h-64 md:w-44">
                <Photo
                  src="/assets/gallery/florals/pastel-rose-arrangement.webp"
                  alt="Pastel rose and hydrangea arrangement (demo inspiration image)"
                  sizes="176px"
                />
              </div>
              <div className="relative mb-6 h-36 w-28 overflow-hidden rounded-t-[999px] rounded-b-2xl shadow-2xl ring-1 ring-gold/40 md:h-40 md:w-32">
                <Photo src="/assets/gallery/florals/white-lilies.webp" alt="" sizes="128px" />
              </div>
            </div>
            <div className="relative text-ivory">
              <p className="font-serif text-3xl leading-tight md:text-4xl">“Every celebration has its own story. Let’s tell yours in flowers.”</p>
              <div className="mt-8 space-y-3 border-t border-ivory/20 pt-6 text-sm text-ivory/85">
                <p className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  {business.address}
                </p>
                <p className="flex items-start gap-3">
                  <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                  Phone & WhatsApp: to be confirmed with the business
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-5 py-12 sm:px-10 md:py-16 lg:col-span-7 lg:px-14 xl:px-20">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-gold-deep">
                <span aria-hidden className="h-px w-8 bg-gold" /> Consultation
              </p>
              <h2 id="consultation-title" className="display mt-5 text-[2.5rem] text-burgundy text-balance sm:text-5xl lg:text-[3.6rem]">
                Let’s Create Something <em className="text-wine">Beautiful</em> Together
              </h2>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-charcoal/70">
                Share a few details about your celebration and we’ll prepare ideas for your consultation.
              </p>
            </Reveal>
            <div className="mt-10">
              <EnquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
