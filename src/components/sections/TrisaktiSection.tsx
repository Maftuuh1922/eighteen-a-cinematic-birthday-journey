import React from 'react';
import { motion } from 'framer-motion';
export function TrisaktiSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row">
      {/* LEFT 60%: Sky blue cloudy morning image BG */}
      <div className="w-full md:w-[60%] h-[60%] md:h-full relative overflow-hidden bg-sky_blue">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop")' }}
        />
        {/* Top-left absolute text "3sakti Multimedia" */}
        <div className="absolute top-10 left-10 md:top-16 md:left-16 flex items-baseline z-10">
          <span className="font-logo text-[clamp(50px,8vw,80px)] text-white">3sakti</span>
          <span className="font-display text-[clamp(24px,4vw,32px)] text-burgundy ml-4 uppercase tracking-widest font-bold">Multimedia</span>
        </div>
        {/* Bottom-left absolute card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-10 left-10 md:bottom-16 md:left-16 bg-white/96 p-8 md:p-12 shadow-2xl max-w-[520px] z-10"
        >
          <h2 className="font-display text-[clamp(20px,3vw,26px)] font-bold text-[#1a1a1a] uppercase mb-5 leading-[1.3]">
            SELAMAAT YAAW SAYAANG UDAH MENGAMANKAN POSISI DI TRISAKTI MULTIMEDIA
          </h2>
          <p className="font-georgia text-[clamp(14px,2vw,17px)] text-[#3a3a3a] leading-[1.75]">
            Aku ikut bahagia banget pas tau kabar ini. Kamu bener-bener pantes dapetin ini setelah semua usaha yang udah kamu kasih. Multimedia Trisakti bakal jadi tempat yang seru banget buat kamu eksplor semua kreativitas kamu. I'm so proud of you, always!
          </p>
        </motion.div>
      </div>
      {/* RIGHT 40%: Gradient #8B1538 to #6B1028 */}
      <div className="w-full md:w-[40%] h-[40%] md:h-full bg-gradient-to-br from-[#8B1538] to-[#6B1028] flex items-center justify-center p-8 relative">
        {/* Top-right abs: box w/ logo label */}
        <div className="absolute top-0 right-0 p-6">
          <div className="bg-[#C41E3A] p-4 shadow-lg border border-white/10">
            <span className="text-white font-display font-bold text-xs tracking-tighter uppercase leading-none block">TRISAKTI<br/>MULTIMEDIA</span>
          </div>
        </div>
        {/* Center: 18px #8B1538 border (rounded top-full only) */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-[clamp(240px,25vw,360px)] aspect-[3/4] shadow-2xl overflow-hidden rounded-t-full border-[18px] border-burgundy bg-white"
        >
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" 
            alt="Hijab Selfie"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}