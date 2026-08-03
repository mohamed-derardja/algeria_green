import TopNavBar from "@/components/TopNavBar";
import TelemetryTicker from "@/components/TelemetryTicker";
import HeroSection from "@/components/HeroSection";
import InteractiveMapSection from "@/components/InteractiveMapSection";
import SatelliteTimeLapse from "@/components/SatelliteTimeLapse";
import AISpeciesScanner from "@/components/AISpeciesScanner";
import WeatherWidget from "@/components/WeatherWidget";
import EcoZoneQuiz from "@/components/EcoZoneQuiz";
import InitiativesGrid from "@/components/InitiativesGrid";
import ProvincesSection from "@/components/ProvincesSection";
import CitizenScienceCTA from "@/components/CitizenScienceCTA";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";
import AmbientSoundscapeWidget from "@/components/AmbientSoundscapeWidget";
import TopographyVisualizer from "@/components/TopographyVisualizer";
import HerbariumShowcase from "@/components/HerbariumShowcase";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollProgressFAB from "@/components/ScrollProgressFAB";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/20 selection:text-primary">
      {/* Fixed Navigation Header with Multilingual Switcher */}
      <TopNavBar />

      {/* Main Page Content */}
      <main className="pt-16 flex-1 w-full scroll-snap-container">
        {/* Live Sentinel-2 Satellite Orbit Telemetry Ticker */}
        <TelemetryTicker />

        {/* 1. Hero Section with satellite backdrop & Bento stats */}
        <ScrollReveal direction="fade" duration={900}>
          <div className="scroll-snap-section">
            <HeroSection />
          </div>
        </ScrollReveal>

        {/* Live Environmental Telemetry & Quiz Grid */}
        <ScrollReveal direction="up" delay={100}>
          <section className="scroll-snap-section py-12 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
            <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <WeatherWidget />
              </div>
              <div className="lg:col-span-5">
                <EcoZoneQuiz />
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* 2. Live Interactive Satellite GIS Map & Heatmap */}
        <ScrollReveal direction="up" delay={50}>
          <div className="scroll-snap-section">
            <InteractiveMapSection />
          </div>
        </ScrollReveal>

        {/* Topographic Elevation & Green Dam Visualizer */}
        <ScrollReveal direction="left" delay={100}>
          <div className="scroll-snap-section">
            <TopographyVisualizer />
          </div>
        </ScrollReveal>

        {/* 3. 16-Year Satellite Time-Lapse Comparison Slider (2010 vs 2026) */}
        <ScrollReveal direction="up" delay={50}>
          <div className="scroll-snap-section">
            <SatelliteTimeLapse />
          </div>
        </ScrollReveal>

        {/* 4. AI Computer Vision Species Recognition & Health Diagnostic Scanner */}
        <ScrollReveal direction="right" delay={100}>
          <div className="scroll-snap-section">
            <AISpeciesScanner />
          </div>
        </ScrollReveal>

        {/* 3D Herbarium Botanical Collection */}
        <ScrollReveal direction="up" delay={150}>
          <div className="scroll-snap-section">
            <HerbariumShowcase />
          </div>
        </ScrollReveal>

        {/* 5. National Initiatives & Environmental Pillars */}
        <ScrollReveal direction="up" delay={50}>
          <div className="scroll-snap-section">
            <InitiativesGrid />
          </div>
        </ScrollReveal>

        {/* 6. 58 Algerian Provinces GIS Explorer & Wilaya Detail Drawer */}
        <ScrollReveal direction="up" delay={100}>
          <div className="scroll-snap-section">
            <ProvincesSection />
          </div>
        </ScrollReveal>

        {/* 7. Citizen Science Tree Specimen Logging & Adoption Certificate CTA */}
        <ScrollReveal direction="up" delay={50}>
          <div className="scroll-snap-section">
            <CitizenScienceCTA />
          </div>
        </ScrollReveal>

        {/* 8. Reforestation Progress Roadmap Timeline */}
        <ScrollReveal direction="up" delay={100}>
          <div className="scroll-snap-section">
            <TimelineSection />
          </div>
        </ScrollReveal>
      </main>

      {/* Ambient Forest Soundscapes Widget */}
      <AmbientSoundscapeWidget />

      {/* Floating Scroll Progress & Back-to-Top FAB */}
      <ScrollProgressFAB />

      {/* Footer */}
      <Footer />
    </div>
  );
}
