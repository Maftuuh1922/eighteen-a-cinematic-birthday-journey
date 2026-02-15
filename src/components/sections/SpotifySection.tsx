import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
export function SpotifySection() {
  return (
    <section id="section-2" className="snap-section relative w-full h-[100dvh] bg-blueGray overflow-hidden select-none">
      {/* Background Decorative Lines - Reduced Opacity */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }}
      />
      {/* Main Grid Container */}
      <div className="flex flex-col lg:grid lg:grid-cols-[55fr_45fr] h-full w-full">
        {/* Left Column (55%): Narrative & Header */}
        <div className="relative flex flex-col justify-between h-full w-full
          px-[clamp(40px,8vw,80px)] py-[clamp(40px,6vh,60px)]
          lg:px-[clamp(60px,5vw,80px)] lg:py-[clamp(40px,6vh,60px)]
          z-20 overflow-y-auto hide-scrollbar">
          {/* Header Area */}
          <div className="relative mb-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex items-baseline"
            >
              <h2 className="font-display font-[300] text-[clamp(40px,6vw,56px)] text-white inline-block uppercase tracking-[0.1em] leading-none">
                Spotify
              </h2>
              <motion.span
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.6 }}
                viewport={{ once: true }}
                className="font-script text-[clamp(120px,15vw,180px)] text-white inline-block ml-[clamp(10px,4vw,60px)] relative top-[10px] leading-[0.8]"
              >
                #1
              </motion.span>
            </motion.div>
            {/* Absolute Top Banner */}
            <motion.div
              initial={{ y: -100, x: "-50%", rotate: -10 }}
              whileInView={{ y: 0, x: "-50%", rotate: -2.5 }}
              transition={{ type: "spring", damping: 12, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-[clamp(20px,5vh,40px)] left-1/2 -translate-x-1/2
                bg-burgundy/95 px-[clamp(28px,4vw,40px)] py-[clamp(12px,2vh,16px)]
                shadow-[0_4px_15px_rgba(0,0,0,0.2)] z-10 whitespace-nowrap transform-gpu"
            >
              <span className="font-display font-[400] text-[clamp(18px,3vw,28px)] text-white uppercase tracking-wider">
                12.7M Monthly Listeners!!
              </span>
            </motion.div>
            {/* Visual Accent: Star */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.8, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-[clamp(15px,3vh,30px)] right-[clamp(40px,10vw,150px)] text-white z-5"
            >
              <Star className="w-[clamp(36px,5vw,52px)] h-[clamp(36px,5vw,52px)]" fill="currentColor" strokeWidth={0} />
            </motion.div>
          </div>
          {/* Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
            className="relative mt-[clamp(140px,25vh,200px)] bg-white/97 p-[clamp(32px,4vw,45px)]
              md:p-[clamp(35px,5vw,48px)] max-w-[520px] w-full shadow-[0_8px_30px_rgba(0,0,0,0.12)]
              rounded-none overflow-visible border-l-[8px] border-burgundy"
          >
            <h3 className="font-display text-[clamp(21px,3vw,26px)] font-[700] text-[#1a1a1a]
              leading-[1.35] mb-[clamp(16px,2vh,22px)] uppercase tracking-[0.02em] break-words">
              PENYANYI PEREMPUAN PALING DIDENGARKAN... INSANE!
            </h3>
            <p className="font-georgia text-[clamp(14px,1.5vw,16px)] font-[400] text-[#3a3a3a]
              leading-[1.75] tracking-[0.01em] italic break-words hyphens-auto">
              "Pencapaian ini bukan sekadar angka, melainkan bukti nyata bahwa kejujuran dalam lirikmu memiliki rumah di hati jutaan orang. Bernandya pecahin rekor gila ini... INSANE!"
            </p>
          </motion.div>
        </div>
        {/* Right Column (45%): Polaroid Stacks */}
        <div className="relative flex items-center justify-center h-full w-full
          px-[clamp(40px,8vw,80px)] py-[clamp(40px,6vh,60px)] z-10
          bg-white/10 lg:bg-transparent min-h-[50dvh] lg:min-h-full">
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
            viewport={{ once: true }}
            className="absolute top-[clamp(20px,5vh,40px)] right-[clamp(20px,5vw,40px)]
              bg-white w-[clamp(70px,10vw,90px)] h-[clamp(70px,10vw,90px)]
              rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-20"
          >
            <span className="font-lato font-[700] text-[clamp(13px,1.5vw,16px)] text-[#2a2a2a] tracking-[0.05em]">
              1 OF 3
            </span>
          </motion.div>
          {/* Polaroid Stack Container */}
          <div className="relative w-full max-w-[500px] h-[60dvh] mx-auto flex items-center justify-center">
            <PolaroidItem
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600"
              caption="on stage"
              rotation={-6}
              zIndex={3}
              delay={1.7}
              className="top-[5%] left-[5%]"
            />
            <PolaroidItem
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=600"
              caption="the craft"
              rotation={4}
              zIndex={2}
              delay={1.9}
              className="top-[25%] right-[8%]"
            />
            <PolaroidItem
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600"
              caption="studio time"
              rotation={-3}
              zIndex={1}
              delay={2.1}
              className="bottom-[10%] left-[15%]"
            />
          </div>
        </div>
      </div>
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
      initial={{ opacity: 0, y: 100, rotate: rotation + 10 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover={{
        y: -15,
        rotate: 0,
        scale: 1.05,
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
      }}
      transition={{
        y: { type: "spring", stiffness: 40, damping: 15, delay },
        rotate: { duration: 1, delay },
        scale: { duration: 0.3 }
      }}
      viewport={{ once: true }}
      className={cn(
        "absolute bg-white p-[clamp(10px,2vw,15px)] pb-[clamp(35px,5vh,50px)] shadow-[0_8px_25px_rgba(0,0,0,0.2)] border border-white/40 cursor-pointer w-[clamp(180px,35vw,260px)] transform-gpu",
        className
      )}
      style={{ zIndex }}
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img
          src={src}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
          alt={caption}
          loading="lazy"
        />
      </div>
      <p className="font-dancing text-[14px] text-[#666] text-center mt-2 lowercase">
        {caption}
      </p>
    </motion.div>
  );
}