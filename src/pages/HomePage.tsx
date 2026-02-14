import React from 'react';
import { motion } from 'framer-motion';
import { ArtistHero } from '@/components/sections/ArtistHero';
import { ArtistAbout } from '@/components/sections/ArtistAbout';
import { ArtistDiscography } from '@/components/sections/ArtistDiscography';
import { ArtistAchievements } from '@/components/sections/ArtistAchievements';
import { ArtistConnect } from '@/components/sections/ArtistConnect';
export function HomePage() {
  return (
    <main className="snap-container bg-priPurple selection:bg-ltPurple selection:text-cream">
      {/* Cinematic Linear Journey */}
      <div className="relative z-10">
        <ArtistHero />
        <ArtistAbout />
        <ArtistDiscography />
        <ArtistAchievements />
        <ArtistConnect />
      </div>
      {/* Subtle Side Navigation - Vertical Line */}
      <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 pointer-events-none hidden md:flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-[1px] h-8 bg-cream/20" />
        ))}
      </div>
    </main>
  );
}