import React from 'react';
import { motion } from 'framer-motion';
export function FinalWishesSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row">
      {/* Left Visual Column */}
      <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center bg-black shrink-0">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale opacity-60 scale-105"
          style={{ backgroundImage: 'url("/images/bercanda/6.jpeg")' }}
        />
        <div className="absolute inset-0 bg-burgundy/20 mix-blend-color" />
        <div className="absolute top-8 left-8 md:top-10 md:left-10 z-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.8 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="font-display italic text-base md:text-2xl text-white/60 tracking-[0.25em] uppercase"
          >
            EIGHTEEN
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="relative z-10 text-center"
        >
          <span className="font-script text-[clamp(120px,18vw,220px)] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] block">18th</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-0 right-0 z-10 text-center px-4"
        >
          <span className="font-script text-[clamp(28px,5vw,42px)] text-white italic tracking-wide drop-shadow-md">ratu dissya tamita</span>
        </motion.div>
      </div>
      {/* Right Content Column */}
      <div className="w-full md:w-1/2 h-[60%] md:h-full bg-off_white flex flex-col justify-center p-8 md:p-[10%] relative overflow-y-auto hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-10 right-10 md:top-12 md:right-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="font-script text-[clamp(48px,8vw,80px)] text-burgundy/80 italic leading-none"
          >
            to love
          </motion.span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-[540px] space-y-6 md:space-y-8 font-georgia text-[clamp(15px,2vw,17px)] leading-[1.8] md:leading-[2.0] text-[#2a2a2a] text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
          >
            Bernadya is a reminder that we all have stories worth telling. Through her music, she shows that the courage to be vulnerable is the greatest strength we can have.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            viewport={{ once: true }}
          >
            Thank you for being the voice for those who cannot express their own feelings. Your songs are a harbor in the ocean of sadness.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            viewport={{ once: true }}
          >
            Keep telling your stories, Bernadya. This world needs more honest voices like yours. We will always look forward to new songs that will accompany us on our life journeys.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2 }}
            className="pt-8 md:pt-12 text-right"
          >
            <span className="font-script text-[clamp(32px,5vw,42px)] text-burgundy italic block border-t border-burgundy/10 pt-4">ratu dissya tamita</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}