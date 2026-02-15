import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, X } from 'lucide-react';
import { cn } from '@/lib/utils';
interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
}
const PLAYLIST: Track[] = [
  {
    id: '1',
    title: 'Untungnya, Hidup Harus Tetap Berjalan',
    artist: 'Bernadya',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2',
    title: 'Satu Bulan',
    artist: 'Bernadya',
    cover: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=300',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'Kata Mereka Ini Berlebihan',
    artist: 'Bernadya',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
];
export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const track = PLAYLIST[currentTrackIndex];
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  const handleNext = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  }, []);
  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  }, []);
  const onTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 0;
      setCurrentTime(cur);
      setProgress(dur > 0 ? (cur / dur) * 100 : 0);
    }
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current && audioRef.current.duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = Math.max(0, Math.min(pos * audioRef.current.duration, audioRef.current.duration));
    }
  };
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(err => {
        console.warn("Playback prevented:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsPlaying(true);
        document.removeEventListener('click', handleFirstClick);
      }
    };
    document.addEventListener('click', handleFirstClick);
    return () => document.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed bottom-[clamp(8px,2vh,12px)] right-[clamp(8px,2vw,12px)] z-[1000]",
        "w-[clamp(160px,20vw,200px)] max-w-[200px] bg-[#2D1B2E]/95 backdrop-blur-[8px] rounded-[8px]",
        "border border-[#F5E6D3]/10 shadow-[0_2_8px_rgba(0,0,0,0.25)]",
        "p-[8px] transition-all duration-300 transform-gpu",
        "max-md:w-[clamp(140px,70vw,180px)] max-md:bottom-[6px] max-md:right-[6px] max-md:p-1.5"
      )}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 text-[#F5E6D3]/50 hover:text-[#F5E6D3] transition-colors"
        aria-label="Close"
      >
        <X className="size-4" />
      </button>
      <div className="flex flex-col">
        <div className="flex items-center mb-1.5">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="size-8 rounded-[4px] overflow-hidden bg-[#8B1538]/20 flex-shrink-0 mr-1.5 transform-gpu"
          >
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-[clamp(9px,0.9vw,11px)] font-semibold text-[#F5E6D3] leading-tight truncate mb-0.5">
              {track.title}
            </h4>
            <p className="font-sans text-[clamp(8px,0.8vw,9px)] text-[#E8C4A8]/70 truncate">
              {track.artist}
            </p>
          </div>
        </div>
        <div className="relative h-[2px] w-full bg-[#F5E6D3]/20 rounded-[1px] mb-1 cursor-pointer overflow-hidden"
             ref={progressRef}
             onClick={handleSeek}>
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#E8C4A8] to-[#F5E6D3]"
            style={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between items-center font-sans text-[8px] text-[#F5E6D3]/50 mb-1.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-center gap-[clamp(10px,2vw,16px)]">
          <button
            onClick={handlePrev}
            className="p-0.5 text-[#F5E6D3]/70 hover:text-[#F5E6D3] hover:scale-110 transition-all active:scale-95"
            aria-label="Previous"
          >
            <SkipBack className="size-3 fill-current" />
          </button>
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="size-[24px] max-md:size-[22px] rounded-full bg-[#8B1538]/90 text-[#F5E6D3] flex items-center justify-center shadow-[0_1px_4px_rgba(139,21,56,0.3)] transition-all"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="size-3 fill-current" />
            ) : (
              <Play className="size-3 fill-current ml-0.5" />
            )}
          </motion.button>
          <button
            onClick={handleNext}
            className="p-0.5 text-[#F5E6D3]/70 hover:text-[#F5E6D3] hover:scale-110 transition-all active:scale-95"
            aria-label="Next"
          >
            <SkipForward className="size-3 fill-current" />
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
    </motion.div>
  );
}