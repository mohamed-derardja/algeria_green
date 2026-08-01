"use client";

import { Trees, Shield, Cpu, Users, ArrowUpRight } from "lucide-react";

export default function InitiativesGrid() {
  const initiatives = [
    {
      id: "barrage-vert",
      title: "Barrage Vert 2.0",
      subtitle: "The Great Green Wall of Algeria",
      icon: Trees,
      color: "emerald",
      badge: "3M+ Hectares",
      description: "Revitalizing the historic 1,500km anti-desertification green belt stretching across the High Plateaus to halt Saharan dune migration.",
      metric: "Target 2030: +4.7M Trees Planted",
      link: "#timeline-section",
    },
    {
      id: "aures-massif",
      title: "Aurès Cedar & Forest Protection",
      subtitle: "Batna & Djurdjura Conservation",
      icon: Shield,
      color: "teal",
      badge: "Batna & Kabylie Hub",
      description: "Specialized monitoring and pest disease early-warning for endemic Cedrus atlantica and Cork Oak ecosystems in Eastern massifs.",
      metric: "24.2% Regional Forest Cover",
      link: "#platform",
    },
    {
      id: "sat-ai",
      title: "Sentinel AI Telemetry",
      subtitle: "Multispectral Canopy Analytics",
      icon: Cpu,
      color: "indigo",
      badge: "10m Resolution",
      description: "Automated neural network classification combining Sentinel-2 & Landsat optical layers to calculate NDVI index and tree density in real time.",
      metric: "Automated 14-Day Orbit Pass",
      link: "#interactive-map",
    },
    {
      id: "citizen-science",
      title: "Citizen Science Network",
      subtitle: "Community Field Logging",
      icon: Users,
      color: "amber",
      badge: "58 Wilayas Active",
      description: "Mobilizing local youth, forest rangers, and researchers to log individual tree GPS coordinates, photos, and health status via our mobile app.",
      metric: "5,000+ Field Contributors",
      link: "#citizen-portal",
    },
  ];

  return (
    <section id="research" className="py-20 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
            Strategic Environmental Pillars
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-4">
            National Green Initiatives & Technology Infrastructure
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            Combining satellite AI telemetry with ground community action to protect Algeria&apos;s rich ecological legacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className="glass-card glass-card-hover p-6 rounded-2xl border border-outline-variant/40 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant border border-outline-variant/30">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-title-md text-lg text-on-background font-bold mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-primary font-medium mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-secondary">
                    {item.metric}
                  </span>
                  <a
                    href={item.link}
                    className="w-7 h-7 rounded-lg bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
