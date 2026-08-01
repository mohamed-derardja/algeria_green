"use client";

import { useState } from "react";
import { Trees, Shield, MapPin, Users, Globe, X, TrendingUp } from "lucide-react";

interface StatItem {
  id: string;
  value: string;
  label: string;
  textColorClass: string;
  icon: any;
  colSpanClass?: string;
  description: string;
  trend: string;
}

export default function StatsGrid() {
  const [selectedStat, setSelectedStat] = useState<StatItem | null>(null);

  const stats: StatItem[] = [
    {
      id: "trees",
      value: "12.4M+",
      label: "Trees Logged",
      textColorClass: "text-primary dark:text-primary-fixed",
      icon: Trees,
      description: "Over 12,450,000 verified tree specimens recorded using ground surveys and high-res satellite telemetry.",
      trend: "+15% YoY Growth",
    },
    {
      id: "coverage",
      value: "14%",
      label: "Forest Canopy",
      textColorClass: "text-secondary dark:text-secondary-fixed-dim",
      icon: Shield,
      description: "Targeting 20% national coverage by 2030 through the Green Dam revitalization project.",
      trend: "Goal: 20% by 2030",
    },
    {
      id: "lands",
      value: "45k",
      label: "Hectares Mapped",
      textColorClass: "text-tertiary dark:text-tertiary-fixed-dim",
      icon: MapPin,
      colSpanClass: "md:col-span-1 col-span-2",
      description: "45,000 hectares of diverse ecosystems continuously monitored via Sentinel-2 and Landsat satellite constellations.",
      trend: "Real-time Telemetry",
    },
    {
      id: "volunteers",
      value: "5.2k",
      label: "Volunteers",
      textColorClass: "text-primary-container dark:text-on-primary-container",
      icon: Users,
      description: "Active community participants submitting field observations via the mobile Citizen Science App.",
      trend: "58 Wilayas Active",
    },
    {
      id: "provinces",
      value: "58",
      label: "Wilayas",
      textColorClass: "text-secondary-container dark:text-secondary-fixed",
      icon: Globe,
      description: "Complete national coverage across all 58 Algerian provinces from coastal forests to Saharan oases.",
      trend: "100% Regional Reach",
    },
  ];

  return (
    <div className="w-full mt-8">
      {/* Stats Grid (Bento style) */}
      <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          const isSelected = selectedStat?.id === stat.id;
          return (
            <div
              key={stat.id}
              onClick={() => setSelectedStat(isSelected ? null : stat)}
              className={`glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden ${
                stat.colSpanClass || ""
              } ${isSelected ? "ring-2 ring-primary border-primary scale-[1.02] shadow-xl" : ""}`}
            >
              <div className="flex items-center gap-1.5 mb-1 text-on-surface-variant">
                <IconComponent className="w-4 h-4 text-primary" />
                <span className="font-label-sm text-[11px] uppercase tracking-wider font-semibold">
                  {stat.label}
                </span>
              </div>

              <span className={`font-mono text-2xl sm:text-3xl font-bold ${stat.textColorClass} my-1`}>
                {stat.value}
              </span>

              <span className="inline-flex items-center gap-1 text-[10px] bg-primary/10 dark:bg-primary-fixed/20 text-primary dark:text-primary-fixed font-mono px-2 py-0.5 rounded-full font-medium">
                <TrendingUp className="w-2.5 h-2.5" />
                {stat.trend}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Stat Detail Panel */}
      {selectedStat && (
        <div className="mt-4 p-4 glass-card rounded-2xl border border-primary/40 animate-fadeIn text-left flex flex-col sm:flex-row justify-between items-center gap-4 shadow-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
              <h4 className="font-title-md text-sm text-primary dark:text-primary-fixed font-bold">
                {selectedStat.label}: <span className="font-mono font-bold">{selectedStat.value}</span>
              </h4>
            </div>
            <p className="font-body-md text-xs text-on-surface-variant mt-1 leading-relaxed">
              {selectedStat.description}
            </p>
          </div>
          
          <button
            onClick={() => setSelectedStat(null)}
            className="text-xs bg-surface-container-high hover:bg-outline-variant text-on-surface px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> Close Details
          </button>
        </div>
      )}
    </div>
  );
}
