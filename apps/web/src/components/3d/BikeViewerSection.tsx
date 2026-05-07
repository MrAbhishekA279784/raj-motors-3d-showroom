'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BikeCanvas from './BikeCanvas';
import { X, Info, Gauge, Zap, Navigation, Flag } from 'lucide-react';
import { Bike } from '@ktm/shared';

export default function BikeViewerSection() {
  const [activeBike, setActiveBike] = useState<Bike | null>(null);
  
  useEffect(() => {
    const handleSelectBike = (e: Event) => {
      const customEvent = e as CustomEvent;
      setActiveBike(customEvent.detail.bike);
      
      const viewerSection = document.getElementById('bikes');
      if (viewerSection) {
        viewerSection.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('select-bike-3d', handleSelectBike);
    return () => window.removeEventListener('select-bike-3d', handleSelectBike);
  }, []);

  return (
    <section id="bikes" className="relative h-[100svh] w-full bg-zinc-900 border-t border-white/5 overflow-hidden">
      
      {/* Main 3D Canvas - Center */}
      <div className="absolute inset-0 z-0">
        <BikeCanvas activeBikeId={activeBike?.id || null} />
      </div>

      {/* Dynamic Overlay Panels */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col md:flex-row p-6 md:p-12 justify-between items-start md:items-center">
        
        {/* LEFT COMPONENT - Context & Info Panel */}
        <div className="w-full md:w-1/3 flex flex-col h-full justify-between pointer-events-auto z-20">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white drop-shadow-md">
              Digital Showroom
            </h2>
            <p className="text-zinc-400 mt-2 font-mono text-sm max-w-sm hidden md:block">
              Use your mouse or finger to interact with the models. Click & drag to rotate, scroll to zoom.
            </p>
          </div>

          <AnimatePresence>
            {activeBike && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                className="mt-auto md:w-full max-w-sm backdrop-blur-md bg-zinc-950/80 border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white uppercase tracking-widest leading-tight">
                    {activeBike.bike_name}
                  </h3>
                  <p className="text-red-500 font-mono text-2xl font-semibold mt-2">
                    ₹{activeBike.price.toLocaleString('en-IN')}
                  </p>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-widest">Ex-Showroom Price</p>
                </div>

                <a
                  href="#contact"
                  className="block w-full text-center bg-white text-black py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Book Test Ride
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER COMPONENT - Close Button */}
        <div className="absolute top-6 right-6 md:top-12 md:right-1/2 md:translate-x-1/2 pointer-events-auto z-50">
          <AnimatePresence>
            {activeBike && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setActiveBike(null)}
                className="bg-red-600 hover:bg-red-500 text-white rounded-full p-3 transition-colors shadow-lg flex items-center justify-center group"
                title="Exit 3D View"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COMPONENT - Specs Panel */}
        <div className="w-full md:w-1/3 flex flex-col h-full justify-end md:justify-center items-end mt-4 md:mt-0 pointer-events-auto z-20 hidden md:flex">
          <AnimatePresence>
            {activeBike && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                className="w-full max-w-sm backdrop-blur-md bg-zinc-950/80 border border-white/10 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                  <Info size={20} className="text-red-500" />
                  <h4 className="text-xl font-bold text-white uppercase tracking-widest">
                    Specifications
                  </h4>
                </div>
                
                <div className="space-y-3 font-mono text-sm">
                  {[
                    { label: 'Engine', value: activeBike.engine, icon: <Zap size={16} /> },
                    { label: 'Power', value: activeBike.power, icon: <Gauge size={16} /> },
                    { label: 'Top Speed', value: activeBike.top_speed, icon: <Flag size={16} /> },
                    { label: 'Mileage', value: activeBike.mileage, icon: <Navigation size={16} /> },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between items-center bg-black/40 p-3.5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                      <span className="text-zinc-400 uppercase tracking-widest flex items-center gap-3 text-xs">
                         <span className="text-zinc-600">{spec.icon}</span>
                         {spec.label}
                      </span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE OVERLAY SPECS SCROLL (Optional but good for responsiveness) */}
        <div className="w-full md:hidden absolute bottom-6 left-0 px-6 pointer-events-auto z-20 pb-[160px]">
          <AnimatePresence>
            {activeBike && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50, transition: { duration: 0.2 } }}
                className="w-full flex gap-3 overflow-x-auto pb-4 no-scrollbar hide-scroll"
              >
                 {[
                    { label: 'Engine', value: activeBike.engine },
                    { label: 'Power', value: activeBike.power },
                    { label: 'Speed', value: activeBike.top_speed },
                    { label: 'Mileage', value: activeBike.mileage },
                  ].map((spec) => (
                    <div key={spec.label} className="min-w-[120px] backdrop-blur-md bg-zinc-950/80 p-3 rounded-xl border border-white/10 flex flex-col justify-center items-center">
                      <span className="text-zinc-500 uppercase tracking-widest text-[10px] mb-1">{spec.label}</span>
                      <span className="text-white font-bold font-mono text-sm">{spec.value}</span>
                    </div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

