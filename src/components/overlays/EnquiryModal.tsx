'use client';

import { useActions, useUI } from '@/components/providers/StoreProvider';
import { Modal } from '@/components/ui/Dialogs';
import { asset } from '@/lib/base';
import { LogoMark } from '@/components/ui/Logo';
import { EnquiryForm } from '@/components/sections/EnquiryForm';

export function EnquiryModal() {
  const { enquiry } = useUI();
  const { closeEnquiry } = useActions();

  return (
    <Modal open={enquiry.open} onOpenChange={(o) => !o && closeEnquiry()} title="Request a quote" description="Share your event details for a floral decoration quote.">
      <div className="grid lg:grid-cols-5">
        <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-burgundy px-10 py-16 text-center lg:col-span-2 lg:flex">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.09]"
            style={{ backgroundImage: `url(${asset('/assets/decorative/botanical-pattern.svg')})`, backgroundSize: '420px' }}
          />
          <div aria-hidden className="absolute inset-5 rounded-t-[999px] rounded-b-2xl border border-gold/35" />
          <LogoMark className="relative size-40" />
          <p className="relative mt-10 font-serif text-[2rem] leading-tight text-ivory">
            Designed with flowers.
            <br />
            <em className="text-rose">Remembered forever.</em>
          </p>
          <p className="relative mt-6 text-xs uppercase tracking-[0.24em] text-gold-soft">Ekkaduthangal · Chennai</p>
        </div>
        <div className="p-6 pt-14 sm:p-10 lg:col-span-3">
          <p className="eyebrow text-gold-deep">Get a Quote</p>
          <h2 className="display mt-3 text-4xl text-burgundy sm:text-5xl">Tell us about your celebration</h2>
          <p className="mt-3 text-sm text-charcoal/65">We’ll use these details to plan your floral consultation.</p>
          <div className="mt-8">
            {/* Remount when the prefilled event changes */}
            <EnquiryForm key={`${enquiry.eventType}-${enquiry.note}`} defaultEventType={enquiry.eventType} note={enquiry.note} compact />
          </div>
        </div>
      </div>
    </Modal>
  );
}
