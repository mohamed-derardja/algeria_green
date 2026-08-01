import TopNavBar from "@/components/TopNavBar";
import HeroSection from "@/components/HeroSection";
import ProvincesSection from "@/components/ProvincesSection";
import TimelineSection from "@/components/TimelineSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background">
      {/* Top Fixed Navigation Bar */}
      <TopNavBar />

      {/* Main Page Body */}
      <main className="pt-16 flex-1 w-full">
        {/* Hero Section with satellite map background and Bento Stats */}
        <HeroSection />

        {/* Provinces GIS Explorer */}
        <ProvincesSection />

        {/* Project Expansion Timeline */}
        <TimelineSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
