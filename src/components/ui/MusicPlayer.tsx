import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, X, Music } from 'lucide-react';
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
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Placeholder
  },
  {
    id: '2',
    title: 'Satu Bulan',
    artist: 'Bernadya',
    cover: 'https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=300',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' // Placeholder
  },
  {
    id: '3',
    title: 'Kata Mereka Ini Berlebihan',
    artist: 'Bernadya',
    cover: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=300',
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' // Placeholder
  }
];
export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isVisible, setIsVisible] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const track = PLAYLIST[currentTrackIndex];
  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error("Playback failed", e));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
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
      const dur = audioRef.current.duration;
      setCurrentTime(cur);
      setProgress((cur / dur) * 100);
    }
  };
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * audioRef.current.duration;
    }
  };
  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  // Auto-play on first click anywhere in the document
  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
        document.removeEventListener('click', handleFirstClick);
      }
    };
    document.addEventListener('click', handleFirstClick);
    return () => document.removeEventListener('click', handleFirstClick);
  }, [hasInteracted]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  // Handle source changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex]);
  if (!isVisible) return null;
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.4, 0.2, 0.1, 1] }}
      className={cn(
        "fixed bottom-[clamp(20px,3vh,30px)] right-[clamp(20px,3vw,30px)] z-[1000]",
        "w-[clamp(280px,30vw,320px)] bg-[#2D1B2E]/95 backdrop-blur-[10px] rounded-[16px]",
        "border border-[#F5E6D3]/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "p-[clamp(16px,2vw,20px)] transition-all duration-300",
        "max-md:w-[clamp(240px,80vw,280px)] max-md:bottom-[15px] max-md:right-[15px] max-md:p-3"
      )}
    >
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 text-[#F5E6D3]/50 hover:text-[#F5E6D3] transition-colors"
      >
        <X className="size-4" />
      </button>
      <div className="flex flex-col gap-3">
        {/* Album Art & Info */}
        <div className="flex items-center gap-4">
          <motion.div 
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="size-[clamp(50px,6vw,64px)] rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.2)] bg-burgundy/20 flex-shrink-0"
          >
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <span className="block font-sans text-[9px] font-semibold text-[#E8C4A8]/60 tracking-[0.1em] uppercase mb-1">
              NOW PLAYING
            </span>
            <h4 className="font-display text-[clamp(14px,1.5vw,15px)] font-semibold text-[#F5E6D3] leading-[1.3] truncate mb-0.5">
              {track.title}
            </h4>
            <p className="font-sans text-[clamp(11px,1.2vw,12px)] text-[#E8C4A8]/80 truncate">
              {track.artist}
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="space-y-1.5 mt-1">
          <div 
            ref={progressRef}
            onClick={handleSeek}
            className="relative h-1 w-full bg-[#F5E6D3]/20 rounded-full cursor-pointer overflow-hidden group"
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#E8C4A8] to-[#F5E6D3]"
              style={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between items-center font-sans text-[10px] text-[#F5E6D3]/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-1">
          <button 
            onClick={handlePrev}
            className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] hover:scale-110 transition-all duration-300"
          >
            <SkipBack className="size-5 fill-current" />
          </button>
          <button 
            onClick={togglePlay}
            className="size-11 rounded-full bg-burgundy/90 text-[#F5E6D3] flex items-center justify-center shadow-[0_4px_12px_rgba(139,21,56,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 group"
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Pause className="size-5 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                >
                  <Play className="size-5 fill-current ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <button 
            onClick={handleNext}
            className="text-[#F5E6D3]/70 hover:text-[#F5E6D3] hover:scale-110 transition-all duration-300"
          >
            <SkipForward className="size-5 fill-current" />
          </button>
        </div>
        {/* Volume */}
        <div className="flex items-center gap-3 mt-1 group">
          <Volume2 className="size-3.5 text-[#F5E6D3]/40 group-hover:text-[#F5E6D3]/70 transition-colors" />
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-[3px] bg-[#F5E6D3]/20 rounded-full appearance-none cursor-pointer accent-[#E8C4A8] hover:accent-[#F5E6D3] transition-all"
          />
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