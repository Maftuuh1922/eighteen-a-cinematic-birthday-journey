import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
export function TrisaktiSection() {
  return (
    <section className="snap-section flex flex-col md:flex-row">
      <div className="flex-1 bg-sky_blue relative flex items-center justify-center p-8 md:p-12 overflow-hidden">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          className="relative z-10 text-sky_blue-foreground max-w-md"
        >
          <GraduationCap className="w-16 h-16 mb-6 opacity-80" />
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Dream <br /> Achieved.
          </h2>
          <p className="font-sans text-lg md:text-xl opacity-90 leading-relaxed">
            Congratulations on your acceptance to <strong>Trisakti University</strong>. 
            The sky is no longer the limit; it's your playground.
          </p>
        </motion.div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>
      <div className="w-full md:w-[40%] bg-burgundy flex items-center justify-center p-12 text-white relative">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-2 border-white/20 mb-8">
            <Award className="w-10 h-10" />
          </div>
          <h3 className="font-serif text-3xl mb-4 italic">Next Chapter</h3>
          <p className="font-sans tracking-widest uppercase text-sm opacity-60">
            University Life • 2024
          </p>
        </motion.div>
        <div className="absolute top-0 right-0 p-8">
          <span className="font-logo text-6xl opacity-10">T</span>
        </div>
      </div>
    </section>
  );
}