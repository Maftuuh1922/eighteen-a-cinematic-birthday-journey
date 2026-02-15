import React from 'react';
import { motion } from 'framer-motion';
import { SleepingCat, PawTrail } from '../ui/CatDecorations';

export function WishSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row overflow-hidden h-[100dvh] bg-[#F8F8F5]">
      {/* Left: Photo with overlays */}
      <div className="relative w-full md:w-1/2 h-[40dvh] md:h-full overflow-hidden shrink-0">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/bercanda/1.jpeg"
            className="w-full h-full object-cover"
            alt="Bernadya"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.9px]" />
        </motion.div>

        {/* "TWENTY TWO" top-left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.65, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-5 left-5 z-[2] select-none"
        >
          <span className="font-display text-[clamp(14px,1.8vw,22px)] font-[400] italic text-white uppercase tracking-[0.4em] drop-shadow-[1px_1px_4px_rgba(0,0,0,0.3)]">
            Twenty Two
          </span>
        </motion.div>

        {/* Big "22" */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
          whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.8 }}
          viewport={{ once: true }}
          className="absolute bottom-[15%] left-[5%] z-[2]"
          style={{
            textShadow: '3px 5px 35px rgba(0,0,0,0.5), 0px 0px 40px rgba(255,255,255,0.1)',
            filter: 'drop-shadow(0px 0px 20px rgba(255,255,255,0.3))'
          }}
        >
          <span className="font-script text-[clamp(70px,14vw,140px)] text-white italic leading-[0.9] pointer-events-none select-none">
            22
          </span>
        </motion.div>

        {/* "bernadya ribka" bottom center */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[2] w-full text-center"
        >
          <span className="font-script text-[clamp(20px,3vw,32px)] text-white italic drop-shadow-[2px_2px_8px_rgba(0,0,0,0.4)]">
            bernadya ribka
          </span>
        </motion.div>
      </div>

      {/* Right: Letter / Narrative */}
      <div className="relative w-full md:w-1/2 h-[60dvh] md:h-full bg-[#F8F8F5] flex flex-col shrink-0">
        <div className="flex-1 flex flex-col justify-center px-[clamp(28px,5vw,70px)] py-[clamp(24px,4vh,50px)] overflow-y-auto hide-scrollbar">
          {/* Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-script text-[clamp(32px,5vw,56px)] text-burgundy italic leading-[1.2] mb-[clamp(20px,3vh,36px)] text-left"
          >
            a tribute to her artistry
          </motion.h3>

          {/* Narrative Paragraphs */}
          <div className="space-y-[clamp(12px,2vh,20px)] mb-[clamp(20px,3vh,36px)]">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(13px,1.3vw,15px)] text-[#2a2a2a] leading-[1.75] text-left"
            >
              Bernadya is a mirror for many of us who try to be strong while staying true to ourselves. Through every song, she shows that being vulnerable is not a weakness.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(13px,1.3vw,15px)] text-[#2a2a2a] leading-[1.75] text-left"
            >
              From a simple bedroom to the biggest stages, her journey is proof that an honest voice will always find its listeners. Keep telling your stories, Bernadya.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(13px,1.3vw,15px)] text-[#2a2a2a] leading-[1.75] text-left"
            >
              This is a tribute to all that you have given, and excitement for all that is yet to come.
            </motion.p>
          </div>

          {/* Signature */}
          <div className="pt-[clamp(12px,2vh,20px)] border-t border-burgundy/10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(14px,1.6vw,18px)] font-[600] italic text-burgundy leading-[1.6] text-left mb-3"
              style={{ textShadow: '0 1px 1px rgba(0,0,0,0.05)' }}
            >
              Love you always, Nad! ✨
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 1.6 }}
              viewport={{ once: true }}
              className="font-sans text-[clamp(9px,1vw,11px)] text-[#2a2a2a] tracking-[0.15em] uppercase text-left"
            >
              © 2025 A Tribute to Bernadya
            </motion.div>
          </div>
        </div>
      </div>
      <SleepingCat
        className="absolute bottom-3 right-[8%] z-[15]"
        color="#8B1538"
        opacity={0.08}
        size={45}
        delay={2.5}
      />
    </section>
  );
}