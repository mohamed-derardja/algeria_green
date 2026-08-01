"use client";

import { useState } from "react";
import { Award, X, Check, Download, QrCode, MapPin, Trees, Sparkles, Share2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TreeAdoptionModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState("Tarek Benali");
  const [species, setSpecies] = useState("Atlas Cedar (Cedrus atlantica)");
  const [wilaya, setWilaya] = useState("05 - Batna (Aurès Massif)");
  const [isGenerated, setIsGenerated] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerated(true);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card bg-surface dark:bg-surface-container-high rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-primary/40 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isGenerated ? (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs font-bold">
                National Reforestation Certificate
              </span>
            </div>

            <h3 className="font-headline-lg text-2xl font-bold text-on-background mb-2">
              Adopt an Algerian Native Tree Specimen
            </h3>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              Every adopted tree is registered with satellite Sentinel-2 telemetry, assigned exact GPS coordinates, and issued an official National GIS Certificate.
            </p>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Volunteer / Guardian Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface dark:bg-surface-container rounded-xl py-2.5 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Tarek Benali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Tree Species
                  </label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    className="w-full bg-surface dark:bg-surface-container rounded-xl py-2.5 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>Atlas Cedar (Cedrus atlantica)</option>
                    <option>Aleppo Pine (Pinus halepensis)</option>
                    <option>Cork Oak (Quercus suber)</option>
                    <option>Date Palm (Phoenix dactylifera)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                    Target Wilaya Reforestation Sector
                  </label>
                  <select
                    value={wilaya}
                    onChange={(e) => setWilaya(e.target.value)}
                    className="w-full bg-surface dark:bg-surface-container rounded-xl py-2.5 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>05 - Batna (Aurès Massif)</option>
                    <option>17 - Djelfa (Green Dam Belt)</option>
                    <option>15 - Tizi Ouzou (Djurdjura)</option>
                    <option>07 - Biskra (Ziban Oasis)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Sparkles className="w-4 h-4" />
                Generate National Adoption Certificate
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Digital Certificate Preview Card */}
            <div className="p-6 rounded-2xl border-4 border-double border-primary/50 bg-surface-container-lowest dark:bg-surface-container-high relative shadow-xl text-center space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-primary font-bold border-b border-primary/20 pb-3">
                <span>REPUBLIC OF ALGERIA</span>
                <span>GIS VERIFICATION ID: DZ-CEDAR-05-8492</span>
              </div>

              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <Trees className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold block mb-1">
                  OFFICIAL CERTIFICATE OF TREE ADOPTION
                </span>
                <h4 className="font-display-lg text-2xl font-bold text-primary font-serif">
                  {name}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Is hereby recognized as the official Guardian of 1 mature specimen of:
                </p>
                <p className="text-sm font-bold text-on-surface font-mono mt-1">
                  {species}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface-container dark:bg-surface-container-highest text-left text-xs font-mono border border-outline-variant/30">
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase font-label-sm">Location</span>
                  <span className="font-bold text-on-surface">{wilaya}</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block uppercase font-label-sm">GPS Coordinates</span>
                  <span className="font-bold text-primary">35.5558° N, 6.1741° E</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-primary/20 text-[11px] font-mono text-on-surface-variant">
                <span>Orbit Pass: Sentinel-2 Grid 31S</span>
                <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Satellite Verified
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                {downloaded ? "Certificate Saved to Device! ✓" : "Download Official Certificate (PNG)"}
              </button>

              <button
                onClick={() => setIsGenerated(false)}
                className="px-4 py-3 bg-surface-container-high text-on-surface rounded-xl font-title-md text-xs hover:bg-outline-variant transition-colors cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
