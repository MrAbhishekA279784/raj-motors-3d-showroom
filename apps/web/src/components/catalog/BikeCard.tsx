'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Bike } from '@ktm/shared';
import { ChevronRight } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
}

export default function BikeCard({ bike }: BikeCardProps) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-2">
      {/* Image container */}
      <div className="relative h-64 w-full bg-black/50 overflow-hidden">
        {/* We use a standard img tag with an unoptimized src for the MVP placeholder until Next Image is configured for the remote domain */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={bike.image || 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop'}
          alt={bike.bike_name}
          className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
      </div>

      {/* Content */}
      <div className="p-6 relative z-10 -mt-10">
        <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
          {bike.bike_name}
        </h3>
        
        <div className="flex justify-between items-end mb-6">
          <p className="text-red-500 font-mono text-xl font-semibold">
            ₹{bike.price.toLocaleString('en-IN')}
          </p>
          <p className="text-gray-400 text-sm">Ex-Showroom</p>
        </div>

        {/* Specs Mini-Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 rounded-lg p-3 border border-white/5">
            <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Engine</span>
            <span className="text-white text-sm font-medium">{bike.engine}</span>
          </div>
          <div className="bg-black/30 rounded-lg p-3 border border-white/5">
            <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Mileage</span>
            <span className="text-white text-sm font-medium">{bike.mileage}</span>
          </div>
        </div>

        {/* Action Button */}
        <a 
          href="#bikes"
          onClick={(e) => {
            // We allow the default anchor scroll behavior but emit an event to the viewer
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('select-bike-3d', { detail: { bike } }));
            }
          }}
          className="w-full flex items-center justify-center space-x-2 bg-white text-black py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <span>VIEW IN 3D</span>
          <ChevronRight size={18} />
        </a>
      </div>
    </div>
  );
}
