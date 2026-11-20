import meta from '@/data/image-meta.json';

// Used only for the static GitHub Pages build (no image optimisation server there).
// Maps a requested width to the nearest pre-generated variant from scripts/generate-image-variants.mjs.
const VARIANT_WIDTHS = [480, 828, 1280, 1920];
const sizes = meta as Record<string, { w: number }>;
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const original = sizes[src]?.w;
  const variant = VARIANT_WIDTHS.find((w) => w >= width);
  if (!original || !variant || original <= variant) return `${base}${src}`;
  return `${base}/_img${src.replace(/\.\w+$/, '')}-${variant}.webp`;
}
