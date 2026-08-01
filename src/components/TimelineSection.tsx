"use client";

import { useState } from "react";

interface Milestone {
  year: string;
  phase: string;
  title: string;
  colorClass: string;
  badgeBg: string;
  description: string;
  keyAchievement: string;
  location: string;
  treesLogged: string;
}

export default function TimelineSection() {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

  const milestones: Milestone[] = [
    {
      year: "2020",
      phase: "Pilot Phase",
      title: "Batna Regional Survey",
      colorClass: "bg-primary text-primary",
      badgeBg: "bg-primary/10 text-primary border-primary/30",
      description:
        "Initial geospatial mapping of the Aurès mountains in Batna province, logging over 500,000 mature Cedar and Aleppo Pine specimens to establish baseline methodology.",
      keyAchievement: "High-precision LiDAR scan of Aurès Mountain chain & species classification.",
      location: "Batna & Aurès Massif",
      treesLogged: "500,000+ Trees",
    },
    {
      year: "2022",
      phase: "Expansion",
      title: "High Plateaus Integration",
      colorClass: "bg-secondary text-secondary",
      badgeBg: "bg-secondary/10 text-secondary border-secondary/30",
      description:
        "Deployment of citizen science mobile apps, expanding data collection across semi-arid zones and involving local environmental communities in the Green Dam belt.",
      keyAchievement: "Launched Citizen GIS App with offline field submission & GPS tagging.",
      location: "Biskra, Djelfa, Tiaret & High Plateaus",
      treesLogged: "3.2 Million Trees",
    },
    {
      year: "2024",
      phase: "National Rollout",
      title: "Full Platform Launch",
      colorClass: "bg-tertiary text-tertiary",
      badgeBg: "bg-tertiary/10 text-tertiary border-tertiary/30",
      description:
        "Integration of multispectral satellite AI imagery with ground-truth logs, providing a unified real-time dashboard for all 58 Algerian provinces.",
      keyAchievement: "Sentinel-2 Satellite AI Integration & 58 Wilaya Dashboard.",
      location: "All 58 Provinces of Algeria",
      treesLogged: "12+ Million Trees",
    },
  ];

  return (
    <section id="timeline-section" className="py-24 px-container-padding bg-surface dark:bg-surface">
      <div className="container mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-xs uppercase tracking-wider mb-2">
            Progress Roadmap
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background mb-4">
            Project Expansion Timeline
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
            Tracking our growth from regional pilot surveys in Batna to national GIS infrastructure.
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
                className={`mb-16 relative pl-8 md:pl-0 md:w-1/2 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"
                }`}
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute top-2 w-4 h-4 rounded-full ring-4 ring-surface dark:ring-surface-container ${
                    item.colorClass.split(" ")[0]
                  } ${
                    isLeft
                      ? "left-[-9px] md:right-[-9px] md:left-auto"
                      : "left-[-9px]"
                  }`}
                />

                {/* Card Wrapper */}
                <div
                  onClick={() => setActiveMilestone(isSelected ? null : index)}
                  className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    isSelected ? "ring-2 ring-primary scale-[1.02]" : "hover:-translate-y-1"
                  }`}
                >
                  <div className={`flex flex-wrap items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${item.badgeBg}`}>
                      {item.year} - {item.phase}
                    </span>
                    <span className="text-xs text-on-surface-variant/80 font-mono">
                      {item.treesLogged}
                    </span>
                  </div>

                  <h4 className="font-headline-lg text-title-md text-on-background mb-2">
                    {item.title}
                  </h4>

                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expanded Milestone Details */}
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-outline-variant/40 animate-fadeIn text-xs text-on-surface space-y-2">
                      <div className="flex items-center gap-1.5 font-semibold text-primary">
                        <span className="material-symbols-outlined text-sm">verified</span>
                        Key Milestone: {item.keyAchievement}
                      </div>
                      <div className="text-on-surface-variant font-mono">
                        📍 Region Focus: {item.location}
                      </div>
                    </div>
                  )}

                  <div className={`mt-3 text-[11px] text-primary hover:underline flex items-center gap-1 ${isLeft ? "md:justify-end" : ""}`}>
                    <span>{isSelected ? "Show less" : "Click to inspect phase details"}</span>
                    <span className="material-symbols-outlined text-xs">
                      {isSelected ? "expand_less" : "expand_more"}
                    </span>
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
