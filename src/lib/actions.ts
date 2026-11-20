import type { GalleryCategory } from '@/data/gallery';

/**
 * Every interactive link on the page resolves to one of these in-page actions.
 * There are no other routes — links scroll, filter visible content, or open an overlay.
 */
export type SiteAction =
  | { kind: 'scroll'; to: string }
  | { kind: 'products'; filter: string }
  | { kind: 'gallery'; filter: GalleryCategory }
  | { kind: 'enquiry'; eventType?: string; note?: string }
  | { kind: 'product'; id: string }
  | { kind: 'search'; query?: string }
  | { kind: 'faq'; index: number }
  | { kind: 'cart' }
  | { kind: 'wishlist' }
  | { kind: 'toast'; message: string };

/** href used for progressive enhancement / middle-click on anchor links */
export function actionHref(action: SiteAction): string {
  switch (action.kind) {
    case 'scroll':
      return action.to;
    case 'products':
    case 'product':
      return '#shop';
    case 'gallery':
      return '#gallery';
    case 'faq':
      return '#faq';
    case 'enquiry':
      return '#consultation';
    default:
      return '#';
  }
}
