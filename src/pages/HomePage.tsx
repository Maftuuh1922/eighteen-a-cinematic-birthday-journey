import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrisaktiSection } from '@/components/sections/TrisaktiSection';
import { RankSection } from '@/components/sections/RankSection';
import { FirstOnMindSection } from '@/components/sections/FirstOnMindSection';
import { FinalWishesSection } from '@/components/sections/FinalWishesSection';
export function HomePage() {
  const [showIndicator, setShowIndicator] = useState(true);
  useEffect(() => {
    const handleScroll = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 100) {
        setShowIndicator(false);
      } else {
        setShowIndicator(true);
      }
    };
    const container = document.querySelector('.snap-container');
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <main className="snap-container">
      <HeroSection />
      <TrisaktiSection />
      <RankSection />
      <FirstOnMindSection />
      <FinalWishesSection />
      <AnimatePresence>
        {showIndicator && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/40 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MousePointer2 className="w-5 h-5 mb-2" />
            </motion.div>
            <span className="text-[10px] tracking-[0.4em] uppercase font-sans">Scroll Journey</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <span className="font-logo text-2xl text-white/20 mix-blend-difference">18</span>
      </div>
    </main>
  );
}