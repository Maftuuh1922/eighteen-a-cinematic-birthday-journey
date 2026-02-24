import React from 'react';
import { motion } from 'framer-motion';

const ROW_1_PHOTOS = ['/images/bercanda/2.jpeg', '/images/bercanda/3.jpeg', '/images/bercanda/4.jpeg', '/images/bercanda/5.jpeg', '/images/bercanda/6.jpeg'];
const ROW_2_PHOTOS = ['/images/bercanda/7.jpeg', '/images/bercanda/8.jpeg', '/images/bercanda/9.jpeg', '/images/bercanda/10.jpeg', '/images/bercanda/11.jpeg'];

export function QuoteSection() {
    return (
        <section className="snap-section relative flex flex-col items-center justify-center bg-primary_dark overflow-hidden px-8 md:px-[15vw]">

            {/* Background ambient lighting */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-warm_sepia/5 blur-[120px] pointer-events-none" />

                {/* Top moving photo track */}
                <div className="absolute top-0 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none py-2" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}>
                    <div className="flex gap-4 w-max animate-[marquee-left_45s_linear_infinite] will-change-transform">
                        {[...ROW_1_PHOTOS, ...ROW_1_PHOTOS, ...ROW_1_PHOTOS].map((src, i) => (
                            <img key={`top-${i}`} src={src} className="h-[120px] md:h-[180px] w-auto object-cover grayscale brightness-75 rounded-sm" alt="" loading="lazy" />
                        ))}
                    </div>
                </div>

                {/* Bottom moving photo track */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none py-2" style={{ maskImage: 'linear-gradient(to top, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)' }}>
                    <div className="flex gap-4 w-max animate-[marquee-right_50s_linear_infinite] will-change-transform">
                        {[...ROW_2_PHOTOS, ...ROW_2_PHOTOS, ...ROW_2_PHOTOS].map((src, i) => (
                            <img key={`bottom-${i}`} src={src} className="h-[120px] md:h-[180px] w-auto object-cover grayscale brightness-75 rounded-sm" alt="" loading="lazy" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center gap-12 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-[40px] bg-gold_accent/50 mb-4" />
                    <h2 className="font-subtitle text-xs tracking-[0.4em] text-gold_accent uppercase">
                        Chapter I &mdash; Buat Kesayanganku
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[clamp(1.5rem,4vw,3.5rem)] leading-snug text-soft_cream font-light"
                >
                    "Makasih ya sayang udah bertahan sampai sejauh ini. Bangga banget bisa lihat senyum kamu terus."
                </motion.p>
            </div>

        </section>
    );
}
