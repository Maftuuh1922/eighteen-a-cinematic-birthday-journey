import React from 'react';
import { motion } from 'framer-motion';
const RELEASES = [
  {
    title: "Sialnya, Hidup Harus Tetap Berjalan",
    type: "ALBUM • 2024",
    desc: "Album debut yang mengeksplorasi fase-fase kesedihan pasca perpisahan. Memuat hits seperti 'Kata Mereka Ini Berlebihan'.",
    stats: "Produced by Petra Sihombing & Rendy Pandugo",
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Terlintas",
    type: "EP • 2023",
    desc: "Kumpulan cerita tentang keraguan dan pertanyaan yang muncul di tengah malam. Sebuah perkenalan rasa yang jujur.",
    stats: "Includes: Apa Mungkin, Masa Sepi, Terlintas",
    img: "https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=800"
  }
];
export function ArtistDiscography() {
  return (
    <section className="snap-section bg-gradient-to-b from-priPurple to-medPurple px-[var(--pad-x)] py-[var(--pad-y)] flex flex-col items-center overflow-y-auto hide-scrollbar">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="font-sans font-medium text-[12px] tracking-[0.2em] text-wCream uppercase">MUSIC</span>
        <h2 className="font-display text-[clamp(48px,6vw,72px)] font-[300] text-cream mt-2">Discography</h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(30px,5vw,60px)] w-full max-w-6xl">
        {RELEASES.map((album, idx) => (
          <motion.div
            key={album.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-6 shadow-xl transition-all duration-300 transform-gpu group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
              <img src={album.img} alt={album.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="font-display text-[clamp(22px,2.5vw,28px)] text-cream mb-1">{album.title}</h3>
            <p className="font-sans text-[13px] text-wCream font-medium tracking-wider mb-3">{album.type}</p>
            <p className="font-body text-[15px] text-cream/80 leading-[1.7] mb-3">{album.desc}</p>
            <p className="font-sans text-[12px] text-[#B8998A] italic uppercase tracking-widest">{album.stats}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}