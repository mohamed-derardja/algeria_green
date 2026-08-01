import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import InteractiveMapSection from "@/components/InteractiveMapSection";
import InitiativesGrid from "@/components/InitiativesGrid";
import ProvincesSection from "@/components/ProvincesSection";
import CitizenScienceCTA from "@/components/CitizenScienceCTA";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/20 selection:text-primary">
      {/* Fixed Navigation Header */}
      <TopNavBar />

      {/* Main Page Content */}
      <main className="pt-16 flex-1 w-full">
        {/* 1. Hero Section with satellite backdrop & Bento stats */}
        <HeroSection />

        {/* 2. Live Interactive Satellite GIS Map & Heatmap */}
        <InteractiveMapSection />

        {/* 3. National Initiatives & Environmental Pillars */}
        <InitiativesGrid />

        {/* 4. 58 Algerian Provinces GIS Explorer & Wilaya Detail Drawer */}
        <ProvincesSection />

        {/* 5. Citizen Science Tree Specimen Logging CTA */}
        <CitizenScienceCTA />

        {/* 6. Reforestation Progress Roadmap Timeline */}
        <TimelineSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
