import React from 'react';
import { motion } from 'framer-motion';

// Sitting cat - peeking from bottom
export function PeekingCat({
    className = '',
    color = 'white',
    opacity = 0.1,
    size = 50,
    delay = 2
}: {
    className?: string;
    color?: string;
    opacity?: number;
    size?: number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ y: size * 0.6, opacity: 0 }}
            whileInView={{ y: 0, opacity }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className={`pointer-events-none select-none ${className}`}
        >
            <svg width={size} height={size} viewBox="0 0 64 64" fill={color}>
                <path d="M16 28 L13 12 L22 22 Z" />
                <path d="M48 28 L51 12 L42 22 Z" />
                <circle cx="32" cy="30" r="12" />
                <ellipse cx="32" cy="50" rx="16" ry="14" />
                <path d="M48 48 Q58 38 56 30 Q55 26 52 28 Q50 34 44 42" stroke={color} strokeWidth="2" />
                <ellipse cx="27" cy="28" rx="2.5" ry="3" fill="currentColor" className="text-black/60" />
                <ellipse cx="37" cy="28" rx="2.5" ry="3" fill="currentColor" className="text-black/60" />
                <ellipse cx="27.8" cy="27.5" rx="1" ry="1.3" fill="white" opacity="0.8" />
                <ellipse cx="37.8" cy="27.5" rx="1" ry="1.3" fill="white" opacity="0.8" />
                <ellipse cx="32" cy="33" rx="1.5" ry="1" fill="currentColor" className="text-pink-300" opacity="0.6" />
                <path d="M30.5 34 Q32 36 33.5 34" fill="none" stroke="currentColor" className="text-black/40" strokeWidth="0.8" />
            </svg>
        </motion.div>
    );
}

// Cat paw prints trail
export function PawTrail({
    className = '',
    color = 'white',
    opacity = 0.06,
    count = 4,
    delay = 1.5,
}: {
    className?: string;
    color?: string;
    opacity?: number;
    count?: number;
    delay?: number;
}) {
    return (
        <div className={`pointer-events-none select-none ${className}`}>
            {Array.from({ length: count }, (_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity, scale: 1 }}
                    transition={{ duration: 0.6, delay: delay + i * 0.2 }}
                    viewport={{ once: true }}
                    className="inline-block mx-2"
                    style={{
                        transform: `rotate(${i % 2 === 0 ? -15 : 15}deg)`,
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 32 32" fill={color}>
                        <ellipse cx="16" cy="22" rx="6" ry="5" />
                        <circle cx="10" cy="14" r="2.5" />
                        <circle cx="16" cy="12" r="2.5" />
                        <circle cx="22" cy="14" r="2.5" />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
}

// Sleeping cat - curled up
export function SleepingCat({
    className = '',
    color = 'white',
    opacity = 0.08,
    size = 60,
    delay = 2,
}: {
    className?: string;
    color?: string;
    opacity?: number;
    size?: number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity, scale: 1 }}
            transition={{ duration: 1, delay }}
            viewport={{ once: true }}
            className={`pointer-events-none select-none ${className}`}
        >
            <svg width={size} height={size * 0.55} viewBox="0 0 80 44" fill={color}>
                {/* Curled body */}
                <ellipse cx="40" cy="28" rx="28" ry="14" />
                {/* Head */}
                <circle cx="18" cy="20" r="10" />
                {/* Ears */}
                <path d="M11 14 L9 4 L16 10 Z" />
                <path d="M24 12 L26 4 L20 10 Z" />
                {/* Tail wrapping around */}
                <path d="M68 26 Q76 18 72 12 Q70 8 68 12 Q66 18 62 24" stroke={color} strokeWidth="3" fill="none" />
                {/* Closed eyes - sleeping zzz */}
                <path d="M13 19 Q15 17.5 17 19" fill="none" stroke="currentColor" className="text-black/40" strokeWidth="1" />
                <path d="M19 18 Q21 16.5 23 18" fill="none" stroke="currentColor" className="text-black/40" strokeWidth="1" />
            </svg>
            {/* Zzz */}
            <motion.div
                animate={{ y: [0, -6, 0], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 left-1/4"
                style={{ opacity: opacity * 3 }}
            >
                <span style={{ color, fontSize: '10px', fontStyle: 'italic', letterSpacing: '2px' }}>zzz</span>
            </motion.div>
        </motion.div>
    );
}

// Cat stretching
export function StretchingCat({
    className = '',
    color = 'white',
    opacity = 0.08,
    size = 55,
    delay = 2,
}: {
    className?: string;
    color?: string;
    opacity?: number;
    size?: number;
    delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity, x: 0 }}
            transition={{ duration: 1, delay }}
            viewport={{ once: true }}
            className={`pointer-events-none select-none ${className}`}
        >
            <svg width={size} height={size * 0.5} viewBox="0 0 80 40" fill={color}>
                {/* Front - low head stretching */}
                <ellipse cx="20" cy="28" rx="10" ry="6" />
                {/* Ears */}
                <path d="M13 22 L11 14 L17 20 Z" />
                <path d="M25 20 L27 14 L22 19 Z" />
                {/* Head */}
                <circle cx="19" cy="24" r="7" />
                {/* Front paws stretched */}
                <rect x="4" y="30" width="12" height="3" rx="1.5" />
                {/* Body - arched up */}
                <path d="M28 26 Q45 8 62 24" fill={color} />
                {/* Back legs */}
                <rect x="58" y="24" width="3" height="12" rx="1.5" />
                <rect x="64" y="24" width="3" height="12" rx="1.5" />
                {/* Tail up */}
                <path d="M66 20 Q72 6 68 2" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
                {/* Eyes */}
                <ellipse cx="16" cy="23" rx="1.5" ry="2" fill="currentColor" className="text-black/50" />
                <ellipse cx="22" cy="22" rx="1.5" ry="2" fill="currentColor" className="text-black/50" />
            </svg>
        </motion.div>
    );
}
