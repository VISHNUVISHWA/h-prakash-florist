'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

type Base = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /** Visually hide the title (still announced to screen readers) */
  hideTitle?: boolean;
  children: ReactNode;
  className?: string;
};

function Overlay({ dark }: { dark?: boolean }) {
  return (
    <Dialog.Overlay asChild forceMount>
      <motion.div
        className={cn('fixed inset-0 z-[80]', dark ? 'bg-burgundy-950/90 backdrop-blur-sm' : 'bg-burgundy-950/45 backdrop-blur-[3px]')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      />
    </Dialog.Overlay>
  );
}

export function CloseButton({ className, label = 'Close' }: { className?: string; label?: string }) {
  return (
    <Dialog.Close className={cn('icon-btn text-burgundy hover:bg-burgundy/5', className)} aria-label={label}>
      <X className="size-5" strokeWidth={1.5} />
    </Dialog.Close>
  );
}

function Header({ title, description, hideTitle }: Pick<Base, 'title' | 'description' | 'hideTitle'>) {
  return (
    <>
      <Dialog.Title className={hideTitle ? 'sr-only' : 'display text-3xl text-burgundy'}>{title}</Dialog.Title>
      {description ? (
        <Dialog.Description className={hideTitle ? 'sr-only' : 'mt-1 text-sm text-charcoal/65'}>{description}</Dialog.Description>
      ) : null}
    </>
  );
}

/** Slide-in drawer (cart, wishlist, mobile navigation). */
export function Sheet({ open, onOpenChange, title, description, hideTitle, children, className, side = 'right' }: Base & { side?: 'left' | 'right' }) {
  const from = side === 'right' ? '100%' : '-100%';
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Overlay />
            <Dialog.Content asChild forceMount {...(!description && { 'aria-describedby': undefined })}>
              <motion.div
                className={cn(
                  'fixed inset-y-0 z-[90] flex w-full max-w-[440px] flex-col bg-ivory shadow-2xl outline-none',
                  side === 'right' ? 'right-0' : 'left-0',
                  className,
                )}
                initial={{ x: from }}
                animate={{ x: 0 }}
                exit={{ x: from }}
                transition={{ duration: 0.55, ease }}
              >
                <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-5 sm:px-7">
                  <div>
                    <Header title={title} description={description} hideTitle={hideTitle} />
                  </div>
                  <CloseButton className="-mr-2 -mt-1" />
                </div>
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Centered modal (quick view, enquiry, lightbox, search). */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  hideTitle,
  children,
  className,
  variant = 'center',
  showClose = true,
}: Base & { variant?: 'center' | 'top' | 'fullscreen'; showClose?: boolean }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Overlay dark={variant === 'fullscreen'} />
            <Dialog.Content asChild forceMount {...(!description && { 'aria-describedby': undefined })}>
              <motion.div
                className={cn(
                  'fixed z-[90] outline-none',
                  variant === 'center' &&
                    'inset-x-3 top-1/2 mx-auto max-h-[calc(100dvh-1.5rem)] w-auto max-w-5xl overflow-y-auto rounded-[1.75rem] bg-ivory shadow-2xl sm:inset-x-6',
                  variant === 'top' && 'inset-x-0 top-0 max-h-[100dvh] overflow-y-auto bg-ivory shadow-2xl',
                  variant === 'fullscreen' && 'inset-0 flex flex-col',
                  className,
                )}
                initial={variant === 'top' ? { y: '-100%' } : { opacity: 0, scale: 0.97, y: variant === 'center' ? '-48%' : 0 }}
                animate={variant === 'top' ? { y: 0 } : { opacity: 1, scale: 1, y: variant === 'center' ? '-50%' : 0 }}
                exit={variant === 'top' ? { y: '-100%' } : { opacity: 0, scale: 0.97, y: variant === 'center' ? '-48%' : 0 }}
                transition={{ duration: 0.5, ease }}
              >
                <Header title={title} description={description} hideTitle />
                {showClose && variant !== 'fullscreen' && (
                  <CloseButton className="absolute right-3 top-3 z-10 bg-ivory/90 backdrop-blur sm:right-4 sm:top-4" />
                )}
                {children}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export { Dialog };
