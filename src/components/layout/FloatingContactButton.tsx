'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, FileText, MessageCircle, Phone, X } from 'lucide-react';
import { useActions } from '@/components/providers/StoreProvider';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';

export function FloatingContactButton() {
  const { openEnquiry, runAction, scrollTo } = useActions();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) => !rootRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const items = [
    { label: 'Request a Quote', Icon: FileText, onClick: () => openEnquiry() },
    { label: 'WhatsApp Enquiry (preview)', Icon: WhatsAppIcon, onClick: () => runAction({ kind: 'scroll', to: '#consultation' }) },
    { label: 'Call Us (number pending)', Icon: Phone, onClick: () => runAction({ kind: 'scroll', to: '#contact' }) },
    { label: 'Back to Top', Icon: ArrowUp, onClick: () => scrollTo('#top') },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={rootRef}
          className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence>
            {open && (
              <motion.ul
                id="floating-contact-menu"
                className="flex flex-col items-end gap-2"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }, hidden: {} }}
              >
                {items.map(({ label, Icon, onClick }) => (
                  <motion.li key={label} variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        onClick();
                      }}
                      className="flex items-center gap-3 rounded-full bg-ivory py-2.5 pl-5 pr-3 text-sm text-burgundy shadow-[0_12px_32px_-12px_rgba(75,15,28,0.45)] ring-1 ring-burgundy/10 transition-colors hover:bg-cream"
                    >
                      {label}
                      <span className="grid size-8 place-items-center rounded-full bg-cream text-burgundy">
                        <Icon className="size-4" />
                      </span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="floating-contact-menu"
            aria-label={open ? 'Close contact options' : 'Open contact options'}
            className="relative grid size-14 place-items-center rounded-full bg-burgundy text-ivory shadow-[0_16px_40px_-12px_rgba(75,15,28,0.7)] ring-1 ring-gold/40 transition-transform duration-300 hover:scale-105"
          >
            {!open && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-burgundy/30 [animation-duration:2.6s]" />}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={String(open)} initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}>
                {open ? <X className="size-5" strokeWidth={1.5} /> : <MessageCircle className="size-5" strokeWidth={1.5} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
