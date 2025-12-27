"use client";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SponsorsSection from "./components/SponsorsSection";
import StatsSection from "./components/StatsSection";
import FAQSection from "./components/FAQSection";

export default function Home() {
  return (
    <div className="LandingPage">
      <HeroSection />
      
      {/* Spacer for scrolling */}
      <div style={{ 
        height: '100vh', 
        position: 'relative', 
        zIndex: 100,
        background: 'linear-gradient(to bottom, transparent 0%, transparent 70%, #0a0a1a 100%)'
      }}></div>
      <StatsSection />
      {/* Scrollable Content Section */}
      <AboutSection />

      <FAQSection />

      <SponsorsSection />
    </div>
  );
}
