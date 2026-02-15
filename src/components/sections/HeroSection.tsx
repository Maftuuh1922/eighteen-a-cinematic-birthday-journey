import React from 'react';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="snap-section relative bg-black flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
      {/* Background with Zoom-out */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
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
      <div className="relative z-10 w-full h-full px-8 md:px-[var(--pad-x)] flex flex-col justify-between py-[var(--pad-y)] backdrop-blur-[1px]">
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mt-[clamp(12%,15%,18%)] md:mt-[8%] transform-gpu"
        >
          <h1 className="font-display font-[300] text-[clamp(48px,10vw,90px)] text-white leading-[1.05] tracking-[0.15em] uppercase">
            HAPPY<br />BIRTHDAY!
          </h1>
        </motion.div>
        {/* Floating Year Label - High fidelity staggered entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: 25, z: -100 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -5, z: 0 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 18,
            delay: 1.4,
            duration: 1.8
          }}
          viewport={{ once: true }}
          className="absolute top-[clamp(35%,40%,42%)] md:top-[12%] right-[clamp(5%,10%,15%)] md:right-[8%] transform-gpu"
        >
          <span className="font-script text-[clamp(90px,15vw,160px)] text-white/95 italic text-shadow-premium leading-none block">
            21st
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 2.2 }}
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
        transition={{ delay: 3.2, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-white font-sans">Scroll to begin</span>
      </motion.div>
    </section>
  );
}