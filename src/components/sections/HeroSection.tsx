import React from 'react';
import { motion } from 'framer-motion';
export function HeroSection() {
  return (
    <section className="snap-section bg-[#1a1a1a]">
      {/* Background with 0.35 dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1511221159820-22123d9061c0?q=80&w=2070&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
      </div>
      <div className="relative h-full w-full">
        {/* HAPPY BIRTHDAY! - Center Left 8% padding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-[8%] top-1/2 -translate-y-1/2 max-w-2xl"
        >
          <h1 className="font-display text-[clamp(56px,10vw,90px)] text-white font-light uppercase leading-[1.1] tracking-[0.15em] text-shadow-lg">
            HAPPY <br /> BIRTHDAY!
          </h1>
        </motion.div>
        {/* 18th - Top Right 5% 8% padding */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-[5%] right-[8%] text-right"
        >
          <span className="font-script text-[clamp(80px,12vw,130px)] text-white/95 italic leading-none block">
            18th
          </span>
        </motion.div>
        {/* December 21, 2025 - Bottom Left 5% 8% padding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-[5%] left-[8%]"
        >
          <p className="font-sans text-[clamp(14px,2vw,18px)] font-extralight text-white tracking-[0.2em] uppercase">
            December 21, 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}