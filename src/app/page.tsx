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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/20 selection:text-primary">
      {/* Fixed Navigation Header with Multilingual Switcher */}
      <TopNavBar />

      {/* Main Page Content */}
      <main className="pt-16 flex-1 w-full">
        {/* Live Sentinel-2 Satellite Orbit Telemetry Ticker */}
        <TelemetryTicker />

        {/* 1. Hero Section with satellite backdrop & Bento stats */}
        <HeroSection />

        {/* Live Environmental Telemetry & Quiz Grid */}
        <section className="py-12 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
          <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <WeatherWidget />
            </div>
            <div className="lg:col-span-5">
              <EcoZoneQuiz />
            </div>
          </div>
        </section>

        {/* 2. Live Interactive Satellite GIS Map & Heatmap */}
        <InteractiveMapSection />

        {/* Topographic Elevation & Green Dam Visualizer */}
        <TopographyVisualizer />

        {/* 3. 16-Year Satellite Time-Lapse Comparison Slider (2010 vs 2026) */}
        <SatelliteTimeLapse />

        {/* 4. AI Computer Vision Species Recognition & Health Diagnostic Scanner */}
        <AISpeciesScanner />

        {/* 3D Herbarium Botanical Collection */}
        <HerbariumShowcase />

        {/* 5. National Initiatives & Environmental Pillars */}
        <InitiativesGrid />

        {/* 6. 58 Algerian Provinces GIS Explorer & Wilaya Detail Drawer */}
        <ProvincesSection />

        {/* 7. Citizen Science Tree Specimen Logging & Adoption Certificate CTA */}
        <CitizenScienceCTA />

        {/* 8. Reforestation Progress Roadmap Timeline */}
        <TimelineSection />
      </main>

      {/* Ambient Forest Soundscapes Widget */}
      <AmbientSoundscapeWidget />

      {/* Footer */}
      <Footer />
    </div>
  );
}
