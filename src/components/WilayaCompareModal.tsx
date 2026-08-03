"use client";

import { useState } from "react";
import { X, Trees, MapPin, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { Progress, Tag, Modal } from "antd";

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
  isOpen: boolean;
  onClose: () => void;
  provinces: ProvinceData[];
}

export default function WilayaCompareModal({ isOpen, onClose, provinces }: Props) {
  const [wilaya1Code, setWilaya1Code] = useState<string>("05"); // Batna default
  const [wilaya2Code, setWilaya2Code] = useState<string>("17"); // Djelfa default

  const w1 = provinces.find((p) => p.code === wilaya1Code) || provinces[0];
  const w2 = provinces.find((p) => p.code === wilaya2Code) || provinces[2] || provinces[1];

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={780}
      className="wilaya-compare-modal"
    >
      <div className="p-2 space-y-5">
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500">
              <Activity className="w-4 h-4" /> Side-by-Side Wilaya GIS Comparison
            </div>
            <h3 className="font-title-md text-xl font-bold text-on-surface">
              Comparative Geospatial Telemetry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary p-1.5 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selectors Bar */}
        <div className="grid grid-cols-2 gap-6 bg-surface-container dark:bg-surface-container-high p-4 rounded-2xl border border-outline-variant/40">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">
              Select Primary Wilaya:
            </label>
            <select
              value={wilaya1Code}
              onChange={(e) => setWilaya1Code(e.target.value)}
              className="w-full bg-surface dark:bg-surface-container-highest rounded-xl py-2 px-3 text-xs font-bold text-on-surface border border-outline-variant/60 outline-none"
            >
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  W{p.code} - {p.name} ({p.nameAr})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant mb-1">
              Select Comparison Wilaya:
            </label>
            <select
              value={wilaya2Code}
              onChange={(e) => setWilaya2Code(e.target.value)}
              className="w-full bg-surface dark:bg-surface-container-highest rounded-xl py-2 px-3 text-xs font-bold text-on-surface border border-outline-variant/60 outline-none"
            >
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  W{p.code} - {p.name} ({p.nameAr})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Side by Side Comparison Cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* Wilaya 1 Card */}
          {w1 && (
            <div className="glass-card p-5 rounded-2xl border border-emerald-500/40 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="font-mono text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                  W{w1.code}
                </span>
                <span className="text-xs font-bold text-on-surface">{w1.nameAr}</span>
              </div>

              <div>
                <h4 className="font-title-md text-lg font-bold text-on-surface">{w1.name}</h4>
                <span className="text-xs text-on-surface-variant font-mono">{w1.region}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span>Forest Coverage</span>
                    <span className="font-mono font-bold text-emerald-500">{w1.forestCoverPct}%</span>
                  </div>
                  <Progress percent={Math.min(w1.forestCoverPct * 2.2, 100)} strokeColor="#10b981" showInfo={false} size="small" />
                </div>

                <div className="flex justify-between items-center p-2 rounded-xl bg-surface-container">
                  <span>Logged Trees:</span>
                  <span className="font-mono font-bold text-emerald-500">{w1.loggedTrees}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-xl bg-surface-container">
                  <span>NDVI Density:</span>
                  <Tag color="green" className="font-mono font-bold m-0">{w1.ndviScore}</Tag>
                </div>

                <div>
                  <span className="font-bold text-on-surface block mb-1">Dominant Flora:</span>
                  <div className="flex flex-wrap gap-1">
                    {w1.dominantSpecies.map((sp) => (
                      <Tag key={sp} color="green" className="text-[10px] m-0">{sp}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wilaya 2 Card */}
          {w2 && (
            <div className="glass-card p-5 rounded-2xl border border-teal-500/40 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="font-mono text-xs font-bold text-teal-500 bg-teal-500/10 px-2.5 py-0.5 rounded-md">
                  W{w2.code}
                </span>
                <span className="text-xs font-bold text-on-surface">{w2.nameAr}</span>
              </div>

              <div>
                <h4 className="font-title-md text-lg font-bold text-on-surface">{w2.name}</h4>
                <span className="text-xs text-on-surface-variant font-mono">{w2.region}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium mb-1">
                    <span>Forest Coverage</span>
                    <span className="font-mono font-bold text-teal-500">{w2.forestCoverPct}%</span>
                  </div>
                  <Progress percent={Math.min(w2.forestCoverPct * 2.2, 100)} strokeColor="#14b8a6" showInfo={false} size="small" />
                </div>

                <div className="flex justify-between items-center p-2 rounded-xl bg-surface-container">
                  <span>Logged Trees:</span>
                  <span className="font-mono font-bold text-teal-500">{w2.loggedTrees}</span>
                </div>

                <div className="flex justify-between items-center p-2 rounded-xl bg-surface-container">
                  <span>NDVI Density:</span>
                  <Tag color="cyan" className="font-mono font-bold m-0">{w2.ndviScore}</Tag>
                </div>

                <div>
                  <span className="font-bold text-on-surface block mb-1">Dominant Flora:</span>
                  <div className="flex flex-wrap gap-1">
                    {w2.dominantSpecies.map((sp) => (
                      <Tag key={sp} color="cyan" className="text-[10px] m-0">{sp}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
