"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Calendar, ArrowLeftRight } from "lucide-react";

export default function SatelliteTimeLapse() {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeLocation, setActiveLocation] = useState<"greendam" | "aures">("greendam");

  const locationData = {
    greendam: {
      title: "Barrage Vert (Djelfa - High Plateaus Belt)",
      stats: "+142% Canopy Recovery",
      desc: "Drag the slider to observe 16 years of aggressive pine & esparto planting halting Saharan sand dune migration.",
      // High-resolution real satellite imagery - Djelfa Barrage Vert
      img2010: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMH0ECkHqkEsXHfyZwi3yBsh7o_IOsOCc16WWhPMyG40sPgPOZ139p_OLEH7ojdSYffj_OaBEUHySWwYFcTXJ9Ad7HWtA5ICWA8zSGGAvHskWgm5duRW7y2qou0oqcKDxxrZzkyYUgSugVOH82rR0vQDtV-zIBsNvL3VcOb_yTXTmOxJFK6vJLNSXvNxJGEdglD0-GpjmyDFrrJixr0vXgz6huDmK_0-1aG4NxH78vXgDkTJFSJ2L3",
      img2026: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK3yMIhfOIb34gt1p30d-Wh6wGcUUJPDmtZ46KNoqM5nJgDhYyd5V0mHBuJuOffsWaSt-s4O0YFfxjJZiEPo7kXXwP-W7VejokvO_Du_kZU7jKucQWbLZ6vvaWu1jbAkhjoc70DyPtYMN7S72BICh48Ts9rexwqxBPzWQCF9i0e2I4hC7FYJiJ0JH91J45a4yXr6A3WPsE9zwPN61iwir6xyKXSkn5dGEIlPjGcqMkwfQbRoXZOdUZ",
    },
    aures: {
      title: "Aurès Mountain Massif (Batna Province)",
      stats: "+88% Protected Cedar Density",
      desc: "Comparing Landsat-5 historical satellite bands with Sentinel-2 multispectral high-resolution imagery over Batna Aurès Cedar forests.",
      // High-resolution real satellite imagery - Batna Aurès Cedar
      img2010: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB2LTQX6SBomOQ2sIRZqTN7JKL1ljiHIrTvRaSs8hlR-E7caJA6inpasUkcVzuY9AT2fWEX_tOgCL_a_KJjd6-XE6rxSES2PZiuvDTYAiERaqk8Qn3eD_zTCn_5WRLWWW1MxTgBVAOIG212EmpGNUUN2cCT8e1BQDPIUHg0LqHvfy37mW9savR6vpmy_ZK-icY6L2RGHx0NjLPV4uN0PLAHul4VS2ZhAUcvLEaydC01dYXrWHz4c-o",
      img2026: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYEVJaROsbNd7wCNM3d-Jf4-lZCYfAd29ba5dclY1G_aP6Eu7nC7uTSZ7SV0ZYx3zlCrO5nACG0sWxPuAEFBPzMOTt95la9FUa4P1oHztIO-9wFLNnx5rxGACw4YBSOWoMVvCiXvwMuf9ljv9I1i19-WKd63ahMrrTiTw4__bBUk0nK1Dd4SLD2mZGV6Cq3ek5bC7Q8Dp29-mMlO2SiJtn96k3RWuKUpgevcif02CseGZ865xq7l8H",
    },
  };

  const currentData = locationData[activeLocation];

  return (
    <section id="timelapse" className="py-20 px-container-padding bg-surface-container-low dark:bg-surface-container-lowest/70 border-b border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed text-xs font-semibold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5" />
              {t("timelapse_badge")}
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight">
              {t("timelapse_title")}
            </h2>
            <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
              {t("timelapse_desc")}
            </p>
          </div>

          {/* Location Switcher */}
          <div className="glass-card p-1.5 rounded-2xl flex gap-1 border border-outline-variant/40">
            <button
              onClick={() => setActiveLocation("greendam")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLocation === "greendam"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Barrage Vert (Djelfa)
            </button>
            <button
              onClick={() => setActiveLocation("aures")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLocation === "aures"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Aurès Cedar (Batna)
            </button>
          </div>
        </div>

        {/* Split-Screen Slider Canvas with clipPath */}
        <div className="glass-card rounded-3xl p-6 border border-outline-variant/40 shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-surface-container-high text-on-surface font-bold">
                {currentData.title}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
              {currentData.stats}
            </span>
          </div>

          {/* Image Comparison Container */}
          <div className="relative w-full h-[420px] rounded-2xl overflow-hidden select-none border border-outline-variant/30 bg-black">
            {/* 2026 Present Sentinel-2 Imagery (Base Layer) */}
            <img
              src={currentData.img2026}
              alt="2026 Present Sentinel-2 Satellite View"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-primary text-on-primary font-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Sentinel-2 Active
            </div>

            {/* 2010 Past Landsat-5 Imagery (Clipped Layer using CSS clipPath) */}
            <div
              className="absolute inset-0 overflow-hidden z-10"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img
                src={currentData.img2010}
                alt="2010 Historical Landsat-5 Satellite View"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-surface-container-highest text-on-surface font-mono text-xs font-bold px-3 py-1.5 rounded-full shadow-md z-10">
                📷 2010 Landsat-5 Baseline
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(0,0,0,0.9)]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary text-on-primary shadow-2xl border-2 border-white flex items-center justify-center cursor-ew-resize">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Native HTML Range Input Overlay for Dragging */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>

          <p className="text-xs text-on-surface-variant text-center mt-4 font-medium">
            💡 {currentData.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
