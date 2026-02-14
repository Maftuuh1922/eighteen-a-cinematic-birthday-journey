import React from 'react';
import { motion } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
export function RankSection() {
  return (
    <section className="snap-section bg-off_white relative flex flex-col items-center justify-center p-8 md:p-20 overflow-hidden">
      {/* Background Stripes */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex-1 border-r border-black h-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1 bg-burgundy text-white font-sans text-xs tracking-tighter uppercase rounded-full">
            Excellence Consistent
          </div>
          <h2 className="font-display text-5xl md:text-8xl font-black text-burgundy">
            RANK <span className="text-gray-300">#</span>2
          </h2>
          <p className="font-sans text-xl text-gray-600 max-w-md">
            Your intelligence is only matched by your grace. Maintaining such high standards 
            is a testament to your hard work and brilliant mind.
          </p>
        </motion.div>
        <div className="relative h-[400px] md:h-[500px]">
          <Polaroid 
            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop"
            rotate={-5}
            className="absolute top-0 left-0 w-64 z-10"
            caption="Study Days"
          />
          <Polaroid 
            src="https://images.unsplash.com/photo-1523240715639-99a2f05eb40e?q=80&w=2070&auto=format&fit=crop"
            rotate={8}
            className="absolute bottom-0 right-0 w-64 z-20"
            caption="Success!"
          />
        </div>
      </div>
    </section>
  );
}