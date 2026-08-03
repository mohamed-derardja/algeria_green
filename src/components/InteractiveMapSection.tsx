"use client";

import { useState, useEffect, useRef } from "react";
import { Layers, Activity, ShieldAlert, Sparkles, MapPin, Eye, Compass, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface MapHotspot {
  id: string;
  name: string;
  nameAr: string;
  wilayaCode: string;
  lat: number;
  lng: number;
  type: "dense_forest" | "green_dam" | "oasis" | "reforestation";
  ndvi: number;
  treesCount: string;
  trend: string;
  description: string;
  satStatus: "Active Sentinel-2" | "Live Landsat-9" | "Spot-7 Pass";
}

export default function InteractiveMapSection() {
  const [activeLayer, setActiveLayer] = useState<"satellite" | "ndvi" | "greendam" | "oasis" | "fire">("satellite");
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const tileLayerRef = useRef<any>(null);

  const mapHotspots: MapHotspot[] = [
    {
      id: "batna",
      name: "Batna - Aurès Cedar Massif",
      nameAr: "باتنة - الأوراس",
      wilayaCode: "05",
      lat: 35.5558,
      lng: 6.1741,
      type: "dense_forest",
      ndvi: 0.78,
      treesCount: "1.45M Trees",
      trend: "+12% Coverage YoY",
      description: "High altitude Cedar of Lebanon and Aleppo Pine canopy monitoring via Sentinel-2 multispectral band imagery.",
      satStatus: "Active Sentinel-2",
    },
    {
      id: "djelfa",
      name: "Djelfa - Green Dam Belt",
      nameAr: "الجلفة - السد الأخضر",
      wilayaCode: "17",
      lat: 34.6728,
      lng: 3.263,
      type: "green_dam",
      ndvi: 0.54,
      treesCount: "1.80M Trees",
      trend: "Barrage Vert 2.0 Priority",
      description: "Anti-desertification reforestation belt extending across high plateaus to halt Saharan sand dune encroachment.",
      satStatus: "Live Landsat-9",
    },
    {
      id: "tizi_ouzou",
      name: "Tizi Ouzou - Djurdjura Massif",
      nameAr: "تيزي وزو - جرجرة",
      wilayaCode: "15",
      lat: 36.7118,
      lng: 4.0459,
      type: "dense_forest",
      ndvi: 0.86,
      treesCount: "2.10M Trees",
      trend: "38.6% Dense Forest Cover",
      description: "Coastal mountain ecosystem featuring Cork Oak biodiversity reserves and active community reforestation nurseries.",
      satStatus: "Active Sentinel-2",
    },
    {
      id: "biskra",
      name: "Biskra - Ziban Oasis Greening",
      nameAr: "بسكرة - الزيبان",
      wilayaCode: "07",
      lat: 34.8516,
      lng: 5.7278,
      type: "oasis",
      ndvi: 0.42,
      treesCount: "920K Date Palms",
      trend: "+8.4% Solar Drip Irrigated",
      description: "Saharan oasis edge restoration utilizing renewable solar micro-drip irrigation grid connected to satellite soil moisture sensors.",
      satStatus: "Spot-7 Pass",
    },
    {
      id: "algiers",
      name: "Algiers - Urban Green Canopy",
      nameAr: "الجزائر - الشريط الأخضر",
      wilayaCode: "16",
      lat: 36.7538,
      lng: 3.0588,
      type: "reforestation",
      ndvi: 0.62,
      treesCount: "620K Urban Trees",
      trend: "+18% Urban Parks",
      description: "Metropolitan ecological corridor mapping and heat-island reduction tracking.",
      satStatus: "Active Sentinel-2",
    },
    {
      id: "tamanrasset",
      name: "Tamanrasset - Hoggar Reserve",
      nameAr: "تمنراست - الهقار",
      wilayaCode: "11",
      lat: 22.785,
      lng: 5.5228,
      type: "oasis",
      ndvi: 0.28,
      treesCount: "310K Endemic Specimens",
      trend: "Protected Biosphere",
      description: "Protection of Saharan cypress (Tarout) and volcanic mountain oasis vegetation systems.",
      satStatus: "Live Landsat-9",
    },
  ];

  // Initialize Leaflet Map on Mount
  useEffect(() => {
    if (typeof window === "undefined" || !mapContainerRef.current) return;

    let L: any;
    import("leaflet").then((leafletModule) => {
      L = leafletModule.default;

      if (!mapInstanceRef.current && mapContainerRef.current) {
        // Initialize Map centered on Algeria
        const map = L.map(mapContainerRef.current, {
          center: [28.0, 3.0],
          zoom: 5,
          zoomControl: false,
          minZoom: 4,
          maxZoom: 14,
        });

        // Add Tile Layer (Esri World Imagery / OpenStreetMap)
        const satelliteTiles = L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri &mdash; Algeria National GIS",
            maxZoom: 18,
          }
        );

        satelliteTiles.addTo(map);
        tileLayerRef.current = satelliteTiles;

        // Add Custom Circle Hotspot Markers
        mapHotspots.forEach((spot) => {
          const circleColor =
            spot.type === "dense_forest"
              ? "#10b981"
              : spot.type === "green_dam"
              ? "#f59e0b"
              : "#14b8a6";

          const circleMarker = L.circleMarker([spot.lat, spot.lng], {
            radius: 9,
            fillColor: circleColor,
            color: "#ffffff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85,
          }).addTo(map);

          circleMarker.bindTooltip(
            `<b>W${spot.wilayaCode} - ${spot.name.split("-")[0]}</b><br/>NDVI: ${spot.ndvi}`,
            { direction: "top", offset: [0, -8] }
          );

          circleMarker.on("click", () => {
            setSelectedHotspot(spot);
            map.flyTo([spot.lat, spot.lng], 8, { duration: 1.2 });
          });

          markersRef.current[spot.id] = circleMarker;
        });

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

  // Handle Layer Switching
  const handleLayerChange = (layer: "satellite" | "ndvi" | "greendam" | "oasis" | "fire") => {
    setActiveLayer(layer);
    if (!mapInstanceRef.current) return;

    import("leaflet").then((leafletModule) => {
      const L = leafletModule.default;
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }

      let newTileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      if (layer === "ndvi") {
        newTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
      } else if (layer === "greendam") {
        newTileUrl = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
      }

      const newTileLayer = L.tileLayer(newTileUrl, {
        attribution: "Algeria Green Real GIS Map",
        maxZoom: 18,
      });

      newTileLayer.addTo(mapInstanceRef.current);
      tileLayerRef.current = newTileLayer;
    });
  };

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();
  const resetCenter = () => {
    setSelectedHotspot(null);
    mapInstanceRef.current?.flyTo([28.0, 3.0], 5, { duration: 1.2 });
  };

  return (
    <section id="interactive-map" className="py-20 px-container-padding bg-surface-container-low dark:bg-surface-container-lowest/70 border-y border-outline-variant/30">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
              Live Interactive Satellite Map
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-background font-bold tracking-tight">
              Real Interactive Satellite GIS & Vegetation Heatmap
            </h2>
            <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
              Zoom, pan, and inspect real high-resolution satellite imagery across Algeria with multispectral NDVI layer toggling and Wilaya telemetry pins.
            </p>
          </div>

          {/* Layer Switcher Controls */}
          <div className="glass-card p-1.5 rounded-2xl flex flex-wrap gap-1 border border-outline-variant/40">
            <button
              onClick={() => handleLayerChange("satellite")}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeLayer === "satellite"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Real Satellite Map
            </button>

            <button
              onClick={() => handleLayerChange("ndvi")}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeLayer === "ndvi"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              NDVI Topo Layer
            </button>

            <button
              onClick={() => handleLayerChange("greendam")}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
                activeLayer === "greendam"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Green Dam Belt
            </button>
          </div>
        </div>

        {/* GIS Map & Telemetry Viewer Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Real Leaflet Map Canvas */}
          <div className="lg:col-span-2 glass-card rounded-2xl relative overflow-hidden border border-outline-variant/40 min-h-[500px] flex flex-col justify-between shadow-xl">
            {/* Satellite Pass Overlay Header */}
            <div className="absolute top-4 left-4 z-[400] flex items-center gap-2 bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-outline-variant/40 text-xs font-mono shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-on-surface font-semibold">Real-Time Leaflet GIS Engine</span>
              <span className="text-on-surface-variant opacity-70 hidden sm:inline">| Algeria Grid</span>
            </div>

            {/* Custom Zoom Controls Overlay */}
            <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-2">
              <button
                onClick={zoomIn}
                title="Zoom In"
                className="w-9 h-9 rounded-xl bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md text-on-surface border border-outline-variant/40 flex items-center justify-center shadow-md hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={zoomOut}
                title="Zoom Out"
                className="w-9 h-9 rounded-xl bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md text-on-surface border border-outline-variant/40 flex items-center justify-center shadow-md hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetCenter}
                title="Reset Center"
                className="w-9 h-9 rounded-xl bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md text-on-surface border border-outline-variant/40 flex items-center justify-center shadow-md hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Leaflet Map Div */}
            <div ref={mapContainerRef} className="w-full h-[360px] sm:h-[450px] lg:h-[520px] z-10" />

            {/* Map Footer Bar */}
            <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 text-xs text-on-surface-variant bg-surface/90 dark:bg-surface-container-high/90 backdrop-blur-md px-3 sm:px-4 py-2 border-t border-outline-variant/30">
              <span className="flex items-center gap-1 font-mono text-[11px] sm:text-xs">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                Click pin to inspect telemetry
              </span>
              <span className="font-mono text-[10px] sm:text-[11px]">
                28.0° N | 3.0° E
              </span>
            </div>
          </div>

          {/* Telemetry Detail Sidebar Card */}
          <div className="lg:col-span-1 flex flex-col justify-between gap-4">
            {selectedHotspot ? (
              <div className="glass-card rounded-2xl p-6 border border-primary/40 shadow-xl flex flex-col justify-between h-full animate-fadeIn">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary font-mono text-xs font-bold">
                      Wilaya {selectedHotspot.wilayaCode}
                    </span>
                    <span className="text-xs font-semibold text-on-surface-variant font-arabic">
                      {selectedHotspot.nameAr}
                    </span>
                  </div>

                  <h3 className="font-title-md text-lg text-on-background font-bold mb-1">
                    {selectedHotspot.name}
                  </h3>
                  <p className="text-xs text-primary dark:text-primary-fixed font-mono mb-4">
                    🛰️ {selectedHotspot.satStatus} (Lat: {selectedHotspot.lat}°, Lng: {selectedHotspot.lng}°)
                  </p>

                  <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                    {selectedHotspot.description}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-high">
                      <span className="text-[11px] text-on-surface-variant uppercase font-label-sm block mb-0.5">
                        NDVI Density
                      </span>
                      <span className="font-mono font-bold text-lg text-primary">
                        {selectedHotspot.ndvi}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-surface-container dark:bg-surface-container-high">
                      <span className="text-[11px] text-on-surface-variant uppercase font-label-sm block mb-0.5">
                        Logged Trees
                      </span>
                      <span className="font-mono font-bold text-lg text-secondary">
                        {selectedHotspot.treesCount}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary font-medium flex items-center justify-between">
                    <span>Year-Over-Year Metric:</span>
                    <span className="font-mono font-bold">{selectedHotspot.trend}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/30 flex gap-2">
                  <a
                    href="#platform"
                    className="flex-1 py-2.5 bg-primary text-on-primary text-center rounded-xl font-title-md text-xs hover:bg-primary-container transition-colors shadow-sm"
                  >
                    Explore Wilaya GIS
                  </a>
                  <button
                    onClick={resetCenter}
                    className="px-3.5 py-2.5 bg-surface-container-high text-on-surface text-xs rounded-xl hover:bg-outline-variant transition-colors cursor-pointer"
                  >
                    Reset Map
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border border-outline-variant/40 flex flex-col items-center justify-center text-center h-full text-on-surface-variant min-h-[300px]">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 animate-float">
                  <Eye className="w-7 h-7" />
                </div>
                <h4 className="font-title-md text-on-surface font-bold mb-2">
                  Select a Satellite Telemetry Pin
                </h4>
                <p className="text-xs max-w-xs leading-relaxed">
                  Click any pin on the real Leaflet satellite map to fly directly to that Algerian Wilaya and inspect multispectral vegetation density and logged specimen counts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
