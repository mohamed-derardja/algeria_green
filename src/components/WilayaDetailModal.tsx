"use client";

import { X, MapPin, Trees, ShieldCheck, Activity, Users, ArrowRight } from "lucide-react";

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

interface Props {
  province: ProvinceData | null;
  onClose: () => void;
}

export default function WilayaDetailModal({ province, onClose }: Props) {
  if (!province) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card bg-surface dark:bg-surface-container-high rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-primary/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-mono font-extrabold text-base flex items-center justify-center border border-primary/30">
            {province.code}
          </span>
          <div>
            <h3 className="font-title-md text-2xl font-bold text-on-surface">
              Wilaya of {province.name} ({province.nameAr})
            </h3>
            <span className="text-xs text-on-surface-variant font-mono">{province.region} Eco-Zone</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          <div className="p-3 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
            <span className="block font-mono font-bold text-lg text-primary">{province.forestCoverPct}%</span>
            <span className="text-[10px] text-on-surface-variant uppercase font-label-sm">Forest Cover</span>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
            <span className="block font-mono font-bold text-lg text-secondary">{province.loggedTrees}</span>
            <span className="text-[10px] text-on-surface-variant uppercase font-label-sm">Trees Planted</span>
          </div>

          <div className="p-3 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
            <span className="block font-mono font-bold text-lg text-tertiary">{province.ndviScore}</span>
            <span className="text-[10px] text-on-surface-variant uppercase font-label-sm">NDVI Index</span>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
            <span className="font-bold block mb-1 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Active Strategic Reforestation Project:
            </span>
            <p className="leading-relaxed font-semibold">{province.activeProject}</p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30">
            <span className="font-bold text-on-surface block mb-2">Dominant Flora &amp; Forest Species:</span>
            <div className="flex flex-wrap gap-2">
              {province.dominantSpecies.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold border border-primary/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 flex justify-between items-center">
            <div>
              <span className="font-bold text-on-surface block">2030 Reforestation Target</span>
              <span className="text-on-surface-variant font-mono">{province.reforestationTarget}</span>
            </div>
            <a
              href="/gis-console"
              className="px-4 py-2 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all cursor-pointer font-bold flex items-center gap-1 shadow-sm"
            >
              GIS Console View <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
