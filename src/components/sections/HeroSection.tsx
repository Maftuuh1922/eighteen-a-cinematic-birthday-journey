import React from 'react';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="snap-section bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=2069&auto=format&fit=crop")' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="font-sans tracking-[0.3em] text-white/80 text-sm md:text-base uppercase mb-4 block">
            A Journey to Adulthood
          </span>
          <h1 className="font-display text-6xl md:text-9xl text-white font-bold leading-none mb-2">
            RATUE <br />
            <span className="text-burgundy drop-shadow-lg">DISSYA</span>
          </h1>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-white/30" />
            <span className="font-script text-3xl md:text-5xl text-white/90">Tamita</span>
            <div className="h-px w-12 bg-white/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center"
        >
          <p className="font-sans text-white/60 text-xs tracking-widest uppercase mb-4">
            Celebrating 18 Years
          </p>
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}