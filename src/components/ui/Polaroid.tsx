import React, { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
interface PolaroidProps {
  src: string;
  alt?: string;
  caption?: string;
  className?: string;
  rotate?: number;
  delay?: number;
}
export function Polaroid({ src, alt, caption, className, rotate, delay = 0 }: PolaroidProps) {
  const randomRotation = useMemo(() => {
    if (rotate !== undefined) return rotate;
    return Math.floor(Math.random() * 14) - 7; // -7 to 7
  }, [rotate]);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: randomRotation - 5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: randomRotation }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay 
      }}
      viewport={{ once: false, margin: "-100px" }}
      className={cn(
        "bg-white p-4 pb-12 shadow-2xl inline-block border border-gray-100 ring-1 ring-black/5",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[4/5] w-full bg-gray-50">
        <img
          src={src}
          alt={alt ?? "Memory"}
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105 hover:scale-100"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="mt-4 font-script text-2xl text-gray-800 text-center leading-none">
          {caption}
        </p>
      )}
    </motion.div>
  );
}