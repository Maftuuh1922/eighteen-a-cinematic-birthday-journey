import React from 'react';
import { motion } from 'framer-motion';
import { PeekingCat, PawTrail } from '../ui/CatDecorations';
export function AchievementSection() {
  const heading = "Bernadya Ribka Jayakusuma";
  return (
    <section className="snap-section flex flex-col md:flex-row overflow-hidden h-[100dvh] bg-white">
      {/* Left 60%: Playful sky blue with clouds */}
      <div
        className="relative w-full md:w-[60%] h-[50dvh] md:h-full overflow-hidden shrink-0"
      >
        {/* Background Image: Clear blue sky clouds */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url("/images/bercanda/2.jpeg")' }}
        />
        {/* Logo: Positioned Absolute Top-8 Left-12 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute top-8 left-8 md:top-12 md:left-12 z-20 flex items-baseline gap-4"
        >
          <span className="font-dancing text-[clamp(60px,8vw,80px)] font-[400] text-white drop-shadow-[2px_2px_8px_rgba(0,0,0,0.2)] leading-none">
            Bernadya
          </span>
          <span className="font-display text-[clamp(24px,4vw,40px)] font-[400] text-[#8B1538] uppercase tracking-[0.05em] leading-none">
            MUSIC
          </span>
        </motion.div>
        {/* Narrative Card: Positioned Absolute Bottom-20 Left-12 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.96, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          viewport={{ once: true }}
          className="absolute bottom-12 left-8 md:bottom-20 md:left-12 z-20 bg-white p-[clamp(32px,4vw,52px)] md:px-[clamp(42px,5vw,55px)] max-w-[560px] w-[calc(100%-64px)] shadow-[0_12px_40px_rgba(0,0,0,0.1)] rounded-none overflow-hidden"
        >
          {/* Dramatic window sunlight shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/15 via-white/5 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/10 via-transparent to-gray-100/20 pointer-events-none" />
          <div className="absolute -left-[20%] top-0 w-[60%] h-full bg-gradient-to-r from-amber-200/8 via-yellow-100/5 to-transparent blur-2xl pointer-events-none" />
          <div className="absolute left-0 top-[20%] w-[40%] h-[60%] bg-gradient-to-br from-amber-300/5 via-orange-100/3 to-transparent blur-xl pointer-events-none" />
          <h2 className="font-display text-[clamp(24px,3vw,28px)] font-bold text-[#1a1a1a] leading-[1.35] mb-[clamp(18px,2vh,24px)] capitalize tracking-[0.01em]">
            {heading}
          </h2>
          <div className="space-y-4 font-georgia text-[clamp(15px,1.6vw,17px)] text-[#3a3a3a] leading-[1.8]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              An artist who heals through the wounds she pours into every note. Her music reminds us that vulnerability is strength, and sadness can be a harbor.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              From small platforms to becoming a voice for millions of hearts, Bernadya proves that honesty in expression will always find its way home.
            </motion.p>
          </div>
        </motion.div>
      </div>
      {/* Right 40%: Burgundy Premium Split */}
      <div
        className="relative w-full md:w-[40%] h-[50dvh] md:h-full shrink-0 bg-gradient-to-b from-[#8B1538] to-[#6B1028] overflow-hidden"
      >
        {/* Juni Records Badge */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 15, delay: 0.8 }}
          viewport={{ once: true }}
          className="absolute top-8 right-8 bg-[#C41E3A] py-[22px] px-[26px] flex flex-col items-center justify-center gap-1 z-30"
        >
          <div className="font-sans font-[700] text-[16px] tracking-[0.1em] text-white">JUNI</div>
          <div className="font-sans font-[700] text-[14px] tracking-[0.15em] text-white opacity-90">RECORDS</div>
        </motion.div>
        {/* Portrait Frame: Centered Arch */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            viewport={{ once: true }}
            className="relative w-[clamp(310px,85%,390px)] h-[clamp(390px,85%,490px)] border-[18px] border-[#8B1538] shadow-[0_15px_50px_rgba(0,0,0,0.3)] bg-[#f5f5f5] overflow-hidden transform-gpu"
            style={{ borderRadius: '50% 50% 0 0' }}
          >
            <motion.img
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 2, delay: 1.2 }}
              viewport={{ once: true }}
              src="/images/bercanda/1.jpeg"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              style={{ filter: 'brightness(1.05) contrast(1.02)' }}
              alt="Bernadya Portrait"
            />
          </motion.div>
        </div>
      </div>
      {/* Cat decorations */}
      <PeekingCat
        className="absolute bottom-0 left-[8%] z-[15]"
        color="#333"
        opacity={0.08}
        size={40}
        delay={2}
      />
      <PawTrail
        className="absolute bottom-4 right-[10%] z-[15]"
        color="#8B1538"
        opacity={0.06}
        count={3}
        delay={2.5}
      />
    </section>
  );
}