import React from 'react';
import { motion } from 'framer-motion';
export function TrisaktiSection() {
  return (
    <section className="snap-section flex flex-col md:grid md:grid-cols-[60fr_40fr] bg-white overflow-hidden" style={{ position: 'relative' }}>
      {/* LEFT COLUMN: 60% */}
      <div className="relative w-full h-[55vh] md:h-full overflow-hidden bg-[#87CEEB]">
        {/* Realistic Cloud Background */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-110"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=2000&auto=format&fit=crop")' }}
        />
        {/* Fused Logo Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-6 left-6 md:top-8 md:left-12 flex items-baseline z-30"
        >
          <span className="font-logo text-[clamp(48px,10vw,85px)] text-white normal-case leading-none">3sakti</span>
          <span className="font-display text-[clamp(36px,8vw,85px)] text-burgundy ml-2 md:ml-4 capitalize font-normal tracking-[0.05em] leading-none">Multimedia</span>
        </motion.div>
        {/* Narrative Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-6 left-6 md:bottom-20 md:left-12 bg-white/96 p-6 md:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.08)] border-none rounded-none max-w-[85%] md:max-w-[550px] z-20 max-h-[30vh] md:max-h-none overflow-y-auto hide-scrollbar"
        >
          <h2 className="font-display text-[clamp(18px,4vw,27px)] font-bold text-[#1a1a1a] uppercase mb-4 leading-[1.35] tracking-[0.02em]">
            SELAMAAT YAAW SAYAANG UDAH MENGAMANKAN POSISI DI TRISAKTI MULTIMEDIA
          </h2>
          <p className="font-lora text-[clamp(14px,2.2vw,17px)] text-[#3a3a3a] leading-[1.75] tracking-[0.01em] text-justify font-normal">
            Aku ikut bahagia banget pas tau kabar ini. Kamu bener-bener pantes dapetin ini setelah semua usaha yang udah kamu kasih. Multimedia Trisakti bakal jadi tempat yang seru banget buat kamu eksplor semua kreativitas kamu. Semangat yaa langkah barunya!
          </p>
        </motion.div>
      </div>
      {/* RIGHT COLUMN: 40% */}
      <div className="relative w-full h-[45vh] md:h-full bg-gradient-to-b from-[#8B1538] to-[#6B1028] flex items-center justify-center p-6 md:p-8">
        {/* School Logo Box */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-[#C41E3A] p-3 md:p-5 flex flex-col items-center justify-center gap-1 shadow-xl z-30 border border-white/5">
          <span className="text-white font-sans font-bold text-[10px] md:text-[14px] tracking-[0.1em] uppercase leading-none">TRISAKTI</span>
          <span className="text-white/80 font-sans font-normal text-[8px] md:text-[10px] tracking-[0.05em] uppercase leading-none">SCHOOL OF</span>
          <span className="text-white font-sans font-bold text-[9px] md:text-[12px] tracking-[0.1em] uppercase leading-none">MULTIMEDIA</span>
        </div>
        {/* Profile Frame */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="relative w-[clamp(200px,28vw,380px)] h-[clamp(280px,35vw,480px)] shadow-[0_15px_45px_rgba(0,0,0,0.3)] overflow-hidden rounded-t-full border-[10px] md:border-[18px] border-burgundy bg-[#2a2a2a] z-10"
        >
          <img
            src="https://images.unsplash.com/photo-1618331812910-001dd92c5c36?q=80&w=1964&auto=format&fit=crop"
            alt="Mirror Selfie Hijab"
            className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000 ease-in-out"
          />
        </motion.div>
      </div>
    </section>
  );
}