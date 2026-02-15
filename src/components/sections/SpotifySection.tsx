import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StretchingCat, PawTrail } from '../ui/CatDecorations';

export function SpotifySection() {
  return (
    <section className="snap-section relative w-full h-[100dvh] bg-blueGray overflow-hidden select-none">
      {/* Gothic texture overlays */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
        {/* Vertical line pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }}
        />
        {/* Cross-hatch gothic pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px), repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255,255,255,0.1) 30px, rgba(255,255,255,0.1) 31px)' }}
        />
        {/* Subtle noise grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
        />
        {/* Gothic arch decorative element - top corners */}
        <svg className="absolute top-0 left-0 w-[120px] h-[120px] opacity-[0.06]" viewBox="0 0 120 120">
          <path d="M0,0 L0,120 Q60,60 120,0 Z" fill="white" />
        </svg>
        <svg className="absolute top-0 right-0 w-[120px] h-[120px] opacity-[0.06]" viewBox="0 0 120 120">
          <path d="M120,0 L120,120 Q60,60 0,0 Z" fill="white" />
        </svg>
      </div>

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-[50fr_50fr] h-full w-full relative z-10">

        {/* LEFT COLUMN */}
        <div className="relative flex flex-col justify-center h-full w-full z-20 px-[clamp(28px,5vw,70px)] py-[clamp(24px,4vh,50px)]">

          {/* Red banner - top accent */}
          <motion.div
            initial={{ x: -200, rotate: -5, opacity: 0 }}
            whileInView={{ x: 0, rotate: -2, opacity: 1 }}
            transition={{ type: "spring", damping: 15, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex self-start mb-[clamp(16px,3vh,28px)]
              bg-[#8B1538] px-[clamp(20px,3vw,36px)] py-[clamp(8px,1.2vh,14px)]
              shadow-[0_8px_25px_rgba(139,21,56,0.4)] transform-gpu"
          >
            <span className="font-display font-[400] text-[clamp(14px,1.8vw,22px)] text-white uppercase tracking-[0.08em]">
              12.7M Monthly Listeners!!
            </span>
          </motion.div>

          {/* "Bernadya" + "#1" */}
          <div className="flex items-end gap-[clamp(8px,1.5vw,20px)] mb-[clamp(20px,4vh,40px)]">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="font-display font-[300] text-[clamp(28px,4.5vw,52px)] text-white uppercase tracking-[0.18em] leading-none"
            >
              Bernadya
            </motion.h2>
            <motion.span
              initial={{ scale: 0.3, opacity: 0, rotate: -15 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 80, delay: 0.2 }}
              viewport={{ once: true }}
              className="font-script text-[clamp(60px,9vw,110px)] text-white/90 leading-[0.7] italic"
            >
              #1
            </motion.span>
            {/* Star */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="ml-auto"
            >
              <Star className="w-[clamp(24px,3vw,40px)] h-[clamp(24px,3vw,40px)] text-white/80" fill="white" strokeWidth={0} />
            </motion.div>
          </div>

          {/* White card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white/95 p-[clamp(20px,3vw,36px)]
              max-w-[480px] w-full shadow-[0_12px_40px_rgba(0,0,0,0.12)]
              border-l-[6px] border-burgundy transform-gpu relative"
          >
            {/* Gothic ornament inside card */}
            <div className="absolute top-3 right-3 w-8 h-8 opacity-[0.08]">
              <svg viewBox="0 0 40 40" fill="currentColor" className="text-burgundy">
                <path d="M20,0 L24,16 L40,20 L24,24 L20,40 L16,24 L0,20 L16,16 Z" />
              </svg>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(16px,2.2vw,22px)] font-[700] text-[#1a1a1a]
                leading-[1.35] mb-[clamp(10px,1.5vh,16px)] uppercase tracking-[0.02em]"
            >
              MOST STREAMED FEMALE ARTIST... INSANE!
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(12px,1.3vw,14px)] font-[400] text-[#3a3a3a]
                leading-[1.7] tracking-[0.01em] italic"
            >
              "This isn't just a number, it's proof that honesty in your lyrics has found a home in millions of hearts. Bernadya broke this insane record... INSANE!"
            </motion.p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Polaroid Gallery */}
        <div className="relative flex items-center justify-center h-full w-full
          px-[clamp(20px,3vw,50px)] py-[clamp(24px,4vh,40px)] z-10
          min-h-[45dvh] lg:min-h-full">

          {/* "1 OF 3" badge */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
            viewport={{ once: true }}
            className="absolute top-[clamp(14px,3vh,28px)] right-[clamp(14px,3vw,28px)]
              bg-white w-[clamp(56px,7vw,76px)] h-[clamp(56px,7vw,76px)]
              rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-20 pointer-events-none"
          >
            <span className="font-lato font-[700] text-[clamp(10px,1.1vw,13px)] text-[#2a2a2a] tracking-[0.05em]">
              1 OF 3
            </span>
          </motion.div>

          {/* Polaroid bloom - fanned out from center */}
          <div className="relative w-full max-w-[450px] h-[55dvh] lg:h-[65dvh] mx-auto flex items-center justify-center">
            {/* Far left */}
            <PolaroidItem
              src="/images/bercanda/6.jpeg"
              caption="vibes"
              rotation={-18}
              zIndex={1}
              delay={0.8}
              className="top-[22%] left-[-2%]"
            />
            {/* Left */}
            <PolaroidItem
              src="/images/bercanda/3.jpeg"
              caption="on stage"
              rotation={-8}
              zIndex={2}
              delay={0.5}
              className="top-[12%] left-[14%]"
            />
            {/* Center - front */}
            <PolaroidItem
              src="/images/bercanda/4.jpeg"
              caption="the craft"
              rotation={0}
              zIndex={5}
              delay={0.2}
              className="top-[18%] left-1/2 -translate-x-1/2"
            />
            {/* Right */}
            <PolaroidItem
              src="/images/bercanda/5.jpeg"
              caption="studio time"
              rotation={8}
              zIndex={2}
              delay={0.5}
              className="top-[12%] right-[14%]"
            />
            {/* Far right */}
            <PolaroidItem
              src="/images/bercanda/7.jpeg"
              caption="golden hour"
              rotation={18}
              zIndex={1}
              delay={0.8}
              className="top-[22%] right-[-2%]"
            />
          </div>
        </div>
      </div>

      <StretchingCat
        className="absolute bottom-3 left-[5%] z-[20]"
        color="white"
        opacity={0.1}
        size={45}
        delay={1.5}
      />
      <PawTrail
        className="absolute bottom-6 right-[15%] z-[20]"
        color="white"
        opacity={0.06}
        count={4}
        delay={2}
      />
      {/* Gothic decorative bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
    </section>
  );
}

interface PolaroidItemProps {
  src: string;
  caption: string;
  rotation: number;
  zIndex: number;
  delay: number;
  className?: string;
}

function PolaroidItem({ src, caption, rotation, zIndex, delay, className }: PolaroidItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, rotate: rotation + 8 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{
        y: -12,
        rotate: 0,
        scale: 1.05,
        zIndex: 50,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.3)"
      }}
      transition={{
        y: { type: "spring", stiffness: 50, damping: 15, delay },
        rotate: { duration: 0.8, delay },
        scale: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className={cn(
        "absolute bg-white p-[clamp(6px,1.2vw,10px)] pb-[clamp(24px,3.5vh,38px)] shadow-[0_6px_20px_rgba(0,0,0,0.2)] border border-white/50 cursor-pointer w-[clamp(130px,22vw,200px)] transform-gpu will-change-transform",
        className
      )}
      style={{ zIndex }}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-2 pointer-events-none">
        <img
          src={src}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
          alt={caption}
          loading="lazy"
        />
      </div>
      <p className="font-dancing text-[clamp(11px,1.2vw,14px)] text-[#666] text-center lowercase pointer-events-none">
        {caption}
      </p>
    </motion.div>
  );
}