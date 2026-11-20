import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * The client-supplied H Prakash floral monogram, shown unaltered inside an
 * ivory medallion so it reads well over photography and dark backgrounds.
 */
export function LogoMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-block shrink-0 overflow-hidden rounded-full bg-ivory ring-1 ring-gold/50 shadow-[0_6px_24px_-10px_rgba(75,15,28,0.45)]',
        className,
      )}
    >
      <Image
        src="/assets/brand/logo-original.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 160px, 96px"
        priority={priority}
        className="scale-[1.12] object-contain"
      />
    </span>
  );
}

export function Wordmark({ light, compact }: { light?: boolean; compact?: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          'font-serif font-medium tracking-[0.02em] transition-[font-size,color] duration-500',
          compact ? 'text-[1.3rem]' : 'text-[1.4rem] md:text-[1.65rem]',
          light ? 'text-ivory' : 'text-burgundy',
        )}
      >
        H Prakash
      </span>
      <span
        className={cn(
          'mt-1 font-sans text-[0.56rem] font-medium uppercase tracking-[0.42em] transition-colors duration-500',
          light ? 'text-gold-soft' : 'text-gold-deep',
        )}
      >
        Florist · Chennai
      </span>
    </span>
  );
}
