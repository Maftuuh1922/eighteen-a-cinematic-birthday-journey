import React from 'react';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="snap-section relative bg-black flex items-center justify-center overflow-hidden">
      {/* Background with Zoom-out */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1600"
          className="w-full h-full object-cover"
          alt="Bernadya Portrait"
        />
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full px-8 md:px-[var(--pad-x)] flex flex-col justify-between py-[var(--pad-y)] backdrop-blur-[2px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="mt-[clamp(12%,15%,18%)] md:mt-[8%]"
        >
          <h1 className="font-display font-[300] text-[clamp(48px,10vw,90px)] text-white leading-[1.05] tracking-[0.15em] uppercase will-change-transform">
            HAPPY<br />BIRTHDAY!
          </h1>
        </motion.div>
        {/* Floating Year Label - Positioned higher on mobile for clearance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 15,
            delay: 1.2,
            duration: 1.5
          }}
          viewport={{ once: true }}
          className="absolute top-[clamp(35%,40%,42%)] md:top-[12%] right-[clamp(5%,10%,15%)] md:right-[8%]"
        >
          <span className="font-script text-[clamp(90px,15vw,160px)] text-white/95 italic text-shadow-premium leading-none">
            21st
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          viewport={{ once: true }}
          className="mb-[8%] ml-[5%] md:ml-0"
        >
          <p className="font-lato font-bold text-[clamp(12px,1.5vw,18px)] text-white/90 tracking-[0.4em] uppercase border-l-4 border-burgundy pl-4">
            March 16, 2025
          </p>
        </motion.div>
      </div>
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-white font-sans">Scroll</span>
      </motion.div>
    </section>
  );
}