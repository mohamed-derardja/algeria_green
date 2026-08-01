"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Trees, Shield, Cpu, Users, ArrowUpRight } from "lucide-react";

export default function InitiativesGrid() {
  const { t } = useLanguage();

  const initiatives = [
    {
      id: "barrage-vert",
      title: t("init_1_title"),
      subtitle: "The Great Green Wall of Algeria",
      icon: Trees,
      badge: "3M+ Hectares",
      description: t("init_1_desc"),
      metric: "Target 2030: +4.7M Trees Planted",
      link: "#timeline-section",
    },
    {
      id: "aures-massif",
      title: t("init_2_title"),
      subtitle: "Batna & Djurdjura Conservation",
      icon: Shield,
      badge: "Batna & Kabylie Hub",
      description: t("init_2_desc"),
      metric: "24.2% Regional Forest Cover",
      link: "#platform",
    },
    {
      id: "sat-ai",
      title: t("init_3_title"),
      subtitle: "Multispectral Canopy Analytics",
      icon: Cpu,
      badge: "10m Resolution",
      description: t("init_3_desc"),
      metric: "Automated 14-Day Orbit Pass",
      link: "#interactive-map",
    },
    {
      id: "citizen-science",
      title: t("init_4_title"),
      subtitle: "Community Field Logging",
      icon: Users,
      badge: "58 Wilayas Active",
      description: t("init_4_desc"),
      metric: "5,000+ Field Contributors",
      link: "#citizen-portal",
    },
  ];

  return (
    <section id="research" className="py-20 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
            {t("init_title")}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-4">
            {t("init_title")}
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            {t("init_subtitle")}
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
