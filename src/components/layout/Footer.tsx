'use client';

import { ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import type { SiteAction } from '@/lib/actions';
import { business } from '@/data/content';
import { useActions } from '@/components/providers/StoreProvider';
import { ActionLink } from '@/components/ui/ActionLink';
import { asset } from '@/lib/base';
import { LogoMark } from '@/components/ui/Logo';
import { FacebookIcon, InstagramIcon, PinterestIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';

const explore: { label: string; action: SiteAction }[] = [
  { label: 'Wedding Decorations', action: { kind: 'scroll', to: '#weddings' } },
  { label: 'Event Decorations', action: { kind: 'scroll', to: '#events' } },
  { label: 'Fresh Flowers', action: { kind: 'products', filter: 'all' } },
  { label: 'Bouquets', action: { kind: 'products', filter: 'bouquets' } },
  { label: 'Flower Garlands', action: { kind: 'products', filter: 'garlands' } },
  { label: 'Floral Gallery', action: { kind: 'gallery', filter: 'all' } },
];

const assistance: { label: string; action: SiteAction }[] = [
  { label: 'Request a Quote', action: { kind: 'enquiry' } },
  { label: 'Contact Us', action: { kind: 'scroll', to: '#consultation' } },
  { label: 'Frequently Asked Questions', action: { kind: 'scroll', to: '#faq' } },
  { label: 'Custom Orders', action: { kind: 'enquiry', eventType: 'Custom Bouquet / Flower Order' } },
  { label: 'Consultation', action: { kind: 'scroll', to: '#consultation' } },
];

const socials = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'Facebook', Icon: FacebookIcon },
  { label: 'Pinterest', Icon: PinterestIcon },
  { label: 'WhatsApp', Icon: WhatsAppIcon },
];

export function Footer() {
  const { toast, scrollTo } = useActions();
  return (
    <footer id="contact" className="relative overflow-hidden bg-burgundy text-ivory">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${asset('/assets/banners/banner-burgundy-floral.webp')})` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-burgundy" />

      <div className="container-luxe relative pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4">
              <LogoMark className="size-20" />
              <div>
                <p className="font-serif text-3xl">H Prakash</p>
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.42em] text-gold">Florist · Chennai</p>
              </div>
            </div>
            <p className="mt-7 max-w-xs font-serif text-2xl italic leading-snug text-ivory/90">Creating Beautiful Moments, One Bloom at a Time.</p>
            <ul className="mt-8 flex gap-2" aria-label="Social media (accounts to be confirmed)">
              {socials.map(({ label, Icon }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => toast(`${label} link will be added once the official account is verified.`, 'info')}
                    className="icon-btn border border-ivory/20 text-ivory/85 hover:border-gold hover:bg-gold hover:text-burgundy-950"
                    aria-label={`${label}: account to be confirmed`}
                  >
                    <Icon className="size-[1.1rem]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Explore" className="lg:col-span-2">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-6 space-y-3">
              {explore.map((l) => (
                <li key={l.label}>
                  <ActionLink action={l.action} className="link-underline text-left text-sm text-ivory/80 transition-colors hover:text-ivory">
                    {l.label}
                  </ActionLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Customer assistance" className="lg:col-span-3">
            <p className="eyebrow text-gold">Customer Assistance</p>
            <ul className="mt-6 space-y-3">
              {assistance.map((l) => (
                <li key={l.label}>
                  <ActionLink action={l.action} className="link-underline text-left text-sm text-ivory/80 transition-colors hover:text-ivory">
                    {l.label}
                  </ActionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="eyebrow text-gold">Visit Us</p>
            <address className="mt-6 space-y-4 text-sm not-italic leading-relaxed text-ivory/80">
              <p className="font-serif text-xl text-ivory">{business.name}</p>
              <p className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>
                  Near Metro Railway Station,
                  <br />
                  {business.shortAddress}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>Phone: to be confirmed</span>
              </p>
              <p className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.5} />
                <span>Email: to be confirmed</span>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 rounded-2xl border border-ivory/10 bg-burgundy-950/30 px-5 py-4 text-xs leading-relaxed text-ivory/65">
          Demo website: products, prices, imagery and testimonials are illustrative placeholders. Cart, checkout and enquiry forms are simulated, and contact details will be published only after they are verified.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 py-8 text-xs text-ivory/60 sm:flex-row">
          <p>© 2026 H Prakash Florist. All Rights Reserved.</p>
          <button type="button" onClick={() => scrollTo('#top')} className="inline-flex items-center gap-2 uppercase tracking-[0.18em] transition-colors hover:text-ivory">
            Back to top <ArrowUp aria-hidden className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
