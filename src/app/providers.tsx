'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { StoreProvider } from '@/components/providers/StoreProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <StoreProvider>{children}</StoreProvider>
    </MotionConfig>
  );
}
