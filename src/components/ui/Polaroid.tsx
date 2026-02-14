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
      initial={{ opacity: 0, scale: 0.85, rotate: randomRotation - 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: randomRotation }}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "bg-white p-4 pb-12 shadow-xl inline-block border border-gray-100 ring-1 ring-black/5 transform-gpu cursor-pointer",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[4/5] w-full bg-gray-50">
        <img
          src={src}
          alt={alt ?? "Memory"}
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="mt-4 font-script text-[clamp(20px,2vw,28px)] text-gray-800 text-center leading-none tracking-tight">
          {caption}
        </p>
      )}
    </motion.div>
  );
}