"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Sun, CloudRain, Wind, Droplets, Thermometer, MapPin, CheckCircle2 } from "lucide-react";

interface WeatherRegion {
  id: string;
  name: string;
  nameAr: string;
  temp: number;
  humidity: number;
  soilMoisture: number;
  windSpeed: number;
  condition: string;
  suitability: "Optimal" | "Good" | "Caution";
}

export default function WeatherWidget() {
  const { t } = useLanguage();
  const regions: WeatherRegion[] = [
    {
      id: "batna",
      name: "Batna (Aurès Massif)",
      nameAr: "باتنة (الأوراس)",
      temp: 24,
      humidity: 58,
      soilMoisture: 72,
      windSpeed: 14,
      condition: "Partly Cloudy • High Soil Moisture",
      suitability: "Optimal",
    },
    {
      id: "djelfa",
      name: "Djelfa (Green Dam Belt)",
      nameAr: "الجلفة (السد الأخضر)",
      temp: 28,
      humidity: 42,
      soilMoisture: 54,
      windSpeed: 22,
      condition: "Dry Wind • Active Pine Moisture",
      suitability: "Good",
    },
    {
      id: "tizi",
      name: "Tizi Ouzou (Kabylie)",
      nameAr: "تيزي وزو (القبائل)",
      temp: 22,
      humidity: 68,
      soilMoisture: 84,
      windSpeed: 10,
      condition: "Optimal Coastal Mountain Moisture",
      suitability: "Optimal",
    },
    {
      id: "biskra",
      name: "Biskra (Ziban Oasis)",
      nameAr: "بسكرة (الزيبان)",
      temp: 34,
      humidity: 28,
      soilMoisture: 38,
      windSpeed: 18,
      condition: "High Heat • Irrigation Recommended",
      suitability: "Caution",
    },
  ];

  const [selectedRegion, setSelectedRegion] = useState<WeatherRegion>(regions[0]);

  return (
    <div className="glass-card p-6 rounded-3xl border border-primary/30 shadow-xl bg-surface/95 dark:bg-surface-container-high/95">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed text-xs font-semibold uppercase tracking-wider mb-1">
            <Sun className="w-3.5 h-3.5" /> Live Environmental Telemetry
          </span>
          <h3 className="font-title-md text-lg text-on-surface font-bold">
            Regional Planting Weather &amp; Soil Index
          </h3>
        </div>

        {/* Region Selector */}
        <select
          value={selectedRegion.id}
          onChange={(e) => setSelectedRegion(regions.find((r) => r.id === e.target.value) || regions[0])}
          className="bg-surface dark:bg-surface-container rounded-xl py-2 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none focus:ring-2 focus:ring-primary font-bold cursor-pointer"
        >
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {/* Temp */}
        <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
          <Thermometer className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <span className="block font-mono font-bold text-xl text-on-surface">{selectedRegion.temp}°C</span>
          <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">Temperature</span>
        </div>

        {/* Humidity */}
        <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
          <Droplets className="w-5 h-5 text-teal-500 mx-auto mb-1" />
          <span className="block font-mono font-bold text-xl text-on-surface">{selectedRegion.humidity}%</span>
          <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">Air Humidity</span>
        </div>

        {/* Soil Moisture */}
        <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
          <CloudRain className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
          <span className="block font-mono font-bold text-xl text-primary">{selectedRegion.soilMoisture}%</span>
          <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">Soil Moisture</span>
        </div>

        {/* Wind Speed */}
        <div className="p-3.5 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30 text-center">
          <Wind className="w-5 h-5 text-indigo-500 mx-auto mb-1" />
          <span className="block font-mono font-bold text-xl text-on-surface">{selectedRegion.windSpeed} km/h</span>
          <span className="text-[11px] text-on-surface-variant uppercase font-label-sm">Wind Speed</span>
        </div>
      </div>

      {/* Suitability Banner */}
      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
              Planting Condition: {selectedRegion.suitability}
            </p>
            <p className="text-[11px] text-on-surface-variant font-mono">
              {selectedRegion.condition}
            </p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-surface px-3 py-1 rounded-full border border-emerald-500/30">
          GPS Verified
        </span>
      </div>
    </div>
  );
}
