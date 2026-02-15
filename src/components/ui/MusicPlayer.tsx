import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, X } from 'lucide-react';
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
  const [volume, setVolume] = useState(0.7);
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
  const onAudioError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    console.error("Audio Load Error:", e);
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
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  if (!isVisible) return null;
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.4, 0.2, 0.1, 1] }}
      className={cn(
        "fixed bottom-[clamp(20px,3vh,40px)] right-[clamp(20px,3vw,40px)] z-[1000]",
        "w-[clamp(280px,32vw,340px)] bg-[#2D1B2E]/95 backdrop-blur-[12px] rounded-[20px]",
        "border border-[#F5E6D3]/15 shadow-[0_12px_48px_rgba(0,0,0,0.4)]",
        "p-5 transition-all duration-300",
        "max-md:w-[90vw] max-md:bottom-[20px] max-md:right-[5vw] max-md:p-4"
      )}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-3 right-3 p-1.5 text-[#F5E6D3]/40 hover:text-[#F5E6D3] hover:bg-white/5 rounded-full transition-all"
        aria-label="Close player"
      >
        <X className="size-4" />
      </button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : {}}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="size-16 rounded-[14px] overflow-hidden shadow-lg bg-burgundy/20 flex-shrink-0"
          >
            <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <span className="block font-sans text-[10px] font-bold text-[#E8C4A8]/60 tracking-[0.15em] uppercase mb-1">
              NOW PLAYING
            </span>
            <h4 className="font-display text-[15px] font-semibold text-[#F5E6D3] leading-tight truncate mb-1">
              {track.title}
            </h4>
            <p className="font-sans text-[12px] text-[#E8C4A8]/80 truncate">
              {track.artist}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div
            ref={progressRef}
            onClick={handleSeek}
            className="relative h-2 w-full bg-[#F5E6D3]/10 rounded-full cursor-pointer overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-burgundy via-[#E8C4A8] to-[#F5E6D3]"
              style={{ width: `${progress}%` }}
              transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between items-center font-mono text-[10px] text-[#F5E6D3]/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="text-[#F5E6D3]/60 hover:text-[#F5E6D3] hover:scale-110 transition-all active:scale-90"
            aria-label="Previous track"
          >
            <SkipBack className="size-5 fill-current" />
          </button>
          <motion.button
            onClick={togglePlay}
            animate={!isPlaying && isVisible ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="size-12 rounded-full bg-burgundy text-[#F5E6D3] flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <AnimatePresence mode="wait">
              {isPlaying ? (
                <motion.div
                  key="pause"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Pause className="size-5 fill-current" />
                </motion.div>
              ) : (
                <motion.div
                  key="play"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Play className="size-5 fill-current ml-1" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <button
            onClick={handleNext}
            className="text-[#F5E6D3]/60 hover:text-[#F5E6D3] hover:scale-110 transition-all active:scale-90"
            aria-label="Next track"
          >
            <SkipForward className="size-5 fill-current" />
          </button>
        </div>
        <div className="flex items-center gap-3 px-1">
          <Volume2 className="size-3.5 text-[#F5E6D3]/30" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full h-[3px] bg-white/10 rounded-full appearance-none cursor-pointer accent-[#E8C4A8] hover:accent-white transition-all"
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={track.src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
        onError={onAudioError}
      />
    </motion.div>
  );
}