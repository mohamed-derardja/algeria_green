"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Smartphone, CheckCircle, Upload, MapPin, Sparkles, Award } from "lucide-react";
import TreeAdoptionModal from "./TreeAdoptionModal";

export default function CitizenScienceCTA() {
  const { t } = useLanguage();
  const [selectedWilaya, setSelectedWilaya] = useState("05 - Batna");
  const [species, setSpecies] = useState("Cedrus atlantica (Atlas Cedar)");
  const [isLogged, setIsLogged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhotoName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLogged(true);
    }, 1000);
  };

  return (
    <>
      <section id="citizen-portal" className="py-20 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
        <div className="container mx-auto max-w-6xl">
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-primary/30 relative overflow-hidden shadow-2xl">
            {/* Decorative Background Accents */}
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-16 -top-16 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Text & Value Proposition */}
              <div className="lg:col-span-7">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-xs uppercase tracking-wider mb-4 font-semibold">
                  <Smartphone className="w-3.5 h-3.5" />
                  Citizen Science Field Portal
                </span>
                
                <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-4">
                  {t("citizen_title")}
                </h2>
                
                <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                  {t("citizen_desc")}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30">
                    <span className="block font-mono font-bold text-xl text-primary">5,240+</span>
                    <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">Active Volunteers</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30">
                    <span className="block font-mono font-bold text-xl text-secondary">58 Wilayas</span>
                    <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">National Reach</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30">
                    <span className="block font-mono font-bold text-xl text-tertiary">99.4%</span>
                    <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">GPS Accuracy</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowAdoptionModal(true)}
                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-title-md text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer font-bold"
                  >
                    <Award className="w-4 h-4" />
                    {t("citizen_adopt_btn")}
                  </button>
                </div>
              </div>

              {/* Interactive Field Form Card with Working File Upload */}
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-outline-variant/50 shadow-xl bg-surface/90 dark:bg-surface-container-high/90">
                <h3 className="font-title-md text-on-surface font-bold mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Simulate Field Tree Log
                </h3>
                <p className="text-xs text-on-surface-variant mb-4">
                  Test how field GPS telemetry verification works in real-time.
                </p>

                {isLogged ? (
                  <div className="p-6 text-center animate-fadeIn">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h4 className="font-title-md text-on-surface font-bold mb-1">
                      Specimen Successfully Logged!
                    </h4>
                    <p className="text-xs text-on-surface-variant mb-2 font-mono">
                      GPS: 35.5558° N, 6.1741° E ({selectedWilaya})
                    </p>

                    {photoPreviewUrl && (
                      <div className="my-3 w-full h-32 rounded-xl overflow-hidden border border-emerald-500/40">
                        <img src={photoPreviewUrl} alt="Logged Field Photo" className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-4">
                      Verified with Sentinel-2 Orbit Pass #842
                    </div>
                    
                    <div className="space-y-2">
                      <button
                        onClick={() => setShowAdoptionModal(true)}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-title-md transition-colors cursor-pointer font-bold flex items-center justify-center gap-1.5"
                      >
                        <Award className="w-4 h-4" /> Claim Tree Adoption Certificate
                      </button>

                      <button
                        onClick={() => {
                          setIsLogged(false);
                          setUploadedPhotoName(null);
                          setPhotoPreviewUrl(null);
                        }}
                        className="w-full py-2 bg-surface-container-highest hover:bg-outline-variant text-on-surface rounded-xl text-xs font-title-md transition-colors cursor-pointer"
                      >
                        Log Another Specimen
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSimulateSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Target Wilaya
                      </label>
                      <select
                        value={selectedWilaya}
                        onChange={(e) => setSelectedWilaya(e.target.value)}
                        className="w-full bg-surface dark:bg-surface-container rounded-xl py-2 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>05 - Batna (Aurès Massif)</option>
                        <option>17 - Djelfa (Green Dam Belt)</option>
                        <option>15 - Tizi Ouzou (Djurdjura)</option>
                        <option>07 - Biskra (Ziban Oasis)</option>
                        <option>16 - Algiers (Capital)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                        Tree / Vegetation Species
                      </label>
                      <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="w-full bg-surface dark:bg-surface-container rounded-xl py-2 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option>Cedrus atlantica (Atlas Cedar)</option>
                        <option>Pinus halepensis (Aleppo Pine)</option>
                        <option>Quercus suber (Cork Oak)</option>
                        <option>Phoenix dactylifera (Date Palm)</option>
                      </select>
                    </div>

                    {/* Working File Uploader Input */}
                    <label
                      htmlFor="field-photo-input"
                      className="p-3.5 rounded-xl border border-dashed border-primary/50 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer block"
                    >
                      <input
                        id="field-photo-input"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Upload className="w-5 h-5 text-primary mx-auto mb-1 opacity-90" />
                      <span className="text-[11px] font-bold text-on-surface block">
                        {uploadedPhotoName ? `✓ Uploaded: ${uploadedPhotoName}` : "Attach Field Specimen Photo (GPS Tagged)"}
                      </span>
                      <span className="text-[10px] text-on-surface-variant font-mono">
                        Click to upload image (JPG, PNG)
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer font-bold"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Verifying GPS Telemetry...
                        </span>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4" />
                          Submit Field Specimen Log
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tree Adoption Certificate Modal */}
      <TreeAdoptionModal
        isOpen={showAdoptionModal}
        onClose={() => setShowAdoptionModal(false)}
      />
    </>
  );
}
