import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function OutroSection() {
    return (
        <section className="snap-section relative bg-black flex flex-col items-center justify-center h-screen overflow-hidden">

            {/* Background cinematic overlay */}
            <div className="absolute inset-0 z-0 bg-background/50">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-primary_dark/90 to-background" />
                {/* Subtle spot light on text */}
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-[120vw] h-[120vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 radial-gradient-center opacity-10 blur-3xl rounded-full bg-gold_accent pointer-events-none"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
                    whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                    className="font-display text-[clamp(2.5rem,6vw,6rem)] text-soft_cream/90 uppercase tracking-[0.2em] mb-8"
                    style={{ textShadow: "0px 0px 40px rgba(212,168,71,0.2)" }}
                >
                    Happy Birthday, Nayla.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="font-subtitle text-xs md:text-sm tracking-[0.4em] text-gold_accent/60 uppercase mb-8"
                >
                    &infin;
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                >
                    {/* Small note prompting users to scroll down first */}
                    <div className="mb-4 text-center">
                        <span className="text-sm text-gold_accent/60">Scroll dulu ke bawah</span>
                    </div>
                    <Link
                        to="/museum"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gold_accent/10 border border-gold_accent/30 text-gold_accent rounded-sm hover:bg-gold_accent hover:text-primary_dark transition-all duration-300 font-subtitle tracking-widest text-sm"
                    >
                        <span>ENTER MUSEUM</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </motion.div>
            </div>

        </section>
    );
}
