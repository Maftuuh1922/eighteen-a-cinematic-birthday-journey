import React from 'react';
import { motion } from 'framer-motion';
export function WishSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row overflow-hidden h-[100dvh] bg-[#F8F8F5]">
      {/* Left 50%: Silhouette / Bokeh Background */}
      <div className="relative w-full md:w-1/2 h-[50dvh] md:h-full overflow-hidden shrink-0">
        {/* Background Silhouette/Bokeh */}
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1600"
            className="w-full h-full object-cover"
            alt="Bernadya Silhouette"
          />
          {/* Layered Overlay and Blur */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[0.9px]" />
        </motion.div>
        {/* "TWENTY ONE" - Absolute Top Left */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.65, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute top-[20px] left-[20px] z-[1] select-none"
        >
          <span className="font-display text-[clamp(18px,2vw,24px)] font-[400] italic text-white uppercase tracking-[0.4em] drop-shadow-[1px_1px_4px_rgba(0,0,0,0.3)]">
            TWENTY ONE
          </span>
        </motion.div>
        {/* "21st" - Absolute Centerpiece */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-full text-center">
          <motion.h2
            initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
              delay: 0.8
            }}
            viewport={{ once: true }}
            style={{
              textShadow: '3px 5px 35px rgba(0,0,0,0.5), 0px 0px 40px rgba(255,255,255,0.1)',
              filter: 'drop-shadow(0px 0px 20px rgba(255,255,255,0.3))'
            }}
            className="font-script text-[clamp(120px,18vw,200px)] text-white italic leading-[0.9] pointer-events-none select-none"
          >
            21st
          </motion.h2>
        </div>
        {/* "bernadya ribka" - Absolute Bottom Center */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="absolute bottom-[24px] left-1/2 -translate-x-1/2 z-[1] w-full text-center"
        >
          <span className="font-script text-[clamp(24px,3.5vw,36px)] text-white italic drop-shadow-[2px_2px_8px_rgba(0,0,0,0.4)]">
            bernadya ribka
          </span>
        </motion.div>
      </div>
      {/* Right 50%: Letter / Narrative */}
      <div className="relative w-full md:w-1/2 h-auto md:h-full bg-[#F8F8F5] overflow-y-auto hide-scrollbar flex flex-col justify-between shrink-0">
        <div className="px-[clamp(40px,6vw,80px)] py-[clamp(50px,8vh,90px)]">
          {/* Heading - Changed to Burgundy for visibility */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="font-script text-[clamp(40px,6vw,72px)] text-burgundy italic leading-[1.2] mb-[clamp(30px,5vh,50px)] text-left max-w-full break-words"
          >
            to the voice of a generation
          </motion.h3>
          {/* Narrative Paragraphs */}
          <div className="space-y-6 mb-[clamp(40px,6vh,60px)]">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(14px,1.5vw,16px)] font-[400] text-[#2a2a2a] leading-[1.8] text-left"
            >
              Selamat ulang tahun yang ke-21. Di usia yang semakin dewasa ini, semoga semangatmu untuk terus bercerita tak pernah padam. Teruslah menjadi pelabuhan bagi mereka yang sedang berlayar dalam kesedihan. 🎈
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(14px,1.5vw,16px)] font-[400] text-[#2a2a2a] leading-[1.8] text-left"
            >
              Terima kasih telah berani menjadi rentan, telah berani mengakui bahwa hidup kadang tidak baik-baik saja, namun tetap memilih untuk berjalan. Keberanianmu adalah inspirasi kami semua. 🦋
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
              className="font-georgia text-[clamp(14px,1.5vw,16px)] font-[400] text-[#2a2a2a] leading-[1.8] text-left"
            >
              Semoga tahun ini membawamu pada lebih banyak tawa, lebih banyak cinta, dan lagu-lagu yang akan abadi selamanya.
            </motion.p>
          </div>
          {/* Signature and Footer */}
          <div className="mt-auto pt-8 border-t border-burgundy/10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
              viewport={{ once: true }}
              className="font-display text-[clamp(16px,2vw,19px)] font-[600] italic text-burgundy leading-[1.6] text-left mb-4 shadow-sm"
              style={{ textShadow: '0 1px 1px rgba(0,0,0,0.05)' }}
            >
              Love you always, Nad! ✨
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 1.6 }}
              viewport={{ once: true }}
              className="font-sans text-[clamp(10px,1.1vw,12px)] font-[400] text-[#2a2a2a] tracking-[0.15em] uppercase text-left"
            >
              © 2025 A Tribute to Bernadya
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}