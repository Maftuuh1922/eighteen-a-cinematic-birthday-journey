import React from 'react';
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
export function Polaroid({ src, alt, caption, className, rotate = 0, delay = 0 }: PolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: false }}
      className={cn(
        "bg-white p-3 pb-8 shadow-xl inline-block border border-gray-100",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[4/5] w-full">
        <img 
          src={src} 
          alt={alt ?? "Memory"} 
          className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
      {caption && (
        <p className="mt-4 font-script text-xl text-gray-700 text-center">
          {caption}
        </p>
      )}
    </motion.div>
  );
}