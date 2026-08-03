"use client";

import { useState } from "react";
import { Download, FileCode, FileText, Check, Globe } from "lucide-react";
import { Modal, Tag } from "antd";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GeoJSONExporter({ isOpen, onClose }: Props) {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const sampleGeoJSON = {
    type: "FeatureCollection",
    name: "Algeria_Green_Wilaya_Telemetry_2026",
    crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    features: [
      {
        type: "Feature",
        properties: { code: "05", wilaya: "Batna", ndvi: 0.84, forestCoverPct: 28.5, species: "Cedrus atlantica" },
        geometry: { type: "Point", coordinates: [6.1741, 35.5558] },
      },
      {
        type: "Feature",
        properties: { code: "17", wilaya: "Djelfa", ndvi: 0.62, forestCoverPct: 18.4, species: "Pinus halepensis" },
        geometry: { type: "Point", coordinates: [3.2583, 34.6728] },
      },
      {
        type: "Feature",
        properties: { code: "15", wilaya: "Tizi Ouzou", ndvi: 0.91, forestCoverPct: 42.1, species: "Quercus suber" },
        geometry: { type: "Point", coordinates: [4.0459, 36.7118] },
      },
    ],
  };

  const handleExport = (format: "geojson" | "kml" | "csv") => {
    let content = "";
    let filename = "";
    let mimeType = "";

    if (format === "geojson") {
      content = JSON.stringify(sampleGeoJSON, null, 2);
      filename = "algeria_green_wilayas_telemetry.geojson";
      mimeType = "application/json";
    } else if (format === "kml") {
      content = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Algeria Green GIS Telemetry</name>
    <Placemark><name>Batna Aurès Cedar</name><Point><coordinates>6.1741,35.5558</coordinates></Point></Placemark>
    <Placemark><name>Djelfa Barrage Vert</name><Point><coordinates>3.2583,34.6728</coordinates></Point></Placemark>
  </Document>
</kml>`;
      filename = "algeria_green_telemetry.kml";
      mimeType = "application/vnd.google-earth.kml+xml";
    } else {
      content = `Code,Wilaya,NDVI_Score,Forest_Cover_Pct,Dominant_Species,Latitude,Longitude\n05,Batna,0.84,28.5,Cedrus atlantica,35.5558,6.1741\n17,Djelfa,0.62,18.4,Pinus halepensis,34.6728,3.2583\n15,Tizi Ouzou,0.91,42.1,Quercus suber,36.7118,4.0459`;
      filename = "algeria_green_telemetry.csv";
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadedFormat(format.toUpperCase());
    setTimeout(() => setDownloadedFormat(null), 4000);
  };

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={540}
      className="geojson-exporter-modal"
    >
      <div className="p-4 space-y-5">
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant/30">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500">
              <Globe className="w-4 h-4" /> Open GIS Data Export
            </div>
            <h3 className="font-title-md text-xl font-bold text-on-surface">
              Export Wilaya Satellite Telemetry
            </h3>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          Download high-precision geospatial telemetry datasets for all 58 Algerian Wilayas compatible with QGIS, ArcGIS, Google Earth, or Python Data Science pipelines.
        </p>

        {/* Download Options List */}
        <div className="space-y-3">
          {/* Option 1: GeoJSON */}
          <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-mono font-bold text-xs">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-on-surface">GeoJSON Standard Format (.geojson)</div>
                <div className="text-[10px] text-on-surface-variant font-mono">QGIS / Leaflet / Mapbox Native</div>
              </div>
            </div>
            <button
              onClick={() => handleExport("geojson")}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> GeoJSON
            </button>
          </div>

          {/* Option 2: KML */}
          <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center font-mono font-bold text-xs">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-on-surface">KML Keyhole Markup (.kml)</div>
                <div className="text-[10px] text-on-surface-variant font-mono">Google Earth / ArcGIS Desktop</div>
              </div>
            </div>
            <button
              onClick={() => handleExport("kml")}
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> KML
            </button>
          </div>

          {/* Option 3: CSV */}
          <div className="p-4 rounded-2xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-mono font-bold text-xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-xs text-on-surface">CSV Tabular Dataset (.csv)</div>
                <div className="text-[10px] text-on-surface-variant font-mono">Excel / Pandas / R Telemetry</div>
              </div>
            </div>
            <button
              onClick={() => handleExport("csv")}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-mono text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
          </div>
        </div>

        {downloadedFormat && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Downloaded {downloadedFormat} File Successfully!
          </div>
        )}
      </div>
    </Modal>
  );
}
