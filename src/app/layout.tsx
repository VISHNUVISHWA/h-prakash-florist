import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import { asset } from '@/lib/base';
import { Providers } from './providers';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const title = 'H Prakash Florist | Wedding Decorations, Event Flowers & Bouquets in Chennai';
const description =
  'Explore wedding flower decorations, event floral styling, fresh bouquets and traditional flower arrangements with H Prakash Florist in Chennai.';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title,
  description,
  applicationName: 'H Prakash Florist',
  keywords: ['florist Chennai', 'wedding flower decoration', 'Ekkaduthangal florist', 'mandap decoration', 'flower bouquets', 'jasmine garland'],
  icons: {
    icon: [
      { url: asset('/assets/brand/favicon-32.png'), sizes: '32x32', type: 'image/png' },
      { url: asset('/assets/brand/favicon-48.png'), sizes: '48x48', type: 'image/png' },
      { url: asset('/assets/brand/app-icon-512.png'), sizes: '512x512', type: 'image/png' },
    ],
    apple: asset('/assets/brand/apple-touch-icon-180.png'),
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'H Prakash Florist',
    title,
    description,
    url: '/',
    images: [{ url: '/assets/brand/social-share-og.jpg', width: 1200, height: 630, alt: 'H Prakash Florist — floral decorations and bouquets in Chennai' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/assets/brand/social-share-og.jpg'],
  },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: '#4B0F1C',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-burgundy focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
