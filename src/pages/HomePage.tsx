import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrisaktiSection } from '@/components/sections/TrisaktiSection';
import { RankSection } from '@/components/sections/RankSection';
import { FirstOnMindSection } from '@/components/sections/FirstOnMindSection';
import { FinalWishesSection } from '@/components/sections/FinalWishesSection';
/**
 * HomePage orchestrates the full-page cinematic storytelling experience.
 * It uses a snap-container for mandatory vertical scrolling between sections.
 */
export function HomePage() {
  return (
    <main className="snap-container bg-black">
      {/* Cinematic Linear Journey */}
      <HeroSection />
      <TrisaktiSection />
      <RankSection />
      <FirstOnMindSection />
      <FinalWishesSection />
      {/* Persistent Brand/Logo Overlay */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none select-none">
        <span className="font-logo text-2xl text-white/30 mix-blend-difference tracking-wider">
          EIGHTEEN
        </span>
      </div>
    </main>
  );
}