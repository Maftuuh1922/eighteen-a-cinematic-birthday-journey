import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

// Audio Component for Birthday Song
const BirthdayAudio = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    
    useEffect(() => {
        // Auto-play when component mounts
        if (audioRef.current) {
            audioRef.current.play().catch(err => {
                console.log('Auto-play blocked, waiting for user interaction');
            });
        }
    }, []);
    
    return (
        <audio 
            ref={audioRef}
            loop
            autoPlay
            preload="auto"
        >
            <source src="/music/birthday-song.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    );
};
// Lazy-loaded components with error boundaries
const SafeEnvironment = React.lazy(() => 
    import('../../museum/Environment').then(m => ({ default: m.Environment }))
        .catch(err => {
            console.error('Failed to load Environment:', err);
            throw err;
        })
);

const SafePainting = React.lazy(() => 
    import('../../museum/Painting').then(m => ({ default: m.Painting }))
        .catch(err => {
            console.error('Failed to load Painting:', err);
            throw err;
        })
);

const SafePlayer = React.lazy(() => 
    import('../../museum/Player').then(m => ({ default: m.Player }))
        .catch(err => {
            console.error('Failed to load Player:', err);
            throw err;
        })
);
import { MobileControls } from '../../museum/MobileControls';
import { MiniMap } from '../../museum/MiniMap';
import { useNavigate } from 'react-router-dom';

// Error boundary component for Canvas
class CanvasErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback?: React.ReactNode },
    { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo }
