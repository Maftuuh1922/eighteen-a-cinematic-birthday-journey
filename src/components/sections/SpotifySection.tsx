import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
export function SpotifySection() {
  return (
    <section className="snap-section relative w-full h-[100dvh] bg-blueGray overflow-hidden select-none">
      {/* Background Decorative Lines - Background Z-0 */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }}
      />
      <div className="flex flex-col lg:grid lg:grid-cols-[55fr_45fr] h-full w-full relative z-10">
        {/* Left Column (55%) */}
        <div className="relative flex flex-col h-full w-full z-20 overflow-y-auto hide-scrollbar">
          {/* URGENT SEC3 REBUILD: Header Area */}
          <div className="relative w-full shrink-0 h-[clamp(180px,25dvh,250px)] mb-[clamp(30px,5vh,60px)]">
            {/* Typography Area - Z-1 */}
            <div className="absolute top-[clamp(50px,8vh,80px)] left-[clamp(40px,6vw,60px)] z-[1] flex items-baseline gap-[clamp(18px,3vw,30px)]">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="font-display font-[300] text-[clamp(40px,6vw,58px)] text-white uppercase tracking-[0.1em] leading-none inline-block"
              >
                Spotify
              </motion.h2>
              <motion.span
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 60, delay: 0.6 }}
                viewport={{ once: true }}
                className="font-script text-[clamp(150px,20vw,220px)] text-white inline-block relative top-[clamp(18px,3vw,30px)] leading-[0.75] italic"
              >
                #1
              </motion.span>
            </div>
            {/* Burgundy Banner - Z-5 */}
            <motion.div
              initial={{ y: -100, x: "-50%", rotate: -10 }}
              whileInView={{ y: 0, x: "-50%", rotate: -2.5 }}
              transition={{ type: "spring", damping: 12, delay: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-[clamp(50px,8vh,80px)] left-1/2 -translate-x-1/2
                bg-[#8B1538]/92 px-[clamp(32px,5vw,45px)] py-[clamp(14px,2vh,18px)]
                shadow-[0_6px_20px_rgba(0,0,0,0.25)] z-[5] whitespace-nowrap transform-gpu"
            >
              <span className="font-display font-[400] text-[clamp(20px,3vw,32px)] text-white uppercase tracking-[0.02em]">
                12.7M Monthly Listeners!!
              </span>
            </motion.div>
            {/* Star Icon - Z-4 */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
              className="absolute top-[clamp(40px,7vh,70px)] right-[clamp(100px,15vw,180px)] text-white z-[4]"
            >
              <Star className="w-[clamp(40px,6vw,60px)] h-[clamp(40px,6vw,60px)]" fill="white" strokeWidth={0} />
            </motion.div>
          </div>
          {/* Narrative Card - Bottom Area */}
          <div className="px-[clamp(40px,8vw,80px)] pb-[clamp(40px,6vh,60px)] lg:px-[clamp(60px,5vw,80px)]">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              viewport={{ once: true }}
              className="relative bg-white/95 p-[clamp(32px,4vw,45px)]
                max-w-[520px] w-full shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                rounded-none overflow-visible border-l-[8px] border-burgundy"
            >
              <h3 className="font-display text-[clamp(21px,3vw,26px)] font-[700] text-[#1a1a1a]
                leading-[1.35] mb-[clamp(16px,2vh,22px)] uppercase tracking-[0.02em]">
                PENYANYI PEREMPUAN PALING DIDENGARKAN... INSANE!
              </h3>
              <p className="font-georgia text-[clamp(14px,1.5vw,16px)] font-[400] text-[#3a3a3a]
                leading-[1.75] tracking-[0.01em] italic">
                "Pencapaian ini bukan sekadar angka, melainkan bukti nyata bahwa kejujuran dalam lirikmu memiliki rumah di hati jutaan orang. Bernadya pecahin rekor gila ini... INSANE!"
              </p>
            </motion.div>
          </div>
        </div>
        {/* Right Column (45%): Polaroid Stacks */}
        <div className="relative flex items-center justify-center h-full w-full
          px-[clamp(40px,8vw,80px)] py-[clamp(40px,6vh,60px)] z-10
          bg-white/10 lg:bg-transparent min-h-[50dvh] lg:min-h-full">
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 1.5 }}
            viewport={{ once: true }}
            className="absolute top-[clamp(20px,5vw,40px)] right-[clamp(20px,5vw,40px)]
              bg-white w-[clamp(70px,10vw,90px)] h-[clamp(70px,10vw,90px)]
              rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] z-20"
          >
            <span className="font-lato font-[700] text-[clamp(13px,1.5vw,16px)] text-[#2a2a2a] tracking-[0.05em]">
              1 OF 3
            </span>
          </motion.div>
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