import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Polaroid } from '@/components/ui/Polaroid';
import { StretchingCat, PawTrail } from '../ui/CatDecorations';

export function BercandaSection() {
  const images = [
    { src: '/images/bercanda/.jpeg', caption: 'Moment 1' },
    { src: '/images/bercanda/2.jpeg', caption: 'Moment 2' },
    { src: '/images/bercanda/3.jpeg', caption: 'Moment 3' },
    { src: '/images/bercanda/4.jpeg', caption: 'Moment 4' },
    { src: '/images/bercanda/5.jpeg', caption: 'Moment 5' },
    { src: '/images/bercanda/6.jpeg', caption: 'Moment 6' },
    { src: '/images/bercanda/7.jpeg', caption: 'Moment 7' },
    { src: '/images/bercanda/8.jpeg', caption: 'Moment 8' },
    { src: '/images/bercanda/9.jpeg', caption: 'Moment 9' },
    { src: '/images/bercanda/10.jpeg', caption: 'Moment 10' },
    { src: '/images/bercanda/11.jpeg', caption: 'Moment 11' },
    { src: '/images/bercanda/12.jpeg', caption: 'Moment 12' },
    { src: '/images/bercanda/13.jpeg', caption: 'Moment 13' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });

  // Header fades + shrinks
  const headerOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const headerScale = useTransform(scrollY, [0, 100], [1, 0.7]);
  // The entire header wrapper collapses from full height to 0
  const headerMaxHeight = useTransform(scrollY, [0, 150], [300, 0]);
  const headerPadY = useTransform(scrollY, [0, 150], [48, 0]);

  return (
    <section className="snap-section bg-[#F5F5F0] flex flex-col overflow-hidden">
      {/* Header - fully collapses on scroll */}
      <motion.div
        className="w-full flex flex-col items-center justify-center shrink-0 relative overflow-hidden"
        style={{
          maxHeight: headerMaxHeight,
          paddingTop: headerPadY,
          paddingBottom: headerPadY,
          opacity: headerOpacity,
          scale: headerScale,
        }}
      >
        {/* Subtle ambient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-burgundy/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10 origin-top"
        >
          {/* Heading */}
          <motion.h2
            className="font-display text-[clamp(32px,5vw,52px)] text-[#2a2a2a] mb-2 md:mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A Journey Through
            </motion.span>{" "}
            <motion.span
              className="font-script italic text-burgundy"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              Moments
            </motion.span>
          </motion.h2>

          {/* Personal message */}
          <div className="max-w-xl mx-auto px-4">
            <motion.p
              className="font-georgia text-[14px] md:text-[16px] text-[#4a4a4a] italic leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              viewport={{ once: true }}
            >
              Each photo holds a piece of my heart, a fragment of time I never want to forget. This is my story, my journey, my joy.
            </motion.p>
          </div>

          {/* Decorative line */}
          <motion.div
            className="w-16 h-[1px] bg-burgundy/40 mx-auto mt-4 md:mt-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            viewport={{ once: true }}
          />
        </motion.div>
      </motion.div>

      {/* Photo Grid - scrollable, expands as header collapses */}
      <motion.div
        ref={scrollRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex-1 w-full px-4 md:px-12 pb-8 overflow-y-auto hide-scrollbar"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto pt-4">
          {images.map((img, i) => (
            <Polaroid
              key={i}
              src={img.src}
              rotate={i % 2 === 0 ? -3 : 3}
              className={`w-full ${i % 3 === 0 ? 'md:mt-0' : i % 3 === 1 ? 'md:mt-8' : 'md:mt-4'}`}
              delay={0.1 * i}
              caption={img.caption}
            />
          ))}
        </div>
      </motion.div>
      <StretchingCat
        className="absolute bottom-2 right-[5%] z-[15]"
        color="#333"
        opacity={0.06}
        size={40}
        delay={1.5}
      />
    </section>
  );
}
