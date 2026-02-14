import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
import { Star } from 'lucide-react';
export function RankSection() {
  return (
    <section className="snap-section bg-off_white overflow-hidden flex flex-col md:flex-row">
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(90deg, #7B8FA3 50%, transparent 50%)',
        backgroundSize: '30px 100%'
      }} />
      <div className="flex-[1.2] relative z-10 flex flex-col justify-center px-8 md:px-20 py-12">
        <div className="relative mb-12 flex items-end">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[clamp(50px,8vw,80px)] font-light text-burgundy/80 leading-none"
          >
            Rank
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
            className="font-script text-[clamp(140px,22vw,240px)] text-burgundy ml-4 -mb-8 leading-none drop-shadow-lg"
          >
            2
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="bg-white/97 p-8 md:p-12 shadow-2xl max-w-full md:max-w-[500px] border border-gray-100 relative"
        >
          <div className="absolute -top-6 -right-6 bg-burgundy w-14 h-14 rounded-full flex items-center justify-center text-white font-display text-sm font-bold shadow-lg ring-4 ring-white">
            1 OF 2
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-6 tracking-tight uppercase">
            JUJUR INI KEERRRREEEENNNN
          </h3>
          <p className="font-georgia text-[15px] md:text-[16px] leading-[1.8] text-[#3a3a3a] text-justify">
            SELAAAMAAT YAAW buat konsistensi kamu selama ini! Tetep bisa dapet Rank 2 itu bukan hal yang gampang, apalagi di tengah sibuk-sibuknya persiapan kuliah. Tapi kamu buktiin kalo kamu emang se-pinter itu dan se-disiplin itu. Bangga banget aku sama kamu!
          </p>
        </motion.div>
      </div>
      <div className="flex-1 relative min-h-[400px] md:min-h-full p-8">
        <motion.div
          initial={{ y: -50, opacity: 0, rotate: -2.5, scale: 0.9 }}
          whileInView={{ y: 0, opacity: 1, rotate: -2.5, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-burgundy/95 px-8 py-4 shadow-2xl"
        >
          <span className="font-display text-xl md:text-2xl text-white whitespace-nowrap tracking-widest uppercase">
            Through Consistency!!
          </span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="absolute top-24 right-12 z-0"
        >
          <Star className="w-16 h-16 text-burgundy/10 fill-burgundy/10" />
        </motion.div>
        <div className="relative h-full flex items-center justify-center">
          <Polaroid
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop"
            rotate={-7}
            className="absolute top-[15%] left-[5%] w-[180px] md:w-[260px] z-10"
            delay={0.6}
          />
          <Polaroid
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
            rotate={5}
            className="absolute top-[25%] right-[5%] w-[160px] md:w-[240px] z-20"
            delay={0.8}
          />
          <Polaroid
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop"
            rotate={9}
            className="absolute bottom-[10%] left-[20%] w-[180px] md:w-[250px] z-25"
            delay={1.0}
          />
        </div>
      </div>
    </section>
  );
}