> {
    constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Canvas error details:', error);
        console.error('Error stack:', error.stack);
        console.error('Component stack:', errorInfo.componentStack);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            const errorMessage = this.state.error?.message || 'Unknown error';
            return (
                <div className="absolute inset-0 flex items-center justify-center bg-black text-white z-50">
                    <div className="text-center max-w-md p-6">
                        <p className="text-red-400 mb-2 font-bold">3D Scene Error</p>
                        <p className="text-sm text-white/70 mb-4">{errorMessage}</p>
                        <pre className="text-xs text-white/50 text-left bg-white/10 p-2 rounded overflow-auto max-h-40">
                            {this.state.error?.stack || 'No stack trace'}
                        </pre>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-gold_accent text-black rounded hover:bg-white transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

const PHOTOS = [
    { id: 1, name: "Momen 1", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/1.jpeg" },
    { id: 2, name: "Momen 2", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/2.jpeg" },
    { id: 3, name: "Momen 3", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/3.jpeg" },
    { id: 4, name: "Momen 4", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/4.jpeg" },
    { id: 5, name: "Momen 5", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/5.jpeg" },
    { id: 6, name: "Momen 6", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/6.jpeg" },
    { id: 7, name: "Momen 7", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/7.jpeg" },
    { id: 8, name: "Momen 8", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/8.jpeg" },
    { id: 9, name: "Momen 9", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/9.jpeg" },
    { id: 10, name: "Momen 10", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/10.jpeg" },
    { id: 11, name: "Momen 11", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/11.jpeg" },
    { id: 12, name: "Momen 12", origin: "Nayla & Kenza", imageUrl: "/images/bercanda/12.jpeg" },
];

const PHOTO_POSITIONS: { [key: number]: { position: [number, number, number], rotation: [number, number, number] } } = {
    // North Wall (Z = -59.5, facing +Z i.e. rot [0,0,0])
    0: { position: [-30, 4.0, -59.5], rotation: [0, 0, 0] },
    1: { position: [-10, 4.0, -59.5], rotation: [0, 0, 0] },
    2: { position: [10, 4.0, -59.5], rotation: [0, 0, 0] },
    3: { position: [30, 4.0, -59.5], rotation: [0, 0, 0] },
    // South Wall (Z = 59.5, facing -Z i.e. rot [0, PI, 0])
    4: { position: [-30, 4.0, 59.5], rotation: [0, Math.PI, 0] },
    5: { position: [-10, 4.0, 59.5], rotation: [0, Math.PI, 0] },
    6: { position: [10, 4.0, 59.5], rotation: [0, Math.PI, 0] },
    7: { position: [30, 4.0, 59.5], rotation: [0, Math.PI, 0] },
    // East Wall (X = 59.5, facing -X i.e. rot [0, -PI/2, 0])
    8: { position: [59.5, 4.0, -20], rotation: [0, -Math.PI / 2, 0] },
    9: { position: [59.5, 4.0, 0], rotation: [0, -Math.PI / 2, 0] },
    10: { position: [59.5, 4.0, 20], rotation: [0, -Math.PI / 2, 0] },
    // West Wall (X = -59.5, facing +X i.e. rot [0, PI/2, 0])
    11: { position: [-59.5, 4.0, 0], rotation: [0, Math.PI / 2, 0] },
};

export function MuseumPage() {
    const navigate = useNavigate();
    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false);
    const [playerPosition, setPlayerPosition] = useState({ x: 0, z: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const mobileHandlersRef = useRef<any>({ onMove: null, onLook: null, onSprint: null });

    // Client-side only navigator check
    useEffect(() => {
        setIsMobile(/Android|iPhone|iPad/i.test(navigator.userAgent));
    }, []);

    // Loading screen timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Show controls hint after loading
            setTimeout(() => setShowControls(true), 500);
            // Hide controls after 4 seconds
            setTimeout(() => setShowControls(false), 4500);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
            {!started && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>
                    <h1 className="font-display text-5xl mb-2 text-yellow-400 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]">
                        Selamat Ulang Tahun
                    </h1>
                    <h2 className="font-display text-3xl mb-4 text-pink-400 uppercase tracking-wider">
                        Nayla ke-18 🎂
                    </h2>
                    <p className="font-subtitle opacity-80 mb-8 max-w-md text-center text-yellow-200 italic">
                        ✨ Selamat datang di Museum Kenangan Spesial ✨<br/>
                        Jelajahi momen-momen indah yang telah kita lewati bersama
                    </p>
                    <button
                        onClick={() => setStarted(true)}
                        className="px-10 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-lg rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                        🎊 Masuk Museum 🎊
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-6 text-white/60 hover:text-yellow-300 transition-colors">
                        ← Kembali
                    </button>
                    </div>
            )}

            {/* Birthday Audio - plays when museum starts */}
            {started && <BirthdayAudio />}

            {/* Loading Screen */}
            {loading && (
                <div className="absolute inset-0 z-[100] bg-[#04030A] flex flex-col items-center justify-center">
                    <div className="w-[300px] md:w-[400px]">
                        <div className="text-center mb-8">
                            <span
                                className="text-2xl italic"
                                style={{
                                    fontFamily: '"Cormorant Garamond", serif',
                                    color: '#C9A84C',
                                }}
                            >
                                Memuat Kenangan...
                            </span>
                        </div>
                        <div className="w-full h-[1px] bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full"
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                style={{ background: '#C9A84C' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Control Hint */}
            {showControls && !isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 text-center pointer-events-none"
                >
                    <p
                        className="text-[10px] tracking-[0.3em] uppercase"
                        style={{
                            fontFamily: '"DM Sans", sans-serif',
                            color: 'rgba(255,255,255,0.35)',
                        }}
                    >
                        W A S D — Bergerak  |  Mouse — Lihat
                    </p>
                </motion.div>
            )}

            <button
                onClick={() => navigate('/')}
                className="absolute top-6 left-6 z-40 p-3 bg-black/50 text-white rounded-full hover:bg-yellow-500 hover:text-black transition-colors backdrop-blur-md border border-white/10 shadow-lg">
                ←
            </button>

            <CanvasErrorBoundary>
                <Suspense fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-purple-900 to-black text-white z-10">
                        <div className="text-center">
                            <div className="text-4xl mb-4 animate-pulse">🎂</div>
                            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-yellow-300 font-bold">Memuat Museum Ulang Tahun...</p>
                        </div>
                    </div>
                }>
                <Canvas
                    shadows
                    camera={{ fov: 65, near: 0.1, far: 200, position: [0, 1.7, 12] }}
                    dpr={[1, 1.5]}  // More aggressive scaling (max 1.5 instead of 2)
                    performance={{ min: 0.5, ramp: 0.5 }}  // Faster recovery
                    gl={{
                        antialias: true,
                        powerPreference: 'high-performance',
                        alpha: false,
                        stencil: false,
                        depth: true,
                        logarithmicDepthBuffer: true,
                        preserveDrawingBuffer: false,
                    }}
                >
                    <color attach="background" args={['#1a0f0a']} />
                    <fog attach="fog" args={['#1a0f0a', 25, 100]} />
                    
                    {/* Optimized lighting for warm atmosphere without lag */}
                    <ambientLight intensity={0.5} />
                    <hemisphereLight intensity={0.4} groundColor="#3a2a18" color="#ffddaa" />
                    
                    {/* Main directional light with optimized shadows */}
                    <directionalLight
                        position={[0, 40, 30]}
                        intensity={0.9}
                        color="#fff8dc"
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={100}
                        shadow-camera-left={-50}
                        shadow-camera-right={50}
                        shadow-camera-top={50}
                        shadow-camera-bottom={-50}
                        shadow-bias={-0.0001}
                        shadow-normalBias={0.5}
                    />
                    
                    {/* Warm accent lights - reduced intensity for performance */}
                    <directionalLight position={[-30, 30, -30]} intensity={0.3} color="#ffd700" />
                    <directionalLight position={[30, 20, 30]} intensity={0.25} color="#ffffff" />
                    
                    {/* Central warm glow */}
                    <pointLight position={[0, 15, 0]} intensity={0.5} color="#ffcc88" distance={40} />
                    
                    {/* Warm accent lights for birthday atmosphere - optimized */}
                    <pointLight position={[-20, 8, -20]} intensity={0.4} color="#ffd700" distance={25} />
                    <pointLight position={[20, 8, 20]} intensity={0.4} color="#ffcc88" distance={25} />

                    <SafeEnvironment museumBatiks={[]} />

                    {PHOTOS.map((photo, i) => {
                        const pos = PHOTO_POSITIONS[i];
                        if (!pos) return null;
                        return (
                            <SafePainting
                                key={photo.id}
                                batik={photo}
                                position={pos.position}
                                rotation={pos.rotation}
                                isVisited={false}
                                onSelect={() => { }}
                            />
                        );
                    })}

                    <SafePlayer
                        started={started}
                        paused={paused}
                        onPositionChange={(pos: any) => setPlayerPosition(pos)}
                        mobileHandlers={mobileHandlersRef}
                    />
                </Canvas>
                </Suspense>
                </CanvasErrorBoundary>

            {started && (
                <>
                    <MiniMap playerPosition={playerPosition} paintings={Object.values(PHOTO_POSITIONS)} />
                    {isMobile ? (
                        <MobileControls
                            visible={true}
                            onMove={(x, y) => mobileHandlersRef.current.onMove?.(x, y)}
                            onLook={(dx, dy) => mobileHandlersRef.current.onLook?.(dx, dy)}
                            onSprint={(s) => mobileHandlersRef.current.onSprint?.(s)}
                        />
                    ) : (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-yellow-300/70 text-xs tracking-widest pointer-events-none text-center bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm border border-yellow-500/30">
                            WASD bergerak • Mouse melihat • Scroll zoom • 🎉 Enjoy!
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
