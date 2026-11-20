import Image from 'next/image';
import { Flower2, HeartHandshake, Leaf, Sparkles } from 'lucide-react';
import { asset } from '@/lib/base';
import { Reveal } from '@/components/ui/Reveal';
import { Photo } from '@/components/ui/Photo';

const highlights = [
  { icon: Sparkles, title: 'Bespoke Floral Designs', text: 'Each arrangement is shaped around your occasion, palette and personal style.' },
  { icon: Flower2, title: 'Wedding & Event Specialists', text: 'Mandaps, stages and celebrations, all designed in flowers.' },
  { icon: Leaf, title: 'Fresh Floral Collections', text: 'Bouquets, garlands and arrangements for gifting and everyday joy.' },
  { icon: HeartHandshake, title: 'Personalized Decoration Services', text: 'Thoughtful guidance from the first idea to the final setup.' },
];

const marquee = ['Weddings', 'Receptions', 'Mandaps', 'Bouquets', 'Garlands', 'Birthdays', 'Corporate Events', 'Festivals'];

export function BrandIntroduction() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden bg-ivory pt-24 md:pt-32">
      <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Brand crest composition */}
        <Reveal className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:mx-0">
          <div className="arch relative aspect-[4/5] overflow-hidden bg-cream">
            <Image
              src={asset('/assets/decorative/botanical-pattern.svg')}
              alt=""
              fill
              className="object-cover opacity-50"
              unoptimized
            />
            <div className="absolute inset-[9%] top-[12%]">
              <Image
                src="/assets/brand/logo-original.png"
                alt="H Prakash Florist floral monogram logo"
                fill
                sizes="(min-width: 1024px) 340px, 80vw"
                className="object-contain mix-blend-multiply"
              />
            </div>
            <div aria-hidden className="arch absolute inset-3 border border-gold/50" />
          </div>
          <div className="absolute -bottom-8 -right-2 size-36 overflow-hidden rounded-full border-[6px] border-ivory shadow-xl sm:-right-10 sm:size-44">
            <Photo src="/assets/gallery/florals/white-lilies.webp" alt="" sizes="176px" quality={80} />
          </div>
          <Image
            src={asset('/assets/decorative/floral-corner.svg')}
            alt=""
            width={120}
            height={120}
            aria-hidden
            className="absolute -left-6 -top-6 w-24 animate-float opacity-80"
            unoptimized
          />
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold-deep">
              <span aria-hidden className="h-px w-8 bg-gold" /> Our Story
            </p>
            <h2 id="about-title" className="display mt-5 text-[2.6rem] text-burgundy text-balance sm:text-5xl lg:text-[4.3rem]">
              Flowers That Transform Moments Into <em className="text-wine">Memories</em>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              At H Prakash Florist, we believe every celebration deserves flowers that reflect its beauty and emotion. From intimate
              gatherings to grand wedding celebrations, our floral designs bring elegance to every occasion.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 0.08} className="flex gap-5">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/50 bg-cream text-burgundy">
                    <Icon aria-hidden className="size-6" strokeWidth={1.2} />
                  </span>
                  <span>
                    <span className="font-serif text-sm italic text-gold-deep">0{i + 1}</span>
                    <h3 className="font-serif text-[1.45rem] leading-tight text-burgundy">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-charcoal/70">{text}</p>
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editorial marquee */}
      <div aria-hidden className="mt-24 overflow-hidden border-y border-burgundy/10 py-6 md:mt-32">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {marquee.map((word) => (
                <span key={word} className="flex items-center font-serif text-4xl italic text-burgundy/85 md:text-6xl">
                  <span className="px-8 md:px-12">{word}</span>
                  <svg viewBox="0 0 24 24" className="size-5 text-gold md:size-6">
                    <path fill="currentColor" d="M12 2c1.5 4.5 3 6 7.5 7.5C15 11 13.5 12.5 12 17c-1.5-4.5-3-6-7.5-7.5C9 8 10.5 6.5 12 2Z" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
