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
  Search,
  ShieldCheck,
  Activity,
  Flame,
  CheckCircle2,
  Calendar,
  Filter,
  Download,
  BarChart3
} from "lucide-react";
import { Table, Tag, Badge, Switch, Progress } from "antd";
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
  const [activeTab, setActiveTab] = useState<"sat" | "forest" | "reforest" | "risk" | "logs">("sat");
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);
  const [searchForest, setSearchForest] = useState("");

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

  // Initialize Leaflet Map when Satellite View is active
  useEffect(() => {
    if (activeTab !== "sat") return;
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
  }, [activeTab]);

  const toggleLayer = (id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  };

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();

  // Mock Forest Inventory Table Data
  const forestData = [
    { code: "05", wilaya: "Batna", region: "Aurès", forestCover: "24.2%", trees: "1,450,000", ndvi: "0.78", status: "Healthy", dominant: "Cedrus atlantica" },
    { code: "15", wilaya: "Tizi Ouzou", region: "Kabylie", forestCover: "38.6%", trees: "2,100,000", ndvi: "0.86", status: "High Canopy", dominant: "Quercus suber" },
    { code: "17", wilaya: "Djelfa", region: "High Plateaus", forestCover: "11.4%", trees: "1,800,000", ndvi: "0.54", status: "Re-Afforestation", dominant: "Pinus halepensis" },
    { code: "06", wilaya: "Béjaïa", region: "Kabylie", forestCover: "35.1%", trees: "1,950,000", ndvi: "0.82", status: "Protected", dominant: "Quercus suber" },
    { code: "07", wilaya: "Biskra", region: "Ziban Oasis", forestCover: "4.8%", trees: "850,000", ndvi: "0.42", status: "Oasis Belt", dominant: "Phoenix dactylifera" },
  ];

  const filteredForest = forestData.filter(
    (f) =>
      f.wilaya.toLowerCase().includes(searchForest.toLowerCase()) ||
      f.code.includes(searchForest)
  );

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
              <AlertTriangle className="w-4 h-4" /> Thermal Risk Zones
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

        {/* Center Dynamic Tab Content Area */}
        <main className="flex-1 relative bg-surface overflow-hidden flex flex-col">
          {/* Mobile GIS Console Tab Bar */}
          <div className="md:hidden flex overflow-x-auto gap-2 p-2 bg-surface-container border-b border-outline-variant/30 text-xs shrink-0 no-scrollbar">
            <button
              onClick={() => setActiveTab("sat")}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "sat" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" /> Satellite Map
            </button>
            <button
              onClick={() => setActiveTab("forest")}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "forest" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <Trees className="w-3.5 h-3.5" /> Inventory
            </button>
            <button
              onClick={() => setActiveTab("reforest")}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "reforest" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <Sprout className="w-3.5 h-3.5" /> Green Dam
            </button>
            <button
              onClick={() => setActiveTab("risk")}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "risk" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Risk Zones
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === "logs" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Field Logs
            </button>
          </div>

          {activeTab === "sat" && (
            <div className="flex-1 relative h-full w-full flex flex-col lg:flex-row overflow-hidden">
              <div className="flex-1 relative h-full w-full">
                {/* Leaflet Map Div */}
                <div ref={mapContainerRef} className="w-full h-full z-10 min-h-[300px]" />

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
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5 lg:right-[340px] z-[400] glass-card rounded-2xl p-3 sm:p-4 w-52 sm:w-64 shadow-xl border border-outline-variant/40 backdrop-blur-md">
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

              {/* Right Data Detail Panel */}
              {showRightPanel && (
                <aside className="w-full lg:w-[320px] bg-surface dark:bg-surface-container-high h-[320px] lg:h-full border-t lg:border-t-0 lg:border-l border-outline-variant/30 flex-shrink-0 flex flex-col z-30 shadow-2xl animate-fadeIn">
                  <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest dark:bg-surface-container-highest">
                    <h3 className="font-title-md text-sm text-on-surface font-bold">GIS Data Detail</h3>
                    <button
                      onClick={() => setShowRightPanel(false)}
                      className="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-5">
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
            </div>
          )}

          {/* TAB 2: Forest Inventory View */}
          {activeTab === "forest" && (
            <div className="flex-1 p-6 overflow-y-auto animate-fadeIn">
              <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-headline-lg text-2xl font-bold text-on-background flex items-center gap-2">
                      <Trees className="w-6 h-6 text-primary" /> National Forest Inventory Registry
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Detailed vegetation canopy, NDVI index scores, and dominant species across Algerian provinces.
                    </p>
                  </div>

                  <div className="relative w-72">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
                    <input
                      type="text"
                      value={searchForest}
                      onChange={(e) => setSearchForest(e.target.value)}
                      placeholder="Filter by Wilaya name or code..."
                      className="w-full bg-surface-container dark:bg-surface-container-high rounded-full py-2 pl-9 pr-4 text-xs text-on-surface border border-outline-variant/30 outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-2 border border-outline-variant/40 shadow-xl overflow-x-auto">
                  <Table
                    dataSource={filteredForest.map((item) => ({ ...item, key: item.code }))}
                    columns={[
                      {
                        title: "Code",
                        dataIndex: "code",
                        key: "code",
                        render: (code: string) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">W{code}</span>,
                        sorter: (a, b) => a.code.localeCompare(b.code),
                      },
                      {
                        title: "Wilaya",
                        dataIndex: "wilaya",
                        key: "wilaya",
                        render: (text: string) => <span className="font-bold">{text}</span>,
                        sorter: (a, b) => a.wilaya.localeCompare(b.wilaya),
                      },
                      {
                        title: "Eco-Region",
                        dataIndex: "region",
                        key: "region",
                      },
                      {
                        title: "Forest Cover %",
                        dataIndex: "forestCover",
                        key: "forestCover",
                        render: (val: string) => <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{val}</span>,
                        sorter: (a, b) => parseFloat(a.forestCover) - parseFloat(b.forestCover),
                      },
                      {
                        title: "Logged Trees",
                        dataIndex: "trees",
                        key: "trees",
                        render: (trees: string) => <span className="font-mono">{trees}</span>,
                      },
                      {
                        title: "NDVI Score",
                        dataIndex: "ndvi",
                        key: "ndvi",
                        render: (ndvi: string) => <Tag color="green" className="font-mono font-bold">{ndvi}</Tag>,
                        sorter: (a, b) => parseFloat(a.ndvi) - parseFloat(b.ndvi),
                      },
                      {
                        title: "Dominant Species",
                        dataIndex: "dominant",
                        key: "dominant",
                        render: (sp: string) => <span className="italic text-emerald-600 dark:text-emerald-400 font-medium">{sp}</span>,
                      },
                      {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        render: (status: string) => <Badge status="success" text={<span className="text-xs font-semibold">{status}</span>} />,
                      },
                    ]}
                    pagination={{ pageSize: 5 }}
                    size="small"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Reforestation Belt (Barrage Vert) */}
          {activeTab === "reforest" && (
            <div className="flex-1 p-6 overflow-y-auto animate-fadeIn">
              <div className="max-w-5xl mx-auto space-y-6">
                <div>
                  <h2 className="font-headline-lg text-2xl font-bold text-on-background flex items-center gap-2">
                    <Sprout className="w-6 h-6 text-emerald-600" /> Barrage Vert 2.0 Reforestation Progress
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Monitoring the 1,500km anti-desertification pine & acacia barrier across High Plateaus.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl glass-card border border-outline-variant/30 space-y-1">
                    <span className="text-xs text-on-surface-variant font-mono">Planted Saplings (2020-2026)</span>
                    <span className="block font-mono font-bold text-2xl text-primary">34.8 Million</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">74% of 2030 Target</span>
                  </div>

                  <div className="p-5 rounded-2xl glass-card border border-outline-variant/30 space-y-1">
                    <span className="text-xs text-on-surface-variant font-mono">Seedling Survival Rate</span>
                    <span className="block font-mono font-bold text-2xl text-secondary">88.4%</span>
                    <span className="text-[11px] text-on-surface-variant font-semibold">Verified via Sentinel-2</span>
                  </div>

                  <div className="p-5 rounded-2xl glass-card border border-outline-variant/30 space-y-1">
                    <span className="text-xs text-on-surface-variant font-mono">Desert Dune Barrier Stretch</span>
                    <span className="block font-mono font-bold text-2xl text-tertiary">1,120 km</span>
                    <span className="text-[11px] text-on-surface-variant font-semibold">Across 13 Provinces</span>
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-6 border border-outline-variant/40 space-y-4">
                  <h3 className="font-title-md text-sm font-bold text-on-surface">Regional Plantation Sectors</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Djelfa High Plateaus Sector</span>
                        <span className="text-primary font-mono">92% Complete</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full w-[92%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>M'Sila Steppe Buffer</span>
                        <span className="text-secondary font-mono">78% Complete</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full w-[78%]"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Laghouat Anti-Sand Barrier</span>
                        <span className="text-tertiary font-mono">65% Complete</span>
                      </div>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div className="bg-tertiary h-2 rounded-full w-[65%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Thermal Risk Zones */}
          {activeTab === "risk" && (
            <div className="flex-1 p-6 overflow-y-auto animate-fadeIn">
              <div className="max-w-5xl mx-auto space-y-6">
                <div>
                  <h2 className="font-headline-lg text-2xl font-bold text-on-background flex items-center gap-2">
                    <Flame className="w-6 h-6 text-rose-500" /> Thermal Anomaly & Fire Risk Monitoring
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Real-time satellite heat signatures and forest fire vulnerability indexing.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl glass-card border border-rose-500/30 bg-rose-500/5 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 font-mono text-[10px] font-bold">
                      HIGH THERMAL RISK
                    </span>
                    <h3 className="font-title-md text-base font-bold text-on-surface">Kabylie Pine Forests (Tizi Ouzou/Béjaïa)</h3>
                    <p className="text-xs text-on-surface-variant">
                      Dry summer temperatures triggering thermal alerts. Satellite patrol frequency doubled to 12h orbits.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl glass-card border border-amber-500/30 bg-amber-500/5 space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold">
                      MODERATE VULNERABILITY
                    </span>
                    <h3 className="font-title-md text-base font-bold text-on-surface">Aurès Cedar Massif (Batna)</h3>
                    <p className="text-xs text-on-surface-variant">
                      Soil moisture index remains within safe parameters. Continuous LiDAR canopy telemetry active.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Field Survey Logs */}
          {activeTab === "logs" && (
            <div className="flex-1 p-6 overflow-y-auto animate-fadeIn">
              <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-headline-lg text-2xl font-bold text-on-background flex items-center gap-2">
                      <FileText className="w-6 h-6 text-primary" /> Verified Field Survey Observations
                    </h2>
                    <p className="text-xs text-on-surface-variant mt-1">
                      Recent telemetry observation logs submitted by forest rangers and field researchers.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowNewSurveyModal(true)}
                    className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> New Field Survey
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl glass-card border border-outline-variant/40 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                          SURVEY #DZ-8492
                        </span>
                        <span className="text-xs text-on-surface-variant font-mono">Batna Aurès Sector B-42</span>
                      </div>
                      <h4 className="font-title-md text-sm font-bold text-on-surface">
                        Atlas Cedar Sapling Growth Verification
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Log by Dr. Yassine Benali • 500 saplings verified with GPS accuracy 99.6%
                      </p>
                    </div>

                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-emerald-500/30 px-3 py-1 rounded-full">
                      Verified ✓
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl glass-card border border-outline-variant/40 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                          SURVEY #DZ-8489
                        </span>
                        <span className="text-xs text-on-surface-variant font-mono">Djelfa Green Dam Sector C-12</span>
                      </div>
                      <h4 className="font-title-md text-sm font-bold text-on-surface">
                        Aleppo Pine Canopy Density Scan
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Log by Djelfa Forestry Brigade • 1,200 trees logged
                      </p>
                    </div>

                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-emerald-500/30 px-3 py-1 rounded-full">
                      Verified ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors mt-2 cursor-pointer font-bold"
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
