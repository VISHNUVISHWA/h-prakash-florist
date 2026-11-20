import { Flower, Gem, HeartHandshake, Layers, MessagesSquare } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

const features = [
  { icon: Gem, title: 'Thoughtfully Designed Floral Arrangements', text: 'Balanced compositions where colour, texture and form work in harmony.' },
  { icon: Layers, title: 'Personalized Event Decoration Concepts', text: 'Ideas developed around your venue, theme, traditions and palette.' },
  { icon: Flower, title: 'Traditional and Contemporary Floral Styles', text: 'From jasmine-laden mandaps to minimal, modern floral statements.' },
  { icon: HeartHandshake, title: 'Beautiful Flowers for Every Occasion', text: 'Bouquets, garlands and décor for grand days and small gestures alike.' },
  { icon: MessagesSquare, title: 'Dedicated Consultation for Special Events', text: 'Time to listen, suggest and refine the details before your celebration.' },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" aria-labelledby="why-title" className="relative bg-ivory py-24 md:py-32">
      <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-40">
            <SectionHeading
              id="why-title"
              align="left"
              eyebrow="Why H Prakash Florist"
              title={
                <>
                  The Art of Making Every Moment <em className="text-wine">Bloom</em>
                </>
              }
              description="Floral craft rooted in Chennai’s celebrations, with an eye for contemporary elegance."
            />
            <Reveal delay={0.1} className="relative mt-10 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-t-[999px] rounded-b-[1.5rem] lg:block">
              <Photo
                src="/assets/gallery/weddings/luxury-wedding-centerpiece.webp"
                alt="Tall rose and hydrangea wedding centrepiece on a candlelit table (demo inspiration image)"
                sizes="384px"
              />
              <div aria-hidden className="absolute inset-3 rounded-t-[999px] rounded-b-[1.1rem] border border-ivory/50" />
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {features.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="border-b border-burgundy/10 first:border-t">
              <Reveal delay={i * 0.05} className="group flex gap-6 py-8 md:gap-10 md:py-10">
                <span className="font-serif text-2xl italic text-gold-deep md:text-3xl">0{i + 1}</span>
                <div className="flex-1">
                  <h3 className="font-serif text-[1.65rem] leading-tight text-burgundy md:text-[2.1rem]">{title}</h3>
                  <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-charcoal/70">{text}</p>
                </div>
                <span className="hidden size-16 shrink-0 place-items-center rounded-full border border-gold/50 text-burgundy transition-all duration-700 ease-luxe group-hover:rotate-[20deg] group-hover:border-burgundy group-hover:bg-burgundy group-hover:text-gold sm:grid">
                  <Icon aria-hidden className="size-6" strokeWidth={1.2} />
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
