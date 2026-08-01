"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Target, ChevronDown, ChevronUp, MapPin, Award, Rocket } from "lucide-react";

interface Milestone {
  year: string;
  phase: string;
  title: string;
  status: "Completed" | "Active" | "Upcoming";
  badgeBg: string;
  description: string;
  keyAchievement: string;
  location: string;
  treesLogged: string;
}

export default function TimelineSection() {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(0);

  const milestones: Milestone[] = [
    {
      year: "2020 - 2021",
      phase: "Pilot Phase",
      title: "Batna Regional Aurès Survey",
      status: "Completed",
      badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
      description:
        "Initial geospatial mapping of the Aurès mountains in Batna province, logging over 500,000 mature Atlas Cedar and Aleppo Pine specimens to establish baseline methodology.",
      keyAchievement: "High-precision LiDAR scan of Aurès Mountain chain & species classification.",
      location: "Batna & Aurès Massif",
      treesLogged: "500,000+ Trees",
    },
    {
      year: "2022 - 2023",
      phase: "High Plateaus Belt",
      title: "Green Dam Citizen Science Launch",
      status: "Completed",
      badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
      description:
        "Deployment of mobile apps expanding data collection across semi-arid zones and involving local environmental communities in the Barrage Vert belt.",
      keyAchievement: "Launched Citizen GIS App with offline field submission & GPS tagging.",
      location: "Biskra, Djelfa, Tiaret & High Plateaus",
      treesLogged: "3.2 Million Trees",
    },
    {
      year: "2024 - 2025",
      phase: "National Infrastructure",
      title: "Full 58 Wilaya AI Integration",
      status: "Active",
      badgeBg: "bg-primary/10 text-primary border-primary/40",
      description:
        "Integration of multispectral Sentinel-2 & Landsat optical imagery with ground-truth logs, providing a unified real-time telemetry dashboard for all 58 Algerian provinces.",
      keyAchievement: "Sentinel-2 Orbit Telemetry AI Integration & 58 Wilaya Dashboard.",
      location: "All 58 Provinces of Algeria",
      treesLogged: "12.4+ Million Trees",
    },
    {
      year: "2026 - 2030",
      phase: "Strategic Horizon",
      title: "Barrage Vert 2.0 & 100M Target",
      status: "Upcoming",
      badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
      description:
        "Re-afforesting 3 million hectares across 13 provinces with automated drone seed-dropping and solar drip irrigation systems to withstand climate desertification.",
      keyAchievement: "Expanded Green Barrier + 100 Million Trees National Canopy Goal.",
      location: "High Plateaus & Saharan Fringe",
      treesLogged: "Goal: 100 Million",
    },
  ];

  return (
    <section id="timeline-section" className="py-24 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
            <Rocket className="w-3.5 h-3.5" />
            National Progress Roadmap
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-4">
            Algeria Green Reforestation Timeline
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-xl mx-auto">
            Tracking our growth from regional pilot surveys in Batna to national GIS infrastructure and the 2030 Barrage Vert 2.0 vision.
          </p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative border-l-2 border-outline-variant/60 ml-4 md:ml-1/2">
          {milestones.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isSelected = activeMilestone === index;

            return (
              <div
                key={item.year}
                className={`mb-12 relative pl-8 md:pl-0 md:w-1/2 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-3 w-5 h-5 rounded-full ring-4 ring-surface dark:ring-surface-container flex items-center justify-center ${
                    item.status === "Completed"
                      ? "bg-emerald-500 text-white"
                      : item.status === "Active"
                      ? "bg-primary text-white animate-pulse"
                      : "bg-amber-500 text-white"
                  } ${
                    isLeft
                      ? "left-[-11px] md:right-[-11px] md:left-auto"
                      : "left-[-11px]"
                  }`}
                >
                  {item.status === "Completed" ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : item.status === "Active" ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <Target className="w-3 h-3" />
                  )}
                </div>

                {/* Card Wrapper */}
                <div
                  onClick={() => setActiveMilestone(isSelected ? null : index)}
                  className={`glass-card glass-card-hover p-6 rounded-2xl cursor-pointer ${
                    isSelected ? "ring-2 ring-primary border-primary scale-[1.01]" : ""
                  }`}
                >
                  <div className={`flex flex-wrap items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${item.badgeBg}`}>
                      {item.year} • {item.phase}
                    </span>
                    <span className="text-xs font-mono font-bold text-primary">
                      {item.treesLogged}
                    </span>
                  </div>

                  <h3 className="font-title-md text-lg text-on-background font-bold mb-2">
                    {item.title}
                  </h3>

                  <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expanded Milestone Details */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-outline-variant/40 animate-fadeIn text-xs text-on-surface space-y-2">
                      <div className={`flex items-center gap-1.5 font-semibold text-primary ${isLeft ? "md:justify-end" : ""}`}>
                        <Award className="w-3.5 h-3.5" />
                        Milestone: {item.keyAchievement}
                      </div>
                      <div className={`text-on-surface-variant font-mono flex items-center gap-1 ${isLeft ? "md:justify-end" : ""}`}>
                        <MapPin className="w-3.5 h-3.5 text-secondary" /> Focus: {item.location}
                      </div>
                    </div>
                  )}

                  <div className={`mt-3 text-[11px] text-primary hover:underline flex items-center gap-1 font-medium ${isLeft ? "md:justify-end" : ""}`}>
                    <span>{isSelected ? "Collapse Details" : "Click to view phase milestone details"}</span>
                    {isSelected ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

