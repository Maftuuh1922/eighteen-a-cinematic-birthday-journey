import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MESSAGE = `Hai Sayang,

Makasih banyak ya udah selalu berusaha kasih yang terbaik dan bertahan sampai titik ini.
Kadang emang capek banget, tapi kamu hebat bisa lewatin itu semua.

Makasih udah selalu jadi energi positif dan alasan buat aku senyum.
Makasih udah nemenin dan bikin tiap detik jadi spesial banget.

Apapun mimpi yang pengen kamu kejar, aku selalu dukung penuh dari sini. 
Jangan pernah merasa berjuang sendirian ya.

Semoga bahagia terus, dijauhin dari sedih-sedih, dan selalu dikelilingi orang yang tulus. I love you!`;

export function MessageSection() {
    const [displayedText, setDisplayedText] = useState('');
    const [startTyping, setStartTyping] = useState(false);

    useEffect(() => {
        if (!startTyping) return;

        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(MESSAGE.substring(0, i));
            i++;
            if (i > MESSAGE.length) clearInterval(interval);
        }, 45); // Adjust typing speed here

        return () => clearInterval(interval);
    }, [startTyping]);

    return (
        <section className="snap-section relative bg-[#0a080a] flex items-center justify-center px-6 md:px-[6vw] py-20 overflow-hidden">

            {/* Animated glowing aurora background for uniqueness */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-40 mix-blend-screen pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: ['-10%', '10%', '-10%'],
                        y: ['-10%', '10%', '-10%']
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-0 right-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-pink-900/40 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: ['10%', '-10%', '10%'],
                        y: ['10%', '-10%', '10%']
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-0 left-0 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] bg-yellow-700/30 rounded-full blur-[100px]"
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center justify-between">

                {/* Left Side: Polaroid Photo Collage */}
                <motion.div
                    initial={{ opacity: 0, x: -30, rotate: -5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: -2 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-[80%] md:w-[45%] flex-shrink-0"
                >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#DCD2BE]/60 backdrop-blur-md shadow-sm z-20" style={{ transform: 'rotate(-3deg)' }} />
                    <div className="bg-[#f0ede6] p-4 pb-16 shadow-2xl rounded-sm w-full transform rotate-1 transition-transform hover:rotate-0 duration-500">
                        <img src="/images/bercanda/13.jpeg" alt="Nayla" className="w-full aspect-[4/5] object-cover rounded-sm filter sepia-[0.2] contrast-[1.1]" />
                        <p className="font-script text-3xl text-center text-primary_dark mt-6 opacity-80">Our Story</p>
                    </div>
                    {/* Cute floating sticker */}
                    <div className="absolute -bottom-8 -right-8 text-6xl animate-[float-sticker_6s_ease-in-out_infinite] z-30" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>💌</div>
                </motion.div>

                {/* Right Side: Glassmorphism Letter Card */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    onViewportEnter={() => setStartTyping(true)}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="relative w-full md:w-[55%] bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col pt-16"
                >
                    <div className="absolute top-0 right-12 w-8 h-16 bg-gold_accent/20 rounded-b-full shadow-[0_4px_12px_rgba(212,168,71,0.2)]" />

                    <h2 className="font-subtitle text-[10px] md:text-xs tracking-[0.4em] text-gold_accent uppercase mb-8 border-l-2 border-gold_accent pl-4">
                        Chapter III &mdash; Pesan Buat Kamu
                    </h2>

                    {/* Typewriter message */}
                    <div className="font-display text-[clamp(1rem,2vw,1.4rem)] text-soft_cream/90 leading-relaxed font-light min-h-[40vh]">
                        {displayedText.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[2px] h-[1em] bg-gold_accent ml-1 align-bottom mb-1"
                        />
                    </div>

                    {/* Signature */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: startTyping && displayedText.length === MESSAGE.length ? 1 : 0, scale: displayedText.length === MESSAGE.length ? 1 : 0.9 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="mt-12 self-end border-t border-white/10 pt-6 pr-4 inline-block"
                    >
                        <p className="font-script text-3xl md:text-4xl text-gold_accent/90 italic">
                            Kenza Zahra
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
