import React, { useState, useEffect, useRef, useCallback } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AchievementSection } from '@/components/sections/AchievementSection';
import { SpotifySection } from '@/components/sections/SpotifySection';
import { AmiSection } from '@/components/sections/AmiSection';
import { WishSection } from '@/components/sections/WishSection';
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
  const lastHeight = useRef(0);
  const isScrolling = useRef(false);
  const updateActiveSection = useCallback(() => {
    const container = containerRef.current;
    if (!container || isScrolling.current) return;
    const scrollPos = container.scrollTop;
    const height = container.clientHeight;
    if (height === 0) return;
    const index = Math.round(scrollPos / height);
    if (index >= 0 && index < SECTIONS.length) {
      setActiveSection((prev) => (prev !== index ? index : prev));
    }
  }, []);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    lastHeight.current = container.clientHeight;
    const handleScroll = () => {
      window.requestAnimationFrame(updateActiveSection);
    };
    const handleResize = () => {
      const currentHeight = container.clientHeight;
      // Only re-scroll if the height changed significantly (ignores mobile URL bar jitter)
      if (Math.abs(currentHeight - lastHeight.current) > 50) {
        lastHeight.current = currentHeight;
        container.scrollTo({
          top: activeSection * currentHeight,
          behavior: 'auto'
        });
      }
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSection, updateActiveSection]);
  const scrollToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    isScrolling.current = true;
    setActiveSection(index);
    container.scrollTo({
      top: index * container.clientHeight,
      behavior: 'smooth'
    });
    // Reset scroll lock after animation duration
    setTimeout(() => {
      isScrolling.current = false;
    }, 800);
  };
  return (
    <main
      ref={containerRef}
      className="snap-container bg-burgundy selection:bg-skyBlue selection:text-burgundy"
    >
      <div className="relative z-10">
        <div id="section-0" className="snap-section-wrapper"><HeroSection /></div>
        <div id="section-1" className="snap-section-wrapper"><AchievementSection /></div>
        <div id="section-2" className="snap-section-wrapper"><SpotifySection /></div>
        <div id="section-3" className="snap-section-wrapper"><AmiSection /></div>
        <div id="section-4" className="snap-section-wrapper"><WishSection /></div>
      </div>
      {/* Side Navigation Indicators */}
      <nav className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 hidden md:flex">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            className="group flex items-center justify-end gap-4 focus:outline-none"
            aria-label={`Scroll to ${section.label}`}
          >
            <AnimatePresence mode="wait">
              {activeSection === i && (
                <motion.span
                  key={`label-${section.id}`}
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
                animate={{ 
                  scaleY: activeSection === i ? 1 : 0,
                  backgroundColor: activeSection === i ? "#FFFFFF" : "rgba(255,255,255,0.2)"
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-top"
              />
            </div>
          </button>
        ))}
      </nav>
      {/* Mobile Scroll Indicator Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] md:hidden bg-white/10">
        <motion.div
          className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          animate={{ 
            width: `${((activeSection + 1) / SECTIONS.length) * 100}%`,
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            width: { duration: 0.4, ease: "easeOut" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </div>
    </main>
  );
}