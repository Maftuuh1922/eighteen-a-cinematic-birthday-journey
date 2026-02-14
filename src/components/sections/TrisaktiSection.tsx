import React from 'react';
import { motion } from 'framer-motion';
export function TrisaktiSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-[60%] h-[55%] md:h-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop")' }}
        />
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-8 left-8 md:top-16 md:left-16 flex items-baseline z-20"
        >
          <span className="font-logo text-[clamp(60px,10vw,80px)] text-white drop-shadow-md">3sakti</span>
          <span className="font-display text-[clamp(20px,4vw,32px)] text-burgundy ml-4 uppercase tracking-[0.2em] font-bold drop-shadow-sm">Multimedia</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="absolute bottom-8 left-8 md:bottom-20 md:left-20 bg-white/96 p-8 md:p-12 shadow-[20px_20px_0px_rgba(0,0,0,0.05)] border border-gray-100 max-w-[90%] md:max-w-[580px] z-10"
        >
          <h2 className="font-display text-[clamp(20px,3.5vw,28px)] font-bold text-[#1a1a1a] uppercase mb-6 leading-[1.2]">
            SELAMAAT YAAW SAYAANG UDAH MENGAMANKAN POSISI DI TRISAKTI MULTIMEDIA
          </h2>
          <p className="font-georgia text-[clamp(14px,2.2vw,17px)] text-[#3a3a3a] leading-[1.75] text-justify">
            Aku ikut bahagia banget pas tau kabar ini. Kamu bener-bener pantes dapetin ini setelah semua usaha yang udah kamu kasih. Multimedia Trisakti bakal jadi tempat yang seru banget buat kamu eksplor semua kreativitas kamu. Semangat yaa langkah barunya!
          </p>
        </motion.div>
      </div>
      <div className="w-full md:w-[40%] h-[45%] md:h-full bg-gradient-to-br from-[#8B1538] to-[#6B1028] flex items-center justify-center p-8 relative">
        <div className="absolute top-0 right-0 p-8">
          <div className="bg-[#C41E3A] px-5 py-3 shadow-xl border border-white/20">
            <span className="text-white font-display font-bold text-xs tracking-widest uppercase leading-tight block text-center">TRISAKTI<br/>UNIVERSITY</span>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          whileHover={{ scale: 1.03, transition: { duration: 0.4 } }}
          className="relative w-[clamp(240px,28vw,360px)] aspect-[3/4.2] shadow-2xl overflow-hidden rounded-t-full border-[18px] border-burgundy bg-white"
        >
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
            alt="Achievement"
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}