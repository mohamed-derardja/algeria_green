"use client";

import { useState } from "react";
import StatsGrid from "./StatsGrid";

export default function HeroSection() {
  const [isExploring, setIsExploring] = useState(false);

  const handleExploreClick = () => {
    setIsExploring(true);
    const timelineElement = document.getElementById("timeline-section");
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-12">
      {/* Background Map Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMH0ECkHqkEsXHfyZwi3yBsh7o_IOsOCc16WWhPMyG40sPgPOZ139p_OLEH7ojdSYffj_OaBEUHySWwYFcTXJ9Ad7HWtA5ICWA8zSGGAvHskWgm5duRW7y2qou0oqcKDxxrZzkyYUgSugVOH82rR0vQDtV-zIBsNvL3VcOb_yTXTmOxJFK6vJLNSXvNxJGEdglD0-GpjmyDFrrJixr0vXgz6huDmK_0-1aG4NxH78vXgDkTJFSJ2L3')",
        }}
      />
      {/* Dark overlay & Gradient blend */}
      <div className="absolute inset-0 bg-black/25 dark:bg-black/55 z-10"></div>
      <div className="absolute inset-0 hero-gradient z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-container-padding flex flex-col items-center text-center max-w-4xl mt-12">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary dark:text-primary-fixed text-xs font-semibold mb-4 tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Algeria National GIS Portal
        </span>

        <h1 className="font-display-lg text-display-lg text-on-background mb-6 drop-shadow-sm leading-tight">
          National Vegetation &amp; Tree Mapping Platform
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/90 max-w-2xl mb-8 leading-relaxed">
          Empowering policymakers, researchers, and citizens with real-time geospatial data to monitor and expand Algeria&apos;s green infrastructure.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={handleExploreClick}
            className="bg-primary text-on-primary font-title-md text-title-md py-3.5 px-7 rounded-xl hover:bg-primary-container transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
          >
            Explore Algeria&apos;s Vegetation
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 0" }}
            >
              arrow_forward
            </span>
          </button>
        </div>

        {/* Stats Grid Bento */}
        <StatsGrid />
      </div>
    </section>
  );
}
