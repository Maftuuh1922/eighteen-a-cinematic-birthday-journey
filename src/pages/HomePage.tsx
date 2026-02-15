import React, { useState, useEffect, useRef } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AchievementSection } from '@/components/sections/AchievementSection';
import { SpotifySection } from '@/components/sections/SpotifySection';
import { AmiSection } from '@/components/sections/AmiSection';
import { WishSection } from '@/components/sections/WishSection';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
const SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'achievement', label: 'History' },
  { id: 'spotify', label: 'Records' },
  { id: 'ami', label: 'Awards' },
  { id: 'wish', label: 'Wishes' }
];
export function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollPos / height);
      if (index !== activeSection) {
        setActiveSection(index);
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: 'smooth'
    });
  };
  return (
    <main 
      ref={containerRef}
      className="snap-container bg-burgundy selection:bg-skyBlue selection:text-burgundy"
    >
      <div className="relative z-10">
        <div id="section-0"><HeroSection /></div>
        <div id="section-1"><AchievementSection /></div>
        <div id="section-2"><SpotifySection /></div>
        <div id="section-3"><AmiSection /></div>
        <div id="section-4"><WishSection /></div>
      </div>
      {/* Side Navigation Indicators */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 hidden md:flex">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            className="group flex items-center justify-end gap-4 focus:outline-none"
            aria-label={`Scroll to ${section.label}`}
          >
            <AnimatePresence>
              {activeSection === i && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-[10px] font-sans tracking-[0.2em] uppercase text-white"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>
            <div className="w-[2px] h-10 bg-white/20 relative overflow-hidden transition-colors duration-300 group-hover:bg-white/40">
              <motion.div
                initial={false}
                animate={{ scaleY: activeSection === i ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 bg-white origin-top"
              />
            </div>
          </button>
        ))}
      </div>
      {/* Mobile Scroll Indicator Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[100] md:hidden bg-white/10">
        <motion.div 
          className="h-full bg-burgundy shadow-[0_0_10px_rgba(139,21,56,0.5)]"
          animate={{ width: `${((activeSection + 1) / SECTIONS.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </main>
  );
}