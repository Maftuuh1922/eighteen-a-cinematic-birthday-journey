import React from 'react';
import { motion } from 'framer-motion';
export function FinalWishesSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row">
      {/* LEFT 50%: Silhouette + bokeh lights */}
      <div className="w-full md:w-1/2 h-[40%] md:h-full relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-burgundy/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center"
        >
          <span className="font-script text-[clamp(100px,15vw,190px)] text-white text-shadow-lg block">18th</span>
        </motion.div>
        <div className="absolute bottom-6 right-[8%] z-10">
          <span className="font-script text-[clamp(22px,4vw,38px)] text-white/92 italic text-shadow-sm">ratu dissya tamita</span>
        </div>
      </div>
      {/* RIGHT 50%: Cream background */}
      <div className="w-full md:w-1/2 h-[60%] md:h-full bg-cream flex flex-col justify-center p-6 md:p-[12%] relative overflow-y-auto hide-scrollbar">
        <div className="absolute top-6 right-6 md:top-12 md:right-12">
          <span className="font-script text-[clamp(44px,8vw,76px)] text-[#1a1a1a] italic leading-none">to love</span>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-[460px] space-y-4 md:space-y-8 font-georgia text-[13px] md:text-[15px] leading-[1.6] md:leading-[1.9] text-[#2a2a2a]"
        >
          <p>
            happy 18 th birthday, dissyaa!! sekarang udah resmi masuk masa kedewasaan yaa, hehe. aku doain semoga apa yang kamu cita-citain pelan-pelan bisa terwujud, tetep jadi diri sendiri yang selalu ceria dan kuat.
          </p>
          <p>
            tetep semangat ya buat semua hal yang lagi kamu perjuangin sekarang. jangan lupa buat bahagia juga, karena itu yang paling penting. i'm really glad to have you in my life.
          </p>
          <p className="hidden md:block">
            once again, happy birthday and welcome to 18! enjoy your day, enjoy your new chapter, and i'm so excited to see all the great things you'll achieve in the future. enjoy every bit of it, dissyaa!!
          </p>
          <div className="pt-6 md:pt-10">
            <div className="h-px w-16 md:w-20 bg-burgundy/40 mb-2 md:mb-3" />
            <span className="font-logo text-2xl md:text-3xl text-burgundy italic">R.D.T</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}