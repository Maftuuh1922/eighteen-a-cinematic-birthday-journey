import React from 'react';
import { motion } from 'framer-motion';
export function FinalWishesSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row bg-[#1a1a1a]">
      <div className="md:w-1/2 h-full relative overflow-hidden flex items-center justify-center p-12">
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale opacity-40 contrast-125"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-burgundy/20 mix-blend-multiply" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="relative z-10 text-center"
        >
          <span className="font-logo text-7xl md:text-9xl text-white">Dissya</span>
          <p className="text-white/50 tracking-[0.5em] uppercase text-xs mt-4">Signed with Love</p>
        </motion.div>
      </div>
      <div className="md:w-1/2 h-full bg-white p-12 md:p-24 flex flex-col justify-center overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="max-w-md"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 text-burgundy">
            Happy 18th Birthday, <br />My Dear.
          </h2>
          <div className="space-y-6 text-gray-700 font-sans leading-relaxed">
            <p>
              Entering adulthood is like opening a book where you get to write the ending. 
              The world is vast, sometimes scary, but always beautiful if you know where to look.
            </p>
            <p>
              Stay kind, stay curious, and never let that fire in your soul dim. You are meant for 
              extraordinary things, and I'll be here cheering the loudest.
            </p>
            <p className="font-script text-3xl text-burgundy pt-4">
              Forever proud of you.
            </p>
            <div className="pt-12">
              <span className="block h-px w-20 bg-burgundy mb-2" />
              <span className="text-xs uppercase tracking-widest font-bold">Ratue Dissya Tamita</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}