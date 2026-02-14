import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
export function RankSection() {
  return (
    <section className="snap-section bg-white overflow-hidden flex flex-col md:flex-row p-8 md:p-16">
      {/* BG: Blue-gray vertical stripes pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(90deg, #7B8FA3 50%, transparent 50%)',
        backgroundSize: '40px 100%'
      }} />
      {/* LEFT CONTENT */}
      <div className="flex-1 relative z-10 flex flex-col justify-center">
        <div className="relative mb-12 flex items-start">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-display text-[clamp(42px,6vw,64px)] font-light text-burgundy/80 leading-none"
          >
            Rank
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-script text-[clamp(140px,18vw,220px)] text-burgundy -mt-16 -ml-4 leading-none"
          >
            2
          </motion.span>
        </div>
        {/* Card rgba(255,255,255,0.97) center-left */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/97 p-8 md:p-10 shadow-xl max-w-[480px] border border-gray-100"
        >
          <h3 className="font-display text-2xl font-bold text-[#1a1a1a] mb-4">
            JUJUR INI KEERRRREEEENNNN
          </h3>
          <p className="font-georgia text-[15px] leading-[1.7] text-[#3a3a3a]">
            SELAAAMAAT YAAW buat konsistensi kamu selama ini! Tetep bisa dapet Rank 2 itu bukan hal yang gampang, apalagi di tengah sibuk-sibuknya persiapan kuliah. Tapi kamu buktiin kalo kamu emang se-pinter itu dan se-disiplin itu. Jangan pernah ragu sama kemampuan kamu yaa, you're doing amazing!
          </p>
        </motion.div>
      </div>
      {/* RIGHT IMAGES */}
      <div className="flex-1 relative mt-16 md:mt-0 min-h-[500px]">
        {/* Banner: Through Consistency!! */}
        <motion.div 
          initial={{ y: -50, opacity: 0, rotate: -2.5 }}
          whileInView={{ y: 0, opacity: 1, rotate: -2.5 }}
          className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-30 bg-burgundy/92 px-9 py-3 shadow-xl"
        >
          <span className="font-display text-[20px] md:text-[30px] text-white whitespace-nowrap">
            Through Consistency!!
          </span>
        </motion.div>
        {/* 1 OF 2 Circle */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg z-20">
          <span className="font-sans font-bold text-sm text-burgundy">1 OF 2</span>
        </div>
        {/* 4-pt star */}
        <div className="absolute top-10 right-1/4 z-10 text-burgundy opacity-20">
          <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/></svg>
        </div>
        {/* Overlapping Polaroids */}
        <Polaroid 
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop" 
          rotate={-7}
          className="absolute top-10 left-0 w-[240px] z-10"
          caption="Purple Vibes"
        />
        <Polaroid 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" 
          rotate={5}
          className="absolute top-40 right-10 w-[220px] z-20"
          caption="Focus"
        />
        <Polaroid 
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop" 
          rotate={9}
          className="absolute bottom-10 left-20 w-[230px] z-25"
          caption="School Days"
        />
      </div>
    </section>
  );
}