"use client";

import { useState } from "react";
import { Bot, Upload, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Eye } from "lucide-react";

interface SpecimenSample {
  id: string;
  name: string;
  scientific: string;
  nameAr: string;
  confidence: number;
  healthScore: number;
  status: string;
  recommendation: string;
  imgUrl: string;
}

export default function AISpeciesScanner() {
  const samples: SpecimenSample[] = [
    {
      id: "cedar",
      name: "Atlas Cedar",
      scientific: "Cedrus atlantica",
      nameAr: "أرز أطلسي (Arz Atlasi)",
      confidence: 98.6,
      healthScore: 94,
      status: "Healthy Canopy • High NDVI Density",
      recommendation: "Optimal soil moisture detected in Batna Aurès sector B-42. Maintain current satellite telemetry frequency.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYEVJaROsbNd7wCNM3d-Jf4-lZCYfAd29ba5dclY1G_aP6Eu7nC7uTSZ7SV0ZYx3zlCrO5nACG0sWxPuAEFBPzMOTt95la9FUa4P1oHztIO-9wFLNnx5rxGACw4YBSOWoMVvCiXvwMuf9ljv9I1i19-WKd63ahMrrTiTw4__bBUk0nK1Dd4SLD2mZGV6Cq3ek5bC7Q8Dp29-mMlO2SiJtn96k3RWuKUpgevcif02CseGZ865xq7l8H",
    },
    {
      id: "cork_oak",
      name: "Cork Oak",
      scientific: "Quercus suber",
      nameAr: "بلوط الفلين (Ballout El Fellin)",
      confidence: 96.2,
      healthScore: 88,
      status: "Moderate Moisture • Active Regeneration",
      recommendation: "Coastal mountain ecosystem (Tizi Ouzou/Béjaïa). Soil pH optimal for sapling propagation.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB2LTQX6SBomOQ2sIRZqTN7JKL1ljiHIrTvRaSs8hlR-E7caJA6inpasUkcVzuY9AT2fWEX_tOgCL_a_KJjd6-XE6rxSES2PZiuvDTYAiERaqk8Qn3eD_zTCn_5WRLWWW1MxTgBVAOIG212EmpGNUUN2cCT8e1BQDPIUHg0LqHvfy37mW9savR6vpmy_ZK-icY6L2RGHx0NjLPV4uN0PLAHul4VS2ZhAUcvLEaydC01dYXrWHz4c-o",
    },
    {
      id: "pine",
      name: "Aleppo Pine",
      scientific: "Pinus halepensis",
      nameAr: "صنوبر حلب (Snober Halab)",
      confidence: 99.1,
      healthScore: 91,
      status: "Green Dam Barrier Primary Species",
      recommendation: "High drought tolerance confirmed in Djelfa High Plateaus. Re-afforestation seed viability 95%.",
      imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK3yMIhfOIb34gt1p30d-Wh6wGcUUJPDmtZ46KNoqM5nJgDhYyd5V0mHBuJuOffsWaSt-s4O0YFfxjJZiEPo7kXXwP-W7VejokvO_Du_kZU7jKucQWbLZ6vvaWu1jbAkhjoc70DyPtYMN7S72BICh48Ts9rexwqxBPzWQCF9i0e2I4hC7FYJiJ0JH91J45a4yXr6A3WPsE9zwPN61iwir6xyKXSkn5dGEIlPjGcqMkwfQbRoXZOdUZ",
    },
  ];

  const [selectedSample, setSelectedSample] = useState<SpecimenSample>(samples[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<SpecimenSample | null>(samples[0]);

  const handleScanSample = (sample: SpecimenSample) => {
    setSelectedSample(sample);
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(sample);
    }, 1200);
  };

  return (
    <section id="ai-scanner" className="py-20 px-container-padding bg-surface dark:bg-surface border-b border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed text-xs font-semibold uppercase tracking-wider mb-3">
            <Bot className="w-3.5 h-3.5" />
            AI Computer Vision Scanner
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight mb-3">
            Instant Tree Species Recognition & Health Diagnostic
          </h2>
          <p className="font-body-md text-on-surface-variant max-w-2xl mx-auto">
            Test our neural network computer vision model trained on over 50,000 Algerian flora field observations.
          </p>
        </div>

        {/* Scanner Card Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Sample Selectors & Upload */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-title-md text-sm text-on-surface font-bold">
              Select Sample Specimen to Scan:
            </h3>

            <div className="space-y-3">
              {samples.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleScanSample(s)}
                  className={`p-3.5 rounded-2xl glass-card border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedSample.id === s.id
                      ? "border-primary ring-2 ring-primary/30 scale-[1.01]"
                      : "border-outline-variant/30 hover:border-primary/40"
                  }`}
                >
                  <img
                    src={s.imgUrl}
                    alt={s.name}
                    className="w-12 h-12 rounded-xl object-cover border border-outline-variant/40"
                  />
                  <div className="flex-1">
                    <h4 className="font-title-md text-sm text-on-surface font-bold">{s.name}</h4>
                    <p className="text-xs text-primary font-mono italic">{s.scientific}</p>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-surface-container-high text-xs font-semibold text-on-surface hover:bg-primary hover:text-on-primary transition-colors">
                    Scan Photo
                  </button>
                </div>
              ))}
            </div>

            {/* Custom File Upload Box */}
            <div className="p-5 rounded-2xl border-2 border-dashed border-primary/40 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
              <span className="text-xs font-bold text-on-surface block mb-0.5">
                Upload Custom Leaf or Bark Photo
              </span>
              <span className="text-[11px] text-on-surface-variant">
                Supports JPG, PNG, WEBP (Max 10MB)
              </span>
            </div>
          </div>

          {/* Right Column: AI Scanner Screen & Result */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 border border-primary/30 shadow-2xl relative min-h-[400px] flex flex-col justify-between overflow-hidden">
              {/* Scan Screen Frame */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 border border-outline-variant/40 bg-black">
                <img
                  src={selectedSample.imgUrl}
                  alt="Scanning Target"
                  className="w-full h-full object-cover opacity-90"
                />

                {/* Animated Laser Scanning Line */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-emerald-400 shadow-[0_0_15px_#10b981] animate-bounce z-20"></div>
                )}

                {/* Overlay Scanning Badges */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white font-mono text-[11px] flex items-center gap-1.5 border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  {isScanning ? "Neural Network Analyzing..." : "AI Model Ready"}
                </div>
              </div>

              {/* Scan Results Output */}
              {isScanning ? (
                <div className="p-6 text-center animate-fadeIn my-auto">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                  <h4 className="font-title-md text-on-surface font-bold text-base mb-1">
                    Analyzing Multispectral Bands & Leaf Texture...
                  </h4>
                  <p className="text-xs text-on-surface-variant font-mono">
                    Matching against Algerian Herbarium Dataset (50,000+ Samples)
                  </p>
                </div>
              ) : scanResult ? (
                <div className="animate-fadeIn space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30">
                          {scanResult.confidence}% AI Confidence
                        </span>
                        <span className="text-xs text-on-surface-variant font-arabic font-semibold">
                          {scanResult.nameAr}
                        </span>
                      </div>
                      <h3 className="font-title-md text-xl font-bold text-on-surface">
                        {scanResult.name} ({scanResult.scientific})
                      </h3>
                    </div>

                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary text-center">
                      <span className="block font-mono font-bold text-lg">{scanResult.healthScore}%</span>
                      <span className="text-[10px] uppercase font-label-sm">Vitality</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 text-xs text-on-surface leading-relaxed">
                    <span className="font-bold text-primary block mb-0.5">Diagnosed Health Status:</span>
                    {scanResult.status}
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                    <span className="font-bold block mb-0.5 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> AI Conservation Action Plan:
                    </span>
                    {scanResult.recommendation}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
