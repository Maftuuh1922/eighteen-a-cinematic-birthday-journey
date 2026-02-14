import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrisaktiSection } from '@/components/sections/TrisaktiSection';
import { RankSection } from '@/components/sections/RankSection';
import { FirstOnMindSection } from '@/components/sections/FirstOnMindSection';
import { FinalWishesSection } from '@/components/sections/FinalWishesSection';
export function HomePage() {
  return (
    <main className="snap-container bg-black selection:bg-burgundy selection:text-white">
      {/* Cinematic Linear Journey */}
      <div className="relative z-10">
        <HeroSection />
        <TrisaktiSection />
        <RankSection />
        <FirstOnMindSection />
        <FinalWishesSection />
      </div>
      {/* Persistent Brand Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2, delay: 1 }}
        className="fixed top-10 left-10 z-50 pointer-events-none select-none mix-blend-difference hidden md:block"
      >
        <span className="font-display italic text-2xl text-white tracking-[0.25em] font-light">
          EIGHTEEN
        </span>
      </motion.div>
      {/* Mobile Indicator */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none md:hidden">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-1 h-8 bg-white/20 rounded-full"
        />
      </div>
    </main>
  );
}