import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { AchievementSection } from '@/components/sections/AchievementSection';
import { SpotifySection } from '@/components/sections/SpotifySection';
import { AmiSection } from '@/components/sections/AmiSection';
import { WishSection } from '@/components/sections/WishSection';
export function HomePage() {
  return (
    <main className="snap-container bg-burgundy selection:bg-skyBlue selection:text-burgundy">
      <div className="relative z-10">
        <HeroSection />
        <AchievementSection />
        <SpotifySection />
        <AmiSection />
        <WishSection />
      </div>
      {/* Side Navigation Indicators */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 pointer-events-none hidden md:flex">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-[2px] h-10 bg-white/20 relative">
            <div className="absolute inset-0 bg-white/60 origin-top scale-y-0 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </main>
  );
}