import React from 'react';
import { motion } from 'framer-motion';
import { Music, Youtube, Instagram, Twitter } from 'lucide-react';
export function ArtistConnect() {
  return (
    <section className="snap-section bg-gradient-to-b from-medPurple to-priPurple px-[var(--pad-x)] py-[var(--pad-y)] flex flex-col items-center justify-center text-cream overflow-y-auto hide-scrollbar">
      <div className="z-10 text-center w-full max-w-4xl py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-[clamp(56px,8vw,88px)] font-[300] mb-8">Listen Now</h2>
          <p className="font-sans text-[clamp(14px,1.8vw,18px)] opacity-70 tracking-[0.1em] mb-12">
            Stream across your favorite digital platforms
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20">
          {[
            { icon: <Music className="size-8" />, label: "Spotify", link: "#" },
            { icon: <Music className="size-8" />, label: "Apple Music", link: "#" },
            { icon: <Youtube className="size-8" />, label: "YouTube", link: "#" },
            { icon: <Instagram className="size-8" />, label: "Instagram", link: "#" }
          ].map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.link}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="p-4 rounded-full border border-cream/20 group-hover:bg-cream group-hover:text-priPurple transition-all duration-300">
                {item.icon}
              </div>
              <span className="text-[11px] font-sans tracking-widest uppercase opacity-60 group-hover:opacity-100">{item.label}</span>
            </motion.a>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center"
        >
          <span className="text-[11px] tracking-[0.2em] font-sans text-[#B8998A] mb-4 uppercase">NOW PLAYING</span>
          <h3 className="font-display italic text-[24px] text-wCream mb-8 px-4">Untungnya, Hidup Harus Tetap Berjalan</h3>
          <div className="w-full max-w-[600px] h-[80px] rounded-xl overflow-hidden shadow-2xl bg-black/20">
             <iframe
                src="https://open.spotify.com/embed/track/6Zp7N9H2MscB5kXmXq0XUv?utm_source=generator&theme=0"
                width="100%"
                height="80"
                style={{ border: 0 }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Now Playing"
              ></iframe>
          </div>
        </motion.div>
      </div>
      <footer className="mt-auto py-8 w-full text-center">
        <p className="font-sans text-[12px] opacity-50 tracking-[0.05em]">
          © 2024 Bernadya. Under Juni Records.
        </p>
      </footer>
    </section>
  );
}