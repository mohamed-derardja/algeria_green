"use client";

import { useState } from "react";
import { Award, X, Check, Download, QrCode, MapPin, Trees, Sparkles, Printer } from "lucide-react";

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
    // Create text metadata certificate download
    const certText = `
===========================================================
REPUBLIC OF ALGERIA - NATIONAL ENVIRONMENTAL GIS AUTHORITY
GREEN ALGERIA OFFICIAL ADOPTION CERTIFICATE
===========================================================

Certificate ID: DZ-CEDAR-05-8492
Guardian Name: ${name}
Species: ${species}
Wilaya Sector: ${wilaya}
GPS Coordinates: 35.5558° N, 6.1741° E
Satellite Verification: Sentinel-2 Orbit Pass #842

Verification URL: https://algeriagreen.dz/verify/DZ-CEDAR-05-8492
Status: VERIFIED NATIONAL ECOLOGICAL HERITAGE SPECIMEN
    `;
    const blob = new Blob([certText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Algeria_Green_Certificate_${name.replace(/\s+/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    window.print();
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
                  className="w-full bg-surface dark:bg-surface-container rounded-xl py-2.5 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary font-medium"
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
                className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4 font-bold"
              >
                <Sparkles className="w-4 h-4" />
                Generate National Adoption Certificate
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            {/* Digital Certificate Preview Card */}
            <div className="p-6 rounded-2xl border-4 border-double border-emerald-600/60 bg-surface-container-lowest dark:bg-surface-container-high relative shadow-2xl text-center space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold border-b border-emerald-500/20 pb-3">
                <span>REPUBLIC OF ALGERIA</span>
                <span>ID: DZ-CEDAR-05-8492</span>
              </div>

              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                <Trees className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-mono font-bold block mb-1">
                  OFFICIAL CERTIFICATE OF TREE ADOPTION
                </span>
                <h4 className="font-display-lg text-2xl font-bold text-emerald-800 dark:text-emerald-300 font-serif">
                  {name}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1">
                  Is recognized as the official National Guardian of 1 mature specimen:
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
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">35.5558° N, 6.1741° E</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20 text-[11px] font-mono text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <QrCode className="w-8 h-8 text-slate-800 dark:text-zinc-200" />
                  <span className="text-[10px] text-left">Scan to Verify<br/>algeriagreen.dz</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" /> Satellite Verified
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-bold"
              >
                <Download className="w-4 h-4" />
                {downloaded ? "Certificate File Saved! ✓" : "Download Official Certificate"}
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-3 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl font-title-md text-xs transition-colors cursor-pointer flex items-center gap-1.5 font-bold border border-outline-variant/30"
              >
                <Printer className="w-4 h-4" /> Print
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
