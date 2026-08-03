"use client";

import { useEffect, useState } from "react";
import { Bot, Sparkles, Activity, ShieldCheck } from "lucide-react";

export default function TelemetryTicker() {
  const [treeCount, setTreeCount] = useState(34842120);

  useEffect(() => {
    const interval = setInterval(() => {
      setTreeCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-emerald-950 text-emerald-200 py-2 px-4 border-b border-emerald-800/60 font-mono text-xs overflow-hidden shadow-inner">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-bold text-white tracking-wide uppercase text-[11px]">
            Sentinel-2 Multispectral Orbit
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap text-[11px] text-emerald-300/90 py-0.5 no-scrollbar max-w-full">
          <div className="flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Trees Logged:</span>
            <span className="font-bold text-white tracking-wider">
              {treeCount.toLocaleString()}
            </span>
          </div>

          <span className="opacity-50">•</span>
          <span className="shrink-0">Batna Cedar: <span className="text-emerald-400 font-bold">NDVI 0.78</span></span>
          <span className="opacity-50">•</span>
          <span className="shrink-0">Djelfa Belt: <span className="text-amber-400 font-bold">+1.8M Trees</span></span>
          <span className="opacity-50">•</span>
          <span className="shrink-0">Kabylie: <span className="text-emerald-400 font-bold">Low Fire Risk</span></span>
        </div>

        <div className="flex items-center gap-1 text-[10px] text-emerald-300 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50 shrink-0">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>58 Wilayas Active</span>
        </div>
      </div>
    </div>
  );
}
