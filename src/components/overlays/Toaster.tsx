'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Check, Info, X } from 'lucide-react';
import { useActions, useToasts } from '@/components/providers/StoreProvider';

export function Toaster() {
  const toasts = useToasts();
  const { dismissToast, setCartOpen } = useActions();
  return (
    <div aria-live="polite" role="status" className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 md:bottom-6 md:left-6 md:right-auto md:items-start">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl bg-burgundy-950 px-4 py-3.5 text-sm text-ivory shadow-2xl ring-1 ring-gold/30"
          >
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold text-burgundy-950">
              {t.tone === 'success' ? <Check aria-hidden className="size-3" strokeWidth={2.5} /> : <Info aria-hidden className="size-3" strokeWidth={2.5} />}
            </span>
            <p className="flex-1 leading-snug">
              {t.message}
              {t.tone === 'success' && (
                <>
                  {' '}
                  <button type="button" onClick={() => setCartOpen(true)} className="ml-1 underline decoration-gold underline-offset-4">
                    View bag
                  </button>
                </>
              )}
            </p>
            <button type="button" onClick={() => dismissToast(t.id)} className="-m-1 p-1 text-ivory/60 hover:text-ivory" aria-label="Dismiss notification">
              <X className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
