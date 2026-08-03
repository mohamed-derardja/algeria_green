"use client";

import { useState } from "react";
import { Trees, Sparkles, ExternalLink, ShieldCheck, Heart } from "lucide-react";
import { Tag } from "antd";
import SpeciesAudioPlayer from "./SpeciesAudioPlayer";

interface HerbariumSpecies {
  id: string;
  name: string;
  scientific: string;
  nameAr: string;
  nameFr: string;
  nativeRegion: string;
  droughtTolerance: string;
  lifespan: string;
  canopyDiameter: string;
  image: string;
  badgeColor: string;
  bioSummary: string;
}

export default function HerbariumShowcase() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const speciesList: HerbariumSpecies[] = [
    {
      id: "cedar",
      name: "Atlas Cedar",
      scientific: "Cedrus atlantica",
      nameAr: "أرز أطلسي",
      nameFr: "Cèdre de l'Atlas",
      nativeRegion: "Batna & Aurès Mountains (W05)",
      droughtTolerance: "High Mountain Cold & Frost",
      lifespan: "Up to 1,000 Years",
      canopyDiameter: "15 - 25 meters",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYEVJaROsbNd7wCNM3d-Jf4-lZCYfAd29ba5dclY1G_aP6Eu7nC7uTSZ7SV0ZYx3zlCrO5nACG0sWxPuAEFBPzMOTt95la9FUa4P1oHztIO-9wFLNnx5rxGACw4YBSOWoMVvCiXvwMuf9ljv9I1i19-WKd63ahMrrTiTw4__bBUk0nK1Dd4SLD2mZGV6Cq3ek5bC7Q8Dp29-mMlO2SiJtn96k3RWuKUpgevcif02CseGZ865xq7l8H",
      badgeColor: "green",
      bioSummary: "Endemic mountain evergreen revered for its rot-resistant aromatic wood and massive environmental carbon sequestration capacity.",
    },
    {
      id: "pine",
      name: "Aleppo Pine",
      scientific: "Pinus halepensis",
      nameAr: "صنوبر حلب",
      nameFr: "Pin d'Alep",
      nativeRegion: "Djelfa Green Dam Belt (W17)",
      droughtTolerance: "Extreme Semi-Arid Heat",
      lifespan: "150 - 250 Years",
      canopyDiameter: "10 - 18 meters",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK3yMIhfOIb34gt1p30d-Wh6wGcUUJPDmtZ46KNoqM5nJgDhYyd5V0mHBuJuOffsWaSt-s4O0YFfxjJZiEPo7kXXwP-W7VejokvO_Du_kZU7jKucQWbLZ6vvaWu1jbAkhjoc70DyPtYMN7S72BICh48Ts9rexwqxBPzWQCF9i0e2I4hC7FYJiJ0JH91J45a4yXr6A3WPsE9zwPN61iwir6xyKXSkn5dGEIlPjGcqMkwfQbRoXZOdUZ",
      badgeColor: "gold",
      bioSummary: "Workhorse pioneer species of the 1,500km Barrage Vert engineered to stop sand dune encroachment with deep taproot systems.",
    },
    {
      id: "cork",
      name: "Mediterranean Cork Oak",
      scientific: "Quercus suber",
      nameAr: "بلوط الفلين",
      nameFr: "Chêne-liège",
      nativeRegion: "Kabylie Coastal Chain (W15, W06)",
      droughtTolerance: "Moderate Coastal Climate",
      lifespan: "200 - 300 Years",
      canopyDiameter: "12 - 20 meters",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB2LTQX6SBomOQ2sIRZqTN7JKL1ljiHIrTvRaSs8hlR-E7caJA6inpasUkcVzuY9AT2fWEX_tOgCL_a_KJjd6-XE6rxSES2PZiuvDTYAiERaqk8Qn3eD_zTCn_5WRLWWW1MxTgBVAOIG212EmpGNUUN2cCT8e1BQDPIUHg0LqHvfy37mW9savR6vpmy_ZK-icY6L2RGHx0NjLPV4uN0PLAHul4VS2ZhAUcvLEaydC01dYXrWHz4c-o",
      badgeColor: "cyan",
      bioSummary: "Fire-resistant cork bark ecosystem supporting wild boars, Barbary macaques, and coastal soil erosion prevention.",
    },
    {
      id: "palm",
      name: "Deglet Nour Date Palm",
      scientific: "Phoenix dactylifera",
      nameAr: "نخيل التمر دقلة نور",
      nameFr: "Palmier Dattier",
      nativeRegion: "Biskra Ziban Oases (W07)",
      droughtTolerance: "Hyper-Arid Desert Oasis",
      lifespan: "100 - 150 Years",
      canopyDiameter: "6 - 10 meters",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMH0ECkHqkEsXHfyZwi3yBsh7o_IOsOCc16WWhPMyG40sPgPOZ139p_OLEH7ojdSYffj_OaBEUHySWwYFcTXJ9Ad7HWtA5ICWA8zSGGAvHskWgm5duRW7y2qou0oqcKDxxrZzkyYUgSugVOH82rR0vQDtV-zIBsNvL3VcOb_yTXTmOxJFK6vJLNSXvNxJGEdglD0-GpjmyDFrrJixr0vXgz6huDmK_0-1aG4NxH78vXgDkTJFSJ2L3",
      badgeColor: "amber",
      bioSummary: "The 'Queen of Dates' creating multi-layered oasis micro-climates allowing fruit, citrus, and vegetable farming in the Sahara.",
    },
  ];

  return (
    <section className="py-20 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs uppercase tracking-wider mb-3 font-semibold">
            <Trees className="w-3.5 h-3.5" />
            3D Botanical Herbarium Collection
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-3">
            Endemic Flora of Algeria: 3D Perspective Specimen Cards
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            Hover over cards to experience 3D perspective depth and listen to native multilingual audio pronunciations.
          </p>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speciesList.map((sp) => (
            <div
              key={sp.id}
              className="glass-card glass-card-hover rounded-3xl p-5 border border-outline-variant/40 hover:border-primary/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-outline-variant/30">
                  <img
                    src={sp.image}
                    alt={sp.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-2 left-2">
                    <Tag color={sp.badgeColor as any} className="font-mono text-[10px] font-bold border-none shadow">
                      {sp.scientific}
                    </Tag>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-title-md text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                      {sp.name}
                    </h3>
                    <span className="text-xs text-on-surface-variant font-arabic font-semibold block">
                      {sp.nameAr}
                    </span>
                  </div>

                  <SpeciesAudioPlayer
                    textAr={sp.nameAr}
                    textFr={sp.nameFr}
                    speciesName={sp.name}
                  />
                </div>

                <p className="text-xs text-on-surface-variant/90 leading-relaxed mb-4">
                  {sp.bioSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/30 space-y-2 text-[11px] font-mono">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Native Habitat:</span>
                  <span className="font-bold text-emerald-500">{sp.nativeRegion.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Max Lifespan:</span>
                  <span className="font-bold text-on-surface">{sp.lifespan}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
