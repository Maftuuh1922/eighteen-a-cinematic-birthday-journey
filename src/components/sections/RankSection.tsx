import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
export function RankSection() {
  return (
    <section className="snap-section bg-white overflow-hidden flex flex-col md:flex-row p-6 md:p-16">
      {/* BG: Blue-gray vertical stripes pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(90deg, #7B8FA3 50%, transparent 50%)',
        backgroundSize: '40px 100%'
      }} />
      {/* LEFT CONTENT */}
      <div className="flex-[1.2] relative z-10 flex flex-col justify-center">
        <div className="relative mb-6 md:mb-12 flex items-start">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-display text-[clamp(32px,6vw,64px)] font-light text-burgundy/80 leading-none"
          >
            Rank
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-script text-[clamp(100px,18vw,220px)] text-burgundy -mt-10 md:-mt-16 -ml-3 md:-ml-4 leading-none"
          >
            2
          </motion.span>
        </div>
        {/* Card rgba(255,255,255,0.97) center-left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/97 p-6 md:p-10 shadow-xl max-w-full md:max-w-[480px] border border-gray-100"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-[#1a1a1a] mb-3 md:mb-4">
            JUJUR INI KEERRRREEEENNNN
          </h3>
          <p className="font-georgia text-[13px] md:text-[15px] leading-[1.6] md:leading-[1.7] text-[#3a3a3a]">
            SELAAAMAAT YAAW buat konsistensi kamu selama ini! Tetep bisa dapet Rank 2 itu bukan hal yang gampang, apalagi di tengah sibuk-sibuknya persiapan kuliah. Tapi kamu buktiin kalo kamu emang se-pinter itu dan se-disiplin itu.
          </p>
        </motion.div>
      </div>
      {/* RIGHT IMAGES */}
      <div className="flex-1 relative mt-8 md:mt-0 min-h-[300px] md:min-h-[500px]">
        {/* Banner */}
        <motion.div
          initial={{ y: -50, opacity: 0, rotate: -2.5 }}
          whileInView={{ y: 0, opacity: 1, rotate: -2.5 }}
          className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-30 bg-burgundy/92 px-6 md:px-9 py-2 md:py-3 shadow-xl"
        >
          <span className="font-display text-[16px] md:text-[30px] text-white whitespace-nowrap">
            Through Consistency!!
          </span>
        </motion.div>
        {/* Overlapping Polaroids - Adjusted for mobile visibility */}
        <Polaroid
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop"
          rotate={-7}
          className="absolute top-4 left-0 w-[160px] md:w-[240px] z-10"
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
          rotate={5}
          className="absolute top-24 right-0 w-[150px] md:w-[220px] z-20"
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop"
          rotate={9}
          className="absolute bottom-4 left-1/4 w-[160px] md:w-[230px] z-25"
        />
      </div>
    </section>
  );
}