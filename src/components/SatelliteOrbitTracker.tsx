"use client";

import { useState, useEffect } from "react";
import { Globe, Radio, Signal, Clock, ShieldCheck, Compass } from "lucide-react";
import { Tag, Badge } from "antd";

interface SatelliteInfo {
  id: string;
  name: string;
  agency: string;
  orbitAlt: string;
  gsdResolution: string;
  nextPass: string;
  sensorStatus: string;
  activeBands: string[];
}

export default function SatelliteOrbitTracker() {
  const [activeSatIndex, setActiveSatIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(142);

  const satellites: SatelliteInfo[] = [
    {
      id: "sentinel-2a",
      name: "Sentinel-2A MSI",
      agency: "ESA / Copernicus",
      orbitAlt: "786 km Sun-Synchronous",
      gsdResolution: "10m Multispectral",
      nextPass: "In 02m 22s over Batna (W05)",
      sensorStatus: "NOMINAL 100% OPERATIONAL",
      activeBands: ["B02-Blue", "B03-Green", "B04-Red", "B08-NIR", "B11-SWIR"],
    },
    {
      id: "sentinel-2b",
      name: "Sentinel-2B MSI",
      agency: "ESA / Copernicus",
      orbitAlt: "786 km Sun-Synchronous",
      gsdResolution: "10m Multispectral",
      nextPass: "In 48m 15s over Djelfa (W17)",
      sensorStatus: "ACTIVE TELEMETRY STREAM",
      activeBands: ["B04-Red", "B08-NIR", "B12-SWIR2"],
    },
    {
      id: "landsat-9",
      name: "Landsat-9 OLI-2",
      agency: "NASA / USGS",
      orbitAlt: "705 km Polar Orbit",
      gsdResolution: "15m Pan / 30m Thermal",
      nextPass: "In 03h 12m over Tizi Ouzou (W15)",
      sensorStatus: "THERMAL BAND SYNC",
      activeBands: ["Band 4-Red", "Band 5-NIR", "Band 10-TIRS1"],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 180));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentSat = satellites[activeSatIndex];
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="glass-card rounded-2xl p-4 border border-emerald-500/40 shadow-xl space-y-3 bg-surface/95 dark:bg-surface-container-high/95 backdrop-blur-md">
      <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono font-bold text-emerald-500 uppercase tracking-wider">
            Live Orbital Satellite Tracker
          </span>
        </div>

        <span className="font-mono text-[10px] text-on-surface-variant">
          Target Grid: 35.55° N, 6.17° E
        </span>
      </div>

      <div className="flex gap-1.5 text-xs font-mono">
        {satellites.map((sat, idx) => (
          <button
            key={sat.id}
            onClick={() => setActiveSatIndex(idx)}
            className={`flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer text-center font-bold ${
              activeSatIndex === idx
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container hover:bg-surface-container-highest text-on-surface-variant"
            }`}
          >
            {sat.name.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-highest space-y-2 text-xs font-mono border border-outline-variant/30">
        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant">Constellation Agency:</span>
          <span className="font-bold text-on-surface">{currentSat.agency}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant">Ground Resolution:</span>
          <Tag color="green" className="font-mono font-bold border-none m-0">
            {currentSat.gsdResolution}
          </Tag>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-on-surface-variant">Next Overpass Countdown:</span>
          <span className="font-bold text-emerald-400">
            {activeSatIndex === 0
              ? `00h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`
              : currentSat.nextPass.split("over")[0]}
          </span>
        </div>

        <div className="pt-2 border-t border-outline-variant/30 flex justify-between items-center text-[10px]">
          <span className="text-on-surface-variant">Active Spectral Bands:</span>
          <div className="flex flex-wrap gap-1">
            {currentSat.activeBands.slice(0, 3).map((b) => (
              <span key={b} className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
