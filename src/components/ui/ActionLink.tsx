'use client';

import type { ReactNode } from 'react';
import { actionHref, type SiteAction } from '@/lib/actions';
import { useActions } from '@/components/providers/StoreProvider';

type Props = {
  action: SiteAction;
  className?: string;
  children: ReactNode;
  /** Called before the action runs (e.g. to close a menu) */
  onDone?: () => void;
  ariaLabel?: string;
};

const NAV_KINDS = new Set<SiteAction['kind']>(['scroll', 'products', 'gallery', 'faq']);

/** Renders an in-page anchor for navigational actions and a button for overlay actions. */
export function ActionLink({ action, className, children, onDone, ariaLabel }: Props) {
  const { runAction } = useActions();
  if (NAV_KINDS.has(action.kind)) {
    return (
      <a
        href={actionHref(action)}
        className={className}
        aria-label={ariaLabel}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          onDone?.();
          runAction(action);
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup={action.kind === 'toast' ? undefined : 'dialog'}
      onClick={() => {
        onDone?.();
        runAction(action);
      }}
    >
      {children}
    </button>
  );
}
