'use client';

import dynamic from 'next/dynamic';

const BikeViewerSection = dynamic(() => import('./BikeViewerSection'), { ssr: false });

export default function BikeViewerWrapper() {
  return <BikeViewerSection />;
}
