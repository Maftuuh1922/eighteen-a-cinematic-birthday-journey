import React from 'react';
import { motion } from 'framer-motion';
export function AchievementSection() {
  const heading = "SELAMAT ULANG TAHUN BERNADYA RIBKA JAYAKUSUMA!";
  return (
    <section className="snap-section flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left 60%: Playful sky blue */}
      <motion.div 
        initial={{ x: "-100%" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="w-full md:w-[60%] h-full relative p-8 md:p-12 flex flex-col justify-between bg-skyBlue"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-baseline gap-4"
        >
          <span className="font-dancing text-[clamp(60px,8vw,80px)] text-white">Bernadya</span>
          <span className="font-display text-[clamp(30px,4vw,40px)] text-burgundy/40 uppercase tracking-widest font-bold">Music</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/95 p-10 md:p-12 max-w-[550px] shadow-[0_10px_35px_rgba(0,0,0,0.08)] rounded-none self-start"
        >
          <h2 className="font-display text-[clamp(23px,3vw,27px)] font-bold text-[#1a1a1a] leading-[1.35] mb-6 uppercase tracking-tight">
            {heading.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.05, delay: 0.9 + i * 0.03 }}
                viewport={{ once: true }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <motion.div 
            className="font-georgia text-[clamp(15px,1.2vw,17px)] text-[#3a3a3a] leading-[1.75] tracking-wide"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 1.2 } }
            }}
          >
            {["SELAMAT ULANG TAHUN UNTUK SOSOK YANG MENYEMBUHKAN", "DENGAN LUKA YANG IA TUANGKAN DALAM NADA.", "TERIMA KASIH TELAH MENJADI SUARA BAGI HATI YANG SENYAP,", "DAN TETAP BERSINAR DI ANTARA RIBUAN BINTANG LAINNYA."].map((line, i) => (
              <motion.p 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="mb-2"
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Right 40%: Burgundy corporate */}
      <motion.div 
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="w-full md:w-[40%] h-full relative bg-gradient-to-b from-burgundy to-darkBurgundy"
      >
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-8 right-8 bg-[#C41E3A] p-6 text-white text-right"
        >
          <div className="font-bold text-[18px] tracking-widest uppercase">JUNI</div>
          <div className="font-bold text-[14px] tracking-[0.3em] uppercase opacity-80">RECORDS</div>
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            viewport={{ once: true }}
            className="relative w-[clamp(300px,80%,380px)] aspect-square bg-[#2a2a2a] overflow-hidden rounded-[50%_50%_0_0] shadow-[0_15px_45px_rgba(0,0,0,0.3)] border-[12px] border-burgundy/20"
          >
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover grayscale"
              alt="Portrait"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}