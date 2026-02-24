import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// ─── Particle Component ──────────────────────────────────────
const FloatingParticle = ({ delay, duration, size, left, top }: { 
    delay: number; 
    duration: number; 
    size: number; 
    left: string; 
    top: string;
}) => (
    <div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size,
            height: size,
            left,
            top,
            background: 'rgba(201,168,76,0.3)',
            animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
            opacity: 0.1 + Math.random() * 0.3,
        }}
    />
);

// ─── Corner Bracket ──────────────────────────────────────────
const CornerBracket = ({ position }: { position: 'tl' | 'br' }) => {
    const isTL = position === 'tl';
    return (
        <div
            className="absolute w-6 h-6 pointer-events-none"
            style={{
                [isTL ? 'top' : 'bottom']: '32px',
                [isTL ? 'left' : 'right']: '32px',
            }}
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={isTL ? '' : 'rotate-180'}
            >
                <path
                    d="M2 12V4C2 2.89543 2.89543 2 4 2H12"
                    stroke="rgba(201,168,76,0.25)"
                    strokeWidth="1"
                />
            </svg>
        </div>
    );
};

// ─── Main Component ──────────────────────────────────────────
export function CinematicHero() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [particles, setParticles] = useState<Array<{
        id: number;
        delay: number;
        duration: number;
        size: number;
        left: string;
        top: string;
    }>>([]);

    useEffect(() => {
        setVisible(true);
        
        // Generate 12 floating particles
        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 6,
            duration: 6 + Math.random() * 8,
            size: 1 + Math.random() * 1.5,
            left: `${10 + Math.random() * 80}%`,
            top: `${20 + Math.random() * 60}%`,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#04030A]">
            {/* ─── SVG Filters (Noise/Grain) ────────────────── */}
            <svg className="absolute inset-0 w-0 h-0 pointer-events-none">
                <filter id="grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.035 0"
                    />
                </filter>
            </svg>

            {/* ─── Background Layers ───────────────────────── */}
            
            {/* Layer 1: Deep violet bloom */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(80,30,120,0.18) 0%, transparent 70%)',
                    zIndex: 1,
                }}
            />

            {/* Layer 2: Noise texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    filter: 'url(#grain)',
                    opacity: 0.035,
                    zIndex: 2,
                }}
            />

            {/* Layer 3: Film grain animated (via CSS) */}
            <div
                className="absolute inset-0 pointer-events-none animate-grain"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    opacity: 0.04,
                    zIndex: 3,
                }}
            />

            {/* Layer 4: Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.92) 100%)',
                    zIndex: 4,
                }}
            />

            {/* Layer 5: Light shaft from top */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(201,168,76,0.03) 0%, transparent 40%)',
                    zIndex: 2,
                }}
            />

            {/* ─── Blurred Photo Mosaic Background ─────────── */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                {['/images/bercanda/2.jpeg', '/images/bercanda/3.jpeg', '/images/bercanda/4.jpeg', '/images/bercanda/5.jpeg'].map((src, i) => (
                    <div
                        key={i}
                        className="absolute w-[40vw] h-[40vw] overflow-hidden"
                        style={{
                            top: `${10 + i * 20}%`,
                            left: `${(i % 2) * 40 + 10}%`,
                            filter: 'blur(40px) brightness(0.15) sepia(50%)',
                            mixBlendMode: 'screen',
                            opacity: 0.3,
                        }}
                    >
                        <img
                            src={src}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ transform: 'scale(1.5)' }}
                        />
                    </div>
                ))}
            </div>

            {/* ─── Corner Brackets ─────────────────────────── */}
            <CornerBracket position="tl" />
            <CornerBracket position="br" />

            {/* ─── Side Labels ─────────────────────────────── */}
            <div
                className="absolute left-7 top-1/2 -translate-y-1/2 -rotate-90 pointer-events-none"
                style={{ zIndex: 10 }}
            >
                <span
                    className="text-[10px] tracking-[0.4em] text-[rgba(247,240,230,0.12)] uppercase"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    2008 — 2026
                </span>
            </div>

            <div
                className="absolute right-7 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none"
                style={{ zIndex: 10 }}
            >
                <span
                    className="text-[10px] tracking-[0.5em] text-[rgba(201,168,76,0.2)] uppercase"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                >
                    KENANGAN
                </span>
            </div>

            {/* ─── Floating Particles ──────────────────────── */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
                {particles.map((p) => (
                    <FloatingParticle
                        key={p.id}
                        delay={p.delay}
                        duration={p.duration}
                        size={p.size}
                        left={p.left}
                        top={p.top}
                    />
                ))}
            </div>

            {/* ─── Main Content ────────────────────────────── */}
            <div
                className="relative z-20 w-full h-full flex flex-col items-center justify-center px-6"
                style={{
                    maxWidth: '680px',
                    margin: '0 auto',
                }}
            >
                {/* Museum Emblem - Roman Numeral Monogram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6"
                >
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                            border: '1px solid rgba(201,168,76,0.4)',
                            background: 'transparent',
                        }}
                    >
                        <span
                            className="text-2xl italic"
                            style={{
                                fontFamily: '"Bodoni Moda", serif',
                                color: '#C9A84C',
                            }}
                        >
                            N
                        </span>
                    </div>
                </motion.div>

                {/* Thin Rule Top */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-4"
                >
                    <span
                        className="text-base"
                        style={{ color: 'rgba(201,168,76,0.3)' }}
                    >
                        — ✦ —
                    </span>
                </motion.div>

                {/* Museum Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-8"
                >
                    <span
                        className="text-[10px] tracking-[0.55em] uppercase"
                        style={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontWeight: 300,
                            color: 'rgba(201,168,76,0.6)',
                        }}
                    >
                        MUSEUM KENANGAN
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-6 text-center"
                >
                    <div
                        className="text-[11vw] md:text-[6.5vw] leading-none italic mb-1"
                        style={{
                            fontFamily: '"Bodoni Moda", serif',
                            color: '#F7F0E6',
                        }}
                    >
                        Selamat
                    </div>
                    <div
                        className="text-[11vw] md:text-[6.5vw] leading-none"
                        style={{
                            fontFamily: '"Bodoni Moda", serif',
                            color: '#F7F0E6',
                        }}
                    >
                        Ulang Tahun
                    </div>
                </motion.div>

                {/* Name Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-4"
                >
                    {/* Ghost Number 18 Behind */}
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        style={{ zIndex: -1 }}
                    >
                        <span
                            className="text-[28vw] md:text-[14vw] leading-none"
                            style={{
                                fontFamily: '"Cormorant Garamond", serif',
                                color: 'rgba(201,168,76,0.06)',
                            }}
                        >
                            18
                        </span>
                    </div>

                    {/* Name */}
                    <span
                        className="text-[13vw] md:text-[5vw]"
                        style={{
                            fontFamily: '"Pinyon Script", cursive',
                            color: '#C9A84C',
                            letterSpacing: '0.05em',
                            textShadow: '0 0 60px rgba(201,168,76,0.25)',
                        }}
                    >
                        Nayla
                    </span>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 2.2 }}
                    className="text-center max-w-[440px] mb-10 italic"
                    style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '1.05rem',
                        lineHeight: 1.9,
                        color: 'rgba(247,240,230,0.55)',
                    }}
                >
                    Selamat datang di ruang kenangan yang disimpan untukmu —
                    momen-momen yang membentuk siapa dirimu.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 2.6 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate('/museum')}
                        className="group relative px-12 py-4 transition-all duration-500 ease-out"
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(201,168,76,0.5)',
                            color: '#C9A84C',
                            fontFamily: '"DM Sans", sans-serif',
                            fontSize: '0.7rem',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            borderRadius: '0px',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(201,168,76,0.08)';
                            e.currentTarget.style.borderColor = '#C9A84C';
                            e.currentTarget.style.color = '#E8D5A3';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 40px rgba(201,168,76,0.12)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'rgba(201,168,76,0.5)';
                            e.currentTarget.style.color = '#C9A84C';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        Masuk ke Museum
                    </button>
                </motion.div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={visible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 3 }}
                >
                    <button
                        onClick={() => navigate('/')}
                        className="text-[10px] tracking-[0.2em] transition-colors duration-300 ease-out"
                        style={{
                            fontFamily: '"DM Sans", sans-serif',
                            color: 'rgba(247,240,230,0.25)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'rgba(247,240,230,0.6)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(247,240,230,0.25)';
                        }}
                    >
                        ← Kembali
                    </button>
                </motion.div>
            </div>

            {/* ─── CSS Keyframes ───────────────────────────── */}
            <style>{`
                @keyframes floatUp {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.1;
                    }
                    50% {
                        transform: translateY(-30px) translateX(10px);
                        opacity: 0.4;
                    }
                }
                
                @keyframes grain {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -10%); }
                    20% { transform: translate(-15%, 5%); }
                    30% { transform: translate(7%, -25%); }
                    40% { transform: translate(-5%, 25%); }
                    50% { transform: translate(-15%, 10%); }
                    60% { transform: translate(15%, 0%); }
                    70% { transform: translate(0%, 15%); }
                    80% { transform: translate(3%, 25%); }
                    90% { transform: translate(-10%, 10%); }
                }
                
                .animate-grain {
                    animation: grain 1.5s steps(10) infinite;
                }
            `}</style>
        </section>
    );
}
