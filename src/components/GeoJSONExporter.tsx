"use client";

import { useState } from "react";
import { Download, FileCode, Check, ShieldCheck } from "lucide-react";

export default function GeoJSONExporter() {
  const [downloaded, setDownloaded] = useState<"geojson" | "kml" | null>(null);

  const mockGeoJSON = {
    type: "FeatureCollection",
    name: "Algeria_Forest_Cover_Wilayas_2026",
    crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features: [
      {
        type: "Feature",
        properties: { code: "05", name: "Batna", species: "Cedrus atlantica", ndvi: 0.78 },
        geometry: { type: "Point", coordinates: [6.1741, 35.5558] },
      },
      {
        type: "Feature",
        properties: { code: "17", name: "Djelfa", species: "Pinus halepensis", ndvi: 0.54 },
        geometry: { type: "Point", coordinates: [3.263, 34.6728] },
      },
    ],
  };

  const downloadFile = (format: "geojson" | "kml") => {
    const dataStr =
      format === "geojson"
        ? JSON.stringify(mockGeoJSON, null, 2)
        : `<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Algeria Green GIS Dataset</name></Document></kml>`;

    const blob = new Blob([dataStr], { type: format === "geojson" ? "application/json" : "application/vnd.google-earth.kml+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `algeria_green_dataset_${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(format);
    setTimeout(() => setDownloaded(null), 3000);
  };

  return (
    <div className="glass-card p-5 rounded-2xl border border-primary/30 shadow-lg space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-title-md text-sm font-bold text-on-surface flex items-center gap-2">
          <FileCode className="w-4 h-4 text-primary" /> GIS Open Data Export (QGIS / ArcGIS)
        </h4>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
          v4.2 Open Spec
        </span>
      </div>

      <p className="text-xs text-on-surface-variant">
        Export vector shapefiles and satellite coordinates for 58 Algerian Wilayas in GeoJSON or KML format.
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => downloadFile("geojson")}
          className="flex-1 py-2.5 px-3 bg-primary text-on-primary rounded-xl font-title-md text-xs hover:bg-primary-container transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow-sm"
        >
          {downloaded === "geojson" ? (
            <>
              <Check className="w-4 h-4" /> Exported GeoJSON!
            </>
          ) : (
            <>
              <Download className="w-4 h-4" /> Download GeoJSON
            </>
          )}
        </button>

        <button
          onClick={() => downloadFile("kml")}
          className="py-2.5 px-4 bg-surface-container-high hover:bg-surface-container-highest text-on-surface rounded-xl font-title-md text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer font-bold border border-outline-variant/40"
        >
          {downloaded === "kml" ? "Exported KML!" : "KML (Google Earth)"}
        </button>
      </div>
    </div>
  );
}
