import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
export function ArtistHero() {
  return (
    <section className="snap-section bg-gradient-to-br from-priPurple via-[#4A2C4E] to-ltPurple noise-bg flex flex-col items-center justify-center text-cream px-[var(--pad-x)] relative overflow-hidden">
      <div className="z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-[300] tracking-[0.1em] md:tracking-[0.15em] text-[clamp(56px,12vw,140px)] leading-none uppercase mb-6"
        >
          Bernadya
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans font-[300] tracking-[0.15em] md:tracking-[0.2em] uppercase text-[clamp(12px,2vw,18px)]"
        >
          Melancholic Pop from Surabaya
        </motion.p>
      </div>
      <div className="absolute bottom-[18vh] md:bottom-[15vh] w-full px-[var(--pad-x)] z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-x-8 gap-y-10 md:gap-24 text-center max-w-5xl mx-auto"
        >
          <div className="flex flex-col min-w-[120px]">
            <span className="font-sans font-semibold text-wCream text-[clamp(24px,4vw,42px)] leading-tight">12.7M+</span>
            <span className="font-sans text-[clamp(11px,1.5vw,14px)] opacity-80">Monthly Listeners</span>
            <span className="text-[10px] opacity-50 uppercase tracking-widest mt-1">Spotify</span>
          </div>
          <div className="flex flex-col min-w-[120px]">
            <span className="font-sans font-semibold text-wCream text-[clamp(24px,4vw,42px)] leading-tight">100M+</span>
            <span className="font-sans text-[clamp(11px,1.5vw,14px)] opacity-80">Album Streams</span>
            <span className="text-[10px] opacity-50 uppercase tracking-widest mt-1">Debut Era</span>
          </div>
          <div className="flex flex-col min-w-[120px]">
            <span className="font-sans font-semibold text-wCream text-[clamp(24px,4vw,42px)] leading-tight">3</span>
            <span className="font-sans text-[clamp(11px,1.5vw,14px)] opacity-80">AMI Awards</span>
            <span className="text-[10px] opacity-50 uppercase tracking-widest mt-1">2024</span>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}