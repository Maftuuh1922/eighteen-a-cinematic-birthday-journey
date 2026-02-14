import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
export function FirstOnMindSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  return (
    <section className="snap-section bg-[#F5F5F0] flex flex-col md:flex-row p-6 md:p-24 overflow-hidden" style={{ position: 'relative' }}>
      <div className="w-full md:w-[55%] h-[40%] md:h-full flex flex-col justify-center pr-0 md:pr-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 md:mb-16"
        >
          <h2 className="font-display text-[clamp(32px,6vw,56px)] text-black mb-1 md:mb-2 tracking-tight">The first 1 on </h2>
          <span className="font-script text-[clamp(60px,12vw,110px)] text-black italic leading-[0.8] block ml-[-4px]">my mind</span>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-georgia text-[14px] md:text-[16px] leading-[1.6] md:leading-[1.85] text-[#2a2a2a] space-y-4 md:space-y-6 text-justify max-w-[620px] overflow-y-auto hide-scrollbar"
        >
          <motion.p variants={itemVariants} className="font-bold text-base md:text-xl uppercase tracking-tighter">
            HAHHAHAHAH YESS ALWAYSS UU!!
          </motion.p>
          <motion.p variants={itemVariants}>
            YAP kamu masih jadi orang yang paling sering mampir di pikiran aku. Entah itu pas lagi denger lagu, pas lagi liat sesuatu yang lucu, atau pas lagi gak ngapa-ngapa pun tiba-tiba aja keinget kamu. Gak tau kenapa, tapi ya emang se-natural itu aja.
          </motion.p>
          <motion.p variants={itemVariants} className="hidden lg:block">
            Maaafyaa aku selalu cerewet atau gangguin kamu terus, tapi ya emang seseru itu ngobrol sama kamu sampe lupa waktu. Semoga kedepannya kita bisa tetep begini terus yaa, saling support dan dengerin cerita satu sama lain.
          </motion.p>
          <motion.p variants={itemVariants} className="font-bold uppercase text-[12px] md:text-sm tracking-[0.15em] text-burgundy pt-2 md:pt-4 border-t border-burgundy/10">
            SEMANGAT KULIAH NYA CALON ANAK MULTIMEDIA!!
          </motion.p>
        </motion.div>
      </div>
      <div className="w-full md:w-[45%] h-[60%] md:h-full relative grid grid-cols-2 gap-3 md:gap-6 overflow-y-auto hide-scrollbar pt-6 md:pt-0">
        <Polaroid
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
          rotate={-3}
          className="w-full"
          delay={0.3}
          caption="Car Rides"
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop"
          rotate={6}
          className="w-full mt-8 md:mt-16"
          delay={0.4}
          caption="Outdoors"
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1523240715639-99a2f05eb40e?q=80&w=2070&auto=format&fit=crop"
          rotate={-8}
          className="w-full"
          delay={0.5}
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
          rotate={4}
          className="w-full -mt-4 md:-mt-8"
          delay={0.6}
        />
        <div className="col-span-2 flex justify-center pb-12">
          <Polaroid
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
            rotate={2}
            className="w-[160px] md:w-[260px]"
            delay={0.7}
            caption="Photobooth Strip"
          />
        </div>
      </div>
    </section>
  );
}