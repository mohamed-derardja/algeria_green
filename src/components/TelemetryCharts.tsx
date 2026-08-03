"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Calendar, Activity, Sparkles } from "lucide-react";
import { Tag, Progress, Segmented } from "antd";

export default function TelemetryCharts() {
  const [activeChart, setActiveChart] = useState<"ndvi" | "moisture" | "survival">("ndvi");

  // NDVI Progression Data 2020-2026
  const ndviData = [
    { year: "2020", value: 0.42, label: "Baseline Scan" },
    { year: "2021", value: 0.48, label: "Initial Pilot" },
    { year: "2022", value: 0.55, label: "Barrage Vert Launch" },
    { year: "2023", value: 0.62, label: "Sentinel-2 Orbit Pass" },
    { year: "2024", value: 0.71, label: "Aurès Protection" },
    { year: "2025", value: 0.78, label: "High Plateaus Belt" },
    { year: "2026", value: 0.84, label: "Present Active" },
  ];

  // Soil Moisture vs Rainfall
  const moistureData = [
    { month: "Jan", moisture: 68, rainfall: 85 },
    { month: "Mar", moisture: 74, rainfall: 92 },
    { month: "May", moisture: 58, rainfall: 45 },
    { month: "Jul", moisture: 38, rainfall: 15 },
    { month: "Sep", moisture: 52, rainfall: 40 },
    { month: "Nov", moisture: 78, rainfall: 95 },
  ];

  return (
    <div className="glass-card rounded-3xl p-6 border border-outline-variant/40 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500 mb-1">
            <Activity className="w-4 h-4" /> Live Satellite Telemetry Analytics
          </div>
          <h3 className="font-title-md text-lg font-bold text-on-surface">
            National Environmental Telemetry Trends
          </h3>
        </div>

        <Segmented
          options={[
            { label: "NDVI Index (2020-2026)", value: "ndvi" },
            { label: "Soil Moisture Grid", value: "moisture" },
            { label: "Sapling Survival", value: "survival" },
          ]}
          value={activeChart}
          onChange={(val) => setActiveChart(val as any)}
        />
      </div>

      {/* Chart 1: NDVI Multi-Year Curve */}
      {activeChart === "ndvi" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-on-surface-variant">Multispectral Band Vegetation Growth Rate</span>
            <Tag color="green" className="font-mono font-bold border-none m-0">+100% Growth since 2020</Tag>
          </div>

          <div className="h-52 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-2xl border border-outline-variant/20 relative">
            {ndviData.map((d) => {
              const heightPct = (d.value / 1.0) * 100;
              return (
                <div key={d.year} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                  <span className="text-[10px] font-mono font-bold text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.value}
                  </span>
                  <div
                    className="w-full max-w-[36px] bg-gradient-to-t from-emerald-700 to-emerald-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125 shadow-md relative"
                    style={{ height: `${heightPct}%` }}
                  >
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-on-surface-variant group-hover:text-primary">
                    {d.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart 2: Soil Moisture vs Rainfall */}
      {activeChart === "moisture" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-on-surface-variant">Sentinel-2 Soil Water Content Index</span>
            <Tag color="cyan" className="font-mono font-bold border-none m-0">Optimum Range: 60-80%</Tag>
          </div>

          <div className="space-y-3 pt-2">
            {moistureData.map((m) => (
              <div key={m.month} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-bold text-on-surface">{m.month}</span>
                  <span className="text-teal-400 font-bold">{m.moisture}% Moisture</span>
                </div>
                <Progress percent={m.moisture} strokeColor={{ "0%": "#14b8a6", "100%": "#10b981" }} size="small" showInfo={false} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart 3: Sapling Survival Rate per Wilaya */}
      {activeChart === "survival" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-on-surface-variant">Reforestation Sapling Survival Verification</span>
            <Tag color="gold" className="font-mono font-bold border-none m-0">National Avg: 88.4%</Tag>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 text-center space-y-1">
              <span className="text-[11px] font-mono text-on-surface-variant block">Batna Cedar Massif</span>
              <span className="font-mono font-bold text-2xl text-emerald-500">94.2%</span>
              <Progress percent={94.2} strokeColor="#10b981" size="small" showInfo={false} />
            </div>

            <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 text-center space-y-1">
              <span className="text-[11px] font-mono text-on-surface-variant block">Tizi Ouzou Djurdjura</span>
              <span className="font-mono font-bold text-2xl text-teal-500">91.8%</span>
              <Progress percent={91.8} strokeColor="#14b8a6" size="small" showInfo={false} />
            </div>

            <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 text-center space-y-1">
              <span className="text-[11px] font-mono text-on-surface-variant block">Djelfa Green Dam</span>
              <span className="font-mono font-bold text-2xl text-amber-500">84.6%</span>
              <Progress percent={84.6} strokeColor="#f59e0b" size="small" showInfo={false} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
