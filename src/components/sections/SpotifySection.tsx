import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
export function SpotifySection() {
  return (
    <section className="snap-section bg-blueGray relative overflow-hidden flex items-center justify-center">
      {/* Background Stripes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #fff 40px, #fff 41px)' }} />
      <div className="container mx-auto px-[var(--pad-x)] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-end gap-2"
          >
            <span className="font-display text-[clamp(48px,6vw,72px)] text-white font-[200]">Spotify</span>
            <motion.span 
              initial={{ rotate: -30, scale: 0.5 }}
              whileInView={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              viewport={{ once: true }}
              className="font-script text-[clamp(120px,15vw,180px)] text-white leading-[0.5]"
            >
              #1
            </motion.span>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0, rotate: -10 }}
            whileInView={{ y: 0, opacity: 1, rotate: -2.5 }}
            transition={{ type: "spring", damping: 10, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-burgundy px-10 py-4 shadow-xl self-start"
          >
            <p className="font-display text-[clamp(20px,3vw,30px)] text-white font-medium">12.7M Monthly Listeners!!</p>
          </motion.div>
          <motion.div 
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 180 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-white opacity-40"
          >
            <Star size={48} fill="currentColor" />
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            viewport={{ once: true }}
            className="bg-white/95 p-8 md:p-12 max-w-[480px] shadow-2xl rounded-sm"
          >
            <h3 className="font-display text-[clamp(24px,2.5vw,28px)] font-bold text-[#1a1a1a] mb-6">
              PENYANYI PEREMPUAN PALING DIDENGARKAN... INSANE!
            </h3>
            <p className="font-georgia text-[15px] text-[#3a3a3a] leading-[1.7] italic">
              "Pencapaian ini bukan hanya angka, melainkan bukti nyata bahwa kejujuran dalam lirikmu memiliki rumah di hati jutaan orang. Teruslah berkarya, Nad."
            </p>
          </motion.div>
        </div>
        <div className="relative flex justify-center items-center h-[500px]">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 bg-white rounded-full p-4 shadow-xl z-20"
          >
            <span className="font-lato font-bold text-[14px] text-blueGray tracking-widest px-4">1 OF 3</span>
          </motion.div>
          {[
            { src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500", rot: -6, delay: 0.7, caption: "performance" },
            { src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500", rot: 4, delay: 0.9, caption: "guitar" },
            { src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500", rot: -3, delay: 1.1, caption: "studio" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0, rotate: item.rot + (i % 2 === 0 ? 20 : -20) }}
              whileInView={{ y: 0, opacity: 1, rotate: item.rot }}
              whileHover={{ y: -10, rotate: 0, scale: 1.05, zIndex: 30 }}
              transition={{ 
                y: { type: "spring", stiffness: 50, delay: item.delay },
                rotate: { duration: 1, delay: item.delay },
                scale: { duration: 0.3 }
              }}
              viewport={{ once: true }}
              className="absolute bg-white p-4 pb-12 shadow-2xl border border-white/40 cursor-pointer will-change-transform"
              style={{ 
                left: `${15 + i * 15}%`, 
                top: `${10 + i * 10}%`,
                width: 'clamp(220px, 30vw, 280px)'
              }}
            >
              <div className="aspect-[1/1] overflow-hidden bg-gray-100">
                <img src={item.src} className="w-full h-full object-cover grayscale" alt="Polaroid" />
              </div>
              <p className="mt-4 font-dancing text-[20px] text-center text-gray-700">{item.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}