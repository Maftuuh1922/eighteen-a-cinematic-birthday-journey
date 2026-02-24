import React from 'react';
import { motion } from 'framer-motion';

// Mock photos based on the infinite memory reel logic
// We use existing photos 2-13
const ROW_1_PHOTOS = ['/images/bercanda/2.jpeg', '/images/bercanda/3.jpeg', '/images/bercanda/4.jpeg', '/images/bercanda/5.jpeg', '/images/bercanda/6.jpeg'];
const ROW_2_PHOTOS = ['/images/bercanda/7.jpeg', '/images/bercanda/8.jpeg', '/images/bercanda/9.jpeg', '/images/bercanda/10.jpeg', '/images/bercanda/11.jpeg'];
const ROW_3_PHOTOS = ['/images/bercanda/12.jpeg', '/images/bercanda/13.jpeg', '/images/bercanda/4.jpeg', '/images/bercanda/6.jpeg', '/images/bercanda/8.jpeg'];

export function MemoryReelSection() {
    return (
        <section className="snap-section relative w-full h-[100dvh] bg-[#050305] overflow-hidden flex flex-col justify-center select-none">

            {/* Top Gradient Fade */}
            <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#050305] to-transparent z-10 pointer-events-none" />

            {/* Center Text Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-4 w-full px-4">
                <h2 className="font-sans text-[0.55rem] tracking-[0.5em] text-[#C9A84C]/50 uppercase text-center">
                    Momen Yang Selalu Diingat
                </h2>
                <div className="text-[#C9A84C]/30 text-xs tracking-widest">&mdash; ✦ &mdash;</div>
            </div>

            {/* Header over rows */}
            <div className="absolute top-[18vh] left-0 w-full z-10 flex flex-col items-center text-center pointer-events-none">
                <h3 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-[#F7F0E6]/10 mb-2 whitespace-nowrap">
                    15 MOMEN
                </h3>
                <p className="font-sans text-[0.65rem] tracking-widest text-[#C9A84C]/40 uppercase">
                    Foto-foto yang membentuk ceritamu
                </p>
            </div>

            {/* INFINITE MARQUEE TRACKS */}
            <div className="relative w-full h-full flex flex-col justify-center gap-[2vh] md:gap-[3vh] transform-gpu">

                {/* Row 1: Left */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "10%" }}
                    transition={{ duration: 0.8, delay: 0 }}
                    className="row overflow-hidden w-full group py-2"
                >
                    <div className="track flex gap-4 w-max animate-[marquee-left_35s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
                        {[...ROW_1_PHOTOS, ...ROW_1_PHOTOS, ...ROW_1_PHOTOS].map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-[180px] h-[240px] md:w-[280px] md:h-[380px] rounded-[2px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-105 hover:z-10 hover:shadow-[0_16px_60px_rgba(201,168,76,0.2)]">
                                <img src={src} className="w-full h-full object-cover filter sepia-[20%] contrast-[1.1] brightness-[0.82] saturate-[0.85] hover:filter-none transition-all duration-700" alt={`Memory ${i}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Row 2: Right */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "10%" }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    className="row overflow-hidden w-full group py-2"
                >
                    <div className="track flex gap-5 w-max animate-[marquee-right_45s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
                        {[...ROW_2_PHOTOS, ...ROW_2_PHOTOS, ...ROW_2_PHOTOS].map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-[150px] h-[200px] md:w-[220px] md:h-[300px] rounded-[2px] overflow-hidden shadow-[0_6px_30px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out hover:scale-105 hover:-translate-y-1 hover:z-10">
                                <img src={src} className="w-full h-full object-cover filter grayscale-[30%] contrast-[1.15] brightness-[0.78] hover:grayscale-0 hover:brightness-100 transition-all duration-500" alt={`Memory ${i}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Row 3: Left */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "10%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="row overflow-hidden w-full group py-2"
                >
                    <div className="track flex gap-3 w-max animate-[marquee-left_28s_linear_infinite] group-hover:[animation-play-state:paused] will-change-transform">
                        {[...ROW_3_PHOTOS, ...ROW_3_PHOTOS, ...ROW_3_PHOTOS].map((src, i) => (
                            <div key={i} className="flex-shrink-0 w-[220px] h-[150px] md:w-[320px] md:h-[220px] rounded-[2px] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.7)] transition-all duration-700 ease-in-out hover:scale-[1.03] hover:z-10">
                                <img src={src} className="w-full h-full object-cover filter sepia-[35%] brightness-[0.75] contrast-[1.2] hover:sepia-0 hover:brightness-[0.95] transition-all duration-700" alt={`Memory ${i}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-[#050305] to-transparent z-10 pointer-events-none" />

            {/* Absolute Minimal Footer overlay on bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#050305] via-[#050305] to-transparent pt-20 pb-10 flex flex-col items-center justify-center z-20 pointer-events-none gap-2">
                <p className="font-script text-[1.8rem] text-[#C9A84C]/50">Made with love by Maftuh</p>
                <p className="font-sans text-[0.5rem] tracking-widest text-[#F7F0E6]/20 uppercase">For Nayla</p>
            </div>
        </section>
    );
}
