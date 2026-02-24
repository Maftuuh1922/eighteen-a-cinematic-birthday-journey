import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PageFlip, SizeType } from 'page-flip';
import './FlipbookSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

// ─── Constants ───────────────────────────────────────────────
const ROW_1_PHOTOS = ['/images/bercanda/2.jpeg', '/images/bercanda/3.jpeg', '/images/bercanda/4.jpeg', '/images/bercanda/5.jpeg', '/images/bercanda/6.jpeg'];
const ROW_2_PHOTOS = ['/images/bercanda/7.jpeg', '/images/bercanda/8.jpeg', '/images/bercanda/9.jpeg', '/images/bercanda/10.jpeg', '/images/bercanda/11.jpeg'];

// Image fallback handler
const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    target.style.background = 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)';
    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
};

// ─── Page Data ───────────────────────────────────────────────
const PAGES = [
    {
        type: 'cover' as const,
        bg: 'linear-gradient(135deg, #1a1410 0%, #0d0a08 40%, #000000 100%)',
        image: '',
        content: {
            title: 'NAYLA',
            subtitle: 'A Cinematic Birthday Journey',
            artist: 'For You',
            year: '',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/12.jpeg',
        content: {
            chapter: 'Chapter I',
            title: 'Haii Sayang',
            text: 'Makasih ya udah kuat sampai hari ini. Nggak kerasa waktu cepet banget berlalunya, aku seneng banget bisa lihat kamu sejauh ini.',
            quote: '"Makasih udah hadir di duniaku..."',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F5F5F0',
        image: '/images/bercanda/2.jpeg',
        content: {
            caption: 'Senyum manismu',
            year: '',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/3.jpeg',
        content: {
            chapter: 'Chapter II',
            title: 'Momen Kita',
            text: 'Masa-masa bareng kamu tuh selalu seru. Banyak banget hal gila dan canda tawa yang kita lewati. You make everything better.',
            quote: '"Every second with you is precious..."',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F0EDE8',
        image: '/images/bercanda/4.jpeg',
        content: {
            caption: 'Our tiny moments',
            year: '',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/5.jpeg',
        content: {
            chapter: 'Chapter III',
            title: 'Tumbuh Bareng',
            text: 'Semoga kamu makin bahagia, makin sehat, dan selalu jadi dirimu sendiri. Jangan pernah ngerasa sendiri ya, aku selalu ada buat kamu.',
            quote: '"Keep glowing sayang..."',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F5F5F0',
        image: '/images/bercanda/6.jpeg',
        content: {
            caption: 'You are loved',
            year: '',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/7.jpeg',
        content: {
            chapter: 'Chapter IV',
            title: 'Langkah Kedepan',
            text: 'Apapun impianmu selanjutnya, pokoknya aku dukung penuh. Kalau capek, istirahat dulu, terus jalan lagi.',
            quote: '"Aku bangga luar biasa sama kamu..."',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F0EDE8',
        image: '/images/bercanda/8.jpeg',
        content: {
            caption: 'Beautiful soul',
            year: '',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F5F5F0',
        image: '/images/bercanda/9.jpeg',
        content: {
            caption: 'Never change',
            year: '',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F0EDE8',
        image: '/images/bercanda/10.jpeg',
        content: {
            caption: 'My favorite person',
            year: '',
        },
    },
    {
        type: 'tribute' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/11.jpeg',
        content: {
            title: 'Untuk Kamu Tersayang',
            text: 'Buku kecil ini buat ngingetin betapa berharganya kamu di hidupku. Makasih ya udah lahir di dunia ini.',
            signature: 'Love you always, Nayla! ✨',
            footer: '© 2025 A Tribute to Nayla',
        },
    },
    {
        type: 'backcover' as const,
        bg: 'linear-gradient(135deg, #0d0a08 0%, #1a1410 50%, #000000 100%)',
        image: '',
        content: {
            title: 'NAYLA',
            text: 'Sekali lagi, makasih ya sayang udah selalu ngasih yang terbaik buat sekelilingmu.',
            year: '',
        },
    },
];

// ─── Helper: get book dimensions based on viewport ───────────
function getBookDimensions(isMobile: boolean) {
    if (isMobile) {
        // Mobile: single page, takes most of screen width
        const w = Math.min(Math.floor(window.innerWidth * 0.9), 400);
        const h = Math.min(Math.floor(window.innerHeight * 0.55), 580);
        return { pageWidth: w, pageHeight: h };
    }
    // Desktop: show two pages side by side
    const maxH = Math.min(Math.floor(window.innerHeight * 0.7), 680);
    const pageW = Math.floor(maxH * 0.7); // aspect ratio ~0.7
    return { pageWidth: Math.min(pageW, 480), pageHeight: maxH };
}

// ─── Individual Page Components ──────────────────────────────

function CoverPage({ data }: { data: typeof PAGES[0] }) {
    const c = data.content;
    return (
        <div className="page-inner cover-page" style={{ background: data.bg }}>
            <div className="cover-ornament top-left" />
            <div className="cover-ornament top-right" />
            <div className="cover-ornament bottom-left" />
            <div className="cover-ornament bottom-right" />
            <div className="cover-pattern" />
            <div className="cover-content">
                {c.year && <div className="cover-year-badge">{c.year}</div>}
                <h1 className="cover-title">{c.title}</h1>
                <div className="cover-divider" />
                <p className="cover-subtitle">{c.subtitle}</p>
                <p className="cover-artist">{c.artist}</p>
            </div>
            <div className="cover-bottom-flourish">
                <BookOpen size={20} strokeWidth={1} color="rgba(255,255,255,0.4)" />
            </div>
        </div>
    );
}

function StoryPage({ data }: { data: typeof PAGES[1] }) {
    const c = data.content as any;
    return (
        <div className="page-inner story-page" style={{ background: data.bg }}>
            <div className="paper-texture" />
            <div className="page-fold-shadow" />
            <div className="book-spine-shadow" />
            <div className="story-content">
                <span className="story-chapter">{c.chapter}</span>
                <h2 className="story-title">{c.title}</h2>
                <div className="story-divider" />
                {data.image && (
                    <div className="story-image-wrapper">
                        <img 
                            src={data.image} 
                            alt={c.title} 
                            className="story-image" 
                            loading="lazy" 
                            onError={handleImageError}
                        />
                        <div className="photo-corner-tape top-left" />
                        <div className="photo-corner-tape top-right" />
                        <div className="photo-corner-tape bottom-left" />
                        <div className="photo-corner-tape bottom-right" />
                    </div>
                )}
                <p className="story-text">{c.text}</p>
                <blockquote className="story-quote">{c.quote}</blockquote>
            </div>
            {/* Cute stickers scattered around */}
            <div className="cute-sticker" style={{ top: '8%', right: '8%', animationDelay: '0s' }}>🌸</div>
            <div className="cute-sticker" style={{ top: '15%', left: '5%', animationDelay: '1.5s' }}>✨</div>
            <div className="cute-sticker" style={{ bottom: '25%', right: '12%', animationDelay: '0.8s' }}>💕</div>
            <div className="cute-sticker" style={{ bottom: '10%', left: '8%', animationDelay: '2s' }}>🦋</div>
            <div className="cute-sticker" style={{ top: '40%', right: '5%', animationDelay: '1.2s' }}>🌟</div>
            <div className="decorative-washi-tape" style={{ top: '5%', left: '50%', transform: 'translateX(-50%) rotate(-2deg)' }} />
            <div className="page-number-area">
                <div className="page-number-line" />
            </div>
        </div>
    );
}

function PhotoPage({ data }: { data: typeof PAGES[2] }) {
    const c = data.content as any;
    return (
        <div className="page-inner photo-page" style={{ background: data.bg }}>
            <div className="paper-texture" />
            <div className="page-fold-shadow" />
            <div className="book-spine-shadow" />
            <div className="photo-content">
                {/* Washi tape at top */}
                <div className="decorative-washi-tape top-0" style={{ left: '50%', transform: 'translateX(-50%) rotate(-1deg)' }} />
                
                {/* More cute stickers */}
                <div className="cute-sticker" style={{ top: '5%', left: '10%', animationDelay: '0.5s', fontSize: '1.5rem' }}>🎀</div>
                <div className="cute-sticker" style={{ top: '8%', right: '12%', animationDelay: '1.8s', fontSize: '1.3rem' }}>🌼</div>
                <div className="cute-sticker" style={{ bottom: '20%', right: '8%', animationDelay: '1s', fontSize: '1.6rem' }}>💖</div>
                <div className="cute-sticker" style={{ bottom: '8%', left: '15%', animationDelay: '2.2s', fontSize: '1.4rem' }}>🍓</div>
                <div className="cute-sticker" style={{ top: '50%', left: '5%', animationDelay: '1.3s', fontSize: '1.2rem' }}>⭐</div>
                <div className="cute-sticker" style={{ top: '45%', right: '8%', animationDelay: '0.7s', fontSize: '1.5rem' }}>🎵</div>

                <div className="photo-frame">
                    <img 
                        src={data.image} 
                        alt={c.caption} 
                        className="photo-image" 
                        loading="lazy" 
                        onError={handleImageError}
                    />
                    <div className="photo-corner-tape top-left" />
                    <div className="photo-corner-tape top-right" />
                    <div className="photo-corner-tape bottom-left" />
                    <div className="photo-corner-tape bottom-right" />
                </div>
                <div className="photo-caption-area">
                    <span className="photo-caption">{c.caption}</span>
                    <span className="photo-year">{c.year}</span>
                </div>
            </div>
            <div className="page-number-area">
                <div className="page-number-line" />
            </div>
        </div>
    );
}

function TributePage({ data }: { data: typeof PAGES[11] }) {
    const c = data.content as any;
    return (
        <div className="page-inner tribute-page" style={{ background: data.bg }}>
            <div className="paper-texture" />
            <div className="book-spine-shadow" />
            <div className="tribute-content">
                {/* Washi tape */}
                <div className="decorative-washi-tape" style={{ top: '2%', left: '50%', transform: 'translateX(-50%) rotate(1deg)' }} />
                
                {/* Cute stickers */}
                <div className="cute-sticker" style={{ top: '8%', right: '10%', animationDelay: '0.5s', fontSize: '1.8rem' }}>🌷</div>
                <div className="cute-sticker" style={{ top: '12%', left: '8%', animationDelay: '1.2s', fontSize: '1.5rem' }}>💐</div>
                <div className="cute-sticker" style={{ bottom: '15%', right: '12%', animationDelay: '0.8s', fontSize: '1.6rem' }}>🎁</div>
                <div className="cute-sticker" style={{ bottom: '8%', left: '10%', animationDelay: '1.8s', fontSize: '1.4rem' }}>🕯️</div>

                {data.image && (
                    <div className="tribute-image-wrapper">
                        <img 
                            src={data.image} 
                            alt="Tribute" 
                            className="tribute-image" 
                            loading="lazy" 
                            onError={handleImageError}
                        />
                        <div className="photo-corner-tape top-left" />
                        <div className="photo-corner-tape top-right" />
                        <div className="photo-corner-tape bottom-left" />
                        <div className="photo-corner-tape bottom-right" />
                    </div>
                )}
                <h2 className="tribute-title">{c.title}</h2>
                <div className="story-divider" />
                <p className="tribute-text">{c.text}</p>
                <p className="tribute-signature">{c.signature}</p>
                <p className="tribute-footer">{c.footer}</p>
            </div>
        </div>
    );
}

function BackCoverPage({ data }: { data: typeof PAGES[12] }) {
    const c = data.content as any;
    return (
        <div className="page-inner backcover-page" style={{ background: data.bg }}>
            <div className="cover-pattern" />
            <div className="cover-ornament top-left" />
            <div className="cover-ornament top-right" />
            <div className="cover-ornament bottom-left" />
            <div className="cover-ornament bottom-right" />
            <div className="backcover-content">
                <p className="backcover-text">{c.text}</p>
                <div className="cover-divider" />
                <p className="backcover-title">{c.title}</p>
                {c.year && <p className="backcover-year">{c.year}</p>}
            </div>
        </div>
    );
}

function renderPage(page: typeof PAGES[number]) {
    switch (page.type) {
        case 'cover':
            return <CoverPage data={page as typeof PAGES[0]} />;
        case 'story':
            return <StoryPage data={page as typeof PAGES[1]} />;
        case 'photo':
            return <PhotoPage data={page as typeof PAGES[2]} />;
        case 'tribute':
            return <TributePage data={page as typeof PAGES[11]} />;
        case 'backcover':
            return <BackCoverPage data={page as typeof PAGES[12]} />;
        default:
            return null;
    }
}

// ─── Main FlipbookSection Component ──────────────────────────
export function FlipbookSection() {
    const bookRef = useRef<HTMLDivElement>(null);
    const pageFlipRef = useRef<PageFlip | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [dims, setDims] = useState({ pageWidth: 420, pageHeight: 580 });
    const initTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Detect mobile + compute dimensions
    useEffect(() => {
        const update = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setDims(getBookDimensions(mobile));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Update flipbook dimensions on resize
    useEffect(() => {
        if (pageFlipRef.current && dims) {
            const { pageWidth, pageHeight } = dims;
            try {
                pageFlipRef.current.updateFromHtml(
                    bookRef.current?.querySelectorAll('.flipbook-page') as NodeListOf<HTMLElement>
                );
            } catch {
                // Ignore resize errors during transition
            }
        }
    }, [dims]);

    // Initialize PageFlip — optimized for instant load
    useEffect(() => {
        // Clear any pending init
        if (initTimeoutRef.current) {
            clearTimeout(initTimeoutRef.current);
            initTimeoutRef.current = null;
        }

        // Destroy previous instance
        if (pageFlipRef.current) {
            try { pageFlipRef.current.destroy(); } catch { }
            pageFlipRef.current = null;
            setIsReady(false);
        }

        // Use requestAnimationFrame for instant DOM-ready initialization
        initTimeoutRef.current = setTimeout(() => {
            if (!bookRef.current) return;

            const { pageWidth, pageHeight } = dims;

            try {
                const pf = new PageFlip(bookRef.current, {
                    width: pageWidth,
                    height: pageHeight,
                    size: 'fixed' as SizeType,
                    maxShadowOpacity: 0.5,
                    showCover: true,
                    mobileScrollSupport: false,
                    startPage: 0,
                    drawShadow: true,
                    flippingTime: 700,
                    usePortrait: isMobile,
                    startZIndex: 0,
                    autoSize: false,
                    useMouseEvents: true,
                    swipeDistance: 30,
                    showPageCorners: true,
                });

                const pages = bookRef.current.querySelectorAll('.flipbook-page');
                if (pages.length > 0) {
                    pf.loadFromHTML(pages as NodeListOf<HTMLElement>);

                    pf.on('flip', (e: any) => {
                        setCurrentPage(e.data);
                    });

                    setTotalPages(pf.getPageCount());
                    setIsReady(true);
                    pageFlipRef.current = pf;
                }
            } catch (err) {
                console.error('PageFlip init error:', err);
            }
        }, 0);

        return () => {
            if (initTimeoutRef.current) {
                clearTimeout(initTimeoutRef.current);
                initTimeoutRef.current = null;
            }
            if (pageFlipRef.current) {
                try { pageFlipRef.current.destroy(); } catch { }
                pageFlipRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only init once on mount

    const flipNext = useCallback(() => {
        pageFlipRef.current?.flipNext();
    }, []);

    const flipPrev = useCallback(() => {
        pageFlipRef.current?.flipPrev();
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                flipNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                flipPrev();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [flipNext, flipPrev]);

    // The container size for the book:
    // - In portrait/mobile: single page width × height
    // - In landscape/desktop: double page width × height (two pages side by side)
    const bookContainerWidth = isMobile ? dims.pageWidth : dims.pageWidth * 2;
    const bookContainerHeight = dims.pageHeight;

    return (
        <section className="snap-section flipbook-section relative overflow-hidden" id="flipbook-section">
            {/* Background */}
            <div className="flipbook-bg" />
            <div className="flipbook-ambient-light" />

            {/* Top moving photo track */}
            <div className="absolute top-0 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none py-2 z-[2]" style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}>
                <div className="flex gap-4 w-max animate-[marquee-left_45s_linear_infinite] will-change-transform">
                    {[...ROW_1_PHOTOS, ...ROW_1_PHOTOS, ...ROW_1_PHOTOS].map((src, i) => (
                        <img key={`top-${i}`} src={src} className="h-[120px] md:h-[180px] w-auto object-cover grayscale brightness-75 rounded-sm" alt="" loading="lazy" />
                    ))}
                </div>
            </div>

            {/* Bottom moving photo track */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none py-2 z-[2]" style={{ maskImage: 'linear-gradient(to top, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)' }}>
                <div className="flex gap-4 w-max animate-[marquee-right_50s_linear_infinite] will-change-transform">
                    {[...ROW_2_PHOTOS, ...ROW_2_PHOTOS, ...ROW_2_PHOTOS].map((src, i) => (
                        <img key={`bottom-${i}`} src={src} className="h-[120px] md:h-[180px] w-auto object-cover grayscale brightness-75 rounded-sm" alt="" loading="lazy" />
                    ))}
                </div>
            </div>

            {/* Book Container */}
            <div className="flipbook-stage">
                <div className="book-surface-shadow" />

                {/* The book wrapper needs explicit dimensions for page-flip to work */}
                <div
                    ref={bookRef}
                    className="flipbook-book"
                    style={{
                        width: `${bookContainerWidth}px`,
                        height: `${bookContainerHeight}px`,
                    }}
                >
                    {PAGES.map((page, i) => (
                        <div
                            key={i}
                            className="flipbook-page"
                            data-density={page.type === 'cover' || page.type === 'backcover' ? 'hard' : 'soft'}
                            style={{
                                width: `${dims.pageWidth}px`,
                                height: `${dims.pageHeight}px`,
                            }}
                        >
                            {renderPage(page)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            <AnimatePresence>
                {isReady && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flipbook-controls"
                    >
                        <button
                            onClick={flipPrev}
                            className="flip-nav-btn flip-prev"
                            aria-label="Previous page"
                            disabled={currentPage === 0}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flip-page-indicator">
                            <span className="flip-current-page">{currentPage + 1}</span>
                            <span className="flip-page-sep">/</span>
                            <span className="flip-total-pages">{totalPages}</span>
                        </div>

                        <button
                            onClick={flipNext}
                            className="flip-nav-btn flip-next"
                            aria-label="Next page"
                            disabled={currentPage >= totalPages - 1}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hint text */}
            <AnimatePresence>
                {isReady && currentPage === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flipbook-hint"
                    >
                        <motion.span
                            animate={{ x: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="flipbook-hint-icon"
                        >
                            👆
                        </motion.span>
                        <span>Drag the corner to flip</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
