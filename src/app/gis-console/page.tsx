"use client";

import { useState, useEffect, useRef } from "react";
import TopNavBar from "@/components/TopNavBar";
import {
  Map as MapIcon,
  Trees,
  Sprout,
  AlertTriangle,
  FileText,
  Plus,
  Settings,
  HelpCircle,
  Layers,
  ZoomIn,
  ZoomOut,
  X,
  Bot,
  CheckSquare,
  Square,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Activity
} from "lucide-react";
import "leaflet/dist/leaflet.css";

interface GISLayer {
  id: string;
  name: string;
  active: boolean;
  color: string;
}

interface SelectedEntity {
  name: string;
  scientificName: string;
  nameAr: string;
  badge: string;
  vitalityScore: number;
  status: string;
  aiInsight: string;
  imgUrl: string;
  lat: number;
  lng: number;
}

export default function GISConsolePage() {
  const [activeTab, setActiveTab] = useState("forest");
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);

  const [layers, setLayers] = useState<GISLayer[]>([
    { id: "cedar", name: "Atlas Cedar Coverage", active: true, color: "text-emerald-500" },
    { id: "deforestation", name: "Deforestation Risk", active: true, color: "text-rose-500" },
    { id: "moisture", name: "Soil Moisture Grid", active: false, color: "text-teal-500" },
    { id: "reforestation", name: "Barrage Vert 2.0 Segment", active: true, color: "text-amber-500 font-bold" },
  ]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const entityData: SelectedEntity = {
    name: "Atlas Cedar Cluster B-42",
    scientificName: "Cedrus atlantica",
    nameAr: "أرز أطلسي (Arz Atlasi)",
    badge: "Endemic Protected",
    vitalityScore: 92,
    status: "Stable Canopy - Continuous Monitoring Active",
    aiInsight: "Optimal planting window approaching in 3 weeks. High soil moisture predicted. Schedule field mission for adjacent sector B-42.",
    imgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYEVJaROsbNd7wCNM3d-Jf4-lZCYfAd29ba5dclY1G_aP6Eu7nC7uTSZ7SV0ZYx3zlCrO5nACG0sWxPuAEFBPzMOTt95la9FUa4P1oHztIO-9wFLNnx5rxGACw4YBSOWoMVvCiXvwMuf9ljv9I1i19-WKd63ahMrrTiTw4__bBUk0nK1Dd4SLD2mZGV6Cq3ek5bC7Q8Dp29-mMlO2SiJtn96k3RWuKUpgevcif02CseGZ865xq7l8H",
    lat: 35.5558,
    lng: 6.1741,
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    import("leaflet").then((LModule) => {
      const L = LModule.default;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [35.8, 5.5],
          zoom: 7,
          zoomControl: false,
        });

        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Esri &mdash; National Environmental GIS Console v4.2",
            maxZoom: 18,
          }
        ).addTo(map);

        // Add Cedar Hotspot Marker
        const marker = L.circleMarker([35.5558, 6.1741], {
          radius: 14,
          fillColor: "#10b981",
          color: "#ffffff",
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9,
        }).addTo(map);

        marker.bindTooltip("<b>Cedrus atlantica (Batna Aurès)</b><br/>Health Score: 92%", {
          permanent: true,
          direction: "top",
          offset: [0, -12],
        });

        marker.on("click", () => {
          setShowRightPanel(true);
          map.flyTo([35.5558, 6.1741], 9, { duration: 1.2 });
        });

        // Add Djelfa Green Dam Marker
        const marker2 = L.circleMarker([34.6728, 3.263], {
          radius: 12,
          fillColor: "#f59e0b",
          color: "#ffffff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        }).addTo(map);

        marker2.bindTooltip("<b>Barrage Vert Segment (Djelfa)</b>", { direction: "top" });

        mapInstanceRef.current = map;
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-on-background">
      {/* Shared Fixed Top Header */}
      <TopNavBar />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 pt-16 h-full w-full">
        {/* Left Side Navigation Sidebar */}
        <aside className="hidden md:flex flex-col bg-surface-container dark:bg-surface-container-lowest border-r border-outline-variant/30 shadow-md h-[calc(100vh-64px)] w-[280px] py-4 flex-shrink-0 z-40 relative">
          <div className="px-5 mb-6">
            <h2 className="font-title-md text-base text-primary font-bold">GIS Console</h2>
            <p className="font-mono text-xs text-on-surface-variant">National Dataset v4.2 • Sentinel-2</p>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-1 px-3">
            <button
              onClick={() => setActiveTab("sat")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                activeTab === "sat"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <MapIcon className="w-4 h-4" /> Satellite View
            </button>

            <button
              onClick={() => setActiveTab("forest")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                activeTab === "forest"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <Trees className="w-4 h-4" /> Forest Inventory
            </button>

            <button
              onClick={() => setActiveTab("reforest")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                activeTab === "reforest"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <Sprout className="w-4 h-4" /> Reforestation Belt
            </button>

            <button
              onClick={() => setActiveTab("risk")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                activeTab === "risk"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <AlertTriangle className="w-4 h-4" /> Risk Zones
            </button>

            <button
              onClick={() => setActiveTab("logs")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                activeTab === "logs"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <FileText className="w-4 h-4" /> Field Survey Logs
            </button>
          </nav>

          <div className="px-5 py-4 border-t border-outline-variant/30 mt-auto">
            <button
              onClick={() => setShowNewSurveyModal(true)}
              className="w-full bg-primary text-on-primary py-2.5 rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <Plus className="w-4 h-4" /> New Field Survey
            </button>

            <div className="flex justify-between mt-4 text-xs text-on-surface-variant">
              <a href="#settings" className="hover:text-primary transition-colors flex items-center gap-1">
                <Settings className="w-3.5 h-3.5" /> Settings
              </a>
              <a href="#support" className="hover:text-primary transition-colors flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Support
              </a>
            </div>
          </div>
        </aside>

        {/* Center GIS Map Canvas Area */}
        <main className="flex-1 relative bg-surface-dim overflow-hidden flex">
          <div className="flex-1 relative h-full w-full">
            {/* Leaflet Map Div */}
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Floating Zoom & Control Widgets */}
            <div className="absolute top-5 left-5 z-[400] flex flex-col gap-2">
              <div className="glass-card rounded-xl p-1.5 flex flex-col gap-1 shadow-md border border-outline-variant/40">
                <button
                  onClick={zoomIn}
                  className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={zoomOut}
                  className="p-2 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Floating Layer Management Panel */}
            <div className="absolute top-5 right-5 lg:right-[340px] z-[400] glass-card rounded-2xl p-4 w-64 shadow-xl border border-outline-variant/40 backdrop-blur-md">
              <h3 className="font-title-md text-xs text-on-surface font-bold mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" /> Active GIS Layers
              </h3>
              <ul className="space-y-2 text-xs">
                {layers.map((l) => (
                  <li
                    key={l.id}
                    onClick={() => toggleLayer(l.id)}
                    className="flex items-center justify-between text-on-surface-variant cursor-pointer hover:bg-surface-container-high p-1.5 rounded-lg transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      {l.active ? (
                        <CheckSquare className="w-4 h-4 text-primary" />
                      ) : (
                        <Square className="w-4 h-4 text-on-surface-variant" />
                      )}
                      <span className={l.active ? "text-on-surface font-semibold" : ""}>{l.name}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Data Detail Panel (Sidebar) */}
          {showRightPanel && (
            <aside className="w-[320px] bg-surface dark:bg-surface-container-high h-full border-l border-outline-variant/30 flex-shrink-0 flex flex-col z-30 shadow-2xl animate-fadeIn">
              {/* Header */}
              <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest dark:bg-surface-container-highest">
                <h3 className="font-title-md text-sm text-on-surface font-bold">GIS Data Detail</h3>
                <button
                  onClick={() => setShowRightPanel(false)}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Data Contents */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Selected Entity Card */}
                <div className="rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md bg-surface-container-lowest dark:bg-surface-container-high">
                  <div
                    className="h-36 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${entityData.imgUrl})` }}
                  >
                    <span className="absolute bottom-2 right-2 bg-secondary-container text-on-secondary-container font-mono text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                      {entityData.badge}
                    </span>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-title-md text-base font-bold text-on-surface">
                      {entityData.name}
                    </h4>
                    <p className="text-xs text-primary font-mono italic">
                      {entityData.scientificName}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {entityData.nameAr}
                    </p>
                  </div>
                </div>

                {/* Health Metrics Card */}
                <div className="space-y-2">
                  <h5 className="font-title-md text-xs text-on-surface font-bold border-b border-outline-variant/30 pb-1.5">
                    Canopy Health Metrics
                  </h5>
                  <div className="bg-surface-container-lowest dark:bg-surface-container-high p-3.5 rounded-xl border border-outline-variant/30 space-y-2 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-on-surface-variant">Vitality Score</span>
                      <span className="font-mono font-bold text-base text-primary">
                        {entityData.vitalityScore}%
                      </span>
                    </div>

                    <div className="w-full bg-surface-variant rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-700"
                        style={{ width: `${entityData.vitalityScore}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-on-surface-variant">
                      <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
                      <span>{entityData.status}</span>
                    </div>
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="space-y-2">
                  <h5 className="font-title-md text-xs text-on-surface font-bold border-b border-outline-variant/30 pb-1.5">
                    AI Satellite Insights
                  </h5>
                  
                  <div className="bg-primary/5 dark:bg-primary/10 p-3.5 rounded-xl border border-primary/30 relative shadow-sm">
                    <div className="flex items-start gap-2.5">
                      <Bot className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-[10px] text-tertiary uppercase font-bold tracking-wider mb-1">
                          AI Recommendation
                        </p>
                        <p className="text-xs text-on-surface leading-relaxed">
                          {entityData.aiInsight}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setPlanGenerated(true)}
                      className="mt-3 w-full bg-primary text-on-primary font-title-md text-xs py-2 rounded-xl hover:bg-primary-container transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {planGenerated ? "Mission Plan Generated ✓" : "Generate Field Mission Plan"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </main>
      </div>

      {/* New Survey Modal */}
      {showNewSurveyModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="glass-card bg-surface dark:bg-surface-container-high rounded-3xl p-6 max-w-md w-full border border-primary/30 shadow-2xl relative">
            <button
              onClick={() => setShowNewSurveyModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-title-md text-lg text-on-surface font-bold mb-2">
              Create New Field Survey
            </h3>
            <p className="text-xs text-on-surface-variant mb-4">
              Initialize LiDAR or ground observation protocol for satellite verification.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setShowNewSurveyModal(false); }} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Wilaya Target</label>
                <select className="w-full bg-surface dark:bg-surface-container rounded-xl py-2 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none">
                  <option>05 - Batna (Aurès Cedar)</option>
                  <option>17 - Djelfa (Green Dam Belt)</option>
                  <option>15 - Tizi Ouzou (Djurdjura)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">Survey Type</label>
                <select className="w-full bg-surface dark:bg-surface-container rounded-xl py-2 px-3 text-xs text-on-surface border border-outline-variant/60 outline-none">
                  <option>Multispectral Canopy Density</option>
                  <option>Pest & Disease Early Warning</option>
                  <option>Reforestation Soil Moisture</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors mt-2 cursor-pointer"
              >
                Start Survey Logging
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
