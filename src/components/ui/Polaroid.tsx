import React, { useMemo, useState } from 'react';
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const randomRotation = useMemo(() => {
    if (rotate !== undefined) return rotate;
    return Math.floor(Math.random() * 14) - 7; // -7 to 7
  }, [rotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * 20,
      y: (x - 0.5) * -20,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: randomRotation - 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: randomRotation }}
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.5)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay
      }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        "bg-white p-4 pb-12 shadow-xl inline-block border border-gray-100 ring-1 ring-black/5 transform-gpu cursor-pointer transition-transform duration-150 ease-out",
        className
      )}
    >
      <div className="relative overflow-hidden aspect-[3/4] w-full bg-gray-50" style={{ transform: 'translateZ(20px)' }}>
        <img
          src={src}
          alt={alt ?? "Memory"}
          className="object-contain w-full h-full grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
          loading="lazy"
        />
      </div>
      {caption && (
        <p className="mt-4 font-script text-[clamp(20px,2vw,28px)] text-gray-800 text-center leading-none tracking-tight" style={{ transform: 'translateZ(10px)' }}>
          {caption}
        </p>
      )}
    </motion.div>
  );
}