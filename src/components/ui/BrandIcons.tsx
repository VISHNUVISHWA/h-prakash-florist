// Brand glyphs (recent lucide releases no longer ship brand icons).
type P = { className?: string };

export function InstagramIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M4.5 19.5 3 22.5l3.6-1.2A9.75 9.75 0 1 0 4.5 19.5Z" />
      <path d="M8.6 8.2c.7 3.9 3.3 6.5 7.2 7.2l1.5-1.6-2.4-1.5-1 1.2c-1.5-.7-2.6-1.8-3.3-3.3l1.2-1-1.5-2.4-1.7 1.4Z" />
    </svg>
  );
}

export function FacebookIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M14.5 8H17V4.5h-2.5A4 4 0 0 0 10.5 8.5V11H8v3.5h2.5v7H14v-7h2.6l.4-3.5h-3V9a1 1 0 0 1 .5-1Z" />
    </svg>
  );
}

export function PinterestIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M10.6 14.2 9 21M9.3 13.2c-.6-2.9 1-5.7 3.6-5.7 2.2 0 3.4 1.5 3.4 3.4 0 2.4-1.2 4.4-3 4.4-1 0-1.7-.8-1.5-1.8l.8-2.9" />
    </svg>
  );
}
