"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import WilayaDetailModal from "./WilayaDetailModal";
import WilayaCompareModal from "./WilayaCompareModal";
import { Search, Trees, Filter, MapPin, X, ExternalLink, ChevronRight, Activity, ArrowLeftRight } from "lucide-react";
import { Progress, Tag } from "antd";

interface ProvinceData {
  code: string;
  name: string;
  nameAr: string;
  region: string;
  forestCoverPct: number;
  loggedTrees: string;
  dominantSpecies: string[];
  ndviScore: number;
  reforestationTarget: string;
  activeProject: string;
}

export default function ProvincesSection() {
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedProvince, setSelectedProvince] = useState<ProvinceData | null>(null);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const provinces: ProvinceData[] = [
    {
      code: "05",
      name: "Batna",
      nameAr: "باتنة",
      region: "Aurès & East",
      forestCoverPct: 24.2,
      loggedTrees: "1.45M",
      dominantSpecies: ["Atlas Cedar", "Aleppo Pine", "Holm Oak"],
      ndviScore: 0.78,
      reforestationTarget: "+250,000 trees by 2027",
      activeProject: "Aurès Cedar Canopy Protection & Pest Survey",
    },
    {
      code: "15",
      name: "Tizi Ouzou",
      nameAr: "تيزي وزو",
      region: "Coastal & Kabylie",
      forestCoverPct: 38.6,
      loggedTrees: "2.10M",
      dominantSpecies: ["Cork Oak", "Holm Oak", "Wild Olive"],
      ndviScore: 0.86,
      reforestationTarget: "+300,000 trees by 2026",
      activeProject: "Djurdjura National Park Biodiversity Belt",
    },
    {
      code: "17",
      name: "Djelfa",
      nameAr: "الجلفة",
      region: "High Plateaus & Green Dam",
      forestCoverPct: 11.4,
      loggedTrees: "1.80M",
      dominantSpecies: ["Aleppo Pine", "Esparto Grass", "Acacia"],
      ndviScore: 0.54,
      reforestationTarget: "+1.2M trees by 2030",
      activeProject: "Barrage Vert 2.0 Central Barrier Expansion",
    },
    {
      code: "16",
      name: "Algiers",
      nameAr: "الجزائر",
      region: "Coastal & Kabylie",
      forestCoverPct: 18.5,
      loggedTrees: "620K",
      dominantSpecies: ["Eucalyptus", "Maritime Pine", "Carob"],
      ndviScore: 0.62,
      reforestationTarget: "+80,000 trees by 2026",
      activeProject: "Capital Urban Forest & Bainem Park Corridor",
    },
    {
      code: "31",
      name: "Oran",
      nameAr: "وهران",
      region: "West & Coastal",
      forestCoverPct: 16.8,
      loggedTrees: "540K",
      dominantSpecies: ["Barbary Thuja", "Carob", "Aleppo Pine"],
      ndviScore: 0.58,
      reforestationTarget: "+150,000 trees by 2028",
      activeProject: "Mdjaref Forest & Coastal Dune Stabilization",
    },
    {
      code: "25",
      name: "Constantine",
      nameAr: "قسنطينة",
      region: "Aurès & East",
      forestCoverPct: 21.0,
      loggedTrees: "890K",
      dominantSpecies: ["Cork Oak", "Olive", "Aleppo Pine"],
      ndviScore: 0.71,
      reforestationTarget: "+180,000 trees by 2027",
      activeProject: "Chettaba Mountain Forest Reforestation",
    },
    {
      code: "07",
      name: "Biskra",
      nameAr: "بسكرة",
      region: "Sahara Oases & South",
      forestCoverPct: 8.2,
      loggedTrees: "920K",
      dominantSpecies: ["Date Palm", "Tamarix", "Acacia"],
      ndviScore: 0.42,
      reforestationTarget: "+400,000 Date Palms & Barrier Shrubs",
      activeProject: "Ziban Solar Drip Oasis Edge Protection",
    },
    {
      code: "11",
      name: "Tamanrasset",
      nameAr: "تمنراست",
      region: "Sahara Oases & South",
      forestCoverPct: 2.1,
      loggedTrees: "310K",
      dominantSpecies: ["Saharan Cypress", "Acacia tortilis"],
      ndviScore: 0.28,
      reforestationTarget: "+50,000 Endemic Cypress Conservation",
      activeProject: "Hoggar Mountain Endemic Species Sanctuary",
    },
    {
      code: "23",
      name: "Annaba",
      nameAr: "عنابة",
      region: "Coastal & Kabylie",
      forestCoverPct: 34.2,
      loggedTrees: "1.15M",
      dominantSpecies: ["Cork Oak", "Maritime Pine", "Alder"],
      ndviScore: 0.83,
      reforestationTarget: "+200,000 trees by 2027",
      activeProject: "Edough Mountain Massif Protection Reserve",
    },
    {
      code: "06",
      name: "Béjaïa",
      nameAr: "بجاية",
      region: "Coastal & Kabylie",
      forestCoverPct: 36.4,
      loggedTrees: "1.75M",
      dominantSpecies: ["Cork Oak", "Zean Oak", "Maritime Pine"],
      ndviScore: 0.85,
      reforestationTarget: "+220,000 trees by 2027",
      activeProject: "Gouraya National Park Biosphere Project",
    },
    {
      code: "14",
      name: "Tiaret",
      nameAr: "تيارت",
      region: "High Plateaus & Green Dam",
      forestCoverPct: 15.2,
      loggedTrees: "980K",
      dominantSpecies: ["Aleppo Pine", "Green Oak", "Esparto"],
      ndviScore: 0.61,
      reforestationTarget: "+500,000 trees by 2029",
      activeProject: "Green Dam Western Segment Reforestation",
    },
    {
      code: "47",
      name: "Ghardaïa",
      nameAr: "غرداية",
      region: "Sahara Oases & South",
      forestCoverPct: 4.8,
      loggedTrees: "480K",
      dominantSpecies: ["Date Palm", "Acacia", "Desert Poplar"],
      ndviScore: 0.35,
      reforestationTarget: "+150,000 Palm Oasis Greening",
      activeProject: "M&apos;zab Valley Oasis Irrigation Management",
    },
  ];

  const regions = ["All", "Aurès & East", "Coastal & Kabylie", "High Plateaus & Green Dam", "West & Coastal", "Sahara Oases & South"];

  const filteredProvinces = provinces.filter((p) => {
    const matchesRegion = selectedRegion === "All" || p.region === selectedRegion;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.includes(searchTerm) ||
      p.nameAr.includes(searchTerm);
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="platform" className="py-20 px-container-padding bg-surface-container-low dark:bg-surface-container-lowest/50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs uppercase tracking-wider mb-2 font-semibold">
              <Trees className="w-3.5 h-3.5" />
              National GIS Explorer
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight">
              58 Algerian Provinces Geospatial Data
            </h2>
            <p className="font-body-md text-on-surface-variant mt-2 max-w-xl">
              Inspect real-time forestry density, logged tree counts, native vegetation distribution, and active conservation projects per Wilaya.
            </p>
          </div>

          {/* Search & Compare Controls */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap active:scale-95"
            >
              <ArrowLeftRight className="w-4 h-4" /> Compare Wilayas Side-by-Side
            </button>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <input
                type="text"
                placeholder="Search Wilaya (e.g. Batna, 05)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface dark:bg-surface-container-high rounded-xl py-2.5 pl-10 pr-4 text-xs text-on-surface border border-outline-variant/60 focus:ring-2 focus:ring-primary outline-none shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant hover:text-primary cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-primary" /> Filter Zone:
          </span>
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProvinces.map((prov) => (
            <div
              key={prov.code}
              onClick={() => setSelectedProvince(prov)}
              className="glass-card glass-card-hover p-5 rounded-2xl border border-outline-variant/40 hover:border-primary/60 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                    W{prov.code}
                  </span>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {prov.nameAr}
                  </span>
                </div>
                <h3 className="font-title-md text-on-surface text-lg font-bold group-hover:text-primary transition-colors">
                  {prov.name}
                </h3>
                <p className="text-[11px] text-on-surface-variant/80 mb-4">{prov.region}</p>
              </div>

              <div>
                {/* Forest Cover Progress Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-on-surface-variant text-[11px]">Forest Coverage:</span>
                    <span className="font-mono font-bold text-secondary">{prov.forestCoverPct}%</span>
                  </div>
                  <Progress
                    percent={Math.min(prov.forestCoverPct * 2.2, 100)}
                    strokeColor="#2a6b2c"
                    size="small"
                    showInfo={false}
                  />
                </div>

                {/* Species Pills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {prov.dominantSpecies.slice(0, 2).map((sp) => (
                    <Tag key={sp} color="green" className="text-[10px] border-emerald-500/20 font-medium m-0">
                      {sp}
                    </Tag>
                  ))}
                </div>

                <div className="pt-3 border-t border-outline-variant/30 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-[10px] text-on-surface-variant block uppercase font-label-sm">Logged Trees</span>
                    <span className="font-mono font-bold text-primary">{prov.loggedTrees}</span>
                  </div>
                  <span className="w-7 h-7 rounded-lg bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary text-on-surface flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Wilaya Detail Dialog Modal */}
        <WilayaDetailModal
          province={selectedProvince}
          onClose={() => setSelectedProvince(null)}
        />

        {/* Side-by-Side Wilaya Comparison Modal */}
        <WilayaCompareModal
          isOpen={showCompareModal}
          onClose={() => setShowCompareModal(false)}
          provinces={provinces}
        />
      </div>
    </section>
  );
}

