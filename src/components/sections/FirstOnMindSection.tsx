import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
const PHOTOS = [
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop"
];
export function FirstOnMindSection() {
  return (
    <section className="snap-section bg-white flex flex-col lg:flex-row">
      <div className="lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="text-burgundy w-8 h-8 mb-6 fill-burgundy" />
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
            First 1 on <br />My Mind.
          </h2>
          <p className="font-sans text-lg text-gray-500 italic border-l-4 border-burgundy pl-6 py-2">
            "Every memory we share is a treasure I hold dear. You aren't just a part of my life; 
            you are the highlight of it. Every single day."
          </p>
        </motion.div>
      </div>
      <div className="lg:w-1/2 bg-gray-50 p-6 md:p-12 overflow-hidden">
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {PHOTOS.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-lg shadow-sm break-inside-avoid"
            >
              <img 
                src={src} 
                alt="Memory Collage" 
                className="w-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}