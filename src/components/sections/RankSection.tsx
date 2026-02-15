import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
import { Star } from 'lucide-react';
export function RankSection() {
  return (
    <section className="snap-section bg-off_white overflow-hidden flex flex-col md:flex-row" style={{ position: 'relative' }}>
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(90deg, #7B8FA3 50%, transparent 50%)',
        backgroundSize: '30px 100%'
      }} />
      <div className="flex-[1.2] relative z-10 flex flex-col justify-center px-6 md:px-20 py-8 md:py-12">
        <div className="relative mb-6 md:mb-12 flex items-end">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[clamp(40px,8vw,80px)] font-light text-burgundy/80 leading-none"
          >
            Rank
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="font-script text-[clamp(100px,22vw,240px)] text-burgundy ml-2 md:ml-4 -mb-4 md:-mb-8 leading-none drop-shadow-lg"
          >
            2
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="bg-white/97 p-6 md:p-12 shadow-2xl max-w-full md:max-w-[500px] border border-gray-100 relative max-h-[35vh] md:max-h-none overflow-y-auto hide-scrollbar"
        >
          <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-burgundy w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-display text-[10px] md:text-sm font-bold shadow-lg ring-4 ring-white z-20">
            1 OF 2
          </div>
          <h3 className="font-display text-xl md:text-3xl font-bold text-[#1a1a1a] mb-4 md:mb-6 tracking-tight uppercase">
            JUJUR INI KEERRRREEEENNNN
          </h3>
          <p className="font-georgia text-[14px] md:text-[16px] leading-[1.6] md:leading-[1.8] text-[#3a3a3a] text-justify">
            SELAAAMAAT YAAW buat konsistensi kamu selama ini! Tetep bisa dapet Rank 2 itu bukan hal yang gampang, apalagi di tengah sibuk-sibuknya persiapan kuliah. Tapi kamu buktiin kalo kamu emang se-pinter itu dan se-disiplin itu. Bangga banget aku sama kamu!
          </p>
        </motion.div>
      </div>
      <div className="flex-1 relative min-h-[300px] md:min-h-full p-6 md:p-8">
        <motion.div
          initial={{ y: -30, opacity: 0, rotate: -2.5, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, rotate: -2.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-4 md:top-10 left-1/2 -translate-x-1/2 z-30 bg-burgundy/95 px-6 py-3 md:px-8 md:py-4 shadow-2xl"
        >
          <span className="font-display text-sm md:text-2xl text-white whitespace-nowrap tracking-widest uppercase">
            Through Consistency!!
          </span>
        </motion.div>
        <div className="relative h-full flex items-center justify-center">
          <Polaroid
            src="/images/bercanda/6.jpeg"
            rotate={-7}
            className="absolute top-[10%] left-[5%] w-[140px] md:w-[260px] z-10"
            delay={0.6}
          />
          <Polaroid
            src="/images/bercanda/7.jpeg"
            rotate={5}
            className="absolute top-[20%] right-[5%] w-[130px] md:w-[240px] z-20"
            delay={0.8}
          />
          <Polaroid
            src="/images/bercanda/8.jpeg"
            rotate={9}
            className="absolute bottom-[10%] left-[20%] w-[140px] md:w-[250px] z-25"
            delay={1.0}
          />
        </div>
      </div>
    </section>
  );
}