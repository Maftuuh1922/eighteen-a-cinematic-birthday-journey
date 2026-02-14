import React from 'react';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="snap-section relative bg-black flex items-center justify-center overflow-hidden">
      {/* Background with Zoom-out */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1600"
          className="w-full h-full object-cover"
          alt="Bernadya Portrait"
        />
        <div className="absolute inset-0 bg-black/35" />
      </motion.div>
      {/* Typography Reveals */}
      <div className="relative z-10 w-full h-full px-[var(--pad-x)] flex flex-col justify-between py-[var(--pad-y)]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true }}
          className="mt-[8%]"
        >
          <h1 className="font-display font-[300] text-[clamp(56px,10vw,90px)] text-white leading-[1.1] tracking-[0.15em] uppercase will-change-transform">
            HAPPY<br />BIRTHDAY!
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 10, 
            delay: 0.7, 
            duration: 1.5 
          }}
          viewport={{ once: true }}
          className="absolute top-[8%] right-[5%] md:right-[8%]"
        >
          <span className="font-script text-[clamp(80px,12vw,130px)] text-white italic drop-shadow-2xl">
            21st
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="mb-[8%] ml-[5%]"
        >
          <p className="font-lato font-[300] text-[clamp(14px,1.5vw,18px)] text-white tracking-[0.3em] uppercase">
            March 16, 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}