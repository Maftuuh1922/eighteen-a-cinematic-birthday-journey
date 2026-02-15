import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SleepingCat } from '../ui/CatDecorations';

// Letter-by-letter animation component
function AnimatedLetters({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Floating particle component
function FloatingParticle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-white/20 pointer-events-none transform-gpu will-change-transform"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.5],
        y: [0, -80, -160],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export function HeroSection() {
  const [showLabel, setShowLabel] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowLabel(true), 1800);
    const t2 = setTimeout(() => setShowSignature(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Generate particles
  const particles = React.useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: `${5 + Math.random() * 90}%`,
    y: `${30 + Math.random() * 60}%`,
    size: 2 + Math.random() * 3,
    delay: 2 + Math.random() * 4,
  })), []);

  return (
    <section className="snap-section relative bg-black flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
      {/* Background with dramatic zoom-out */}
      <motion.div
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 will-change-transform transform-gpu"
      >
        <img
          src="/images/bercanda/13.jpg"
          className="w-full h-full object-cover"
          alt="Bernadya Portrait"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/15 via-transparent to-blue-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Film grain texture */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
        />

        {/* Animated light rays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -right-[10%] w-[50%] h-[120%] bg-gradient-to-l from-amber-100/20 via-yellow-200/10 to-transparent blur-2xl"
            style={{ transform: 'rotate(-25deg)' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -top-[10%] right-[5%] w-[30%] h-[100%] bg-gradient-to-l from-orange-100/15 via-amber-100/5 to-transparent blur-xl"
            style={{ transform: 'rotate(-35deg)' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.03, 0.1, 0.03] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute -top-[15%] right-[15%] w-[40%] h-[110%] bg-gradient-to-l from-yellow-50/10 via-white/5 to-transparent blur-2xl"
            style={{ transform: 'rotate(-20deg)' }}
          />
          {/* Horizontal light sweep */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.15, 0] }}
            transition={{ duration: 6, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
            className="absolute top-[20%] w-[30%] h-[60%] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-3xl"
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} x={p.x} y={p.y} size={p.size} />
        ))}
      </div>

      {/* Cinematic letterbox bars */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full h-[clamp(30px,5vh,50px)] bg-black z-[15] origin-left"
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 w-full h-[clamp(30px,5vh,50px)] bg-black z-[15] origin-right"
      />

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 w-full h-full px-8 md:px-[var(--pad-x)] flex flex-col justify-end py-[var(--pad-y)]">

        {/* Main title: "BERCANDA" - letter by letter */}
        <div className="mb-3 md:mb-5" style={{ perspective: '600px' }}>
          <h1 className="font-display font-[300] text-[clamp(40px,9vw,80px)] text-white leading-[1] tracking-[0.2em] uppercase">
            <AnimatedLetters text="BERCANDA" delay={0.5} />
          </h1>
        </div>

        {/* "Bernadya" artist label */}
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-[clamp(40px,8vh,80px)]"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-[3px] h-[24px] bg-burgundy origin-top"
              />
              <p className="font-lato font-bold text-[clamp(11px,1.4vw,16px)] text-white/85 tracking-[0.4em] uppercase">
                Bernadya
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Signature script name - right side */}
        <AnimatePresence>
          {showSignature && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, rotate: 15 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 15,
                duration: 1.5
              }}
              className="absolute bottom-[22%] right-[5%] md:bottom-[18%] md:right-[8%] transform-gpu"
            >
              <motion.span
                className="font-script text-[clamp(55px,10vw,115px)] text-white/90 italic leading-none block"
                style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0px 60px rgba(139,21,56,0.2)' }}
                animate={{
                  textShadow: [
                    '0 4px 30px rgba(0,0,0,0.5), 0 0px 60px rgba(139,21,56,0.2)',
                    '0 4px 30px rgba(0,0,0,0.5), 0 0px 80px rgba(139,21,56,0.35)',
                    '0 4px 30px rgba(0,0,0,0.5), 0 0px 60px rgba(139,21,56,0.2)',
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Baringung
              </motion.span>
              {/* Decorative underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] w-[80%] mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent origin-center mt-2"
              />
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      {/* Scroll indicator - animated pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 4, duration: 1.2 }}
        className="absolute bottom-[clamp(36px,6vh,56px)] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
      >
        <motion.div
          animate={{ scaleY: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"
        />
        <motion.span
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[9px] tracking-[0.3em] uppercase text-white font-sans"
        >
          Scroll to begin
        </motion.span>
      </motion.div>

      {/* Corner ornaments */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute top-[clamp(36px,6vh,56px)] right-[5%] md:right-[8%] z-[12]"
      >
        <div className="w-[40px] h-[40px] border-t border-r border-white/30" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 3.2, duration: 1.5 }}
        className="absolute bottom-[clamp(36px,6vh,56px)] left-[5%] md:left-[8%] z-[12]"
      >
        <div className="w-[40px] h-[40px] border-b border-l border-white/30" />
      </motion.div>
      <SleepingCat
        className="absolute bottom-[clamp(40px,7vh,65px)] right-[5%] md:right-[8%] z-[12]"
        color="white"
        opacity={0.12}
        size={50}
        delay={3.5}
      />
    </section>
  );
}