"use client";

import { useLanguage } from "@/context/LanguageContext";
import StatsGrid from "./StatsGrid";
import { ArrowRight, Map, PlusCircle } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center overflow-hidden py-16">
      {/* Background Map Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMH0ECkHqkEsXHfyZwi3yBsh7o_IOsOCc16WWhPMyG40sPgPOZ139p_OLEH7ojdSYffj_OaBEUHySWwYFcTXJ9Ad7HWtA5ICWA8zSGGAvHskWgm5duRW7y2qou0oqcKDxxrZzkyYUgSugVOH82rR0vQDtV-zIBsNvL3VcOb_yTXTmOxJFK6vJLNSXvNxJGEdglD0-GpjmyDFrrJixr0vXgz6huDmK_0-1aG4NxH78vXgDkTJFSJ2L3')",
        }}
      />
      {/* Dark overlay & Gradient blend */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60 z-10"></div>
      <div className="absolute inset-0 hero-gradient z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-container-padding flex flex-col items-center text-center max-w-4xl mt-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary dark:text-primary-fixed text-xs font-semibold mb-6 tracking-wide uppercase shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>{t("hero_badge")}</span>
        </div>

        <h1 className="font-display-lg text-display-lg text-on-background mb-6 drop-shadow-sm leading-tight font-bold">
          {t("hero_title_1")} <span className="text-primary block sm:inline font-black">{t("hero_title_2")}</span>
        </h1>

        <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-surface-variant/90 max-w-2xl mb-8 leading-relaxed">
          {t("hero_desc")}
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 w-full justify-center max-w-md px-2 sm:px-0">
          <button
            onClick={() => handleScrollTo("interactive-map")}
            className="w-full sm:w-auto bg-primary text-on-primary font-title-md text-xs sm:text-sm py-3.5 px-7 rounded-xl hover:bg-primary-container transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer font-bold"
          >
            <Map className="w-4 h-4" />
            {t("hero_cta_map")}
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => handleScrollTo("citizen-portal")}
            className="w-full sm:w-auto glass-card hover:bg-surface-container-high text-on-surface font-title-md text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all border border-outline-variant/60 flex items-center justify-center gap-2 active:scale-95 cursor-pointer font-semibold"
          >
            <PlusCircle className="w-4 h-4 text-primary" />
            {t("hero_cta_log")}
          </button>
        </div>

        {/* Stats Grid Bento */}
        <StatsGrid />
      </div>
    </section>
  );
}
