import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PageFlip, SizeType } from 'page-flip';
import './FlipbookSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

// ─── Page Data ───────────────────────────────────────────────
const PAGES = [
    {
        type: 'cover' as const,
        bg: 'linear-gradient(135deg, #8B1538 0%, #6B1028 40%, #4A0B1C 100%)',
        image: '',
        content: {
            title: 'BERCANDA',
            subtitle: 'A Cinematic Birthday Journey',
            artist: 'Bernadya Ribka',
            year: '2025',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/1.jpeg',
        content: {
            chapter: 'Chapter I',
            title: 'The Beginning',
            text: 'An artist who heals through the wounds she pours into every note. Her music reminds us that vulnerability is strength, and sadness can be a harbor.',
            quote: '"From a simple bedroom to the biggest stages..."',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F5F5F0',
        image: '/images/bercanda/2.jpeg',
        content: {
            caption: 'Finding her sound',
            year: '2023',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/3.jpeg',
        content: {
            chapter: 'Chapter II',
            title: 'Rising Star',
            text: 'From small platforms to becoming a voice for millions of hearts, Bernadya proves that honesty in expression will always find its way home.',
            quote: '"12.7M Monthly Listeners — Most Streamed Female Artist"',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F0EDE8',
        image: '/images/bercanda/4.jpeg',
        content: {
            caption: 'The craft',
            year: '2024',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/5.jpeg',
        content: {
            chapter: 'Chapter III',
            title: '3 AMI Awards',
            text: 'Anugerah Musik Indonesia is a witness to hard work, tears, and endless dedication. Every trophy is an embrace from the industry for the honesty she offers.',
            quote: '"Keep flying high, this is just the beginning..."',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F5F5F0',
        image: '/images/bercanda/6.jpeg',
        content: {
            caption: 'Golden hour vibes',
            year: '2024',
        },
    },
    {
        type: 'story' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/7.jpeg',
        content: {
            chapter: 'Chapter IV',
            title: 'The Journey Continues',
            text: 'Bernadya is a mirror for many of us who try to be strong while staying true to ourselves. Through every song, she shows that being vulnerable is not a weakness.',
            quote: '"Her journey is proof that an honest voice will always find its listeners"',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F0EDE8',
        image: '/images/bercanda/8.jpeg',
        content: {
            caption: 'Studio moments',
            year: '2024',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F5F5F0',
        image: '/images/bercanda/9.jpeg',
        content: {
            caption: 'On stage energy',
            year: '2025',
        },
    },
    {
        type: 'photo' as const,
        bg: '#F0EDE8',
        image: '/images/bercanda/10.jpeg',
        content: {
            caption: 'Behind the scenes',
            year: '2025',
        },
    },
    {
        type: 'tribute' as const,
        bg: '#FFFDF8',
        image: '/images/bercanda/11.jpeg',
        content: {
            title: 'A Tribute to Her Artistry',
            text: 'This is a tribute to all that you have given, and excitement for all that is yet to come.',
            signature: 'Love you always, Nad! ✨',
            footer: '© 2025 A Tribute to Bernadya',
        },
    },
    {
        type: 'backcover' as const,
        bg: 'linear-gradient(135deg, #6B1028 0%, #8B1538 50%, #4A0B1C 100%)',
        image: '',
        content: {
            title: 'BERCANDA',
            text: 'Terima kasih sudah menjadi bagian dari perjalanan ini.',
            year: '2025',
        },
    },
];

// ─── Helper: get book dimensions based on viewport ───────────
function getBookDimensions(isMobile: boolean) {
    if (isMobile) {
        const w = Math.min(Math.floor(window.innerWidth * 0.88), 380);
        const h = Math.min(Math.floor(window.innerHeight * 0.62), 540);
        return { pageWidth: w, pageHeight: h };
    }
    // Desktop: show two pages side by side
    const maxH = Math.min(Math.floor(window.innerHeight * 0.72), 650);
    const pageW = Math.floor(maxH * 0.72); // aspect ratio ~0.72
    return { pageWidth: Math.min(pageW, 450), pageHeight: maxH };
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
                <div className="cover-year-badge">{c.year}</div>
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
            <div className="story-content">
                <span className="story-chapter">{c.chapter}</span>
                <h2 className="story-title">{c.title}</h2>
                <div className="story-divider" />
                {data.image && (
                    <div className="story-image-wrapper">
                        <img src={data.image} alt={c.title} className="story-image" loading="lazy" />
                    </div>
                )}
                <p className="story-text">{c.text}</p>
                <blockquote className="story-quote">{c.quote}</blockquote>
            </div>
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
            <div className="photo-content">
                <div className="photo-frame">
                    <img src={data.image} alt={c.caption} className="photo-image" loading="lazy" />
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
            <div className="tribute-content">
                {data.image && (
                    <div className="tribute-image-wrapper">
                        <img src={data.image} alt="Tribute" className="tribute-image" loading="lazy" />
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
                <p className="backcover-year">{c.year}</p>
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

    // Initialize PageFlip — delay to ensure DOM is painted
    useEffect(() => {
        // Clear any pending init
        if (initTimeoutRef.current) {
            clearTimeout(initTimeoutRef.current);
        }

        // Destroy previous instance
        if (pageFlipRef.current) {
            try { pageFlipRef.current.destroy(); } catch { }
            pageFlipRef.current = null;
            setIsReady(false);
        }

        // Wait for DOM to be fully painted before initializing
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
                    flippingTime: 900,
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
        }, 300);

        return () => {
            if (initTimeoutRef.current) {
                clearTimeout(initTimeoutRef.current);
            }
            if (pageFlipRef.current) {
                try { pageFlipRef.current.destroy(); } catch { }
                pageFlipRef.current = null;
            }
        };
    }, [isMobile, dims]);

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
        <section className="snap-section flipbook-section" id="flipbook-section">
            {/* Background */}
            <div className="flipbook-bg" />
            <div className="flipbook-ambient-light" />

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
                        transition={{ delay: 0.5, duration: 0.6 }}
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
                        transition={{ delay: 1.5, duration: 0.8 }}
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
