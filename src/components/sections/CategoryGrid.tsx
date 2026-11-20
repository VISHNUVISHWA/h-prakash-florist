import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/content';
import { ActionLink } from '@/components/ui/ActionLink';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

// Magazine-style asymmetric columns: tall/short pairs with an offset middle column.
const columns = [
  [
    { id: 'wedding', shape: 'aspect-[4/3] lg:aspect-[4/5]' },
    { id: 'garlands', shape: 'aspect-[4/3] lg:aspect-square' },
  ],
  [
    { id: 'bouquets', shape: 'aspect-[4/3] lg:aspect-square' },
    { id: 'premium', shape: 'aspect-[4/3] lg:aspect-[4/5]' },
  ],
  [
    { id: 'birthday', shape: 'aspect-[4/3] lg:aspect-[4/5]' },
    { id: 'corporate', shape: 'aspect-[4/3] lg:aspect-square' },
  ],
];

export function CategoryGrid() {
  let n = 0;
  return (
    <section id="categories" aria-labelledby="categories-title" className="bg-ivory py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          id="categories-title"
          eyebrow="Shop by Category"
          title={
            <>
              Discover Our <em className="text-wine">Floral</em> World
            </>
          }
          description="Beautiful flowers and thoughtfully designed decorations for every occasion."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {columns.map((col, ci) => (
            <div key={ci} className={cn('flex flex-col gap-5 md:gap-6 max-lg:contents', ci === 1 && 'lg:mt-20')}>
              {col.map(({ id, shape }) => {
                const cat = categories.find((c) => c.id === id)!;
                const index = ++n;
                return (
                  <Reveal key={id} delay={(index % 3) * 0.08}>
                    <ActionLink
                      action={cat.action}
                      className={cn('group relative block w-full overflow-hidden rounded-[1.5rem] bg-cream text-left', shape)}
                      ariaLabel={`${cat.name}: ${cat.description}`}
                    >
                      <Photo
                        src={cat.image}
                        alt=""
                        sizes="(min-width: 1440px) 440px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"
                        className="transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.08]"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-burgundy-950/85 via-burgundy-950/20 to-transparent transition-opacity duration-700" />
                      <span className="absolute inset-0 bg-burgundy/0 transition-colors duration-700 group-hover:bg-burgundy/25" />
                      <span className="absolute left-5 top-5 font-serif text-lg italic text-ivory/85 md:left-7 md:top-6">0{index}</span>
                      <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-ivory/40 text-ivory backdrop-blur-sm transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-burgundy-950 md:right-6 md:top-6">
                        <ArrowUpRight aria-hidden className="size-5" strokeWidth={1.4} />
                      </span>
                      <span className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
                        <span className="block font-serif text-[1.75rem] leading-[1.05] text-ivory md:text-[2.1rem]">{cat.name}</span>
                        <span className="mt-2 block max-w-xs text-sm leading-relaxed text-ivory/80 transition-all duration-700 can-hover:translate-y-2 can-hover:opacity-0 can-hover:group-hover:translate-y-0 can-hover:group-hover:opacity-100 can-hover:group-focus-visible:translate-y-0 can-hover:group-focus-visible:opacity-100">
                          {cat.description}
                        </span>
                      </span>
                    </ActionLink>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
