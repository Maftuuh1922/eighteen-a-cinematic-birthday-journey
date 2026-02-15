import React from 'react';
import { motion } from 'framer-motion';
export function WishSection() {
  return (
    <section id="section-4" className="snap-section flex flex-col md:flex-row overflow-hidden">
      {/* Left 50%: Silhouette */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 h-[45dvh] md:h-full relative bg-black shrink-0"
      >
        <img
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200"
          className="w-full h-full object-cover opacity-60"
          alt="Silhouette"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.05em" }}
          whileInView={{ opacity: 0.6, letterSpacing: "0.2em" }}
          transition={{ duration: 1.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="absolute top-[12%] left-[8%] font-display italic text-[18px] md:text-[24px] text-white uppercase tracking-widest"
        >
          TWENTY ONE
        </motion.div>
        <motion.div
          initial={{ scale: 0.6, rotate: -15, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.6 }}
          viewport={{ once: true }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="font-script text-[clamp(80px,15vw,200px)] text-white/90 drop-shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
            21st
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          viewport={{ once: true }}
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 text-center"
        >
          <p className="font-script text-[24px] md:text-[32px] text-wCream italic">bernadya ribka</p>
        </motion.div>
      </motion.div>
      {/* Right 50%: Letter */}
      <motion.div
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 h-[55dvh] md:h-full bg-[#F8F8F5] p-8 md:p-[var(--pad-x)] flex flex-col justify-center relative overflow-y-auto hide-scrollbar"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="font-script text-[clamp(42px,6vw,76px)] text-[#1a1a1a] italic mb-6 md:mb-12 leading-tight"
        >
          to the voice of a generation
        </motion.h2>
        <div className="space-y-6 md:space-y-8 max-w-lg">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className="font-georgia text-[15px] md:text-[16px] text-[#2a2a2a] leading-[1.8] md:leading-[1.9]"
          >
            Selamat ulang tahun yang ke-21. Di usia yang semakin dewasa ini, semoga semangatmu untuk terus bercerita tak pernah padam. Teruslah menjadi pelabuhan bagi mereka yang sedang berlayar dalam kesedihan. 🎈
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
            className="font-georgia text-[15px] md:text-[16px] text-[#2a2a2a] leading-[1.8] md:leading-[1.9]"
          >
            Terima kasih telah berani menjadi rentan, telah berani mengakui bahwa hidup kadang tidak baik-baik saja, namun tetap memilih untuk berjalan. Keberanianmu adalah inspirasi kami semua. 🦋
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.6 }}
            viewport={{ once: true }}
            className="font-georgia text-[15px] md:text-[16px] text-burgundy font-bold leading-[1.8] md:leading-[1.9] flex flex-wrap"
          >
            { "Semoga tahun ini membawamu pada lebih banyak tawa, lebih banyak cinta, dan lagu-lagu yang akan abadi selamanya. Love you always, Nad!".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.6 + i * 0.05 }}
                viewport={{ once: true }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            )) }
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 2.5 }}
              viewport={{ once: true }}
              className="inline-block ml-2 shrink-0"
            >
              ✨ 🎈
            </motion.span>
          </motion.div>
        </div>
        <footer className="mt-auto py-8 text-center md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2 opacity-30 w-full">
          <p className="font-lato text-[10px] tracking-widest uppercase">© 2025 A Tribute to Bernadya</p>
        </footer>
      </motion.div>
    </section>
  );
}