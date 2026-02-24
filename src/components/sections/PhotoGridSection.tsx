import React from 'react';
import { motion } from 'framer-motion';

const PHOTOS = [
    { id: 1, src: '/images/bercanda/2.jpeg', alt: 'Moment 1', caption: 'sweet 17th', spanRow: 2, spanCol: 1 },
    { id: 2, src: '/images/bercanda/3.jpeg', alt: 'Moment 2', caption: 'always shining', spanRow: 1, spanCol: 1 },
    { id: 3, src: '/images/bercanda/4.jpeg', alt: 'Moment 3', caption: 'golden hour', spanRow: 1, spanCol: 1 },
    { id: 4, src: '/images/bercanda/5.jpeg', alt: 'Moment 4', caption: 'memories', spanRow: 1, spanCol: 2 },
    { id: 5, src: '/images/bercanda/6.jpeg', alt: 'Moment 5', caption: 'happiness', spanRow: 1, spanCol: 1 },
    { id: 6, src: '/images/bercanda/7.jpeg', alt: 'Moment 6', caption: 'to many more', spanRow: 1, spanCol: 1 },
];

export function PhotoGridSection() {
    return (
        <section className="snap-section relative bg-background py-32 px-4 md:px-[10vw]">

            {/* Title */}
            <div className="flex flex-col items-center mb-16 md:mb-24">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1 }}
                    className="font-subtitle text-xs tracking-[0.4em] text-soft_cream/60 uppercase mb-4"
                >
                    Chapter II &mdash; Momen
                </motion.h2>
            </div>

            {/* Asymmetric Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
                {PHOTOS.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 1.2, delay: index * 0.15, ease: 'easeOut' }}
                        className={`relative group overflow-hidden cursor-pointer w-full h-full ${photo.spanRow === 2 ? 'row-span-2' : ''} ${photo.spanCol === 2 ? 'col-span-2' : ''}`}
                        style={{ minHeight: '30vh' }}
                    >
                        {/* Image with cinematic filter */}
                        <div className="w-full h-full transform transition-transform duration-[2s] group-hover:scale-105">
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="w-full h-full object-cover grayscale opacity-80"
                                style={{ filter: "sepia(30%) brightness(0.8) contrast(1.1) saturate(0.8) grayscale(80%)", transition: 'filter 1.5s ease' }}
                            />
                            {/* Color pop on hover */}
                            <div className="absolute inset-0 bg-transparent group-hover:bg-transparent transition-opacity duration-1000" />
                        </div>

                        {/* Injected style to overwrite grayscale on hover via CSS because React inline style transitions can be limited */}
                        <style>{`
              .group:hover img {
                filter: sepia(10%) brightness(0.9) contrast(1.2) saturate(1.2) grayscale(0%) !important;
                opacity: 1 !important;
              }
            `}</style>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-1000" />

                        {/* Handwritten Caption Overlay */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 z-10">
                            <span className="font-script text-3xl md:text-5xl text-gold_accent mix-blend-screen drop-shadow-md">
                                {photo.caption}
                            </span>
                        </div>

                        {/* Cinematic light leak on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-warm_sepia/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s] mix-blend-overlay pointer-events-none" />
                    </motion.div>
                ))}
            </div>

        </section>
    );
}
