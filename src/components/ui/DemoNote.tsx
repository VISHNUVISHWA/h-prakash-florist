import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DemoNote({ children, className, tone = 'light' }: { children: ReactNode; className?: string; tone?: 'light' | 'dark' }) {
  return (
    <p className={cn('inline-flex items-start gap-2 text-xs leading-relaxed', tone === 'dark' ? 'text-ivory/70' : 'text-charcoal/65', className)}>
      <Info aria-hidden className="mt-px size-3.5 shrink-0" strokeWidth={1.6} />
      <span>{children}</span>
    </p>
  );
}
