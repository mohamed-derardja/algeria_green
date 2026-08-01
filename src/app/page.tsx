import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import InteractiveMapSection from "@/components/InteractiveMapSection";
import SatelliteTimeLapse from "@/components/SatelliteTimeLapse";
import AISpeciesScanner from "@/components/AISpeciesScanner";
import InitiativesGrid from "@/components/InitiativesGrid";
import ProvincesSection from "@/components/ProvincesSection";
import CitizenScienceCTA from "@/components/CitizenScienceCTA";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/20 selection:text-primary">
      {/* Fixed Navigation Header with Multilingual Switcher */}
      <TopNavBar />

      {/* Main Page Content */}
      <main className="pt-16 flex-1 w-full">
        {/* 1. Hero Section with satellite backdrop & Bento stats */}
        <HeroSection />

        {/* 2. Live Interactive Satellite GIS Map & Heatmap */}
        <InteractiveMapSection />

        {/* 3. 16-Year Satellite Time-Lapse Comparison Slider (2010 vs 2026) */}
        <SatelliteTimeLapse />

        {/* 4. AI Computer Vision Species Recognition & Health Diagnostic Scanner */}
        <AISpeciesScanner />

        {/* 5. National Initiatives & Environmental Pillars */}
        <InitiativesGrid />

        {/* 6. 58 Algerian Provinces GIS Explorer & Wilaya Detail Drawer */}
        <ProvincesSection />

        {/* 7. Citizen Science Tree Specimen Logging & Adoption Certificate CTA */}
        <CitizenScienceCTA />

        {/* 8. Reforestation Progress Roadmap Timeline */}
        <TimelineSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
