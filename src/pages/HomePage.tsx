import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CinematicHero } from '@/components/sections/CinematicHero';
import { QuoteSection } from '@/components/sections/QuoteSection';
import { PhotoGridSection } from '@/components/sections/PhotoGridSection';
import { FlipbookSection } from '@/components/sections/FlipbookSection';
import { MessageSection } from '@/components/sections/MessageSection';
import { OutroSection } from '@/components/sections/OutroSection';
import { MemoryReelSection } from '@/components/sections/MemoryReelSection';

import { motion, AnimatePresence } from 'framer-motion';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'quote', label: '17th' },
  { id: 'photos', label: 'Momen' },
  { id: 'flipbook', label: 'Album' },
  { id: 'message', label: 'Surat' },
  { id: 'outro', label: 'Outro' },
  { id: 'memory-reel', label: 'Reel' }
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
    const index = Math.floor((scrollPos + height / 2) / height);
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
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  return (
    <main
      ref={containerRef}
      className="snap-container bg-background selection:bg-gold_accent selection:text-background"
    >
      <div className="relative z-10 w-full">
        {/* Film grain noise background globally enforced through index.css overlay */}
        <div className="noise-bg pointer-events-none" />

        <div id="section-0" className="snap-section-wrapper"><CinematicHero /></div>
        <div id="section-1" className="snap-section-wrapper"><QuoteSection /></div>
        <div id="section-2" className="snap-section-wrapper"><PhotoGridSection /></div>
        <div id="section-3" className="snap-section-wrapper"><FlipbookSection /></div>
        <div id="section-4" className="snap-section-wrapper"><MessageSection /></div>
        <div id="section-5" className="snap-section-wrapper"><OutroSection /></div>
        <div id="section-6" className="snap-section-wrapper"><MemoryReelSection /></div>
      </div>

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
                  animate={{ opacity: 0.8, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="text-[10px] font-subtitle tracking-[0.25em] uppercase text-soft_cream"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>
            <div className="w-[2px] h-10 bg-soft_cream/10 relative overflow-hidden transition-colors duration-300 group-hover:bg-soft_cream/30">
              <motion.div
                initial={false}
                animate={{
                  scaleY: activeSection === i ? 1 : 0,
                  backgroundColor: activeSection === i ? "#d4a847" : "rgba(245, 237, 224, 0.1)"
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-top"
              />
            </div>
          </button>
        ))}
      </nav>

      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] md:hidden bg-soft_cream/10">
        <motion.div
          className="h-full bg-gold_accent shadow-[0_0_15px_rgba(212,168,71,0.5)]"
          animate={{
            width: `${((activeSection + 1) / SECTIONS.length) * 100}%`,
          }}
          transition={{
            width: { duration: 0.4, ease: "easeOut" }
          }}
        />
      </div>
    </main>
  );
}