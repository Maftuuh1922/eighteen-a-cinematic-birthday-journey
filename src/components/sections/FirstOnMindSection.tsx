import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
export function FirstOnMindSection() {
  return (
    <section className="snap-section bg-cream-muted flex flex-col md:flex-row p-6 md:p-20 overflow-hidden">
      {/* LEFT 55% */}
      <div className="w-full md:w-[55%] h-[50%] md:h-full flex flex-col justify-center overflow-y-auto hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-[620px] pr-2"
        >
          <div className="mb-6 md:mb-10">
            <span className="font-display text-[clamp(32px,6vw,52px)] text-black">The first 1 on </span>
            <span className="font-script text-[clamp(60px,12vw,95px)] text-black italic -ml-2 md:-ml-4 leading-none block">my mind</span>
          </div>
          <div className="font-georgia text-[13px] md:text-[15px] leading-[1.6] md:leading-[1.8] text-[#2a2a2a] space-y-4 md:space-y-6 text-justify">
            <p className="font-bold text-base md:text-lg uppercase">YESS ALWAYSS UU!!</p>
            <p>
              YAP kamu masih jadi orang yang paling sering mampir di pikiran aku. Entah itu pas lagi denger lagu, pas lagi liat sesuatu yang lucu, atau pas lagi gak ngapa-ngapa pun tiba-tiba aja keinget kamu.
            </p>
            <p className="hidden md:block">
              Maaafyaa aku selalu cerewet atau gangguin kamu terus, tapi ya emang seseru itu ngobrol sama kamu. Semoga kedepannya kita bisa tetep begini terus yaa.
            </p>
            <p className="font-bold uppercase tracking-widest text-burgundy pt-2">
              SEMANGAT KULIAH NYA CALON ANAK MULTIMEDIA!!
            </p>
          </div>
        </motion.div>
      </div>
      {/* RIGHT 45%: Masonry collage */}
      <div className="w-full md:w-[45%] h-[50%] md:h-full relative grid grid-cols-2 gap-3 md:gap-4 md:p-8 overflow-y-auto hide-scrollbar pt-6">
        <Polaroid
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
          rotate={-3}
          className="w-full"
          delay={0.1}
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop"
          rotate={5}
          className="w-full mt-6 md:mt-10"
          delay={0.2}
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1523240715639-99a2f05eb40e?q=80&w=2070&auto=format&fit=crop"
          rotate={-6}
          className="w-full"
          delay={0.3}
        />
        <Polaroid
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
          rotate={4}
          className="w-full -mt-3 md:-mt-5"
          delay={0.4}
        />
        <div className="col-span-2 flex justify-center pb-6">
          <Polaroid
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
            rotate={2}
            className="w-[160px] md:w-[220px]"
            delay={0.5}
            caption="Photobooth"
          />
        </div>
      </div>
    </section>
  );
}