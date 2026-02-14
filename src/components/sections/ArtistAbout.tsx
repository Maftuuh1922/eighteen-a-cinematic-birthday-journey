import React from 'react';
import { motion } from 'framer-motion';
export function ArtistAbout() {
  return (
    <section className="snap-section bg-offWhite flex flex-col md:flex-row overflow-hidden">
      {/* Left Column: Image/Quote */}
      <div className="w-full md:w-[45%] h-1/2 md:h-full flex flex-col items-center justify-center p-[var(--pad-x)] pt-20 md:pt-[var(--pad-y)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[480px] w-full"
        >
          <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-2xl mb-8 grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800" 
              alt="Bernadya Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="font-georgia italic text-[16px] text-ltPurple leading-[1.8] text-center"
          >
            "Menulis lagu adalah cara saya mengatakan hal-hal yang mungkin sulit untuk diucapkan langsung."
          </motion.p>
        </motion.div>
      </div>
      {/* Right Column: Bio */}
      <div className="w-full md:w-[55%] h-1/2 md:h-full flex flex-col justify-center px-[var(--pad-x)] py-[var(--pad-y)] bg-white/50 md:bg-transparent">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <span className="block font-sans font-medium text-[12px] tracking-[0.2em] text-brown uppercase mb-5">ABOUT</span>
          <h2 className="font-display text-[clamp(36px,5vw,56px)] font-[400] text-priPurple leading-[1.2] mb-8">
            Bernadya Ribka Jayakusuma
          </h2>
          <div className="space-y-6 font-body text-[clamp(15px,1.2vw,17px)] text-[#4A4A4A] leading-[1.9]">
            <p>
              Lahir di Surabaya, 16 Maret 2004, Bernadya memulai perjalanan musiknya melalui ajang pencarian bakat Voice Kids Indonesia. Kepiawaiannya dalam merangkai lirik melankolis menjadikannya salah satu penulis lagu muda paling diperhitungkan di industri musik Indonesia saat ini.
            </p>
            <p>
              Bergabung dengan Juni Records, Bernadya merilis album debut "Sialnya, Hidup Harus Tetap Berjalan" yang langsung mencuri perhatian pendengar luas. Karakter vokalnya yang lembut dipadukan dengan aransemen minimalis menciptakan ruang intim bagi siapa saja yang mendengarnya.
            </p>
            <p>
              Pada tahun 2024, ia mencetak sejarah sebagai artis Indonesia yang paling banyak didengarkan di Spotify dalam satu hari, membuktikan bahwa kejujuran dalam berkarya memiliki resonansi yang sangat kuat bagi generasi saat ini.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}