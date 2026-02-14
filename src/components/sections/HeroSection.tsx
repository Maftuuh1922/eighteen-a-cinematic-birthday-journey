import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
export function HeroSection() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  return (
    <section
      style={{ position: 'relative' }}
      className="snap-section bg-[#1a1a1a] overflow-hidden"
    >
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1511221159820-22123d9061c0?q=80&w=2070&auto=format&fit=crop")',
          }}
        />
        <div className="absolute inset-0 bg-black/40 z-10" />
      </motion.div>
      <div className="relative h-full w-full flex flex-col justify-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="pl-[8%] max-w-4xl"
        >
          <h1 className="font-display text-[clamp(44px,12vw,110px)] text-white font-light uppercase leading-[1] tracking-[0.15em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            HAPPY <br /> <span className="font-medium">BIRTHDAY!</span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-[8%] right-[8%] text-right"
        >
          <span className="font-script text-[clamp(70px,15vw,180px)] text-white/95 italic leading-none block drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
            18th
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-[8%] left-[8%]"
        >
          <p className="font-sans text-[clamp(12px,2.5vw,22px)] font-light text-white tracking-[0.3em] uppercase drop-shadow-md">
            December 21, 2025
          </p>
        </motion.div>
      </div>
    </section>
  );
}