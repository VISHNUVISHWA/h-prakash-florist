'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion, type PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { enquiryForCategory } from '@/data/gallery';
import { useActions, useUI } from '@/components/providers/StoreProvider';
import { Dialog, Modal } from '@/components/ui/Dialogs';
import { Photo } from '@/components/ui/Photo';

export function GalleryLightbox() {
  const { lightbox } = useUI();
  const { closeLightbox, setLightboxIndex, openEnquiry } = useActions();
  const item = lightbox ? lightbox.items[lightbox.index] : undefined;
  const total = lightbox?.items.length ?? 0;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightboxIndex(lightbox.index + 1);
      if (e.key === 'ArrowLeft') setLightboxIndex(lightbox.index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, setLightboxIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (!lightbox) return;
    if (info.offset.x < -70) setLightboxIndex(lightbox.index + 1);
    else if (info.offset.x > 70) setLightboxIndex(lightbox.index - 1);
  };

  return (
    <Modal open={!!lightbox} onOpenChange={(o) => !o && closeLightbox()} title={item ? `Image: ${item.title}` : 'Gallery'} variant="fullscreen">
      {item && lightbox && (
        <>
          <div className="flex items-center justify-between gap-4 px-4 py-4 text-ivory md:px-8">
            <p className="text-xs tracking-[0.2em] text-ivory/70 tabular-nums" aria-live="polite">
              {String(lightbox.index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <Dialog.Close className="icon-btn border border-ivory/25 text-ivory hover:bg-ivory/10" aria-label="Close gallery">
              <X className="size-5" strokeWidth={1.4} />
            </Dialog.Close>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id + lightbox.index}
                className="relative h-full w-full max-w-6xl touch-pan-y"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                drag={total > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
              >
                <Photo
                  src={item.image}
                  alt={`${item.title} (demo inspiration image)`}
                  sizes="(min-width: 1280px) 1150px, 100vw"
                  quality={90}
                  className="!object-contain"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(lightbox.index - 1)}
                  className="icon-btn absolute left-2 top-1/2 !size-12 -translate-y-1/2 border border-ivory/25 bg-burgundy-950/40 text-ivory backdrop-blur hover:bg-ivory/10 md:left-6"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-6" strokeWidth={1.3} />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(lightbox.index + 1)}
                  className="icon-btn absolute right-2 top-1/2 !size-12 -translate-y-1/2 border border-ivory/25 bg-burgundy-950/40 text-ivory backdrop-blur hover:bg-ivory/10 md:right-6"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-6" strokeWidth={1.3} />
                </button>
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-between gap-4 px-4 py-5 text-center text-ivory md:flex-row md:px-8 md:text-left">
            <div>
              <p className="font-serif text-2xl md:text-3xl">{item.title}</p>
              <p className="mt-1 text-xs text-ivory/60">Demo inspiration image, not a completed H Prakash Florist project.</p>
            </div>
            <button type="button" onClick={() => openEnquiry(item.enquiry ?? enquiryForCategory[item.category], `Inspired by: ${item.title}`)} className="btn btn-gold shrink-0">
              Enquire About This Style
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
