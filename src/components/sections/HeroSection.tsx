import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Particle component for gold dust
function GoldDust({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-antique_gold pointer-events-none transform-gpu will-change-transform"
      style={{ left: x, top: y, width: size, height: size, filter: 'blur(1px)' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.35, 0],
        scale: [0, 1, 0.5],
        y: [0, -60, -120],
      }}
      transition={{
        duration: 5 + Math.random() * 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

// Letter-by-letter animation component for title
function AnimatedTitle() {
  const text = "HBD NAYLA";
  return (
    <span className="inline-block relative z-20 whitespace-nowrap">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            duration: 1.4,
            delay: 1.0 + i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block font-normal font-['Bodoni_Moda',_'Playfair_Display'] text-cream_white italic uppercase"
          style={{ letterSpacing: '0.15em', fontSize: 'clamp(2.2rem, 5.5vw, 6.5rem)', lineHeight: '0.9' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const particles = React.useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: `${5 + Math.random() * 90}%`,
    y: `${20 + Math.random() * 70}%`,
    size: 2 + Math.random() * 3,
    delay: 1 + Math.random() * 5,
  })), []);

  return (
    <section className="snap-section relative flex items-center justify-center overflow-hidden bg-background">

      {/* Background Photo with cinematic treatment */}
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 8, delay: 0.3, ease: 'easeOut' }}
        className="absolute inset-0 z-0 origin-center pointer-events-none"
      >
        <img
          src="/images/bercanda/13.jpeg" /* using available photo based on old code */
          className="w-full h-full object-cover"
          alt="Nayla"
          style={{
            filter: 'sepia(25%) contrast(1.15) brightness(0.72)',
          }}
        />
        {/* Overlay tint */}
        <div className="absolute inset-0 z-1" style={{ backgroundColor: 'rgba(180, 120, 60, 0.12)', mixBlendMode: 'multiply' }} />
      </motion.div>

      {/* Vignette Layer */}
      <div className="cinematic-vignette" />

      {/* Film Grain Texture - Managed globally in index.css but added here for specific layered effects if needed. Assuming global noise-bg is enough, but adding an extra animated layer to match spec. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.045 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute inset-0 z-50 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Light Leak */}
      <div className="absolute top-0 right-0 w-[60vmin] h-[60vmin] pointer-events-none z-[5]" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Gold Dust Particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <GoldDust key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
      </div>

      {/* Horizontal Scan Line */}
      <motion.div
        initial={{ y: '-10vh' }}
        animate={{ y: '110vh' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 w-full h-[1px] bg-antique_gold/10 z-[6] pointer-events-none"
      />

      {/* Intro Label Top Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="absolute top-[8vh] right-[4vw] z-30 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-[30px] bg-cream_white/30" />
        <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }} className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-cream_white/60">
          Intro
        </span>
      </motion.div>

      {/* Vertical divider right */}
      <div className="absolute right-[4vw] top-[40vh] w-[1px] h-[30vh] bg-cream_white/30 z-[5]" />

      {/* Cinematic Letterbox Bars */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        className="letterbox-top origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: [0.22, 1, 0.36, 1] }}
        className="letterbox-bottom origin-bottom"
      />

      {/* Main Content Container */}
      <div className="relative z-20 w-full h-full flex flex-col px-8 md:px-[6vw] justify-end pb-[15vh]">

        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">

          {/* Bottom Left Title Block */}
          <div className="flex flex-col relative w-full md:w-auto z-30">
            <AnimatedTitle />

            <div className="flex flex-col justify-start gap-4 mt-8 ml-2">
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "60px" }}
                transition={{ duration: 1.5, delay: 1.8, ease: "easeInOut" }}
                className="h-[1px] bg-antique_gold/60"
              />
              <div className="flex flex-col gap-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 2.2, ease: 'easeOut' }}
                  className="font-sans text-[0.55rem] tracking-[0.6em] text-cream_white/60 uppercase"
                >
                  A Cinematic Tribute
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 2.5, ease: 'easeOut' }}
                  className="font-subtitle text-[0.75rem] tracking-[0.8em] text-antique_gold/90 uppercase italic"
                >
                  Starring Nayla
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Right Signature */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
            className="md:mb-8 mt-8 md:mt-0"
          >
            <p className="font-script text-antique_gold leading-none hover:text-antique_gold/90 transition-all duration-700 cursor-default" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', textShadow: '0 0 40px rgba(201,168,76,0.4)' }}>
              Kenza Zahra
            </p>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator bottom center */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: [0, 1, 0.5, 1], y: 0 }}
        transition={{ duration: 1, delay: 2.8, ease: 'easeOut' }}
        className="absolute bottom-[6vh] md:bottom-[8vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30 pointer-events-none group"
      >
        <span className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-cream_white/60">
          SCROLL TO BEGIN
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0], transformOrigin: ['top', 'top', 'bottom'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-[40px] bg-cream_white/50 group-hover:opacity-100 transition-opacity"
        />
      </motion.div>

    </section>
  );
}