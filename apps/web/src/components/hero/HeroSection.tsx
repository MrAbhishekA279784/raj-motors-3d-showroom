'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect values
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="hero"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
        {/* Placeholder image until a real asset is available */}
        <div 
          className="w-full h-full bg-[url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
        />
      </motion.div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col items-center top-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl uppercase">
            Raj Motors
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto drop-shadow-lg">
            Experience the ride of your life. Discover precision engineering and raw power.
          </p>
        </motion.div>

        {/* Performance Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 w-full max-w-4xl"
        >
          {[
            { label: 'Max Power', value: '40 HP' },
            { label: 'Top Speed', value: '160 km/h' },
            { label: 'Mileage', value: '45 kmpl' },
          ].map((stat, i) => (
            <div 
              key={stat.label}
              className="backdrop-blur-sm bg-black/30 border border-white/10 rounded-2xl p-6 text-center transform transition-transform hover:scale-105"
            >
              <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-widest">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mt-2 font-mono">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20"
        >
          <a
            href="#catalog"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 font-pj rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>
    </section>
  );
}
