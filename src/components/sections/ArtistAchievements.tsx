import React from 'react';
import { motion } from 'framer-motion';
const ACHIEVEMENTS = [
  { year: "2024", title: "Spotify Record", desc: "Artis Indonesia yang paling banyak didengarkan dalam satu hari. 🏆", icon: "📈" },
  { year: "2024", title: "AMI Awards", desc: "Pemenang kategori Album Pop Terbaik untuk 'Sialnya, Hidup Harus Tetap Berjalan'.", icon: "⭐" },
  { year: "2024", title: "Billboard Indo", desc: "Mendominasi Top 10 Billboard Indonesia selama berminggu-minggu berturut-turut.", icon: "💎" },
  { year: "2023", title: "Pendatang Baru", desc: "Nominasi Best New Artist di berbagai ajang penghargaan musik nasional.", icon: "✨" },
  { year: "2023", title: "Viral Success", desc: "Single 'Apa Mungkin' mencapai 50 juta streams dalam waktu singkat.", icon: "🎵" },
  { year: "2022", title: "Juni Records", desc: "Resmi bergabung dengan label musik independen ternama Indonesia.", icon: "🤝" }
];
export function ArtistAchievements() {
  return (
    <section className="snap-section bg-offWhite px-[var(--pad-x)] py-[var(--pad-y)] flex flex-col items-center overflow-y-auto hide-scrollbar">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mb-16 max-w-[800px]"
      >
        <span className="font-sans font-medium text-[12px] tracking-[0.2em] text-brown uppercase">RECOGNITION</span>
        <h2 className="font-display text-[clamp(36px,5vw,56px)] font-[400] text-priPurple mt-2">Breaking Records</h2>
        <p className="font-body text-[#666] mt-4 italic">Perjalanan prestasi dan tonggak sejarah karir musik Bernadya.</p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
            className="bg-white p-8 rounded-lg shadow-sm border border-black/5 transition-transform-shadow duration-300"
          >
            <span className="font-sans font-bold text-[14px] text-brown mb-2 block">{item.year}</span>
            <h3 className="font-display font-semibold text-[20px] text-priPurple mb-3 flex items-center gap-2">
              {item.title} <span className="text-lg">{item.icon}</span>
            </h3>
            <p className="font-body text-[14px] text-[#666] leading-[1.7]">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}