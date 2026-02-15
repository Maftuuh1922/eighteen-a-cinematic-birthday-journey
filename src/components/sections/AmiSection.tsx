import React from 'react';
import { motion } from 'framer-motion';
import { PeekingCat, PawTrail } from '../ui/CatDecorations';
export function AmiSection() {
  const images = [
    "/images/bercanda/2.jpeg",
    "/images/bercanda/3.jpeg",
    "/images/bercanda/4.jpeg",
    "/images/bercanda/5.jpeg",
    "/images/bercanda/6.jpeg"
  ];
  return (
    <section className="snap-section bg-[#F5F5F0] flex flex-col md:flex-row overflow-hidden">
      {/* Left 55%: Text */}
      <div className="w-full md:w-[55%] h-full p-8 md:p-[var(--pad-x)] flex flex-col justify-center overflow-y-auto hide-scrollbar shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-[clamp(32px,5vw,52px)] text-[#2a2a2a] leading-tight mb-8 md:mb-12">
            The Artist with <br />
            <motion.span
              initial={{ scale: 0.5, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.7 }}
              viewport={{ once: true }}
              className="font-script text-[clamp(60px,8vw,95px)] italic text-burgundy inline-block leading-none align-middle"
            >
              3
            </motion.span>
            <span className="font-display italic font-[300] ml-3 md:ml-4 text-[clamp(24px,4vw,40px)] align-middle">AMI Awards</span>
          </h2>
          <div className="space-y-6 md:space-y-8 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
              className="font-georgia text-[15px] md:text-[16px] text-[#2a2a2a] leading-[1.8] font-bold uppercase tracking-wide"
            >
              ANUGERAH MUSIK INDONESIA IS A WITNESS TO HARD WORK, TEARS, AND ENDLESS DEDICATION.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
              className="font-georgia text-[15px] md:text-[16px] text-[#4a4a4a] leading-[1.8]"
            >
              From a newcomer to becoming a pillar of melancholic pop music, Bernadya proves that musical quality will always find its way. Every trophy is an embrace from the industry for the honesty she offers.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              viewport={{ once: true }}
              className="font-georgia text-[15px] md:text-[16px] text-burgundy leading-[1.8] font-bold italic"
            >
              Keep flying high, this is just the beginning of your long journey!
            </motion.p>
          </div>
        </motion.div>
      </div>
      {/* Right 45%: Masonry */}
      <div className="w-full md:w-[45%] h-full p-4 md:p-8 grid grid-cols-2 gap-2 md:gap-4 content-center bg-white/30 shrink-0">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.7, rotate: (i % 2 === 0 ? 10 : -10) }}
            whileInView={{ opacity: 1, scale: 1, rotate: (i % 2 === 0 ? 5 : -5) }}
            whileHover={{ y: -8, rotate: 0, scale: 1.05, zIndex: 20 }}
            transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 80 }}
            viewport={{ once: true }}
            className={`bg-white p-2 md:p-3 shadow-xl overflow-hidden cursor-pointer will-change-transform ${i === 2 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
          >
            <div className="w-full h-full overflow-hidden bg-gray-100 relative group">
              <motion.img
                src={img}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={`Award Moment ${i}`}
              />
              <div className="absolute inset-0 bg-burgundy/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
      <PeekingCat
        className="absolute bottom-0 left-[3%] z-[15]"
        color="white"
        opacity={0.1}
        size={38}
        delay={2}
      />
      <PawTrail
        className="absolute bottom-3 right-[5%] z-[15]"
        color="white"
        opacity={0.06}
        count={3}
        delay={2.5}
      />
    </section>
  );
}