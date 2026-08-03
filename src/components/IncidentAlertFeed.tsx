"use client";

import { useState } from "react";
import { AlertTriangle, Flame, ShieldCheck, CheckCircle2, X, ChevronRight, Activity } from "lucide-react";
import { Tag, Badge } from "antd";

interface IncidentAlert {
  id: string;
  severity: "critical" | "warning" | "success";
  title: string;
  location: string;
  timestamp: string;
  coordinates: string;
  description: string;
  actionRequired: string;
}

export default function IncidentAlertFeed() {
  const [selectedIncident, setSelectedIncident] = useState<IncidentAlert | null>(null);

  const incidents: IncidentAlert[] = [
    {
      id: "fire-01",
      severity: "critical",
      title: "Thermal Anomaly Spike Detected",
      location: "Jijel Coastal Forest Reserve",
      timestamp: "12 mins ago (Sentinel-2 IR)",
      coordinates: "36.8205° N, 5.7667° E",
      description: "Infrared thermal sensor detected 38°C canopy temperature anomaly. Local forestry rangers dispatched for ground inspection.",
      actionRequired: "Ground Forestry Patrol Inspection",
    },
    {
      id: "drought-02",
      severity: "warning",
      title: "Soil Moisture Stress Index Alert",
      location: "Djelfa Steppe Transition Margin",
      timestamp: "1 hour ago (Landsat-9 SWIR)",
      coordinates: "34.6728° N, 3.2583° E",
      description: "NDVI moisture deficit observed across 420 hectares. Solar drip irrigation channels activated.",
      actionRequired: "Solar Drip Channel Activation",
    },
    {
      id: "milestone-03",
      severity: "success",
      title: "Reforestation Target Verified",
      location: "Batna Aurès Cedar Reserve",
      timestamp: "3 hours ago (Drone Survey)",
      coordinates: "35.5558° N, 6.1741° E",
      description: "12,000 new Atlas Cedar saplings verified with 94.2% canopy survival rate.",
      actionRequired: "Verified & Logged to National Registry",
    },
  ];

  return (
    <div className="glass-card rounded-2xl p-4 border border-outline-variant/40 shadow-xl space-y-3 bg-surface/95 dark:bg-surface-container-high/95 backdrop-blur-md">
      <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30 text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-rose-500 animate-pulse" />
          <span className="font-mono font-bold text-on-surface uppercase tracking-wider">
            Real-Time Satellite Incident Feed
          </span>
        </div>

        <Badge count={incidents.length} overflowCount={10} style={{ backgroundColor: "#10b981" }} />
      </div>

      <div className="space-y-2">
        {incidents.map((item) => {
          const isCritical = item.severity === "critical";
          const isWarning = item.severity === "warning";
          return (
            <div
              key={item.id}
              onClick={() => setSelectedIncident(item)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                isCritical
                  ? "bg-rose-500/10 border-rose-500/30 hover:border-rose-500/60"
                  : isWarning
                  ? "bg-amber-500/10 border-amber-500/30 hover:border-amber-500/60"
                  : "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/60"
              }`}
            >
              <div className="flex items-center gap-3">
                {isCritical ? (
                  <Flame className="w-4 h-4 text-rose-500 shrink-0 animate-bounce" />
                ) : isWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-xs text-on-surface group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-on-surface-variant font-mono">{item.location} • {item.timestamp}</div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-0.5 transition-transform" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
