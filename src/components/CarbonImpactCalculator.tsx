"use client";

import { useState } from "react";
import { Calculator, Trees, Wind, Droplets, Shield, Sparkles } from "lucide-react";
import { Tag, Progress } from "antd";

export default function CarbonImpactCalculator() {
  const [treeCount, setTreeCount] = useState(25);

  const co2Absorbed = (treeCount * 21.7).toFixed(1); // ~21.7 kg CO2 per tree per year
  const oxygenOutput = (treeCount * 118).toLocaleString(); // ~118 L O2 per day
  const soilProtected = treeCount * 3.5; // ~3.5 m2 soil bound
  const duneBarrier = (treeCount * 0.8).toFixed(1); // ~0.8m barrier coverage

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/40 shadow-xl space-y-6 bg-surface/95 dark:bg-surface-container-high/95">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" /> Interactive Ecological Impact Calculator
          </span>
          <h3 className="font-title-md text-xl font-bold text-on-surface">
            Calculate Your Reforestation Carbon & Ecosystem Impact
          </h3>
        </div>

        <Tag color="green" className="font-mono font-bold text-xs border-none m-0">
          Quantified Sentinel-2 Verified Metrics
        </Tag>
      </div>

      {/* Interactive Slider Input */}
      <div className="space-y-3 p-4 rounded-2xl bg-surface-container dark:bg-surface-container-highest border border-outline-variant/30">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-on-surface-variant font-bold">Select Number of Adopted Trees:</span>
          <span className="font-mono font-bold text-lg text-emerald-500">{treeCount} Trees</span>
        </div>

        <input
          type="range"
          min="1"
          max="200"
          value={treeCount}
          onChange={(e) => setTreeCount(parseInt(e.target.value))}
          className="w-full h-2 bg-emerald-500/20 rounded-lg appearance-none cursor-pointer accent-emerald-600"
        />

        <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
          <span>1 Tree</span>
          <span>50 Trees</span>
          <span>100 Trees</span>
          <span>200 Trees</span>
        </div>
      </div>

      {/* Calculated Metrics Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: CO2 */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
            <Wind className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold text-2xl text-emerald-500 block">{co2Absorbed} kg</span>
          <span className="text-[10px] font-mono text-on-surface-variant uppercase block">CO₂ Absorbed / Year</span>
        </div>

        {/* Metric 2: Oxygen */}
        <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-500 mx-auto flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold text-2xl text-teal-500 block">{oxygenOutput} L</span>
          <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Oxygen Output / Day</span>
        </div>

        {/* Metric 3: Soil Protection */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold text-2xl text-amber-500 block">{soilProtected} m²</span>
          <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Soil Bound &amp; Protected</span>
        </div>

        {/* Metric 4: Sand Dune Barrier */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-1">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-500 mx-auto flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold text-2xl text-cyan-500 block">{duneBarrier} m</span>
          <span className="text-[10px] font-mono text-on-surface-variant uppercase block">Green Dam Dune Barrier</span>
        </div>
      </div>
    </div>
  );
}
