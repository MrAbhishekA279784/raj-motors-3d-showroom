'use client';

import { ReactNode } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // studio-freight/react-lenis has a known issue with React 18+ types for children
  const Lenis = ReactLenis as any;
  
  return (
    <Lenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </Lenis>
  );
}
