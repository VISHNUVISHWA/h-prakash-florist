import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  className?: string;
  id?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, align = 'center', tone = 'light', className, id, children }: Props) {
  const dark = tone === 'dark';
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
      <p className={cn('eyebrow flex items-center gap-3', align === 'center' && 'justify-center', dark ? 'text-gold' : 'text-gold-deep')}>
        <span aria-hidden className={cn('h-px w-8', dark ? 'bg-gold/70' : 'bg-gold')} />
        {eyebrow}
        {align === 'center' && <span aria-hidden className={cn('h-px w-8', dark ? 'bg-gold/70' : 'bg-gold')} />}
      </p>
      <h2
        id={id}
        className={cn('display mt-5 text-[2.5rem] text-balance sm:text-5xl lg:text-[4.1rem]', dark ? 'text-ivory' : 'text-burgundy')}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-5 text-base leading-relaxed text-pretty md:text-lg', dark ? 'text-ivory/75' : 'text-charcoal/70')}>
          {description}
        </p>
      )}
      {children}
    </Reveal>
  );
}
