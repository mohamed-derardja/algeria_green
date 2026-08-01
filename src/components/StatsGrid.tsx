"use client";

import { useState } from "react";

interface StatItem {
  id: string;
  value: string;
  label: string;
  textColorClass: string;
  colSpanClass?: string;
  description: string;
  trend: string;
}

export default function StatsGrid() {
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);

  const stats: StatItem[] = [
    {
      id: "trees",
      value: "12M+",
      label: "Trees Logged",
      textColorClass: "text-primary dark:text-primary-fixed",
      description: "Over 12,450,000 verified tree specimens recorded using ground surveys and high-res satellite telemetry.",
      trend: "+15% YoY Growth",
    },
    {
      id: "coverage",
      value: "14%",
      label: "Forest Coverage",
      textColorClass: "text-secondary dark:text-secondary-fixed-dim",
      description: "Targeting 20% national coverage by 2030 through the Green Dam revitalization project.",
      trend: "Goal: 20% by 2030",
    },
    {
      id: "lands",
      value: "45k",
      label: "Surveyed Lands",
      textColorClass: "text-tertiary dark:text-tertiary-fixed-dim",
      colSpanClass: "md:col-span-1 col-span-2",
      description: "45,000 hectares of diverse ecosystems continuously monitored via Sentinel-2 and Landsat satellite constellations.",
      trend: "Real-time Telemetry",
    },
    {
      id: "volunteers",
      value: "5k",
      label: "Volunteers",
      textColorClass: "text-primary-container dark:text-on-primary-container",
      description: "Active community participants submitting field observations via the mobile Citizen Science App.",
      trend: "58 Wilayas Active",
    },
    {
      id: "provinces",
      value: "58",
      label: "Provinces",
      textColorClass: "text-secondary-container dark:text-secondary-fixed",
      description: "Complete national coverage across all 58 Algerian provinces from coastal forests to Saharan oases.",
      trend: "100% Regional Reach",
    },
  ];

  return (
    <div className="w-full mt-8">
      {/* Stats Grid (Bento style) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-widget-gap">
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => setSelectedStat(selectedStat?.id === stat.id ? null : stat)}
            className={`glass-card rounded-xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              stat.colSpanClass || ""
            } ${selectedStat?.id === stat.id ? "ring-2 ring-primary scale-[1.02]" : ""}`}
          >
            <span className={`font-data-numeral text-display-lg ${stat.textColorClass} transition-transform`}>
              {stat.value}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1 tracking-wider">
              {stat.label}
            </span>
            <span className="mt-2 text-[10px] bg-primary/10 dark:bg-primary-fixed/20 text-primary dark:text-primary-fixed font-mono px-2 py-0.5 rounded-full">
              {stat.trend}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Stat Modal / Detail Panel */}
      {selectedStat && (
        <div className="mt-6 p-4 glass-card rounded-xl border border-primary/30 animate-fadeIn text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <h4 className="font-title-md text-primary dark:text-primary-fixed">
                {selectedStat.label}: <span className="font-mono font-bold">{selectedStat.value}</span>
              </h4>
            </div>
            <p className="font-body-md text-sm text-on-surface-variant mt-1">
              {selectedStat.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedStat(null)}
            className="text-xs bg-surface-container-high hover:bg-outline-variant text-on-surface px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}
