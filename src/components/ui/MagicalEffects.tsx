import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cat paw SVG
const CatPaw = ({ size = 14, opacity = 0.6, color = '#ffb6c1' }: { size?: number; opacity?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ opacity }}>
    <ellipse cx="16" cy="22" rx="7" ry="6" fill={color} />
    <circle cx="10" cy="13" r="3" fill={color} />
    <circle cx="16" cy="11" r="3" fill={color} />
    <circle cx="22" cy="13" r="3" fill={color} />
  </svg>
);

// Sitting cat silhouette SVG
const CatSilhouette = ({ size = 40, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
    {/* Ears */}
    <path d="M16 24 L13 8 L22 18 Z" />
    <path d="M48 24 L51 8 L42 18 Z" />
    {/* Head */}
    <circle cx="32" cy="26" r="12" />
    {/* Body */}
    <ellipse cx="32" cy="46" rx="14" ry="14" />
    {/* Tail */}
    <path d="M46 46 Q56 36 54 28 Q53 24 50 26 Q48 32 42 40" fill={color} stroke={color} strokeWidth="2" />
    {/* Eyes */}
    <ellipse cx="27" cy="24" rx="2" ry="2.5" fill="white" opacity="0.9" />
    <ellipse cx="37" cy="24" rx="2" ry="2.5" fill="white" opacity="0.9" />
    <ellipse cx="27.5" cy="24.5" rx="1" ry="1.5" fill="#333" />
    <ellipse cx="37.5" cy="24.5" rx="1" ry="1.5" fill="#333" />
  </svg>
);

// Walking cat silhouette
const WalkingCat = ({ size = 50, color = 'currentColor' }: { size?: number; color?: string }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 80 48" fill={color}>
    {/* Ears */}
    <path d="M18 16 L16 4 L24 12 Z" />
    <path d="M32 14 L34 4 L28 12 Z" />
    {/* Head */}
    <circle cx="25" cy="18" r="9" />
    {/* Body */}
    <ellipse cx="48" cy="22" rx="20" ry="10" />
    {/* Legs */}
    <rect x="32" y="28" width="3" height="16" rx="1.5" />
    <rect x="40" y="28" width="3" height="16" rx="1.5" />
    <rect x="54" y="28" width="3" height="16" rx="1.5" />
    <rect x="60" y="28" width="3" height="16" rx="1.5" />
    {/* Tail */}
    <path d="M68 18 Q78 8 76 4 Q74 2 72 6 Q70 12 66 18" fill={color} stroke={color} strokeWidth="2" />
    {/* Eyes */}
    <ellipse cx="22" cy="16" rx="1.5" ry="2" fill="white" opacity="0.9" />
    <ellipse cx="28" cy="16" rx="1.5" ry="2" fill="white" opacity="0.9" />
    <circle cx="22.5" cy="16.5" r="0.8" fill="#333" />
    <circle cx="28.5" cy="16.5" r="0.8" fill="#333" />
  </svg>
);

interface Particle {
  id: number;
  x: number;
  y: number;
  rotation: number;
}

// Floating cat data
const floatingCats = [
  { id: 0, x: 3, y: 15, type: 'sitting', size: 28, opacity: 0.06, duration: 20 },
  { id: 1, x: 88, y: 70, type: 'sitting', size: 32, opacity: 0.07, duration: 22 },
  { id: 2, x: 75, y: 10, type: 'walking', size: 36, opacity: 0.05, duration: 25 },
  { id: 3, x: 12, y: 80, type: 'walking', size: 30, opacity: 0.06, duration: 18 },
  { id: 4, x: 50, y: 5, type: 'sitting', size: 24, opacity: 0.05, duration: 23 },
  { id: 5, x: 92, y: 40, type: 'walking', size: 34, opacity: 0.06, duration: 21 },
  { id: 6, x: 5, y: 50, type: 'sitting', size: 26, opacity: 0.05, duration: 24 },
  { id: 7, x: 65, y: 85, type: 'walking', size: 28, opacity: 0.07, duration: 19 },
];

export function MagicalEffects() {
  const [pawPrints, setPawPrints] = useState<Particle[]>([]);
  const [clickBurst, setClickBurst] = useState<{ x: number; y: number; id: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [ready, setReady] = useState(false);
  const frameRef = useRef(0);
  const lastPawRef = useRef(0);

  // Delay mount
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse - leave paw prints
  useEffect(() => {
    if (!ready) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (frameRef.current) return;
      frameRef.current = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });

        const now = Date.now();
        if (now - lastPawRef.current > 150) {
          lastPawRef.current = now;
          const newPaw: Particle = {
            id: now + Math.random(),
            x: e.clientX,
            y: e.clientY,
            rotation: Math.random() * 40 - 20,
          };
          setPawPrints(prev => [...prev.slice(-10), newPaw]);
        }
        frameRef.current = 0;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [ready]);

  // Click burst - paw explosion
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!ready) return;
    const burst = Array.from({ length: 6 }, (_, i) => ({
      x: e.clientX,
      y: e.clientY,
      id: Date.now() + i,
    }));
    setClickBurst(prev => [...prev, ...burst]);
    setTimeout(() => {
      setClickBurst(prev => prev.filter(b => !burst.find(bb => bb.id === b.id)));
    }, 800);
  }, [ready]);

  // Cleanup old paw prints
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setPawPrints(prev => prev.slice(-8));
    }, 300);
    return () => clearInterval(interval);
  }, [ready]);

  if (!ready) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" onClick={handleClick}>

      {/* Floating cat silhouettes in background */}
      {floatingCats.map((cat) => (
        <motion.div
          key={cat.id}
          className="absolute pointer-events-none transform-gpu will-change-transform"
          style={{ left: `${cat.x}%`, top: `${cat.y}%` }}
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -20, 10, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: cat.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cat.id * 1.5,
          }}
        >
          <div style={{ opacity: cat.opacity }} className="text-white">
            {cat.type === 'sitting' ? (
              <CatSilhouette size={cat.size} />
            ) : (
              <WalkingCat size={cat.size} />
            )}
          </div>
        </motion.div>
      ))}

      {/* Paw print trail */}
      <AnimatePresence>
        {pawPrints.map((paw) => (
          <motion.div
            key={paw.id}
            className="absolute pointer-events-none transform-gpu will-change-transform"
            initial={{
              x: paw.x - 8,
              y: paw.y - 8,
              opacity: 0.5,
              scale: 1,
              rotate: paw.rotation,
            }}
            animate={{
              opacity: 0,
              scale: 0.5,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <CatPaw size={16} opacity={1} color="#ffb6c1" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Click burst - paws flying out */}
      <AnimatePresence>
        {clickBurst.map((burst, i) => {
          const angle = (i % 6) * 60;
          const distance = 50 + Math.random() * 30;
          return (
            <motion.div
              key={burst.id}
              className="absolute pointer-events-none transform-gpu will-change-transform"
              initial={{
                x: burst.x,
                y: burst.y,
                opacity: 0.8,
                scale: 0,
                rotate: Math.random() * 360,
              }}
              animate={{
                x: burst.x + Math.cos(angle * Math.PI / 180) * distance,
                y: burst.y + Math.sin(angle * Math.PI / 180) * distance,
                opacity: 0,
                scale: 1.5,
                rotate: Math.random() * 360,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <CatPaw size={14} opacity={1} color="#ffb6c1" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Cursor glow - pinkish for cat theme */}
      <motion.div
        className="absolute pointer-events-none transform-gpu will-change-transform"
        animate={{
          x: mousePos.x - 35,
          y: mousePos.y - 35,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className="w-[70px] h-[70px] rounded-full bg-gradient-radial from-pink-300/8 via-transparent to-transparent blur-xl" />
      </motion.div>
    </div>
  );
}
