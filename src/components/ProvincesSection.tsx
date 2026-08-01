"use client";

import { useState } from "react";

interface ProvinceData {
  code: string;
  name: string;
  nameAr: string;
  region: string;
  forestCover: string;
  loggedTrees: string;
  dominantSpecies: string;
}

export default function ProvincesSection() {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const provinces: ProvinceData[] = [
    { code: "05", name: "Batna", nameAr: "باتنة", region: "Aurès / North East", forestCover: "24.2%", loggedTrees: "1.45M", dominantSpecies: "Atlas Cedar, Aleppo Pine" },
    { code: "16", name: "Algiers", nameAr: "الجزائر", region: "Capital / Coastal", forestCover: "18.5%", loggedTrees: "620K", dominantSpecies: "Eucalyptus, Maritime Pine" },
    { code: "31", name: "Oran", nameAr: "وهران", region: "West / Coastal", forestCover: "16.8%", loggedTrees: "540K", dominantSpecies: "Barbary Thuja, Carob" },
    { code: "25", name: "Constantine", nameAr: "قسنطينة", region: "East / Inland", forestCover: "21.0%", loggedTrees: "890K", dominantSpecies: "Cork Oak, Olive" },
    { code: "15", name: "Tizi Ouzou", nameAr: "تيزي وزو", region: "Kabylie / Coastal", forestCover: "38.6%", loggedTrees: "2.10M", dominantSpecies: "Cork Oak, Holm Oak" },
    { code: "17", name: "Djelfa", nameAr: "الجلفة", region: "Green Dam / High Plateaus", forestCover: "11.4%", loggedTrees: "1.80M", dominantSpecies: "Aleppo Pine, Esparto" },
    { code: "07", name: "Biskra", nameAr: "بسكرة", region: "Ziban / Oasis Gate", forestCover: "8.2%", loggedTrees: "920K", dominantSpecies: "Date Palm, Tamarix" },
    { code: "11", name: "Tamanrasset", nameAr: "تمنراست", region: "Hoggar / South", forestCover: "2.1%", loggedTrees: "310K", dominantSpecies: "Acacia, Saharan Cypress" },
  ];

  const regions = ["All", "Aurès / North East", "Capital / Coastal", "Kabylie / Coastal", "Green Dam / High Plateaus", "Hoggar / South"];

  const filteredProvinces = provinces.filter((p) => {
    const matchesRegion = selectedRegion === "All" || p.region === selectedRegion;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.code.includes(searchTerm);
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="platform" className="py-20 px-container-padding bg-surface-container-low dark:bg-surface-container-lowest/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs uppercase tracking-wider mb-2">
              National GIS Explorer
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background">
              58 Provinces Geospatial Data
            </h2>
            <p className="font-body-md text-on-surface-variant mt-2 max-w-xl">
              Inspect real-time forestry density, logged tree counts, and native vegetation distribution per Algerian province.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search Wilaya (e.g. Batna, 05)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-surface dark:bg-surface-container-high rounded-xl py-2.5 px-4 text-sm text-on-surface border border-outline-variant/60 focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedRegion === reg
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface text-on-surface-variant hover:bg-surface-container-highest border border-outline-variant/40"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Provinces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProvinces.map((prov) => (
            <div
              key={prov.code}
              className="glass-card p-5 rounded-xl border border-outline-variant/40 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    W{prov.code}
                  </span>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {prov.nameAr}
                  </span>
                </div>
                <h3 className="font-title-md text-on-surface text-lg font-bold">
                  {prov.name}
                </h3>
                <p className="text-xs text-on-surface-variant/80 mb-4">{prov.region}</p>
              </div>

              <div className="pt-3 border-t border-outline-variant/30 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Forest Cover:</span>
                  <span className="font-mono font-bold text-secondary">{prov.forestCover}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Logged Trees:</span>
                  <span className="font-mono font-bold text-primary">{prov.loggedTrees}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Species:</span>
                  <span className="font-medium text-on-surface truncate max-w-[120px]" title={prov.dominantSpecies}>
                    {prov.dominantSpecies}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
