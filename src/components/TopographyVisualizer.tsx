"use client";

import { useState } from "react";
import { Mountain, Compass, Trees, Droplets, Shield, ArrowRight } from "lucide-react";
import { Tag, Progress } from "antd";

interface TopoZone {
  id: string;
  name: string;
  nameAr: string;
  elevation: string;
  canopyPct: number;
  rainfall: string;
  tempRange: string;
  flora: string[];
  description: string;
  color: string;
}

export default function TopographyVisualizer() {
  const [selectedZoneIndex, setSelectedZoneIndex] = useState(1); // Default Green Dam

  const zones: TopoZone[] = [
    {
      id: "tell-atlas",
      name: "Tell Atlas Coastal Chain",
      nameAr: "الأطلس التلي Coastal Zone",
      elevation: "1,200m - 2,308m",
      canopyPct: 38.4,
      rainfall: "800 - 1,200 mm/year",
      tempRange: "12°C - 28°C",
      flora: ["Cork Oak (Quercus suber)", "Zean Oak", "Wild Olive"],
      description: "Moist Mediterranean mountain range featuring dense coastal cork oak biomes and high biodiversity reserves.",
      color: "#10b981",
    },
    {
      id: "green-dam-belt",
      name: "High Plateaus Barrage Vert Belt",
      nameAr: "الهضاب العليا والسد الأخضر",
      elevation: "800m - 1,100m",
      canopyPct: 18.6,
      rainfall: "300 - 450 mm/year",
      tempRange: "4°C - 38°C",
      flora: ["Aleppo Pine (Pinus halepensis)", "Esparto Grass", "Acacia"],
      description: "Strategic 1,500km re-afforestation barrier engineered to arrest Saharan sand dune migration and steppe degradation.",
      color: "#0d631b",
    },
    {
      id: "saharan-atlas",
      name: "Saharan Atlas & Aurès Massif",
      nameAr: "الأطلس الصحراوي والأوراس",
      elevation: "1,400m - 2,328m",
      canopyPct: 24.2,
      rainfall: "400 - 600 mm/year",
      tempRange: "-2°C - 34°C",
      flora: ["Atlas Cedar (Cedrus atlantica)", "Holm Oak", "Juniper"],
      description: "High altitude mountain massifs in Batna & Khenchela preserving ancient endemic Atlas Cedar forests.",
      color: "#f59e0b",
    },
    {
      id: "oasis-fringe",
      name: "Saharan Oasis Fringe & Lowlands",
      nameAr: "واحات الصحراء (Ziban & M'zab)",
      elevation: "80m - 400m",
      canopyPct: 8.2,
      rainfall: "50 - 150 mm/year",
      tempRange: "8°C - 46°C",
      flora: ["Date Palm (Phoenix dactylifera)", "Saharan Cypress", "Tamarix"],
      description: "Arid desert transition margin protected by solar-irrigated date palm oases and drought-tolerant shrub grids.",
      color: "#14b8a6",
    },
  ];

  const currentZone = zones[selectedZoneIndex];

  return (
    <section className="py-20 px-container-padding bg-surface-container-low dark:bg-surface-container-lowest/60 border-b border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs uppercase tracking-wider mb-3 font-semibold">
            <Mountain className="w-3.5 h-3.5" />
            Topographic Elevation Cross-Section
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-3">
            Algerian Environmental Topography & Green Dam Elevation
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            Click points along the elevation profile to inspect how altitude, rainfall, and vegetation canopy change from the Mediterranean coast to the Saharan desert.
          </p>
        </div>

        {/* Interactive Topo Elevation Canvas / SVG Visualizer */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-outline-variant/40 shadow-2xl space-y-6">
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-b from-sky-950/40 via-emerald-950/20 to-black overflow-hidden border border-outline-variant/30 p-4 flex flex-col justify-between">
            {/* Elevation Curve Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="topoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0d631b" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {/* Topo Polygon Area */}
              <polygon
                points="0,300 0,120 250,80 500,160 750,90 1000,240 1000,300"
                fill="url(#topoGrad)"
              />
              <polyline
                points="0,120 250,80 500,160 750,90 1000,240"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="6 2"
              />
            </svg>

            {/* Zone Pin Indicators */}
            <div className="relative z-10 flex justify-between items-end h-full px-4 pb-6">
              {zones.map((zone, idx) => {
                const isSelected = selectedZoneIndex === idx;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneIndex(idx)}
                    className={`flex flex-col items-center gap-1.5 transition-all cursor-pointer group ${
                      isSelected ? "scale-110" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold shadow-md transition-all ${
                        isSelected
                          ? "bg-primary text-on-primary ring-2 ring-primary"
                          : "bg-surface/90 text-on-surface hover:bg-primary/20"
                      }`}
                    >
                      {zone.elevation.split(" - ")[0]}
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-all ${
                        isSelected ? "bg-emerald-500 scale-125 shadow-lg" : "bg-zinc-800"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                    </div>
                    <span className="text-[11px] font-bold text-on-surface font-mono hidden sm:inline">
                      {zone.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Zone Telemetry Card */}
          <div className="glass-card p-6 rounded-2xl border border-primary/30 shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <Tag color="green" className="font-mono text-xs font-bold border-none m-0">
                  Elevation: {currentZone.elevation}
                </Tag>
                <span className="text-xs text-on-surface-variant font-arabic font-semibold">
                  {currentZone.nameAr}
                </span>
              </div>

              <h3 className="font-title-md text-xl font-bold text-on-surface">
                {currentZone.name}
              </h3>

              <p className="text-xs text-on-surface-variant leading-relaxed">
                {currentZone.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-xs font-bold text-on-surface mr-2">Key Native Species:</span>
                {currentZone.flora.map((f) => (
                  <Tag key={f} color="emerald" className="font-mono text-[10px] m-0">
                    {f}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 space-y-3 p-4 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Vegetation Canopy Cover:</span>
                  <span className="font-mono font-bold text-emerald-500">{currentZone.canopyPct}%</span>
                </div>
                <Progress percent={currentZone.canopyPct * 2} strokeColor="#10b981" showInfo={false} size="small" />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30 font-mono">
                <span className="text-on-surface-variant">Annual Rainfall:</span>
                <span className="font-bold text-primary">{currentZone.rainfall}</span>
              </div>

              <div className="flex justify-between items-center font-mono">
                <span className="text-on-surface-variant">Temperature Range:</span>
                <span className="font-bold text-secondary">{currentZone.tempRange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
